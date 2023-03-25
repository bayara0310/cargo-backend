const Cargo = require('../models/cargo');

    exports.cargoAll = (req, res) => {
        Cargo.find({}, (err, cargos) => {
            if(err){
                console.log(err)
            }else{
                res.json(cargos)
            }
        })
    }

    exports.Cargoadd = (req, res) => {
        const { cargo_name, email, phone_number, website, logo, cover_image, address, location, cargo_status, overview } = req.body
        const cargo = new Cargo({ cargo_name, email, phone_number, website, logo, cover_image, address, location, cargo_status, overview });
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


    exports.cargoUpdate = (req, res) => {
        const { cargo_name, email, phone_number, website, logo, cover_image, address, location, cargo_status, overview } = req.body;
    
        Cargo.findOne({ _id: req.params.id }, (err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    error: 'Cargo not found'
                });
            }else{
                user.cargo_name = cargo_name;
                user.email = email;
                user.phone_number = phone_number;
                user.website = website;
                user.logo = logo;
                user.cover_image = cover_image;
                user.address = address;
                user.location = location;
                user.cargo_status = cargo_status;
                user.overview = overview;
            }
    
            user.save((err, updatedUser) => {
                if (err) {
                    console.log('USER UPDATE ERROR', err);
                    return res.status(400).json({
                        error: 'Cargo update failed'
                    });
                }
                res.json(updatedUser);
            });
        });
       
    };