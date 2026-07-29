import { Link } from 'react-router-dom';
import { CLUBS } from '../data/site.js';
import ClubCard from '../components/ClubCard.jsx';
import { NauticalMark } from '../components/Motifs.jsx';

/* «Популярные кружки» на главной (п. 7.1 ТЗ).
   На мобильной — горизонтальная карусель с прокруткой,
   на десктопе — сетка. Кнопка ведёт в раздел «Кружки и секции». */
export default function PopularClubs() {
    const popular = CLUBS.filter((c) => c.popular);

    return (
        <section className="section" style={{ background: 'var(--paper-2)', position: 'relative', overflow: 'hidden' }}>
            <NauticalMark type="activities" className="parus-tracks-activities" />

            <div className="shell" style={{ position: 'relative', zIndex: 1 }}>
                <div className="parus-sec-head">
                    <div>
                        <span className="mono-caption">Кружки и секции</span>
                        <h2 className="serif-h2" style={{ margin: '16px 0 0' }}>
                            Популярные направления
                        </h2>
                        <p style={{ margin: '16px 0 0', maxWidth: '48ch', font: '400 16px/1.6 var(--font-sans)', color: 'var(--tx-soft)' }}>
                            Начните знакомство с самыми востребованными кружками и секциями клуба.
                        </p>
                    </div>
                    <Link to="/studios" className="btn-line parus-sec-head-btn">
                        Весь каталог
                        <i className="ph-light ph-arrow-right" aria-hidden="true"></i>
                    </Link>
                </div>

                <div className="carousel" style={{ marginTop: 'var(--s4)' }}>
                    {popular.map((club) => (
                        <ClubCard key={club.slug} club={club} compact />
                    ))}
                </div>

                <p className="parus-carousel-hint">
                    <i className="ph-light ph-hand-swipe-left" aria-hidden="true"></i>
                    Пролистайте вбок, чтобы увидеть все направления
                </p>

                <div style={{ marginTop: 'var(--s3)', display: 'flex' }}>
                    <Link to="/studios" className="btn-solid parus-sec-foot-btn">
                        Смотреть все 12 кружков
                        <i className="ph-light ph-arrow-right" aria-hidden="true"></i>
                    </Link>
                </div>
            </div>

            <style>{`
                .parus-carousel-hint {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin: 8px 0 0;
                    font: 400 13px/1.4 var(--font-sans);
                    color: var(--tx-mute);
                }
                .parus-carousel-hint i { font-size: 18px; }
                @media (min-width: 900px) {
                    .parus-carousel-hint { display: none; }
                }
            `}</style>
        </section>
    );
}
