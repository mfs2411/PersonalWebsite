// ===========================
// Mobile Navigation Toggle
// ===========================

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// ===========================
// Smooth Scrolling for Links
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// Navbar Background on Scroll
// ===========================

const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow when scrolled
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// ===========================
// Active Navigation Link
// ===========================

const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ===========================
// Intersection Observer for Animations
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe timeline items
document.querySelectorAll('.timeline-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(item);
});

// Observe education cards
document.querySelectorAll('.education-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
    observer.observe(card);
});

// Observe certification cards
document.querySelectorAll('.cert-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observe highlight cards
document.querySelectorAll('.highlight-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
    observer.observe(card);
});

// Observe leadership items
document.querySelectorAll('.leadership-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(item);
});

// ===========================
// Hide Scroll Indicator on Scroll
// ===========================

const scrollIndicator = document.querySelector('.scroll-indicator');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 200) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.visibility = 'hidden';
    } else {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.visibility = 'visible';
    }
});

// ===========================
// Add Smooth Reveal on Page Load
// ===========================

window.addEventListener('DOMContentLoaded', () => {
    // Ensure body is visible
    document.body.style.opacity = '1';

    // Add revealed class to all sections immediately for fallback
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('section-revealed');
    });
});

// ===========================
// Performance: Debounce Scroll Events
// ===========================

function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll events
const debouncedHighlight = debounce(highlightNavigation);
window.addEventListener('scroll', debouncedHighlight);

// ===========================
// Keyboard Navigation Accessibility
// ===========================

// Add focus styles for keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// ===========================
// Animated Particles Background
// ===========================

function createParticles() {
    const hero = document.querySelector('.hero');
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    hero.appendChild(particlesContainer);

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random positioning
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';

        // Random size
        const size = Math.random() * 3 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        // Random animation delay
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 20 + 10) + 's';

        particlesContainer.appendChild(particle);
    }
}

// Create particles on load
window.addEventListener('load', createParticles);

// ===========================
// Mouse Move Parallax Effect
// ===========================

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth - 0.5;
    mouseY = e.clientY / window.innerHeight - 0.5;
});

function animateParallax() {
    const hero = document.querySelector('.hero');
    if (hero && window.pageYOffset < window.innerHeight) {
        const moveX = mouseX * 20;
        const moveY = mouseY * 20;

        hero.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }

    requestAnimationFrame(animateParallax);
}

animateParallax();

// ===========================
// ULTRA DYNAMIC Cursor System
// ===========================

const coords = { x: 0, y: 0, prevX: 0, prevY: 0 };
let currentSection = 'hero';
let velocity = 0;
let hue = 180; // Start with cyan

if (window.innerWidth > 768) {
    // Hide default cursor
    document.body.style.cursor = 'none';
    document.querySelectorAll('a, button, .btn').forEach(el => {
        el.style.cursor = 'none';
    });

    // Create main cursor with inner dot
    const mainCursor = document.createElement('div');
    mainCursor.className = 'main-cursor';
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    mainCursor.appendChild(cursorDot);
    document.body.appendChild(mainCursor);

    // Create visible pointer cursor
    const cursorPointer = document.createElement('div');
    cursorPointer.className = 'cursor-pointer';
    cursorPointer.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
                  fill="url(#cursorGradient)"
                  stroke="rgba(6, 182, 212, 0.8)"
                  stroke-width="1.5"/>
            <defs>
                <linearGradient id="cursorGradient" x1="3" y1="3" x2="19.97" y2="19.97">
                    <stop offset="0%" stop-color="#06b6d4"/>
                    <stop offset="100%" stop-color="#2dd4bf"/>
                </linearGradient>
            </defs>
        </svg>
    `;
    document.body.appendChild(cursorPointer);

    // Create cursor text label
    const cursorText = document.createElement('div');
    cursorText.className = 'cursor-text';
    document.body.appendChild(cursorText);

    // Create more cursor circles for better trail (15 circles!)
    for (let i = 0; i < 15; i++) {
        const circle = document.createElement('div');
        circle.className = 'cursor-circle';
        circle.style.setProperty('--index', i);
        document.body.appendChild(circle);
    }

    // Create MORE sparkles (12 sparkles!)
    for (let i = 0; i < 12; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'cursor-sparkle';
        sparkle.style.animationDelay = i * 0.08 + 's';
        document.body.appendChild(sparkle);
    }

    // Create particle trail
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'cursor-particle';
        document.body.appendChild(particle);
    }

    // Create constellation points (for connecting lines)
    const constellationPoints = [];
    for (let i = 0; i < 30; i++) {
        const point = {
            x: 0,
            y: 0,
            life: 0
        };
        constellationPoints.push(point);
    }

    // Create canvas for artistic effects
    const canvas = document.createElement('canvas');
    canvas.className = 'cursor-canvas';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Create aurora glow
    const auroraGlow = document.createElement('div');
    auroraGlow.className = 'aurora-glow';
    document.body.appendChild(auroraGlow);

    // Create geometric shapes
    for (let i = 0; i < 5; i++) {
        const shape = document.createElement('div');
        shape.className = 'geometric-shape';
        shape.style.setProperty('--delay', i * 0.2 + 's');
        document.body.appendChild(shape);
    }

    const geometricShapes = document.querySelectorAll('.geometric-shape');

    const cursorCircles = document.querySelectorAll(".cursor-circle");
    const cursorSparkles = document.querySelectorAll(".cursor-sparkle");
    const cursorParticles = document.querySelectorAll(".cursor-particle");

    cursorCircles.forEach(function (circle, index) {
        circle.x = 0;
        circle.y = 0;
    });

    let isHovering = false;
    let isClicking = false;
    let hoverType = '';

    // Detect which section we're in
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                currentSection = entry.target.id || 'default';
                mainCursor.setAttribute('data-section', currentSection);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('section').forEach(section => {
        sectionObserver.observe(section);
    });

    window.addEventListener("mousemove", function (e) {
        // Calculate velocity for color changes
        const dx = e.clientX - coords.prevX;
        const dy = e.clientY - coords.prevY;
        velocity = Math.sqrt(dx * dx + dy * dy);

        coords.prevX = coords.x;
        coords.prevY = coords.y;
        coords.x = e.clientX;
        coords.y = e.clientY;

        // Update hue based on velocity (faster = more colorful)
        hue = 180 + (velocity * 2);
        if (hue > 360) hue -= 360;

        mainCursor.style.left = e.clientX + 'px';
        mainCursor.style.top = e.clientY + 'px';
        mainCursor.style.borderColor = `hsl(${hue}, 70%, 60%)`;

        cursorPointer.style.left = e.clientX + 'px';
        cursorPointer.style.top = e.clientY + 'px';
        cursorPointer.style.transform = 'translate(0, 0)';
        cursorPointer.style.filter = `drop-shadow(0 0 8px hsl(${hue}, 80%, 60%))`;

        cursorText.style.left = e.clientX + 40 + 'px';
        cursorText.style.top = e.clientY + 40 + 'px';

        // Update aurora glow position
        auroraGlow.style.left = e.clientX + 'px';
        auroraGlow.style.top = e.clientY + 'px';
        auroraGlow.style.background = `radial-gradient(circle,
            hsla(${hue}, 70%, 60%, 0.3) 0%,
            hsla(${hue + 30}, 70%, 60%, 0.2) 30%,
            transparent 70%)`;

        // Update geometric shapes
        geometricShapes.forEach((shape, index) => {
            const delay = index * 50;
            setTimeout(() => {
                shape.style.left = e.clientX + 'px';
                shape.style.top = e.clientY + 'px';
                shape.style.borderColor = `hsl(${hue + index * 30}, 70%, 60%)`;
            }, delay);
        });

        // Add constellation points
        if (Math.random() > 0.7) {
            const availablePoint = constellationPoints.find(p => p.life <= 0);
            if (availablePoint) {
                availablePoint.x = e.clientX;
                availablePoint.y = e.clientY;
                availablePoint.life = 60; // Frames to live
            }
        }

        // Update sparkles with more dynamic positioning
        cursorSparkles.forEach((sparkle, index) => {
            setTimeout(() => {
                const offsetX = Math.sin(index * 0.5) * 10;
                const offsetY = Math.cos(index * 0.5) * 10;
                sparkle.style.left = e.clientX + offsetX + 'px';
                sparkle.style.top = e.clientY + offsetY + 'px';
            }, index * 20);
        });

        // Update particles randomly
        cursorParticles.forEach((particle, index) => {
            if (Math.random() > 0.95) {
                particle.style.left = e.clientX + 'px';
                particle.style.top = e.clientY + 'px';
                particle.style.opacity = '1';
                setTimeout(() => {
                    particle.style.opacity = '0';
                }, 500);
            }
        });

        // Check what we're hovering over
        const target = e.target;

        // Buttons and CTAs
        if (target.closest('.btn, .contact-button')) {
            isHovering = true;
            hoverType = 'button';
            mainCursor.classList.add('hovering', 'button');
            mainCursor.classList.remove('link', 'card');
            cursorPointer.style.transform = 'translate(0, 0) scale(1.3) rotate(12deg)';
            const btnText = target.textContent.trim();
            cursorText.textContent = '→ ' + btnText;
            cursorText.style.opacity = '1';
        }
        // Navigation links
        else if (target.closest('.nav-link')) {
            isHovering = true;
            hoverType = 'link';
            mainCursor.classList.add('hovering', 'link');
            mainCursor.classList.remove('button', 'card');
            cursorPointer.style.transform = 'translate(0, 0) scale(1.2) rotate(-12deg)';
            cursorText.textContent = '↗ Navigate';
            cursorText.style.opacity = '1';
        }
        // Cards
        else if (target.closest('.highlight-card, .cert-card, .education-card, .timeline-content, .network-badge, .language-badge, .leadership-item')) {
            isHovering = true;
            hoverType = 'card';
            mainCursor.classList.add('hovering', 'card');
            mainCursor.classList.remove('button', 'link');
            cursorPointer.style.transform = 'translate(0, 0) scale(1.1)';
            cursorText.textContent = '✨ Explore';
            cursorText.style.opacity = '1';
        }
        // Email/LinkedIn
        else if (target.closest('a[href^="mailto"], a[href*="linkedin"]')) {
            isHovering = true;
            hoverType = 'contact';
            mainCursor.classList.add('hovering', 'button');
            mainCursor.classList.remove('link', 'card');
            cursorPointer.style.transform = 'translate(0, 0) scale(1.3) rotate(8deg)';
            cursorText.textContent = '📧 Connect';
            cursorText.style.opacity = '1';
        }
        // MF Logo
        else if (target.closest('.nav-brand')) {
            isHovering = true;
            mainCursor.classList.add('hovering');
            cursorPointer.style.transform = 'translate(0, 0) scale(1.4) rotate(15deg)';
            cursorText.textContent = '🏠 Home';
            cursorText.style.opacity = '1';
        }
        else {
            isHovering = false;
            hoverType = '';
            mainCursor.classList.remove('hovering', 'button', 'link', 'card');
            cursorPointer.style.transform = 'translate(0, 0) scale(1)';
            cursorText.style.opacity = '0';
        }
    });

    // Click effects - ENHANCED
    document.addEventListener('mousedown', () => {
        isClicking = true;
        mainCursor.classList.add('clicking');

        // Create burst particles with rainbow colors
        for (let i = 0; i < 12; i++) {
            const burst = document.createElement('div');
            burst.className = 'cursor-burst';
            burst.style.left = coords.x + 'px';
            burst.style.top = coords.y + 'px';
            const angle = (i / 12) * Math.PI * 2;
            burst.style.setProperty('--angle', angle + 'rad');
            const burstHue = (hue + i * 30) % 360;
            burst.style.background = `hsl(${burstHue}, 70%, 60%)`;
            burst.style.boxShadow = `0 0 15px hsl(${burstHue}, 70%, 60%)`;
            document.body.appendChild(burst);

            setTimeout(() => burst.remove(), 1000);
        }

        // Create velocity ring
        if (velocity > 5) {
            const ring = document.createElement('div');
            ring.className = 'velocity-ring';
            ring.style.left = coords.x + 'px';
            ring.style.top = coords.y + 'px';
            ring.style.borderColor = `hsl(${hue}, 70%, 60%)`;
            document.body.appendChild(ring);

            setTimeout(() => ring.remove(), 800);
        }

        // Create paint blobs for artistic trail
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const blob = document.createElement('div');
                blob.className = 'paint-blob';
                blob.style.left = coords.x + (Math.random() - 0.5) * 30 + 'px';
                blob.style.top = coords.y + (Math.random() - 0.5) * 30 + 'px';
                blob.style.background = `radial-gradient(circle, hsl(${hue}, 70%, 60%), transparent)`;
                document.body.appendChild(blob);

                setTimeout(() => blob.remove(), 2000);
            }, i * 100);
        }
    });

    document.addEventListener('mouseup', () => {
        isClicking = false;
        mainCursor.classList.remove('clicking');
    });

    function animateCursor() {
        let x = coords.x;
        let y = coords.y;

        // Update cursor circles with velocity-based colors
        cursorCircles.forEach(function (circle, index) {
            circle.style.left = x - 12 + "px";
            circle.style.top = y - 12 + "px";

            const scale = (cursorCircles.length - index) / cursorCircles.length;
            circle.style.scale = scale;

            const circleHue = (hue - index * 10 + 360) % 360;
            circle.style.background = `radial-gradient(circle,
                hsla(${circleHue}, 70%, 60%, ${0.6 * scale}) 0%,
                transparent 70%)`;
            circle.style.boxShadow = `0 0 20px hsla(${circleHue}, 70%, 60%, 0.4)`;

            // Add rotation for more dynamic effect
            circle.style.transform = `scale(${scale}) rotate(${index * 15}deg)`;

            circle.x = x;
            circle.y = y;

            const nextCircle = cursorCircles[index + 1] || cursorCircles[0];
            const speed = isHovering ? 0.15 : 0.25;
            x += (nextCircle.x - x) * speed;
            y += (nextCircle.y - y) * speed;
        });

        // Clear and draw constellation lines
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw constellation points
        constellationPoints.forEach((point, i) => {
            if (point.life > 0) {
                point.life--;
                const alpha = point.life / 60;

                // Draw point
                ctx.beginPath();
                ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${hue}, 70%, 60%, ${alpha})`;
                ctx.fill();

                // Draw lines to nearby points
                constellationPoints.forEach((otherPoint, j) => {
                    if (i !== j && otherPoint.life > 0) {
                        const distance = Math.sqrt(
                            Math.pow(point.x - otherPoint.x, 2) +
                            Math.pow(point.y - otherPoint.y, 2)
                        );

                        if (distance < 150) {
                            ctx.beginPath();
                            ctx.moveTo(point.x, point.y);
                            ctx.lineTo(otherPoint.x, otherPoint.y);
                            const lineAlpha = (1 - distance / 150) * alpha * 0.3;
                            ctx.strokeStyle = `hsla(${hue}, 70%, 60%, ${lineAlpha})`;
                            ctx.lineWidth = 1;
                            ctx.stroke();
                        }
                    }
                });
            }
        });

        requestAnimationFrame(animateCursor);
    }

    animateCursor();
}

// ===========================
// Typing Effect for Hero Subtitle
// ===========================

const subtitle = document.querySelector('.hero-subtitle');
const originalText = subtitle.textContent;
subtitle.textContent = '';

let i = 0;
function typeWriter() {
    if (i < originalText.length) {
        subtitle.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
    }
}

setTimeout(typeWriter, 500);

// ===========================
// Magnetic Button Effect
// ===========================

const magneticElements = document.querySelectorAll('.btn, .contact-button, .nav-link');

magneticElements.forEach(el => {
    el.addEventListener('mousemove', function(e) {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    el.addEventListener('mouseleave', function() {
        el.style.transform = 'translate(0, 0)';
    });
});

// ===========================
// 3D Tilt Effect on Cards
// ===========================

const tiltElements = document.querySelectorAll('.highlight-card, .cert-card, .education-card, .timeline-content, .network-badge, .language-badge');

tiltElements.forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    card.addEventListener('mouseleave', function() {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// ===========================
// Interactive Text Highlighting
// ===========================

const textElements = document.querySelectorAll('p, li, h3, h4');

textElements.forEach(el => {
    el.addEventListener('mouseenter', function() {
        this.style.color = 'var(--primary-color)';
        this.style.transition = 'color 0.3s ease';
    });

    el.addEventListener('mouseleave', function() {
        this.style.color = '';
    });
});

// ===========================
// Ripple Effect on Click
// ===========================

document.addEventListener('click', function(e) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    document.body.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 1000);
});

// ===========================
// Scroll Progress Bar
// ===========================

const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
});

// ===========================
// Floating Action Button
// ===========================

const fab = document.createElement('a');
fab.href = '#home';
fab.className = 'floating-action-button';
fab.innerHTML = '↑';
document.body.appendChild(fab);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        fab.classList.add('visible');
    } else {
        fab.classList.remove('visible');
    }
});

// ===========================
// Interactive Section Reveal
// ===========================

const sections = document.querySelectorAll('section');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-revealed');
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    revealObserver.observe(section);
});

// ===========================
// Console Message
// ===========================

console.log('%c👋 Welcome to Miriam Fahim\'s Portfolio!', 'font-size: 20px; font-weight: bold; color: #06b6d4;');
console.log('%cInterested in the code? Feel free to reach out!', 'font-size: 14px; color: #14b8a6;');
