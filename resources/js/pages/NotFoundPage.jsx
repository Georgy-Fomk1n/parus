import { Link } from 'react-router-dom';
import { CoursePath } from '../components/Motifs.jsx';

export default function NotFoundPage() {
    return (
        <section
            style={{
                minHeight: '78vh',
                padding: 'clamp(140px,14vw,200px) clamp(20px,5vw,64px) clamp(80px,10vw,120px)',
                background: 'var(--paper)',
                borderBottom: '1px solid var(--ink)',
            }}
        >
            <div
                style={{
                    maxWidth: 900,
                    margin: '0 auto',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 'clamp(24px, 4vw, 60px)',
                    alignItems: 'end',
                }}
                className="parus-404-grid"
            >
                <div>
                    <div className="section-tag" style={{ marginBottom: 24 }}>
                        <span className="mono-caption">Ф. 404</span>
                        <span>Страница не найдена</span>
                    </div>
                    <h1 style={{ margin: 0, font: "400 clamp(44px, 6vw, 72px)/1.02 var(--font-serif)", color: 'var(--ink)', letterSpacing: '-0.02em' }}>
                        Такой<br />
                        <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>страницы</em><br />
                        мы не нашли
                    </h1>
                </div>
                <div>
                    <CoursePath width={220} style={{ color: 'var(--ink-soft)', marginBottom: 22 }} />
                    <span className="mono-caption" style={{ display: 'block', marginBottom: 14 }}>
                        координаты не найдены · возвращаемся в порт
                    </span>
                    <p style={{ margin: 0, font: "400 16px/1.6 var(--font-sans)", color: 'var(--tx)', maxWidth: '38ch' }}>
                        Возможно, страница переехала, а старая ссылка осталась. Вернитесь на главную или откройте раздел «Кружки и секции» — там перечислены все направления клуба.
                    </p>
                    <div style={{ marginTop: 26, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        <Link to="/" className="btn-solid">
                            На главную
                            <i className="ph-light ph-arrow-right" aria-hidden="true" style={{ fontSize: 16 }}></i>
                        </Link>
                        <Link to="/studios" className="btn-line">
                            Кружки и секции
                        </Link>
                    </div>
                </div>
            </div>

            <style>{`
                @media (max-width: 780px) {
                    .parus-404-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </section>
    );
}
