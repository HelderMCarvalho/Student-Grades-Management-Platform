const express = require('express');
const router = express.Router();
const sequelize = require('../db');

// GET all Years
router.get('/', function (req, res, next) {
    async function run() {
        const years = await sequelize.models.Year.findAll();

        res.status(200).send({
            response: {
                message: 'Years sent with success!',
                data: years
            }
        });
    }

    run().then();
});

module.exports = router;
