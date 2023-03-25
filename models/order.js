const mongoose = require('mongoose');
 
const orderSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: true
        },
        link: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        size: {
            type: String,
            required: true,
        },
        number: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            default : 'REGISTERED'
        },
        image: {
            type: String,
        },
        invoice: {
            type: Number,
        },
        date: {
            type: Date,
        },
        userid: {
            type: Number,
        },
        cargoid: {
            type: Number,
        },
    },
    { timestamps: true }
);
 
module.exports = mongoose.model('Order', orderSchema);