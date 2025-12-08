// 1 //
import { gearItems } from "../data/gear-data.mjs";

const gearContainer = document.querySelector("#gear-container");
const modal = document.querySelector("#gear-modal");
const modalBody = document.querySelector("#modal-body");
const modalClose = document.querySelector("#modal-close");
const lastViewedMessage = document.querySelector("#last-viewed-message");

const LAST_VIEWED_KEY = "bass_lastViewedGearId";


async function loadGear() {
  try {
    
    const items = await Promise.resolve(gearItems);

    renderGear(items);
  } catch (error) {
    console.error("Error loading gear data:", error);
    gearContainer.innerHTML = "<p>Failed to load gear items.</p>";
  }
}

//   2  //
function renderGear(items) {
  gearContainer.innerHTML = "";

  items.forEach((item) => {
    const card = document.createElement("article");
    card.classList.add("gear-card");

    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" loading="lazy">
      <h3>${item.name}</h3>
      <p class="gear-category">${item.category}</p>
      <p class="gear-price">${item.price}</p>
      <p class="gear-description">${item.description}</p>
      <button type="button" class="gear-more" data-id="${item.id}">
        Learn more
      </button>
    `;

    gearContainer.appendChild(card);
  });

  
  const buttons = gearContainer.querySelectorAll(".gear-more");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      const item = gearItems.find((g) => g.id === id);
      if (item) openModal(item);
    });
  });
}

//     3    //
function openModal(item) {
  modalBody.innerHTML = `
    <h2>${item.name}</h2>
    <p><strong>Category:</strong> ${item.category}</p>
    <p><strong>Price:</strong> ${item.price}</p>
    <img src="${item.image}" alt="${item.name}" loading="lazy">
    <p class="modal-details">${item.details}</p>
  `;

  modal.classList.remove("hidden");

  //  5   //
  localStorage.setItem(LAST_VIEWED_KEY, String(item.id));
  updateLastViewedMessage();
}


function closeModal() {
  modal.classList.add("hidden");
}

//   5    //
function updateLastViewedMessage() {
  const storedId = localStorage.getItem(LAST_VIEWED_KEY);

  if (!storedId) {
    lastViewedMessage.textContent =
      "Tip: Click on “Learn more” to see additional details.";
    return;
  }

  const idNumber = Number(storedId);
  const item = gearItems.find((g) => g.id === idNumber);

  if (!item) {
    lastViewedMessage.textContent = "";
    return;
  }

  lastViewedMessage.textContent = `Last item you viewed: ${item.name} (${item.category})`;
}

//   4   //
function setupModalEvents() {
  modalClose.addEventListener("click", closeModal);

  
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });

  
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });
}


loadGear();
updateLastViewedMessage();
setupModalEvents();
