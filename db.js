const mongoose = require('mongoose');
const {mongoURI} = require('./config')

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true}
     ).then(()=>{
        console.log("connect mongose db")
}).catch((err)=>{
    console.error("erro to connect to db");
    process.exit(1) 
});

