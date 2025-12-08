// Toggle navigation menu for small screens
const hamBtn = document.querySelector('#ham-btn');
const nav = document.querySelector('#nav-bar');

hamBtn.addEventListener('click', () => {
  nav.classList.toggle('open');
  hamBtn.classList.toggle('open');
});
