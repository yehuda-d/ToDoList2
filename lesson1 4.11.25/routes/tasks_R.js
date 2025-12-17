const express = require('express');
const router = express.Router();
const {
    getAllTasks
} =  require('../controller/tasks_C');
const {validValues} =  require('../middelware/tasks_MID');
const {isLoggedIn} =  require('../middelware/auth_MID');
const { isValidId } = require('../middelware/tasks_MID');

router.get('/',isLoggedIn, getAllTasks);

module.exports = router;