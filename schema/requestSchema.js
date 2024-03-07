const { body ,param } = require('express-validator')

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
        .notEmpty()
        .withMessage('mobileNumber must exist'),
];

const addShoppingListSchema = [
    body('userId')
        .notEmpty()
        .withMessage('id should be present and should be a number'),
    body('shoppingListName')
        .isString()
        .notEmpty()
        .isLength({min:1, max:46})
        .withMessage('shoppingListName should be string of max 46 characters'),
    body("description")
        .optional()
        .isString()
        .isLength({max:240})
        .withMessage(`description shouldn't be more than 240 characters`),
    body('itemList')
        .optional()
        .isArray(),
    body('itemList.*.name')
        .notEmpty()
        .isString()
        .withMessage('name of the item should be specified'),
    body('itemList.*.quantity')
        .notEmpty()
        .withMessage('quantity should be specified'),
    body('itemList.*.isleId')
        .notEmpty()
        .withMessage('isleId should be specified')
]

const updateShoppingListSchema = [
    param('listId')
        .toInt()
        .isNumeric()
        .withMessage('id should be a number'),
    body('userId')
        .isInt({min:1})
        .withMessage('user id is compulsory to process the request'),
    body('name')
        .optional()
        .isString()
        .isLength({min:1, max:46})
        .withMessage('name should only be a string and not empty'),
    body('description')
        .optional()
        .isString()
        .isLength({max: 240})
        .withMessage('desctiption can contain only upto 240 characters')
]

const deleteShoppingListSchema = [
    param('listId')
        .toInt()
        .isNumeric()
        .withMessage('id should be a number'),
    body('userId')
        .isInt({min:1})
        .withMessage('user id is compulsory to process the request'),
]

module.exports = {
    registerSchema,
    addShoppingListSchema,
    updateShoppingListSchema,
    deleteShoppingListSchema
}