const {body} = require('express-validator')

const registerSchema = [
    body('username')
        .isString()
        .withMessage('username should be a string'),
    body('email')
        .isEmail()
        .withMessage('email must contain a valid email address'),
    body('password')
        .isLength({ min: 5 })
        .withMessage('password must be at least 5 characters long'),
    body('mobileNumber')
        .exists()
        .withMessage('mobileNumber must be exist'),
  ];

module.exports = {
    registerSchema
}