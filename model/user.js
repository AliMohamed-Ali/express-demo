const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const util = require("util");
const _ = require('lodash');
const {saltRounds,jwtSecret} = require('../config')


const signJWT = util.promisify(jwt.sign);
const verifyJWT = util.promisify(jwt.verify);




const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        index: true
    },
    password: {
        type: String,
        required: true
    }

},{
    toJSON:{
        transform: (doc,ret)=> _.omit(ret,['__v' ,'password'])
    }
});

schema.pre('save', async function () {
    const currentDocument = this;
    if (currentDocument.isModified('password')) {
        currentDocument.password = await bcrypt.hash(currentDocument.password, saltRounds);
    }
});
schema.methods.checkPassword = function (plainPassword) {
    const currentDocument = this;
    return bcrypt.compare(plainPassword, currentDocument.password);

}
schema.methods.generateToken = function () {
    const currentDocument = this;
    return signJWT({ id: currentDocument.id }, jwtSecret, { expiresIn: "10m" })
}
schema.statics.getUserFromToken = async function(token){
    const User = this;
    const {id} = await verifyJWT(token,jwtSecret);
    console.log(id)
    const user = User.findById(id);
    return user;
}

const User = mongoose.model('User', schema);
module.exports = User;
