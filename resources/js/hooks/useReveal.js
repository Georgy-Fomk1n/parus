import { useEffect } from 'react';

const REVEAL_SELECTOR = '.parus-reveal';
const VISIBLE_CLASS = 'parus-reveal-in';

export function useReveal() {
    useEffect(() => {
        let frame = 0;

        const revealImmediately = (element) => {
            element.classList.add(VISIBLE_CLASS);
        };

        if (!('IntersectionObserver' in window)) {
            const revealAll = () => {
                document.querySelectorAll(REVEAL_SELECTOR).forEach(revealImmediately);
            };
            revealAll();
            const fallbackObserver = new MutationObserver(revealAll);
            fallbackObserver.observe(document.body, { childList: true, subtree: true });
            return () => fallbackObserver.disconnect();
        }

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        revealImmediately(entry.target);
                        io.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.08, rootMargin: '0px 0px -5% 0px' }
        );

        const registerRevealElements = () => {
            frame = 0;
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

            document.querySelectorAll(REVEAL_SELECTOR).forEach((element) => {
                if (element.classList.contains(VISIBLE_CLASS)) {
                    return;
                }

                const rect = element.getBoundingClientRect();
                if (rect.top <= viewportHeight * 0.9) {
                    revealImmediately(element);
                    io.unobserve(element);
                    return;
                }

                io.observe(element);
            });
        };

        const scheduleRegister = () => {
            if (frame) {
                return;
            }
            frame = window.requestAnimationFrame(registerRevealElements);
        };

        registerRevealElements();

        const mutationObserver = new MutationObserver(scheduleRegister);
        mutationObserver.observe(document.body, { childList: true, subtree: true });

        window.addEventListener('resize', scheduleRegister, { passive: true });
        window.addEventListener('popstate', scheduleRegister, { passive: true });

        return () => {
            if (frame) {
                window.cancelAnimationFrame(frame);
            }
            mutationObserver.disconnect();
            io.disconnect();
            window.removeEventListener('resize', scheduleRegister);
            window.removeEventListener('popstate', scheduleRegister);
        };
    }, []);
}
