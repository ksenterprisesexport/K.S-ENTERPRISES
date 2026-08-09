    /* ==========================
       Sticky Navbar
    ========================== */

    const navbar = document.getElementById("navbar");

    if (navbar) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 50) {

                navbar.classList.add("scrolled");

            } else {

                navbar.classList.remove("scrolled");

            }

        });

    }
    /* ==========================================
   HERO TEXT DATA
========================================== */

const heroData = [

{
    title: "Premium Ashwagandha Roots",
    description: "High Quality Herbal Products Exported Worldwide with Reliable Documentation, Competitive Pricing and Timely Delivery."
},

{
    title: "Premium Raw Jute",
    description: "Natural Raw Jute Carefully Selected For Textile, Packaging And Industrial Applications."
},

{
    title: "Jute Braided Rope",
    description: "Strong, Durable And Eco-Friendly Braided Rope Manufactured For Domestic And International Buyers."
},

{
    title: "Natural Jute Mats",
    description: "Handcrafted Sustainable Jute Mats Suitable For Home, Commercial And Export Markets."
},

{
    title: "Premium Corn & Wheat",
    description: "High Quality Agricultural Products Exported With Quality Assurance And Timely Delivery."
}

];

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

const prevBtn = document.getElementById("heroPrev");
const nextBtn = document.getElementById("heroNext");

const heroTitle = document.getElementById("heroTitle");
const heroDescription = document.getElementById("heroDescription");

let current = 0;
let autoSlide;
/* ==========================================
   HERO SLIDER
========================================== */

if (
    slides.length > 0 &&
    dots.length > 0 &&
    prevBtn &&
    nextBtn &&
    heroTitle &&
    heroDescription
) {

    function showSlide(index) {

        slides.forEach((slide) => {
            slide.classList.remove("active");
        });

        dots.forEach((dot) => {
            dot.classList.remove("active");
        });

        slides[index].classList.add("active");
        dots[index].classList.add("active");

        heroTitle.textContent = heroData[index].title;
        heroDescription.textContent = heroData[index].description;
    }

    function nextSlide() {

        current++;

        if (current >= slides.length) {
            current = 0;
        }

        showSlide(current);
    }

    function prevSlide() {

        current--;

        if (current < 0) {
            current = slides.length - 1;
        }

        showSlide(current);
    }

    function startSlider() {

        autoSlide = setInterval(nextSlide, 3000);
    }

    function stopSlider() {

        clearInterval(autoSlide);
    }

    nextBtn.addEventListener("click", () => {

        nextSlide();
        stopSlider();
        startSlider();

    });

    prevBtn.addEventListener("click", () => {

        prevSlide();
        stopSlider();
        startSlider();

    });

    dots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            current = index;

            showSlide(current);

            stopSlider();
            startSlider();

        });

    });

    showSlide(current);
    startSlider();

}
/* ==========================
   Mobile Menu
========================== */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", function () {

        navMenu.classList.toggle("show");

    });

}

/* ==========================================
   COUNTER ANIMATION
========================================== */

const counters = document.querySelectorAll(".counter");

if (counters.length > 0) {

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const counter = entry.target;

                const target = +counter.dataset.target;

                const original = counter.textContent;

                const hasPlus = original.includes("+");
                const hasPercent = original.includes("%");
                const has24x7 = original.includes("24×7");

                let count = 0;

                const speed = Math.max(1, target / 250);

                const update = () => {

                    if (count < target) {

                        count += speed;

                        if (count > target) count = target;

                        if (has24x7) {

                            counter.textContent = "24×7";

                        } else if (hasPercent) {

                            counter.textContent = Math.floor(count) + "%";

                        } else if (hasPlus) {

                            counter.textContent = Math.floor(count) + "+";

                        } else {

                            counter.textContent = Math.floor(count);

                        }

                        requestAnimationFrame(update);

                    }

                };

                update();

                observer.unobserve(counter);

            }

        });

    }, {
        threshold: 0.5
    });

    counters.forEach(counter => observer.observe(counter));

}
/* ==========================
   CERTIFICATE SWIPER
========================== */

if (document.querySelector(".certificateSwiper")) {

    const certificateSwiper = new Swiper(".certificateSwiper", {

        loop: true,

        speed: 500,

        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },

        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },

        breakpoints: {

            0: {
                slidesPerView: 1,
                spaceBetween: 20
            },

            768: {
                slidesPerView: 2,
                spaceBetween: 30
            },

            1024: {
                slidesPerView: 4,
                spaceBetween: 30
            }

        }

    });

}

/* PRODUCT FILTER */

function filterProducts() {

    const cards = document.querySelectorAll(".product-card");
    const links = document.querySelectorAll(".product-nav-wrapper a");

    const category =
        window.location.hash.replace("#","") || "all";

    links.forEach(link => {

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + category){
            link.classList.add("active");
        }

    });

    cards.forEach(card => {

        if(
            category === "all" ||
            card.classList.contains(category)
        ){
            card.style.display = "flex";
        }else{
            card.style.display = "none";
        }

    });

}

filterProducts();

window.addEventListener("hashchange", filterProducts);


