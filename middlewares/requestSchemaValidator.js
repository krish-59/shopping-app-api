const {req,res,next} = require('express');
const {validationResult} = require('express-validator');


const validateRequestSchema = (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).send(errors)
    }
    next();
}
module.exports = validateRequestSchema