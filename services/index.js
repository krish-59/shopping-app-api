const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var db = require('../models');
const jwtAuth = require('../services/authentication')

const register = async (body)=>{
  try {
    if(!body){
      return {
        status: 400,
        message: 'please send the user details'
      }
    }
    const { username, password,email,mobileNumber } = body;
    const hashedPassword = await bcrypt.hash(password, 10);
    let query = `INSERT INTO shoppingApp.users (username, mobile_number, email, password) VALUES ('${username}','${mobileNumber}','${email}','${hashedPassword}');`
    const result = await db.executeQuery(query);
    return result
  } catch (error) {
    return false
  }
}

const login = async (body) => {
  try {
    if(!body){
      return {
        status: 400,
        message: 'please send the user details'
      }
    }
    const {username,password} = body;
    const findUser = `SELECT *FROM shoppingApp.users where username = '${username}';`
    const user = await db.executeQuery(findUser)
    if(!user.length){
      return {
        status: 403,
        message: "user not found"
      }
    }
    const passwordMatch = await bcrypt.compare(password,user[0].password)

    if(passwordMatch){
      const token = await jwtAuth.createToken(user[0])
      return {
        status: 200,
        message: token
      }
    }
  } catch (error) {
    
  }
}

const creatShoppingList = async (body) => {
  console.log(body)
  const {userId, shoppingListName} = body;
  let createlistQuery = `INSERT INTO shoppingApp.shopping_lists (name, created_userId) VALUES ('${shoppingListName}', ${userId});`
  const shoppingList = await db.executeQuery(createlistQuery);
  let listId = shoppingList.insertId;
}



module.exports = {
  register,
  login,
  creatShoppingList
}