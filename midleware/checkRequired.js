module.exports = (params)=>(req,res,next)=>{
    const recifingParams = Object.keys(req.body);
    const missingParams = params.filter(paramName=>!recifingParams.includes(paramName));
    if(missingParams.length){
        const error = new Error("required parameters missing");
        error.statusCode=422;
        error.errors = missingParams.reduce((agg,param)=>{
            agg[param] = {type:"required"};
            return agg;
        },{});
        return next(error)
    }
    next();

}