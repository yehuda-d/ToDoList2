const express = require('express');
const { valuesToEdit } = require('../middelware/users_MID');
const router = express.Router();

const {valuesToAdd,encryptPass} = require('../middelware/auth_MID.js');
const { addUser } = require('../controller/auth_C.js');

router.post('/reg',valuesToAdd,encryptPass);


module.exports = router;