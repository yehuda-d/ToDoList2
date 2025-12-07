function valuesToAdd(req, res, next) {
    let { categoryName } = req.body;
    if (!categoryName) {
        console.log(categoryName);
        
        return res.status(400).json({error: 'Missing required fields'});
    }
    next();
}

module.exports = { 
    valuesToAdd
 };