const express = require('express');
const router = express.Router();

// Temp Subjects array (while there is no DB)
const subjects = [{_id: 1, _id_course: 1, code: 11, name: 'Multimédia e Tecnologia Web'},
    {_id: 2, _id_course: 1, code: 12, name: 'Interface Homem Máquina'},
    {_id: 3, _id_course: 2, code: 23, name: 'Desenvolvimento Web I'},
    {_id: 4, _id_course: 2, code: 24, name: 'A Desenvolvimento Web II'}];

// GET Subjects
router.get('/:_id_course', function (req, res, next) {
    res.status(200).send({
        response: {
            message: 'Subjects sent with success!',
            data: subjects.filter(subject => subject._id_course === +req.params._id_course)
        }
    });
});

module.exports = router;
