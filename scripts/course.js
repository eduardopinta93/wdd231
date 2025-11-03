// ------------------ ARRAY DE CURSOS ------------------
const courses = [
    { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, certificate: 'Web and Computer Programming', completed: false },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, certificate: 'Web and Computer Programming', completed: true },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, certificate: 'Web and Computer Programming', completed: false },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, certificate: 'Web and Computer Programming', completed: false },
    { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, certificate: 'Web and Computer Programming', completed: true },
    { subject: 'WDD', number: 231, title: 'Frontend Web Development I', credits: 2, certificate: 'Web and Computer Programming', completed: false }
];

// ------------------ COURSES SECTION ------------------
const webSection = document.querySelector('.web');

// Creamos contenedor de botones
const buttonContainer = document.createElement('div');
buttonContainer.classList.add('filters');
buttonContainer.innerHTML = `
    <button id="all">All</button>
    <button id="cse">CSE</button>
    <button id="wdd">WDD</button>
`;

// Contenedor para las cards
const courseContainer = document.createElement('div');
courseContainer.classList.add('course-container');

// Contenedor para total de créditos
const totalCredits = document.createElement('p');
totalCredits.classList.add('credits');

// Agregamos al DOM
webSection.appendChild(buttonContainer);
webSection.appendChild(courseContainer);
webSection.appendChild(totalCredits);

// ------------------ FUNCIONES ------------------

// Mostrar cursos dinámicamente
function displayCourses(filteredCourses) {
    courseContainer.innerHTML = ''; // limpiar
    filteredCourses.forEach(course => {
        const card = document.createElement('div');
        card.classList.add('course-card');
        if (course.completed) {
            card.classList.add('completed');
        }
        card.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
            <p>${course.title}</p>
            <p><strong>Credits:</strong> ${course.credits}</p>
        `;
        courseContainer.appendChild(card);
    });

    // Calcular créditos totales
    const total = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    totalCredits.textContent = `The total credits for courses listed above is ${total}`;
}

// ------------------ EVENTOS DE FILTRO ------------------
document.getElementById('all').addEventListener('click', () => displayCourses(courses));
document.getElementById('cse').addEventListener('click', () => displayCourses(courses.filter(c => c.subject === 'CSE')));
document.getElementById('wdd').addEventListener('click', () => displayCourses(courses.filter(c => c.subject === 'WDD')));

// Mostrar todos por defecto al cargar
displayCourses(courses);
