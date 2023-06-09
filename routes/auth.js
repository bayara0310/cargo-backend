const express = require('express');
const router = express.Router()

//import controllers
const { signup, accountActivation, signin, forgotPassword, resetPassword } = require('../controllers/auth');

//import validators
const {userSignupValidator, userSigninValidator, resetPasswordValidator, forgotPasswordValidator} = require('../validators/auth');
const {runValidation} = require('../validators')


router.post('/signup',userSignupValidator,runValidation, signup);
router.post('/account-activation', accountActivation);
router.post('/signin', userSigninValidator,runValidation, signin);

//forget reset password
router.put('/forget-password', forgotPasswordValidator, runValidation, forgotPassword)
router.put('/reset-password', resetPasswordValidator, runValidation, resetPassword)

module.exports = router;