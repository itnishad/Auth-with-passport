const services = require('../services/user.services');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.getUserRegistration = (req,res,next) =>{
    res.render("login", {title: "Login"});
}

exports.postUserRegistration = async(req,res,next) =>{
    
    const registerUser = await services.userSave(req.body);
    try{
        const payload = {
            sub: registerUser._id,
            username: registerUser.username
        }
        const jwtToken = await jwt.sign(payload,process.env.JWTSECRECTKEY);
        const bearerToken = 'Bearer '+jwtToken;

        res.send(bearerToken);

        // res.render('login',{
        //     title: "Login",
        //     user: registerUser,
        //     headers: {
        //         Authorization: bearerToken
        //       }
        // });
    }catch(err){
        console.log(err);
    }
}

exports.postUserLogin = async()=>{
    
}