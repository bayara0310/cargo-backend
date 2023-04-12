const mongoose = require('mongoose');
const crypto = require('crypto');
 
const adminSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            trim: true,
            required: true,
            max: 32
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            lowercase: true
        },
        hashed_password: {
            type: String,
            required: true
        },
        salt: String,
        role: {
            type: String,
            default: 'Admin'
        },
        resetPasswordLink: {
            data: String,
            default: ''
        },
        cargoid:{
            type: String
        },
    },
    { timestamps: true }
);
 
adminSchema
    .virtual('password')
    .set(function(password) {
        console.log("password", password);
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });

adminSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },
 
    encryptPassword: function(password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha256', this.salt)
                .update(password.toString())
                .digest('hex');
        } catch (err) {
            return '';
        }
    },
 
    makeSalt: function() {
        return Math.round(new Date().valueOf() * Math.random()) + '';
    }
};
 
module.exports = mongoose.model('Admin', adminSchema);