document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel__track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel__button--right');
    const prevButton = document.querySelector('.carousel__button--left');
    const carouselContainer = document.querySelector('.carousel__track-container');

    // Function to update slide positions
    function updateSlidePositions() {
        const carouselWidth = carouselContainer.clientWidth; 
        const slideWidth = slides[0].clientWidth;
        const initialOffset = (carouselWidth - slideWidth) / 2;
        slides.forEach((slide, index) => {
            slide.style.left = `${initialOffset + index * slideWidth}px`;
        });
    }

    // Function to move to a specific slide
    function moveToSlide(currentSlide, targetSlide) {
        const targetRect = targetSlide.getBoundingClientRect();
        const trackRect = track.getBoundingClientRect();
        const carouselWidth = carouselContainer.clientWidth;
        const moveAmount = -targetRect.left + trackRect.left + (carouselWidth - targetSlide.clientWidth) / 2;

        track.style.transform = `translateX(${moveAmount}px)`;
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    }

    // Initialize positions and add event listeners
    updateSlidePositions();
    window.addEventListener('resize', updateSlidePositions);

    nextButton.addEventListener('click', () => {
        const currentSlide = track.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling || track.firstElementChild; // Loop back if at end
        moveToSlide(currentSlide, nextSlide);
    });

    prevButton.addEventListener('click', () => {
        const currentSlide = track.querySelector('.current-slide');
        const prevSlide = currentSlide.previousElementSibling || track.lastElementChild; // Loop back if at start
        moveToSlide(currentSlide, prevSlide);
    });
});
