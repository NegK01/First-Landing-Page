// Seleccionamos las flechas
const arrows = document.querySelectorAll(".main__arrows");
const heroSection = document.querySelector(".main__hero");

// Lista de imágenes
const imagesMobile = [
    "mobile-image-hero-1.jpg",
    "mobile-image-hero-2.jpg",
    "mobile-image-hero-3.jpg"
];
const imagesDesktop = [
    "desktop-image-hero-1.jpg",
    "desktop-image-hero-2.jpg",
    "desktop-image-hero-3.jpg"
];

let currentIndex = 0;

function updateBackground() {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const images = isDesktop ? imagesDesktop : imagesMobile;
    heroSection.style.backgroundImage = `url("images/${images[currentIndex]}")`;
}

arrows[0].addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + imagesMobile.length) % imagesMobile.length;
    updateBackground();
});

arrows[1].addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % imagesMobile.length;
    updateBackground();
});