/* ============================================================
   KodaKodra Portfolio — Shared JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ── Mobile nav toggle ──────────────────────────────────────
    const burger  = document.querySelector('.nav__burger');
    const mobileNav = document.querySelector('.nav__mobile');

    if (burger && mobileNav) {
        burger.addEventListener('click', () => {
            mobileNav.classList.toggle('open');
        });
        // Close on link click
        mobileNav.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => mobileNav.classList.remove('open'));
        });
    }

    // ── Active nav link ────────────────────────────────────────
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav__links a, .nav__mobile a').forEach(a => {
        const href = a.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            a.classList.add('active');
        }
    });

    // ── Scroll-reveal (IntersectionObserver) ──────────────────
    const reveals = document.querySelectorAll('[data-reveal]');
    if (reveals.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('anim-fade-up');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        reveals.forEach(el => observer.observe(el));
    }

});
