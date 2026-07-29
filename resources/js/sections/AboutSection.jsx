import { MEDIA, TIMELINE } from '../data/site.js';
import SmartImage from '../components/SmartImage.jsx';
import { NauticalMark } from '../components/Motifs.jsx';

/* Блок «О нас» (п. 7.4 ТЗ): история и миссия клуба,
   фотографии помещений и занятий в адаптивных контейнерах. */
export default function AboutSection() {
    return (
        <section id="about-us" className="section -plain" style={{ background: 'var(--paper)', borderTop: 'none', position: 'relative', overflow: 'hidden' }}>
            <NauticalMark type="shellStar" className="parus-about-shell" />

            <div className="shell" style={{ position: 'relative', zIndex: 1 }}>
                <div className="parus-about-grid">
                    <div>
                        <span className="mono-caption">О нас</span>
                        <h2 className="serif-h2" style={{ margin: '16px 0 0' }}>
                            Клуб, который открыли <em>родители района</em> в 2010 году
                        </h2>

                        <p style={{ margin: '24px 0 0', maxWidth: '60ch', font: '400 17px/1.7 var(--font-sans)', color: 'var(--tx)', textWrap: 'pretty' }}>
                            «Парус» начинался как маленькая студия раннего развития на первом этаже жилого дома на Ивана Сусанина.
                            Через четыре года открылся хореографический зал на Коровинском, а к 2018 году клуб прошёл
                            перерегистрацию как некоммерческая организация и начал публиковать отчётность открыто.
                        </p>

                        <p style={{ margin: '16px 0 0', maxWidth: '60ch', font: '400 16px/1.7 var(--font-sans)', color: 'var(--tx-soft)', textWrap: 'pretty' }}>
                            Наша задача — чтобы у ребёнка в шаговой доступности от дома было занятие по душе и педагог,
                            который помнит его по имени. Поэтому группы остаются небольшими, а расписание собирается
                            вручную под возраст и загрузку семьи, а не «раскатывается» шаблоном на весь сезон.
                        </p>

                        <ol className="parus-timeline">
                            {TIMELINE.map((row) => (
                                <li key={row.year}>
                                    <span>{row.year}</span>
                                    <div>
                                        <strong>{row.t}</strong>
                                        <p>{row.d}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>

                    <figure style={{ margin: 0 }}>
                        <SmartImage
                            src={MEDIA.about}
                            alt="Хореографический зал клуба «Парус» на Коровинском шоссе"
                            ratio="4 / 5"
                            emptyLabel="Фото зала"
                        />
                        <figcaption style={{ marginTop: 12, font: '400 13.5px/1.55 var(--font-sans)', color: 'var(--tx-soft)' }}>
                            Хореографический зал на Коровинском шоссе 15к2: балетный станок и зеркальная стена установлены в 2014 году.
                        </figcaption>

                        <div style={{ marginTop: 16 }}>
                            <SmartImage
                                src={MEDIA.reception}
                                alt="Приёмная клуба «Парус» на Ивана Сусанина 4к5"
                                ratio="16 / 10"
                                emptyLabel="Фото приёмной"
                            />
                            <p style={{ margin: '12px 0 0', font: '400 13.5px/1.55 var(--font-sans)', color: 'var(--tx-soft)' }}>
                                Приёмная основного здания: здесь администратор помогает выбрать группу и записывает на пробное занятие.
                            </p>
                        </div>
                    </figure>
                </div>
            </div>

            <style>{`
                .parus-about-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 32px;
                    align-items: start;
                }
                .parus-timeline {
                    margin: var(--s4) 0 0;
                    padding: 0;
                    list-style: none;
                    border-top: 1px solid var(--ink);
                }
                .parus-timeline li {
                    display: grid;
                    grid-template-columns: 72px minmax(0, 1fr);
                    gap: 16px;
                    padding: 16px 0;
                    border-bottom: 1px solid var(--line);
                    align-items: baseline;
                }
                .parus-timeline span {
                    font: 400 21px/1 var(--font-serif);
                    color: var(--ink);
                }
                .parus-timeline strong {
                    font: 500 15.5px/1.35 var(--font-sans);
                    color: var(--ink);
                }
                .parus-timeline p {
                    margin: 6px 0 0;
                    font: 400 14px/1.55 var(--font-sans);
                    color: var(--tx-soft);
                }
                @media (min-width: 960px) {
                    .parus-about-grid { grid-template-columns: minmax(0, 1.25fr) minmax(0, .9fr); gap: 56px; }
                }
            `}</style>
        </section>
    );
}
