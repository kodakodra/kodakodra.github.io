/* ============================================================
   KodaKodra Portfolio — ES6+ JavaScript
   const/let, async/await, event delegation, debounce
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ── Mobile Navigation ──────────────────────────────────────
    const burger = document.querySelector('.nav__burger');
    const mobileNav = document.querySelector('.nav__mobile');

    if (burger && mobileNav) {
        const toggleMobileNav = () => {
            mobileNav.classList.toggle('open');
            const isExpanded = mobileNav.classList.contains('open');
            burger.setAttribute('aria-expanded', isExpanded);
        };

        burger.addEventListener('click', toggleMobileNav);

        // Close on link click
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('open');
                burger.setAttribute('aria-expanded', false);
            });
        });
    }

    // ── Active Navigation Link ─────────────────────────────────
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav__links a, .nav__mobile a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // ── Scroll Reveal (IntersectionObserver) ───────────────────
    const revealElements = document.querySelectorAll('[data-reveal]');

    if (revealElements.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('anim-fade-up');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealElements.forEach(element => observer.observe(element));
    }

    // ── Debounce Helper (for resize/scroll) ────────────────────
    const debounce = (callback, delay = 100) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => callback(...args), delay);
        };
    };

    // Example: Debounced resize handler
    const handleResize = debounce(() => {
        // Any resize-dependent logic here
        if (window.innerWidth >= 769 && mobileNav?.classList.contains('open')) {
            mobileNav.classList.remove('open');
        }
    }, 150);

    window.addEventListener('resize', handleResize);
});
