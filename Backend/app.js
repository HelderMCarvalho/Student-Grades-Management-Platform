const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const auth = require('basic-auth');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const authenticationRouter = require('./routes/authentication');
const usersRouter = require('./routes/users');

const app = express();

// Temp Users array (while there is no DB)
const users = [{email: 'test@test.com', password: 'Aa111111', firstName: 'Test', lastName: 'User'}];

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
// https://github.com/jshttp/basic-auth
app.use(function (req, res, next) {
    // Check if authentication header exist
    if (!req.get('authorization')) {
        // If header doesnt exist
        return res.status(401).send({error: 'No credentials sent!'});
    }

    // If header exist
    // Decode the authorization header and get the User credentials
    const userCred = auth(req);

    // Get the User (not yet from DB)
    const user = users.find(user => userCred.name === user.email);

    // Check user and password
    if (user && user.password === userCred.pass) {
        // If User exist and the password match
        next();
    } else {
        // If User doesnt exist or the password doesnt match
        return res.status(401).send({error: 'Wrong credentials sent!'});
    }
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
