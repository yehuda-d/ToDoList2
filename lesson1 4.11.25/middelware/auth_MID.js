const bcrypt = require('bcrypt');


function valuesToAdd(req, res, next) {
    let {name, email, userName, pass} = req.body;
    if (!name || !email || !userName || !pass) {
        return res.status(400).json({error: 'Missing required fields'});
    }
    next();
}

async function encryptPass(req, res, next) {
    let pass = req.body.pass;
    console.log(pass);
    
    let hashPass = await bcrypt.hash(pass, 10);//המספר זה כמות ההכפלות של האלגוריתם
    console.log(hashPass);
    
    req.pass = hashPass;
    // next();
}

module.exports = { 
    valuesToAdd,
    encryptPass,
 };