// Unified observer options
const observerOptions = {
    root: null,
    rootMargin: '20px',
    threshold: 0.1
};

// Single IntersectionObserver instance
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('section, .service-card, .skill-category, .project-card, .experience-card, .contact-card').forEach((el) => {
    observer.observe(el);
});

// Mobile Menu Handler
document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const progressBar = document.querySelector('.progress-bar');
    const skipLink = document.querySelector('.skip-link');

    // Set animation duration
    document.documentElement.style.setProperty('--animate-duration', '0.5s');

    // Scroll Progress
    const updateProgress = () => {
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = `${scrolled}%`;
    };

    // Scroll Handling
    const handleScroll = () => {
        // Update navbar background
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update progress bar
        updateProgress();

        // Update active link based on scroll position
        const scrollPosition = window.scrollY + navbar.offsetHeight + 100;

        navLinks.forEach(link => {
            const section = document.querySelector(link.getAttribute('href'));
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    };

    // Smooth Scroll
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - navbar.offsetHeight;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });

        // Add tooltips
        const text = link.textContent.trim();
        const tooltip = document.createElement('span');
        tooltip.className = 'nav-tooltip';
        tooltip.textContent = text;
        link.appendChild(tooltip);
    });

    // Skip Link
    skipLink?.addEventListener('click', (e) => {
        e.preventDefault();
        const main = document.querySelector('main');
        if (main) {
            main.tabIndex = -1;
            main.focus();
        }
    });

    // Event Listeners
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('keydown', (e) => {
        // Add keyboard navigation
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });

    // Initialize
    handleScroll();

    // Performance optimization
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                handleScroll();
                scrollTimeout = null;
            }, 10);
        }
    }, { passive: true });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const submitBtn = contactForm.querySelector('.submit-btn');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Create email body
    const emailBody = `Name: ${name}
Email: ${email}

Message:
${message}`;

    // Create mailto URL
    const mailtoUrl = `mailto:aarinmahala1@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Add sending animation
    submitBtn.classList.add('sending');
    submitBtn.innerHTML = '<span>Opening Email Client...</span> <i class="fas fa-spinner fa-spin"></i>';

    // Open email client
    window.location.href = mailtoUrl;

    // Show success message after a short delay
    setTimeout(() => {
        submitBtn.classList.remove('sending');
        submitBtn.innerHTML = '<span>Email Client Opened</span> <i class="fas fa-check"></i>';
        submitBtn.style.background = '#4CAF50';

        // Reset form and button
        setTimeout(() => {
            contactForm.reset();
            submitBtn.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>';
            submitBtn.style.background = '';
        }, 3000);
    }, 1000);
});

// Responsive Image Loading
function handleResponsiveImages() {
    const profileImage = document.querySelector('.profile-image img');
    if (profileImage) {
        const currentSrc = profileImage.getAttribute('src');
        if (window.innerWidth <= 768) {
            // Only change if not already using small image
            if (!currentSrc.includes('-small')) {
                profileImage.setAttribute('src', currentSrc.replace(/(\.[^.]+)$/, '-small$1'));
            }
        } else {
            // Revert to original image for larger screens
            if (currentSrc.includes('-small')) {
                profileImage.setAttribute('src', currentSrc.replace('-small', ''));
            }
        }
    }
}

// Debounced window resize handler
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(handleResponsiveImages, 250);
});

// Initialize responsive features
document.addEventListener('DOMContentLoaded', () => {
    handleResponsiveImages();
    
    // Add smooth scroll behavior for contact section links
    document.querySelectorAll('.contact-info a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('mailto:') || href.startsWith('tel:')) {
                return; // Allow default behavior for email and phone links
            }
            e.preventDefault();
        });
    });

    // Initialize animations for elements in viewport on load
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .contact-card, .social-card, .highlight-item, .stat-item, .interests-container');
    animatedElements.forEach(element => {
        if (element.getBoundingClientRect().top < window.innerHeight) {
            element.classList.add('animate');
        }
    });
    
    // Counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        let count = 0;
        const duration = 2000; // 2 seconds
        const interval = Math.floor(duration / target);
        
        const timer = setInterval(() => {
            count++;
            element.textContent = count + '+';
            
            if (count >= target) {
                clearInterval(timer);
            }
        }, interval);
    }
    
    // Intersection Observer for stats
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    // Observe stat numbers
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Animate skill bars when they come into view
    const skillBars = document.querySelectorAll('.skill-bar');
    
    // Intersection Observer for skill bars
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.style.width;
                
                // First set width to 0
                skillBar.style.width = '0';
                
                // Then animate to the target width
                setTimeout(() => {
                    skillBar.style.width = width;
                }, 100);
                
                skillObserver.unobserve(skillBar);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe skill bars
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });

    // Add hover effect for social cards
    const socialCards = document.querySelectorAll('.social-card');
    socialCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.social-icon');
            const iconI = card.querySelector('.social-icon i');
            const title = card.querySelector('h3');
            const desc = card.querySelector('p');
            
            icon.style.transform = 'scale(1.1) rotate(10deg)';
            iconI.style.transform = 'scale(1.1)';
            title.style.transform = 'translateY(-2px)';
            desc.style.transform = 'translateY(-2px)';
        });

        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.social-icon');
            const iconI = card.querySelector('.social-icon i');
            const title = card.querySelector('h3');
            const desc = card.querySelector('p');
            
            icon.style.transform = 'none';
            iconI.style.transform = 'none';
            title.style.transform = 'none';
            desc.style.transform = 'none';
        });

        // Add click effect
        card.addEventListener('click', () => {
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
        });

        // Add keyboard navigation
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });

    // Intersection Observer for social cards
    const socialObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                socialObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '50px'
    });

    socialCards.forEach(card => {
        socialObserver.observe(card);
    });
    
    // Timeline Animations
    const timelineItems = document.querySelectorAll('.timeline-item');
    const certificationCards = document.querySelectorAll('.certification-card');
    
    // Animate timeline items when scrolled into view
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add staggered animation to certification cards
                if (entry.target.querySelector('.certification-grid')) {
                    const cards = entry.target.querySelectorAll('.certification-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 300 + (index * 150));
                    });
                }
                
                // Add staggered animation to achievement items
                if (entry.target.querySelector('.achievement-list')) {
                    const items = entry.target.querySelectorAll('.achievement-list li');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateX(0)';
                        }, 300 + (index * 150));
                    });
                }
                
                // Add staggered animation to timeline achievements items
                if (entry.target.querySelector('.timeline-achievements')) {
                    const achievementItems = entry.target.querySelectorAll('.timeline-achievements li');
                    achievementItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateX(0)';
                        }, 300 + (index * 120));
                    });
                }
                
                // Add staggered animation to skill items
                if (entry.target.querySelector('.timeline-skills')) {
                    const skills = entry.target.querySelectorAll('.timeline-skills li');
                    skills.forEach((skill, index) => {
                        setTimeout(() => {
                            skill.style.opacity = '1';
                            skill.style.transform = 'translateY(0)';
                        }, 500 + (index * 100));
                    });
                }
                
                timelineObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    timelineItems.forEach(item => {
        // Set initial state
        item.classList.remove('animate');
        
        // Set initial states for inner elements
        const achievementItems = item.querySelectorAll('.achievement-list li, .timeline-achievements li');
        achievementItems.forEach(achievement => {
            achievement.style.opacity = '0';
            achievement.style.transform = 'translateX(-20px)';
            achievement.style.transition = 'all 0.5s ease';
        });
        
        const skillItems = item.querySelectorAll('.timeline-skills li');
        skillItems.forEach(skill => {
            skill.style.opacity = '0';
            skill.style.transform = 'translateY(10px)';
            skill.style.transition = 'all 0.3s ease';
        });
        
        const certItems = item.querySelectorAll('.certification-card');
        certItems.forEach(cert => {
            cert.style.opacity = '0';
            cert.style.transform = 'translateY(10px)';
            cert.style.transition = 'all 0.3s ease';
        });
        
        timelineObserver.observe(item);
    });
    
    // Add hover effects for certification cards
    certificationCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.certification-icon');
            icon.style.transform = 'scale(1.1) rotate(10deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.certification-icon');
            icon.style.transform = 'none';
        });
    });
});

// Performance optimization for animations on mobile
if (window.matchMedia('(max-width: 768px)').matches) {
    document.documentElement.style.setProperty('--animate-duration', '0.5s');
}

// Add hover effect for service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Animate stats when in view
const stats = document.querySelectorAll('.stat-number');
stats.forEach(stat => {
    const target = parseInt(stat.textContent);
    let current = 0;
    const increment = target / 50; // Adjust speed of counting

    function updateCount() {
        if (current < target) {
            current += increment;
            stat.textContent = Math.ceil(current) + '+';
            requestAnimationFrame(updateCount);
        } else {
            stat.textContent = target + '+';
        }
    }

    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            updateCount();
            statsObserver.unobserve(entries[0].target);
        }
    });

    statsObserver.observe(stat);
});

// Animate contact cards on scroll
const contactCards = document.querySelectorAll('.contact-card');
const socialLinks = document.querySelector('.social-links-container');

const contactObserverOptions = {
    threshold: 0.2
};

const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, contactObserverOptions);

// Initial setup for animations
[...contactCards, contactForm, socialLinks].forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease-out';
    contactObserver.observe(element);
});

// Hover effects for contact icons
const contactIcons = document.querySelectorAll('.contact-item i');

contactIcons.forEach(icon => {
    icon.addEventListener('mouseover', () => {
        icon.style.transform = 'scale(1.2) rotate(360deg)';
    });

    icon.addEventListener('mouseout', () => {
        icon.style.transform = 'scale(1) rotate(0)';
    });
});

// Social Links Animation and Interaction
document.addEventListener('DOMContentLoaded', () => {
    const socialBtns = document.querySelectorAll('.social-btn');
    const socialLinksContainer = document.querySelector('.social-links-container');

    // Add hover animations for social buttons
    socialBtns.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            const icon = btn.querySelector('.social-icon i');
            const name = btn.querySelector('.social-name');
            const handle = btn.querySelector('.social-handle');
            
            icon.style.transform = 'scale(1.2) rotate(360deg)';
            name.style.transform = 'translateX(5px)';
            handle.style.transform = 'translateX(5px)';
            
            // Add hover effect gradient
            btn.querySelector('.social-hover-effect').style.opacity = '0.1';
        });

        btn.addEventListener('mouseleave', () => {
            const icon = btn.querySelector('.social-icon i');
            const name = btn.querySelector('.social-name');
            const handle = btn.querySelector('.social-handle');
            
            icon.style.transform = 'scale(1) rotate(0)';
            name.style.transform = 'translateX(0)';
            handle.style.transform = 'translateX(0)';
            
            // Remove hover effect gradient
            btn.querySelector('.social-hover-effect').style.opacity = '0';
        });

        // Add click animation and ripple effect
        btn.addEventListener('click', function(e) {
            // Scale animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);

            // Ripple effect
            const ripple = document.createElement('div');
            ripple.classList.add('ripple');
            this.appendChild(ripple);

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Animate social links container on scroll into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate social buttons sequentially
                const buttons = entry.target.querySelectorAll('.social-btn');
                buttons.forEach((btn, index) => {
                    setTimeout(() => {
                        btn.style.opacity = '1';
                        btn.style.transform = 'translateY(0)';
                    }, index * 100);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '50px'
    });

    if (socialLinksContainer) {
        socialLinksContainer.style.opacity = '0';
        socialLinksContainer.style.transform = 'translateY(20px)';
        
        // Set initial state for social buttons
        socialBtns.forEach(btn => {
            btn.style.opacity = '0';
            btn.style.transform = 'translateY(20px)';
        });
        
        observer.observe(socialLinksContainer);
    }

    // Add keyboard navigation
    socialBtns.forEach(btn => {
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                btn.click();
            }
        });
    });
});

// Responsive Contact Section Handling
function handleContactResponsive() {
    const contactGrid = document.querySelector('.contact-grid');
    const contactForm = document.querySelector('.contact-form');
    const contactInfo = document.querySelector('.contact-info');
    const socialLinksContainer = document.querySelector('.social-links-container');
    
    function updateLayout() {
        if (window.innerWidth <= 768) {
            // Mobile layout
            contactGrid.style.gridTemplateColumns = '1fr';
            contactGrid.style.gap = '2rem';
            
            // Adjust form and info spacing
            contactForm.style.marginBottom = '2rem';
            contactInfo.style.marginTop = '0';
            
            // Adjust social links container
            socialLinksContainer.style.marginTop = '2rem';
            socialLinksContainer.style.padding = '1.5rem';
            
            // Adjust contact cards
            document.querySelectorAll('.contact-card').forEach(card => {
                card.style.padding = '1.2rem';
            });
            
            // Adjust form elements
            document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
                input.style.padding = '0.7rem 0.8rem';
            });
            
            // Adjust submit button
            const submitBtn = document.querySelector('.submit-btn');
            submitBtn.style.padding = '0.8rem';
            submitBtn.style.fontSize = '0.9rem';
            
        } else {
            // Desktop layout
            contactGrid.style.gridTemplateColumns = '1fr 1fr';
            contactGrid.style.gap = '4rem';
            
            // Reset form and info spacing
            contactForm.style.marginBottom = '0';
            contactInfo.style.marginTop = '0';
            
            // Reset social links container
            socialLinksContainer.style.marginTop = '2rem';
            socialLinksContainer.style.padding = '2rem';
            
            // Reset contact cards
            document.querySelectorAll('.contact-card').forEach(card => {
                card.style.padding = '1.5rem';
            });
            
            // Reset form elements
            document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
                input.style.padding = '0.8rem 1rem';
            });
            
            // Reset submit button
            const submitBtn = document.querySelector('.submit-btn');
            submitBtn.style.padding = '1rem';
            submitBtn.style.fontSize = '1rem';
        }
    }

    // Initial call
    updateLayout();

    // Update on window resize
    window.addEventListener('resize', updateLayout);
}

// Add responsive animations for contact section
function addContactAnimations() {
    const contactElements = document.querySelectorAll('.contact-form, .contact-card, .social-links-container');
    
    contactElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease-out';
        
        // Stagger the animations
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100 * index);
    });
}

// Initialize contact section responsiveness
document.addEventListener('DOMContentLoaded', () => {
    handleContactResponsive();
    addContactAnimations();
    
    // Handle email and phone links
    document.querySelectorAll('.contact-info a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            // Allow default behavior for email and phone links
            if (href.startsWith('mailto:') || href.startsWith('tel:')) {
                return; // This will allow the default behavior to open mail client or phone dialer
            }
            // Prevent default for other links
            e.preventDefault();
        });
    });
}); 