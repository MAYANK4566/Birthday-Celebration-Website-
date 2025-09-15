// Cake page JavaScript
let candlesBlown = 0;
let totalCandles = 5;
let isBlowing = false;

// Initialize cake page
document.addEventListener('DOMContentLoaded', function() {
    initializeCake();
    startSparkles();
});

function initializeCake() {
    // Add click listeners to individual candles for mobile
    const candles = document.querySelectorAll('.candle');
    candles.forEach((candle, index) => {
        candle.addEventListener('click', () => blowSingleCandle(index));
    });
    
    // Add some ambient animations
    animateCake();
}

function blowCandles() {
    if (isBlowing) return;
    
    isBlowing = true;
    const blowBtn = document.getElementById('blowBtn');
    const instructionText = document.getElementById('instructionText');
    
    // Disable button and change text
    blowBtn.disabled = true;
    blowBtn.style.opacity = '0.7';
    
    // Update instruction text
    instructionText.textContent = 'Making your wish come true...';
    
    // Create wind effect
    createWindEffect();
    
    // Blow out candles one by one with delay
    for (let i = 0; i < totalCandles; i++) {
        setTimeout(() => {
            blowSingleCandle(i);
        }, i * 300);
    }
    
    // Show wish message after all candles are blown
    setTimeout(() => {
        showWishMessage();
    }, totalCandles * 300 + 1000);
}

function blowSingleCandle(candleIndex) {
    const candle = document.querySelector(`[data-candle="${candleIndex}"]`);
    const flame = document.getElementById(`flame${candleIndex}`);
    
    if (candle.classList.contains('blown-out')) return;
    
    // Add blown out class
    candle.classList.add('blown-out');
    candlesBlown++;
    
    // Create smoke effect
    createSmoke(candle);
    
    // Create sparkle effect
    createCandleSparkles(candle);
    
    // Play blow sound effect (if audio is implemented)
    // playBlowSound();
}

function createWindEffect() {
    const blowBtn = document.getElementById('blowBtn');
    const btnParticles = blowBtn.querySelector('.btn-particles');
    
    // Create wind particles from button
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            pointer-events: none;
        `;
        
        btnParticles.appendChild(particle);
        
        // Animate particles moving towards cake
        gsap.to(particle, {
            duration: 1,
            x: Math.random() * 200 - 100,
            y: -150 + Math.random() * 50,
            opacity: 0,
            scale: 0,
            ease: "power2.out",
            onComplete: () => particle.remove()
        });
    }
}

function createSmoke(candle) {
    const smokeContainer = document.getElementById('smokeContainer');
    const candleRect = candle.getBoundingClientRect();
    const containerRect = smokeContainer.getBoundingClientRect();
    
    // Calculate relative position
    const relativeX = candleRect.left - containerRect.left + candleRect.width / 2;
    const relativeY = candleRect.top - containerRect.top;
    
    // Create multiple smoke particles
    for (let i = 0; i < 8; i++) {
        const smoke = document.createElement('div');
        smoke.className = 'smoke-particle';
        smoke.style.left = relativeX + Math.random() * 20 - 10 + 'px';
        smoke.style.top = relativeY + 'px';
        
        smokeContainer.appendChild(smoke);
        
        // Animate smoke rising
        gsap.fromTo(smoke, 
            {
                scale: 0.3,
                opacity: 0.8,
                y: 0
            },
            {
                scale: 1.5,
                opacity: 0,
                y: -100 - Math.random() * 50,
                x: Math.random() * 40 - 20,
                duration: 2 + Math.random(),
                ease: "power1.out",
                delay: i * 0.1,
                onComplete: () => smoke.remove()
            }
        );
    }
}

function createCandleSparkles(candle) {
    const sparklesContainer = document.getElementById('sparklesContainer');
    const candleRect = candle.getBoundingClientRect();
    const containerRect = sparklesContainer.getBoundingClientRect();
    
    const relativeX = candleRect.left - containerRect.left + candleRect.width / 2;
    const relativeY = candleRect.top - containerRect.top;
    
    // Create sparkles around the blown candle
    for (let i = 0; i < 12; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = relativeX + Math.random() * 40 - 20 + 'px';
        sparkle.style.top = relativeY + Math.random() * 40 - 20 + 'px';
        
        sparklesContainer.appendChild(sparkle);
        
        // Animate sparkle
        gsap.fromTo(sparkle,
            {
                scale: 0,
                rotation: 0,
                opacity: 1
            },
            {
                scale: 1,
                rotation: 360,
                opacity: 0,
                duration: 1,
                ease: "power2.out",
                delay: i * 0.05,
                onComplete: () => sparkle.remove()
            }
        );
    }
}

function showWishMessage() {
    const instructionText = document.getElementById('instructionText');
    const blowBtn = document.getElementById('blowBtn');
    const wishMessage = document.getElementById('wishMessage');
    const cakeHeader = document.querySelector('.cake-header');
    const cakeScene = document.querySelector('.cake-scene');
    const cakeControls = document.querySelector('.cake-controls');
    
    // Hide current elements
    gsap.to([cakeHeader, cakeScene, cakeControls], {
        duration: 0.5,
        opacity: 0,
        y: -30,
        stagger: 0.1,
        onComplete: () => {
            cakeHeader.style.display = 'none';
            cakeScene.style.display = 'none';
            cakeControls.style.display = 'none';
        }
    });
    
    // Show wish message
    setTimeout(() => {
        wishMessage.style.display = 'block';
        gsap.fromTo(wishMessage,
            {
                opacity: 0,
                scale: 0.8,
                y: 50
            },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.8,
                ease: "back.out(1.7)"
            }
        );
        
        // Create celebration confetti
        createWishConfetti();
    }, 500);
}

function createWishConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd', '#98d8c8', '#f39c12'];
    
    for (let i = 0; i < 60; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: ${Math.random() * 8 + 4}px;
            height: ${Math.random() * 8 + 4}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}%;
            top: -10px;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            pointer-events: none;
            z-index: 1000;
        `;
        
        document.body.appendChild(confetti);
        
        // Animate confetti falling
        gsap.to(confetti, {
            duration: Math.random() * 3 + 2,
            y: window.innerHeight + 100,
            x: `+=${Math.random() * 200 - 100}`,
            rotation: Math.random() * 360,
            ease: "power2.out",
            delay: Math.random() * 2,
            onComplete: () => confetti.remove()
        });
    }
}

function startSparkles() {
    const sparklesContainer = document.getElementById('sparklesContainer');
    
    function createAmbientSparkle() {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.background = '#ffeb3b';
        
        sparklesContainer.appendChild(sparkle);
        
        gsap.fromTo(sparkle,
            {
                scale: 0,
                opacity: 1
            },
            {
                scale: 1,
                opacity: 0,
                duration: 2,
                ease: "power2.out",
                onComplete: () => sparkle.remove()
            }
        );
    }
    
    // Create ambient sparkles periodically
    setInterval(createAmbientSparkle, 3000);
}

function animateCake() {
    const cake = document.querySelector('.birthday-cake');
    
    // Subtle breathing animation for the cake
    gsap.to(cake, {
        duration: 4,
        scale: 1.02,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
    });
    
    // Animate candle flames more dynamically
    const flames = document.querySelectorAll('.flame');
    flames.forEach((flame, index) => {
        gsap.to(flame, {
            duration: 0.5 + Math.random() * 0.3,
            scaleY: 0.9 + Math.random() * 0.2,
            scaleX: 0.95 + Math.random() * 0.1,
            rotation: Math.random() * 4 - 2,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1,
            delay: index * 0.1
        });
    });
}

// Navigate to finale page
function goToFinale() {
    // Add exit animation
    gsap.to('.cake-container', {
        duration: 0.5,
        opacity: 0,
        scale: 0.9,
        onComplete: () => {
            window.location.href = 'finale.html';
        }
    });
}

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', function() {
    const candles = document.querySelectorAll('.candle');
    
    candles.forEach(candle => {
        candle.addEventListener('mouseenter', function() {
            if (!this.classList.contains('blown-out')) {
                const flame = this.querySelector('.flame');
                gsap.to(flame, {
                    duration: 0.2,
                    scale: 1.2,
                    ease: "power2.out"
                });
            }
        });
        
        candle.addEventListener('mouseleave', function() {
            if (!this.classList.contains('blown-out')) {
                const flame = this.querySelector('.flame');
                gsap.to(flame, {
                    duration: 0.2,
                    scale: 1,
                    ease: "power2.out"
                });
            }
        });
    });
});
