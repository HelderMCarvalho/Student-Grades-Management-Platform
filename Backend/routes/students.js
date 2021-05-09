const express = require('express');
const router = express.Router();

// Temp Students array (while there is no DB)
const students = [{_id: 1, code: 15310, name: 'Helder Carvalho'}, {_id: 2, code: 12345, name: 'Eduardo Oliveira'}];

// GET all Students
router.get('/', function (req, res, next) {
    res.status(200).send({
        response: {
            message: 'Students sent with success!',
            data: students
        }
    });
});

module.exports = router;
