const customError  = require('../helper/customError');
const {validationResult } = require('express-validator');

module.exports = (validationArr)=> async (req,res,next)=>{
    const promises = validationArr.map(validator=>validator.run(req));
    await Promise.all(promises);

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const err = new customError("Validation is required",422,errors.mapped())
        return next(err);
    }
    next();
  }