const {getAllT,addT} = require('../model/tasks_M');

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

async function addTask(req, res) {
    try {
        let category_ID = req.body.category_ID;
        let user_id = req.user.id;
        let isDone = req.body.isDone ?? 0;
        let text = req.body.text;
      
        let categoryId = await addT({category_ID, user_id, isDone, text});

        if(!categoryId){
                       
            return res.status(500).json({message:"Server error: Could not add task"});
        }

        res.status(201).json({message:"task added successfully"});//להחזיר איידי של המשתמש החדש
    }
    catch (err) {
        
        res.status(500).json({message:"Server error"});
    }   
}

module.exports = {
    getAllTasks,
    addTask,
   
};