// Global variables
let isGiftBoxOpened = false;
let currentPage = 'landing';

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeLanding();
});

// Landing page initialization
function initializeLanding() {
    const giftBox = document.getElementById('giftBox');
    
    giftBox.addEventListener('click', openGiftBox);
    
    // Add touch event for mobile
    giftBox.addEventListener('touchstart', function(e) {
        e.preventDefault();
        openGiftBox();
    });
}

// Gift box opening animation
function openGiftBox() {
    if (isGiftBoxOpened) return;
    
    isGiftBoxOpened = true;
    const giftBox = document.getElementById('giftBox');
    const boxLid = giftBox.querySelector('.box-lid');
    const surpriseText = document.querySelector('.surprise-text');
    
    // Animate lid opening
    gsap.to(boxLid, {
        duration: 0.8,
        rotationX: -120,
        transformOrigin: "bottom center",
        ease: "back.out(1.7)"
    });
    
    // Hide surprise text
    gsap.to(surpriseText, {
        duration: 0.5,
        opacity: 0,
        y: 20
    });
    
    // Create confetti explosion
    setTimeout(() => {
        createConfetti();
        createBalloons();
    }, 500);
    
    // Transition to greeting card after animation
    setTimeout(() => {
        showGreetingCard();
    }, 2000);
}

// Create confetti animation
function createConfetti() {
    const confettiContainer = document.getElementById('confettiContainer');
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd', '#98d8c8'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: absolute;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}%;
            top: -10px;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            pointer-events: none;
        `;
        
        confettiContainer.appendChild(confetti);
        
        // Animate confetti falling
        gsap.to(confetti, {
            duration: Math.random() * 3 + 2,
            y: window.innerHeight + 100,
            x: `+=${Math.random() * 200 - 100}`,
            rotation: Math.random() * 360,
            ease: "power2.out",
            onComplete: () => confetti.remove()
        });
    }
}

// Create floating balloons
function createBalloons() {
    const balloonsContainer = document.getElementById('balloonsContainer');
    const balloonColors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'];
    
    for (let i = 0; i < 4; i++) {
        const balloon = document.createElement('div');
        const color = balloonColors[Math.floor(Math.random() * balloonColors.length)];
        
        balloon.innerHTML = `
            <div style="
                width: 40px;
                height: 50px;
                background: ${color};
                border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
                position: relative;
                margin-bottom: 10px;
                
            "></div>
            <div style="
                width: 2px;
                height: 60px;
                background: #333;
                margin: 0 auto;
            "></div>
        `;
        
        balloon.style.cssText = `
            position: absolute;
            left: ${Math.random() * 90}%;
            bottom: -100px;
            pointer-events: none;
        `;
        
        balloonsContainer.appendChild(balloon);
        
        // Animate balloons floating up
        gsap.to(balloon, {
            duration: Math.random() * 2 + 3,
            y: -window.innerHeight - 200,
            x: `+=${Math.random() * 100 - 50}`,
            ease: "power1.out",
            delay: Math.random() * 1,
            onComplete: () => balloon.remove()
        });
    }
}

// Create party balloons for greeting card flip
function createPartyBalloons() {
    const greetingCardPage = document.getElementById('greetingCardPage');
    const balloonColors = [
        { primary: '#ff6b6b', secondary: '#ff5252', accent: '#ffcdd2' },
        { primary: '#4ecdc4', secondary: '#26a69a', accent: '#b2dfdb' },
        { primary: '#45b7d1', secondary: '#1976d2', accent: '#bbdefb' },
        { primary: '#96ceb4', secondary: '#66bb6a', accent: '#c8e6c9' },
        { primary: '#ffeaa7', secondary: '#ffeb3b', accent: '#fff9c4' },
        { primary: '#dda0dd', secondary: '#ba68c8', accent: '#e1bee7' },
        { primary: '#ff9f43', secondary: '#ff7043', accent: '#ffccbc' }
    ];
    
    // Create balloon container for greeting card page
    let partyBalloonsContainer = greetingCardPage.querySelector('.party-balloons-container');
    if (!partyBalloonsContainer) {
        partyBalloonsContainer = document.createElement('div');
        partyBalloonsContainer.className = 'party-balloons-container';
        partyBalloonsContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 10;
        `;
        greetingCardPage.appendChild(partyBalloonsContainer);
    }
    
    // Create multiple waves of balloons
    for (let wave = 0; wave < 3; wave++) {
        setTimeout(() => {
            for (let i = 0; i < 3; i++) {
                const balloon = document.createElement('div');
                const colorSet = balloonColors[Math.floor(Math.random() * balloonColors.length)];
                const size = Math.random() * 20 + 30; // 30-50px
                const startSide = Math.random() > 0.5 ? 'left' : 'right';
                const startX = startSide === 'left' ? -60 : window.innerWidth + 60;
                
                balloon.innerHTML = `
                    <div class="balloon-body" style="
                        width: ${size}px;
                        height: ${size * 1.2}px;
                        background: linear-gradient(135deg, ${colorSet.primary} 0%, ${colorSet.secondary} 70%, ${colorSet.primary} 100%);
                        border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
                        position: relative;
                        box-shadow: 
                            inset -10px -10px 0 rgba(0,0,0,0.1),
                            inset 5px 5px 0 ${colorSet.accent},
                            0 5px 15px rgba(0,0,0,0.2);
                        border: 2px solid rgba(255,255,255,0.3);
                    ">
                        <div style="
                            position: absolute;
                            top: 10%;
                            left: 20%;
                            width: 30%;
                            height: 40%;
                            background: linear-gradient(135deg, rgba(255,255,255,0.6), transparent);
                            border-radius: 50%;
                            filter: blur(2px);
                        "></div>
                    </div>
                    <div class="balloon-string" style="
                        width: 2px;
                        height: ${Math.random() * 40 + 40}px;
                        background: linear-gradient(to bottom, #8d6e63, #5d4037);
                        margin: 0 auto;
                        border-radius: 1px;
                        box-shadow: 1px 0 2px rgba(0,0,0,0.3);
                    "></div>
                `;
                
                balloon.style.cssText = `
                    position: absolute;
                    left: ${startX}px;
                    top: ${Math.random() * 60 + 20}%;
                    pointer-events: none;
                    transform-origin: center bottom;
                `;
                
                partyBalloonsContainer.appendChild(balloon);
                
                // Animate balloon floating across and up
                const timeline = gsap.timeline();
                
                timeline.to(balloon, {
                    duration: Math.random() * 3 + 4,
                    x: startSide === 'left' ? window.innerWidth + 100 : -window.innerWidth - 100,
                    y: `-=${Math.random() * 200 + 100}`,
                    rotation: startSide === 'left' ? Math.random() * 20 - 10 : Math.random() * 20 - 10,
                    ease: "power1.inOut"
                });
                
                // Add floating motion
                gsap.to(balloon, {
                    duration: Math.random() * 2 + 1.5,
                    y: `+=${Math.random() * 30 + 10}`,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: Math.random() * 0.5
                });
                
                // Add gentle swaying
                gsap.to(balloon, {
                    duration: Math.random() * 1.5 + 1,
                    rotation: `+=${Math.random() * 10 - 5}`,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: Math.random() * 0.3
                });
                
                // Remove balloon after animation
                setTimeout(() => {
                    if (balloon.parentNode) {
                        balloon.remove();
                    }
                }, 8000);
            }
        }, wave * 1000);
    }
    
    // Add some confetti bursts with the balloons
    setTimeout(() => {
        createCardConfetti();
    }, 800);
}

// Create confetti for greeting card
function createCardConfetti() {
    const greetingCardPage = document.getElementById('greetingCardPage');
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd', '#ff9f43'];
    
    let confettiContainer = greetingCardPage.querySelector('.card-confetti-container');
    if (!confettiContainer) {
        confettiContainer = document.createElement('div');
        confettiContainer.className = 'card-confetti-container';
        confettiContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 5;
        `;
        greetingCardPage.appendChild(confettiContainer);
    }
    
    for (let burst = 0; burst < 3; burst++) {
        setTimeout(() => {
            for (let i = 0; i < 25; i++) {
                const confetti = document.createElement('div');
                const size = Math.random() * 8 + 4;
                const color = colors[Math.floor(Math.random() * colors.length)];
                
                confetti.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    background: ${color};
                    left: ${Math.random() * 100}%;
                    top: -20px;
                    border-radius: ${Math.random() > 0.6 ? '50%' : '0'};
                    pointer-events: none;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                `;
                
                confettiContainer.appendChild(confetti);
                
                // Animate confetti falling
                gsap.to(confetti, {
                    duration: Math.random() * 2 + 2,
                    y: window.innerHeight + 50,
                    x: `+=${Math.random() * 200 - 100}`,
                    rotation: Math.random() * 720,
                    ease: "power2.out",
                    onComplete: () => {
                        if (confetti.parentNode) {
                            confetti.remove();
                        }
                    }
                });
            }
        }, burst * 400);
    }
}

// Show greeting card page
function showGreetingCard() {
    const landingContainer = document.querySelector('.landing-container');
    const greetingCardPage = document.getElementById('greetingCardPage');
    const birthdayCard = document.getElementById('birthdayCard');
    
    // Hide landing page
    gsap.to(landingContainer, {
        duration: 0.5,
        opacity: 0,
        onComplete: () => {
            landingContainer.style.display = 'none';
        }
    });
    
    // Show greeting card page
    greetingCardPage.style.display = 'flex';
    gsap.fromTo(greetingCardPage, 
        { opacity: 0 },
        { duration: 0.5, opacity: 1 }
    );
    
    // Auto-flip the card after a short delay
    setTimeout(() => {
        birthdayCard.classList.add('flipped');
        // Add party balloons when card flips
        setTimeout(() => {
            createPartyBalloons();
        }, 500);
    }, 1000);
    
    currentPage = 'greeting';
    
    // Add click handler for manual card flip
    birthdayCard.addEventListener('click', function() {
        if (!this.classList.contains('flipped')) {
            this.classList.add('flipped');
            setTimeout(() => {
                createPartyBalloons();
            }, 500);
        }
    });
}

// Navigate to gallery page
function goToGallery() {
    // Add exit animation
    gsap.to('.greeting-card-page', {
        duration: 0.5,
        opacity: 0,
        scale: 0.9,
        onComplete: () => {
            window.location.href = 'gallery.html';
        }
    });
}

// Add some interactive effects
document.addEventListener('mousemove', function(e) {
    if (currentPage === 'landing' && !isGiftBoxOpened) {
        const giftBox = document.getElementById('giftBox');
        const rect = giftBox.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) * 0.02;
        const deltaY = (e.clientY - centerY) * 0.02;
        
        gsap.to(giftBox, {
            duration: 0.3,
            x: deltaX,
            y: deltaY,
            ease: "power2.out"
        });
    }
});

// Reset gift box position when mouse leaves
document.addEventListener('mouseleave', function() {
    if (currentPage === 'landing' && !isGiftBoxOpened) {
        const giftBox = document.getElementById('giftBox');
        gsap.to(giftBox, {
            duration: 0.5,
            x: 0,
            y: 0,
            ease: "elastic.out(1, 0.3)"
        });
    }
});
