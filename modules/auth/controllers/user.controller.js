const services = require('../services/user.services');

exports.getUserRegistration = (req,res,next) =>{
    res.render("login", {title: "Login"});
}

exports.postUserRegistration = async(req,res,next) =>{
    const registerUser = services.userSave(req.body);

    res.render('login',{
        title: "Login",
        user: registerUser
    });
}