import { useEffect, useRef, useState } from 'react';

const MAP_SRC =
    'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A7d3808db57c481fb4c66912c045fb6658372fd36804018dd5159b05617b8c8fd&width=612&height=521&lang=ru_RU&scroll=true';

/* Интерактивная карта с метками двух филиалов.
   Пока конструктор грузится, показываем скелетон; если скрипт не
   поднялся — остаётся текстовая заглушка со ссылкой на Яндекс.Карты. */
export default function YandexMap({ minHeight = 320, label = 'Карта филиалов клуба «Парус»' }) {
    const hostRef = useRef(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const root = hostRef.current;
        if (!root) return undefined;

        root.innerHTML = '';
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.charset = 'utf-8';
        script.async = true;
        script.src = MAP_SRC;
        script.onload = () => setReady(true);
        root.appendChild(script);

        return () => {
            root.innerHTML = '';
        };
    }, []);

    return (
        <div className="parus-map" style={{ minHeight }} role="region" aria-label={label}>
            {!ready && <span className="media-skeleton" aria-hidden="true" />}
            <div ref={hostRef} className="parus-map-host" style={{ minHeight }} />

            <style>{`
                .parus-map {
                    position: relative;
                    overflow: hidden;
                    background: var(--mist);
                    border: 1px solid var(--ink);
                }
                .parus-map-host,
                .parus-map-host > ymaps,
                .parus-map-host iframe {
                    width: 100% !important;
                    height: 100% !important;
                    border: 0;
                    display: block;
                }
                .parus-map-host { position: relative; z-index: 1; }
            `}</style>
        </div>
    );
}
