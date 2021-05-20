const express = require('express');
const router = express.Router();
const {Op} = require("sequelize");
const sequelize = require('../db');

// POST authenticate Teacher
router.post('/', function (req, res, next) {
    async function run() {
        // Get Teacher
        const teacher = await sequelize.models.Teacher.findOne({
            where: {
                email: req.body.email
            }
        });

        if (teacher) {
            // If Teacher exists allow login
            res.status(200).send({
                response: {
                    data: {
                        message: 'Login with success!',
                        teacher: teacher
                    }
                }
            });
        } else {
            // If Teacher doesnt exist
            res.status(400).send({
                response: {
                    data: {
                        message: 'Login failed!'
                    }
                }
            });
        }
    }

    run().then();
});

// POST register Teacher
router.post('/register', function (req, res, next) {
    async function run() {
        // Get Teacher from DB if exists otherwise Create him
        const [teacher, created] = await sequelize.models.Teacher.findOrCreate({
            where: {
                [Op.or]: [
                    {email: req.body.newUser.email},
                    {code: req.body.newUser.code}
                ]
            }, defaults: {
                email: req.body.newUser.email,
                firstName: req.body.newUser.firstName,
                lastName: req.body.newUser.lastName,
                code: req.body.newUser.code,
                password: req.body.newUser.password
            }
        });

        if (created) {
            // If Teacher was Created
            res.status(200).send({
                response: {
                    data: {
                        message: 'Register with success!'
                    }
                }
            });
        } else {
            // If Teacher already exists
            res.status(400).send({
                response: {
                    data: {
                        message: 'Register failed!'
                    }
                }
            });
        }
    }

    run().then();
});

module.exports = router;
