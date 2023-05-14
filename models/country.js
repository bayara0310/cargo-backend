const mongoose = require('mongoose');
 
const countrySchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        sname: {
            type: String,
        },
        logo: {
            type: String,
        },
    },
    { timestamps: true }
);
 
module.exports = mongoose.model('Country', countrySchema);