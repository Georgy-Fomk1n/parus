import { CONTACTS, MEDIA, AGE_GROUPS, BRANCHES } from '../data/site.js';
import AgeBadge from '../components/AgeBadge.jsx';

/* Первый экран по п. 7.1 и 4.1 ТЗ.
   Даёт четыре ответа сразу: что за клуб, для какого возраста,
   где находится (Западное Дегунино, два филиала) и как записаться.
   Фоновое фото с градиентом для читаемости текста,
   бейджи возрастов кликабельны и ведут в отфильтрованный каталог. */
export default function Hero() {
    return (
        <section
            id="top"
            style={{
                position: 'relative',
                overflow: 'hidden',
                background: 'var(--ink-deep)',
                color: 'var(--paper)',
            }}
        >
            {/* Фоновое изображение детей с занятий */}
            <img
                src={MEDIA.hero}
                alt=""
                aria-hidden="true"
                className="parus-hero-bg"
                onError={(e) => {
                    e.currentTarget.style.display = 'none';
                }}
            />
            {/* Лёгкий градиент — гарантирует читаемость текста поверх фото */}
            <span className="parus-hero-scrim" aria-hidden="true" />

            <div className="parus-hero-inner">
                <p className="parus-hero-kicker">
                    <i className="ph-fill ph-map-pin" aria-hidden="true"></i>
                    Москва · район {CONTACTS.district}
                </p>

                <h1 className="parus-hero-title">
                    Кружки и секции для детей <em>от 1 года до 17 лет</em> в Западном Дегунино
                </h1>

                <p className="parus-hero-lead">
                    Некоммерческий клуб «Парус» работает с 2010 года. Двенадцать направлений, педагоги со стажем 15+ лет,
                    группы до восьми детей. Первое занятие — бесплатно.
                </p>

                {/* Крупные бейджи возрастов → отфильтрованный каталог */}
                <div className="parus-hero-badges">
                    <span className="parus-hero-badges-label">Выберите возраст ребёнка:</span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {AGE_GROUPS.map((g) => (
                            <AgeBadge key={g.v} label={g.label} caption={g.caption} size="lg" to={`/studios?age=${g.v}`} />
                        ))}
                    </div>
                </div>

                {/* Приоритетный CTA — звонок. Вторичный — мессенджер */}
                <div className="parus-hero-cta">
                    <a href={CONTACTS.phoneHref} className="btn-solid -coral parus-hero-call">
                        <i className="ph-fill ph-phone" aria-hidden="true" style={{ fontSize: 20 }}></i>
                        Позвонить: {CONTACTS.phone}
                    </a>
                    <a href={CONTACTS.whatsapp} target="_blank" rel="noreferrer" className="btn-line -dark">
                        <i className="ph-fill ph-whatsapp-logo" aria-hidden="true" style={{ fontSize: 18 }}></i>
                        Написать в WhatsApp
                    </a>
                </div>

                {/* Упоминание двух филиалов */}
                <ul className="parus-hero-branches">
                    {BRANCHES.map((b) => (
                        <li key={b.n}>
                            <span>Филиал {b.n}</span>
                            {b.title}
                        </li>
                    ))}
                    <li>
                        <span>Режим работы</span>
                        {CONTACTS.hours}
                    </li>
                </ul>
            </div>

            <style>{`
                .parus-hero-bg {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: center 35%;
                }
                .parus-hero-scrim {
                    position: absolute;
                    inset: 0;
                    background:
                        linear-gradient(180deg, rgba(8,25,45,.72) 0%, rgba(8,25,45,.58) 42%, rgba(8,25,45,.92) 100%),
                        linear-gradient(90deg, rgba(8,25,45,.7) 0%, rgba(8,25,45,.15) 78%);
                }
                .parus-hero-inner {
                    position: relative;
                    z-index: 1;
                    max-width: var(--shell);
                    margin: 0 auto;
                    padding: calc(72px + clamp(40px, 8vw, 88px)) var(--gutter) clamp(40px, 6vw, 72px);
                }
                .parus-hero-kicker {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    margin: 0 0 24px;
                    padding: 8px 16px;
                    background: rgba(242, 182, 58, .18);
                    border: 1px solid rgba(242, 182, 58, .5);
                    border-radius: 999px;
                    font: 500 13px/1 var(--font-sans);
                    color: var(--sun-soft);
                }
                .parus-hero-title {
                    margin: 0;
                    max-width: 18ch;
                    font: 400 clamp(32px, 5.4vw, 60px)/1.08 var(--font-serif);
                    letter-spacing: -0.015em;
                    color: #fff;
                    text-wrap: balance;
                    text-shadow: 0 2px 24px rgba(8, 25, 45, .5);
                }
                .parus-hero-title em {
                    font-style: italic;
                    color: var(--sun);
                }
                .parus-hero-lead {
                    margin: 24px 0 0;
                    max-width: 52ch;
                    font: 400 clamp(15px, 1.2vw, 18px)/1.6 var(--font-sans);
                    color: rgba(var(--cream-rgb), .88);
                    text-wrap: pretty;
                }
                .parus-hero-badges {
                    margin-top: 32px;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                .parus-hero-badges-label {
                    font: 500 13px/1 var(--font-mono);
                    letter-spacing: .06em;
                    text-transform: uppercase;
                    color: rgba(var(--cream-rgb), .62);
                }
                .parus-hero-cta {
                    margin-top: 32px;
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                }
                .parus-hero-branches {
                    margin: 40px 0 0;
                    padding: 24px 0 0;
                    list-style: none;
                    border-top: 1px solid rgba(var(--cream-rgb), .22);
                    display: grid;
                    grid-template-columns: repeat(3, minmax(0, 1fr));
                    gap: 16px 32px;
                }
                .parus-hero-branches li {
                    font: 400 15px/1.4 var(--font-sans);
                    color: rgba(var(--cream-rgb), .9);
                }
                .parus-hero-branches span {
                    display: block;
                    margin-bottom: 6px;
                    font: 500 11px/1 var(--font-mono);
                    letter-spacing: .08em;
                    text-transform: uppercase;
                    color: var(--sun-soft);
                }

                @media (max-width: 720px) {
                    .parus-hero-call { width: 100%; }
                    .parus-hero-cta .btn-line { width: 100%; }
                    .parus-hero-branches { grid-template-columns: 1fr; gap: 16px; }
                    .parus-hero-scrim {
                        background: linear-gradient(180deg, rgba(8,25,45,.78) 0%, rgba(8,25,45,.7) 40%, rgba(8,25,45,.94) 100%);
                    }
                }
            `}</style>
        </section>
    );
}
