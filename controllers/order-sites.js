

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