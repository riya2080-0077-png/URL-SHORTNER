const {v4: uuidv4} = require('uuid');
const User = require('../models/user');
const {setuser} = require('../service/auth');

async function handleusersignup(req, res) {
    const { name, email, password } = req.body;
     await User.create({
            name,
            email,
            password,
        });

    
        return res.redirect('/');

}
    
        

async function handleuserlogin(req, res) {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email, password });
    if (!foundUser) {
        return res.render('login', {
            error: 'Invalid email or password',
        });
    }

    const sessionId = uuidv4();
    setuser(sessionId, foundUser);

    res.cookie("uid", sessionId);
    return res.redirect('/');
}

module.exports = {
    handleusersignup,
    handleuserlogin,
};