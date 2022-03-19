const passport = require('passport')
const express = require('express');
const router = express.Router();

//Model
const User = require('./model/user.model');

//Controller
const UserController = require('./controllers/user.controller')

//MiddleWare
const {
    userValidators, 
    userValidatorResult
} = require('./middlewares/authvalidation')

router.get('/login',UserController.getUserRegistration)
router.post('/login', passport.authenticate('local', {failureRedirect:'/login', successRedirect:'/v1/nishad'}))
router.get('/nishad', (req,res,next)=>{ 
    res.status(200).json({
        message:"Wellcome Nishad"
    })
})
router.get('/register', (req,res,next) =>{
    res.render("register", {title: "Registration"});
})
router.post('/register',[userValidators,userValidatorResult], UserController.postUserRegistration)

module.exports = router;