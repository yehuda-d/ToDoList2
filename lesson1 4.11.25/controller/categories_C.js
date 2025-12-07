// const { use } = require('react');
const {getAll} = require('../model/categories_M_new');

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

module.exports = {
    getAllCategories,
};