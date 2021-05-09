const express = require('express');
const router = express.Router();

const classes = [{
    _id: 1,
    _id_teacher: 1,
    _id_course: 1,
    _id_subject: 1,
    year: 3,
    frequency_regime: 1,
    lective_year: "20/21",
    students: [{
        _id: 12345
    }]
}];

// GET
/*router.get('/', function (req, res, next) {
    res.status(200).send({message: 'respond with a resource'});
});*/

// POST new Class
router.post('/', function (req, res, next) {
    // Insert Class in DB (inserting into Local Tmp var for while there is no DB)
    classes.push(req.body); // Inserts without _id

    // If Class inserted
    res.status(200).send({
        response: {
            data: {
                message: 'Class created with success!'
            }
        }
    });

    // If Class not inserted
    /*res.status(400).send({
        response: {
            data: {
                message: 'Class not created with success!'
            }
        }
    });*/
});

module.exports = router;
