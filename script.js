// Custom JavaScript for S. Rupesh Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initSmoothScrolling();
    initNavbarScroll();
    initAnimations();
    initTypingEffect();
    initHeroAnimations();
});

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
                
                // Update active nav link
                updateActiveNavLink(targetId);
            }
        });
    });
}

// Update Active Navigation Link
function updateActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.getElementById('mainNav');
    
    window.addEventListener('scroll', function() {        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(0, 122, 204, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.2)';
        } else {
            navbar.style.background = '';
            navbar.style.backdropFilter = '';
            navbar.style.borderBottom = '';
        }
        
        // Update active section based on scroll position
        updateActiveSection();
    });
}

// Update Active Section Based on Scroll Position
function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            updateActiveNavLink(`#${sectionId}`);
        }
    });
}

// Intersection Observer for Animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special animation for skill cards
                if (entry.target.classList.contains('skill-card')) {
                    animateSkillCard(entry.target);
                }
                
                // Special animation for project cards
                if (entry.target.classList.contains('project-card')) {
                    animateProjectCard(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    const elementsToAnimate = document.querySelectorAll('.card, .timeline-item, .contact-item');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// Animate Skill Cards
function animateSkillCard(card) {
    const skillIcon = card.querySelector('.skill-icon');
    const skillList = card.querySelectorAll('.skill-list li');
    
    if (skillIcon) {
        skillIcon.style.animation = 'pulse 1s ease-in-out';
    }
    
    skillList.forEach((skill, index) => {
        setTimeout(() => {
            skill.style.opacity = '1';
            skill.style.transform = 'translateX(0)';
        }, index * 100);
        
        skill.style.opacity = '0';
        skill.style.transform = 'translateX(-20px)';
        skill.style.transition = 'all 0.3s ease';
    });
}

// Animate Project Cards
function animateProjectCard(card) {
    const projectIcon = card.querySelector('.project-icon');
    const badges = card.querySelectorAll('.badge');
    
    if (projectIcon) {
        projectIcon.style.animation = 'bounce 1s ease-in-out';
    }
    
    badges.forEach((badge, index) => {
        setTimeout(() => {
            badge.style.opacity = '1';
            badge.style.transform = 'scale(1)';
        }, index * 100);
        
        badge.style.opacity = '0';
        badge.style.transform = 'scale(0.8)';
        badge.style.transition = 'all 0.3s ease';
    });
}

// Typing Effect for Hero Section
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const originalHTML = heroTitle.innerHTML;
        const textContent = heroTitle.textContent;
        heroTitle.innerHTML = '';
        
        let i = 0;
        const timer = setInterval(() => {
            if (i < textContent.length) {
                if (textContent.charAt(i) === 'S' && textContent.substring(i, i + 9) === 'S. Rupesh') {
                    // Add the styled span for the name
                    heroTitle.innerHTML += '<span class="text-primary">S. Rupesh</span>';
                    i += 9; // Skip the rest of "S. Rupesh"
                } else {
                    heroTitle.innerHTML += textContent.charAt(i);
                    i++;
                }
            } else {
                clearInterval(timer);
                // Ensure the final HTML matches the original structure
                heroTitle.innerHTML = originalHTML;
            }
        }, 25); // Even faster typing speed: reduced from 30ms to 25ms
    }
}

// Add custom CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
      .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
      @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Enhanced Hero Animations
function initHeroAnimations() {
    const heroSection = document.querySelector('.hero-section');
    const heroContent = document.querySelector('.hero-content');
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    const socialLinks = document.querySelectorAll('.social-link');
    const profileCard = document.querySelector('.profile-card');
    
    // Stagger button animations
    heroButtons.forEach((btn, index) => {
        btn.style.animationDelay = `${0.6 + (index * 0.1)}s`;
    });
    
    // Stagger social link animations
    socialLinks.forEach((link, index) => {
        link.style.animationDelay = `${0.8 + (index * 0.1)}s`;
        
        // Add hover effects
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Enhanced floating icons animation
    const floatingIcons = document.querySelectorAll('.floating-icon');
    floatingIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.5}s`;
        
        // Add random rotation on hover
        icon.addEventListener('mouseenter', function() {
            const randomRotation = Math.random() * 360;
            this.style.transform = `rotate(${randomRotation}deg) scale(1.2)`;
            this.style.transition = 'transform 0.3s ease';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'rotate(0deg) scale(1)';
        });
    });
}

// Form Validation (if contact form is added later)
function validateContactForm(form) {
    const name = form.querySelector('input[name="name"]');
    const email = form.querySelector('input[name="email"]');
    const message = form.querySelector('textarea[name="message"]');
    
    let isValid = true;
    
    // Clear previous errors
    form.querySelectorAll('.error').forEach(error => error.remove());
    
    // Validate name
    if (!name.value.trim()) {
        showError(name, 'Name is required');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        showError(email, 'Email is required');
        isValid = false;
    } else if (!emailRegex.test(email.value)) {
        showError(email, 'Please enter a valid email');
        isValid = false;
    }
    
    // Validate message
    if (!message.value.trim()) {
        showError(message, 'Message is required');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        showError(message, 'Message must be at least 10 characters');
        isValid = false;
    }
    
    return isValid;
}

function showError(input, message) {
    const error = document.createElement('div');
    error.className = 'error text-danger mt-1';
    error.textContent = message;
    input.parentNode.appendChild(error);
    input.classList.add('is-invalid');
}

// Easter Egg: Konami Code
let konamiCode = [];
const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konami.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.toString() === konami.toString()) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    // Add rainbow effect to the page
    document.body.style.animation = 'rainbow 2s linear infinite';
    
    // Add CSS for rainbow effect
    const rainbowStyle = document.createElement('style');
    rainbowStyle.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(rainbowStyle);
    
    // Show alert
    setTimeout(() => {
        alert('🎉 Easter Egg Activated! Welcome to the Rainbow Zone! 🌈');
    }, 1000);
    
    // Remove effect after 5 seconds
    setTimeout(() => {
        document.body.style.animation = '';
        document.head.removeChild(rainbowStyle);
    }, 5000);
}

// Lazy Loading for Images (if images are added later)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Performance Optimization: Debounced Scroll Handler
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Update scroll handlers to use debouncing
window.addEventListener('scroll', debounce(function() {
    updateActiveSection();
}, 10));

// Preloader (optional)
function initPreloader() {
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.innerHTML = `
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    `;
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    document.body.prepend(preloader);
    
    window.addEventListener('load', function() {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.remove();
        }, 500);
    });
}

// Initialize preloader if desired
// initPreloader();
