const express = require('express');
const router = express.Router();

// GET
router.get('/', function (req, res, next) {
    res.status(200).send({message: 'respond with a resource'});
});

module.exports = router;
