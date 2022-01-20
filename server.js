const express               = require('express');
const mongoose              = require('mongoose');
const path                  = require('path');
const session               = require('express-session');
const tasks_routers         = require('./routes/tasks');
const tasks_html_routers    = require('./routes/task_html');
const flash                 = require('connect-flash');
const app                   = express();
const db_url                = 'mongodb+srv://SyedMaazHassan:my-password-db@cluster0.zdgwz.mongodb.net/test';
// const db_url                = 'mongodb://localhost:27017/Aliens';
const templates_url         = path.join(__dirname, 'templates');

// const base_url = path.dirname(require.main.filename);
app.use(session({
    secret:'todoApp',
    saveUninitialized: true,
    resave: true
}));
app.use(flash());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/static',express.static(__dirname + '/static'));
app.set('views', templates_url);
app.set("view engine", "ejs");

// Database connection
mongoose.connect(db_url, {useNewUrlParser: true});
const con = mongoose.connection;
con.on('open', () => {
    console.log('connected');
});

// Import all routes

// Listen for particular url
app.use('/api/tasks', tasks_routers);
app.use('/tasks', tasks_html_routers);
app.use('/', function (request, response) {
    response.redirect('/tasks')
});


app.listen(9000, () => {
    console.log('server started');
});


