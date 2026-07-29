import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import ClubCard from '../components/ClubCard.jsx';
import { CLUBS, AGE_FILTERS, DIRECTIONS, CONTACTS } from '../data/site.js';

/* Страница каталога (п. 7.2.1 ТЗ).
   Панель фильтров: возрастной диапазон + направление.
   На мобильной — горизонтальный скролл чипсов, на десктопе — строка фильтров.
   Состояния фильтров: Default / Selected / Disabled. */
export default function CatalogPage() {
    const [params, setParams] = useSearchParams();
    const age = params.get('age') || 'all';
    const dir = params.get('dir') || 'all';

    useEffect(() => {
        document.title = 'Кружки и секции — клуб «Парус»';
    }, []);

    const byAge = useMemo(() => CLUBS.filter((c) => age === 'all' || c.ages.includes(age)), [age]);
    const shown = useMemo(() => byAge.filter((c) => dir === 'all' || c.direction === dir), [byAge, dir]);

    const setFilter = (key, value) => {
        const next = new URLSearchParams(params);
        if (value === 'all') next.delete(key);
        else next.set(key, value);
        setParams(next, { replace: true });
    };

    /* Направление отключается, если при выбранном возрасте под него нет кружков */
    const dirCount = (v) => (v === 'all' ? byAge.length : byAge.filter((c) => c.direction === v).length);

    const resetAll = () => setParams(new URLSearchParams(), { replace: true });
    const hasFilters = age !== 'all' || dir !== 'all';

    return (
        <>
            <PageHeader
                eyebrow="Кружки и секции"
                title={
                    <>
                        Двенадцать <em>кружков</em> для детей от 1 года до 17 лет
                    </>
                }
                description="Стоимость и расписание указаны прямо в карточке — отдельного прайс-листа нет. Отфильтруйте по возрасту ребёнка и направлению, чтобы увидеть только подходящие группы."
            />

            {/* Панель фильтров */}
            <section
                className="parus-filters"
                aria-label="Фильтры каталога"
                style={{ padding: '16px var(--gutter)', background: 'var(--paper-2)', borderBottom: '1px solid var(--line)' }}
            >
                <div className="shell">
                    <div className="parus-filter-group">
                        <span className="parus-filter-label" id="filter-age">
                            Возраст
                        </span>
                        <div className="chip-row" role="group" aria-labelledby="filter-age">
                            {AGE_FILTERS.map((f) => (
                                <button
                                    key={f.v}
                                    type="button"
                                    className="chip"
                                    data-selected={age === f.v ? 'true' : 'false'}
                                    aria-pressed={age === f.v}
                                    onClick={() => setFilter('age', f.v)}
                                >
                                    {f.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="parus-filter-group">
                        <span className="parus-filter-label" id="filter-dir">
                            Направление
                        </span>
                        <div className="chip-row" role="group" aria-labelledby="filter-dir">
                            {DIRECTIONS.map((d) => {
                                const count = dirCount(d.v);
                                const disabled = count === 0;
                                return (
                                    <button
                                        key={d.v}
                                        type="button"
                                        className="chip"
                                        data-selected={dir === d.v ? 'true' : 'false'}
                                        aria-pressed={dir === d.v}
                                        disabled={disabled}
                                        title={disabled ? 'Для выбранного возраста нет кружков этого направления' : undefined}
                                        onClick={() => setFilter('dir', d.v)}
                                    >
                                        <i className={`ph-light ${d.ic}`} aria-hidden="true"></i>
                                        {d.label}
                                        <span style={{ opacity: 0.6, fontSize: 12 }}>{count}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Сетка карточек */}
            <section className="section -plain" style={{ background: 'var(--paper)', borderTop: 'none' }}>
                <div className="shell">
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: 16,
                            marginBottom: 'var(--s3)',
                        }}
                    >
                        <p className="mono-caption" style={{ margin: 0 }} role="status">
                            Показано {shown.length} из {CLUBS.length}
                        </p>
                        {hasFilters && (
                            <button type="button" className="chip" onClick={resetAll}>
                                <i className="ph-light ph-x" aria-hidden="true"></i>
                                Сбросить фильтры
                            </button>
                        )}
                    </div>

                    {shown.length > 0 ? (
                        <div className="parus-catalog-grid">
                            {shown.map((club) => (
                                <ClubCard key={club.slug} club={club} />
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <i className="ph-light ph-binoculars" aria-hidden="true" style={{ fontSize: 40, display: 'block', marginBottom: 16 }}></i>
                            <p style={{ margin: '0 0 8px', font: '500 18px/1.4 var(--font-sans)', color: 'var(--ink)' }}>
                                По этим фильтрам ничего не нашлось
                            </p>
                            <p style={{ margin: '0 0 24px', font: '400 15px/1.6 var(--font-sans)' }}>
                                Сбросьте фильтры или позвоните — подберём группу по возрасту вручную.
                            </p>
                            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
                                <button type="button" className="btn-line" onClick={resetAll}>
                                    Сбросить фильтры
                                </button>
                                <a href={CONTACTS.phoneHref} className="btn-solid -coral">
                                    <i className="ph-fill ph-phone" aria-hidden="true" style={{ fontSize: 18 }}></i>
                                    Позвонить
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <style>{`
                .parus-filters { position: sticky; top: 73px; z-index: 50; }
                .parus-filter-group + .parus-filter-group { margin-top: 12px; }
                .parus-filter-label {
                    display: block;
                    margin-bottom: 8px;
                    font: 500 11.5px/1 var(--font-mono);
                    letter-spacing: .06em;
                    text-transform: uppercase;
                    color: var(--tx-soft);
                }
                .parus-catalog-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 16px;
                }
                @media (min-width: 600px) {
                    .parus-catalog-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; }
                }
                @media (min-width: 1024px) {
                    .parus-catalog-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
                    .parus-filter-group {
                        display: grid;
                        grid-template-columns: 120px minmax(0, 1fr);
                        align-items: center;
                        gap: 16px;
                    }
                    .parus-filter-label { margin-bottom: 0; }
                }
            `}</style>
        </>
    );
}
