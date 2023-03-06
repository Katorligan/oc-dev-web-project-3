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
