import { displayAlertBox } from './admin.js';

// Send message
async function sendMessage(event) {
	event.preventDefault();

	const messageData = new FormData(event.target);

	const responseMessage = await fetch('http://localhost:5678/api/messages', {
		method: 'POST',
		body: messageData,
	});

	if (responseMessage.status === 201) {
		// Empty form inputs
		const form = event.target;
		form.name.value = null;
		form.email.value = null;
		form.content.value = null;

		displayAlertBox('success', 'Message envoyé', 3000);
	} else {
		displayAlertBox('error', `Échec de l'envoi du message\nErreur ${responseMessage.status} : ${responseMessage.statusText}`, 3000);
	}
}

// Add event to contact form
document.querySelector('#contact-form').addEventListener('submit', sendMessage);
