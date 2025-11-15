// const { use } = require('react');
const {getAll,getOne} = require('../model/users_M.js');
async function getAllUsers(req, res) {
    try {
        
        let users = await getAll();
        if(users.length == 0){
            return res.status(400).json({message:"no users found"});
        }
        res.status(200).json(users);
        
    } catch (err) {
        res.status(500).json({message:"Server error"});
    }
}
async function getOneUser(req, res) {
    try {
        let user = await getOne(req.id);       
        if(!user){
            return res.status(400).json({message:`user ${req.id} not found`});
        }
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({message:"Server error"});
    }   
}
module.exports = {
    getAllUsers,
    getOneUser,
    

};