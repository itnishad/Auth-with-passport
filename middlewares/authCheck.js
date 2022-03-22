const isValid = (req, res, next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/v1/login');
}

const isInvalid = (req, res, next)=>{
    if(req.isAuthenticated()){
        return res.redirect('/')
    }
    next();
}

module.exports = {isValid,isInvalid}