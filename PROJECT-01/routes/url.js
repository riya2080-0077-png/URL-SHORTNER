const express = require('express');
const {handleGenerateNewShortURL,handleGetAnalytics} = require('../controllers/url');
const router = express.Router();

router.post('/', handleGenerateNewShortURL);
router.get('/analytics/:shortId', handleGetAnalytics);



module.exports = router;

//
// const express = require('express');
// const {handleGetAllUsers, 
//    handleGetUserById, 
//     handleupdateUserById,
//     handleDeleteUserById,
//     handleCreateNewUser} = require('../controllers/controller');

//     const router = express.Router();

// router.post('/')
// .get(handleGetAllUsers)
// .post(handleCreateNewUser);


// router
// .route("/:id")
// .get(handleGetUserById)
// .patch(handleupdateUserById)
// .delete(handleDeleteUserById);

   
// module.exports = router;

