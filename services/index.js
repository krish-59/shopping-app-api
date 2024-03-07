const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var db = require('../models');
const jwtAuth = require('../services/authentication')

const register = async (body) => {
  try {
    if (!body) {
      return {
        status: 400,
        message: 'please send the user details'
      }
    }
    const { username, password, email, mobileNumber } = body;
    const hashedPassword = await bcrypt.hash(password, 10);
    let query = `INSERT INTO shoppingApp.users (username, mobile_number, email, password) VALUES ('${username}','${mobileNumber}','${email}','${hashedPassword}');`
    const result = await db.executeQuery(query);
    return {
      status: 201,
      message: { data: {message: "user registered succesfully"}}
    }
  } catch (error) {
    return {
      status: 500,
      message: {data: {message: error.sqlMessage? error.sqlMessage:"something went wrong"}}
    }
  }
}

const login = async (body) => {
  try {
    if (!body) {
      return {
        status: 400,
        message: 'please send the user details'
      }
    }
    const { username, password } = body;
    const findUser = `SELECT *FROM shoppingApp.users where username = '${username}';`
    const user = await db.executeQuery(findUser)
    if (!user.length) {
      return {
        status: 403,
        message: "user not found"
      }
    }
    const passwordMatch = await bcrypt.compare(password, user[0].password)

    if (passwordMatch) {
      const token = await jwtAuth.createToken(user[0])
      return {
        status: 200,
        message: {data:{token,message:"Login Successful"}}
      }
    }
  } catch (error) {
    console.error(error)
  }
}

const creatShoppingList = async (body) => {
  try {
    const { userId, shoppingListName, description, itemList = [] } = body;
    const createlistQuery = `INSERT INTO shoppingApp.shopping_lists (name, created_userId, description) VALUES ('${shoppingListName}', ${userId}, '${description}');`
    const shoppingList = await db.executeQuery(createlistQuery);
    const insertId = shoppingList.insertId;
    const assignShoppingListQuery = `INSERT INTO shoppingApp.shopping_list_access (created_user_id, access_user_id, shopping_list_id) VALUES (${userId}, ${userId}, ${insertId})`
    const assignShoppingList = await db.executeQuery(assignShoppingListQuery);
    if (itemList.length === 0) {
      return {
        status: 201,
        message: { data: { message: shoppingList } }
      }
    }
    for (const item of itemList) {
      const result = await insertItems(item, insertId)
    }
    const listItemsQuery = `SELECT *from shoppingApp.list_items where shopping_list_id = ${insertId}`
    const listItems = await db.executeQuery(listItemsQuery);
    return {
      status: 201,
      message: { data: { message: listItems } }
    }
  } catch (error) {
    console.error(error)
  }
}

const updateShoppingList = async (body, param) => {
  try {
    const {name, description, userId} = body;
    const {listId} = param;
    const checkAccess = await checkAccessToShoppingList(listId, userId)
    if(!checkAccess){
      return{
        status: 403,
        message: { data: { message: "the shopping list is not accessble by the user to update"}}
      }
    }
    const descriptionField = description?`, description = '${description}'`:'';
    const shoppingListUpdateQuery = `UPDATE shoppingApp.shopping_lists SET name = '${name}' ${descriptionField} WHERE (id = '${listId}');`;
    const result = await db.executeQuery(shoppingListUpdateQuery);
    return {
      status: 200,
      message: { data: { message: "Shopping list updated succesfully" } }
    }
  } catch (error) {
    console.error(error)
    return {
      status: 500,
      message: {data: {message: "something went wrong"}}
    }
  }
}

const deleteShoppingList = async (body, param) => {
  try {
    const {userId} = body;
    const {listId} = param;
    const checkAccess = await checkAccessToShoppingList(listId, userId)
    if(!checkAccess){
      return{
        status: 403,
        message: { data: { message: "the shopping list is not accessble by the user to delete"}}
      }
    }
    /* instead of all these db call we can probably create trigger in sql db to trigger the delete functions in different tables */
    const deleteShoppingListQuery = `DELETE FROM shoppingApp.shopping_lists WHERE (id = '${listId}');`
    const deleteShoppingListAccessQuery = `DELETE FROM shoppingApp.shopping_list_access WHERE (shopping_list_id = '${listId}');`
    const deleteShoppingListItemsQuery = `DELETE FROM shoppingApp.list_items WHERE (shopping_list_id = '${listId}');`

    const deleteShoppingList = await db.executeQuery(deleteShoppingListQuery);
    const deleteShoppingListAccess = await db.executeQuery(deleteShoppingListAccessQuery);
    const deleteShoppingListItems = await db.executeQuery(deleteShoppingListItemsQuery);

    return {
      status: 200,
      message: { data: { message: "Shopping list deleted successfully"}}}

  } catch (error) {
    console.error(error)
    return {
      status: 500,
      message: {data: {message: "something went wrong"}}
    }

  }
}

/* miscellaneous functions */

const insertItems = async (item, insertId) => {
  try {
    const addItemQuery = `INSERT INTO shoppingApp.list_items (name, quantity, shopping_list_id, aisle_id) VALUES ('${item.name}',${item.quantity},${insertId},${item.isleId})`
    const insertItem = await db.executeQuery(addItemQuery);
    return insertItem
  } catch (error) {
    console.log(error)
  }
}

const checkAccessToShoppingList = async (listId, userId) => {
  try {
    const checkAccessQuery = `SELECT count(id) as count FROM shoppingApp.shopping_list_access where created_user_id = ${userId} and shopping_list_id = ${listId}`
    const checkAccess = await db.executeQuery(checkAccessQuery);
    return checkAccess[0].count
  } catch (error) {
    console.error(error)
  }
}



module.exports = {
  register,
  login,
  creatShoppingList,
  updateShoppingList,
  deleteShoppingList
}