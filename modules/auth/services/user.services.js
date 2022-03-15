const repositorie = require('../repositories/user.repositories');
const bcrypt = require ('bcrypt');
const res = require('express/lib/response');

exports.userSave = async(user) =>{
    try{
        let hashPassword = await bcrypt.hash(user.password, 10);

        let newUser = {
            username: user.username,
            email: user.email,
            password: hashPassword
        }

        return registerUser = repositorie.userSave(newUser);

    }catch(err){
        console.log(err);
    }
    
    

    
}