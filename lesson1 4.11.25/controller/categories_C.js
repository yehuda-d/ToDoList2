// const { use } = require('react');
const {getAll,add,getOne,deleteOne} = require('../model/categories_M_new');

async function getAllCategories(req, res) {
    try {
        
        let categories = await getAll();
        
        if(categories.length == 0){
            return res.status(400).json({message:"no categories found"});
        }
        res.status(200).json(categories);
        
    } catch (err) {
        res.status(500).json({message:"Server error"});
    }
}

async function addCategory(req, res) {
    try {
        let categoryName = req.body.categoryName;
        let user_id = req.user.id;
      
        let categoryId = await add({categoryName,user_id});

        if(!categoryId){
                       
            return res.status(500).json({message:"Server error: Could not add category"});
        }

        res.status(201).json({message:"category added successfully"});//להחזיר איידי של המשתמש החדש
    }
    catch (err) {
        
        res.status(500).json({message:"Server error"});
    }   
}
async function getCategory(req, res) {
    try {
        let category = await getOne(req.id);       
        if(!category){
            return res.status(400).json({message:`category not found`});
        }
        res.status(200).json(category);
    }
    catch (err) {
        res.status(500).json({message:"Server error"});
    }   
}


async function deleteCategory(req, res) {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: 'Missing category ID' });
        }
        let affectedRows = await deleteOne(id);
        
        if(!affectedRows){
            return res.status(400).json({message:`category not found`});
        }
        res.status(200).json({message: `category deleted successfully`});
         }
    catch (err) {
        res.status(500).json({message:"Server error"});
    }   
}

module.exports = {
    getAllCategories,
    addCategory,
    getCategory,
    deleteCategory
};