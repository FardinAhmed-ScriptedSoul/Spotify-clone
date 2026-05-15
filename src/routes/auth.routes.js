const express = require('express')
const authController = require('../controllers/auth.controller.js')
const { registerValidator } = require('../validators/auth.validator');
const handleValidation = require('../middlewares/handleValidation.middleware');
const router = express.Router();

router.post('/register', 
    registerValidator, 
    handleValidation, // If validator fails, this stops the request
    authController.registerUser
);
router.post('/login',authController.loginUser)
router.post('.logout',authController.logOutUser)
module.exports = router;