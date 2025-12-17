const db = require('../config/db_config');

async function getAllT(userid) {
    let sql = 'SELECT * FROM tasks WHERE user_id = ?';
    let [rows]= await db.query(sql,[userid]);
       
  return rows;
} 

async function addT({category_ID, user_id, isDone, text}){
    let sql = `INSERT INTO tasks (category_ID, user_id, isDone, text) VALUES (?,?,?,?)`;
    let [result] = await db.query(sql, [category_ID, user_id, isDone, text]);
    console.log(result);
    
    return result.insertId;
}

module.exports = {
    getAllT,
    addT
};