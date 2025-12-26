const express = require('express');
require('dotenv').config();
const db = require('./config/db_config');
const cookies = require('cookie-parser');
const path = require('path');
const app = express();
const port = process.env.PORT;
const host = process.env.HOST
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cookies());

//app.get('/', (req, res) => {res.sendFile(__dirname + '/public/index.html');});
//app.get('/reg', (req, res) => {res.sendFile(__dirname + '/public/pages/register.html');});

app.use('/', require('./routes/pages_R'));
app.use('/users', require('./routes/users_R'));
app.use('/auth', require('./routes/auth_R'));
app.use('/categories', require('./routes/categories_R'));
app.use('/tasks', require('./routes/tasks_R'));



app.listen(port, () => {console.log(`http://${host}:${port}`);});