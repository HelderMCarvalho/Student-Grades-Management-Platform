const express = require('express');
const router = express.Router();
const _ = require('lodash');

const User = require("../models/user");

// Temp Users array (while there is no DB)
const users = [{email: 'test@test.com', password: 'Aa111111', firstName: 'Test', lastName: 'User'}];

/* POST new authentication. */
router.post('/', function (req, res, next) {
    // Get User (not yet from DB)
    // (doing a cloneDeep in order to clear the password before sending the user information, might not be necessary
    // when using DB)
    const user = _.cloneDeep(users.find(user => req.body.email === user.email));

    // Test user
    if (user && user.password === req.body.password) {
        // If user exist then allow login.

        // Clear User password to not be sent.
        user.password = '';

        res.status(200).send({
            response: {
                data: {
                    message: 'Login with success!',
                    user: user
                }
            }
        });
    } else {
        // If User doesnt exist throw error.
        res.status(400).send({
            response: {
                data: {
                    message: 'Login failed!'
                }
            }
        });
    }

});

/* POST register User. */
router.post('/register', function (req, res, next) {
    // Get User (not yet from DB)
    const user = users.find(user => req.body.newUser.email === user.email);

    // Test User
    if (user) {
        // If User exist throw error.
        res.status(400).send({
            response: {
                data: {
                    message: 'Register failed!'
                }
            }
        });
    } else {
        // If User doesnt exist than create new User.
        users.push(req.body.newUser);
        res.status(200).send({
            response: {
                data: {
                    message: 'Register with success!'
                }
            }
        });
    }
});

module.exports = router;
