
const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("figcaption");
const forecastContainer = document.querySelector("#forecast");


const apiKey = "3ccf390e8908c608a2edd0c1353c7332";   
const lat = 3.53944;
const lon = -76.30361;


const urlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;



async function getWeather() {
  try {
    const response = await fetch(urlCurrent);

    if (!response.ok) {
      throw new Error("Error en el clima actual");
    }

    const data = await response.json();
    displayCurrentWeather(data);

  } catch (error) {
    console.log("ERROR:", error);
  }
}


function displayCurrentWeather(data) {
  currentTemp.textContent = `${data.main.temp.toFixed(1)} °C`;

  const icon = data.weather[0].icon;
  const desc = data.weather[0].description;

  weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${icon}@2x.png`);
  weatherIcon.setAttribute("alt", desc);

  captionDesc.textContent = desc;
}



async function getForecast() {
  try {
    const response = await fetch(urlForecast);

    if (!response.ok) {
      throw new Error("Error al obtener pronóstico");
    }

    const data = await response.json();
    displayForecast(data);

  } catch (error) {
    console.log("ERROR:", error);
  }
}


function displayForecast(data) {
  forecastContainer.innerHTML = "";

  const daily = {};

  
  data.list.forEach(item => {
    const date = item.dt_txt.split(" ")[0];

    if (!daily[date]) {
      daily[date] = item; 
    }
  });

  
  const nextThreeDays = Object.values(daily).slice(1, 4);

  nextThreeDays.forEach(day => {
    const card = document.createElement("div");
    card.classList.add("forecast-day");

    const temp = day.main.temp.toFixed(1);
    const icon = day.weather[0].icon;
    const desc = day.weather[0].description;

    card.innerHTML = `
      <h4>${day.dt_txt.split(" ")[0]}</h4>
      <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${desc}">
      <p><strong>${temp} °C</strong></p>
      <p>${desc}</p>
    `;

    forecastContainer.appendChild(card);
  });
}



getWeather();
getForecast();


// ---------------- SPOTLIGHTS ---------------- //

async function loadSpotlights() {
  try {
    const response = await fetch("data/members.json");
    const data = await response.json();

    
    const eligible = data.members.filter(member => 
      member.membershipLevel === 2 || member.membershipLevel === 3
    );

    
    const shuffled = eligible.sort(() => 0.5 - Math.random());

   
    const spotlightCount = Math.floor(Math.random() * 2) + 2; 
    const selected = shuffled.slice(0, spotlightCount);

    displaySpotlights(selected);

  } catch (error) {
    console.error("Error loading spotlights:", error);
  }
}

function displaySpotlights(members) {
  const container = document.querySelector("#spotlight-container");
  container.innerHTML = "";

  members.forEach(member => {
    const card = document.createElement("section");
    card.classList.add("spotlight-card");

    card.innerHTML = `
      <img src="${member.image}" alt="${member.name} logo" loading="lazy">
      <h3>${member.name}</h3>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">${member.website}</a>
    `;

    container.appendChild(card);
  });
}

loadSpotlights();
