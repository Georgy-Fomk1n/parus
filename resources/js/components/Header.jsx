import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Logo from './Logo.jsx';
import { NAV_MAIN, CONTACTS } from '../data/site.js';

/* Шапка по п. 6.1 ТЗ.
   Мобильная: логотип слева, бургер, крупная иконка телефона справа (всегда видна),
   мессенджеры — внутри бургер-меню.
   Десктопная: логотип, горизонтальное меню из четырёх пунктов,
   иконки WhatsApp и Telegram, крупный жирный номер и акцентная кнопка «Позвонить». */
export default function Header() {
    const headerRef = useRef(null);
    const [open, setOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => {
            const h = headerRef.current;
            if (!h) return;
            h.dataset.scrolled = window.scrollY > 24 ? '1' : '0';
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        setOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    const linkStyle = ({ isActive }) => ({
        padding: '8px 0',
        whiteSpace: 'nowrap',
        font: '500 15px/1 var(--font-sans)',
        color: isActive ? 'var(--ink)' : 'var(--tx-soft)',
        textDecoration: 'none',
        borderBottom: isActive ? '3px solid var(--sun)' : '3px solid transparent',
        transition: 'color .18s, border-color .18s',
    });

    return (
        <>
            <header
                ref={headerRef}
                className="parus-header"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 80,
                    background: 'var(--paper)',
                    borderBottom: '1px solid var(--line)',
                    transition: 'box-shadow .25s',
                }}
            >
                <div className="parus-header-inner">
                    <Link to="/" style={{ textDecoration: 'none' }} aria-label="На главную, клуб «Парус»">
                        <Logo />
                    </Link>

                    <nav className="parus-nav-main" aria-label="Основная навигация">
                        {NAV_MAIN.map((item) => (
                            <NavLink key={item.path} to={item.path} end={item.path === '/'} style={linkStyle}>
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="parus-header-actions">
                        {/* Мессенджеры — только десктоп (вторичные CTA) */}
                        <span className="parus-header-msg">
                            <a href={CONTACTS.whatsapp} target="_blank" rel="noreferrer" className="msg-btn -wa" aria-label="Написать в WhatsApp">
                                <i className="ph-fill ph-whatsapp-logo" aria-hidden="true"></i>
                            </a>
                            <a href={CONTACTS.telegram} target="_blank" rel="noreferrer" className="msg-btn -tg" aria-label="Написать в Telegram">
                                <i className="ph-fill ph-telegram-logo" aria-hidden="true"></i>
                            </a>
                        </span>


                        {/* Приоритетный CTA. На мобильной сжимается до крупной иконки телефона */}
                        <a href={CONTACTS.phoneHref} className="btn-solid -coral parus-call-btn" aria-label="Позвонить в клуб">
                            <i className="ph-fill ph-phone" aria-hidden="true" style={{ fontSize: 16 }}></i>
                            <a href={CONTACTS.phoneHref} className="parus-header-phone">
                            {CONTACTS.phone}
                            <span className="parus-call-label" >{CONTACTS.hoursShort}</span>
                        </a>
                        </a>

                        <button
                            type="button"
                            onClick={() => setOpen((v) => !v)}
                            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
                            aria-expanded={open}
                            className="parus-burger"
                        >
                            <i className={open ? 'ph-light ph-x' : 'ph-light ph-list'} aria-hidden="true"></i>
                        </button>
                    </div>
                </div>

                {open && (
                    <div className="parus-mobile-menu">
                        <nav aria-label="Мобильная навигация" style={{ display: 'flex', flexDirection: 'column' }}>
                            {NAV_MAIN.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    end={item.path === '/'}
                                    style={({ isActive }) => ({
                                        padding: '16px 0',
                                        borderBottom: '1px solid var(--line)',
                                        color: isActive ? 'var(--accent)' : 'var(--ink)',
                                        textDecoration: 'none',
                                        font: '500 18px/1.2 var(--font-sans)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    })}
                                >
                                    {item.label}
                                    <i className="ph-light ph-arrow-right" aria-hidden="true" style={{ opacity: 0.4 }}></i>
                                </NavLink>
                            ))}
                        </nav>

                        <div style={{ marginTop: 24, display: 'grid', gap: 8 }}>
                            <a href={CONTACTS.phoneHref} className="btn-solid -coral -wide">
                                <i className="ph-fill ph-phone" aria-hidden="true" style={{ fontSize: 18 }}></i>
                                {CONTACTS.phone}
                            </a>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                                <a href={CONTACTS.whatsapp} target="_blank" rel="noreferrer" className="btn-line">
                                    <i className="ph-fill ph-whatsapp-logo" aria-hidden="true" style={{ fontSize: 18 }}></i>
                                    WhatsApp
                                </a>
                                <a href={CONTACTS.telegram} target="_blank" rel="noreferrer" className="btn-line">
                                    <i className="ph-fill ph-telegram-logo" aria-hidden="true" style={{ fontSize: 18 }}></i>
                                    Telegram
                                </a>
                            </div>
                        </div>

                        <p style={{ margin: '24px 0 0', font: '400 14px/1.5 var(--font-sans)', color: 'var(--tx-soft)' }}>
                            {CONTACTS.hours} · Западное Дегунино, два адреса
                        </p>
                    </div>
                )}
            </header>

            <style>{`
                .parus-header[data-scrolled="1"] {
                    box-shadow: 0 8px 24px -20px rgba(11, 42, 70, .45);
                }
                .parus-header-inner {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 8px var(--gutter);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 16px;
                    min-height: 72px;
                }
                .parus-nav-main {
                    display: flex;
                    align-items: center;
                    gap: 32px;
                }
                .parus-header-actions {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                }
                .parus-header-actions > * {
                    height: 48px;
                }
                .parus-header-msg { display: flex; gap: 8px; }
                .parus-header-phone {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                    color: var(--paper);
                    text-decoration: none;
                    font: 700 19px/1.1 var(--font-sans);
                    letter-spacing: -0.01em;
                    white-space: nowrap;
                }
                .parus-header-phone span {
                    font: 600 10px/1 var(--font-sans);
                    color: var(--mist);
                }
                .parus-header-phone:hover { color: var(--accent); }
                .parus-burger {
                    display: none;
                    width: 48px;
                    height: 48px;
                    background: transparent;
                    border: 1px solid var(--ink);
                    color: var(--ink);
                    cursor: pointer;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                }
                .parus-mobile-menu {
                    padding: 8px var(--gutter) 32px;
                    border-top: 1px solid var(--line);
                    background: var(--paper);
                    max-height: calc(100vh - 72px);
                    overflow-y: auto;
                }

                /* --- Планшет и мобильная: меню в бургер, телефон — иконкой --- */
                @media (max-width: 1080px) {
                    .parus-nav-main { display: none; }
                    .parus-header-msg { display: none; }
                    .parus-header-phone { display: none; }
                    .parus-burger { display: inline-flex; }
                    .parus-call-label { display: none; }
                    .parus-call-btn {
                        width: 48px;
                        min-height: 48px;
                        padding: 0;
                    }
                    .parus-header-actions { gap: 8px; }
                }
            `}</style>
        </>
    );
}
