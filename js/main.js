// Annieve & Co. Interactive Script
document.addEventListener('DOMContentLoaded', () => {
    // Navigation Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        navLinks.querySelectorAll('.nav-item, .btn-head').forEach(item => {
            item.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Form Submission Handling
    const annieveForm = document.getElementById('annieveForm');
    const annieveFeedback = document.getElementById('annieveFeedback');

    if (annieveForm && annieveFeedback) {
        annieveForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('annieveName').value.trim();
            const email = document.getElementById('annieveEmail').value.trim();
            const service = document.getElementById('annieveService').value;
            const details = document.getElementById('annieveDetails').value.trim();

            if (!name || !email || !service || !details) {
                alert('Please complete all VIP consultation inquiry fields.');
                return;
            }

            annieveForm.style.display = 'none';
            annieveFeedback.classList.add('active');

            setTimeout(() => {
                annieveForm.reset();
                annieveForm.style.display = 'flex';
                annieveFeedback.classList.remove('active');
            }, 6000);
        });
    }
});
