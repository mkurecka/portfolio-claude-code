// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    mobileMenuToggle.setAttribute('aria-expanded', 
        mobileMenuToggle.classList.contains('active') ? 'true' : 'false'
    );
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
    });
});

// Header scroll effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Parallax Effect
const parallaxBg = document.querySelector('.parallax-bg');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;
    parallaxBg.style.transform = `translateY(${scrolled * parallaxSpeed}px) scale(1.2)`;
});

// Portfolio Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImage = lightbox.querySelector('.lightbox-image');
const lightboxTitle = lightbox.querySelector('.lightbox-title');
const lightboxDescription = lightbox.querySelector('.lightbox-description');
const lightboxClose = lightbox.querySelector('.lightbox-close');
const viewProjectBtns = document.querySelectorAll('.view-project');

// Project data
const projectData = {
    'E-commerce Platform': {
        description: 'Kompletní e-commerce řešení s pokročilým systémem správy zásob, integrací platebních bran a responzivním designem optimalizovaným pro konverze.',
        image: 'https://via.placeholder.com/800x600/1a1a2e/eee?text=E-commerce+Platform+Detail'
    },
    'Brand Identity': {
        description: 'Vytvoření kompletní vizuální identity včetně loga, barevné palety, typografie a brandových guidelines pro technologický startup.',
        image: 'https://via.placeholder.com/800x600/16213e/eee?text=Brand+Identity+Detail'
    },
    'SaaS Dashboard': {
        description: 'Intuitivní analytický dashboard s real-time daty, pokročilými grafy a přizpůsobitelným rozhraním pro SaaS aplikaci.',
        image: 'https://via.placeholder.com/800x600/0f3460/eee?text=SaaS+Dashboard+Detail'
    },
    'Digital Campaign': {
        description: 'Kreativní digitální kampaň zahrnující sociální média, PPC reklamy a obsahový marketing s měřitelným ROI.',
        image: 'https://via.placeholder.com/800x600/533483/eee?text=Digital+Campaign+Detail'
    },
    'Logo Design': {
        description: 'Minimalistický a nadčasový design loga, které perfektně reprezentuje hodnoty a vizi technologické firmy.',
        image: 'https://via.placeholder.com/800x600/2d2d2d/eee?text=Logo+Design+Detail'
    },
    'Portfolio Website': {
        description: 'Moderní portfolio website s důrazem na prezentaci práce, rychlé načítání a výjimečnou uživatelskou zkušenost.',
        image: 'https://via.placeholder.com/800x600/3d3d3d/eee?text=Portfolio+Website+Detail'
    }
};

viewProjectBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const projectTitle = btn.parentElement.querySelector('h3').textContent;
        const project = projectData[projectTitle];
        
        if (project) {
            lightboxImage.src = project.image;
            lightboxImage.alt = projectTitle;
            lightboxTitle.textContent = projectTitle;
            lightboxDescription.textContent = project.description;
            lightbox.classList.add('active');
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    });
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});

function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

// Form Validation
const contactForm = document.getElementById('contactForm');
const formInputs = contactForm.querySelectorAll('input, textarea');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validation functions
const validators = {
    name: (value) => {
        if (value.trim().length < 2) {
            return 'Jméno musí obsahovat alespoň 2 znaky';
        }
        return '';
    },
    email: (value) => {
        if (!emailRegex.test(value)) {
            return 'Zadejte platnou emailovou adresu';
        }
        return '';
    },
    message: (value) => {
        if (value.trim().length < 10) {
            return 'Zpráva musí obsahovat alespoň 10 znaků';
        }
        return '';
    }
};

// Real-time validation
formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        validateField(input);
    });
    
    input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
            validateField(input);
        }
    });
});

function validateField(field) {
    const errorMessage = field.parentElement.querySelector('.error-message');
    const fieldName = field.getAttribute('name');
    const errorText = validators[fieldName](field.value);
    
    if (errorText) {
        field.classList.add('error');
        errorMessage.textContent = errorText;
        errorMessage.classList.add('show');
        return false;
    } else {
        field.classList.remove('error');
        errorMessage.textContent = '';
        errorMessage.classList.remove('show');
        return true;
    }
}

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate all fields
    let isValid = true;
    formInputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    if (isValid) {
        // Show success message
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Zpráva odeslána!';
        submitBtn.style.backgroundColor = 'var(--success-color)';
        
        // Reset form after delay
        setTimeout(() => {
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.style.backgroundColor = '';
        }, 3000);
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.stat-item, .portfolio-item, .team-member').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add animation class styles
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Performance optimization - lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}