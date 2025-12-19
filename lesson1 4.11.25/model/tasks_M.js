const db = require('../config/db_config');

async function getAllT(userid) {
    let sql = 'SELECT * FROM tasks WHERE user_id = ?';
    let [rows]= await db.query(sql,[userid]);
       
  return rows;
} 

async function addT({text,user_id }){
    let sql = `INSERT INTO tasks (text, user_id ) VALUES (?,?)`;
    let [result] = await db.query(sql, [text, user_id]);
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

module.exports = {
    getAllT,
    addT,
    getOneT,
    deleteOneT
};