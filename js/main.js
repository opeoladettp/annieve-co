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

    // Form Submission Handling — Formsend API
    const FORMSEND_API_KEY = '91eb8bcdda7d0437b779a5698eae3e684bf9ec64e43c70bc4c65854b249ad6fb';
    const FORMSEND_ENDPOINT = 'https://api.formsend.ezeroandone.io/submit';

    const annieveForm = document.getElementById('annieveForm');
    const annieveFeedback = document.getElementById('annieveFeedback');
    const submitBtn = annieveForm ? annieveForm.querySelector('button[type="submit"]') : null;

    if (annieveForm && annieveFeedback) {
        annieveForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name    = document.getElementById('annieveName').value.trim();
            const email   = document.getElementById('annieveEmail').value.trim();
            const phone   = document.getElementById('annievePhone').value.trim();
            const service = document.getElementById('annieveService').value;
            const details = document.getElementById('annieveDetails').value.trim();

            if (!name || !email || !service || !details) {
                alert('Please complete all VIP consultation inquiry fields.');
                return;
            }

            // Disable button to prevent double-submit
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.querySelector('span:first-child').textContent = 'Sending…';
            }

            try {
                const res = await fetch(FORMSEND_ENDPOINT, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        api_key: FORMSEND_API_KEY,
                        name,
                        email,
                        subject: `VIP Consultation Inquiry — ${service}`,
                        message: details,
                        // Extra fields forwarded as additional rows in the email
                        phone:   phone || 'Not provided',
                        service,
                    }),
                });

                const data = await res.json();

                if (data.success) {
                    // Show success feedback
                    annieveForm.style.display = 'none';
                    annieveFeedback.classList.add('active');

                    // Reset after 6 seconds
                    setTimeout(() => {
                        annieveForm.reset();
                        annieveForm.style.display = 'flex';
                        annieveFeedback.classList.remove('active');
                    }, 6000);
                } else {
                    alert(`Submission failed: ${data.message || 'Please try again.'}`);
                }
            } catch (err) {
                console.error('Formsend error:', err);
                alert('A network error occurred. Please check your connection and try again.');
            } finally {
                // Re-enable submit button
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.querySelector('span:first-child').textContent = 'Submit VIP Request';
                }
            }
        });
    }
});
