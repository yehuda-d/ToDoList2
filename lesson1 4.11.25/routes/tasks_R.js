const express = require('express');
const router = express.Router();
const {
    getAllTasks,
    addTask,
    getOneTask,
    deleteTask
} =  require('../controller/tasks_C');
const {isLoggedIn} =  require('../middelware/auth_MID');
const { isValidId } = require('../middelware/tasks_MID');
const {validValues} =  require('../middelware/tasks_MID');

router.get('/',isLoggedIn, getAllTasks);
router.post('/',isLoggedIn,validValues, addTask);
router.get('/:id',isLoggedIn,isValidId,getOneTask);
router.delete('/:id',isLoggedIn,isValidId, deleteTask)

module.exports = router;