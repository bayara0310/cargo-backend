const mongoose = require('mongoose');
 
const cargoSchema = new mongoose.Schema(
    {
        cargo_name: {
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
        phone_number: {
            type: Number,
            required: true,
        },
        overview: {
            type: String,
            required: true,
        },
        website: {
            type: String,
        },
        logo: {
            type: String,
        },
        cover_image: {
            type: String,
        },
        address: {
            type: String,
            required: true
        },
        location: {
            type: String
        },
        type: [String],
        nation: [String],
        sites: [String],

        cargo_status: {
            type: String,
            default: 'REQUIESTED'
        },
    },
    { timestamps: true }
);
 
module.exports = mongoose.model('Cargo', cargoSchema);