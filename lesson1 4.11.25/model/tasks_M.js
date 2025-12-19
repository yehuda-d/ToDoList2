const db = require('../config/db_config');

async function getAllT(userid) {
    let sql = 'SELECT * FROM tasks WHERE user_id = ?';
    let [rows]= await db.query(sql,[userid]);
       
  return rows;
} 

async function addT({text,user_id, catId }){
    let sql = `INSERT INTO tasks (text, user_id, catId) VALUES (?, ?, ?)`;
    let [result] = await db.query(sql, [text, user_id, catId]);
    console.log(result);
    
    return result.insertId;
}

async function getOneT(taskId,userId) {
    let sql = `SELECT * FROM tasks WHERE id = ? AND user_id = ?`;   
    let [result]= await db.query(sql,[taskId,userId]);
    return result[0];
}

async function deleteOneT(taskId,userId) {
    let sql = `DELETE FROM tasks WHERE id = ? AND user_id = ?`;   
    let [result] = await db.query(sql,[taskId,userId]);
    console.log(result);
    
    return result.affectedRows;
}

// async function updateOneT(taskId,userId,isDone,text) {
//     let sql = `UPDATE tasks SET isDone = ?, text = ? WHERE id = ? AND user_id = ?`;   
//     let [result] = await db.query(sql,[isDone,text,taskId,userId]);
//     console.log(result);
    
//     return result.affectedRows;
// }
async function updateOneT(taskId, userId, newTask) {
    let keys = Object.keys(newTask);
    let values = Object.values(newTask);
    let set = keys.map(k=>`${k}=?`).join(', ');//הפוך את המפתחות למחרוזת של key=? , key=?
    let sql = `UPDATE tasks SET ${set} WHERE id = ? AND user_id = ?`;   
    let [result] = await db.query(sql,[...values,taskId,userId]);//פירוק המערך values והוספת id בסוף
    console.log(result);
    
    return result.affectedRows;
}

module.exports = {
    getAllT,
    addT,
    getOneT,
    deleteOneT,
    updateOneT
};