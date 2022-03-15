const {check, validationResult} = require('express-validator');
const User = require('../model/user.model')

const userValidators = [
    check('username')
    .isLength( {min:3} )
    .withMessage("Required Minimum Three Character ")
    .trim(),

    check('email')
    .isEmail()
    .withMessage("Valid email requried")
    .custom( async(value) =>{
        const user = await User.findOne({email: value})
        if(user){
            throw new Error("E-mail already in use")
        }
    })
    .trim(),

    check('password')
    .isLength({min:5})
    .withMessage("Required Minimum 5 Character"),
    
    check('confirmPassword')
    .isLength({min:5})
    .custom((value, {req}) =>{
        if (value !== req.body.password) {
            throw new Error('Password confirmation is incorrect');
        }else{
            return true;
        }
    })

]

userValidatorResult = (req, res, next) =>{
    const mapError = validationResult(req).mapped();

    if(Object.keys(mapError).length === 0){
        next();
    }else{
        res.status(500).json({
            msg: mapError
        });
    }
}

module.exports = {
    userValidators,
    userValidatorResult
}