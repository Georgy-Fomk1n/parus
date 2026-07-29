import { useState } from 'react';

/* Устойчивый контейнер изображения (п. 3.1 ТЗ).
   Держит заданную пропорцию при любом формате исходника,
   показывает скелетон во время загрузки и осмысленную
   заглушку, если изображения нет или оно не загрузилось. */
export default function SmartImage({
    src,
    alt = '',
    ratio = '4 / 3',
    objectPosition = 'center',
    className = '',
    style,
    emptyLabel = 'Фото готовится',
    priority = false,
    children,
}) {
    const [state, setState] = useState(src ? 'loading' : 'empty');

    return (
        <div className={`media-box ${className}`.trim()} style={{ aspectRatio: ratio, ...style }}>
            {src && state !== 'empty' && (
                <img
                    src={src}
                    alt={alt}
                    loading={priority ? 'eager' : 'lazy'}
                    decoding="async"
                    className="photo"
                    style={{ objectPosition, opacity: state === 'ready' ? 1 : 0, transition: 'opacity .3s' }}
                    onLoad={() => setState('ready')}
                    onError={() => setState('empty')}
                />
            )}

            {state === 'loading' && <span className="media-skeleton" aria-hidden="true" />}

            {state === 'empty' && (
                <span className="media-empty" role="img" aria-label={alt || emptyLabel}>
                    <i className="ph-light ph-image" aria-hidden="true"></i>
                    {emptyLabel}
                </span>
            )}

            {children}
        </div>
    );
}
