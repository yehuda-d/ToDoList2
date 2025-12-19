function ValuesToAdd(req, res, next) {
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

function valuesToEdit(req, res, next) {
    let obj = {};
    if (req.body.text) {
        obj.text = req.body.text;
    }
    if (req.body.isDone) {
        obj.isDone = req.body.isDone;
    }
    
    let keys = Object.keys(obj)//מחזיר מערך של מפתחות
    if (keys.length == 0) {
        return res.status(400).json({message: "No values to update"});
    }
    req.newTask = obj;
    
    next();
}

module.exports = { 
    ValuesToAdd,
    isValidId,
    valuesToEdit
};