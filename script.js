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
        } else {
            additionalFields.style.display = 'block';
        }
    });
});

// Conditional Fields Toggles
function setupToggle(toggleId, fieldId) {
    const toggle = document.getElementById(toggleId);
    const field = document.getElementById(fieldId);
    
    if (toggle && field) {
        toggle.addEventListener('change', function() {
            field.style.display = this.checked ? 'block' : 'none';
        });
    }
}

setupToggle('toggle-accompanied', 'field-accompanied');
setupToggle('toggle-children', 'field-children');
setupToggle('toggle-veggie', 'field-veggie');
setupToggle('toggle-brunch', 'field-brunch');

// Carousel Logic
const carousel = document.getElementById('venue-carousel');
const dots = document.querySelectorAll('.dot');

if (carousel && dots.length > 0) {
    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        carousel.classList.add('active-drag');
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => {
        isDown = false;
        carousel.classList.remove('active-drag');
    });

    carousel.addEventListener('mouseup', () => {
        isDown = false;
        carousel.classList.remove('active-drag');
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2; // Vitesse de défilement
        carousel.scrollLeft = scrollLeft - walk;
    });

    carousel.addEventListener('scroll', () => {
        const index = Math.round(carousel.scrollLeft / carousel.offsetWidth);
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    });

    // Permettre de cliquer sur les points pour naviguer
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            carousel.scrollTo({
                left: i * carousel.offsetWidth,
                behavior: 'smooth'
            });
        });
    });
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
