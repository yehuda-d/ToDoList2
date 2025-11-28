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

async function getByUserName(userName) {
    let sql = `SELECT * FROM users WHERE userName = ?`;   
    let [result] = await db.query(sql,[userName]);
    return result[0];
}

async function getByEmail(email) {
    let sql = `SELECT * FROM users WHERE email = ?`;   
    let [result] = await db.query(sql,[email]);
    return result[0];
}

async function addOne({name, email, userName, pass}){
    let sql = `INSERT INTO users (name, email, userName, pass) VALUES (?,?,?,?)`;
    let [result] = await db.query(sql, [name, email, userName, pass]);
    console.log(result);
    
    return result.insertId;
}

module.exports = {
    getAll,
    getOne,
    deleteOne,
    updateOne,
    getByUserName,
    getByEmail,
    addOne
};