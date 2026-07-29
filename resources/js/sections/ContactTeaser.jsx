import { Link } from 'react-router-dom';
import { BRANCHES, CONTACTS } from '../data/site.js';
import YandexMap from '../components/YandexMap.jsx';

/* «Контактный тизер» на главной (п. 7.1 ТЗ):
   мини-карта, адреса двух филиалов, кнопка перехода в раздел «О Клубе».
   Компактный блок для быстрого доступа. */
export default function ContactTeaser() {
    return (
        <section className="section" style={{ background: 'var(--paper-2)' }}>
            <div className="shell">
                <span className="mono-caption">Как нас найти</span>
                <h2 className="serif-h2" style={{ margin: '16px 0 0' }}>
                    Два филиала в Западном Дегунино
                </h2>

                <div className="parus-teaser-grid">
                    <div className="parus-teaser-map">
                        <YandexMap minHeight={280} label="Мини-карта: два филиала клуба «Парус»" />
                    </div>

                    <div>
                        <ol style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                            {BRANCHES.map((b) => (
                                <li
                                    key={b.n}
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '40px 1fr',
                                        gap: 16,
                                        padding: '16px 0',
                                        borderBottom: '1px solid var(--line)',
                                    }}
                                >
                                    <span
                                        aria-hidden="true"
                                        style={{
                                            width: 40,
                                            height: 40,
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            background: 'var(--sun)',
                                            color: 'var(--ink)',
                                            font: '600 14px/1 var(--font-mono)',
                                        }}
                                    >
                                        {b.n}
                                    </span>
                                    <div>
                                        <div style={{ font: '400 19px/1.25 var(--font-serif)', color: 'var(--ink)' }}>{b.title}</div>
                                        <p style={{ margin: '6px 0 0', font: '400 14px/1.5 var(--font-sans)', color: 'var(--tx-soft)' }}>
                                            {b.city} · {b.hours}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ol>

                        <p style={{ margin: '16px 0 0', font: '400 14px/1.5 var(--font-sans)', color: 'var(--tx-mute)' }}>
                            <i className="ph-light ph-train-simple" aria-hidden="true" style={{ marginRight: 6 }}></i>
                            {CONTACTS.metro}
                        </p>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 24 }}>
                            <Link to="/about#branches" className="btn-solid">
                                О клубе и филиалах
                                <i className="ph-light ph-arrow-right" aria-hidden="true"></i>
                            </Link>
                            <a href={CONTACTS.phoneHref} className="btn-line">
                                <i className="ph-fill ph-phone" aria-hidden="true" style={{ fontSize: 18 }}></i>
                                {CONTACTS.phone}
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .parus-teaser-grid {
                    margin-top: var(--s3);
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 24px;
                    align-items: start;
                }
                .parus-teaser-map > .parus-map { height: 280px; }
                @media (min-width: 900px) {
                    .parus-teaser-grid { grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); gap: 40px; }
                    .parus-teaser-map > .parus-map { height: 340px; }
                }
            `}</style>
        </section>
    );
}
