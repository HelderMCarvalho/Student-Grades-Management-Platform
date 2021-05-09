const express = require('express');
const router = express.Router();

// Temp Courses array (while there is no DB)
const courses = [{_id: 1, name: 'Licenciatura em Engenharia de Sistemas Informáticos'},
    {_id: 2, name: 'Curso TeSP em Desenvolvimento Web e Multimédia'}];

// GET Courses
router.get('/', function (req, res, next) {
    res.status(200).send({
        response: {
            message: 'Courses sent with success!',
            data: courses
        }
    });
});

module.exports = router;
