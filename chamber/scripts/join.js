/***********************
 * JOIN PAGE JAVASCRIPT
 ***********************/

// 1. TIMESTAMP
const timestampField = document.querySelector("#timestamp");
timestampField.value = new Date().toISOString();

// 2. MEMBERSHIP CARD ANIMATION
const cards = document.querySelectorAll(".membership-card");

window.addEventListener("load", () => {
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add("visible");
        }, index * 200);
    });
});

// 3. MODALS
const modalButtons = document.querySelectorAll(".learn-more");
const modals = document.querySelectorAll(".modal");
const closeButtons = document.querySelectorAll(".close");

// Abrir
modalButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
        const card = e.target.closest(".membership-card");
        const modalId = card.getAttribute("data-modal");
        const modal = document.getElementById(modalId);
        modal.style.display = "flex";
    });
});

// Cerrar con la "X"
closeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        btn.parentElement.parentElement.style.display = "none";
    });
});

// Cerrar clickeando afuera
window.addEventListener("click", (e) => {
    modals.forEach(modal => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});
