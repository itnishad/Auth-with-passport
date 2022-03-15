const User = require('../model/user.model')

exports.userSave = async(userObj) =>{
    const user = new User(userObj);
    try{
       return user.save();
    }catch(err){
        console.log(err);
    }
}