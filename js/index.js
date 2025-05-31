// Seleccionamos las flechas
const arrows = document.querySelectorAll(".main__arrows");
const heroSection = document.querySelector(".main__hero");
const titleElement = document.querySelector(".main__title");
const paragraphElement = document.querySelector(".main__paragraph");

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

const titles = [
    "Discover innovative ways to decorate",
    "We are available all across the globe",
    "Manufactured with the best materials"
];

const descriptions = [
    `We provide unmatched quality, comfort, and style for property owners across the country. Our experts combine form and function in bringing your vision to life. Create a room in your own style with our collection and make your property a reflection of you and what you love.`,
    `With stores all over the world, it's easy for you to find furniture for your home or place of business. Locally, we’re in most major cities throughout the country. Find the branch nearest you using our store locator. Any questions? Don't hesitate to contact us today.`,
    `Our modern furniture store provide a high level of quality. Our company has invested in advanced technology to ensure that every product is made as perfect and as consistent as possible. With three decades of experience in this industry, we understand what customers want for their home and office.`
];


let currentIndex = 0;
let autoplayInterval;

function updateBackground() {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const folder = isDesktop ? "desktop" : "mobile";
    const images = isDesktop ? imagesDesktop : imagesMobile;
    heroSection.style.backgroundImage = `url("../img/${folder}/${images[currentIndex]}")`;

    titleElement.textContent = titles[currentIndex];
    paragraphElement.textContent = descriptions[currentIndex];
}

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

function nextSlide() {
    currentIndex = (currentIndex + 1) % imagesMobile.length;
    updateBackground();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + imagesMobile.length) % imagesMobile.length;
    updateBackground();
}

// Iniciar el autoplay
function startAutoplay() {
    autoplayInterval = setInterval(() => {
        nextSlide();
    }, 15000); // 15 segundos para que el cliente pueda leer
}

// Reiniciar el autoplay (cuando se hace clic con los controles)
function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
}

arrows[0].addEventListener("click", () => {
    prevSlide();
    resetAutoplay();
});

arrows[1].addEventListener("click", () => {
    nextSlide()
    resetAutoplay();
});

// Chequear si el hero esta visible
function checkHeroVisibility() {
    const rect = heroSection.getBoundingClientRect();

    // Condición para saber si esta visible:
    // top < viewport height (window.innerHeight)
    // y bottom > 0 (parte visible)
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (isVisible) {
        // Si no hay autoplay activo, lo iniciamos
        if (!autoplayInterval) {
            startAutoplay();
        }
    } else {
        // Si no esta visible, pausamos autoplay
        clearInterval(autoplayInterval);
        autoplayInterval = null;
    }
}

// Escuchar el scroll y también resize
window.addEventListener("scroll", checkHeroVisibility);
window.addEventListener("resize", () => {
    updateBackground();
    checkHeroVisibility();
});

// Inicializar
updateBackground();
checkHeroVisibility();