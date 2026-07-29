import { CONTACTS } from '../data/site.js';

/* Блок «Контакты» раздела «О Клубе» (п. 7.4 ТЗ):
   крупный жирный кликабельный телефон, email, кнопки мессенджеров
   с иконками и ссылка на сообщество ВКонтакте. */
export default function ContactsBlock() {
    return (
        <section id="contacts" className="section" style={{ background: 'var(--ink)', color: 'var(--paper)' }}>
            <div className="shell">
                <span className="mono-caption" style={{ color: 'rgba(var(--cream-rgb),.6)' }}>
                    Контакты
                </span>

                <div className="parus-contacts">
                    <div>
                        <p className="parus-contacts-hint">Приоритетный способ записи — звонок администратору</p>
                        <a href={CONTACTS.phoneHref} className="parus-contacts-phone">
                            {CONTACTS.phone}
                        </a>
                        <p className="parus-contacts-hours">{CONTACTS.hours} · без выходных</p>

                        <a href={`mailto:${CONTACTS.email}`} className="parus-contacts-mail">
                            <i className="ph-light ph-envelope-simple" aria-hidden="true"></i>
                            {CONTACTS.email}
                        </a>
                    </div>

                    <div className="parus-contacts-actions">
                        <a href={CONTACTS.phoneHref} className="btn-solid -coral -wide">
                            <i className="ph-fill ph-phone" aria-hidden="true" style={{ fontSize: 18 }}></i>
                            Позвонить в клуб
                        </a>
                        <a href={CONTACTS.whatsapp} target="_blank" rel="noreferrer" className="btn-line -dark -wide">
                            <i className="ph-fill ph-whatsapp-logo" aria-hidden="true" style={{ fontSize: 18 }}></i>
                            Написать в WhatsApp
                        </a>
                        <a href={CONTACTS.telegram} target="_blank" rel="noreferrer" className="btn-line -dark -wide">
                            <i className="ph-fill ph-telegram-logo" aria-hidden="true" style={{ fontSize: 18 }}></i>
                            Написать в Telegram
                        </a>
                        <a href={CONTACTS.vk} target="_blank" rel="noreferrer" className="btn-line -dark -wide">
                            <i className="ph-fill ph-chat-circle-dots" aria-hidden="true" style={{ fontSize: 18 }}></i>
                            Сообщество ВКонтакте
                        </a>
                    </div>
                </div>
            </div>

            <style>{`
                .parus-contacts {
                    margin-top: var(--s3);
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 32px;
                    align-items: center;
                }
                .parus-contacts-hint {
                    margin: 0 0 8px;
                    font: 400 14.5px/1.5 var(--font-sans);
                    color: rgba(var(--cream-rgb), .62);
                }
                .parus-contacts-phone {
                    display: inline-block;
                    font: 700 clamp(30px, 5vw, 52px)/1.05 var(--font-sans);
                    letter-spacing: -0.02em;
                    color: #fff;
                    text-decoration: none;
                    transition: color .18s;
                }
                .parus-contacts-phone:hover { color: var(--sun); }
                .parus-contacts-hours {
                    margin: 12px 0 0;
                    font: 400 15px/1.5 var(--font-sans);
                    color: rgba(var(--cream-rgb), .7);
                }
                .parus-contacts-mail {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    margin-top: 24px;
                    font: 400 18px/1.4 var(--font-sans);
                    color: var(--sun-soft);
                    text-decoration: none;
                    border-bottom: 1px solid rgba(242, 199, 138, .4);
                }
                .parus-contacts-mail:hover { color: #fff; border-color: #fff; }
                .parus-contacts-actions { display: grid; gap: 8px; }

                @media (min-width: 900px) {
                    .parus-contacts { grid-template-columns: minmax(0, 1.2fr) minmax(280px, .8fr); gap: 56px; }
                }
            `}</style>
        </section>
    );
}
