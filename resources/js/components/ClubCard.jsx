import { Link } from 'react-router-dom';
import SmartImage from './SmartImage.jsx';
import AgeBadge from './AgeBadge.jsx';
import { getTeacher } from '../data/site.js';

/* Карточка кружка. Состав по п. 7.2.1 ТЗ: фото занятия в едином
   контейнере, бейдж возраста, наименование, ФИО педагога,
   стоимость акцентным цветом, кнопка действия.
   Вариант compact используется в тизере на главной. */
export default function ClubCard({ club, compact = false }) {
    const teacher = getTeacher(club.teacherId);

    return (
        <article className="club-card">
            <Link to={`/studios/${club.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="club-card__media">
                    <SmartImage
                        src={club.img}
                        alt={`Занятие: ${club.title}`}
                        ratio="4 / 3"
                        style={{ position: 'absolute', inset: 0, aspectRatio: 'auto' }}
                        emptyLabel="Фото занятия"
                    />
                    <span className="club-card__badge">
                        <AgeBadge label={club.ageLabel} as="static" />
                    </span>
                </div>
            </Link>

            <div className="club-card__body">
                <h3 style={{ margin: 0, font: '400 20px/1.25 var(--font-serif)', color: 'var(--ink)' }}>
                    <Link to={`/studios/${club.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {club.short}
                    </Link>
                </h3>

                {!compact && teacher && (
                    <p style={{ margin: 0, font: '500 14px/1.4 var(--font-sans)', color: 'var(--tx-soft)' }}>
                        <i className="ph-light ph-user" aria-hidden="true" style={{ marginRight: 6 }}></i>
                        {teacher.n}
                    </p>
                )}

                {!compact && (
                    <p style={{ margin: 0, font: '400 14px/1.55 var(--font-sans)', color: 'var(--tx-soft)' }}>{club.summary}</p>
                )}
            </div>

            <div className="club-card__foot">
                <span>
                    <span className="club-price">{club.price}</span>
                    <span style={{ display: 'block', marginTop: 4, font: '400 12px/1.3 var(--font-sans)', color: 'var(--tx-mute)' }}>
                        за занятие
                    </span>
                </span>
                <Link to={`/studios/${club.slug}`} className="btn-line" style={{ minHeight: 40, padding: '8px 16px', fontSize: 14 }}>
                    Подробнее
                    <i className="ph-light ph-arrow-right" aria-hidden="true"></i>
                </Link>
            </div>
        </article>
    );
}
