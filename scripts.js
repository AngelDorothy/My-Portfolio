// Portfolio Website JavaScript
// Angel Dorothy Portfolio - Interactive Features

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functionality
    initSmoothScrolling();
    initAnimations();
    initContactForm();
    initResponsiveNavigation();
    initScrollEffects();
    
    console.log('Portfolio website loaded successfully!');
});

// ===== SMOOTH SCROLLING NAVIGATION =====
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a[href^="#"], .footer-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active navigation state
                updateActiveNavigation(targetId);
            }
        });
    });
}

// Update active navigation based on scroll position
function updateActiveNavigation(currentSectionId) {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentSectionId) {
            link.classList.add('active');
        }
    });
}

// ===== ANIMATION EFFECTS =====
function initAnimations() {
    // Add animation classes to elements on load
    const fadeElements = document.querySelectorAll('.fade-in');
    const slideElements = document.querySelectorAll('.slide-in');
    
    // Trigger initial animations
    setTimeout(() => {
        fadeElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('visible');
            }, index * 200);
        });
        
        slideElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('visible');
            }, index * 300);
        });
    }, 500);
}

// ===== CONTACT FORM HANDLING =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                message: document.getElementById('message').value.trim()
            };
            
            // Validate form
            if (validateContactForm(formData)) {
                // Simulate form submission
                submitContactForm(formData);
            }
        });
        
        // Add real-time validation
        addFormValidation();
    }
}

function validateContactForm(data) {
    const errors = [];
    
    if (!data.name) {
        errors.push('Name is required');
    }
    
    if (!data.email) {
        errors.push('Email is required');
    } else if (!isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!data.message) {
        errors.push('Message is required');
    } else if (data.message.length < 10) {
        errors.push('Message must be at least 10 characters long');
    }
    
    if (errors.length > 0) {
        showFormErrors(errors);
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormErrors(errors) {
    // Remove existing error messages
    const existingErrors = document.querySelectorAll('.form-error');
    existingErrors.forEach(error => error.remove());
    
    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.style.cssText = `
        background-color: #f8d7da;
        color: #721c24;
        padding: 10px;
        border-radius: 4px;
        margin: 10px 0;
        border: 1px solid #f5c6cb;
    `;
    
    errorDiv.innerHTML = '<strong>Please fix the following errors:</strong><ul>' + 
        errors.map(error => `<li>${error}</li>`).join('') + '</ul>';
    
    const form = document.getElementById('contactForm');
    form.insertBefore(errorDiv, form.firstChild);
    
    // Auto-remove error after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 5000);
}

function addFormValidation() {
    const inputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    switch(field.id) {
        case 'name':
            if (!value) {
                isValid = false;
                errorMessage = 'Name is required';
            }
            break;
        case 'email':
            if (!value) {
                isValid = false;
                errorMessage = 'Email is required';
            } else if (!isValidEmail(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;
        case 'message':
            if (!value) {
                isValid = false;
                errorMessage = 'Message is required';
            } else if (value.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters long';
            }
            break;
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        clearFieldError(field);
    }
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorSpan = document.createElement('span');
    errorSpan.className = 'field-error';
    errorSpan.textContent = message;
    errorSpan.style.cssText = `
        color: #dc3545;
        font-size: 0.8em;
        display: block;
        margin-top: 5px;
    `;
    
    field.parentNode.appendChild(errorSpan);
    field.style.borderColor = '#dc3545';
}

function clearFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    field.style.borderColor = '';
}

function submitContactForm(data) {
    // Show loading state
    const submitBtn = document.querySelector('#contactForm .btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Show success message
        showFormSuccess();
        
        // Reset form
        document.getElementById('contactForm').reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // In a real application, you would send the data to your server
        console.log('Form data to be sent:', data);
        
        // You could integrate with services like:
        // - EmailJS
        // - Formspree
        // - Netlify Forms
        // - Your own backend API
    }, 2000);
}

function showFormSuccess() {
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.style.cssText = `
        background-color: #d4edda;
        color: #155724;
        padding: 15px;
        border-radius: 4px;
        margin: 10px 0;
        border: 1px solid #c3e6cb;
        text-align: center;
    `;
    successDiv.innerHTML = '<strong>Thank you!</strong> Your message has been sent successfully. I will get back to you soon!';
    
    const form = document.getElementById('contactForm');
    form.insertBefore(successDiv, form.firstChild);
    
    // Auto-remove success message after 5 seconds
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.remove();
        }
    }, 5000);
}

// ===== RESPONSIVE NAVIGATION =====
function initResponsiveNavigation() {
    // Add mobile menu toggle functionality
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuBtn.style.cssText = `
        display: none;
        background: none;
        border: none;
        font-size: 1.5em;
        color: #333;
        cursor: pointer;
        padding: 5px;
    `;
    
    header.appendChild(mobileMenuBtn);
    
    // Mobile menu functionality
    mobileMenuBtn.addEventListener('click', function() {
        nav.classList.toggle('mobile-open');
        this.innerHTML = nav.classList.contains('mobile-open') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars">';
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('mobile-open');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Add responsive styles
    addResponsiveStyles();
}

function addResponsiveStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block !important;
            }
            
            nav {
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background: white;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                transform: translateY(-100%);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            
            nav.mobile-open {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }
            
            nav ul {
                flex-direction: column;
                padding: 20px;
            }
            
            nav ul li {
                margin: 10px 0;
            }
            
            header {
                position: relative;
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    // Parallax effect for hero section
    const hero = document.querySelector('#hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in, .portfolio-item, .skills-table, .experience-table');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Update active navigation on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                updateActiveNavigation('#' + sectionId);
            }
        });
    });
}

// ===== UTILITY FUNCTIONS =====

// Debounce function for performance optimization
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimize scroll events
const optimizedScrollHandler = throttle(function() {
    // Scroll-based animations and effects
    const scrolled = window.pageYOffset;
    const header = document.querySelector('header');
    
    // Add/remove header background on scroll
    if (scrolled > 100) {
        header.style.backgroundColor = 'rgba(240, 240, 240, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = '#f0f0f0';
        header.style.backdropFilter = 'none';
    }
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// ===== ADDITIONAL FEATURES =====

// Typing effect for hero section
function initTypingEffect() {
    const heroTitle = document.querySelector('#hero h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a delay
        setTimeout(typeWriter, 1000);
    }
}

// Initialize typing effect
setTimeout(initTypingEffect, 500);

// Add loading animation
window.addEventListener('load', function() {
    const loader = document.createElement('div');
    loader.style.cssText = `
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
    loader.innerHTML = '<div style="font-size: 2em; color: #007bff;">Loading...</div>';
    
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }, 1000);
});
