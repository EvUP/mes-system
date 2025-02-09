const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/current', authController.current);
router.get('/refresh', authController.refresh);
module.exports = router;
