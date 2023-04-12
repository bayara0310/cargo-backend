const Admin = require('../models/admin')
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");
const _ = require('lodash')
const { expressjwt: jwts } = require("express-jwt");



exports.findOneCargoAdmin = (req, res) => {
    const cargoId = req.params.id;
    console.log(cargoId);
    Admin.findById(cargoId).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'Cargo not found'
            });
        }
        res.json(user);
    });
};

exports.signup = (req, res) => {
    const { username, email, password, cargoid } = req.body;

    Admin.findOne({ email }).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                error: 'Email is taken'
            });
        }

        const token = jwt.sign({ username, email, password, cargoid }, process.env.JWT_ACCOUNT_ACTIVATION, { expiresIn: '10m' });

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
                <h1>Таны каргогоо бүртгүүлэх хүсэлтийг зөвшөөрлөө </h1>
                <p>${process.env.CLIENT_URL}/authentication/activate/${token}</p>
                <hr />
                <p>Энэ линкээр орж бүртгэлээ баталгаажуулна уу</p>
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
                    message: `И-мейл хаягруу нь  ${email} илгээлээ.`
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

            const { username, email, password, cargoid } = jwt.decode(token);

            const user = new Admin({ username, email, password, cargoid });

            user.save((err, user) => {
                if (err) {
                    console.log('SAVE USER IN ACCOUNT ACTIVATION ERROR', err);
                    return res.status(401).json({
                        error: 'Error saving user in database. Try signup again'
                    });
                }

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
                    subject: `Амжилттай баталгаажлаа`,
                    html: `
                        <h1>E_CARGO.MN -д тавтай морилно уу  </h1>
                        <p>${user.username}</p>
                        <hr />
                        <p>Нэвтрэх нэр</p>
                        <p>${user.email}</p>
                        <p>Нууц үг</p>
                        <p>${password}</p>
                        <p>Нэвтэрч орсны дараа нууц үгээ заавал солино уу !</p>
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
                            message: 'Амжилттай.'
                        });
                    }
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
    console.log(req.body)
    // check if user exist
    Admin.findOne({ email }).exec((err, user) => {
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
        const { _id, name, email, role, cargoid } = user;

        return res.json({
            token,
            user: { _id, name, email, role, cargoid } 
        });
    });
};

exports.requireSignin = jwts({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],   // req.user._id
});

exports.forgotPassword = (req, res) => {
    const { email } = req.body;

    Admin.findOne({ email }, (err, user) => {
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

