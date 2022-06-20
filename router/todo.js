const express = require('express');
const router  = express.Router();

router.post('/',()=>{

});
router.get('/',(req,res)=>{
    res.send('hello from user router')
    console.log("router")
});
router.delete('/:id',()=>{

});
router.patch('/:id',()=>{
    
})


module.exports = router