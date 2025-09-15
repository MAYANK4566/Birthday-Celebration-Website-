// Gallery page JavaScript
let currentSlide = 0;
let totalSlides = 15;
let isAnimating = false;
let touchStartX = 0;
let touchEndX = 0;

// Initialize gallery
document.addEventListener('DOMContentLoaded', function() {
    initializeGallery();
    startFloatingHearts();
});

function initializeGallery() {
    // Add event listeners for navigation
    document.getElementById('prevBtn').addEventListener('click', () => changeSlide(-1));
    document.getElementById('nextBtn').addEventListener('click', () => changeSlide(1));
    
    // Add event listeners for dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
    
    // Add touch/swipe support
    const slideshowContainer = document.getElementById('slideshowContainer');
    slideshowContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
    slideshowContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    // Add keyboard navigation
    document.addEventListener('keydown', handleKeyDown);
    
    // Auto-advance slides every 8 seconds (optional)
    // setInterval(() => changeSlide(1), 8000);
}

function changeSlide(direction) {
    if (isAnimating) return;
    
    isAnimating = true;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    // Remove active class from current slide and dot
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    // Calculate new slide index
    currentSlide += direction;
    
    // Handle wrapping
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }
    
    // Add active class to new slide and dot
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    
    // Add animation effect
    gsap.fromTo(slides[currentSlide], 
        { 
            opacity: 0, 
            x: direction > 0 ? 100 : -100,
            scale: 0.8
        },
        { 
            opacity: 1, 
            x: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
            onComplete: () => {
                isAnimating = false;
            }
        }
    );
}

function goToSlide(slideIndex) {
    if (isAnimating || slideIndex === currentSlide) return;
    
    const direction = slideIndex > currentSlide ? 1 : -1;
    const steps = Math.abs(slideIndex - currentSlide);
    
    // For direct navigation, just jump to the slide
    isAnimating = true;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    // Remove active class from current slide and dot
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    // Set new slide index
    currentSlide = slideIndex;
    
    // Add active class to new slide and dot
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    
    // Add animation effect
    gsap.fromTo(slides[currentSlide], 
        { 
            opacity: 0, 
            scale: 0.8,
            rotationY: direction > 0 ? 20 : -20
        },
        { 
            opacity: 1, 
            scale: 1,
            rotationY: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            onComplete: () => {
                isAnimating = false;
            }
        }
    );
}

// Touch/Swipe handling
function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
}

function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
}

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            // Swipe right - go to previous slide
            changeSlide(-1);
        } else {
            // Swipe left - go to next slide
            changeSlide(1);
        }
    }
}

// Keyboard navigation
function handleKeyDown(e) {
    switch(e.key) {
        case 'ArrowLeft':
            changeSlide(-1);
            break;
        case 'ArrowRight':
            changeSlide(1);
            break;
        case ' ': // Spacebar
            e.preventDefault();
            changeSlide(1);
            break;
    }
}

// Floating hearts animation
function startFloatingHearts() {
    const heartsContainer = document.getElementById('heartsContainer');
    const heartSymbols = ['💖', '💕', '💗', '💝', '💘', '❤️', '🧡', '💛', '💚', '💙', '💜'];
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 1 + 1) + 'rem';
        
        heartsContainer.appendChild(heart);
        
        // Animate heart floating up
        gsap.fromTo(heart, 
            {
                y: window.innerHeight + 50,
                opacity: 0,
                scale: 0
            },
            {
                y: -100,
                opacity: 0.7,
                scale: 1,
                duration: Math.random() * 3 + 4,
                ease: "power1.out",
                onComplete: () => heart.remove()
            }
        );
        
        // Add some horizontal drift
        gsap.to(heart, {
            x: (Math.random() - 0.5) * 200,
            duration: Math.random() * 2 + 3,
            ease: "power1.inOut"
        });
    }
    
    // Create hearts periodically
    setInterval(createHeart, 2000);
}

// Navigate to cake page
function goToCake() {
    // Add exit animation
    gsap.to('.gallery-container', {
        duration: 0.5,
        opacity: 0,
        scale: 0.9,
        onComplete: () => {
            window.location.href = 'cake.html';
        }
    });
}

// Add some interactive effects for slide content
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide-content');
    
    slides.forEach(slide => {
        slide.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1.02,
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)",
                ease: "power2.out"
            });
        });
        
        slide.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
                ease: "power2.out"
            });
        });
    });
});

// Add parallax effect to placeholder images
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.placeholder-image');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        gsap.to(element, {
            duration: 0.1,
            y: scrolled * speed,
            ease: "none"
        });
    });
});
