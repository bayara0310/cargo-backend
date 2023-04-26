const Rating = require('../models/rating');

exports.RatingAdd = (req, res) => {
    const {userid, cargoid, rating} = req.body;

        Rating.find({ userid: userid, cargoid: cargoid }).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        if(data.length === 0){
            const rate = new Rating({ userid, cargoid, rating });
            rate.save((err, rateting) => {
                if(err){
                    return res.json(err)
                }
                return res.status(200).json('Хадгаллаа');
            })
        }else{
            return res.status(300).json("Энэ каргод үнэлгээ өгсөн байна.")
        }
    });
};

exports.RatingGet = (req, res) => {
    const id = req.params.id
    Rating.find({cargoid: id }).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.json(data)
    });
}