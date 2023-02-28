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

	// If email and password are correct, store user id and token on local storage and go to index. Else, show alert message
	if (responseLogin.status == 200) {
		window.localStorage.setItem("userId", userLogin.userId);
		window.localStorage.setItem("token", userLogin.token);
		window.location.href = "index.html";
	} else {
		alert("Erreur dans l'identifiant ou le mot de passe");
	}
}

// Adding login function to the form submit
const loginForm = document.querySelector("form");
loginForm.addEventListener("submit", loginSubmit);
