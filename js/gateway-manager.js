/**
 * Gateway Manager for VR Tour
 * Handles landing page interactions and modal popups
 */

document.addEventListener('DOMContentLoaded', () => {
    const majorsBtn = document.getElementById('majors-btn');
    const devModal = document.getElementById('dev-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    if (majorsBtn && devModal) {
        majorsBtn.addEventListener('click', (event) => {
            event.preventDefault();
            devModal.classList.add('visible');
        });
    }

    if (modalCloseBtn && devModal) {
        modalCloseBtn.addEventListener('click', () => {
            devModal.classList.remove('visible');
        });

        // Close when clicking overlay background
        devModal.addEventListener('click', (event) => {
            if (event.target === devModal) {
                devModal.classList.remove('visible');
            }
        });
    }
});
