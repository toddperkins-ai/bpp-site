const images = [
    '/assets/images/carousel img5.jpg',
    '/assets/images/carousel img1.jpg',
    '/assets/images/burnt bush.png',
    '/assets/images/carousel img2.jfif',
    '/assets/images/carousel img3.jfif',
    '/assets/images/carousel img4 small.jpg'
];

const descriptions = [
    "Aerial view of a burnt landscape showing scorched trees and remnants of a forest fire in Western Australia.",
    "Close-up image of charred ground and foliage after a severe bushfire, highlighting the intensity of the fire.",
    "Burnt bushland with visible damage to native shrubs and ground cover, demonstrating the local impact of bushfires.",
    "Aftermath of a bushfire with a focus on a devastated residential area, showing destroyed homes and properties.",
    "Image of a fire-damaged road with burnt trees lining the sides, illustrating the path of the bushfire.",
    "Panoramic view of a smoldering forest and thick smoke rising from the ground, captured after a recent bushfire event."
];

let currentIndex = 0;
let nextIndex = 1; // Start with the second image

function setupInitialBackgrounds() {
    const bg1 = document.getElementById('bg1');
    const bg2 = document.getElementById('bg2');

    // Set initial images and aria-labels without waiting for interval
    bg1.style.backgroundImage = `url('${images[currentIndex]}')`;
    bg1.setAttribute('aria-label', descriptions[currentIndex]);
    bg1.style.opacity = 1; // Ensure visible
    bg2.style.backgroundImage = `url('${images[nextIndex]}')`;
    bg2.setAttribute('aria-label', descriptions[nextIndex]);
    bg2.style.opacity = 0; // Ensure not visible
}

function changeBackgroundImage() {
    const currentBg = currentIndex % 2 === 0 ? document.getElementById('bg1') : document.getElementById('bg2');
    const nextBg = nextIndex % 2 === 0 ? document.getElementById('bg1') : document.getElementById('bg2');

    // Ensure next image is loaded before transition
    const img = new Image();
    img.onload = function () {
        // Set the new background image and its corresponding description
        nextBg.style.backgroundImage = `url('${images[nextIndex]}')`;
        nextBg.setAttribute('aria-label', descriptions[nextIndex]); // Set the corresponding description
        nextBg.style.opacity = 1;
        currentBg.style.opacity = 0;
    };
    img.src = images[nextIndex];

    // Update indices
    currentIndex = nextIndex;
    nextIndex = (nextIndex + 1) % images.length;
}

// Preload images, set initial backgrounds and aria-labels on page load
window.onload = function() {
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    setupInitialBackgrounds();
};

// Change image every 7 seconds
setInterval(changeBackgroundImage, 7000);