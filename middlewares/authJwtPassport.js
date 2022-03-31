
const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../modules/auth/model/user.model');
const bcrypt = require ('bcrypt');

opt = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey  : process.env.JWTSECRECTKEY

}
const JWTStrategyFunc = new jwtStrategy(opt, async(payload, done)=>{

    try{
        const pUser = await User.findOne({_id:payload.sub});
        if(!pUser){
            return done(null, false,  { message: 'Incorrect username or password.' })
        }
        return done(null, pUser);
    }catch(err){
        done(err)
    }
})

passport.use(JWTStrategyFunc);