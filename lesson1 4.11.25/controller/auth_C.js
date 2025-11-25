const { encryptPass } = require("../middelware/auth_MID");
const {addOne } = require("../model/auth_M.js");

async function addUser(req, res) {
    try {
        const user = req.body;
    
        if(!user.pass){
            return res.status(400).json({message:`password is required`});
        }
        
        //הצפנת הסיסמה
        // const hashedPass = await encryptPass(user.pass);
        //החלפת הסיסמה הרגילה בהצפנה
        // user.pass = hashedPass;
        console.log(user);
        const newUserId = await addOne(user);
        
        
        res.status(200).json({message:"User added successfully", userId:newUserId});//להחזיר איידי של המשתמש החדש
    }
    catch (err) {
        res.status(500).json({message:"Server error"});
    }   
}

module.exports = { addUser };