// Getting all elements affected by admin view
const editBanner = document.querySelector("#edit-banner");
const loginLink = document.querySelector("#login-link");
const editButtons = document.querySelectorAll(".edit");
const filters = document.querySelector(".filters");

// Change admin elements if login token is in local storage
if (window.localStorage.getItem("token")) {
	// Display edit banner
	editBanner.style.display = "flex";

	// Change login to logout
	loginLink.href = "index.html";
	loginLink.innerHTML = "<li>logout</li>";

	// Logout removes token from local storage
	loginLink.addEventListener("click", () => {
		window.localStorage.removeItem("userId");
		window.localStorage.removeItem("token");
	});

	// Hide filters
	filters.style.display = "none";

	// Display edit buttons
	for (let button of editButtons) {
		button.style.display = "flex";
	}
}
