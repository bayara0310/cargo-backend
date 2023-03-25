const Order = require('../models/order');

    exports.OrderAdd = (req, res) => {
        const { cargo_name, email, phone_number, website, logo, cover_image, address, location, cargo_status, overview } = req.body
        const cargo = new Order({ cargo_name, email, phone_number, website, logo, cover_image, address, location, cargo_status, overview });
        cargo.save((err, cargo) => {
            if (err) {
                console.log(err)
            }
            return res.json({
                message: 'Амжилттай илгээлээ',
                data: cargo
            });
        });
    }