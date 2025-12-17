const express = require('express');
const router = express.Router();
const {
    getAllCategories,
    addCategory,
    getCategory,
    deleteCategory,
    updateCategory
    
} =  require('../controller/categories_C');
const {validValues} =  require('../middelware/categories_MID.js');
const {isLoggedIn} =  require('../middelware/auth_MID');
const { isValidId } = require('../middelware/users_MID.js');

router.get('/',isLoggedIn, getAllCategories);
router.post('/',isLoggedIn,validValues,addCategory);
router.get('/:id',isLoggedIn,isValidId,getCategory);
router.delete('/:id',isLoggedIn,isValidId, deleteCategory);
router.patch('/:id',isLoggedIn,isValidId,validValues, updateCategory);



module.exports = router;
