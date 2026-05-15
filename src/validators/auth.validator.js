const { body } = require('express-validator');

const registerValidator = [
    body('username')
        .isString()
        .isLength({ min: 3, max: 20 }).withMessage('Username must be 3-20 characters long'),
    
    body('email')
        .isEmail().withMessage('Please provide a valid email address'),

    body('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
        .matches(/[!@#$%^&*]/).withMessage('Password must contain a special character'),
    
    body('role')
        .optional()
        .isIn(['user', 'artist']).withMessage('Role must be either user or artist')
];

module.exports = { registerValidator };