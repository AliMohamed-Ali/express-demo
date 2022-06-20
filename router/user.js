const express = require('express');
require('express-async-errors');
const router = express.Router();
const User = require('../model/user');
const checkRequired = require('../midleware/checkRequired');
const { check } = require('express-validator');
const checkValidation = require('../midleware/checkValidation');
const authentication = require('../midleware/authentication');
const customError = require('../helper/customError');



// router.use(bodyParser.json())


//get users
//create users
//delete users

router.post('/',
  // ,
  //   // username must be an email
  //   body('username').isEmail(),
  //   // password must be at least 5 chars long
  //   body('password').isLength({ min: 5 }),
  checkValidation([check('username').isEmail(), check('password').isLength({ min: 5 })]),

  async (req, res, next) => {
    const createUser3 = new User({
      "username": req.body.username,
      "age": req.body.age,
      "password": req.body.password,
    });
    const user = await createUser3.save();
    res.status(200).send(user)
  });
router.get('/', async (req, res, next) => {
  const findUser = await User.find({});
  res.send(findUser)
});
router.get('/profile',
  authentication
  , (req, res, next) => res.send(req.user));
router.post("/login",
  checkRequired(["username", "password"]),
  async (req, res, next) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user) throw new customError("Wrong username or password", 401);
    const isMatch = await user.checkPassword(req.body.password);
    if (!isMatch) throw new customError("Wrong username or password", 401);
    const token = await user.generateToken();
    res.json({
      user,
      token,
      message: "Welcome back"
    })
  })
router.get('/:id', (req, res) => {

})
router.delete('/:id', () => {

});
router.patch('/:id', () => {

});




module.exports = router