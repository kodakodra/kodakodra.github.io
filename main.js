document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.nav__burger');
    const mobileNav = document.querySelector('.nav__mobile');

    if (burger && mobileNav) {
        const setMenu = (open) => {
            mobileNav.classList.toggle('open', open);
            burger.setAttribute('aria-expanded', String(open));
            burger.setAttribute('aria-label', open ? 'Close mobile menu' : 'Open mobile menu');
        };

        burger.addEventListener('click', () => setMenu(!mobileNav.classList.contains('open')));
        mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
        document.addEventListener('click', event => {
            if (!mobileNav.contains(event.target) && !burger.contains(event.target)) setMenu(false);
        });
    }

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav__links a, .nav__mobile a').forEach(anchor => {
        const href = anchor.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            anchor.classList.add('active');
            anchor.setAttribute('aria-current', 'page');
        }
    });

    const revealElements = document.querySelectorAll('[data-reveal]');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (revealElements.length && !prefersReducedMotion) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('anim-fade-up');
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.12 });
        revealElements.forEach(element => observer.observe(element));
    } else {
        revealElements.forEach(element => element.classList.add('anim-fade-up'));
    }
});
