const mongoose = require('mongoose');
 
const ratingSchema = new mongoose.Schema(
    {
        cargoid: {
            type: String,
        },
        userid: {
            type: String,
        },
        rating: {
            type: Number,
        },
    },
    { timestamps: true }
);
 
module.exports = mongoose.model('Rating', ratingSchema);