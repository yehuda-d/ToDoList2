// const { encryptPass } = require("../middelware/auth_MID");
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

module.exports = { addUser };