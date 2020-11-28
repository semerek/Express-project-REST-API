const express = require('express');
const router = express.Router();
const db = require('./../db');

const app = express()


//CONCERTS
router.route('/concerts').get((req, res) => {
    res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
    res.json(db.concerts.find(concert => concert.id == req.params.id));
});

router.route('/concerts').post((req, res) => {
    const {performer, genre, price, day} = req.body;
    const id =  db.concerts[Math.floor(Math.random() * db.concerts.length)];
   
    db.concerts.push({ id, performer, genre, price, day });
    res.json({ message: 'OK' });

});

router.route('/concerts/:id').put((req, res) => {
    
    const concerts = db.concerts.find(concert => concert.id == req.params.id);

    if(!concerts) {
        res.status(404).json({message:'Not found'});
        return;
    }

    concerts.performer = req.body.performer;
    concerts.genre = req.body.genre;
    concerts.price = req.body.price;
    concerts.day = req.body.day;
    concerts.info = req.body.info;

    res.json({message: 'OK'});
});

router.route('/concerts/:id').delete((req, res) => {
    db.concerts = db.concerts.filter(concert => concert.id != req.params.id);

     res.json({message:'OK'});
});


module.exports = router;
