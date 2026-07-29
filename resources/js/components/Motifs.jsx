/* Морские мотивы «Паруса»: line-art в редакционной пластике.
   Штрих currentColor — цвет задаётся снаружи через style.color. */

const MARKS = {
    sailboat: '/parus-media/graphics/mark-sailboat.png',
    sunCompass: '/parus-media/graphics/mark-sun-compass.png',
    waveRoute: '/parus-media/graphics/mark-wave-route.png',
    lighthouse: '/parus-media/graphics/decor-lighthouse.webp',
    ropeShell: '/parus-media/graphics/decor-rope-shell.webp',
    buoyFlags: '/parus-media/graphics/decor-buoy-flags.webp',
    activities: '/parus-media/graphics/decor-activities.webp',
    beaconGulls: '/parus-media/graphics/decor-beacon-gulls.webp',
    shellStar: '/parus-media/graphics/decor-shell-star.webp',
    signalFlags: '/parus-media/graphics/decor-signal-flags.webp',
    paperboat: '/parus-media/graphics/decor-paperboat.webp',
    buoy: '/parus-media/graphics/decor-buoy.webp',
    priceTools: '/parus-media/graphics/decor-price-tools.webp',
    documentsSeal: '/parus-media/graphics/decor-documents-seal.webp',
    ctaLifebuoy: '/parus-media/graphics/decor-cta-lifebuoy.webp',
    harborSunset: '/parus-media/graphics/decor-harbor-sunset.webp',
};

export function NauticalMark({ type = 'sailboat', width, className = '', style }) {
    return (
        <img
            src={MARKS[type] || MARKS.sailboat}
            alt=""
            aria-hidden="true"
            draggable="false"
            className={`parus-nautical-mark parus-mark-${type} ${className}`.trim()}
            style={{
                display: 'block',
                width: width ?? '100%',
                height: 'auto',
                pointerEvents: 'none',
                userSelect: 'none',
                ...style,
            }}
        />
    );
}

export function Sail({ size = 28, style, bob = false }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true"
            style={{
                display: 'block',
                animation: bob ? 'boatBob 5s ease-in-out infinite alternate' : undefined,
                ...style,
            }}
        >
            {/* корпус-дуга */}
            <path d="M5 23 Q16 28 27 23 L24.5 27 Q16 30 7.5 27 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            {/* грот */}
            <path d="M15 21 V5 L6.5 21 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            {/* стаксель */}
            <path d="M18 21 V8 L25 21 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            {/* вымпел — единственная заливка, солнечный */}
            <path d="M15 5 L15 2.5 L19.5 3.75 L15 5 Z" fill="var(--sun)" stroke="none" />
        </svg>
    );
}

export function Sun({ size = 16, half = false, style }) {
    if (half) {
        return (
            <svg width={size * 2} height={size} viewBox="0 0 64 32" fill="none" aria-hidden="true" style={{ display: 'block', ...style }}>
                <path d="M18 32 A14 14 0 0 1 46 32" stroke="currentColor" strokeWidth="1.5" />
                <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M32 8 V2" />
                    <path d="M16.5 14.5 L12.3 10.3" />
                    <path d="M47.5 14.5 L51.7 10.3" />
                    <path d="M10 26 L4.5 24" />
                    <path d="M54 26 L59.5 24" />
                </g>
                <path d="M0 32 H64" stroke="currentColor" strokeWidth="1.5" />
            </svg>
        );
    }
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true" style={{ display: 'block', ...style }}>
            <circle cx="16" cy="16" r="7" stroke="currentColor" strokeWidth="1.5" />
            <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M16 1.5 V5" />
                <path d="M16 27 V30.5" />
                <path d="M1.5 16 H5" />
                <path d="M27 16 H30.5" />
                <path d="M5.75 5.75 L8.2 8.2" />
                <path d="M23.8 23.8 L26.25 26.25" />
                <path d="M26.25 5.75 L23.8 8.2" />
                <path d="M8.2 23.8 L5.75 26.25" />
            </g>
        </svg>
    );
}

export function WaveRule({ color = 'var(--line-strong)', height = 8, style }) {
    return (
        <svg
            width="100%"
            height={height}
            viewBox="0 0 120 8"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
            style={{ display: 'block', ...style }}
        >
            <path
                d="M0 4 Q7.5 0 15 4 T30 4 T45 4 T60 4 T75 4 T90 4 T105 4 T120 4"
                stroke={color}
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
            />
        </svg>
    );
}

export function CoursePath({ width = 220, style, bob = true }) {
    const h = Math.round(width * 0.42);
    return (
        <div aria-hidden="true" style={{ position: 'relative', width, height: h, ...style }}>
            <svg width={width} height={h} viewBox="0 0 220 92" fill="none" preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}>
                {/* проложенный курс */}
                <path
                    d="M4 84 Q56 84 76 58 T142 34 Q166 26 182 28"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray="2 7"
                    strokeLinecap="round"
                />
                {/* точка отправления */}
                <circle cx="4" cy="84" r="2.5" fill="currentColor" />
            </svg>
            <Sail size={30} bob={bob} style={{ position: 'absolute', right: 0, top: 0 }} />
        </div>
    );
}
