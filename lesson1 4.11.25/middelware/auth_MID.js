const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


function valuesToAdd(req, res, next) {
    let {name, email, userName, pass} = req.body;
    if (!name || !email || !userName || !pass) {
        return res.status(400).json({error: 'Missing required fields'});
    }
    next();
}


async function encryptPass(req, res, next) {
    try {
        let pass = req.body.pass;

        let hashPass = await bcrypt.hash(pass, 10);
        console.log("hashed pass:", hashPass);

        req.pass = hashPass;
        console.log("controller pass:", req.pass);
        next(); // ✅ ממשיך ל־controller
    } catch (err) {
        console.error(err);
        return res.status(500).json({message:"Server error"});
    }
}

function valuesToLogin(req, res, next) {
    let {userName,pass} = req.body;
    if (!userName || !pass) {
        return res.status(400).json({error: 'Missing required fields'});
    }
    next();
}

function isLoggedIn(req,res,next){
    let token = req.cookies.jwt;    
    if(!token){
        return res.status(401).json({message:"please login"});
    }
    try{
        let payload = jwt.verify(token,process.env.SECRET_KEY);    
        req.user = payload;    
        next();
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Server error"});
    }
}

module.exports = { 
    valuesToAdd,
    encryptPass,
    valuesToLogin,
    isLoggedIn

 };