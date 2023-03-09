const db = require('./../models');
const Messages = db.messages;

exports.findAll = async (req, res) => {
	try {
		const messages = await Messages.findAll();
		return res.status(200).json(messages);
	} catch (err) {
		return res.status(500).json({ error: new Error('Something went wrong') });
	}
};

exports.create = async (req, res) => {
	const name = req.body.name;
	const email = req.body.email;
	const content = req.body.content;
	try {
		const message = await Messages.create({
			name,
			email,
			content,
		});
		return res.status(201).json(message);
	} catch (err) {
		return res.status(500).json({ error: new Error('Something went wrong') });
	}
};
