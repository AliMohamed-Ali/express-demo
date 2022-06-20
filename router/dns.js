const express = require('express');
const router  = express.Router();
const dns = require('dns');

router.get('/:domain',(req,res,next )=>{
    dns.resolve(req.params.domain,(err,records)=>{
        if(err) {
            err.statusCode = 404;
            err.message = "domain not found";

            return next(err);   
        }
        res.send(records)
    })
});



module.exports=router