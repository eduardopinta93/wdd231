
import { places } from "../data/discover-items.mjs";


const container = document.querySelector(".discover-grid");


const visitMessage = document.querySelector("#visit-message");



function showVisitMessage() {
  const lastVisit = localStorage.getItem("lastVisit");
  const now = Date.now();

  if (!lastVisit) {
   
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

  
  localStorage.setItem("lastVisit", now);
}

showVisitMessage();



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



function enableHoverEffect() {
  if (window.innerWidth > 640) {
    container.classList.add("hover-active");
  }
}

enableHoverEffect();

window.addEventListener("resize", enableHoverEffect);
