import { Link } from 'react-router-dom';

/* Крупный возрастной бейдж (п. 4 и п. 8 ТЗ).
   Состояния: Default и Active (выбранный фильтр).
   Кликабельный вариант ведёт в отфильтрованный каталог. */
export default function AgeBadge({ value, label, caption, to, active = false, size = 'md', onClick, as = 'auto' }) {
    const cls = `age-badge${size === 'lg' ? ' -lg' : ''}${as === 'static' ? ' -static' : ''}`;
    const content = (
        <>
            {label}
            {caption && size === 'lg' && <small>{caption}</small>}
        </>
    );

    if (as === 'static') {
        return (
            <span className={cls} data-active={active ? 'true' : 'false'}>
                {content}
            </span>
        );
    }

    if (to) {
        return (
            <Link to={to} className={cls} data-active={active ? 'true' : 'false'} aria-label={`Кружки для возраста ${label}`}>
                {content}
            </Link>
        );
    }

    return (
        <button type="button" className={cls} data-active={active ? 'true' : 'false'} aria-pressed={active} onClick={onClick} data-value={value}>
            {content}
        </button>
    );
}
