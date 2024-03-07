var express = require('express');
var router = express.Router();
const service = require('../services/index');
const {verifyToken} = require('../services/authentication')
const validate = require('../schema/requestSchema')
const validateRequestSchema = require('../middlewares/requestSchemaValidator')


router.get('/', async (req, res) => {
  res.send('Hello world!');
});

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
  async ( req, res)=>{
  try {
    const result = await service.login(req.body)
    res.status(result.status).send(result.message)
    } catch (error) {
    console.error(error)
    res.status(500).send('internal server error')
  }
})

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
  try {
      const list = await service.creatShoppingList(req.body)
      res.status(list.status).send(list.message)
  } catch (error) {
    res.status(list.status).send(list.message)
  }
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

module.exports = router;
