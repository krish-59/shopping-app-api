const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { token } = require('morgan');

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

const verifyToken = async(token) => {
    try {
        token = token.split(' ')
        let verified = jwt.verify(token[1], 'futuristiclabs')
        return verified
    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = {
    createToken,
    verifyToken
}