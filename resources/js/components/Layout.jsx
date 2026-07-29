import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { useReveal } from '../hooks/useReveal.js';

/* Скролл при смене маршрута: вверх страницы либо к якорю (#documents,
   #contacts, #branches, #past) — якоря используются в подвале и редиректах. */
function ScrollManager() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const el = document.querySelector(hash);
            if (el) {
                const top = el.getBoundingClientRect().top + window.scrollY - 88;
                window.scrollTo({ top, behavior: 'smooth' });
                return;
            }
        }
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, [pathname, hash]);

    return null;
}

export default function Layout({ children }) {
    useReveal();
    return (
        <div
            style={{
                background: 'var(--paper)',
                color: 'var(--tx)',
                position: 'relative',
                /* Горизонтальное переполнение гасится на уровне секций
                   (у каждой с декором задан overflow: hidden). На корне его не
                   ставим: любой отсечкой здесь ломается position: sticky
                   у панели фильтров и боковой колонки кружка. */
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <ScrollManager />
            <Header />
            <main style={{ flex: 1 }}>{children}</main>
            <Footer />
        </div>
    );
}
