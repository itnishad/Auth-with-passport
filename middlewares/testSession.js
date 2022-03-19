const testSession = (req, res, next)=>{
    console.log(req.session);
    next();
}

module.exports=testSession