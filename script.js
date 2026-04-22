/**
 * KodaKodra Portfolio — Main JavaScript
 * Handles navigation, mobile menu, smooth scrolling, and scroll animations.
 */

/* ============================================================
   Mobile Navigation Toggle
   ============================================================ */
const navToggle = document.querySelector('.nav-toggle');
const navMenu   = document.querySelector('.nav-menu');
const navLinks  = document.querySelectorAll('.nav-menu a');

if (navToggle) {
    // Toggle menu open/closed when the hamburger button is clicked
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close the mobile menu when any nav link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Close the mobile menu when clicking anywhere outside the navbar
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

/* ============================================================
   Active Nav Link
   Highlights the correct nav item based on the current page.
   ============================================================ */
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}
setActiveNav();

/* ============================================================
   Smooth Scroll
   Handles anchor links that start with # for smooth in-page scrolling.
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

/* ============================================================
   Scroll Animations
   Uses IntersectionObserver to fade elements in as they scroll into view.
   ============================================================ */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

// Apply fade-in starting state and observe each animated element
document.querySelectorAll('.why-card, .project-card, .service-card, .focus-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

/* ============================================================
   Navbar Shadow on Scroll
   Adds a subtle shadow to the navbar once the user scrolls down.
   ============================================================ */
const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        navbar.style.boxShadow = scrollTop > 50 ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none';
    });
}
