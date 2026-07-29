import { NEWS, CONTACTS } from '../data/site.js';
import SmartImage from '../components/SmartImage.jsx';

/* «Лента новостей» (п. 7.3 ТЗ): дата, превью-изображение, заголовок,
   фрагмент текста и ссылка на полный текст в источнике (ВКонтакте). */
export default function NewsFeed() {
    return (
        <section className="section" style={{ background: 'var(--paper-2)' }}>
            <div className="shell">
                <div className="parus-sec-head">
                    <div>
                        <h2 className="serif-h2" style={{ margin: 0 }}>
                            Лента новостей
                        </h2>
                        <p style={{ margin: '16px 0 0', maxWidth: '52ch', font: '400 15.5px/1.6 var(--font-sans)', color: 'var(--tx-soft)' }}>
                            Публикуем в сообществе ВКонтакте раз в два-три дня: наборы в группы, результаты выступлений и отчёты с занятий.
                        </p>
                    </div>
                    <a href={CONTACTS.vk} target="_blank" rel="noreferrer" className="btn-line parus-sec-head-btn">
                        Открыть сообщество
                        <i className="ph-light ph-arrow-up-right" aria-hidden="true"></i>
                    </a>
                </div>

                <ul className="parus-news">
                    {NEWS.map((n) => (
                        <li key={n.id}>
                            <div className="parus-news-media">
                                <SmartImage src={n.img} alt={n.title} ratio="4 / 3" emptyLabel="Превью новости" />
                            </div>

                            <div className="parus-news-body">
                                <div className="parus-news-meta">
                                    <span className="parus-news-tag">#{n.tag.toLowerCase()}</span>
                                    <time>{n.date}</time>
                                </div>
                                <h3>{n.title}</h3>
                                <p>{n.txt}</p>
                                <a href={CONTACTS.vk} target="_blank" rel="noreferrer" className="arrow-link">
                                    Читать полностью во ВКонтакте
                                    <i className="ph-light ph-arrow-up-right" aria-hidden="true"></i>
                                </a>
                            </div>
                        </li>
                    ))}
                </ul>

                <div style={{ marginTop: 'var(--s3)' }}>
                    <a href={CONTACTS.vk} target="_blank" rel="noreferrer" className="btn-solid parus-sec-foot-btn">
                        Открыть сообщество ВКонтакте
                        <i className="ph-light ph-arrow-up-right" aria-hidden="true"></i>
                    </a>
                </div>
            </div>

            <style>{`
                .parus-news {
                    margin: var(--s3) 0 0;
                    padding: 0;
                    list-style: none;
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 16px;
                }
                .parus-news li {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 16px;
                    padding-bottom: 16px;
                    border-bottom: 1px solid var(--line);
                }
                .parus-news-meta {
                    display: flex;
                    align-items: baseline;
                    gap: 12px;
                }
                .parus-news-tag {
                    padding: 4px 8px;
                    background: var(--sun-wash);
                    color: var(--accent);
                    font: 500 11.5px/1.3 var(--font-mono);
                    letter-spacing: .04em;
                }
                .parus-news-meta time {
                    font: 400 13px/1 var(--font-sans);
                    color: var(--tx-mute);
                }
                .parus-news-body h3 {
                    margin: 12px 0 0;
                    font: 400 20px/1.3 var(--font-serif);
                    color: var(--ink);
                }
                .parus-news-body p {
                    margin: 8px 0 16px;
                    font: 400 15px/1.6 var(--font-sans);
                    color: var(--tx-soft);
                    max-width: 62ch;
                }

                @media (min-width: 700px) {
                    .parus-news li {
                        grid-template-columns: 240px minmax(0, 1fr);
                        gap: 32px;
                        padding-bottom: 24px;
                    }
                }
            `}</style>
        </section>
    );
}
