import { Link } from 'react-router-dom';
import { NauticalMark } from './Motifs.jsx';

/* Заголовок внутренней страницы: чёткая иерархия и читаемость
   на мобильных. Опционально — хлебные крошки для детальных страниц. */
export default function PageHeader({ eyebrow, title, description, breadcrumbs, children }) {
    return (
        <section
            style={{
                position: 'relative',
                paddingTop: 'calc(72px + clamp(32px, 5vw, 64px))',
                paddingBottom: 'clamp(32px, 4vw, 56px)',
                paddingLeft: 'var(--gutter)',
                paddingRight: 'var(--gutter)',
                background: 'var(--paper)',
                borderBottom: '1px solid var(--ink)',
                overflow: 'hidden',
            }}
        >
            <NauticalMark
                type="sunCompass"
                className="parus-page-compass"
                style={{
                    position: 'absolute',
                    top: 'clamp(96px, 10vw, 128px)',
                    right: 'clamp(16px, 5vw, 72px)',
                    width: 'clamp(88px, 10vw, 144px)',
                    opacity: 0.13,
                }}
            />

            <div className="shell" style={{ position: 'relative' }}>
                {breadcrumbs && (
                    <nav aria-label="Хлебные крошки" style={{ marginBottom: 16 }}>
                        <ol style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: 0, padding: 0, listStyle: 'none', font: '400 13px/1.4 var(--font-sans)', color: 'var(--tx-mute)' }}>
                            {breadcrumbs.map((b, i) => (
                                <li key={b.label} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                    {b.to ? (
                                        <Link to={b.to} style={{ color: 'var(--tx-soft)', textDecoration: 'none', borderBottom: '1px solid var(--line-strong)' }}>
                                            {b.label}
                                        </Link>
                                    ) : (
                                        <span aria-current="page">{b.label}</span>
                                    )}
                                    {i < breadcrumbs.length - 1 && <span aria-hidden="true">/</span>}
                                </li>
                            ))}
                        </ol>
                    </nav>
                )}

                {eyebrow && (
                    <div className="section-tag" style={{ marginBottom: 'clamp(16px, 3vw, 32px)' }}>
                        <span>{eyebrow}</span>
                    </div>
                )}

                <h1 className="display" style={{ margin: 0 }}>
                    {title}
                </h1>

                {description && (
                    <p
                        style={{
                            margin: '24px 0 0',
                            maxWidth: '58ch',
                            font: '400 clamp(15px, 1.15vw, 17.5px)/1.6 var(--font-sans)',
                            color: 'var(--tx)',
                            textWrap: 'pretty',
                        }}
                    >
                        {description}
                    </p>
                )}

                {children}
            </div>
        </section>
    );
}
