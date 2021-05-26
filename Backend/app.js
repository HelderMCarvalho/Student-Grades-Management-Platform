const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const auth = require('basic-auth');

const sequelize = require('./db');

const indexRouter = require('./routes/index');
const authenticationRouter = require('./routes/authentication');
const coursesRouter = require('./routes/courses');
const studentsRouter = require('./routes/students');
const subjectsRouter = require('./routes/subjects');
const classesRouter = require('./routes/classes');
const yearsRouter = require('./routes/years');
const frequencyRegimesRouter = require('./routes/frequencyRegimes');

const app = express();

/*const corsOptions = {
    origin: '*',
    methods: 'GET,POST,PUT,DELETE,PATCH,OPTIONS',
    allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization'
}*/

app.use(cors()); // https://expressjs.com/en/resources/middleware/cors.html
app.options('*', cors()); // Enabling CORS Pre-Flight
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// All routes start here
app.use('/authentication', authenticationRouter);

// Authentication Middleware, all routes below this point are protected (https://github.com/jshttp/basic-auth)
app.use(function (req, res, next) {
    async function run() {
        // Check if authentication header exist
        if (!req.get('authorization')) {
            // If header doesnt exist
            return res.status(401).send({error: 'No credentials sent!'});
        }

        // If header exist
        // Decode the authorization header and get the Teacher credentials
        const userCred = auth(req);

        // Get Teacher
        const teacher = await sequelize.models.Teacher.findOne({
            where: {
                email: userCred.name
            }
        });

        // Check user and password
        if (teacher && teacher.password === userCred.pass) {
            // If User exist and the password match
            next();
        } else {
            // If User doesnt exist or the password doesnt match
            return res.status(401).send({error: 'Wrong credentials sent!'});
        }
    }

    run().then();
});

app.use('/', indexRouter);
app.use('/courses', coursesRouter);
app.use('/students', studentsRouter);
app.use('/subjects', subjectsRouter);
app.use('/classes', classesRouter);
app.use('/years', yearsRouter);
app.use('/frequencyRegimes', frequencyRegimesRouter);

module.exports = app;
