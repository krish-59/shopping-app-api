var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const service = require('../services/index');
const jwtAuth = require('../services/authentication')

/* GET home page. */

router.get('/', async (req, res) => {
  res.send('Hello world!');
});

router.post('/register', async ( req, res)=>{
  try {
    const result = await service.register(req.body)
    if(result){
      res.status(201).send('user registered succesfully')
    }
  } catch (error) {
    console.log(error)
    res.status(500).send('internal server error')
  }
})

router.post('/login', async ( req, res)=>{
  try {
    const result = await service.login(req.body)
    res.status(result.status).send(result.message)
    } catch (error) {
    console.log(error)
    res.status(500).send('internal server error')
  }
})


router.post('/verify', async ( req, res)=>{
  try {
    const token = req.headers.authorization
    const verified = await jwtAuth.verifyToken(token)
    if(verified){
      res.status(200).send('verified')
    }else{
      res.status(403).send('forbiden')
    }
    } catch (error) {
    console.log(error)
    res.status(500).send('internal server error')
  }
})

router.post('/shoppingList', async( req, res) => {
  try {
    const token = req.headers.authorization
    const verified = await jwtAuth.verifyToken(token)
    if(verified){
      const list = await service.creatShoppingList(req.body)
      res.status(200).send('verified')
    }else{
      res.status(403).send('forbiden')
    }
  } catch (error) {
    
  }
})


module.exports = router;
