const express = require('express');
const {
    userById, 
    allUsers, 
    getUser, 
    updateUser, 
    deleteUser
} = require ("../controllers/user");
const { requireSignin} = require("../controllers/auth");



const router = express.Router();

router.get('/users', allUsers);
//this will allow users to see other profiles but not add edit or delete their posts
router.get('/user/:userId', requireSignin, getUser);
router.put('/user/:userId', requireSignin, updateUser);
router.delete('/user/:userId', requireSignin, deleteUser);

//any route containing :userId, our appl will first execute userByID()
router.param("userId", userById);

module.exports = router;