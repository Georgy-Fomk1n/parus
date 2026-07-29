import { DIRECTOR } from '../data/site.js';
import SmartImage from '../components/SmartImage.jsx';

/* Блок «О нашем директоре» (п. 7.4 ТЗ).
   Фотография в круглом контейнере, имя — крупно, должность — средним
   шрифтом, описание — обычным текстом, обращение к родителям — отдельной
   цитатой. Блок компактный и работает на личный контакт. */
export default function DirectorBlock() {
    return (
        <section id="director" className="section" style={{ background: 'var(--sky-2)' }}>
            <div className="shell">
                <span className="mono-caption">О нашем директоре</span>

                <div className="parus-dir">
                    <div className="parus-dir-photo">
                        <SmartImage
                            src={DIRECTOR.img}
                            alt={DIRECTOR.name}
                            ratio="1 / 1"
                            objectPosition="50% 15%"
                            emptyLabel="Фото директора"
                            style={{ borderRadius: '50%', border: '4px solid var(--sun)' }}
                        />
                    </div>

                    <div className="parus-dir-body">
                        <h2>{DIRECTOR.name}</h2>
                        <p className="parus-dir-role">{DIRECTOR.role}</p>

                        <ul className="parus-dir-facts">
                            {DIRECTOR.facts.map((f) => (
                                <li key={f}>
                                    <i className="ph-fill ph-seal-check" aria-hidden="true"></i>
                                    {f}
                                </li>
                            ))}
                        </ul>

                        <p className="parus-dir-text">{DIRECTOR.text}</p>

                        <blockquote className="parus-dir-quote">
                            <i className="ph-fill ph-quotes" aria-hidden="true"></i>
                            {DIRECTOR.quote}
                            <footer>— {DIRECTOR.name}</footer>
                        </blockquote>
                    </div>
                </div>
            </div>

            <style>{`
                .parus-dir {
                    margin-top: var(--s3);
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 24px;
                    align-items: start;
                }
                .parus-dir-photo { width: 176px; max-width: 50%; }
                .parus-dir-body h2 {
                    margin: 0;
                    font: 400 clamp(26px, 3vw, 36px)/1.15 var(--font-serif);
                    color: var(--ink);
                }
                .parus-dir-role {
                    margin: 8px 0 0;
                    font: 500 17px/1.4 var(--font-sans);
                    color: var(--accent);
                }
                .parus-dir-facts {
                    margin: 16px 0 0;
                    padding: 0;
                    list-style: none;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                .parus-dir-facts li {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font: 400 15px/1.45 var(--font-sans);
                    color: var(--tx);
                }
                .parus-dir-facts i { color: var(--ink); font-size: 18px; flex: none; }
                .parus-dir-text {
                    margin: 24px 0 0;
                    max-width: 62ch;
                    font: 400 16px/1.7 var(--font-sans);
                    color: var(--tx-soft);
                }
                .parus-dir-quote {
                    position: relative;
                    margin: 24px 0 0;
                    padding: 24px 24px 24px 32px;
                    background: var(--paper-3);
                    border-left: 4px solid var(--sun);
                    font: italic 400 clamp(17px, 1.7vw, 21px)/1.5 var(--font-serif);
                    color: var(--ink);
                    max-width: 60ch;
                    text-wrap: pretty;
                }
                .parus-dir-quote > i {
                    position: absolute;
                    top: 16px;
                    right: 16px;
                    font-size: 28px;
                    color: var(--sun);
                    opacity: .8;
                }
                .parus-dir-quote footer {
                    margin-top: 16px;
                    font: 500 13.5px/1.4 var(--font-sans);
                    font-style: normal;
                    color: var(--tx-soft);
                }
                @media (min-width: 760px) {
                    .parus-dir { grid-template-columns: 200px minmax(0, 1fr); gap: 40px; }
                    .parus-dir-photo { width: 200px; max-width: none; }
                }
            `}</style>
        </section>
    );
}
