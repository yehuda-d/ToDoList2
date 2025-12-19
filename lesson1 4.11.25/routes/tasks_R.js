const express = require('express');
const router = express.Router();
const {
    getAllTasks,
    addTask,
    getOneTask,
    deleteTask,
    updateTask
} =  require('../controller/tasks_C');
const {isLoggedIn} =  require('../middelware/auth_MID');
const { isValidId } = require('../middelware/tasks_MID');
const {ValuesToAdd} =  require('../middelware/tasks_MID');
const { valuesToEdit } = require('../middelware/tasks_MID');

router.get('/',isLoggedIn, getAllTasks);
router.post('/',isLoggedIn,ValuesToAdd, addTask);
router.get('/:id',isLoggedIn,isValidId,getOneTask);
router.delete('/:id',isLoggedIn,isValidId, deleteTask)
router.patch('/:id',isLoggedIn,isValidId,valuesToEdit, updateTask)

module.exports = router;