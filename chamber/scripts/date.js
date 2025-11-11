const yearElement = document.getElementById("currentyear");
yearElement.textContent = new Date().getFullYear();


const lastModifiedElement = document.querySelector(".lastModified");
lastModifiedElement.textContent = `Last modified: ${document.lastModified}`;