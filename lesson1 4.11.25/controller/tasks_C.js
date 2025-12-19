const {getAllT,addT,getOneT,deleteOneT,updateOneT} = require('../model/tasks_M');

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
        
        let user_id = req.user.id;
        
        let text = req.body.text;
        let catId = req.body.catId || null;
      
        let taskId = await addT({user_id, text, catId});

        if(!taskId){
                       
            return res.status(500).json({message:"Server error: Could not add task"});
        }

        res.status(201).json({message:"task added successfully"});//להחזיר איידי של המשתמש החדש
    }
    catch (err) {
        console.log(err);
        
        res.status(500).json({message:"Server error"});
    }   
}

async function getOneTask(req, res) {
    try {
        let task = await getOneT(req.id,req.user.id);       
        if(!task){
            return res.status(400).json({message:`task not found`});
        }
        res.status(200).json(task);
    }
    catch (err) {
        res.status(500).json({message:"Server error"});
    }   
}

async function deleteTask(req, res) {
    try {
        let affectedRows = await deleteOneT(req.id,req.user.id);
        
        if(!affectedRows){
            return res.status(400).json({message:`task not found`});
        }
        res.status(200).json({message: `task deleted successfully`});
         }
    catch (err) {
        res.status(500).json({message:"Server error"});
    }   
}

async function updateTask(req, res) {
    try {
        let taskId = req.id;
        let userId = req.user.id;
        let newTask = req.newTask;

        let affectedRows = await updateOneT(taskId, userId, newTask);
        if(!affectedRows){
            return res.status(400).json({message:`task not found`});
        }
        res.status(200).json({message: `task update successfully`});
         }
    catch (err) {
        console.error(err);
        res.status(500).json({message:"Server error"});
    }   
}



module.exports = {
    getAllTasks,
    addTask,
    getOneTask,
    deleteTask,
    updateTask
};