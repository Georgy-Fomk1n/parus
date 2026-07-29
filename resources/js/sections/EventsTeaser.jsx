import { Link } from 'react-router-dom';
import { EVENTS_UPCOMING } from '../data/site.js';
import SmartImage from '../components/SmartImage.jsx';

/* «Ближайшие мероприятия» на главной (п. 7.1 ТЗ).
   Даты выделены визуально; кнопка ведёт в раздел «Мероприятия». */
export default function EventsTeaser() {
    return (
        <section className="section" style={{ background: 'var(--sky-2)' }}>
            <div className="shell">
                <div className="parus-sec-head">
                    <div>
                        <span className="mono-caption">Мероприятия</span>
                        <h2 className="serif-h2" style={{ margin: '16px 0 0' }}>
                            Ближайшие события клуба
                        </h2>
                    </div>
                    <Link to="/events" className="btn-line parus-sec-head-btn">
                        Все мероприятия
                        <i className="ph-light ph-arrow-right" aria-hidden="true"></i>
                    </Link>
                </div>

                <ul className="parus-ev-teaser">
                    {EVENTS_UPCOMING.map((e, i) => (
                        <li key={e.id} className="parus-ev-card">
                            <SmartImage src={e.img} alt={e.title} ratio="16 / 9" emptyLabel="Фото события" />

                            <div className="parus-ev-body">
                                <div className="parus-ev-date" data-soon={i === 0 ? 'true' : 'false'}>
                                    <strong>{e.dateLabel}</strong>
                                    <span>
                                        {e.weekday}, {e.time}
                                    </span>
                                    {i === 0 && <em>Ближайшее</em>}
                                </div>

                                <h3 style={{ margin: '16px 0 0', font: '400 21px/1.25 var(--font-serif)', color: 'var(--ink)' }}>{e.title}</h3>
                                <p style={{ margin: '8px 0 0', font: '400 14.5px/1.55 var(--font-sans)', color: 'var(--tx-soft)' }}>{e.d}</p>
                                <p style={{ margin: '16px 0 0', font: '400 13.5px/1.4 var(--font-sans)', color: 'var(--tx-mute)', display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <i className="ph-light ph-map-pin" aria-hidden="true"></i>
                                    {e.place}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>

                <div style={{ marginTop: 'var(--s3)' }}>
                    <Link to="/events" className="btn-solid parus-sec-foot-btn">
                        Все мероприятия и новости
                        <i className="ph-light ph-arrow-right" aria-hidden="true"></i>
                    </Link>
                </div>
            </div>

            <style>{`
                .parus-ev-teaser {
                    margin: var(--s4) 0 0;
                    padding: 0;
                    list-style: none;
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 16px;
                }
                .parus-ev-card {
                    background: var(--paper-3);
                    border: 1px solid var(--line);
                    display: flex;
                    flex-direction: column;
                    transition: border-color .2s, box-shadow .2s;
                }
                .parus-ev-card:hover {
                    border-color: var(--ink);
                    box-shadow: 0 24px 40px -32px rgba(11, 42, 70, .7);
                }
                .parus-ev-body { padding: 16px; flex: 1; }
                .parus-ev-date {
                    display: flex;
                    align-items: baseline;
                    flex-wrap: wrap;
                    gap: 8px 12px;
                    padding-bottom: 12px;
                    border-bottom: 1px solid var(--line);
                }
                .parus-ev-date strong {
                    font: 600 22px/1 var(--font-sans);
                    color: var(--ink);
                }
                .parus-ev-date span {
                    font: 400 13px/1 var(--font-sans);
                    color: var(--tx-mute);
                }
                .parus-ev-date em {
                    font-style: normal;
                    margin-left: auto;
                    padding: 4px 10px;
                    border-radius: 999px;
                    background: var(--accent);
                    color: #fff;
                    font: 500 11.5px/1.3 var(--font-sans);
                }
                .parus-ev-date[data-soon="true"] strong { color: var(--accent); }

                @media (min-width: 720px) {
                    .parus-ev-teaser { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; }
                }
                @media (min-width: 900px) {
                    .parus-ev-body { padding: 24px; }
                }
            `}</style>
        </section>
    );
}
