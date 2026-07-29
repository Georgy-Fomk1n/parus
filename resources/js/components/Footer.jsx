import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import { NauticalMark, WaveRule } from './Motifs.jsx';
import { CONTACTS, NAV_MAIN, BRANCHES, REQUISITES } from '../data/site.js';

/* Подвал по п. 6.2 ТЗ: логотип и описание, дублирование четырёх разделов,
   контакты с мессенджерами и ВКонтакте, адреса двух филиалов,
   ссылка на документы и реквизиты мелким читаемым шрифтом. */
export default function Footer() {
    const req = (v) => v || REQUISITES.placeholder;

    return (
        <footer
            className="parus-footer"
            style={{
                background: 'var(--ink-deep)',
                color: 'var(--paper)',
                padding: 'clamp(48px, 6vw, 80px) var(--gutter) 32px',
                borderTop: '1px solid var(--ink)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <NauticalMark type="harborSunset" className="parus-footer-harbor" />

            <div style={{ maxWidth: 'var(--shell)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                <div className="parus-footer-top">
                    {/* Логотип и краткое описание деятельности */}
                    <div>
                        <Link to="/" style={{ display: 'inline-flex', textDecoration: 'none' }}>
                            <Logo showSubtitle invert />
                        </Link>
                        <p style={{ margin: '24px 0 0', maxWidth: '34ch', font: '400 15px/1.6 var(--font-sans)', color: 'rgba(var(--cream-rgb),.66)' }}>
                            Некоммерческий детский клуб развития в Западном Дегунино. С 2010 года ведём кружки и секции
                            для детей от 1 года до 17 лет на двух площадках района.
                        </p>

                        <div style={{ display: 'flex', gap: 8, marginTop: 24 }}>
                            <a href={CONTACTS.whatsapp} target="_blank" rel="noreferrer" className="msg-btn -wa" aria-label="WhatsApp" style={{ borderColor: 'rgba(var(--cream-rgb),.3)', color: 'var(--paper)' }}>
                                <i className="ph-fill ph-whatsapp-logo" aria-hidden="true"></i>
                            </a>
                            <a href={CONTACTS.telegram} target="_blank" rel="noreferrer" className="msg-btn -tg" aria-label="Telegram" style={{ borderColor: 'rgba(var(--cream-rgb),.3)', color: 'var(--paper)' }}>
                                <i className="ph-fill ph-telegram-logo" aria-hidden="true"></i>
                            </a>
                            <a href={CONTACTS.vk} target="_blank" rel="noreferrer" className="msg-btn" aria-label="Сообщество ВКонтакте" style={{ borderColor: 'rgba(var(--cream-rgb),.3)', color: 'var(--paper)' }}>
                                <i className="ph-fill ph-chat-circle-dots" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>

                    {/* Дублирование четырёх основных разделов */}
                    <nav aria-label="Навигация в подвале">
                        <FooterTitle>Разделы</FooterTitle>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
                            {NAV_MAIN.map((item) => (
                                <Link key={item.path} to={item.path} className="foot-link">
                                    {item.label}
                                </Link>
                            ))}
                            <Link to="/about#documents" className="foot-link">
                                Документы
                            </Link>
                        </div>
                    </nav>

                    {/* Контакты */}
                    <div>
                        <FooterTitle>Контакты</FooterTitle>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
                            <a href={CONTACTS.phoneHref} style={{ color: 'var(--paper)', textDecoration: 'none', font: '700 21px/1.1 var(--font-sans)' }}>
                                {CONTACTS.phone}
                            </a>
                            <a href={`mailto:${CONTACTS.email}`} className="foot-link">
                                {CONTACTS.email}
                            </a>
                            <a href={CONTACTS.vk} target="_blank" rel="noreferrer" className="foot-link">
                                vk.com/parus_sao
                            </a>
                            <span style={{ font: '400 13.5px/1.4 var(--font-sans)', color: 'rgba(var(--cream-rgb),.5)' }}>{CONTACTS.hours}</span>
                        </div>
                    </div>

                    {/* Адреса двух филиалов */}
                    <div>
                        <FooterTitle>Филиалы</FooterTitle>
                        <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {BRANCHES.map((b) => (
                                <li key={b.n} style={{ font: '400 14.5px/1.5 var(--font-sans)', color: 'rgba(var(--cream-rgb),.8)' }}>
                                    <span style={{ display: 'block', font: '500 11px/1 var(--font-mono)', letterSpacing: '.08em', color: 'var(--sun-soft)', marginBottom: 6 }}>
                                        ФИЛИАЛ {b.n}
                                    </span>
                                    {b.title}
                                    <span style={{ display: 'block', color: 'rgba(var(--cream-rgb),.5)' }}>{b.city}</span>
                                </li>
                            ))}
                        </ol>
                        <Link to="/about#branches" className="foot-link" style={{ display: 'inline-block', marginTop: 16 }}>
                            Показать на карте →
                        </Link>
                    </div>
                </div>

                <WaveRule color="rgba(var(--cream-rgb),.25)" style={{ marginTop: 40 }} />

                {/* Реквизиты: копирайт, ИНН, ОГРН — мелким читаемым шрифтом */}
                <div className="parus-footer-bottom">
                    <span>© 2010 – 2026, {REQUISITES.shortName}. Все права защищены.</span>
                    <span>
                        ИНН {req(REQUISITES.inn)} · ОГРН {req(REQUISITES.ogrn)}
                    </span>
                    <Link to="/about#requisites" className="foot-link" style={{ fontSize: 13 }}>
                        Полные реквизиты
                    </Link>
                </div>
            </div>

            <style>{`
                .parus-footer-top {
                    display: grid;
                    grid-template-columns: minmax(0, 1.4fr) minmax(0, .8fr) minmax(0, 1fr) minmax(0, 1.1fr);
                    gap: clamp(24px, 3vw, 48px);
                    align-items: flex-start;
                }
                .parus-footer-bottom {
                    margin-top: 24px;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    gap: 8px 24px;
                    font: 400 13px/1.5 var(--font-sans);
                    color: rgba(var(--cream-rgb), .5);
                }
                @media (max-width: 960px) {
                    .parus-footer-top { grid-template-columns: 1fr 1fr; }
                }
                @media (max-width: 560px) {
                    .parus-footer-top { grid-template-columns: 1fr; gap: 32px; }
                }
            `}</style>
        </footer>
    );
}

function FooterTitle({ children }) {
    return (
        <div style={{ font: '500 12px/1 var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(var(--cream-rgb),.5)', marginBottom: 16 }}>
            {children}
        </div>
    );
}
