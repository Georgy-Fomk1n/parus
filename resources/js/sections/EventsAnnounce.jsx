import { EVENTS_UPCOMING, CONTACTS } from '../data/site.js';
import SmartImage from '../components/SmartImage.jsx';

/* «Анонсы предстоящих событий» (п. 7.3 ТЗ).
   Располагаются в верхней части страницы, ближайшая дата выделена. */
export default function EventsAnnounce() {
    return (
        <section className="section -plain" style={{ background: 'var(--paper)', borderTop: 'none' }}>
            <div className="shell">
                <h2 className="serif-h2" style={{ margin: 0 }}>
                    Анонсы: что будет дальше
                </h2>

                <ol className="parus-announce">
                    {EVENTS_UPCOMING.map((e, i) => (
                        <li key={e.id} data-soon={i === 0 ? 'true' : 'false'}>
                            <div className="parus-announce-date">
                                <strong>{e.dateLabel}</strong>
                                <span>{e.weekday}</span>
                                <span>{e.time}</span>
                                {i === 0 && <em>Ближайшее событие</em>}
                            </div>

                            <div className="parus-announce-media">
                                <SmartImage src={e.img} alt={e.title} ratio="16 / 9" emptyLabel="Фото события" />
                            </div>

                            <div className="parus-announce-body">
                                <span className="chip" style={{ cursor: 'default', minHeight: 32, padding: '4px 12px', fontSize: 13 }}>
                                    {e.tag}
                                </span>
                                <h3>{e.title}</h3>
                                <p>{e.d}</p>
                                <p className="parus-announce-place">
                                    <i className="ph-light ph-map-pin" aria-hidden="true"></i>
                                    {e.place}
                                </p>
                                <a href={CONTACTS.phoneHref} className="btn-line" style={{ marginTop: 16 }}>
                                    <i className="ph-fill ph-phone" aria-hidden="true" style={{ fontSize: 18 }}></i>
                                    Записаться по телефону
                                </a>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>

            <style>{`
                .parus-announce {
                    margin: var(--s3) 0 0;
                    padding: 0;
                    list-style: none;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }
                .parus-announce li {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 16px;
                    padding: 16px;
                    background: var(--paper-3);
                    border: 1px solid var(--line);
                }
                .parus-announce li[data-soon="true"] {
                    border-color: var(--accent);
                    box-shadow: inset 4px 0 0 var(--accent);
                }
                .parus-announce-date {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: baseline;
                    gap: 8px 16px;
                }
                .parus-announce-date strong {
                    font: 600 clamp(24px, 3vw, 32px)/1 var(--font-sans);
                    color: var(--ink);
                }
                .parus-announce li[data-soon="true"] .parus-announce-date strong { color: var(--accent); }
                .parus-announce-date span {
                    font: 400 14px/1 var(--font-sans);
                    color: var(--tx-mute);
                }
                .parus-announce-date em {
                    font-style: normal;
                    padding: 4px 12px;
                    border-radius: 999px;
                    background: var(--accent);
                    color: #fff;
                    font: 500 12px/1.4 var(--font-sans);
                }
                .parus-announce-body h3 {
                    margin: 12px 0 0;
                    font: 400 clamp(20px, 2vw, 26px)/1.25 var(--font-serif);
                    color: var(--ink);
                }
                .parus-announce-body p {
                    margin: 8px 0 0;
                    font: 400 15px/1.6 var(--font-sans);
                    color: var(--tx-soft);
                    max-width: 60ch;
                }
                .parus-announce-place {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    color: var(--tx-mute) !important;
                    font-size: 14px !important;
                }

                @media (min-width: 900px) {
                    .parus-announce li {
                        grid-template-columns: 200px minmax(0, 320px) minmax(0, 1fr);
                        align-items: start;
                        gap: 32px;
                        padding: 24px;
                    }
                    .parus-announce-date { flex-direction: column; gap: 4px; }
                }
            `}</style>
        </section>
    );
}
