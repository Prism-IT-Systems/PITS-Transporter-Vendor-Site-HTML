// Mobile Menu Toggle

document.addEventListener("DOMContentLoaded", function () {

    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    const menuOverlay = document.getElementById("menuOverlay");
    const navLinks = document.querySelectorAll(".navigation-link");

    function openMenu() {
        menuToggle.classList.add("active");
        mobileMenu.classList.add("active");
        menuOverlay.classList.add("active");
        document.body.classList.add("menu-open");
    }

    function closeMenu() {
        menuToggle.classList.remove("active");
        mobileMenu.classList.remove("active");
        menuOverlay.classList.remove("active");
        document.body.classList.remove("menu-open");
    }

    menuToggle.addEventListener("click", function () {
        if (mobileMenu.classList.contains("active")) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    menuOverlay.addEventListener("click", closeMenu);

    navLinks.forEach(function (link) {
        link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 991) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            closeMenu();
        }
    });

});

// Swiper pagination js //

// ========================================
// Feature Slider
// ========================================

(function () {

    const slides = document.querySelectorAll("#featureRight .slide");
    const dots = document.querySelectorAll("#slideDots button");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    // Stop slider JS if slider does not exist on the current page
    if (
        slides.length === 0 ||
        dots.length === 0 ||
        !prevBtn ||
        !nextBtn
    ) {
        return;
    }

    let current = 0;
    let autoplayId;


    // ========================================
    // Go To Slide
    // ========================================

    function goTo(index) {

        // Remove active class from current slide
        slides[current].classList.remove("active");
        dots[current].classList.remove("active");

        // Calculate new slide index
        current = (index + slides.length) % slides.length;

        // Add active class to new slide
        slides[current].classList.add("active");
        dots[current].classList.add("active");

    }


    // ========================================
    // Next Slide
    // ========================================

    function next() {
        goTo(current + 1);
    }


    // ========================================
    // Previous Slide
    // ========================================

    function prev() {
        goTo(current - 1);
    }


    // ========================================
    // Next Button
    // ========================================

    nextBtn.addEventListener("click", function () {

        next();
        resetAutoplay();

    });


    // ========================================
    // Previous Button
    // ========================================

    prevBtn.addEventListener("click", function () {

        prev();
        resetAutoplay();

    });


    // ========================================
    // Pagination Dots
    // ========================================

    dots.forEach(function (dot) {

        dot.addEventListener("click", function () {

            const index = parseInt(
                dot.dataset.index,
                10
            );

            goTo(index);
            resetAutoplay();

        });

    });


    // ========================================
    // Start Autoplay
    // ========================================

    function startAutoplay() {

        autoplayId = setInterval(function () {

            next();

        }, 5000);

    }


    // ========================================
    // Reset Autoplay
    // ========================================

    function resetAutoplay() {

        clearInterval(autoplayId);

        startAutoplay();

    }


    // ========================================
    // Initialize
    // ========================================

    startAutoplay();

})();


// ========================================
// FAQ Accordion
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    const faqItems = document.querySelectorAll(".faq-item");

    if (!faqItems.length) {
        return;
    }


    // ========================================
    // Set Initial FAQ State
    // ========================================

    faqItems.forEach(function (item) {

        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");
        const icon = item.querySelector(".faq-icon");

        if (!question || !answer || !icon) {
            return;
        }


        // If FAQ is active by default
        if (item.classList.contains("active")) {

            answer.style.maxHeight =
                answer.scrollHeight + "px";

            question.setAttribute(
                "aria-expanded",
                "true"
            );

            icon.textContent = "−";

        } else {

            answer.style.maxHeight = "0px";

            question.setAttribute(
                "aria-expanded",
                "false"
            );

            icon.textContent = "+";

        }

    });


    // ========================================
    // FAQ Click Event
    // ========================================

    faqItems.forEach(function (item) {

        const question =
            item.querySelector(".faq-question");

        const answer =
            item.querySelector(".faq-answer");

        const icon =
            item.querySelector(".faq-icon");


        if (!question || !answer || !icon) {
            return;
        }


        question.addEventListener("click", function () {

            const isOpen =
                item.classList.contains("active");


            // ========================================
            // Close All Other FAQs
            // ========================================

            faqItems.forEach(function (otherItem) {

                if (otherItem === item) {
                    return;
                }


                const otherQuestion =
                    otherItem.querySelector(".faq-question");

                const otherAnswer =
                    otherItem.querySelector(".faq-answer");

                const otherIcon =
                    otherItem.querySelector(".faq-icon");


                if (!otherQuestion || !otherAnswer || !otherIcon) {
                    return;
                }


                // Remove active class
                otherItem.classList.remove("active");


                // Smoothly close
                otherAnswer.style.maxHeight = "0px";


                // Update accessibility
                otherQuestion.setAttribute(
                    "aria-expanded",
                    "false"
                );


                // Change icon
                otherIcon.textContent = "+";

            });


            // ========================================
            // Close Current FAQ
            // ========================================

            if (isOpen) {

                item.classList.remove("active");

                answer.style.maxHeight = "0px";

                question.setAttribute(
                    "aria-expanded",
                    "false"
                );

                icon.textContent = "+";

            }


            // ========================================
            // Open Current FAQ
            // ========================================

            else {

                item.classList.add("active");

                // Get exact content height
                answer.style.maxHeight =
                    answer.scrollHeight + "px";

                question.setAttribute(
                    "aria-expanded",
                    "true"
                );

                icon.textContent = "−";

            }

        });

    });


    // ========================================
    // Update Height on Window Resize
    // ========================================

    window.addEventListener("resize", function () {

        faqItems.forEach(function (item) {

            if (!item.classList.contains("active")) {
                return;
            }

            const answer =
                item.querySelector(".faq-answer");

            if (answer) {

                answer.style.maxHeight =
                    answer.scrollHeight + "px";

            }

        });

    });

});

// active link js //

document.addEventListener("DOMContentLoaded", function () {

    // Get current page
    let currentPage = window.location.pathname.split("/").pop();

    // If no page name, use index.html
    if (currentPage === "") {
        currentPage = "index.html";
    }

    // Header navigation links
    const navigationLinks = document.querySelectorAll(".navigation-link");

    navigationLinks.forEach(function (link) {

        const linkPage = link.getAttribute("href").split("/").pop();

        if (linkPage === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }

    });


    // Footer links
    const footerLinks = document.querySelectorAll(".footer-link");

    footerLinks.forEach(function (link) {

        const linkPage = link.getAttribute("href").split("/").pop();

        if (linkPage === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }

    });

});