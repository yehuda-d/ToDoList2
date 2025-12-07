const db = require('../config/db_config');

// הפונקציה מחזירה את כל הקטגוריות מהטבלה "categories"
async function getAll() {
    let sql = 'SELECT categoryName FROM categories';
    let [rows]= await db.query(sql);
       
  return rows;
} 


module.exports = {
    getAll,
    
};