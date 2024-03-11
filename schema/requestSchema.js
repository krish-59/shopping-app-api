const { body, param } = require('express-validator')

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

const loginSchema = [
    body('username')
        .isString()
        .withMessage('username should be a string'),
    body('password')
        .isLength({ min: 5 })
        .withMessage('password must be at least 5 characters long'),
];

const addShoppingListSchema = [
    body('userId')
        .notEmpty()
        .withMessage('id should be present and should be a number'),
    body('shoppingListName')
        .isString()
        .notEmpty()
        .isLength({ min: 1, max: 46 })
        .withMessage('shoppingListName should be string of max 46 characters'),
    body("description")
        .optional()
        .isString()
        .isLength({ max: 240 })
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
        .toInt()
        .isInt()
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
        .isInt({ min: 1 })
        .withMessage('user id is compulsory to process the request'),
    body('name')
        .optional()
        .isString()
        .isLength({ min: 1, max: 46 })
        .withMessage('name should only be a string and not empty'),
    body('description')
        .optional()
        .isString()
        .isLength({ max: 240 })
        .withMessage('desctiption can contain only upto 240 characters')
]

const deleteShoppingListSchema = [
    param('listId')
        .toInt()
        .isNumeric()
        .withMessage('id should be a number'),
    body('userId')
        .isInt({ min: 1 })
        .withMessage('user id is compulsory to process the request'),
]

const addItemSchema = [
    param('listId')
        .toInt()
        .isNumeric()
        .withMessage('id should be a number'),
    body('userId')
        .notEmpty()
        .toInt()
        .isInt()
        .withMessage('id should be present and should be a number'),
    body('itemList')
        .notEmpty()
        .isArray({ min: 1 })
        .withMessage('list of items shoulb an array and not empty'),
    body('itemList.*.name')
        .notEmpty()
        .isString()
        .withMessage('name of the item should be specified'),
    body('itemList.*.quantity')
        .notEmpty()
        .toInt()
        .isInt()
        .withMessage('quantity should be specified'),
    body('itemList.*.isleId')
        .notEmpty()
        .withMessage('isleId should be specified')
]

const updateItemSchema = [
    param('listId')
        .toInt()
        .isNumeric()
        .withMessage('id should be a number'),
    body('userId')
        .notEmpty()
        .toInt()
        .isInt()
        .withMessage('id should be present and should be a number'),
    body('itemList')
        .notEmpty()
        .isArray({ min: 1 })
        .withMessage('list of items shoulb an array and not empty'),
    body('itemList.*.id')
        .notEmpty()
        .toInt()
        .isInt()
        .withMessage('id should be specified and a number'),
    body('itemList.*.name')
        .notEmpty()
        .isString()
        .withMessage('name of the item should be specified'),
    body('itemList.*.quantity')
        .notEmpty()
        .toInt()
        .isInt()
        .withMessage('quantity should be specified'),
]

const deleteItemSchema = [
    param('listId')
        .toInt()
        .isNumeric()
        .withMessage('id should be a number'),
    body('userId')
        .notEmpty()
        .toInt()
        .isInt()
        .withMessage('id should be present and should be a number'),
    body('itemList')
        .notEmpty()
        .isArray({ min: 1 })
        .withMessage('list of items shoulb an array and not empty'),
    body('itemList.*.id')
        .notEmpty()
        .toInt()
        .isInt()
        .withMessage('id should be specified and a number')
]

const grantShoppingListAccessSchema = [
    param('listId')
        .toInt()
        .isNumeric()
        .withMessage('id should be a number'),
    body('userId')
        .notEmpty()
        .toInt()
        .isInt({ min: 1 })
        .withMessage('user id is compulsory to process the request'),
    body('assignedUserId')
        .notEmpty()
        .toInt()
        .isInt({ min: 1 })
        .withMessage('assignedUserId id is compulsory to process the request'),
]

module.exports = {
    registerSchema,
    loginSchema,
    addShoppingListSchema,
    updateShoppingListSchema,
    deleteShoppingListSchema,
    addItemSchema,
    updateItemSchema,
    deleteItemSchema,
    grantShoppingListAccessSchema
}