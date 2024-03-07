const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {req,res,next} = require('express'); 

const createToken = async(user) => {
    try {
        let expiresOn = Math.floor(Date.now()/1000)+86400
        let payload = {
            "exp": expiresOn,
            "id": user.id
        }
        const token = jwt.sign(payload, 'futuristiclabs')
        return token
    } catch (error) {
        console.log(error)
    }
}

const verifyToken = async(req,res,next) => {
    try {
        let token = req.headers.authorization.split(' ')
        let verified = jwt.verify(token[1], 'futuristiclabs')
        if(verified) {
            next()
        }else{
            return res.status(400).json('Invalid Token')
        }
    } catch (error) {
        console.error(error,"error")
        return res.status(400).json('Invalid Token')
    }
}

module.exports = {
    createToken,
    verifyToken
}