const User = require('../models/user')
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");
const _ = require('lodash')
const { expressjwt: jwts } = require("express-jwt");

exports.signup = (req, res) => {
    const { name, email, password } = req.body;

    User.findOne({ email }).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                error: 'Email is taken'
            });
        }

        const token = jwt.sign({ name, email, password }, process.env.JWT_ACCOUNT_ACTIVATION, { expiresIn: '10m' });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'bayarsuren0310@gmail.com',
              pass: 'gnwewurklsrjyqng'
            }
          });
        
          const mailOptions = {
            from: 'bayarsuren0310@gmail.com',
            to: email,
            subject: `Account activation link`,
            html: `
                <h1>Please use the following link to activate your account</h1>
                <p>${process.env.CLIENT_URL}/activate/${token}</p>
                <hr />
                <p>This email may contain sensetive information</p>
                <p>${process.env.CLIENT_URL}</p>
            `
          };

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
              return res.json({
                message: error.message
            });
            } else {
                return res.json({
                    message: `Таны имейл хаягруу ${email} баталгаажуулах код илгээлээ. Check the email address !`
                });
            }
          });
    });
};


exports.accountActivation = (req, res) => {
    const { token } = req.body;

    if (token) {
        jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, function(err, decoded) {
            if (err) {
                console.log('JWT VERIFY IN ACCOUNT ACTIVATION ERROR', err);
                return res.status(401).json({
                    error: 'Таны баталгаажуулах хугацаа дууссан байна. Дахин бүртгүүлнэ үү.'
                });
            }

            const { name, email, password } = jwt.decode(token);

            const user = new User({ name, email, password });

            user.save((err, user) => {
                if (err) {
                    console.log('SAVE USER IN ACCOUNT ACTIVATION ERROR', err);
                    return res.status(401).json({
                        error: 'Error saving user in database. Try signup again'
                    });
                }
                return res.json({
                    message: 'Signup success. Please signin.'
                });
            });
        });
    } else {
        return res.json({
            message: 'Something went wrong. Try again.'
        });
    }
};


exports.signin = (req, res) => {
    const { email, password } = req.body;
    // check if user exist
    User.findOne({ email }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that email does not exist. Please signup'
            });
        }
        // authenticate
        if (!user.authenticate(password)) {
            return res.status(400).json({
                error: 'Email and password do not match'
            });
        }
        // generate a token and send to client
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        const { _id, name, email, role } = user;

        return res.json({
            token,
            user: { _id, name, email, role } 
        });
    });
};

exports.requireSignin = jwts({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],   // req.user._id
});

exports.forgotPassword = (req, res) => {
    const { email } = req.body;

    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that email does not exist'
            });
        }

        const token = jwt.sign({ _id: user._id, name: user.name }, process.env.JWT_RESET_PASSWORD, {
            expiresIn: '10m'
        });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'bayarsuren0310@gmail.com',
              pass: 'gnwewurklsrjyqng'
            }
          });
        
          const mailOptions = {
            from: 'bayarsuren0310@gmail.com',
            to: email,
            subject: `Password Reset link`,
            html: `
                <h1>Please use the following link to reset your password</h1>
                <p>${process.env.CLIENT_URL}/reset/${token}</p>
                <hr />
                <p>This email may contain sensetive information</p>
                <p>${process.env.CLIENT_URL}</p>
            `
          };

        return user.updateOne({ resetPasswordLink: token }, (err, success) => {
            if (err) {
                console.log('RESET PASSWORD LINK ERROR', err);
                return res.status(400).json({
                    error: 'Database connection error on user password forgot request'
                });
            } else {

                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                        return res.json({
                        message: error.message
                    });
                    } else {
                        return res.json({
                            message: `Email has been sent to ${email}. Follow the instruction to activate your account`
                        });
                    }
                });

            }
        });
    });
};


exports.resetPassword = (req, res) => {
    const { resetPasswordLink, newPassword } = req.body;

    if (resetPasswordLink) {
        jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, function(err, decoded) {
            if (err) {
                return res.status(400).json({
                    error: 'Expired link. Try again'
                });
            }

            User.findOne({ resetPasswordLink }, (err, user) => {
                if (err || !user) {
                    return res.status(400).json({
                        error: 'Something went wrong. Try later'
                    });
                }

                const updatedFields = {
                    password: newPassword,
                    resetPasswordLink: ''
                };

                user = _.extend(user, updatedFields);

                user.save((err, result) => {
                    if (err) {
                        return res.status(400).json({
                            error: 'Error resetting user password'
                        });
                    }
                    res.json({
                        message: `Great! Now you can login with your new password`
                    });
                });
            });
        });
    }
};