const db = require('../config/db_config');

async function getAllT(userid) {
    let sql = 'SELECT * FROM tasks WHERE user_id = ?';
    let [rows]= await db.query(sql,[userid]);
       
  return rows;
} 

module.exports = {
    getAllT,
};