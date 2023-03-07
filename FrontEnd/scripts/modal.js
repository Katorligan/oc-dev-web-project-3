import { createGallery } from "./gallery.js";

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
	editModal.querySelectorAll(".close-modal").forEach((button) => button.addEventListener("click", closeModal));
	editModal.querySelector(".modal-wrapper").addEventListener("click", stopPropagation);

	// Add events to change page
	editModal.querySelector("#add-picture").addEventListener("click", openUploadModalPage);
	editModal.querySelector(".previous-modal").addEventListener("click", closeUploadModalPage);

	// Disabling focusability on elements outside modal
	for (let element of focusElements) {
		element.setAttribute("tabindex", -1);
	}

	// Add gallery
	createEditGallery(works);

	// Add categories to form
	createUploadCategories(categories);
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
	editModal.querySelectorAll(".close-modal").forEach((button) => button.removeEventListener("click", closeModal));
	editModal.querySelector(".modal-wrapper").removeEventListener("click", stopPropagation);

	// Remove events to change page
	editModal.querySelector("#add-picture").removeEventListener("click", openUploadModalPage);
	editModal.querySelector(".previous-modal").removeEventListener("click", closeUploadModalPage);

	// Enabling focusability on elements outside modal
	for (let element of focusElements) {
		element.removeAttribute("tabindex");
	}

	// Remove gallery
	const gallery = editModal.querySelector(".edit-gallery");
	gallery.innerHTML = "";

	// Remove categories from form
	const selectCategory = editModal.querySelector("#category");
	selectCategory.innerHTML = "";

	// Close upload page after animation
	window.setTimeout(() => closeUploadModalPage(), 300);
}

// Function used to make sure click on modal wrapper wont close modal
function stopPropagation(event) {
	event.stopPropagation();
}

// Opening page for upload
function openUploadModalPage() {
	const galleryPage = document.querySelector("#gallery-modal-container");
	const uploadPage = document.querySelector("#add-picture-modal-container");

	galleryPage.style.display = "none";
	galleryPage.setAttribute("aria-hidden", true);

	uploadPage.style.display = "block";
	uploadPage.removeAttribute("aria-hidden");
}

// Closing page for upload
function closeUploadModalPage() {
	const galleryPage = document.querySelector("#gallery-modal-container");
	const uploadPage = document.querySelector("#add-picture-modal-container");

	galleryPage.style.display = null;
	galleryPage.removeAttribute("aria-hidden");

	uploadPage.style.display = null;
	uploadPage.setAttribute("aria-hidden", true);
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
let works;
fetchWorks();
async function fetchWorks() {
	const responseWorks = await fetch("http://localhost:5678/api/works");
	works = await responseWorks.json();
}

// Function that creates gallery using an array of works
function createEditGallery(works) {
	const gallery = document.querySelector(".edit-gallery");

	for (let work of works) {
		const figure = document.createElement("figure");
		gallery.appendChild(figure);

		const deleteButton = document.createElement("button");
		deleteButton.addEventListener("click", () => {
			deleteWork(work.id);
		});

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

// Function to delete a project
async function deleteWork(id) {
	const token = localStorage.getItem("token");

	const response = await fetch(`http://localhost:5678/api/works/${id}`, {
		method: "DELETE",
		headers: { Authorization: `Bearer ${token}` },
	});

	document.querySelector(".edit-gallery").innerHTML = "";
	document.querySelector(".gallery").innerHTML = "";
	fetchWorks().then(() => {
		createEditGallery(works);
		createGallery(works);
	});
}

// Fetching all categories from API
const responseCategories = await fetch("http://localhost:5678/api/categories");
const categories = await responseCategories.json();

// Adding categories options to upload form
function createUploadCategories(categories) {
	const selectCategory = document.querySelector("#category");

	const emptyOption = document.createElement("option");
	selectCategory.appendChild(emptyOption);

	for (let category of categories) {
		const option = document.createElement("option");
		option.value = category.id;
		option.innerText = category.name;

		selectCategory.appendChild(option);
	}
}
