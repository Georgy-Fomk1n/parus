import { useEffect } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import EventsAnnounce from '../sections/EventsAnnounce.jsx';
import NewsFeed from '../sections/NewsFeed.jsx';
import PastEvents from '../sections/PastEvents.jsx';

/* Страница «Мероприятия» (п. 7.3 ТЗ):
   заголовок → анонсы предстоящих событий → лента новостей →
   прошедшие мероприятия (фотоотчёты). */
export default function EventsPage() {
    useEffect(() => {
        document.title = 'Мероприятия — клуб «Парус»';
    }, []);

    return (
        <>
            <PageHeader
                eyebrow="Мероприятия"
                title={
                    <>
                        Концерты, фестивали и <em>праздники</em> клуба
                    </>
                }
                description="Ближайшие события, свежие новости из сообщества и фотоотчёты с того, что уже прошло. Вход на большинство мероприятий свободный — достаточно предупредить администратора."
            />
            <EventsAnnounce />
            <NewsFeed />
            <PastEvents />
        </>
    );
}
