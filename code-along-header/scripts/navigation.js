// Store the selected elements that we are going to use.
const navbutton = document.querySelector('#ham-btm');
const navLinks = document.querySelector('#nav-bar');

// Toggle the show class off and on.

navbutton.addEventListener('click', () => {
	navbutton.classList.toggle('show');
	navLinks.classList.toggle('show');
})