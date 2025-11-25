const express = require('express');
const router = express.Router();
const { valuesToEdit } = require('../middelware/users_MID');

const {valuesToAdd,encryptPass} = require('../middelware/auth_MID.js');
const { addUser } = require('../controller/auth_C.js');

router.post('/reg',valuesToAdd,encryptPass,addUser);



module.exports = router;