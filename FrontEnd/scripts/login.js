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
		const alert = alertBox("error", "Erreur dans l'identifiant ou le mot de passe");
		document.querySelector("main").appendChild(alert);
	}
}

// Adding login function to the form submit
const loginForm = document.querySelector("form");
loginForm.addEventListener("submit", loginSubmit);

// Create an alert box
export function alertBox(type, message) {
	const box = document.createElement("div");
	box.className = "alert-box";

	switch (type) {
		case "success":
			box.style.backgroundColor = "#5cb54e";
			break;
		case "error":
			box.style.backgroundColor = "#e84a3f";
			break;
	}

	const text = document.createElement("p");
	text.innerText = message;
	box.appendChild(text);

	const closeButton = document.createElement("button");
	closeButton.innerText = "X";
	closeButton.addEventListener("click", () => box.parentNode.removeChild(box));
	box.appendChild(closeButton);

	return box;
}
