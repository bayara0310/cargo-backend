const Order = require('../models/order');
const { BARAA } = require('../types');

    exports.OrderAdd = (req, res) => {
        const { type, link, cargoid, color, size, price, date, userid, number } = req.body
        const cargo = new Order({  type, link, cargoid, color, size, price, date, userid, number });
        console.log(cargo)
        cargo.save((err, cargo) => {
            if (err) {
                return res.json(err)
            }
            return res.json({
                message: 'Амжилттай илгээлээ',
                data: cargo
            });
        });
    }

    exports.FindUserOrderAll = (req, res) => {
       const id  = req.params.id;
       Order.find({userid: id}, (err, order) =>{
        if(err){
            console.log(err)
            return res.json(err)
        }
        return res.json({
            order
        })
       })
    }

    exports.findCargoOrderGet = (req, res) => {
        const cargoid  = req.body.id;
        const type = req.body.type;

        if(type === 1){
            Order.find({cargoid: cargoid}, (err, order) =>{
                if(err){
                    console.log(err)
                    return res.json(err)
                }
                return res.json({
                    order
                })
            })
        }
        if(type === 2){
            Order.find({cargoid: cargoid, status: "REGISTERED"}, (err, order) =>{
                if(err){
                    console.log(err)
                    return res.json(err)
                }
                return res.json({
                    order
                })
            })
        }
        if(type === 3){
            Order.find({cargoid: cargoid, status: "APPROVED"}, (err, order) =>{
                if(err){
                    console.log(err)
                    return res.json(err)
                }
                return res.json({
                    order
                })
            })
        }
        if(type === 4){
            Order.find({cargoid: cargoid, status: "RECEIVED"}, (err, order) =>{
                if(err){
                    console.log(err)
                    return res.json(err)
                }
                return res.json({
                    order
                })
            })
        }
        if(type === 5){
            Order.find({cargoid: cargoid, status: "CAME"}, (err, order) =>{
                if(err){
                    console.log(err)
                    return res.json(err)
                }
                return res.json({
                    order
                })
            })
        }
        if(type === 6){
            Order.find({cargoid: cargoid, status: "CONFIRM"}, (err, order) =>{
                if(err){
                    console.log(err)
                    return res.json(err)
                }
                return res.json({
                    order
                })
            })
        }
     }

     exports.findOneOrder = (req, res) => {
        const cargoId = req.params.id;
        console.log(cargoId, "ids");
        Order.findById(cargoId).exec((err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    error: 'Order not found'
                });
            }
            // user.hashed_password = undefined;
            // user.salt = undefined;
            res.json(user);
        });
    };


    exports.OrderTypeUpdate = (req, res) => {
        const { status } = req.body;
    
        Order.findOne({ _id: req.params.id }, (err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    error: 'Order not found'
                });
            }else{
                user.status = status;
            }
    
            user.save((err, updatedUser) => {
                if (err) {
                    return res.status(400).json({
                        error: 'Order update failed'
                    });
                }
                res.status(200).json({message: "Амжилттай баталгаажууллаа"});
            });
        });
       
    };

    exports.OrderUpdateImage = (req, res) => {
        const { image, invoice, status, track } = req.body;
    
        Order.findOne({ _id: req.params.id }, (err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    error: 'Order not found'
                });
            }else{
                user.invoice = invoice;
                user.image = image;
                user.status = status;
                user.trackCode = track;
            }
    
            user.save((err, updatedUser) => {
                if (err) {
                    return res.status(400).json({
                        error: 'Order update failed'
                    });
                }
                res.status(200).json({message: "Амжилттай баталгаажууллаа"});
            });
        });
       
    };

    exports.OrderFilter = (req, res) => {
        const {status, id} = req.body;

        if(status === false){
            Order.find({userid: id}, (err, cargo)=> {
                if(err){
                    return res.json(err)
                }
                return res.json({
                    cargo
                })
            })
           }

        if(status && id){
            Order.find({userid: id, status: status}, (err, cargo)=> {
                if(err){
                    return res.json(err)
                }
                return res.json({
                    cargo
                })
            })
        }

    }

    //search heseg

    exports.OrderSearch = (req, res) => {
        const query = req.params.id;
        Order.find({ trackCode: {$regex: query }}, (err, data) => {
            if(err){
                return res.json(err)
            }
            return res.json({
                data
            }) 
        })
    }

    
    exports.SearchOrderAdmin = (req, res) => {
        const {search, id} = req.body;
        console.log(search)
        Order.find({ type: {$regex: search }, cargoid:id}, (err, order) => {
            if(err){
                return res.json(err)
            }
            return res.json({
                order
            }) 
        })
    }

