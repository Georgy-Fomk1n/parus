import { MEDIA } from '../data/site.js';

export default function Logo({ small = false, showSubtitle = true, invert = false }) {
    const size = small ? 40 : 46;
    const title = invert ? 'var(--paper)' : 'var(--ink)';
    const sub = invert ? 'rgba(230,232,224,0.6)' : 'var(--tx-soft)';
    return (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
            <img
                src={MEDIA.logo}
                alt=""
                className="parus-logo-img"
                data-invert={invert ? '1' : '0'}
                style={{
                    width: Math.round(size * 0.92),
                    height: size,
                    objectFit: 'contain',
                    flex: 'none',
                }}
            />
            <span style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', lineHeight: 1 }}>
                {showSubtitle && (
                <span style={{ font: "500 9.5px/1 var(--font-mono)", letterSpacing: '0.14em', textTransform: 'uppercase', color: sub, marginTop: 6 }}>
                    Досугово-спортивный клуб
                </span>
                )}
                <span
                    style={{
                        font: `500 22px/1 var(--font-serif)`,
                        fontVariationSettings: "'opsz' 40, 'SOFT' 60, 'WONK' 0",
                        color: title,
                        letterSpacing: '-0.005em',
                    }}
                >
                    Парус
                </span>
            </span>
        </span>
    );
}
