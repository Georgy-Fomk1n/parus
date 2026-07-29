import { ADVANTAGES } from '../data/site.js';

/* «Преимущества клуба» (п. 7.1 ТЗ): иконки и краткие описания,
   минималистичный дизайн с акцентом на читаемость, 3–4 пункта. */
export default function FeaturesRow() {
    return (
        <section className="section" style={{ background: 'var(--paper)' }}>
            <div className="shell">
                <span className="mono-caption">Почему родители выбирают «Парус»</span>

                <ul className="parus-adv">
                    {ADVANTAGES.map((a) => (
                        <li key={a.t}>
                            <span className="parus-adv-ic" aria-hidden="true">
                                <i className={`ph-light ${a.ic}`}></i>
                            </span>
                            <h3>{a.t}</h3>
                            <p>{a.d}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <style>{`
                .parus-adv {
                    margin: var(--s3) 0 0;
                    padding: 0;
                    list-style: none;
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 24px;
                }
                .parus-adv li {
                    padding-top: 24px;
                    border-top: 2px solid var(--sun);
                }
                .parus-adv-ic {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 48px;
                    height: 48px;
                    background: var(--sun-wash);
                    color: var(--ink);
                    font-size: 26px;
                    margin-bottom: 16px;
                }
                .parus-adv h3 {
                    margin: 0;
                    font: 500 18px/1.35 var(--font-sans);
                    color: var(--ink);
                    text-wrap: balance;
                }
                .parus-adv p {
                    margin: 8px 0 0;
                    font: 400 15px/1.6 var(--font-sans);
                    color: var(--tx-soft);
                    max-width: 40ch;
                }
                @media (min-width: 640px) {
                    .parus-adv { grid-template-columns: 1fr 1fr; gap: 32px; }
                }
                @media (min-width: 1024px) {
                    .parus-adv { grid-template-columns: repeat(4, minmax(0, 1fr)); }
                }
            `}</style>
        </section>
    );
}
