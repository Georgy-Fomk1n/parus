import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import CatalogPage from './pages/CatalogPage.jsx';
import ClubPage from './pages/ClubPage.jsx';
import EventsPage from './pages/EventsPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import UiKitPage from './pages/UiKitPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

/* Карта навигации по п. 9 ТЗ:
   Главная · Кружки и секции (каталог → детальная) · Мероприятия · О Клубе.
   Старые адреса прежней структуры сохранены как редиректы. */
export default function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/studios" element={<CatalogPage />} />
                    <Route path="/studios/:slug" element={<ClubPage />} />
                    <Route path="/events" element={<EventsPage />} />
                    <Route path="/about" element={<AboutPage />} />

                    {/* Служебная страница: UI Kit / Style Guide (п. 10 и 12 ТЗ) */}
                    <Route path="/ui-kit" element={<UiKitPage />} />

                    {/* Редиректы со старой структуры сайта */}
                    <Route path="/tracks" element={<Navigate to="/studios" replace />} />
                    <Route path="/prices" element={<Navigate to="/studios" replace />} />
                    <Route path="/news" element={<Navigate to="/events" replace />} />
                    <Route path="/gallery" element={<Navigate to="/events#past" replace />} />
                    <Route path="/team" element={<Navigate to="/studios" replace />} />
                    <Route path="/docs" element={<Navigate to="/about#documents" replace />} />
                    <Route path="/contacts" element={<Navigate to="/about#contacts" replace />} />

                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}
