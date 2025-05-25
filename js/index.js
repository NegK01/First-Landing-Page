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

// Preferencia de tema al cargar
window.addEventListener("DOMContentLoaded", () => {
    const userPref = localStorage.getItem("theme");
    if (userPref === "dark") {
        document.body.classList.add("dark-mode");
    } else if (userPref === "light") {
        document.body.classList.remove("dark-mode");
    } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (prefersDark) {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
    }
    updateBackground();
});

// Alternar modo claro/oscuro y guardar preferencia
const themeBtn = document.getElementById("theme-toggle");
console.log("themeBtn:", themeBtn);
if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        console.log("Botón presionado");
        const isDark = document.body.classList.toggle("dark-mode");
        localStorage.setItem("theme", isDark ? "dark" : "light");
    });
} else {
    console.error("No se encontró el botón #theme-toggle");
}

// Scroll to top
const scrollBtn = document.getElementById("scroll-top");
if (scrollBtn) {
    scrollBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", () => {
        scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
    });
}