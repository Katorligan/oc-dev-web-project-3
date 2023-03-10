module.exports = (req, res, next) => {
	try {
		const name = req.body.name.trim() ?? undefined;
		const email = req.body.email.trim() ?? undefined;
		const content = req.body.content.trim() ?? undefined;
		console.log(`${name}, ${email} : ${content}`);
		if (name !== undefined && name.length > 0 && email !== undefined && email.length > 0 && content !== undefined && content.length > 0) {
			req.message = { name: name, email: email, content: content };
			next();
		} else {
			return res.status(400).json({ error: new Error('Bad Request') });
		}
	} catch (e) {
		return res.status(500).json({ error: new Error('Something wrong occured') });
	}
};
