const db = require('../config/db_config');

// הפונקציה מחזירה את כל הקטגוריות מהטבלה "categories"
async function getAll(user_id) {
    let sql = 'SELECT * FROM categories WHERE user_id = ?';
    let [rows]= await db.query(sql,[user_id]);
       
  return rows;
} 

async function add({categoryName,user_id}){
    let sql = `INSERT INTO categories (categoryName, user_id) VALUES (?,?)`;
    let [result] = await db.query(sql, [categoryName, user_id]);
    console.log(result);
    
    return result.insertId;
}

async function deleteOne(catId,userId) {
    let sql = `DELETE FROM categories WHERE id = ? AND user_id = ?`;   
    let [result] = await db.query(sql,[catId,userId]);
    console.log(result);
    
    return result.affectedRows;
}
async function getOne(catId,userId) {
    let sql = `SELECT * FROM categories WHERE id = ? AND user_id = ?`;   
    let [result]= await db.query(sql,[catId,userId]);
    return result[0];
}


module.exports = {
    getAll,
    add,
    getOne,
    deleteOne
    
};