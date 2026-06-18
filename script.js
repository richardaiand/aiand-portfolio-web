// ====================
// Custom Cursor
// ====================
let cursorDot, cursorRing;
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let ringX = window.innerWidth / 2;
let ringY = window.innerHeight / 2;
let isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
let cursorRafId = null;

function initCursor() {
    if (isTouchDevice) return;
    
    // Query elements inside init to ensure DOM is ready
    cursorDot = document.querySelector('.cursor-dot');
    cursorRing = document.querySelector('.cursor-ring');
    
    if (!cursorDot || !cursorRing) {
        console.error('Cursor elements not found');
        return;
    }
    
    // Center initially
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    }, { passive: true });
    
    // Smooth ring follows with delay
    function animateRing() {
        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;
        
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';
        
        cursorRafId = requestAnimationFrame(animateRing);
    }
    animateRing();
    
    // Hover effects on interactive elements
    const interactiveElements = document.querySelectorAll(
        'a, button, .btn, .social-link, .project-card, .education-card, .timeline-content, .hamburger, input, textarea'
    );
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });
    
    // Click effects
    document.addEventListener('mousedown', () => document.body.classList.add('clicking'));
    document.addEventListener('mouseup', () => document.body.classList.remove('clicking'));
}

// ====================
// Mobile Navigation
// ====================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ====================
// Active Navigation Link
// ====================
const sections = document.querySelectorAll('section[id]');

function updateActiveNavLink() {
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ====================
// Navbar Background on Scroll
// ====================
const navbar = document.querySelector('.navbar');

function updateNavbar() {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.8)';
        navbar.style.boxShadow = 'none';
    }
}

// ====================
// Scroll Reveal Animation
// ====================
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Add reveal class to elements
function initReveal() {
    const elementsToReveal = [
        '.section-header',
        '.project-card',
        '.timeline-item',
        '.education-card',
        '.stat',
        '.about-text p',
        '.about-image',
        '.about-stats'
    ];
    
    elementsToReveal.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, index) => {
            el.classList.add('reveal');
            el.style.transitionDelay = `${index * 0.1}s`;
        });
    });
    
    reveal();
}

// ====================
// Parallax Effect for Hero
// ====================
function parallaxEffect() {
    const hero = document.querySelector('.hero');
    const scrolled = window.scrollY;
    
    if (scrolled < window.innerHeight) {
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
}

// ====================
// Smooth Scroll for Anchor Links
// ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ====================
// Typing Effect for Hero Title (Optional enhancement)
// ====================
function typeEffect() {
    const title = document.querySelector('.hero-title');
    if (!title) return;
    
    const text = title.textContent;
    title.textContent = '';
    title.style.opacity = '1';
    
    let index = 0;
    const speed = 100;
    
    function type() {
        if (index < text.length) {
            title.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    
    setTimeout(type, 500);
}

// ====================
// Intersection Observer for Performance
// ====================
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// ====================
// Event Listeners
// ====================
window.addEventListener('scroll', () => {
    updateActiveNavLink();
    updateNavbar();
    reveal();
    parallaxEffect();
}, { passive: true });

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ====================
// Initialize
// ====================
document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initReveal();
    updateActiveNavLink();
    updateNavbar();
    
    // Observe all reveal elements
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
    
    // Remove typing effect for now (using CSS animation instead)
    // typeEffect();
});

// ====================
// Performance: Throttle scroll events
// ====================
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateActiveNavLink();
            updateNavbar();
            reveal();
            parallaxEffect();
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });
