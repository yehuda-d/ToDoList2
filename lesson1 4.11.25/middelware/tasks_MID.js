function validValues(req, res, next) {
    let taskName  = req.body.taskName;
    if (!taskName) {
        console.log(taskName);
        
        return res.status(400).json({error: 'Missing required fields'});
    }
    next();
}

function isValidId(req, res, next) {
    let id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
        res.status(400).json({message: "Invalid ID"});
    }
    req.id = id;
    next();
}

module.exports = { 
    validValues,
    isValidId
 };