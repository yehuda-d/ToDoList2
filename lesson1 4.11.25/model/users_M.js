const db = require('../config/db_config');

// הפונקציה מחזירה את כל המשתמשים מהטבלה "users"
async function getAll() {
    let sql = 'SELECT id,name,email FROM users';
    console.log(sql);
    let [rows]= await db.query(sql);
       
  return rows;
} 
async function getOne(id) {
    let sql = `SELECT id,name,email FROM users WHERE id = ?`;   
    let [result]= await db.query(sql,[id]);
    return result[0];
}


module.exports = {
    getAll,
    getOne,
};