const express = require('express');
const router = express.Router();
const { valuesToEdit } = require('../middelware/users_MID');

const {valuesToAdd,encryptPass,valuesToLogin} = require('../middelware/auth_MID.js');
const { addUser,login, createJwt } = require('../controller/auth_C.js');

router.post('/reg',valuesToAdd,encryptPass,addUser,);
router.post('/login',valuesToLogin,login,createJwt);




module.exports = router;