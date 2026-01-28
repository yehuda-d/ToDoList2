console.log("users_R loaded");
const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    getOneUser,
    deleteUser,
    updateUser,
} =  require('../controller/users_C.js');
const { addUser } = require('../controller/auth_C.js');
const {isValidId,valuesToEdit} =  require('../middelware/users_MID');
const {isLoggedIn, valuesToAdd, encryptPass} =  require('../middelware/auth_MID');

router.get('/',isLoggedIn, getAllUsers);

router.get('/:id',isValidId,getOneUser);

router.post('/',valuesToAdd,encryptPass, addUser);

router.delete('/:id',isValidId,deleteUser);

router.patch('/:id',isValidId,valuesToEdit, updateUser);



module.exports = router;
