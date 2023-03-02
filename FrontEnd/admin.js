const editBanner = document.querySelector("#edit-banner");
const loginLink = document.querySelector("#login-link");
const filters = document.querySelector(".filters");

if (window.localStorage.getItem("token")) {
	editBanner.style.display = "flex";

	loginLink.href = "index.html";
	loginLink.innerHTML = "<li>logout</li>";

	loginLink.addEventListener("click", () => {
		window.localStorage.removeItem("userId");
		window.localStorage.removeItem("token");
	});

	filters.style.display = "none";
}
