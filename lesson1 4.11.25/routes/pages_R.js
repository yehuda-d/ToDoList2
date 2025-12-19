const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {res.sendFile(Path.join(__dirname, '..',"public",'pages',"index.html"));});
module.exports = router;