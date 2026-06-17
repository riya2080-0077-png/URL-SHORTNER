
async function restrictionToLoggedinuserOnly(req, res, next){
  const userid = req.cookie?.uid;

    if(!useruid) return res.redirect('/login');
    const user = getuser(useruid);

    if(!user) return res.redirect('/login');
    req.user = user
    next();
}

async function checkAuth(req,res,next){
    const userid = req.cookie?.uid;

   
    const user = getuser(useruid);

    
    req.user = user
    next();
}



module.exports ={
    restrictionToLoggedinuserOnly,
    checkAuth,
}