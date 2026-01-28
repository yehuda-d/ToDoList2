const bcrypt = require('bcrypt'); //ספריה להצפנת סיסמאות
const jwt = require('jsonwebtoken'); //מייצרת מפתח שנותן לזהות את הלקוח בכל נקודת קצה אחרת

const {addOne,getByUserName,getByEmail } = require("../model/users_M.js");

async function addUser(req, res) {
    try {
        let name = req.body.name;
        let email = req.body.email;
        let userName = req.body.userName;
        let pass = req.pass; // מה שמגיע מהמיידלוור אחרי ההצפנה

        let user = await getByUserName(userName);
        console.log(req.pass);
        
        if(user){
            return res.status(409).json({message:`username ${userName} already exists`});
        }

        user = await getByEmail(email);
        if(user){
            return res.status(409).json({message:`email ${email} already exists`});
        }
      
        let userId = await addOne({name, email, userName, pass});

        if(!userId){
            console.error(err);           
            return res.status(500).json({message:"Server error: Could not add user"});
        }

        res.status(201).json({message:"User added successfully"});//להחזיר איידי של המשתמש החדש
    }
    catch (err) {
        res.status(500).json({message:"Server error"});
    }   
}

async function login(req, res, next) {
    try {
        let user = await getByUserName(req.body.userName);
        
        if(!user){
            return res.status(401).json({message:`username or password  is incorrect`});
        }
        let isMatch = await bcrypt.compare(req.body.pass, user.pass);
        if(!isMatch){
            return res.status(401).json({message:`username or password  is incorrect`});
        }
        req.user = user;
        
        next();

    } catch (err) {
        console.error(err);
         res.status(500).json({message:"Server error"});
    }
}

function createJwt(req, res) {
    try {
        let user = req.user;
        let token = jwt.sign(
            {id:user.id,name:user.name},
            process.env.SECRET_KEY,
            {expiresIn:'3h'}
        );
        res.cookie('jwt', token,{httpOnly:true,maxAge:1000*60*60*3}).status(200).json({message:"Login successful", name: user.name});
       
    } catch (err) {
        console.error(err);
         res.status(500).json({message:"Server error"});
    }
}


module.exports = { 
    addUser,
    login,
    createJwt,
 };