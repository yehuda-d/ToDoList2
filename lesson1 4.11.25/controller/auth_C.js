async function addUser(req, res) {// למלא את הפומקציה בבית
    try {
        let user = await getOne(req.id);       
        if(!user){
            return res.status(400).json({message:`user ${req.id} not found`});
        }
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({message:"Server error"});
    }   
}

module.exports = { addUser };