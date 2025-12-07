// const { use } = require('react');
const {getAll,add} = require('../model/categories_M_new');

async function getAllCategories(req, res) {
    try {
        
        let categories = await getAll();
        console.log(categories);
        
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
                       
            return res.status(500).json({message:"Server error: Could not add user"});
        }

        res.status(201).json({message:"User added successfully"});//להחזיר איידי של המשתמש החדש
    }
    catch (err) {
        console.error(err);
        res.status(500).json({message:"Server error"});
    }   
}

module.exports = {
    getAllCategories,
    addCategory,
};