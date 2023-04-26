const mongoose = require('mongoose');
 
const orderSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        link: {
            type: String,
        },
    },
    { timestamps: true }
);
 
module.exports = mongoose.model('Order', orderSchema);