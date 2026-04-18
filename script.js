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
