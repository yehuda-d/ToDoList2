const db = require('../config/db_config');

// הפונקציה מחזירה את כל הקטגוריות מהטבלה "categories"
async function getAll() {
    let sql = 'SELECT categoryName FROM categories';
    let [rows]= await db.query(sql);
       
  return rows;
} 

async function add({categoryName,user_id}){
    let sql = `INSERT INTO categories (categoryName, user_id) VALUES (?,?)`;
    let [result] = await db.query(sql, [categoryName, user_id]);
    console.log(result);
    
    return result.insertId;
}

async function deleteOne(id) {
    let sql = `DELETE FROM categories WHERE id = ?`;   
    let [result] = await db.query(sql,[id]);
    console.log(result);
    
    return result.affectedRows;
}
async function getOne(id) {
    let sql = `SELECT * FROM categories WHERE id = ?`;   
    let [result]= await db.query(sql,[id]);
    return result[0];
}


module.exports = {
    getAll,
    add,
    getOne,
    deleteOne
    
};