const express = require('express');
const router = express.Router();
const Path = require('path');

router.get('/', (req, res) => {res.sendFile(Path.join(__dirname, '..',"public",'pages',"index.html"));});
router.get('/reg', (req, res) => {res.sendFile(Path.join(__dirname, '..',"public",'pages',"register.html"));});
module.exports = router;