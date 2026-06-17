const { getuser } = require('../PROJECT-01/service/auth');

function restrictionToLoggedinuserOnly(req, res, next) {
    const sessionId = req.cookies.uid;
    
    if (!sessionId) {
        return res.redirect('/login');
    }
    
    const user = getuser(sessionId);
    if (!user) {
        return res.redirect('/login');
    }
    
    req.user = user;
    next();
}

function checkAuth(req, res, next) {
    const sessionId = req.cookies.uid;
    
    if (!sessionId) {
        return res.redirect('/login');
    }
    
    const user = getuser(sessionId);
    if (!user) {
        return res.redirect('/login');
    }
    
    req.user = user;
    next();
}

module.exports = {
    restrictionToLoggedinuserOnly,
    checkAuth,
};
