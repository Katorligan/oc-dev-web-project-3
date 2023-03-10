const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkMessage = require('../middlewares/checkMessage');
const messagesCtrl = require('../controllers/messages.controller');

router.get('/', messagesCtrl.findAll);
router.post('/', multer().none(), checkMessage, messagesCtrl.create);

module.exports = router;
