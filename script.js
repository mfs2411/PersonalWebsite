// ===========================
// PREMIUM WEBSITE WITH APPLE-LIKE MOTION
// Built with GSAP, ScrollTrigger, and Lenis
// ===========================

// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Developer Console Panel
const devPanel = {
    initialized: [],
    reducedMotion: prefersReducedMotion,
    log(feature) {
        this.initialized.push(feature);
    },
    display() {
        console.log('%c✨ Premium Website Initialized', 'font-size: 18px; font-weight: bold; color: #06b6d4;');
        console.log('%cInitialized Features:', 'font-size: 14px; font-weight: bold; color: #14b8a6;');
        this.initialized.forEach(feature => console.log(`  ✓ ${feature}`));
        console.log(`\n%cReduced Motion: ${this.reducedMotion ? '✓ Enabled' : '✗ Disabled'}`,
            `font-size: 12px; color: ${this.reducedMotion ? '#22c55e' : '#64748b'};`);
    }
};

// ===========================
// UTILITY FUNCTIONS
// ===========================

// Debounce function for performance
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function executedFunction(...args) {
        const context = this;
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

// Throttle function for mousemove events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===========================
// 1. LENIS SMOOTH SCROLL
// ===========================

function initLenis() {
    if (prefersReducedMotion) {
        devPanel.log('Lenis (skipped - reduced motion)');
        enableNativeSmooth();
        return null;
    }

    // Check if Lenis is available
    if (typeof Lenis === 'undefined') {
        console.warn('Lenis not loaded, using native smooth scroll');
        devPanel.log('Lenis (fallback to native)');
        enableNativeSmooth();
        return null;
    }

    try {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true,
            smoothTouch: false,
            touchMultiplier: 2
        });

        // Integrate with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        // Handle anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    lenis.scrollTo(target, {
                        offset: -80,
                        duration: 1.5
                    });
                }
            });
        });

        devPanel.log('Lenis Smooth Scroll');
        return lenis;
    } catch (error) {
        console.error('Lenis initialization failed:', error);
        devPanel.log('Lenis (error - using native)');
        enableNativeSmooth();
        return null;
    }
}

function enableNativeSmooth() {
    // Fallback to native smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';

    // Handle anchor links with native smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===========================
// 2. GSAP SCROLL TRIGGERS
// ===========================

function initScrollTriggers() {
    const featureSection = document.querySelector('.features-chapter');
    const featureSteps = document.querySelectorAll('.feature-step');
    const visualContainers = document.querySelectorAll('.visual-container');

    if (!featureSection || featureSteps.length === 0) {
        console.warn('Features section not found');
        return;
    }

    // Always activate first feature
    activateFeature(0);

    if (prefersReducedMotion) {
        devPanel.log('ScrollTrigger (skipped - reduced motion)');
        return;
    }

    // Check if GSAP is available
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP not loaded, using scroll fallback');
        devPanel.log('ScrollTrigger (fallback to scroll)');
        initScrollFallback();
        return;
    }

    try {
        gsap.registerPlugin(ScrollTrigger);

        const shouldPin = window.innerWidth > 768 && window.innerHeight > 600;

        if (shouldPin) {
            console.log('Initializing pinned features...');

            // Simple pin
            ScrollTrigger.create({
                trigger: featureSection,
                start: 'top top',
                end: '+=300%',
                pin: true,
                pinSpacing: true,
                markers: false, // Set to true to debug
                onUpdate: (self) => {
                    // Calculate which feature should be active based on progress
                    const progress = self.progress;
                    const stepCount = featureSteps.length;
                    const activeIndex = Math.min(
                        Math.floor(progress * stepCount),
                        stepCount - 1
                    );
                    activateFeature(activeIndex);
                }
            });

            devPanel.log('GSAP ScrollTrigger (Pinned Features)');
        } else {
            // Mobile/small screens: use IntersectionObserver
            initScrollFallback();
            devPanel.log('ScrollTrigger (mobile - scroll observer)');
        }

        // Fade in section titles
        if (gsap.utils && gsap.utils.toArray) {
            gsap.utils.toArray('.section-title').forEach(title => {
                gsap.fromTo(title,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        scrollTrigger: {
                            trigger: title,
                            start: 'top 80%',
                            end: 'top 60%',
                            scrub: 1
                        }
                    }
                );
            });
        }

    } catch (error) {
        console.error('ScrollTrigger error:', error);
        devPanel.log('ScrollTrigger (error - using fallback)');
        initScrollFallback();
    }
}

// Fallback scroll-based feature switching
function initScrollFallback() {
    const featureSection = document.querySelector('.features-chapter');
    const featureSteps = document.querySelectorAll('.feature-step');

    if (!featureSection || featureSteps.length === 0) return;

    window.addEventListener('scroll', throttle(() => {
        const rect = featureSection.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        const windowHeight = window.innerHeight;

        // Check if section is in view
        if (sectionTop < windowHeight && sectionTop + sectionHeight > 0) {
            // Calculate progress through section
            const progress = Math.max(0, Math.min(1, -sectionTop / (sectionHeight - windowHeight)));
            const activeIndex = Math.min(
                Math.floor(progress * featureSteps.length),
                featureSteps.length - 1
            );
            activateFeature(activeIndex);
        }
    }, 50));
}

// Helper function to activate a feature step
function activateFeature(index) {
    const featureSteps = document.querySelectorAll('.feature-step');
    const visualContainers = document.querySelectorAll('.visual-container');

    // Remove all active classes
    featureSteps.forEach(s => s.classList.remove('active'));
    visualContainers.forEach(v => v.classList.remove('active'));

    // Add active to current
    if (featureSteps[index]) {
        featureSteps[index].classList.add('active');
    }
    if (visualContainers[index]) {
        visualContainers[index].classList.add('active');
    }
}

// ===========================
// 3. PARALLAX EFFECTS
// ===========================

function initParallax() {
    if (prefersReducedMotion) {
        devPanel.log('Parallax (skipped - reduced motion)');
        return;
    }

    const parallaxBg = document.querySelector('.parallax-bg');
    const parallaxFg = document.querySelector('.parallax-fg');

    if (parallaxBg) {
        gsap.to(parallaxBg, {
            y: '30%',
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
    }

    if (parallaxFg) {
        gsap.to(parallaxFg, {
            y: '15%',
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
    }

    devPanel.log('GSAP Parallax (Hero Background & Foreground)');
}

// ===========================
// 4. REVEAL ON SCROLL
// ===========================

function initReveal() {
    const revealElements = document.querySelectorAll('.reveal');

    if (revealElements.length === 0) return;

    if (prefersReducedMotion) {
        // Just show all elements without animation
        revealElements.forEach(el => el.classList.add('revealed'));
        devPanel.log('Reveal (instant - reduced motion)');
        return;
    }

    // Use IntersectionObserver for performance
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Optional: unobserve after revealing
                    // revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        }
    );

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    devPanel.log('IntersectionObserver Reveal Animations');
}

// ===========================
// 5. 3D TILT ON HOVER
// ===========================

function initTilt() {
    const tiltElements = document.querySelectorAll('.card-tilt');

    if (tiltElements.length === 0) return;

    if (prefersReducedMotion) {
        devPanel.log('3D Tilt (skipped - reduced motion)');
        return;
    }

    tiltElements.forEach(card => {
        card.addEventListener('mousemove', throttle(function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Clamp tilt to ±12 degrees
            const rotateX = Math.max(-12, Math.min(12, (y - centerY) / 10));
            const rotateY = Math.max(-12, Math.min(12, (centerX - x) / 10));

            // Add will-change for smooth animation
            card.style.willChange = 'transform';
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        }, 16)); // ~60fps

        card.addEventListener('mouseleave', function() {
            // Ease back to neutral with transition
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';

            // Remove will-change after animation
            setTimeout(() => {
                card.style.willChange = 'auto';
            }, 300);
        });
    });

    devPanel.log('3D Tilt Effect (Clamped ±12°)');
}

// ===========================
// 6. MAGNETIC BUTTONS
// ===========================

function initMagnetic() {
    const magneticElements = document.querySelectorAll('.btn-magnet');

    if (magneticElements.length === 0) return;

    if (prefersReducedMotion) {
        devPanel.log('Magnetic Buttons (skipped - reduced motion)');
        return;
    }

    magneticElements.forEach(btn => {
        btn.addEventListener('mousemove', throttle(function(e) {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Magnetic radius: 14px
            const distance = Math.sqrt(x * x + y * y);
            const maxDistance = 14;

            if (distance < maxDistance * 3) {
                const power = Math.max(0, 1 - distance / (maxDistance * 3));
                const moveX = x * power * 0.4;
                const moveY = y * power * 0.4;

                btn.style.willChange = 'transform';
                btn.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }
        }, 16));

        btn.addEventListener('mouseleave', function() {
            btn.style.transform = 'translate(0, 0)';
            setTimeout(() => {
                btn.style.willChange = 'auto';
            }, 300);
        });
    });

    devPanel.log('Magnetic Buttons (14px radius)');
}

// ===========================
// 7. CUSTOM CURSOR
// ===========================

function initCursor() {
    // Skip on mobile or if reduced motion
    if (window.innerWidth <= 768 || prefersReducedMotion) {
        devPanel.log('Custom Cursor (skipped - mobile/reduced motion)');
        return;
    }

    const cursor = document.getElementById('cursor');
    if (!cursor) return;

    // Hide default cursor on desktop
    document.body.style.cursor = 'none';
    document.querySelectorAll('a, button, .btn, .card-tilt').forEach(el => {
        el.style.cursor = 'none';
    });

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    // Update mouse position
    document.addEventListener('mousemove', throttle((e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }, 16));

    // Animate cursor with easing
    function animateCursor() {
        const ease = 0.15;
        cursorX += (mouseX - cursorX) * ease;
        cursorY += (mouseY - cursorY) * ease;

        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effects
    const hoverTargets = document.querySelectorAll('.btn, .link, .card-tilt, .contact-button');
    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        target.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });

    devPanel.log('Custom Cursor (RAF easing)');
}

// ===========================
// 8. ACCESSIBLE MOBILE NAVIGATION
// ===========================

function initNav() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!navToggle || !navMenu) return;

    let isMenuOpen = false;

    // Toggle menu
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', isMenuOpen);

        // Lock body scroll when menu is open on mobile
        if (isMenuOpen && window.innerWidth <= 768) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        // Focus trap: focus first link when opening
        if (isMenuOpen) {
            setTimeout(() => {
                if (navLinks[0]) navLinks[0].focus();
            }, 100);
        }
    }

    function closeMenu() {
        if (isMenuOpen) {
            toggleMenu();
        }
    }

    // Toggle on button click
    navToggle.addEventListener('click', toggleMenu);

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            closeMenu();
        }
    });

    // Close menu with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMenu();
            navToggle.focus(); // Return focus to toggle button
        }
    });

    // Focus trap within menu when open
    if (navLinks.length > 0) {
        const firstLink = navLinks[0];
        const lastLink = navLinks[navLinks.length - 1];

        lastLink.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' && !e.shiftKey && isMenuOpen) {
                e.preventDefault();
                firstLink.focus();
            }
        });

        firstLink.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' && e.shiftKey && isMenuOpen) {
                e.preventDefault();
                lastLink.focus();
            }
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', debounce(() => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.boxShadow = '';
        }

        lastScroll = currentScroll;
    }, 10));

    devPanel.log('Accessible Mobile Nav (Focus Trap, ESC, ARIA)');
}

// ===========================
// 9. KEYBOARD NAVIGATION
// ===========================

function initKeyboardNav() {
    // Add class for keyboard navigation focus styles
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });

    devPanel.log('Keyboard Navigation Focus Styles');
}

// ===========================
// 10. CASE STUDY TABS
// ===========================

function initCaseTabs() {
    const tabButtons = document.querySelectorAll('.case-tab');
    const tabPanels = document.querySelectorAll('.tab-panel');

    if (tabButtons.length === 0 || tabPanels.length === 0) {
        console.warn('Case tabs not found');
        return;
    }

    function switchTab(targetIndex) {
        // Remove active from all
        tabButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
        });
        tabPanels.forEach(panel => {
            panel.classList.remove('active');
        });

        // Add active to target
        if (tabButtons[targetIndex]) {
            tabButtons[targetIndex].classList.add('active');
            tabButtons[targetIndex].setAttribute('aria-selected', 'true');
        }
        if (tabPanels[targetIndex]) {
            tabPanels[targetIndex].classList.add('active');
        }
    }

    // Click handler
    tabButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            switchTab(index);
        });

        // Keyboard navigation (Left/Right arrows)
        button.addEventListener('keydown', (e) => {
            let newIndex = index;

            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                newIndex = (index + 1) % tabButtons.length;
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                newIndex = (index - 1 + tabButtons.length) % tabButtons.length;
            } else if (e.key === 'Home') {
                e.preventDefault();
                newIndex = 0;
            } else if (e.key === 'End') {
                e.preventDefault();
                newIndex = tabButtons.length - 1;
            } else {
                return; // Exit if not arrow key
            }

            switchTab(newIndex);
            tabButtons[newIndex].focus();
        });
    });

    devPanel.log('Case Study Tabs (Keyboard + Click)');
}

// ===========================
// 11. ADDITIONAL POLISH
// ===========================

function initPolish() {
    // Hide scroll indicator after scrolling
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', debounce(() => {
            if (window.pageYOffset > 200) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.visibility = 'hidden';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.visibility = 'visible';
            }
        }, 10));
    }

    // Intersection Observer for timeline and cards (preserve existing animations)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe timeline items
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        if (!prefersReducedMotion) {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        }
        fadeObserver.observe(item);
    });

    // Observe certification cards
    document.querySelectorAll('.cert-card').forEach((card, index) => {
        if (!prefersReducedMotion) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        }
        fadeObserver.observe(card);
    });

    // Observe education cards
    document.querySelectorAll('.education-card').forEach((card, index) => {
        if (!prefersReducedMotion) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
        }
        fadeObserver.observe(card);
    });

    devPanel.log('Additional Polish (Scroll Indicator, Card Animations)');
}

// ===========================
// INIT ALL
// ===========================

function initAll() {
    console.log('=== Initializing Website ===');
    console.log('GSAP available?', typeof gsap !== 'undefined');
    console.log('ScrollTrigger available?', typeof ScrollTrigger !== 'undefined');
    console.log('Lenis available?', typeof Lenis !== 'undefined');
    console.log('Lucide available?', typeof lucide !== 'undefined');
    console.log('Window size:', window.innerWidth, 'x', window.innerHeight);

    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
        devPanel.log('Lucide Icons Rendered');
    }

    // Initialize all features
    const lenis = initLenis();

    // Delay ScrollTrigger init slightly to ensure GSAP is ready
    setTimeout(() => {
        initScrollTriggers();
        initParallax();
    }, 100);

    initReveal();
    initTilt();
    initMagnetic();
    initCursor();
    initNav();
    initKeyboardNav();
    initCaseTabs();
    initPolish();

    // Display developer panel
    setTimeout(() => {
        devPanel.display();
    }, 200);

    // Ensure body is visible
    document.body.style.opacity = '1';
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
} else {
    initAll();
}

// ===========================
// HOW TO TOGGLE FEATURES
// ===========================
// To disable any feature, comment out its init call in initAll()
//
// Examples:
// - Disable custom cursor: // initCursor();
// - Disable magnetic buttons: // initMagnetic();
// - Disable case study tabs: // initCaseTabs();
// - Disable smooth scroll: // const lenis = initLenis();
