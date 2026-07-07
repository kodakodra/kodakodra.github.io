/* ============================================================
   KodaKodra Portfolio — Shared JS (ES6+)
   Mobile nav, active link highlight, scroll reveal.
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle
    const burger = document.querySelector('.nav__burger');
    const mobileNav = document.querySelector('.nav__mobile');
    if (burger && mobileNav) {
        burger.addEventListener('click', () => {
            const isOpen = mobileNav.classList.toggle('open');
            burger.setAttribute('aria-expanded', String(isOpen));
        });
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('open');
                burger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav__links a, .nav__mobile a').forEach(anchor => {
        const href = anchor.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            anchor.classList.add('active');
            anchor.setAttribute('aria-current', 'page');
        }
    });

    // Intersection Observer for reveal animation (data-reveal)
    const revealElements = document.querySelectorAll('[data-reveal]');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (revealElements.length && !prefersReducedMotion) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('anim-fade-up');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        revealElements.forEach(el => observer.observe(el));
    } else if (revealElements.length) {
        revealElements.forEach(el => el.classList.add('anim-fade-up'));
    }
});
