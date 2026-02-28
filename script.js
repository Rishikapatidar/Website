// Carousel Auto-Rotate Variables
let currentSlideIndex = 0;
let autoRotateInterval;
const SLIDE_INTERVAL = 5000; // Change image every 5 seconds

// Start automatic carousel rotation
function startCarouselAutoRotate() {
    autoRotateInterval = setInterval(() => {
        currentSlideIndex++;
        showSlide(currentSlideIndex);
    }, SLIDE_INTERVAL);
}

// Change slide (next/prev buttons)
function changeSlide(n) {
    clearInterval(autoRotateInterval);
    currentSlideIndex += n;
    showSlide(currentSlideIndex);
    startCarouselAutoRotate();
}

// Jump to specific slide (dot buttons)
function currentSlide(n) {
    clearInterval(autoRotateInterval);
    currentSlideIndex = n;
    showSlide(currentSlideIndex);
    startCarouselAutoRotate();
}

// Show the slide at current index
function showSlide(n) {
    const slides = document.querySelectorAll('.carousel-image');
    const dots = document.querySelectorAll('.dot');

    if (slides.length === 0) return;

    // Wrap around
    if (n >= slides.length) {
        currentSlideIndex = 0;
    }
    if (n < 0) {
        currentSlideIndex = slides.length - 1;
    }

    // Hide all slides and deactivate dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Show current slide and activate dot
    if (slides[currentSlideIndex]) slides[currentSlideIndex].classList.add('active');
    if (dots[currentSlideIndex]) dots[currentSlideIndex].classList.add('active');
}

// Reels Carousel Functions
let currentReelIndex = 0;

function changeReel(n) {
    currentReelIndex += n;
    showReel(currentReelIndex);
}

function selectReel(n) {
    currentReelIndex = n;
    showReel(currentReelIndex);
}

function showReel(n) {
    const reels = document.querySelectorAll('.reel-item');
    const reelDots = document.querySelectorAll('.reel-dot');

    if (reels.length === 0) return;

    // Wrap around
    if (n >= reels.length) {
        currentReelIndex = 0;
    }
    if (n < 0) {
        currentReelIndex = reels.length - 1;
    }

    // Hide all reels and deactivate dots
    reels.forEach(reel => reel.classList.remove('active'));
    reelDots.forEach(dot => dot.classList.remove('active'));

    // Show current reel and activate dot
    if (reels[currentReelIndex]) {
        reels[currentReelIndex].classList.add('active');
    }
    if (reelDots[currentReelIndex]) {
        reelDots[currentReelIndex].classList.add('active');
    }

    // Update counter
    const currentReelSpan = document.querySelector('.current-reel');
    if (currentReelSpan) {
        currentReelSpan.textContent = currentReelIndex + 1;
    }
}

// Gallery Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Start carousel auto-rotation
    startCarouselAutoRotate();

    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Filter gallery items
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter gallery items
            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => item.style.opacity = '1', 10);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => item.style.display = 'none', 300);
                }
            });
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .gallery-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});
