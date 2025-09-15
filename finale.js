// Finale page JavaScript
let balloonsPopped = 0;
let totalBalloons = 6;
let confettiActive = false;

// Initialize finale page
document.addEventListener('DOMContentLoaded', function() {
    initializeFinale();
    startBackgroundAnimations();
    // Auto-start with some confetti
    setTimeout(() => {
        explodeConfetti();
    }, 1000);
});

function initializeFinale() {
    // Add click listeners to balloons
    const balloons = document.querySelectorAll('.balloon');
    balloons.forEach((balloon, index) => {
        balloon.addEventListener('click', () => popBalloon(balloon, index));
        balloon.addEventListener('touchstart', (e) => {
            e.preventDefault();
            popBalloon(balloon, index);
        });
    });
    
    // Add entrance animations
    animateEntrance();
}

function animateEntrance() {
    const celebrationMessage = document.querySelector('.celebration-message');
    const balloons = document.querySelectorAll('.balloon');
    const interactionHint = document.querySelector('.interaction-hint');
    const finaleControls = document.querySelector('.finale-controls');
    
    // Animate celebration message
    gsap.fromTo(celebrationMessage,
        {
            opacity: 0,
            y: 50,
            scale: 0.8
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "back.out(1.7)"
        }
    );
    
    // Animate balloons entering
    gsap.fromTo(balloons,
        {
            opacity: 0,
            y: 100,
            scale: 0
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            stagger: 0.1,
            delay: 0.5
        }
    );
    
    // Animate other elements
    gsap.fromTo([interactionHint, finaleControls],
        {
            opacity: 0,
            y: 30
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.2,
            delay: 1.2
        }
    );
}

function popBalloon(balloon, index) {
    if (balloon.classList.contains('popped')) return;
    
    balloon.classList.add('popped');
    balloonsPopped++;
    
    // Create pop effect
    createPopEffect(balloon);
    
    // Create balloon fragments
    createBalloonFragments(balloon);
    
    // Play pop sound effect (if implemented)
    // playPopSound();
    
    // Check if all balloons are popped
    if (balloonsPopped === totalBalloons) {
        setTimeout(() => {
            showAllBalloonsPopped();
        }, 1000);
    }
}

function createPopEffect(balloon) {
    const popEffectsContainer = document.getElementById('balloonPopEffects');
    const balloonRect = balloon.getBoundingClientRect();
    const containerRect = popEffectsContainer.getBoundingClientRect();
    
    const centerX = balloonRect.left - containerRect.left + balloonRect.width / 2;
    const centerY = balloonRect.top - containerRect.top + balloonRect.height / 2;
    
    // Create pop particles
    const colors = ['#ff6b6b', '#4ecdc4', '#ffeaa7', '#96ceb4', '#a29bfe', '#fd79a8'];
    const balloonColor = colors[parseInt(balloon.dataset.balloon)];
    
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'pop-particle';
        particle.style.background = balloonColor;
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        
        const angle = (i / 12) * Math.PI * 2;
        const distance = 50 + Math.random() * 30;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;
        
        particle.style.setProperty('--dx', dx + 'px');
        particle.style.setProperty('--dy', dy + 'px');
        
        popEffectsContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => particle.remove(), 800);
    }
    
    // Create a "POP!" text effect
    const popText = document.createElement('div');
    popText.innerHTML = 'POP!';
    popText.style.cssText = `
        position: absolute;
        left: ${centerX}px;
        top: ${centerY}px;
        font-size: 2rem;
        font-weight: bold;
        color: ${balloonColor};
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        pointer-events: none;
        z-index: 100;
        transform: translate(-50%, -50%);
    `;
    
    popEffectsContainer.appendChild(popText);
    
    // Animate pop text
    gsap.fromTo(popText,
        {
            scale: 0,
            rotation: 0
        },
        {
            scale: 1.5,
            rotation: 360,
            duration: 0.5,
            ease: "back.out(1.7)",
            onComplete: () => {
                gsap.to(popText, {
                    opacity: 0,
                    scale: 0,
                    duration: 0.3,
                    onComplete: () => popText.remove()
                });
            }
        }
    );
}

function createBalloonFragments(balloon) {
    const balloonRect = balloon.getBoundingClientRect();
    const colors = ['#ff6b6b', '#4ecdc4', '#ffeaa7', '#96ceb4', '#a29bfe', '#fd79a8'];
    const balloonColor = colors[parseInt(balloon.dataset.balloon)];
    
    // Create balloon fragments that fall down
    for (let i = 0; i < 6; i++) {
        const fragment = document.createElement('div');
        fragment.style.cssText = `
            position: fixed;
            width: ${Math.random() * 15 + 10}px;
            height: ${Math.random() * 20 + 15}px;
            background: ${balloonColor};
            left: ${balloonRect.left + Math.random() * balloonRect.width}px;
            top: ${balloonRect.top + balloonRect.height / 2}px;
            border-radius: 50% 20% 50% 20%;
            pointer-events: none;
            z-index: 50;
        `;
        
        document.body.appendChild(fragment);
        
        // Animate fragments falling
        gsap.to(fragment, {
            duration: Math.random() * 2 + 1,
            y: window.innerHeight + 100,
            x: `+=${Math.random() * 200 - 100}`,
            rotation: Math.random() * 720,
            opacity: 0,
            ease: "power2.in",
            onComplete: () => fragment.remove()
        });
    }
}

function showAllBalloonsPopped() {
    // Create special celebration effect
    const celebrationMessage = document.querySelector('.celebration-message');
    const newMessage = document.createElement('div');
    newMessage.innerHTML = `
        <h2 style="font-size: 2rem; color: #e74c3c; margin-bottom: 15px;">
            🎊 Amazing! You popped all the balloons! 🎊
        </h2>
        <p style="font-size: 1.2rem; color: #34495e;">
            You're the life of the party! 🎉
        </p>
    `;
    newMessage.style.cssText = `
        background: rgba(255, 255, 255, 0.95);
        padding: 30px;
        border-radius: 20px;
        margin-top: 20px;
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
        text-align: center;
    `;
    
    celebrationMessage.appendChild(newMessage);
    
    // Animate the new message
    gsap.fromTo(newMessage,
        {
            opacity: 0,
            scale: 0.5,
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
    
    // Trigger massive confetti explosion
    setTimeout(() => {
        explodeConfetti(true);
    }, 500);
}

function explodeConfetti(massive = false) {
    const confettiContainer = document.getElementById('confettiExplosion');
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd', '#98d8c8', '#f39c12', '#e74c3c', '#9b59b6'];
    const confettiCount = massive ? 100 : 60;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        
        // Random shape
        if (Math.random() > 0.5) {
            confetti.style.borderRadius = '50%';
        } else {
            confetti.style.borderRadius = '2px';
            confetti.style.width = Math.random() * 8 + 6 + 'px';
            confetti.style.height = Math.random() * 15 + 10 + 'px';
        }
        
        confettiContainer.appendChild(confetti);
        
        // Animate confetti falling
        gsap.to(confetti, {
            duration: Math.random() * 3 + 2,
            y: window.innerHeight + 100,
            x: `+=${Math.random() * 400 - 200}`,
            rotation: Math.random() * 720,
            ease: "power2.out",
            delay: Math.random() * (massive ? 2 : 1),
            onComplete: () => confetti.remove()
        });
    }
    
    // Add floating emojis
    createFloatingEmojis(massive);
}

function createFloatingEmojis(massive = false) {
    const emojisContainer = document.getElementById('floatingEmojis');
    const emojis = ['🎉', '🎊', '🥳', '🎈', '🎂', '🌟', '✨', '💖', '🎁', '🎵', '🎶', '🦄', '🌈'];
    const emojiCount = massive ? 25 : 15;
    
    for (let i = 0; i < emojiCount; i++) {
        const emoji = document.createElement('div');
        emoji.className = 'floating-emoji';
        emoji.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = Math.random() * 100 + '%';
        emoji.style.bottom = '-50px';
        emoji.style.fontSize = (Math.random() * 1.5 + 1.5) + 'rem';
        
        emojisContainer.appendChild(emoji);
        
        // Remove emoji after animation
        setTimeout(() => emoji.remove(), 4000);
    }
}

function startBackgroundAnimations() {
    // Animate floating stars
    const stars = document.querySelectorAll('.floating-star');
    stars.forEach((star, index) => {
        gsap.to(star, {
            duration: 6 + Math.random() * 4,
            y: Math.random() * 50 - 25,
            x: Math.random() * 30 - 15,
            rotation: 360,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
            delay: index * 0.5
        });
    });
    
    // Create periodic floating hearts
    setInterval(() => {
        createFloatingHeart();
    }, 3000);
}

function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.cssText = `
        position: fixed;
        font-size: 1.5rem;
        left: ${Math.random() * 100}%;
        bottom: -50px;
        pointer-events: none;
        z-index: 5;
        opacity: 0.8;
    `;
    
    document.body.appendChild(heart);
    
    gsap.to(heart, {
        duration: 4,
        y: -window.innerHeight - 100,
        x: `+=${Math.random() * 100 - 50}`,
        rotation: 360,
        opacity: 0,
        ease: "power1.out",
        onComplete: () => heart.remove()
    });
}

function restartCelebration() {
    // Add exit animation
    gsap.to('.finale-container', {
        duration: 0.5,
        opacity: 0,
        scale: 0.9,
        onComplete: () => {
            window.location.href = 'index.html';
        }
    });
}

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.confetti-btn, .restart-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1.05,
                ease: "power2.out"
            });
        });
        
        button.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1,
                ease: "power2.out"
            });
        });
    });
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    switch(e.key) {
        case ' ': // Spacebar for confetti
            e.preventDefault();
            explodeConfetti();
            break;
        case 'r': // R for restart
        case 'R':
            restartCelebration();
            break;
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
            // Pop balloon by number key
            const balloonIndex = parseInt(e.key) - 1;
            const balloon = document.querySelector(`[data-balloon="${balloonIndex}"]`);
            if (balloon && !balloon.classList.contains('popped')) {
                popBalloon(balloon, balloonIndex);
            }
            break;
    }
});
