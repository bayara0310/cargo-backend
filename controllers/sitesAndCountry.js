const Sites = require('../models/sites');
const Country = require('../models/country');
const Cargo = require('../models/cargo');

exports.SitesAdd = (req, res) => {
    const { name, link, logo } = req.body
    const cargo = new Sites({  name, link, logo });
    cargo.save((err, cargo) => {
        if (err) {
            return res.json(err)
        }
        return res.json({
            message: 'Амжилттай орууллаа',
        });
    });
}

exports.CountryAdd = (req, res) => {
    const { name, sname, logo } = req.body
    const cargo = new Country({  name, sname, logo });
    cargo.save((err, cargo) => {
        if (err) {
            return res.json(err)
        }
        return res.json({
            message: 'Амжилттай орууллаа',
        });
    });
}

exports.SitesAll = (req, res) => {
    Sites.find({}, (err, cargos) => {
        if(err){
            console.log(err)
        }else{
            res.json(cargos)
        }
    })
}

exports.CountryAll = (req, res) => {
    Country.find({}, (err, cargos) => {
        if(err){
            console.log(err)
        }else{
            res.json(cargos)
        }
    })
}


//sites add

exports.cargoSitesUpdate = (req, res) => {
    const { type } = req.body;

    Cargo.findOne({ _id: req.params.id }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
               error: 'Cargo not found'
            });
        }else{
            user.sites = type;
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