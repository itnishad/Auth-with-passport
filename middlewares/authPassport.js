const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../modules/auth/model/user.model');
const bcrypt = require ('bcrypt');

const localStrategyObj = new LocalStrategy(async(username, password, done)=>{
        try{
            const usetD = await User.findOne({email:username});
            console.log(usetD);
            if(!usetD)   return done(null, false, { message: 'Incorrect username or password.' })
            const match = await bcrypt.compare(password, usetD.password);
            if(!match) return done(null, false, { message: 'Incorrect username or password.' });
            return done(null, usetD)
        }catch(err){
            return(err)
        }
        
});
passport.use(localStrategyObj);

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});
    