import { BRANCHES, CONTACTS } from '../data/site.js';
import YandexMap from '../components/YandexMap.jsx';

/* «Наши адреса» (п. 7.4 ТЗ): интерактивная карта с двумя метками,
   адреса с ориентирами и часы работы. На мобильных адреса под картой,
   на десктопе — рядом с картой. */
export default function BranchesBlock() {
    return (
        <section id="branches" className="section" style={{ background: 'var(--paper)' }}>
            <div className="shell">
                <span className="mono-caption">Наши адреса</span>
                <h2 className="serif-h2" style={{ margin: '16px 0 0' }}>
                    Две площадки в Западном Дегунино
                </h2>
                <p style={{ margin: '16px 0 0', maxWidth: '54ch', font: '400 15.5px/1.6 var(--font-sans)', color: 'var(--tx-soft)' }}>
                    Оба адреса — в пешей доступности друг от друга. Администратор всегда находится в приёмной основного
                    здания на Ивана Сусанина, 4к5.
                </p>

                <div className="parus-branch-grid">
                    <div className="parus-branch-map">
                        <YandexMap minHeight={280} label="Карта: адреса клуба «Парус» в Западном Дегунино" />
                    </div>

                    <ol className="parus-branch-list">
                        {BRANCHES.map((b) => (
                            <li key={b.n}>
                                <div className="parus-branch-head">
                                    <span className="parus-branch-n">{b.n}</span>
                                    <div>
                                        <h3>{b.title}</h3>
                                        <p className="parus-branch-city">{b.city}</p>
                                    </div>
                                </div>

                                <p className="parus-branch-note">{b.note}</p>

                                <p className="parus-branch-row">
                                    <i className="ph-light ph-signpost" aria-hidden="true"></i>
                                    {b.landmark}
                                </p>
                                <p className="parus-branch-row">
                                    <i className="ph-light ph-clock" aria-hidden="true"></i>
                                    {b.hours}
                                </p>
                            </li>
                        ))}
                        <li className="parus-branch-metro">
                            <i className="ph-light ph-train-simple" aria-hidden="true"></i>
                            {CONTACTS.metro}
                        </li>
                    </ol>
                </div>
            </div>

            <style>{`
                .parus-branch-grid {
                    margin-top: var(--s3);
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 24px;
                    align-items: start;
                }
                .parus-branch-map > .parus-map { height: 280px; }
                .parus-branch-list { margin: 0; padding: 0; list-style: none; }
                .parus-branch-list > li {
                    padding: 16px 0;
                    border-bottom: 1px solid var(--line);
                }
                .parus-branch-list > li:first-child { padding-top: 0; }
                .parus-branch-head { display: flex; gap: 16px; align-items: flex-start; }
                .parus-branch-n {
                    flex: none;
                    width: 40px;
                    height: 40px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--sun);
                    color: var(--ink);
                    font: 600 14px/1 var(--font-mono);
                }
                .parus-branch-head h3 {
                    margin: 0;
                    font: 400 21px/1.25 var(--font-serif);
                    color: var(--ink);
                }
                .parus-branch-city {
                    margin: 4px 0 0;
                    font: 400 14px/1.4 var(--font-sans);
                    color: var(--tx-mute);
                }
                .parus-branch-note {
                    margin: 12px 0 0;
                    padding-left: 56px;
                    font: 500 14.5px/1.5 var(--font-sans);
                    color: var(--tx);
                }
                .parus-branch-row {
                    display: flex;
                    gap: 8px;
                    margin: 8px 0 0;
                    padding-left: 56px;
                    font: 400 14px/1.55 var(--font-sans);
                    color: var(--tx-soft);
                }
                .parus-branch-row i { color: var(--accent); font-size: 18px; flex: none; }
                .parus-branch-metro {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font: 500 14.5px/1.4 var(--font-sans);
                    color: var(--ink);
                    border-bottom: none !important;
                }
                .parus-branch-metro i { font-size: 20px; color: var(--accent); }

                @media (max-width: 719px) {
                    .parus-branch-note,
                    .parus-branch-row { padding-left: 0; }
                }
                @media (min-width: 900px) {
                    .parus-branch-grid { grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); gap: 40px; }
                    .parus-branch-map > .parus-map { height: 460px; }
                }
            `}</style>
        </section>
    );
}
