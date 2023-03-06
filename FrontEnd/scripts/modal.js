const focusElementSelector = "button, input, a, textarea";
let focusElements = [];
let modalFocusElements = [];

// Filtering focusable elements that are not in modal
focusElements = Array.from(document.querySelectorAll(focusElementSelector));
modalFocusElements = Array.from(document.querySelector("#edit-modal").querySelectorAll(focusElementSelector));
focusElements = focusElements.filter((element) => !modalFocusElements.includes(element));

function openModal(event) {
	event.preventDefault();

	// Show modal and change attributes for accessibility
	const editModal = document.querySelector("#edit-modal");
	editModal.style.display = "flex";
	editModal.removeAttribute("aria-hidden");
	editModal.setAttribute("aria-modal", true);

	// Add events to close modal on button and outside modal wrapper
	editModal.addEventListener("click", closeModal);
	editModal.querySelector(".close-modal").addEventListener("click", closeModal);
	editModal.querySelector(".modal-wrapper").addEventListener("click", stopPropagation);

	// Disabling focusability on elements outside modal
	for (let element of focusElements) {
		element.setAttribute("tabindex", -1);
	}

	// Add gallery
	createGallery(works);
}

function closeModal(event) {
	event.preventDefault();

	// Hide modal (with delay for animation) and change attributes for accessibility
	const editModal = document.querySelector("#edit-modal");
	window.setTimeout(() => (editModal.style.display = null), 300);
	editModal.setAttribute("aria-hidden", true);
	editModal.removeAttribute("aria-modal");

	// Remove events to close modal
	editModal.removeEventListener("click", closeModal);
	editModal.querySelector(".close-modal").removeEventListener("click", closeModal);
	editModal.querySelector(".modal-wrapper").removeEventListener("click", stopPropagation);

	// Enabling focusability on elements outside modal
	for (let element of focusElements) {
		element.removeAttribute("tabindex");
	}

	// Remove gallery
	const gallery = editModal.querySelector(".edit-gallery");
	gallery.innerHTML = "";
}

// Function used to make sure click on modal wrapper wont close modal
function stopPropagation(event) {
	event.stopPropagation();
}

// Add event to edit button for openning modal
const editWorksButton = document.querySelector("#edit-works");
editWorksButton.addEventListener("click", openModal);

// Add event to escape key for closing modal
window.addEventListener("keydown", (event) => {
	if (event.key === "Escape" || event.key === "Esc") {
		closeModal(event);
	}
});

// Fetching all works from API
const responseWorks = await fetch("http://localhost:5678/api/works");
const works = await responseWorks.json();

// Function that creates gallery using an array of works
function createGallery(works) {
	const gallery = document.querySelector(".edit-gallery");

	for (let work of works) {
		const figure = document.createElement("figure");
		gallery.appendChild(figure);

		const deleteButton = document.createElement("button");

		const trashIcon = document.createElement("i");
		trashIcon.className = "fa-solid fa-trash-can";
		deleteButton.appendChild(trashIcon);

		const img = document.createElement("img");
		img.src = work.imageUrl;
		img.alt = work.title;

		const figcaption = document.createElement("figcaption");
		figcaption.innerText = "éditer";

		figure.appendChild(deleteButton);
		figure.appendChild(img);
		figure.appendChild(figcaption);
	}
}
