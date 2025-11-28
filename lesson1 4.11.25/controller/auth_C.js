const bcrypt = require('bcrypt');

const {addOne,getByUserName,getByEmail } = require("../model/users_M.js");

async function addUser(req, res) {
    try {
        let name = req.body.name;
        let email = req.body.email;
        let userName = req.body.userName;
        let pass = req.pass; // מה שמגיע מהמיידלוור אחרי ההצפנה

        let user = await getByUserName(userName);
        
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

async function login(req, res) {
    try {
        let user = await getByUserName(req.body.userName);
        
        if(!user){
            return res.status(401).json({message:`username or password  is incorrect`});
        }
        let isMatch = await bcrypt.compare(req.body.pass, user.pass);
        if(!isMatch){
            return res.status(401).json({message:`username or password  is incorrect`});
        }

        return res.status(200).json({message:"Login successful"});

    } catch (err) {
        console.error(err);
         res.status(500).json({message:"Server error"});
    }
}

module.exports = { 
    addUser,
    login,
 };