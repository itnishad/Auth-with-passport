const passport = require('passport')
const express = require('express');
const router = express.Router();

//Model
const User = require('./model/user.model');

//Controller
const UserController = require('./controllers/user.controller');

//JWTStrategy

//MiddleWare
const {
    userValidators, 
    userValidatorResult
} = require('./middlewares/authvalidation');
const { session } = require('passport/lib');

router.get('/login', UserController.getUserRegistration)

router.get('/register', (req,res,next) =>{
    res.render("register", {title: "Registration"});
})

router.post('/register',[userValidators,userValidatorResult], UserController.postUserRegistration)

router.get('/faysal',passport.authenticate('jwt',{session:false}), (req, res,next)=>{
    res.send('<h1>Hello Faysal</h1>');
})
//JWTStrategyEnd


//Local
//MiddleWare
// const {
//     userValidators, 
//     userValidatorResult
// } = require('./middlewares/authvalidation')
// const {isValid, isInvalid} = require('../../middlewares/authCheck')

// router.get('/login', isInvalid, UserController.getUserRegistration)
// router.post('/login', passport.authenticate('local', {failureRedirect:'login', successRedirect:'/v1/nishad'}))

// router.get('/register', (req,res,next) =>{
//     res.render("register", {title: "Registration"});
// })
// router.post('/register',[userValidators,userValidatorResult], UserController.postUserRegistration)

// router.all('*', isValid, (req,res,next)=>{
//     next();
// })
// router.get('/nishad', (req,res,next)=>{ 
//     res.send('<h1>Hello Nishad</h1>');
// })
// router.get('/faysal', (req, res,next)=>{
//     res.send('<h1>Hello Faysal</h1>');
// })

//LocalENd


module.exports = router;