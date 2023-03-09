const express = require('express');
const router = express.Router();
const messagesCtrl = require('../controllers/messages.controller');

router.get('/', messagesCtrl.findAll);
router.post('/', messagesCtrl.create);

module.exports = router;
