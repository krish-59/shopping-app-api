var express = require('express');
var router = express.Router();
const service = require('../services/index');
const {verifyToken} = require('../services/authentication')
const validate = require('../schema/requestSchema')
const validateRequestSchema = require('../middlewares/requestSchemaValidator')


router.get('/', async (req, res) => {
  res.send('Hello world!');
});

/* User API's */
router.post(
  '/register',
  validate.registerSchema,
  validateRequestSchema,
  async ( req, res)=>{
    const result = await service.register(req.body)
    res.status(result.status).send(result.message)
})

router.post(
  '/login', 
  validate.loginSchema,
  validateRequestSchema,
  async ( req, res)=>{
    const result = await service.login(req.body)
    res.status(result.status).send(result.message)
})

/* Shopping List API's */
router.post(
  '/verify',
  verifyToken,
  async ( req, res)=>{
    res.status(200).json('user verified')
})

router.post(
  '/shoppingList', 
  verifyToken,
  validate.addShoppingListSchema,
  validateRequestSchema,
  async (req, res) => {
    const list = await service.creatShoppingList(req.body)
    res.status(list.status).send(list.message)
})

router.put(
  '/shoppingList/:listId',
  verifyToken,
  validate.updateShoppingListSchema,
  validateRequestSchema,
  async (req, res) => {
    if(Object.keys(req.body).length === 0){
      res.status(400).send({error:{message:"Body shouldn't be empty"}})
    }
    const result = await service.updateShoppingList(req.body,req.params)
    res.status(result.status).send(result.message)
  }
)

router.delete(
  '/shoppingList/:listId',
  verifyToken,
  validate.deleteShoppingListSchema,
  validateRequestSchema,
  async (req, res) => {
    const result = await service.deleteShoppingList(req.body,req.params)
    res.status(result.status).send(result.message)
  }
)

/* Shopping List Items API's */
router.post(
  '/shoppingList/items/:listId',
  verifyToken,
  validate.addItemSchema,
  validateRequestSchema,
  async (req, res) => {
    const result = await service.addItemsToShoppingList(req.body, req.params)
    res.status(result.status).send(result.message)
  }
)

router.put(
  '/shoppingList/items/:listId',
  verifyToken,
  validate.updateItemSchema,
  validateRequestSchema,
  async (req, res) => {
    const result = await service.updateItemsInShoppingList(req.body, req.params)
    res.status(result.status).send(result.message)
  }
)

router.delete(
  '/shoppingList/items/:listId',
  verifyToken,
  validate.deleteItemSchema,
  validateRequestSchema,
  async (req, res) => {
    const result = await service.deleteItemsInShoppingList(req.body, req.params)
    res.status(result.status).send(result.message)
  }
)

/* Collabaration API's */

router.post(
  '/shoppingList/grantAccess/:listId',
  verifyToken,
  validate.grantShoppingListAccessSchema,
  validateRequestSchema,
  async (req, res) => {
    const result = await service.giveAccessToShoppingList(req.body, req.params)
    res.status(result.status).send(result.message)
  }
)

module.exports = router;
