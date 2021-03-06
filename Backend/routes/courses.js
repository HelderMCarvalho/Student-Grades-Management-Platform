const express = require('express');
const router = express.Router();
const sequelize = require('../db');

// GET Courses
router.get('/', function (req, res, next) {
    async function run() {
        const courses = await sequelize.models.Course.findAll({
            include: {all: true, nested: true},
        });

        res.status(200).send({
            response: {
                message: 'Courses sent with success!',
                data: courses
            }
        });
    }

    run().then();
});

module.exports = router;
