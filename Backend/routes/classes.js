const express = require('express');
const router = express.Router();

const classes = [{
    _id: 1,
    _id_teacher: 12345,
    _id_course: 1,
    _id_subject: 1,
    year: 3,
    frequency_regime: 1,
    lective_year: "20/21",
    students: [{
        _id: 12345
    }]
}, {
    _id: 2,
    _id_teacher: 12345,
    _id_course: 2,
    _id_subject: 3,
    year: 1,
    frequency_regime: 1,
    lective_year: "20/21",
    students: [{
        _id: 12345
    }]
}];

// GET all Classes belonging to a specific teacher
router.get('/:_id_teacher', function (req, res, next) {
    res.status(200).send({
        response: {
            message: 'Students sent with success!',
            data: classes.filter(classs => classs._id_teacher === +req.params._id_teacher) // Make sure to send an array, even if there is only 1 object, otherwise the frontend will not work
            // Send the Classes ordered from the higher Id to the lower (newer first)
        }
    });
});

// POST new Class
router.post('/', function (req, res, next) {
    // Insert Class in DB (inserting into Local Tmp var while there is no DB)
    classes.push(req.body); // Inserts locally without _id

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

// DELETE Class
router.delete('/:_id', function (req, res, next) {
    // Find Class
    const classs = classes.find(classs => classs._id === +req.params._id);
    if (classs) {
        // If Class exists
        classes.splice(classes.indexOf(classs), 1);  // Delete Class in DB (deleting from Local Tmp var while there is no DB)

        res.status(200).send({
            response: {
                data: {
                    message: 'Class deleted with success!'
                }
            }
        });
    } else {
        // If Class not deleted
        res.status(400).send({
            response: {
                data: {
                    message: 'Class not deleted with success!'
                }
            }
        });
    }
});

module.exports = router;
