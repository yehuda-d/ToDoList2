const {getAllT} = require('../model/tasks_M');

async function getAllTasks(req, res) {
    try {
        
        let tasks = await getAllT(req.user.id);
        
        if(tasks.length == 0){
            return res.status(400).json({message:"no tasks found"});
        }
        res.status(200).json(tasks);
        
    } catch (err) {
        res.status(500).json({message:"Server error"});
    }
}

module.exports = {
    getAllTasks,
   
};