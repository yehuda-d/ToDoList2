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

async function deleteOne(id) {
    let sql = `DELETE FROM users WHERE id = ?`;   
    let [result] = await db.query(sql,[id]);
    console.log(result);
    
    return result.affectedRows;
}

async function updateOne(id,user) {
    let keys = Object.keys(user);
    let values = Object.values(user);
    let set = keys.map(k=>`${k}=?`).join(', ');//הפוך את המפתחות למחרוזת של key=? , key=?
    let sql = `UPDATE users SET ${set} WHERE id = ?`;   
    let [result] = await db.query(sql,[...values,id]);//פירוק המערך values והוספת id בסוף
    console.log(result);
    
    return result.affectedRows;
}

module.exports = {
    getAll,
    getOne,
    deleteOne,
    updateOne,
};