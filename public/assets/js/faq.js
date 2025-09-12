document.addEventListener('DOMContentLoaded', function() {
    // All your existing JavaScript code for the FAQ functionality goes here
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', function() {
            const answer = this.nextElementSibling;

            // Toggle active state for the clicked question
            this.classList.toggle('active');

            // Adjust max-height dynamically
            if (this.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + "px";
                answer.style.opacity = 1;
            } else {
                answer.style.maxHeight = 0;
                answer.style.opacity = 0;
            }
        });
    });

    // Adjust the max-height when images within the answers load
    document.querySelectorAll('.faq-answer img').forEach(img => {
        img.onload = function() {
            const answer = this.closest('.faq-answer');
            if (answer.previousElementSibling.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        };
    });

    // Recalculate the height on window resize to ensure correct max-height
    window.addEventListener('resize', () => {
        document.querySelectorAll('.faq-question.active').forEach(button => {
            const answer = button.nextElementSibling;
            answer.style.maxHeight = answer.scrollHeight + "px";
        });
    });
});
