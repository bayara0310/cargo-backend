const Cargo = require('../models/cargo');
const Comment = require('../models/comment');
const User = require('../models/user');
const Sites = require('../models/sites');

exports.findOne = (req, res) => {
    const cargoId = req.params.id;
    Cargo.findById(cargoId).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'Cargo not found'
            });
        }
        res.json(user);
    });
};

exports.findAllCargosInSites = (req, res) => {
    const sites = req.body.sites; // Assuming the sites array is passed in the request body
  
    // Find all cargos whose IDs are in the sites array
    Sites.find({ _id: { $in: sites } }, (err, cargos) => {
      if (err) {
        return res.status(400).json({
          error: 'Error retrieving cargos',
        });
      }
  
      res.json(cargos);
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

    // exports.CargoFindStatus1 = (req, res) => {
    //     const link = "https://www.amazon.com/New-SteelSeries-Apex-Mini-Customization/dp/B0";
    //     Cargo.find({}, (err, cargo) => {
    //       if (err) {
    //         return res.json(err);
    //       }
      
    //       // Retrieve sites for each cargo individually
    //       const cargoWithSites = cargo.map(async (c) => {
    //         const siteIds = c.sites;
    //         const sites = await Sites.find({ _id: { $in: siteIds } }).exec();
      
    //         // Check if site name is in link
    //         const filteredSites = sites.filter(s => link.includes(s.name));
      
    //         return {
    //           cargo: c,
    //           sites: filteredSites
    //         };
    //       });
      
    //       Promise.all(cargoWithSites)
    //         .then((results) => {
    //           // Access the cargo and corresponding sites information
    //           console.log(results);
      
    //           // Process the cargo and sites information as needed
      
    //           return res.json({
    //             data: results
    //           });
    //         })
    //         .catch((error) => {
    //           console.error('Failed to retrieve cargo sites:', error);
    //           return res.json(error);
    //         });
    //     });
    //   };

    exports.CargoFindStatus1 = (req, res) => {
        Cargo.find({}, (err, cargo) => {
          if (err) {
            return res.json(err);
          }
      
          // Retrieve sites for each cargo individually
          const cargoWithSites = cargo.map(async (c) => {
            const siteIds = c.sites;
            const sites = await Sites.find({ _id: { $in: siteIds } }).exec();
            return {
              cargo: c,
              sites: sites
            };
          });
      
          Promise.all(cargoWithSites)
            .then((results) => {
              // Access the cargo and corresponding sites information
      
              // Process the cargo and sites information as needed
      
              return res.json({
                data: results.map((result) => ({
                  cargo: result.cargo,
                  sites: result.sites
                }))
              });
            })
            .catch((error) => {
              console.error('Failed to retrieve cargo sites:', error);
              return res.json(error);
            });
        });
      };

    //   exports.CargoFindStatus1 = (req, res) => {
    //     Cargo.find({}, (err, cargo) => {
    //       if (err) {
    //         return res.json(err);
    //       }
      
    //       // Retrieve sites for each cargo individually
    //       const cargoWithSites = cargo.map(async (c) => {
    //         const siteIds = c.sites;
    //         const sites = await Sites.find({ _id: { $in: siteIds } }).exec();
    //         return {
    //           cargo: c,
    //           sites: sites
    //         };
    //       });
      
    //       Promise.all(cargoWithSites)
    //         .then((results) => {
    //           // Access the cargo and corresponding sites information
    //           console.log(results);
      
    //           // Process the cargo and sites information as needed
      
    //           return res.json({
    //             data: results
    //           });
    //         })
    //         .catch((error) => {
    //           console.error('Failed to retrieve cargo sites:', error);
    //           return res.json(error);
    //         });
    //     });
    //   };
      


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
    
    exports.commentFindUser = (req, res) => {
        const id = req.params.id;
        Comment.find({ userid: id}, (err, user)=> {
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


    exports.cargoNationUpdate = (req, res) => {
        const { nation } = req.body;
    
        Cargo.findOne({ _id: req.params.id }, (err, user) => {
            if (err || !user) {
                return res.status(400).json({
                   error: 'Cargo not found'
                });
            }else{
                user.nation = nation;
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

    exports.cargoFilterNationtype = (req, res) => {
        const { nation, type } = req.body ;
        
        if (nation?.length === 0 && type?.length === 0) {
            Cargo.find({ cargo_status: "APPROVED"}, (err, cargo)=> {
                if(err){
                    return res.json(err)
                }
                return res.json({
                    cargo
                })
            })
        }

        if(nation?.length && type?.length > 0){
            Cargo.find({ nation: {$all: nation}, type: {$all: type}, cargo_status: "APPROVED"}, (err, cargo)=>{
                if(err){
                    return res.json(err)
                }
                return res.json({
                    cargo
                })
            })
        }
        else if(nation?.length > 0){
            Cargo.find({ nation: {$all: nation}, cargo_status: "APPROVED"}, (err, cargo)=>{
                if(err){
                    return res.json(err)
                }
                console.log(cargo)
                return res.json({
                    cargo
                })
            })
        }
        else if(type?.length > 0){
            Cargo.find({ type: {$all: type}, cargo_status: "APPROVED"}, (err, cargo)=>{
                if(err){
                    return res.json(err)
                }
                return res.json({
                    cargo
                })
            })
        }
        
    }
    