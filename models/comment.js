const mongoose = require('mongoose');
 
const commentSchema = new mongoose.Schema(
    {
        comment: {
            type: String,
        },
        userid: {
            type: String,
        },
        cargoid: {
            type: String,
        },
        ip: {
            type: String,
        },
    },
    { timestamps: true }
);
 
module.exports = mongoose.model('Comment', commentSchema);