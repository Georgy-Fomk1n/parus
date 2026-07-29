#!/usr/bin/env python3
"""Archive visible text and images from https://клубпарус.рф/.

Outputs:
  storage/app/private/parus-site/pages/*.txt        per-page text + image list
  storage/app/private/parus-site/images/<page>/     downloaded images
  storage/app/private/parus-site/site_text_and_images.txt combined report
  storage/app/private/parus-site/manifest.json      machine-readable summary
"""
from __future__ import annotations

import hashlib
import json
import mimetypes
import os
import posixpath
import re
import sys
import time
from collections import OrderedDict, deque
from dataclasses import dataclass, asdict
from pathlib import Path
from typing import Iterable
from urllib.parse import unquote, urldefrag, urljoin, urlparse, urlunparse
from xml.etree import ElementTree as ET

import requests
from lxml import html

START_URL = "https://клубпарус.рф/"
OUTPUT_ROOT = Path("storage/app/private/parus-site")
USER_AGENT = "Mozilla/5.0 (compatible; ParusLaravelArchive/1.0; +local archive)"
TIMEOUT = 30
MAX_PAGES = 100
REQUEST_DELAY_SECONDS = 0.15

SKIP_PATH_PREFIXES = (
    "/tilda/form",
    "/tilda/rec",
    "/tilda/click",
    "/tilda/scroll",
    "/tilda/popup",
    "/tilda/cart",
    "/tilda/product",
    "/tilda/event",
)
SKIP_EXACT_PATHS = {"/page64066775.html"}
STATIC_EXTENSIONS = {
    ".css",
    ".js",
    ".json",
    ".xml",
    ".txt",
    ".pdf",
    ".zip",
    ".rar",
    ".7z",
    ".mp4",
    ".webm",
    ".mov",
    ".mp3",
    ".ogg",
    ".wav",
    ".doc",
    ".docx",
    ".xls",
    ".xlsx",
}
IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".avif", ".bmp"}
IMAGE_ATTRS = (
    "src",
    "data-src",
    "data-original",
    "data-lazy-src",
    "data-img-zoom-url",
    "data-zoomable",
    "data-bg",
    "data-background-image",
    "poster",
    "content",
    "href",
)
SRCSET_ATTRS = ("srcset", "data-srcset")
CSS_URL_RE = re.compile(r"url\((?P<quote>['\"]?)(?P<url>.*?)(?P=quote)\)", re.I)
WHITESPACE_RE = re.compile(r"[ \t\r\f\v]+")
MULTI_NL_RE = re.compile(r"\n{3,}")


@dataclass
class ImageRecord:
    source_url: str
    local_path: str | None = None
    status: str = "pending"
    content_type: str | None = None
    bytes: int = 0
    sha256: str | None = None
    error: str | None = None


@dataclass
class PageRecord:
    url: str
    slug: str
    status_code: int
    title: str
    text_file: str
    html_file: str
    text_chars: int
    text_lines: int
    image_count: int
    images_downloaded: int
    images_failed: int
    images: list[ImageRecord]


def normalize_url(url: str, base: str | None = None) -> str | None:
    if not url:
        return None
    url = url.strip()
    if not url or url.startswith(("#", "mailto:", "tel:", "javascript:", "data:", "blob:")):
        return None
    if url.startswith("//"):
        url = "https:" + url
    if base:
        url = urljoin(base, url)
    url, _fragment = urldefrag(url)
    parsed = urlparse(url)
    if parsed.scheme not in {"http", "https"}:
        return None
    # Prefer one canonical HTTPS host for the source domain; keep external image hosts as-is.
    same_site = is_same_site_host(parsed.netloc)
    scheme = "https" if same_site else parsed.scheme
    netloc = "xn--80ab0aevhhle.xn--p1ai" if same_site else parsed.netloc
    path = posixpath.normpath(parsed.path or "/")
    if parsed.path.endswith("/") and not path.endswith("/"):
        path += "/"
    if path == ".":
        path = "/"
    normalized = parsed._replace(scheme=scheme, netloc=netloc, path=path, params="")
    return urlunparse(normalized)


def host_unicode(host: str) -> str:
    host = (host or "").split(":", 1)[0].lower()
    try:
        return host.encode("ascii").decode("idna")
    except Exception:
        return host


def is_same_site_host(netloc: str) -> bool:
    h = host_unicode(netloc)
    return h in {"клубпарус.рф", "www.клубпарус.рф"}


def should_visit_page(url: str) -> bool:
    parsed = urlparse(url)
    if not is_same_site_host(parsed.netloc):
        return False
    path = parsed.path or "/"
    if path in SKIP_EXACT_PATHS:
        return False
    if any(path.startswith(prefix) for prefix in SKIP_PATH_PREFIXES):
        return False
    ext = Path(path).suffix.lower()
    if ext in STATIC_EXTENSIONS or ext in IMAGE_EXTENSIONS:
        return False
    if "_escaped_fragment_" in url:
        return False
    return True


def slug_for_url(url: str) -> str:
    parsed = urlparse(url)
    path = unquote(parsed.path or "/").strip("/")
    if not path:
        return "index"
    slug = re.sub(r"[^0-9A-Za-zА-Яа-яЁё._-]+", "-", path).strip("-._")
    return slug or "page"


def get_sitemap_urls(session: requests.Session) -> list[str]:
    urls: list[str] = []
    robots_url = normalize_url("/robots.txt", START_URL) or START_URL
    sitemap_urls = [normalize_url("/sitemap.xml", START_URL) or "https://клубпарус.рф/sitemap.xml"]
    try:
        r = session.get(robots_url, timeout=TIMEOUT)
        if r.ok:
            for line in r.text.splitlines():
                if line.lower().startswith("sitemap:"):
                    candidate = normalize_url(line.split(":", 1)[1].strip(), START_URL)
                    if candidate and candidate not in sitemap_urls:
                        sitemap_urls.append(candidate)
    except requests.RequestException:
        pass

    for sitemap_url in sitemap_urls:
        try:
            r = session.get(sitemap_url, timeout=TIMEOUT)
            if not r.ok or "xml" not in (r.headers.get("content-type") or ""):
                continue
            root = ET.fromstring(r.content)
            ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
            for loc in root.findall(".//sm:loc", ns) + root.findall(".//loc"):
                if loc.text:
                    candidate = normalize_url(loc.text.strip(), START_URL)
                    if candidate and should_visit_page(candidate) and candidate not in urls:
                        urls.append(candidate)
        except Exception as exc:
            print(f"WARN sitemap failed {sitemap_url}: {exc}", file=sys.stderr)
    return urls


def fetch(session: requests.Session, url: str) -> requests.Response:
    time.sleep(REQUEST_DELAY_SECONDS)
    return session.get(url, timeout=TIMEOUT)


def parse_document(content: bytes, url: str):
    return html.fromstring(content, base_url=url)


def page_title(doc) -> str:
    titles = [t.strip() for t in doc.xpath("//title/text()") if t.strip()]
    if titles:
        return titles[0]
    h1 = [t.strip() for t in doc.xpath("//h1//text()") if t.strip()]
    return h1[0] if h1 else ""


def clean_visible_text(doc) -> str:
    body = doc.find("body")
    if body is None:
        body = doc
    # Work on a copy so image/link extraction can use the original tree.
    body_copy = html.fromstring(html.tostring(body, encoding="unicode"))
    for node in body_copy.xpath(".//script|.//style|.//noscript|.//svg|.//template"):
        parent = node.getparent()
        if parent is not None:
            parent.remove(node)
    text = body_copy.text_content()
    lines: list[str] = []
    for raw_line in text.splitlines():
        line = WHITESPACE_RE.sub(" ", raw_line).strip()
        if line:
            lines.append(line)
    # Deduplicate only immediate repeated lines produced by responsive duplicates.
    deduped: list[str] = []
    for line in lines:
        if not deduped or deduped[-1] != line:
            deduped.append(line)
    return "\n".join(deduped).strip() + "\n"


def extract_links(doc, base_url: str) -> list[str]:
    found: list[str] = []
    for href in doc.xpath("//a/@href"):
        candidate = normalize_url(href, base_url)
        if candidate and should_visit_page(candidate) and candidate not in found:
            found.append(candidate)
    return found


def parse_srcset(value: str) -> Iterable[str]:
    for part in value.split(","):
        candidate = part.strip().split()[0] if part.strip() else ""
        if candidate:
            yield candidate


def looks_like_image_url(url: str) -> bool:
    parsed = urlparse(url)
    host = parsed.netloc.lower()
    # Tilda thumbnail host duplicates the same photos in tiny resize/empty variants; keep originals.
    if host.startswith("thb.tildacdn.com"):
        return False
    ext = Path(parsed.path).suffix.lower()
    if ext in IMAGE_EXTENSIONS:
        return True
    return False


def extract_image_urls(doc, base_url: str) -> list[str]:
    urls: OrderedDict[str, None] = OrderedDict()
    image_like_tags = {"img", "picture", "source", "video"}
    background_attrs = {"data-original", "data-bg", "data-background-image", "data-img-zoom-url", "data-lazy-src"}
    for element in doc.iter():
        tag = (element.tag or "").lower() if isinstance(element.tag, str) else ""

        # Real media elements. Avoid script/link src values; those are assets, not photos.
        if tag in image_like_tags:
            for attr in ("src", "data-src", "data-original", "data-lazy-src", "poster"):
                value = element.get(attr)
                candidate = normalize_url(value or "", base_url)
                if candidate and looks_like_image_url(candidate):
                    urls[candidate] = None
            for attr in SRCSET_ATTRS:
                value = element.get(attr)
                if not value:
                    continue
                for src in parse_srcset(value):
                    candidate = normalize_url(src, base_url)
                    if candidate and looks_like_image_url(candidate):
                        urls[candidate] = None

        # Tilda commonly stores background photos on generic divs in data-original/style.
        for attr in background_attrs:
            value = element.get(attr)
            candidate = normalize_url(value or "", base_url)
            if candidate and looks_like_image_url(candidate):
                urls[candidate] = None

        # OpenGraph/Twitter preview images.
        if tag == "meta":
            key = (element.get("property") or element.get("name") or "").lower()
            if "image" in key:
                candidate = normalize_url(element.get("content") or "", base_url)
                if candidate and looks_like_image_url(candidate):
                    urls[candidate] = None

        # Favicons and image preloads only; skip stylesheets/scripts.
        if tag == "link":
            rel = " ".join(element.get("rel") or []).lower() if isinstance(element.get("rel"), list) else (element.get("rel") or "").lower()
            as_attr = (element.get("as") or "").lower()
            if "icon" in rel or as_attr == "image":
                candidate = normalize_url(element.get("href") or "", base_url)
                if candidate and looks_like_image_url(candidate):
                    urls[candidate] = None

        # Direct links to image files.
        if tag == "a":
            candidate = normalize_url(element.get("href") or "", base_url)
            if candidate and looks_like_image_url(candidate):
                urls[candidate] = None

        style = element.get("style") or ""
        for match in CSS_URL_RE.finditer(style):
            candidate = normalize_url(match.group("url"), base_url)
            if candidate and looks_like_image_url(candidate):
                urls[candidate] = None
    return list(urls.keys())


def guess_extension(url: str, content_type: str | None) -> str:
    parsed_ext = Path(urlparse(url).path).suffix.lower()
    if parsed_ext in IMAGE_EXTENSIONS:
        return parsed_ext
    if content_type:
        mime = content_type.split(";", 1)[0].strip().lower()
        ext = mimetypes.guess_extension(mime)
        if ext:
            return ".jpg" if ext == ".jpe" else ext
    return ".bin"


def safe_basename(url: str, fallback: str) -> str:
    name = unquote(Path(urlparse(url).path).name)
    if not name or name in {".", ".."}:
        return fallback
    name = re.sub(r"[^0-9A-Za-zА-Яа-яЁё._-]+", "-", name).strip("-._")
    return name or fallback


def download_images(session: requests.Session, page_slug: str, urls: list[str]) -> list[ImageRecord]:
    image_dir = OUTPUT_ROOT / "images" / page_slug
    image_dir.mkdir(parents=True, exist_ok=True)
    records: list[ImageRecord] = []
    seen_hash_paths: dict[str, str] = {}
    for idx, url in enumerate(urls, start=1):
        rec = ImageRecord(source_url=url)
        try:
            time.sleep(REQUEST_DELAY_SECONDS)
            r = session.get(url, timeout=TIMEOUT, stream=True)
            rec.status = f"http_{r.status_code}"
            rec.content_type = r.headers.get("content-type")
            if not r.ok:
                rec.error = f"HTTP {r.status_code}"
                records.append(rec)
                continue
            data = r.content
            rec.bytes = len(data)
            rec.sha256 = hashlib.sha256(data).hexdigest()
            ext = guess_extension(url, rec.content_type)
            basename = safe_basename(url, f"image{ext}")
            if Path(basename).suffix.lower() not in IMAGE_EXTENSIONS:
                basename = Path(basename).stem + ext
            filename = f"{idx:03d}_{basename}"
            target = image_dir / filename
            # Avoid overwriting if different URLs produce the same sanitized filename.
            counter = 1
            while target.exists() and hashlib.sha256(target.read_bytes()).hexdigest() != rec.sha256:
                target = image_dir / f"{idx:03d}_{counter}_{basename}"
                counter += 1
            if rec.sha256 in seen_hash_paths:
                rec.local_path = seen_hash_paths[rec.sha256]
                rec.status = "duplicate_content"
            else:
                target.write_bytes(data)
                rec.local_path = str(target)
                seen_hash_paths[rec.sha256] = rec.local_path
                rec.status = "downloaded"
        except Exception as exc:
            rec.status = "error"
            rec.error = str(exc)
        records.append(rec)
    return records


def write_page_text(record: PageRecord, text: str) -> None:
    page_path = Path(record.text_file)
    page_path.parent.mkdir(parents=True, exist_ok=True)
    lines: list[str] = []
    lines.append(f"URL: {record.url}")
    lines.append(f"TITLE: {record.title}")
    lines.append(f"TEXT_CHARS: {record.text_chars}")
    lines.append(f"IMAGES_FOUND: {record.image_count}")
    lines.append(f"IMAGES_DOWNLOADED: {record.images_downloaded}")
    lines.append("")
    lines.append("=== PAGE TEXT ===")
    lines.append(text.rstrip())
    lines.append("")
    lines.append("=== IMAGES ===")
    if not record.images:
        lines.append("No images found.")
    for i, img in enumerate(record.images, start=1):
        lines.append(f"[{i}] {img.source_url}")
        lines.append(f"    status: {img.status}")
        if img.local_path:
            lines.append(f"    local: {img.local_path}")
        if img.content_type:
            lines.append(f"    content_type: {img.content_type}")
        if img.bytes:
            lines.append(f"    bytes: {img.bytes}")
        if img.sha256:
            lines.append(f"    sha256: {img.sha256}")
        if img.error:
            lines.append(f"    error: {img.error}")
    page_path.write_text("\n".join(lines).rstrip() + "\n", encoding="utf-8")


def main() -> int:
    OUTPUT_ROOT.mkdir(parents=True, exist_ok=True)
    (OUTPUT_ROOT / "pages").mkdir(exist_ok=True)
    (OUTPUT_ROOT / "html").mkdir(exist_ok=True)
    session = requests.Session()
    session.headers.update({"User-Agent": USER_AGENT})

    seeds = get_sitemap_urls(session)
    start = normalize_url(START_URL)
    if start and start not in seeds:
        seeds.insert(0, start)
    queue = deque(seeds)
    visited: set[str] = set()
    records: list[PageRecord] = []

    while queue and len(visited) < MAX_PAGES:
        url = queue.popleft()
        if url in visited or not should_visit_page(url):
            continue
        visited.add(url)
        print(f"FETCH {len(visited):02d}: {url}", flush=True)
        response = fetch(session, url)
        status_code = response.status_code
        content_type = response.headers.get("content-type") or ""
        if not response.ok or "html" not in content_type.lower():
            slug = slug_for_url(url)
            record = PageRecord(
                url=url,
                slug=slug,
                status_code=status_code,
                title="",
                text_file=str(OUTPUT_ROOT / "pages" / f"{slug}.txt"),
                html_file="",
                text_chars=0,
                text_lines=0,
                image_count=0,
                images_downloaded=0,
                images_failed=0,
                images=[],
            )
            write_page_text(record, f"Non-HTML or failed response: HTTP {status_code}\n")
            records.append(record)
            continue

        doc = parse_document(response.content, response.url or url)
        actual_url = normalize_url(response.url or url) or url
        slug = slug_for_url(actual_url)
        html_file = OUTPUT_ROOT / "html" / f"{slug}.html"
        html_file.write_bytes(response.content)

        for link in extract_links(doc, actual_url):
            if link not in visited and link not in queue:
                queue.append(link)

        text = clean_visible_text(doc)
        image_urls = extract_image_urls(doc, actual_url)
        images = download_images(session, slug, image_urls)
        downloaded_count = sum(1 for image in images if image.local_path and image.status in {"downloaded", "duplicate_content"})
        failed_count = sum(1 for image in images if not image.local_path)
        record = PageRecord(
            url=actual_url,
            slug=slug,
            status_code=status_code,
            title=page_title(doc),
            text_file=str(OUTPUT_ROOT / "pages" / f"{slug}.txt"),
            html_file=str(html_file),
            text_chars=len(text),
            text_lines=len([line for line in text.splitlines() if line.strip()]),
            image_count=len(images),
            images_downloaded=downloaded_count,
            images_failed=failed_count,
            images=images,
        )
        write_page_text(record, text)
        records.append(record)

    manifest = {
        "source": START_URL,
        "created_at_unix": int(time.time()),
        "page_count": len(records),
        "image_count": sum(r.image_count for r in records),
        "images_downloaded": sum(r.images_downloaded for r in records),
        "images_failed": sum(r.images_failed for r in records),
        "pages": [
            {
                **{k: v for k, v in asdict(record).items() if k != "images"},
                "images": [asdict(image) for image in record.images],
            }
            for record in records
        ],
    }
    (OUTPUT_ROOT / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")

    combined_lines: list[str] = []
    combined_lines.append(f"SOURCE: {START_URL}")
    combined_lines.append(f"PAGES: {len(records)}")
    combined_lines.append(f"IMAGES_FOUND: {manifest['image_count']}")
    combined_lines.append(f"IMAGES_DOWNLOADED_OR_DUPLICATE: {manifest['images_downloaded']}")
    combined_lines.append(f"IMAGES_FAILED: {manifest['images_failed']}")
    combined_lines.append("")
    for record in records:
        combined_lines.append("=" * 88)
        combined_lines.append(f"PAGE: {record.title or record.slug}")
        combined_lines.append(f"URL: {record.url}")
        combined_lines.append(f"TEXT_FILE: {record.text_file}")
        combined_lines.append(f"HTML_FILE: {record.html_file}")
        combined_lines.append(f"IMAGES: {record.image_count}")
        combined_lines.append("")
        combined_lines.append(Path(record.text_file).read_text(encoding="utf-8"))
        combined_lines.append("")
    (OUTPUT_ROOT / "site_text_and_images.txt").write_text("\n".join(combined_lines).rstrip() + "\n", encoding="utf-8")

    print("\nDONE")
    print(json.dumps({k: manifest[k] for k in ["page_count", "image_count", "images_downloaded", "images_failed"]}, ensure_ascii=False, indent=2))
    return 0 if manifest["page_count"] and manifest["images_failed"] == 0 else 1


if __name__ == "__main__":
    raise SystemExit(main())
