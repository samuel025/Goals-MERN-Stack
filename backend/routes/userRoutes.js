const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getME } = require('../controller/userController')
const {protect} = require('../middleware/authmiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.post('/me', protect, getME)

module.exports = router