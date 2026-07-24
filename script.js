document.addEventListener('DOMContentLoaded', () => {
    
    // ===== Typing Animation =====
    const subtitles = [
        'Automation Engineer',
        'Automation Project Engineer',
        'Control Systems Specialist'
    ];
    let subtitleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typedElement = document.getElementById('typed-subtitle');
    
    function typeEffect() {
        const current = subtitles[subtitleIndex];
        
        if (isDeleting) {
            typedElement.textContent = current.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedElement.textContent = current.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 30 : 60;
        
        if (!isDeleting && charIndex === current.length) {
            typeSpeed = 2500; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            subtitleIndex = (subtitleIndex + 1) % subtitles.length;
            typeSpeed = 500; // Pause before next word
        }
        
        setTimeout(typeEffect, typeSpeed);
    }
    
    if (typedElement) {
        typeEffect();
    }
    
    // ===== Mobile Menu Toggle =====
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('show')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when a link is clicked
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // ===== Smooth Scrolling =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // ===== Scroll Reveal Animation =====
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // ===== Active Navigation Link Update =====
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // ===== Navbar background on scroll =====
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 14, 26, 0.95)';
        } else {
            navbar.style.background = 'rgba(10, 14, 26, 0.85)';
        }
    });

    // ===== Initialize Radar Chart =====
    const ctx = document.getElementById('skillsChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: [
                    'PLC & Automation',
                    'Software Tools',
                    'Project Mgmt',
                    'Reliability Eng.',
                    'Networks & IT',
                    'Diagnostics',
                    'Vision Systems'
                ],
                datasets: [{
                    label: 'Skill Proficiency',
                    data: [95, 90, 85, 82, 75, 92, 80],
                    backgroundColor: 'rgba(56, 189, 248, 0.15)',
                    borderColor: 'rgba(56, 189, 248, 0.8)',
                    pointBackgroundColor: 'rgba(129, 140, 248, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(129, 140, 248, 1)',
                    borderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    r: {
                        angleLines: {
                            color: 'rgba(255, 255, 255, 0.08)'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.06)'
                        },
                        pointLabels: {
                            color: '#94a3b8',
                            font: {
                                family: "'Inter', 'Outfit', sans-serif",
                                size: 12,
                                weight: 500
                            }
                        },
                        ticks: {
                            display: false,
                            min: 0,
                            max: 100
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(30, 41, 59, 0.95)',
                        titleFont: {
                            family: "'Inter', 'Outfit', sans-serif",
                            weight: 600
                        },
                        bodyFont: {
                            family: "'Inter', 'Outfit', sans-serif"
                        },
                        padding: 14,
                        cornerRadius: 10,
                        displayColors: false,
                        callbacks: {
                            label: function(context) {
                                return `Proficiency: ${context.raw}%`;
                            }
                        }
                    }
                }
            }
        });
    }

    // ===== Language bars animation =====
    const langBars = document.querySelectorAll('.lang-bar .fill');
    const langObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 200);
                langObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    langBars.forEach(bar => langObserver.observe(bar));
});

// ===== Gallery & Lightbox System =====
const galleryData = {};

function initGalleries() {
    document.querySelectorAll('.project-gallery').forEach(gallery => {
        const galleryId = gallery.dataset.gallery;
        const items = gallery.querySelectorAll('.gallery-item');
        galleryData[galleryId] = [];
        
        items.forEach(item => {
            const img = item.querySelector('img');
            const caption = item.querySelector('.gallery-caption');
            galleryData[galleryId].push({
                src: img.src,
                alt: img.alt,
                caption: caption ? caption.textContent : img.alt
            });
        });
    });
}

let currentGallery = null;
let currentIndex = 0;

function openLightbox(galleryId, index) {
    currentGallery = galleryId;
    currentIndex = index;
    
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    const item = galleryData[galleryId][index];
    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt;
    lightboxCaption.textContent = item.caption;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox(event) {
    if (event) {
        event.stopPropagation();
        // Only close if clicking background, close button, or lightbox itself
        if (event.target.id !== 'lightbox' && 
            !event.target.classList.contains('lightbox-close') &&
            event.target.tagName !== 'BUTTON') {
            return;
        }
    }
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function navigateLightbox(direction, event) {
    if (event) event.stopPropagation();
    if (!currentGallery || !galleryData[currentGallery]) return;
    
    const total = galleryData[currentGallery].length;
    currentIndex = (currentIndex + direction + total) % total;
    
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    const item = galleryData[currentGallery][currentIndex];
    
    // Fade transition
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
        lightboxImg.src = item.src;
        lightboxImg.alt = item.alt;
        lightboxCaption.textContent = item.caption;
        lightboxImg.style.opacity = '1';
    }, 200);
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
});

// Initialize galleries after DOM loads
document.addEventListener('DOMContentLoaded', initGalleries);
