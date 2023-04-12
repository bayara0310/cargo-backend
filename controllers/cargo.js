const Cargo = require('../models/cargo');
const Comment = require('../models/comment');
const User = require('../models/user');

exports.findOne = (req, res) => {
    const cargoId = req.params.id;
    console.log(cargoId);
    Cargo.findById(cargoId).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'Cargo not found'
            });
        }
        // user.hashed_password = undefined;
        // user.salt = undefined;
        res.json(user);
    });
};

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
        const { cargo_name, email, phone_number, logo, cover_image, address, cargo_status, overview, website } = req.body
        const cargo = new Cargo({ cargo_name, email, phone_number, logo, cover_image, address, cargo_status, overview, website });
        cargo.save((err, cargo) => {
            if (err) {
                console.log(err)
            }
            return res.json({
                message: 'Амжилттай илгээлээ',
                data: cargo
            }).status(200);
        });
    }

    //filter gsen vg

    exports.CargoFindType = (req, res) => {
        const status = req.body.cargo_status;
        const type = req.body.type;
        if(!status){
           return res.json("status")
        }
        Cargo.find({ cargo_status: status, type: {$all: type}}, (err, cargo)=>{
            if(err){
                return res.json(err)
            }
            return res.json({
                cargo
            })
        })
    }

    exports.CargoFindStatus = (req, res) => {
        const status = req.body.cargo_status;
        Cargo.find({ cargo_status: status}, (err, cargo)=> {
            if(err){
                return res.json(err)
            }
            return res.json({
                data:cargo
            })
        })
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



    exports.cargoStatusUpdate = (req, res) => {
        const { cargo_status } = req.body;
    
        Cargo.findOne({ _id: req.params.id }, (err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    error: 'Cargo not found'
                });
            }else{
                user.cargo_status = cargo_status;
            }
    
            user.save((err, updatedUser) => {
                if (err) {
                    return res.status(400).json({
                        error: 'Cargo update failed'
                    });
                }
                res.status(200).json({message: "Амжилттай баталгаажууллаа"});
            });
        });
       
    };


    //comment heseg

    exports.CommentAdd = (req, res) => {
        const { userid, comment, cargoid, ip } = req.body
        const cargo = new Comment({ userid, comment, cargoid, ip });
        cargo.save((err, cargo) => {
            if (err) {
                console.log(err)
            }
            return res.json({
                message: 'Амжилттай илгээлээ',
                data: cargo
            }).status(200);
        });
    }

    exports.commentCargoOne = (req, res) => {
        const id = req.params.id;
        Comment.find({ cargoid: id}, (err, cargo)=> {
            console.log(cargo.userid, "cargo")
            if(err){
                return res.json(err)
            }
            return res.json({
                cargo
            })
        })
    }

    exports.commentUserOne = (req, res) => {
        const id = req.params.id;
        User.findOne({ _id: id}, (err, user)=> {
            if(err){
                return res.json(err)
            }
            return res.json({
                user
            })
        })
    }














       //filters type

       exports.CargoFindType = (req, res) => {
        const status = req.body.cargo_status;
        const type = req.body.type;
        if(!status){
           return res.json("status")
        }
        Cargo.find({ cargo_status: status, type: {$all: type}}, (err, cargo)=>{
            if(err){
                return res.json(err)
            }
            return res.json({
                cargo
            })
        })
        }

    exports.cargoTypeUpdate = (req, res) => {
        const { type } = req.body;
    
        Cargo.findOne({ _id: req.params.id }, (err, user) => {
            if (err || !user) {
                return res.status(400).json({
                   error: 'Cargo not found'
                });
            }else{
                user.type = type;
            }
    
            user.save((err, updatedUser) => {
                if (err) {
                    return res.status(400).json({
                        error: 'Cargo update failed'
                    });
                }
                res.status(200).json({message: "Амжилттай оруулсан"});
            });
        });
       
    };