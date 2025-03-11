// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-out'
});

// DOM Elements
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.querySelector('.theme-toggle');
const backToTop = document.querySelector('.back-to-top');
const contactForm = document.querySelector('#contact-form');
const skillBars = document.querySelectorAll('.progress');
const particles = document.querySelectorAll('.particle');

// Particle Animation
function animateParticles() {
    particles.forEach((particle, index) => {
        const randomX = Math.random() * 200 - 100;
        const randomY = Math.random() * 200 - 100;
        const randomRotate = Math.random() * 360;
        const randomScale = 0.8 + Math.random() * 0.4;
        const duration = 15 + Math.random() * 10;

        particle.style.animation = `float ${duration}s infinite`;
        particle.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg) scale(${randomScale})`;
    });
}

animateParticles();

// Mobile Navigation Toggle with Animation
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-active');
    hamburger.classList.toggle('active');
    
    // Animate nav links
    const links = navLinks.querySelectorAll('a');
    links.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `fadeInDown 0.5s ease forwards ${index * 0.1}s`;
        }
    });
});

// Smooth Scroll with Progress Indicator
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('mobile-active');
                hamburger.classList.remove('active');
            }
            
            // Smooth scroll
            const targetPosition = target.offsetTop - navbar.offsetHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Parallax Effect for Hero Section
const heroContent = document.querySelector('.hero-content');
window.addEventListener('scroll', () => {
    const scroll = window.pageYOffset;
    if (heroContent) {
        heroContent.style.transform = `translateY(${scroll * 0.4}px)`;
    }
});

// Enhanced Theme Toggle with Animation
let isDarkMode = localStorage.getItem('darkMode') === 'true';
updateTheme();

themeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    localStorage.setItem('darkMode', isDarkMode);
    updateTheme();
    
    // Add rotation animation
    themeToggle.style.animation = 'rotate 0.5s ease';
    setTimeout(() => {
        themeToggle.style.animation = '';
    }, 500);
});

function updateTheme() {
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    themeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    
    // Add transition class to body
    document.body.classList.add('theme-transition');
    setTimeout(() => {
        document.body.classList.remove('theme-transition');
    }, 1000);
}

// Enhanced Navbar Scroll Effect
let lastScroll = 0;
let isNavbarHidden = false;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Back to Top Button
    if (currentScroll > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    
    // Navbar Hide/Show with smooth transition
    if (currentScroll > lastScroll && currentScroll > 100 && !isNavbarHidden) {
        navbar.style.transform = 'translateY(-100%)';
        isNavbarHidden = true;
    } else if ((currentScroll < lastScroll || currentScroll <= 100) && isNavbarHidden) {
        navbar.style.transform = 'translateY(0)';
        isNavbarHidden = false;
    }
    
    // Add shadow to navbar when scrolled
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Enhanced Skill Bars Animation
const animateSkills = () => {
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
};

// Trigger skill bar animation when skills section is in view
const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(skillsSection);
}

// Enhanced Form Validation and Submission
if (contactForm) {
    const formGroups = contactForm.querySelectorAll('.form-group');
    
    // Add focus effects to form inputs
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');
        
        input.addEventListener('focus', () => {
            group.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                group.classList.remove('focused');
            }
        });
        
        // Add floating label effect
        if (input.value) {
            group.classList.add('focused');
        }
    });
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: contactForm.querySelector('#name').value,
            email: contactForm.querySelector('#email').value,
            message: contactForm.querySelector('#message').value
        };

        // Form validation
        const errors = [];
        if (!formData.name.trim()) errors.push('Name is required');
        if (!formData.email.trim()) errors.push('Email is required');
        if (!isValidEmail(formData.email)) errors.push('Please enter a valid email address');
        if (!formData.message.trim()) errors.push('Message is required');

        if (errors.length > 0) {
            showFormError(errors.join('<br>'));
            return;
        }

        try {
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Opening email client...';
            submitBtn.disabled = true;

            // Create mailto link with form data
            const mailtoLink = `mailto:prathameshdhuri2003@gmail.com?subject=Portfolio Contact from ${formData.name}&body=Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            showFormSuccess('Email client opened successfully!');
            
            // Reset form after short delay
            setTimeout(() => {
                contactForm.reset();
                formGroups.forEach(group => group.classList.remove('focused'));
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1000);

        } catch (error) {
            showFormError('Failed to open email client. Please try again or contact directly at prathameshdhuri2003@gmail.com');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Form feedback functions
function showFormSuccess(message) {
    const feedback = document.createElement('div');
    feedback.className = 'form-feedback success';
    feedback.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    contactForm.appendChild(feedback);
    
    setTimeout(() => {
        feedback.remove();
    }, 3000);
}

function showFormError(message) {
    const feedback = document.createElement('div');
    feedback.className = 'form-feedback error';
    feedback.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    contactForm.appendChild(feedback);
    
    setTimeout(() => {
        feedback.remove();
    }, 3000);
}

// Email validation helper function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Project Cards Hover Effect with Tilt
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// Add CSS for new animations
const style = document.createElement('style');
style.textContent = `
    @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    @keyframes fadeInDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .theme-transition {
        transition: background-color 0.5s ease, color 0.5s ease;
    }
    
    .navbar.scrolled {
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
    
    .form-feedback {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 5px;
        color: white;
        animation: slideIn 0.3s ease;
    }
    
    .form-feedback.success {
        background: var(--secondary-color);
    }
    
    .form-feedback.error {
        background: #ff4444;
    }
    
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Set initial theme
    updateTheme();
    
    // Add fade-in class to sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
    });
    
    // Initialize particles
    animateParticles();
});

// Back to Top Button Functionality
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
