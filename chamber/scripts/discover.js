// IMPORT DATA FROM MODULE
import { places } from "../data/discover-items.mjs";

// SELECT THE CONTAINER WHERE CARDS WILL APPEAR
const container = document.querySelector(".discover-grid");

// SELECT THE VISIT MESSAGE AREA
const visitMessage = document.querySelector("#visit-message");

// -------------------------------
// 1. DISPLAY VISIT MESSAGE
// -------------------------------

function showVisitMessage() {
  const lastVisit = localStorage.getItem("lastVisit");
  const now = Date.now();

  if (!lastVisit) {
    // FIRST VISIT
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const daysPassed = Math.floor((now - Number(lastVisit)) / (1000 * 60 * 60 * 24));

    if (daysPassed < 1) {
      visitMessage.textContent = "Back so soon! Awesome!";
    } else if (daysPassed === 1) {
      visitMessage.textContent = "You last visited 1 day ago.";
    } else {
      visitMessage.textContent = `You last visited ${daysPassed} days ago.`;
    }
  }

  // STORE CURRENT VISIT DATE
  localStorage.setItem("lastVisit", now);
}

showVisitMessage();

// -------------------------------
// 2. GENERATE CARDS DYNAMICALLY
// -------------------------------

function generateCards() {
  places.forEach((place) => {
    const card = document.createElement("section");
    card.classList.add("discover-card");

    card.innerHTML = `
      <h2>${place.name}</h2>

      <figure>
        <img src="${place.image}" alt="${place.name}" loading="lazy">
        <figcaption>${place.name}</figcaption>
      </figure>

      <address>${place.address}</address>

      <p>${place.description}</p>

      <button class="learn-more-btn">Learn More</button>
    `;

    container.appendChild(card);
  });
}

generateCards();

// -------------------------------
// 3. IMAGE HOVER EFFECT (DESKTOP ONLY)
// -------------------------------

function enableHoverEffect() {
  if (window.innerWidth > 640) {
    container.classList.add("hover-active");
  }
}

enableHoverEffect();

window.addEventListener("resize", enableHoverEffect);
