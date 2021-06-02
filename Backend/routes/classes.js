const express = require('express');
const router = express.Router();
const sequelize = require('../db');

// GET Class
router.get('/:_id', function (req, res, next) {
    async function run() {
        const classs = await sequelize.models.Class.findOne({
            where: {
                _id: req.params._id
            },
            include: {all: true, nested: true}
        });

        res.status(200).send({
            response: {
                message: 'Class sent with success!',
                data: classs
            }
        });
    }

    run().then();
});

// GET all Classes belonging to a specific teacher
router.get('/teacher/:_id_teacher', function (req, res, next) {
    async function run() {
        const classes = await sequelize.models.Class.findAll({
            where: {
                _id_teacher: req.params._id_teacher
            },
            include: {all: true, nested: true},
            order: [
                ['_id', 'DESC']
            ]
        });

        res.status(200).send({
            response: {
                message: 'Classes sent with success!',
                data: classes
            }
        });
    }

    run().then();
});

// POST new Class
router.post('/', function (req, res, next) {
    async function run() {
        // Create Class
        const classs = await sequelize.models.Class.create(req.body);

        // If there are Students to associate to the Class
        if (req.body.Students.length > 0) {
            req.body.Students?.forEach(student => {
                sequelize.models.Student.findOne({
                    where: {
                        _id: student._id
                    }
                }).then(s => {
                    classs.addStudent(s);
                });
            });
        }

        if (classs) {
            // If Class was created
            res.status(200).send({
                response: {
                    message: 'Class created with success!'
                }
            });
        } else {
            // If class wasn't created
            res.status(400).send({
                response: {
                    message: 'Class not created with success!'
                }
            });
        }
    }

    run().then();
});

// PUT Class
router.put('/', function (req, res, next) {
    async function run() {
        // Update Class
        sequelize.models.Class.update(req.body, {
            where: {
                _id: req.body._id
            }
        }).then(async () => {
            // Get the Update Class to add or remove Students in Class
            const classsUpdated = await sequelize.models.Class.findOne({
                where: {
                    _id: req.body._id
                },
                include: {all: true, nested: true},
            });

            // Process the received Students and associate the new ones to the Class
            for (const student of req.body.Students) {
                // Add every received Student (if we try to add a Student that is already in the Class then, that
                // Student will be ignored)
                classsUpdated.addStudent(await sequelize.models.Student.findOne({where: {_id: student._id}}));
            }

            classsUpdated.Students.forEach(student => {
                if (!req.body.Students.find(stubentInBody => stubentInBody._id === student._id)) {
                    // If the Student is associated but not in the received Students, then remove the Student from the
                    // Class
                    classsUpdated.removeStudent(student);
                }
            });

            // If the Class was updated
            res.status(200).send({
                response: {
                    message: 'Class updated with success!'
                }
            });
        }).catch(() => {
            // If the Class wasn't updated
            res.status(400).send({
                response: {
                    message: 'Class not updated with success!'
                }
            });
        });
    }

    run().then();
});

// DELETE Class
router.delete('/:_id', function (req, res, next) {
    async function run() {
        sequelize.models.Class.destroy({
            where: {
                _id: req.params._id
            }
        }).then(() => {
            // If Class was deleted
            res.status(200).send({
                response: {
                    message: 'Class deleted with success!'
                }
            });
        }).catch(() => {
            // If Class wasn't deleted
            res.status(400).send({
                response: {
                    data: {
                        message: 'Class not deleted with success!'
                    }
                }
            });
        })
    }

    run().then();
});

// POST new Class Note
router.post('/:_id/note', function (req, res, next) {
    async function run() {
        // Find Class
        const classs = await sequelize.models.Class.findOne({
            where: {
                _id: req.params._id
            },
            include: {all: true, nested: true},
        });

        // If there are Students to associate to the Class
        if (classs) {
            const note = await sequelize.models.Note.create(req.body);
            classs.addNote(note).then(() => {
                // If Note was created and added to the Class
                res.status(200).send({
                    response: {
                        message: 'Note created and added with success!',
                        data: note
                    }
                });
            }).catch(() => {
                // If Note wasn't created and added to Class
                res.status(400).send({
                    response: {
                        message: 'Note not created and not added with success!'
                    }
                });
            });
        }
    }

    run().then();
});

// PUT Class Note
router.put('/note/:_id', function (req, res, next) {
    async function run() {
        // Update Note
        sequelize.models.Note.update(req.body, {
            where: {
                _id: req.params._id
            }
        }).then(async () => {
            // Get the Updated Note
            const updatedNote = await sequelize.models.Note.findOne({
                where: {
                    _id: req.params._id
                }
            });

            // If Note was updated
            res.status(200).send({
                response: {
                    message: 'Note updated with success!',
                    data: updatedNote
                }
            });
        }).catch(() => {
            // If Note wasn't updated
            res.status(400).send({
                response: {
                    message: 'Note not updated with success!'
                }
            });
        });
    }

    run().then();
});

// DELETE Class Note
router.delete('/note/:_id', function (req, res, next) {
    async function run() {
        sequelize.models.Note.destroy({
            where: {
                _id: req.params._id
            }
        }).then(() => {
            // If Class Note was deleted
            res.status(200).send({
                response: {
                    message: 'Class Note deleted with success!'
                }
            });
        }).catch(() => {
            // If Class Note wasn't deleted
            res.status(400).send({
                response: {
                    data: {
                        message: 'Class Note not deleted with success!'
                    }
                }
            });
        })
    }

    run().then();
});

module.exports = router;
