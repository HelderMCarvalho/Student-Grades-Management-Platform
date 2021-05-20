const express = require('express');
const router = express.Router();
const sequelize = require('../db');

// GET all Frequency Regimes
router.get('/', function (req, res, next) {
    async function run() {
        const frequencyRegimes = await sequelize.models.FrequencyRegime.findAll();

        res.status(200).send({
            response: {
                message: 'Frequency Regimes sent with success!',
                data: frequencyRegimes
            }
        });
    }

    run().then();
});

module.exports = router;
