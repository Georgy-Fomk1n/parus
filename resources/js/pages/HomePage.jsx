import { useEffect } from 'react';
import Hero from '../sections/Hero.jsx';
import PopularClubs from '../sections/PopularClubs.jsx';
import EventsTeaser from '../sections/EventsTeaser.jsx';
import FeaturesRow from '../sections/FeaturesRow.jsx';
import ContactTeaser from '../sections/ContactTeaser.jsx';

/* Главная страница. Состав блоков строго по п. 7.1 ТЗ:
   первый экран → популярные кружки → ближайшие мероприятия →
   преимущества клуба → контактный тизер. */
export default function HomePage() {
    useEffect(() => {
        document.title = 'Клуб «Парус» — кружки и секции для детей в Западном Дегунино';
    }, []);

    return (
        <>
            <Hero />
            <FeaturesRow />
            <EventsTeaser />
            <PopularClubs />
            <ContactTeaser />
        </>
    );
}
