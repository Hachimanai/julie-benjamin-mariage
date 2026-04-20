// Envelope Animation Logic
const envelopeWrapper = document.getElementById('envelope-wrapper');
const envelopeContainer = document.getElementById('envelope-container');
const envelopeHint = document.getElementById('envelope-hint');

if (envelopeWrapper && envelopeContainer) {
    // Show hint immediately
    if (!envelopeContainer.classList.contains('open')) {
        envelopeHint.classList.add('visible');
    }

    envelopeContainer.addEventListener('click', () => {
        if (envelopeContainer.classList.contains('open')) return;
        
        envelopeContainer.classList.add('open');
        envelopeHint.classList.remove('visible');
        
        const whiteFlash = document.getElementById('white-flash');
        
        // 1. Wait for flap to open (slower now: 1.5s)
        setTimeout(() => {
            // 2. Trigger White Flash
            if (whiteFlash) whiteFlash.style.opacity = '1';
            
            // 3. While screen is white, swap envelope for content
            setTimeout(() => {
                envelopeWrapper.style.display = 'none';
                document.body.classList.remove('locked');
                
                // Re-trigger scroll animations
                document.querySelectorAll('section').forEach(section => {
                    const rect = section.getBoundingClientRect();
                    if (rect.top < window.innerHeight) {
                        section.classList.add('is-visible');
                    }
                    observer.observe(section);
                });

                // 4. Fade out White Flash
                setTimeout(() => {
                    if (whiteFlash) {
                        whiteFlash.style.opacity = '0';
                        setTimeout(() => {
                            whiteFlash.style.display = 'none';
                        }, 1000);
                    }
                }, 500);

            }, 1000); // Wait for flash to cover screen

        }, 1200); // Trigger flash before flap is fully finished for better flow
    });
}

// Countdown Logic
const targetDate = new Date('July 24, 2027 15:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        document.getElementById('countdown').innerHTML = "C'est le grand jour !";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = days;
    document.getElementById('hours').innerText = hours;
    document.getElementById('minutes').innerText = minutes;
    document.getElementById('seconds').innerText = seconds;
}

// Update every second
setInterval(updateCountdown, 1000);
updateCountdown();

// Scroll Animation Logic
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Presence Buttons Logic
const presenceBtns = document.querySelectorAll('.presence-btn');
const presenceInput = document.getElementById('presence-input');
const additionalFields = document.getElementById('additional-fields');

presenceBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        presenceBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        presenceInput.value = this.dataset.value;
        
        // Hide additional fields if not coming
        if (this.dataset.value === 'no') {
            additionalFields.style.display = 'none';
            additionalFields.classList.remove('visible');
        } else {
            additionalFields.style.display = 'block';
            setTimeout(() => additionalFields.classList.add('visible'), 10);
        }
    });
});

// Conditional Fields Toggles
function setupToggle(toggleId, fieldId) {
    const toggle = document.getElementById(toggleId);
    const field = document.getElementById(fieldId);
    
    if (toggle && field) {
        toggle.addEventListener('change', function() {
            if (this.checked) {
                field.style.display = 'block';
                setTimeout(() => field.classList.add('visible'), 10);
            } else {
                field.classList.remove('visible');
                setTimeout(() => field.style.display = 'none', 300);
            }
        });
    }
}

setupToggle('toggle-accompanied', 'field-accompanied');
setupToggle('toggle-children', 'field-children');
setupToggle('toggle-veggie', 'field-veggie');
setupToggle('toggle-brunch', 'field-brunch');

// Carousel Logic
const carousel = document.getElementById('venue-carousel');
const dotsContainer = document.getElementById('carousel-dots');

if (carousel) {
    const images = Array.from(carousel.querySelectorAll('img'));
    let autoPlayInterval;
    let currentIndex = 0;

    const getVisibleImages = () => images.filter(img => img.style.display !== 'none');

    const updateCarouselUI = () => {
        const visibleImages = getVisibleImages();
        const count = visibleImages.length;
        
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            if (count > 1) {
                dotsContainer.style.display = 'flex';
                visibleImages.forEach((_, i) => {
                    const dot = document.createElement('span');
                    dot.className = i === 0 ? 'dot active' : 'dot';
                    dot.addEventListener('click', () => {
                        scrollToIndex(i);
                        resetAutoPlay();
                    });
                    dotsContainer.appendChild(dot);
                });
            } else {
                dotsContainer.style.display = 'none';
            }
        }
    };

    const scrollToIndex = (index) => {
        const visibleImages = getVisibleImages();
        if (visibleImages.length === 0) return;
        
        currentIndex = (index + visibleImages.length) % visibleImages.length;
        carousel.scrollTo({
            left: currentIndex * carousel.offsetWidth,
            behavior: 'smooth'
        });
        
        // Update dots
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    };

    const startAutoPlay = () => {
        stopAutoPlay();
        const visibleImages = getVisibleImages();
        if (visibleImages.length > 1) {
            autoPlayInterval = setInterval(() => {
                scrollToIndex(currentIndex + 1);
            }, 5000);
        }
    };

    const stopAutoPlay = () => {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
    };

    const resetAutoPlay = () => {
        stopAutoPlay();
        startAutoPlay();
    };

    // Listen for image load errors to refresh UI
    images.forEach(img => {
        img.addEventListener('error', updateCarouselUI);
        img.addEventListener('load', updateCarouselUI);
    });

    // Manual scroll sync
    carousel.addEventListener('scroll', () => {
        const visibleImages = getVisibleImages();
        if (visibleImages.length > 1) {
            const index = Math.round(carousel.scrollLeft / carousel.offsetWidth);
            if (index !== currentIndex) {
                currentIndex = index;
                const dots = dotsContainer.querySelectorAll('.dot');
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === currentIndex);
                });
            }
        }
    });

    // Drag behavior
    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
        if (getVisibleImages().length <= 1) return;
        isDown = true;
        carousel.classList.add('active-drag');
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
        stopAutoPlay();
    });

    carousel.addEventListener('mouseleave', () => {
        isDown = false;
        carousel.classList.remove('active-drag');
        startAutoPlay();
    });

    carousel.addEventListener('mouseup', () => {
        isDown = false;
        carousel.classList.remove('active-drag');
        startAutoPlay();
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });

    // Initial setup
    updateCarouselUI();
    startAutoPlay();
}

// RSVP Form Handling
const rsvpForm = document.getElementById('rsvp-form');

if (rsvpForm) {
    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
        
        console.log('Données RSVP reçues :', data);
        
        // Simple visual feedback
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerText;
        
        submitBtn.innerText = 'Envoi en cours...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerText = 'Réponse envoyée ! Merci ♥';
            submitBtn.style.backgroundColor = '#c4a47c';
            
            // Optional: reset form after a delay
            // setTimeout(() => {
            //     rsvpForm.reset();
            //     submitBtn.innerText = originalText;
            //     submitBtn.disabled = false;
            //     submitBtn.style.backgroundColor = '';
            // }, 3000);
        }, 1500);
    });
}
