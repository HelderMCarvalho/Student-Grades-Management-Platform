const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const authenticationRouter = require('./routes/authentication');
const usersRouter = require('./routes/users');

const app = express();

const corsOptions = {
    origin: '*',
    methods: 'GET,POST,PUT,DELETE,PATCH,OPTIONS',
    allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization'
}

app.use(cors()); // https://expressjs.com/en/resources/middleware/cors.html
app.options('*', cors()); // Enabling CORS Pre-Flight
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*mongoose.connect("connectionString", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to DB!");
}).catch(() => {
    console.log("Connection failed!");
});*/

// All routes start here
app.use('/authentication', authenticationRouter);

// Authentication Middleware, all routes below this point are protected
app.use(function (req, res, next) {
    if (!req.get('authorization')) {
        return res.status(401).send({error: 'No credentials sent!'});
    }
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
