import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import AgeBadge from '../components/AgeBadge.jsx';
import ClubCard from '../components/ClubCard.jsx';
import SmartImage from '../components/SmartImage.jsx';
import { CLUBS, AGE_GROUPS } from '../data/site.js';

/* UI Kit / Style Guide (п. 10 и критерии 3–4 ТЗ).
   Служебная страница вне основной навигации: палитра с HEX-кодами,
   типографическая шкала, библиотека компонентов и все состояния
   интерактивных элементов из раздела 8 ТЗ. */

const PALETTE = [
    { g: 'Основные', items: [
        { n: 'Ink (флотский синий)', v: '#163B64', tx: '#fff', use: 'Заголовки, шапка, основные кнопки' },
        { n: 'Ink Deep', v: '#08192D', tx: '#fff', use: 'Подвал, тёмные подложки, оверлей героя' },
        { n: 'Accent (акцент CTA)', v: '#C8462E', tx: '#fff', use: 'Приоритетные кнопки, цены, выбранные фильтры' },
        { n: 'Sun (солнечный)', v: '#F2B63A', tx: '#12263C', use: 'Возрастные бейджи, акценты, индикаторы' },
    ] },
    { g: 'Фоны', items: [
        { n: 'Paper', v: '#EEF1F4', tx: '#1B2B3F', use: 'Основной фон страниц' },
        { n: 'Paper 3', v: '#FAFBFC', tx: '#1B2B3F', use: 'Карточки и панели' },
        { n: 'Sky 2', v: '#E7F1F8', tx: '#1B2B3F', use: 'Чередующиеся секции' },
        { n: 'Mist', v: '#DFE4EA', tx: '#1B2B3F', use: 'Плейсхолдеры изображений, блок документов' },
    ] },
    { g: 'Текст и линии', items: [
        { n: 'Text', v: '#1B2B3F', tx: '#fff', use: 'Основной текст' },
        { n: 'Text Soft', v: '#4D5E73', tx: '#fff', use: 'Вторичный текст, описания' },
        { n: 'Text Mute', v: '#7A8797', tx: '#fff', use: 'Подписи, метаданные' },
        { n: 'Line', v: '#163B64', tx: '#fff', use: 'Границы: 16% прозрачности от Ink' },
    ] },
    { g: 'Статусы', items: [
        { n: 'Success', v: '#2F7D4F', tx: '#fff', use: 'Есть места, успешная валидация' },
        { n: 'Warning', v: '#B5741A', tx: '#fff', use: 'Осталось мало мест' },
        { n: 'Error', v: '#C8462E', tx: '#fff', use: 'Ошибка поля ввода' },
        { n: 'Disabled', v: '#E3E7EC', tx: '#7A8797', use: 'Недоступные кнопки и фильтры' },
    ] },
];

const TYPE_SCALE = [
    { n: 'Display / H1', spec: 'PT Serif 400 · 32→60px / 1.08', cls: 'display', sample: 'Кружки для детей' },
    { n: 'H2', spec: 'PT Serif 400 · 26→38px / 1.14', cls: 'serif-h2', sample: 'Расписание и стоимость' },
    { n: 'H3', spec: 'PT Serif 400 · 20px / 1.25', style: { font: '400 20px/1.25 var(--font-serif)', color: 'var(--ink)' }, sample: 'Гимнастика «Звёздочки»' },
    { n: 'Body L', spec: 'Golos Text 400 · 17px / 1.7', style: { font: '400 17px/1.7 var(--font-sans)', color: 'var(--tx)' }, sample: 'Занятие идёт 45 минут и собрано из коротких блоков.' },
    { n: 'Body', spec: 'Golos Text 400 · 15px / 1.6', style: { font: '400 15px/1.6 var(--font-sans)', color: 'var(--tx-soft)' }, sample: 'Педагоги со стажем 15+ лет, группы до восьми детей.' },
    { n: 'Caption / Mono', spec: 'JetBrains Mono 500 · 11.5px, uppercase', cls: 'mono-caption', sample: 'Кружки и секции' },
    { n: 'Price', spec: 'Golos Text 600 · 20px, цвет Accent', style: { font: '600 20px/1 var(--font-sans)', color: 'var(--accent)' }, sample: 'от 550 ₽' },
];

const INTERACTIONS = [
    { t: 'Фильтры каталога', d: 'Чипсы возраста и направления. Выбор пишется в query-параметры (?age=6-12&dir=sport), поэтому ссылку на отфильтрованный каталог можно передать. Направление становится Disabled, если под выбранный возраст в нём нет кружков. Счётчик «Показано N из 12» обновляется мгновенно, без перезагрузки.' },
    { t: 'Возрастные бейджи первого экрана', d: 'Кликабельны и ведут в каталог с уже применённым фильтром возраста. В карточках кружков бейдж статичен и служит только маркером.' },
    { t: 'Карусель популярных кружков', d: 'На ширине до 900px — горизонтальный скролл со snap по карточкам и подсказкой о свайпе. От 900px превращается в сетку авто-заполнения, скролл отключается.' },
    { t: 'Табы документов', d: 'Две вкладки переключают список без перезагрузки. При переключении открытый элемент аккордеона сворачивается. Активная вкладка отмечена цветом, жирностью и подчёркиванием акцентом.' },
    { t: 'Аккордеон документов', d: 'Одновременно раскрыт один элемент; повторное нажатие сворачивает его. Индикатор — стрелка, поворачивающаяся на 180° и заливающаяся солнечным цветом. Внутри — описание и кнопка скачивания.' },
    { t: 'Галерея на детальной странице', d: 'Клик по миниатюре меняет основное изображение; активная миниатюра обведена акцентом. Контейнер держит пропорцию 3:2 независимо от исходного файла.' },
    { t: 'Липкая панель CTA', d: 'На ширине до 900px кнопки «Позвонить для записи» и мессенджер закреплены внизу экрана; на десктопе они живут в боковой колонке, а панель скрывается.' },
    { t: 'Состояния изображений', d: 'Пока файл грузится — мерцающий скелетон. Если файла нет или он не загрузился — заглушка с иконкой и подписью. Любые пропорции обрезаются по object-fit: cover внутри фиксированного контейнера.' },
];

export default function UiKitPage() {
    const [chip, setChip] = useState('a');
    const [tab, setTab] = useState('one');
    const [acc, setAcc] = useState(false);
    const [badge, setBadge] = useState('6-12');

    useEffect(() => {
        document.title = 'UI Kit — клуб «Парус»';
    }, []);

    return (
        <>
            <PageHeader
                eyebrow="UI Kit / Style Guide"
                title={<>Библиотека <em>компонентов</em> сайта</>}
                description="Служебная страница вне основной навигации. Здесь собраны цветовая палитра с HEX-кодами, типографическая шкала, компоненты интерфейса и все их состояния, а также описание логики интерактивных элементов."
            />

            {/* Палитра */}
            <Block id="colors" title="Цветовая палитра">
                {PALETTE.map((group) => (
                    <div key={group.g} style={{ marginTop: 'var(--s3)' }}>
                        <span className="mono-caption">{group.g}</span>
                        <div className="uk-colors">
                            {group.items.map((c) => (
                                <div key={c.n} className="uk-color">
                                    <span style={{ background: c.v, color: c.tx }}>{c.v}</span>
                                    <strong>{c.n}</strong>
                                    <em>{c.use}</em>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </Block>

            {/* Типографика */}
            <Block id="type" title="Типографическая шкала" tone="var(--paper-2)">
                <div className="uk-type">
                    {TYPE_SCALE.map((t) => (
                        <div key={t.n}>
                            <div className="uk-type-meta">
                                <strong>{t.n}</strong>
                                <span>{t.spec}</span>
                            </div>
                            <div className={t.cls} style={t.style}>
                                {t.sample}
                            </div>
                        </div>
                    ))}
                </div>
                <p style={{ marginTop: 'var(--s3)', font: '400 14px/1.6 var(--font-sans)', color: 'var(--tx-soft)', maxWidth: '64ch' }}>
                    Сетка отступов — 8 пикселей: 8 / 16 / 24 / 32 / 40 / 48 / 64 / 80 / 96 / 128. Все вертикальные и
                    горизонтальные интервалы в макете кратны восьми.
                </p>
            </Block>

            {/* Кнопки */}
            <Block id="buttons" title="Кнопки: Default · Hover · Active · Disabled">
                <Row label="Приоритетный CTA (звонок)">
                    <a href="#buttons" className="btn-solid -coral">
                        <i className="ph-fill ph-phone" aria-hidden="true"></i>
                        Позвонить
                    </a>
                    <button type="button" className="btn-solid -coral" disabled>
                        Позвонить
                    </button>
                </Row>
                <Row label="Основная кнопка">
                    <button type="button" className="btn-solid">
                        Смотреть каталог
                    </button>
                    <button type="button" className="btn-solid" disabled>
                        Смотреть каталог
                    </button>
                </Row>
                <Row label="Вторичная кнопка">
                    <button type="button" className="btn-line">
                        Подробнее
                    </button>
                    <button type="button" className="btn-line" disabled>
                        Подробнее
                    </button>
                </Row>
                <p className="uk-note">
                    Hover и Active показываются при наведении и нажатии: заливка темнеет, кнопка смещается на 1px вниз.
                    Disabled — серая заливка, серый текст, курсор «недоступно», события мыши отключены.
                </p>
            </Block>

            {/* Бейджи */}
            <Block id="badges" title="Возрастные бейджи: Default · Active" tone="var(--paper-2)">
                <Row label="Крупные (первый экран)">
                    {AGE_GROUPS.map((g) => (
                        <AgeBadge key={g.v} label={g.label} caption={g.caption} size="lg" active={badge === g.v} onClick={() => setBadge(g.v)} />
                    ))}
                </Row>
                <Row label="В карточке (статичный)">
                    <AgeBadge label="1–3 года" as="static" />
                    <AgeBadge label="6–17 лет" as="static" />
                </Row>
                <p className="uk-note">
                    Active-состояние инвертирует бейдж: солнечная заливка меняется на флотский синий с белым текстом.
                    Контраст текста к фону в обоих состояниях выше 4.5:1.
                </p>
            </Block>

            {/* Фильтры */}
            <Block id="filters" title="Фильтры: Default · Selected · Disabled">
                <Row label="Чипсы каталога">
                    <button type="button" className="chip" data-selected={chip === 'a'} onClick={() => setChip('a')}>
                        Любой возраст
                    </button>
                    <button type="button" className="chip" data-selected={chip === 'b'} onClick={() => setChip('b')}>
                        6–12 лет
                    </button>
                    <button type="button" className="chip" disabled>
                        Языки · 0
                    </button>
                </Row>
                <p className="uk-note">Selected-состояние заливается акцентным цветом. Disabled используется, когда под выбранный возраст в направлении нет кружков.</p>
            </Block>

            {/* Табы и аккордеон */}
            <Block id="tabs" title="Табы и аккордеон" tone="var(--paper-2)">
                <div className="tabs" role="tablist" aria-label="Пример вкладок">
                    <button type="button" role="tab" className="tab" aria-selected={tab === 'one'} onClick={() => setTab('one')}>
                        Основные
                    </button>
                    <button type="button" role="tab" className="tab" aria-selected={tab === 'two'} onClick={() => setTab('two')}>
                        Отчёты
                    </button>
                </div>

                <div style={{ marginTop: 16 }}>
                    <div className="acc-item">
                        <button type="button" className="acc-head" aria-expanded={acc} onClick={() => setAcc((v) => !v)}>
                            <span className="acc-icon" aria-hidden="true">
                                <i className="ph-light ph-file-pdf"></i>
                            </span>
                            <span style={{ flex: 1, textAlign: 'left', font: '500 16px/1.4 var(--font-sans)' }}>
                                Устав организации
                                <span style={{ display: 'block', font: '400 13px/1.3 var(--font-mono)', color: 'var(--tx-mute)' }}>PDF · 1,2 МБ</span>
                            </span>
                            <span className="acc-toggle" aria-hidden="true">
                                <i className="ph-light ph-caret-down"></i>
                            </span>
                        </button>
                        {acc && (
                            <div className="acc-panel">
                                <p style={{ margin: '0 0 16px', font: '400 15px/1.6 var(--font-sans)', color: 'var(--tx-soft)' }}>
                                    Действующая редакция 2024 года со всеми изменениями.
                                </p>
                                <a href="#tabs" className="btn-line">
                                    <i className="ph-light ph-download-simple" aria-hidden="true"></i>
                                    Скачать PDF
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </Block>

            {/* Поля ввода */}
            <Block id="fields" title="Поля ввода: Default · Focus · Error · Success">
                <div className="uk-fields">
                    <label className="field">
                        <span className="field-label">Имя ребёнка — Default</span>
                        <input className="input" placeholder="Например, Мирослава" />
                    </label>
                    <label className="field">
                        <span className="field-label">Телефон — Error</span>
                        <input className="input" data-state="error" defaultValue="+7 925 18" aria-invalid="true" />
                        <span className="field-msg -error">
                            <i className="ph-fill ph-warning-circle" aria-hidden="true"></i>
                            Не хватает цифр: номер должен содержать 11 знаков
                        </span>
                    </label>
                    <label className="field">
                        <span className="field-label">Телефон — Success</span>
                        <input className="input" data-state="success" defaultValue="+7 925 182-65-56" />
                        <span className="field-msg -success">
                            <i className="ph-fill ph-check-circle" aria-hidden="true"></i>
                            Номер принят
                        </span>
                    </label>
                    <label className="field">
                        <span className="field-label">Возраст — Disabled</span>
                        <input className="input" defaultValue="Выберите кружок" disabled />
                    </label>
                </div>
                <p className="uk-note">Состояние Focus подсвечивает рамку флотским синим и добавляет мягкое кольцо. Error всегда сопровождается текстовым описанием причины.</p>
            </Block>

            {/* Карточки и статусы */}
            <Block id="cards" title="Карточки, статусы и медиа" tone="var(--paper-2)">
                <div className="uk-cards">
                    <ClubCard club={CLUBS[0]} />
                    <div>
                        <span className="mono-caption">Статусы наличия мест</span>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
                            <span className="status -ok"><i className="ph-fill ph-check-circle" aria-hidden="true"></i>Есть места</span>
                            <span className="status -warn"><i className="ph-fill ph-warning-circle" aria-hidden="true"></i>Осталось 2 места</span>
                            <span className="status -off"><i className="ph-fill ph-x-circle" aria-hidden="true"></i>Мест нет</span>
                        </div>

                        <span className="mono-caption" style={{ display: 'block', marginTop: 32 }}>Состояния изображения</span>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 16 }}>
                            <SmartImage src={CLUBS[1].img} alt="Загруженное изображение" ratio="4 / 3" />
                            <SmartImage src="" alt="" ratio="4 / 3" emptyLabel="Изображения нет" />
                        </div>
                    </div>
                </div>
            </Block>

            {/* Описание интерактивности */}
            <Block id="interactions" title="Описание интерактивности">
                <ol className="uk-inter">
                    {INTERACTIONS.map((i, idx) => (
                        <li key={i.t}>
                            <span>{String(idx + 1).padStart(2, '0')}</span>
                            <div>
                                <strong>{i.t}</strong>
                                <p>{i.d}</p>
                            </div>
                        </li>
                    ))}
                </ol>
            </Block>

            <style>{`
                .uk-colors {
                    margin-top: 16px;
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                    gap: 16px;
                }
                .uk-color span {
                    display: flex;
                    align-items: flex-end;
                    height: 88px;
                    padding: 8px;
                    font: 500 12px/1 var(--font-mono);
                    letter-spacing: .04em;
                    border: 1px solid var(--line);
                }
                .uk-color strong {
                    display: block;
                    margin-top: 8px;
                    font: 500 14px/1.3 var(--font-sans);
                    color: var(--ink);
                }
                .uk-color em {
                    display: block;
                    margin-top: 4px;
                    font: normal 400 13px/1.45 var(--font-sans);
                    color: var(--tx-soft);
                }
                .uk-type { display: grid; gap: 24px; margin-top: var(--s3); }
                .uk-type > div { padding-bottom: 24px; border-bottom: 1px solid var(--line); }
                .uk-type-meta {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px 16px;
                    margin-bottom: 12px;
                }
                .uk-type-meta strong { font: 500 13px/1 var(--font-sans); color: var(--ink); }
                .uk-type-meta span { font: 400 12.5px/1 var(--font-mono); color: var(--tx-mute); }
                .uk-row {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    gap: 8px;
                    padding: 16px 0;
                    border-bottom: 1px solid var(--line);
                }
                .uk-row > span:first-child {
                    flex: none;
                    width: 100%;
                    font: 500 12px/1 var(--font-mono);
                    letter-spacing: .05em;
                    text-transform: uppercase;
                    color: var(--tx-mute);
                    margin-bottom: 8px;
                }
                .uk-note {
                    margin: 16px 0 0;
                    max-width: 68ch;
                    font: 400 14px/1.6 var(--font-sans);
                    color: var(--tx-soft);
                }
                .uk-fields {
                    margin-top: var(--s3);
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 24px;
                    max-width: 720px;
                }
                .uk-cards {
                    margin-top: var(--s3);
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 32px;
                }
                .uk-inter { margin: var(--s3) 0 0; padding: 0; list-style: none; }
                .uk-inter li {
                    display: grid;
                    grid-template-columns: 40px minmax(0, 1fr);
                    gap: 16px;
                    padding: 16px 0;
                    border-bottom: 1px solid var(--line);
                }
                .uk-inter span { font: 500 13px/1.4 var(--font-mono); color: var(--accent); }
                .uk-inter strong { font: 500 16px/1.4 var(--font-sans); color: var(--ink); }
                .uk-inter p { margin: 8px 0 0; max-width: 74ch; font: 400 14.5px/1.6 var(--font-sans); color: var(--tx-soft); }

                @media (min-width: 720px) {
                    .uk-row > span:first-child { width: 200px; margin-bottom: 0; }
                    .uk-fields { grid-template-columns: 1fr 1fr; }
                }
                @media (min-width: 960px) {
                    .uk-cards { grid-template-columns: 320px minmax(0, 1fr); gap: 48px; }
                }
            `}</style>
        </>
    );
}

function Block({ id, title, tone = 'var(--paper)', children }) {
    return (
        <section id={id} className="section" style={{ background: tone }}>
            <div className="shell">
                <h2 className="serif-h2" style={{ margin: 0 }}>
                    {title}
                </h2>
                {children}
            </div>
        </section>
    );
}

function Row({ label, children }) {
    return (
        <div className="uk-row">
            <span>{label}</span>
            {children}
        </div>
    );
}
