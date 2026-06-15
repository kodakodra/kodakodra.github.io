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
            mobileNav.classList.toggle('open');
        });
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => mobileNav.classList.remove('open'));
        });
    }

    // Active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav__links a, .nav__mobile a').forEach(anchor => {
        const href = anchor.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            anchor.classList.add('active');
        }
    });

    // Intersection Observer for reveal animation (data-reveal)
    const revealElements = document.querySelectorAll('[data-reveal]');
    if (revealElements.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('anim-fade-up');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        revealElements.forEach(el => observer.observe(el));
    }
});
