import { useState } from 'react';
import { EVENTS_PAST } from '../data/site.js';
import SmartImage from '../components/SmartImage.jsx';
import Lightbox from '../components/Lightbox.jsx';

/* «Прошедшие мероприятия» (п. 7.3 ТЗ): сетка фотоотчётов с датами
   и названиями. Располагается ниже анонсов, отделена заголовком подблока. */
export default function PastEvents() {
    const [current, setCurrent] = useState(null);

    return (
        <section id="past" className="section" style={{ background: 'var(--sky-2)' }}>
            <div className="shell">
                <h2 className="serif-h2" style={{ margin: 0 }}>
                    Прошедшие мероприятия
                </h2>
                <p style={{ margin: '16px 0 0', maxWidth: '52ch', font: '400 15.5px/1.6 var(--font-sans)', color: 'var(--tx-soft)' }}>
                    Фотоотчёты с концертов, фестивалей, аттестаций и смен летнего лагеря. Нажмите на кадр, чтобы открыть его крупнее.
                </p>

                <ul className="parus-past">
                    {EVENTS_PAST.map((e) => (
                        <li key={e.id}>
                            <button type="button" onClick={() => setCurrent({ img: e.img, t: e.title })} aria-label={`Открыть фотоотчёт: ${e.title}`}>
                                <SmartImage src={e.img} alt={e.title} ratio="4 / 3" emptyLabel="Фотоотчёт" />
                                <span className="parus-past-body">
                                    <span className="parus-past-date">{e.dateLabel}</span>
                                    <span className="parus-past-title">{e.title}</span>
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <Lightbox item={current} onClose={() => setCurrent(null)} />

            <style>{`
                .parus-past {
                    margin: var(--s3) 0 0;
                    padding: 0;
                    list-style: none;
                    display: grid;
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                    gap: 8px;
                }
                .parus-past button {
                    display: block;
                    width: 100%;
                    padding: 0;
                    border: 1px solid var(--line);
                    background: var(--paper-3);
                    text-align: left;
                    cursor: zoom-in;
                    transition: border-color .2s, box-shadow .2s;
                }
                .parus-past button:hover {
                    border-color: var(--ink);
                    box-shadow: 0 20px 36px -30px rgba(11, 42, 70, .8);
                }
                .parus-past button:hover .photo { transform: scale(1.03); }
                .parus-past-body { display: block; padding: 12px; }
                .parus-past-date {
                    display: block;
                    font: 500 11.5px/1 var(--font-mono);
                    letter-spacing: .05em;
                    text-transform: uppercase;
                    color: var(--accent);
                }
                .parus-past-title {
                    display: block;
                    margin-top: 6px;
                    font: 500 14.5px/1.4 var(--font-sans);
                    color: var(--ink);
                }
                @media (min-width: 700px) {
                    .parus-past { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
                }
                @media (min-width: 1024px) {
                    .parus-past { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 24px; }
                }
            `}</style>
        </section>
    );
}
