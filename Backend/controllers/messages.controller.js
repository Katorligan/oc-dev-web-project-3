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
	try {
		const message = await Messages.create(req.message);
		return res.status(201).json(message);
	} catch (err) {
		return res.status(500).json({ error: new Error('Something went wrong') });
	}
};
