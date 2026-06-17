const shortid = require('shortid');
const URL =     require('../models/url');
async function handleGenerateNewShortURL(req, res) {
   const body = req.body;
    if (!body.redirectUrl) {
        return res.status(400).json({ message: 'redirectUrl is required' });
    }
    const shortId = shortid();
    
    await URL.create({
        shortId: shortId,
        redirectUrl: body.redirectUrl,  
        visitHistory: [],
        createdBy:req.user._id,
        
    });
    return res.render('home' ,{
        id: shortId,
    } );
    
    
}
async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({totalclicks: result.visitHistory.length,analytics: result.visitHistory});
} 

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics
};





//
// const User = require('../models/user'); 

// async function handleGetAllUsers(req, res) {
//     const allUsers = await User.find({});
//     return res.json(allUsers);
// }

// async function handleGetUserById(req, res) {
//    const user = await User.findById(req.params.id);
//     if (!user) {return res.status(404).json({error: "User not found"});}
//     return res.json(user);
// }

// async function handleupdateUserById(req, res) {
//      await User.findByIdAndUpdate(req.params.id, { lastname: "Smith" }, { returnDocument: "after" });
//     return res.json({status : "success"});
// }

// async function handleDeleteUserById(req, res) {
//     await User.findByIdAndDelete(req.params.id);
//     return res.json({status : "success"});
// }

// async function handleCreateNewUser(req, res) {
//     const body = req.body;

//         if (
//             !body.first_name ||
//             !body.last_name ||
//             !body.email ||
//             !body.job_title ||
//             !body.gender
//         ) {
//             return res.status(400).json({ message: 'All fields are required' });
           
//         }

//           const result = await User.create({
//             firstname: body.first_name,
//             lastname: body.last_name,
//             email: body.email,
//             jobtitle: body.job_title,
//             gender: body.gender,
//         });

//         return res.status(201).json({ msg : "success" , Id: result._id });
// }

// module.exports = {
  
// handleGetAllUsers,
//    handleGetUserById,
//    handleupdateUserById,
//    handleDeleteUserById,
//    handleCreateNewUser,
// };