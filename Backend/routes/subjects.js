const express = require('express');
const router = express.Router();
const sequelize = require('../db');

// GET all Subjects
router.get('/', function (req, res, next) {
    async function run() {
        const subjects = await sequelize.models.Subject.findAll();

        res.status(200).send({
            response: {
                message: 'Subjects sent with success!',
                data: subjects
            }
        });
    }

    run().then();
});

// GET Subjects belonging to a specific Course
router.get('/:_id_course', function (req, res, next) {
    async function run() {
        const subjects = await sequelize.models.Subject.findAll({
            where: {
                _id_course: req.params._id_course
            }
        });

        res.status(200).send({
            response: {
                message: 'Subjects sent with success!',
                data: subjects
            }
        });
    }

    run().then();
});

module.exports = router;
