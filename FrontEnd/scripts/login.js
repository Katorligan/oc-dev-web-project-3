import { displayAlertBox } from "./admin.js";

// Function handling login event
async function loginSubmit(event) {
	// Prevent default form event on submit
	event.preventDefault();

	// Turn form data into an object
	const data = new FormData(event.target);
	const user = {
		email: data.get("email"),
		password: data.get("password"),
	};

	// Post user object to api to check email and password compatibility
	const responseLogin = await fetch("http://localhost:5678/api/users/login", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(user),
	});
	const userLogin = await responseLogin.json();

	// If email and password are correct, store token on local storage and go to index. Else, show alert message
	if (responseLogin.status === 200) {
		// boolean used for alert on index after succesful login
		window.localStorage.setItem("showAlertBox", true);

		window.localStorage.setItem("token", userLogin.token);
		window.location.href = "index.html";
	} else {
		displayAlertBox("error", "Erreur dans l'identifiant ou le mot de passe", 3000);
	}
}

// Adding login function to the form submit
const loginForm = document.querySelector("#login");
loginForm.addEventListener("submit", loginSubmit);
