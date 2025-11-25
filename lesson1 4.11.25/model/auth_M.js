const db = require('../config/db_config');

async function addOne(data){
     const keys = Object.keys(data); //מוציא את שמות העמודות מהטבלה
    const values = Object.values(data);//מוציא את הערכים של כל עמודה במערך
    const placeholders = keys.map(() => "?").join(","); 

    const sql = `INSERT INTO users (${keys.join(",")}) VALUES (${placeholders})`;

    const [result] = await db.query(sql, values);
    console.log(result);
    
    return result.insertId;
}



module.exports = {
    addOne,
}