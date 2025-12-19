function validValues(req, res, next) {
    const text = req.body.text;
    if (!text) {
        console.log(text);
        
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