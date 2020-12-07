const Concert = require('../models/concert.model');


exports.getPerformer = async (req, res) => {

    try {
        const con = await Concert.findOne({ performer: req.params.id });
        if (con) res.json(con);
        else res.status(404).json ({ message: 'Not found'});
      }
      catch (err) {
        res.status(500).json({ message: err });
      }
} 

exports.getGenre = async (req, res) => {

    try {
        const con = await Concert.findOne({ genre: req.params.id });
        if(con) res.json(con);
        else res.status(404).json({ message: 'Not found' })
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
}
exports.getPriceRange = async (req, res) => {
    
    try {
    const con = await Concert.find ( { $and: [ { price: { $gte: req.params.price_min } }, { price: { $lte: req.params.price_max } } ] } );
    if (con) res.json(con);
    else res.status(404).json({ message: 'Not found' });

    } catch (err) {
        res.status(500).json({ message: err });
    }
}

exports.getDayConcert = async (req, res) => {

    try {
       const con = await Concert.find( {day: req.params.day});
       if(con) res.json(con);
       else res.status(404).json({ message: 'Not found' })
    } catch (err) {
        res.status(500).json({ message: err})

    }
}

//$and performs a logical AND operation on an array of one or more expressions and selects the documents that satisfy all the expressions in the array.