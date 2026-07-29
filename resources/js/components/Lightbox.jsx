export default function Lightbox({ item, onClose }) {
    if (!item) return null;
    return (
        <div
            onClick={onClose}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 100,
                background: 'rgba(8,25,45,.86)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 24,
                cursor: 'zoom-out',
                animation: 'fadeIn .25s both',
            }}
        >
            <div
                style={{
                    position: 'relative',
                    width: 'min(860px,92vw)',
                    aspectRatio: '3/2',
                    borderRadius: 20,
                    overflow: 'hidden',
                    background: 'linear-gradient(160deg,var(--ink),var(--ink-deep))',
                    boxShadow: '0 50px 100px -30px rgba(0,0,0,.8)',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <img src={item.img} alt={item.t} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', background: 'var(--ink-deep)' }} />
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Закрыть"
                    style={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        width: 42,
                        height: 42,
                        borderRadius: 12,
                        border: 'none',
                        cursor: 'pointer',
                        background: 'rgba(255,255,255,.16)',
                        color: '#fff',
                        fontSize: 22,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <i className="ph-light ph-x"></i>
                </button>
            </div>
        </div>
    );
}
