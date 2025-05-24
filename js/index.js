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
    const folder = isDesktop ? "desktop" : "mobile";
    const images = isDesktop ? imagesDesktop : imagesMobile;
    heroSection.style.backgroundImage = `url("../img/${folder}/${images[currentIndex]}")`;
}

arrows[0].addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + imagesMobile.length) % imagesMobile.length;
    updateBackground();
});

arrows[1].addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % imagesMobile.length;
    updateBackground();
});

// Modo claro / oscuro, considerar cambiar los emojis a svg de color blanco
document.getElementById("theme-toggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const icon = document.getElementById("theme-toggle");
    icon.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

// Scroll to top
document.getElementById("scroll-top").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Mostrar botón solo cuando se ha hecho scroll
window.addEventListener("scroll", () => {
    const scrollBtn = document.getElementById("scroll-top");
    scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
});
