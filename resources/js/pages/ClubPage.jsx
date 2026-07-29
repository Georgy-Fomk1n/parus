import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import SmartImage from '../components/SmartImage.jsx';
import AgeBadge from '../components/AgeBadge.jsx';
import ClubCard from '../components/ClubCard.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import { getClub, getTeacher, directionLabel, SCHEDULE_STATUS, CLUBS, CONTACTS, BRANCHES } from '../data/site.js';

/* Детальная страница кружка (п. 7.2.2 ТЗ):
   галерея → основная информация → педагог → расписание и стоимость →
   описание программы → блок CTA (на мобильной зафиксирован внизу экрана). */
export default function ClubPage() {
    const { slug } = useParams();
    const club = getClub(slug);
    const [shot, setShot] = useState(0);

    useEffect(() => {
        setShot(0);
        if (club) document.title = `${club.short} — клуб «Парус»`;
    }, [slug, club]);

    if (!club) return <NotFoundPage />;

    const teacher = getTeacher(club.teacherId);
    const branch = BRANCHES[club.branch] || BRANCHES[0];
    const gallery = club.gallery && club.gallery.length ? club.gallery : [club.img];
    const related = CLUBS.filter((c) => c.slug !== club.slug && c.direction === club.direction).slice(0, 3);

    return (
        <div style={{ paddingBottom: 'var(--club-pad, 0px)' }} className="parus-club-page">
            <PageHeader
                breadcrumbs={[
                    { label: 'Главная', to: '/' },
                    { label: 'Кружки и секции', to: '/studios' },
                    { label: club.short },
                ]}
                title={club.title}
            >
                {/* Основная информация: бейдж возраста и направление */}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, marginTop: 24 }}>
                    <AgeBadge label={club.ageLabel} as="static" />
                    <Link to={`/studios?dir=${club.direction}`} className="chip">
                        {directionLabel(club.direction)}
                    </Link>
                    <span className="chip" style={{ cursor: 'default' }}>
                        <i className="ph-light ph-map-pin" aria-hidden="true"></i>
                        Филиал {branch.n} · {branch.title}
                    </span>
                </div>

                <p style={{ margin: '24px 0 0', maxWidth: '56ch', font: '400 clamp(15px, 1.15vw, 17.5px)/1.6 var(--font-sans)', color: 'var(--tx)' }}>
                    {club.summary}
                </p>
            </PageHeader>

            {/* Галерея: основное фото и дополнительные изображения */}
            <section className="section -plain" style={{ background: 'var(--paper)', borderTop: 'none' }}>
                <div className="shell">
                    <div className="parus-club-grid">
                        <div>
                            <SmartImage
                                src={gallery[shot]}
                                alt={`${club.title}: занятие в клубе «Парус»`}
                                ratio="3 / 2"
                                priority
                                emptyLabel="Фото занятия готовится"
                            />

                            {gallery.length > 1 && (
                                <div className="parus-thumbs" role="group" aria-label="Дополнительные изображения">
                                    {gallery.map((g, i) => (
                                        <button
                                            key={g + i}
                                            type="button"
                                            onClick={() => setShot(i)}
                                            aria-label={`Показать фото ${i + 1} из ${gallery.length}`}
                                            aria-pressed={shot === i}
                                            data-active={shot === i ? 'true' : 'false'}
                                        >
                                            <SmartImage src={g} alt="" ratio="4 / 3" emptyLabel="" />
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Описание программы */}
                            <div style={{ marginTop: 'var(--s5)' }}>
                                <h2 className="serif-h2" style={{ margin: 0 }}>
                                    Как проходят занятия
                                </h2>
                                {club.program.map((p, i) => (
                                    <p
                                        key={i}
                                        style={{
                                            margin: '16px 0 0',
                                            maxWidth: '64ch',
                                            font: '400 16.5px/1.7 var(--font-sans)',
                                            color: i === 0 ? 'var(--tx)' : 'var(--tx-soft)',
                                            textWrap: 'pretty',
                                        }}
                                    >
                                        {p}
                                    </p>
                                ))}

                                <ul className="parus-club-facts">
                                    {club.highlights.map((h) => (
                                        <li key={h}>
                                            <i className="ph-fill ph-check-circle" aria-hidden="true"></i>
                                            {h}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Боковая колонка: педагог + цена + CTA (десктоп) */}
                        <aside className="parus-club-aside">
                            {teacher && (
                                <div className="parus-teacher">
                                    <span className="mono-caption">Педагог</span>
                                    <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginTop: 16 }}>
                                        <SmartImage
                                            src={teacher.img}
                                            alt={teacher.n}
                                            ratio="1 / 1"
                                            objectPosition="50% 18%"
                                            style={{ width: 80, flex: 'none', borderRadius: '50%' }}
                                            emptyLabel=""
                                        />
                                        <div>
                                            <div style={{ font: '400 19px/1.25 var(--font-serif)', color: 'var(--ink)' }}>{teacher.n}</div>
                                            <div style={{ marginTop: 4, font: '500 13px/1.35 var(--font-sans)', color: 'var(--accent)' }}>{teacher.years}</div>
                                        </div>
                                    </div>
                                    <p style={{ margin: '16px 0 0', font: '400 14.5px/1.6 var(--font-sans)', color: 'var(--tx-soft)' }}>{teacher.d}</p>
                                </div>
                            )}

                            <div className="parus-price-box">
                                <span className="mono-caption">Стоимость</span>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 8 }}>
                                    <span className="club-price" style={{ fontSize: 32 }}>
                                        {club.price}
                                    </span>
                                </div>
                                <p style={{ margin: '8px 0 0', font: '400 14px/1.5 var(--font-sans)', color: 'var(--tx-soft)' }}>{club.priceNote}</p>

                                <div className="parus-aside-cta">
                                    <a href={CONTACTS.phoneHref} className="btn-solid -coral -wide">
                                        <i className="ph-fill ph-phone" aria-hidden="true" style={{ fontSize: 18 }}></i>
                                        Позвонить для записи
                                    </a>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8 }}>
                                        <a href={CONTACTS.whatsapp} target="_blank" rel="noreferrer" className="btn-line">
                                            <i className="ph-fill ph-whatsapp-logo" aria-hidden="true" style={{ fontSize: 18 }}></i>
                                            WhatsApp
                                        </a>
                                        <a href={CONTACTS.telegram} target="_blank" rel="noreferrer" className="btn-line">
                                            <i className="ph-fill ph-telegram-logo" aria-hidden="true" style={{ fontSize: 18 }}></i>
                                            Telegram
                                        </a>
                                    </div>
                                    <p style={{ margin: '12px 0 0', font: '400 13px/1.5 var(--font-sans)', color: 'var(--tx-mute)' }}>
                                        Первое занятие бесплатно. Звонок принимает администратор клуба, {CONTACTS.hours.toLowerCase()}.
                                    </p>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* Расписание и стоимость */}
            <section className="section" style={{ background: 'var(--paper-2)' }}>
                <div className="shell">
                    <h2 className="serif-h2" style={{ margin: 0 }}>
                        Расписание и стоимость
                    </h2>
                    <p style={{ margin: '16px 0 0', maxWidth: '52ch', font: '400 15px/1.6 var(--font-sans)', color: 'var(--tx-soft)' }}>
                        Актуально на текущий сезон. Наличие мест меняется — точный статус подтверждает администратор при звонке.
                    </p>

                    <div style={{ marginTop: 'var(--s3)', overflowX: 'auto' }}>
                        <table className="sched">
                            <thead>
                                <tr>
                                    <th>День недели</th>
                                    <th>Время</th>
                                    <th>Стоимость</th>
                                    <th>Места</th>
                                </tr>
                            </thead>
                            <tbody>
                                {club.schedule.map((row, i) => {
                                    const st = SCHEDULE_STATUS[row.status];
                                    return (
                                        <tr key={i}>
                                            <td data-col="day" style={{ font: '500 16px/1.35 var(--font-sans)', color: 'var(--ink)' }}>
                                                {row.day}
                                            </td>
                                            <td data-col="time" style={{ color: 'var(--tx-soft)' }}>{row.time}</td>
                                            <td data-col="price">
                                                <span className="club-price" style={{ fontSize: 17 }}>{row.price}</span>
                                            </td>
                                            <td data-col="status">
                                                <span className={`status -${st.tone}`}>
                                                    <i
                                                        className={`ph-fill ${row.status === 'full' ? 'ph-x-circle' : row.status === 'few' ? 'ph-warning-circle' : 'ph-check-circle'}`}
                                                        aria-hidden="true"
                                                    ></i>
                                                    {st.label}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <p style={{ margin: '24px 0 0', font: '400 14px/1.55 var(--font-sans)', color: 'var(--tx-mute)' }}>
                        Занятия проходят по адресу: {branch.title}, {branch.city}. {branch.landmark}
                    </p>
                </div>
            </section>

            {/* Похожие кружки */}
            {related.length > 0 && (
                <section className="section" style={{ background: 'var(--paper)' }}>
                    <div className="shell">
                        <div className="parus-sec-head">
                            <h2 className="serif-h2" style={{ margin: 0 }}>
                                Похожие направления
                            </h2>
                            <Link to="/studios" className="btn-line parus-sec-head-btn">
                                Весь каталог
                                <i className="ph-light ph-arrow-right" aria-hidden="true"></i>
                            </Link>
                        </div>
                        <div className="carousel" style={{ marginTop: 'var(--s3)' }}>
                            {related.map((c) => (
                                <ClubCard key={c.slug} club={c} compact />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Мобильный фиксированный CTA (п. 7.2.2 ТЗ) */}
            <div className="sticky-cta">
                <a href={CONTACTS.phoneHref} className="btn-solid -coral">
                    <i className="ph-fill ph-phone" aria-hidden="true" style={{ fontSize: 18 }}></i>
                    Позвонить для записи
                </a>
                <a href={CONTACTS.whatsapp} target="_blank" rel="noreferrer" className="btn-line" aria-label="Написать в WhatsApp" style={{ width: 48, padding: 0 }}>
                    <i className="ph-fill ph-whatsapp-logo" aria-hidden="true" style={{ fontSize: 20 }}></i>
                </a>
            </div>

            <style>{`
                .parus-club-page { --club-pad: 80px; }
                .parus-club-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 32px;
                    align-items: start;
                }
                .parus-thumbs {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(88px, 1fr));
                    gap: 8px;
                    margin-top: 8px;
                }
                .parus-thumbs button {
                    padding: 0;
                    border: 2px solid transparent;
                    background: none;
                    cursor: pointer;
                    overflow: hidden;
                    transition: border-color .18s, opacity .18s;
                    opacity: .72;
                }
                .parus-thumbs button:hover { opacity: 1; }
                .parus-thumbs button[data-active="true"] { border-color: var(--accent); opacity: 1; }
                .parus-club-facts {
                    margin: 24px 0 0;
                    padding: 0;
                    list-style: none;
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px 24px;
                }
                .parus-club-facts li {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    font: 500 14.5px/1.4 var(--font-sans);
                    color: var(--ink);
                }
                .parus-club-facts i { color: var(--ok); font-size: 18px; }
                .parus-teacher,
                .parus-price-box {
                    padding: 24px;
                    background: var(--paper-3);
                    border: 1px solid var(--line);
                }
                .parus-price-box { margin-top: 16px; }
                .parus-aside-cta { margin-top: 24px; }

                @media (max-width: 899px) {
                    /* На мобильной кнопки продублированы в липкой панели снизу */
                    .parus-aside-cta { display: none; }
                }
                @media (min-width: 900px) {
                    .parus-club-page { --club-pad: 0px; }
                    .parus-club-grid {
                        grid-template-columns: minmax(0, 1.55fr) minmax(300px, .95fr);
                        gap: 48px;
                    }
                    .parus-club-aside { position: sticky; top: 96px; }
                }
            `}</style>
        </div>
    );
}
