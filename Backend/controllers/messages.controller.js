const nodemailer = require('nodemailer');

exports.sendMessage = async (req, res) => {
	const transporter = nodemailer.createTransport({
		host: 'smtp.ethereal.email',
		port: 587,
		auth: {
			user: 'imani.corkery99@ethereal.email',
			pass: 'tWEpYejZPGVEgaZ3Bc',
		},
	});

	const message = {
		from: 'hello@sophiebluel.com',
		to: 'sophie.bluel@gmail.com',
		subject: `New message from ${req.message.name}, ${req.message.email}`,
		text: req.message.content,
	};

	try {
		const info = await transporter.sendMail(message);
		return res.status(200).json(info);
	} catch (err) {
		return res.status(500).json({ error: new Error('Something went wrong') });
	}
};
