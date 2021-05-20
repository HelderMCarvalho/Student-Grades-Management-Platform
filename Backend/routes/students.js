const express = require('express');
const router = express.Router();
const sequelize = require('../db');

// GET all Students
router.get('/', function (req, res, next) {
    async function run() {
        const students = await sequelize.models.Student.findAll();

        res.status(200).send({
            response: {
                message: 'Students sent with success!',
                data: students
            }
        });
    }

    run().then();
});

module.exports = router;
