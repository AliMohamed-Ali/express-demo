const express= require('express');
const app = express();
var cors = require('cors');
const {port} =require('./config')
const userRouter = require('./router/user');
const todoRouter = require('./router/todo');
const dnsRouter = require('./router/dns');

require('./db.js')

app.use(express.json())
app.use(cors())

app.use(['/user','/users'],userRouter)
app.use('/todo',todoRouter)
app.use('/dns',dnsRouter)

app.use((err,req,res,next)=>{
    err.statusCode = err.statusCode|| 500;
    res.send({
        message: err.statusCode<500 ? err.message : "some thing went wrong",
        error:err.errors||{}
    })
})
app.listen(port,()=>{console.log(`lisen in port ${port}`)})