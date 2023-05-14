const mongoose = require('mongoose');
 
const sitesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        link: {
            type: String,
        },
        logo: {
            type: String,
        },
    },
    { timestamps: true }
);
 
module.exports = mongoose.model('Sites', sitesSchema);