import { useEffect } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import AboutSection from '../sections/AboutSection.jsx';
import DirectorBlock from '../sections/DirectorBlock.jsx';
import BranchesBlock from '../sections/BranchesBlock.jsx';
import ContactsBlock from '../sections/ContactsBlock.jsx';
import DocsTabs from '../sections/DocsTabs.jsx';
import RequisitesBlock from '../sections/RequisitesBlock.jsx';

/* Страница «О Клубе» (п. 7.4 ТЗ):
   заголовок → о нас → директор → филиалы и карта → контакты →
   документы (табы + аккордеон) → реквизиты. */
export default function AboutPage() {
    useEffect(() => {
        document.title = 'О клубе «Парус» — Западное Дегунино';
    }, []);

    return (
        <>
            <PageHeader
                eyebrow="О Клубе"
                title={
                    <>
                        Некоммерческий клуб <em>«Парус»</em> в Западном Дегунино
                    </>
                }
                description="Работаем с 2010 года на двух площадках района. Здесь — история клуба, слово директора, адреса филиалов с картой, контакты, документы и реквизиты организации."
            />
            <AboutSection />
            <DirectorBlock />
            <BranchesBlock />
            <ContactsBlock />
            <DocsTabs />
            <RequisitesBlock />
        </>
    );
}
