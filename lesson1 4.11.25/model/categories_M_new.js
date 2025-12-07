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


module.exports = {
    getAll,
    add
    
};