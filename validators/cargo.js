const { check } = require('express-validator');

exports.cargoSignupValidator = [
    check('cargo_name')
        .not()
        .isEmpty()
        .withMessage('Name is required'),

    check('overview')
        .not()
        .isEmpty()
        .withMessage('Overview is required'),
    check('email')
        .isEmail()
        .withMessage('Must be a valid email address'),
    check('address')
        .not()
        .isEmpty()
        .withMessage('address not found'),
];