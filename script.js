document.addEventListener("DOMContentLoaded", () => {

// MOBILE NAVIGATION
const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");

        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.textContent = isOpen ? "✕" : "☰";
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.textContent = "☰";
        });
    });
}

// EXPLORE PAGE SEARCH
const searchInput = document.querySelector("#explore-search");
const exploreCards = document.querySelectorAll(".explore-card");
const emptyResults = document.querySelector("#empty-results");
const searchStatus = document.querySelector("#search-status");

if (searchInput && exploreCards.length > 0) {
    const updateSearch = () => {
        const query = searchInput.value.trim().toLowerCase();
        let visibleCount = 0;

        exploreCards.forEach((card) => {
            const matches = card.textContent.toLowerCase().includes(query);

            card.hidden = !matches;

            if (matches) {
                visibleCount++;
            }
        });

        if (emptyResults) {
            emptyResults.hidden = visibleCount !== 0;
        }

        if (searchStatus) {
            searchStatus.textContent =
                `${visibleCount} ${visibleCount === 1 ? "result" : "results"} found`;
        }
    };

    searchInput.addEventListener("input", updateSearch);
    updateSearch();
}

// CONTACT FORM
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!contactForm.reportValidity()) {
            return;
        }

        const formData = new FormData(contactForm);

        const name = formData.get("name").trim();
        const email = formData.get("email").trim();
        const subject = formData.get("subject").trim();
        const message = formData.get("message").trim();

        const emailBody =
            `Name: ${name}\n` +
            `Reply email: ${email}\n\n` +
            `${message}`;

        const mailtoLink =
            `mailto:?subject=${encodeURIComponent(subject)}` +
            `&body=${encodeURIComponent(emailBody)}`;

        if (formStatus) {
            formStatus.textContent =
                "Your email application should open. Add the recipient's email address before sending.";
        }

        window.location.href = mailtoLink;
    });
}

});

// ==========================================
// NEXORA DYNAMIC SERVICE SELECTOR
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const serviceDropdown = document.getElementById("service");
    const serviceIcon = document.querySelector(".service-select-icon");
    const serviceHint = document.getElementById("service-hint");

    if (!serviceDropdown) {
        return;
    }

    const serviceDetails = {
        "Business Websites": {
            icon: "🌐",
            hint: "Create a professional website for your business."
        },

        "Responsive Design": {
            icon: "📱",
            hint: "Make your website work beautifully on every screen."
        },

        "E-commerce Websites": {
            icon: "🛒",
            hint: "Build an online store to showcase and sell your products."
        },

        "Website Improvement": {
            icon: "⚡",
            hint: "Improve your website's design, speed, and usability."
        },

        "Other": {
            icon: "✨",
            hint: "Tell us about the digital service you need."
        }
    };

    function updateServiceDisplay() {

        const selectedService = serviceDropdown.value;
        const details = serviceDetails[selectedService];

        if (!details) {
            if (serviceIcon) serviceIcon.textContent = "🌐";

            if (serviceHint) {
                serviceHint.textContent =
                    "Choose the service that best matches your project.";
            }

            return;
        }

        if (serviceIcon) {
            serviceIcon.textContent = details.icon;
        }

        if (serviceHint) {
            serviceHint.textContent = details.hint;
        }
    }

    // Update whenever the customer changes the dropdown.
    serviceDropdown.addEventListener("change", updateServiceDisplay);

    // Automatically select the service passed in the URL.
    const params = new URLSearchParams(window.location.search);
    const requestedService = params.get("service");

    const serviceMap = {
        "business-websites": "Business Websites",
        "responsive-design": "Responsive Design",
        "ecommerce-websites": "E-commerce Websites",
        "website-improvement": "Website Improvement"
    };

    if (requestedService && serviceMap[requestedService]) {
        serviceDropdown.value = serviceMap[requestedService];
    }

    // Update the icon and description on page load.
    updateServiceDisplay();

});
// NEXORA Contact Form — EmailJS
document.addEventListener("DOMContentLoaded", function () {
const contactForm = document.getElementById("contact-form");

if (!contactForm) return;

contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const submitButton = contactForm.querySelector(
        'button[type="submit"]'
    );

    if (typeof emailjs === "undefined") {
        alert("Email service is not loaded. Please refresh and try again.");
        return;
    }

    // Replace these three placeholders with your actual EmailJS details.
    const SERVICE_ID = "YOUR_SERVICE_ID";
    const TEMPLATE_ID = "YOUR_TEMPLATE_ID";
    const PUBLIC_KEY = "YOUR_PUBLIC_KEY";

    if (
        SERVICE_ID === "service_rjjxus3" ||
        TEMPLATE_ID === "template_lx2lz0t" ||
        PUBLIC_KEY === "EeNWEpaekRiE2W1ZO  "
    ) {
        alert("Please add your EmailJS Service ID, Template ID, and Public Key.");
        return;
    }

    const originalButtonText = submitButton
        ? submitButton.textContent
        : "";

    try {
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Sending...";
        }

        emailjs.init({ publicKey: PUBLIC_KEY });

        await emailjs.sendForm(
            SERVICE_ID,
            TEMPLATE_ID,
            contactForm
        );

        alert("Thank you! Your message has been sent successfully.");
        contactForm.reset();
    } catch (error) {
        console.error("NEXORA email error:", error);
        alert("Sorry, your message could not be sent. Please try again.");
    } finally {
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    }
});

});
// NEXORA: Reveal elements as visitors scroll

document.addEventListener("DOMContentLoaded", () => {
    const revealElements = document.querySelectorAll(".reveal");

    // Fallback for browsers without IntersectionObserver
    if (!("IntersectionObserver" in window)) {
        revealElements.forEach((element) => {
            element.classList.add("active");
        });

        return;
    }

    const observer = new IntersectionObserver(
        (entries, observerInstance) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observerInstance.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        observer.observe(element);
    });
});