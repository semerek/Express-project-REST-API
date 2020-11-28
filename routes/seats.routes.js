const express = require('express');
const router = express.Router();
const db = require('./../db');

const app = express()


//SEATS

router.route('/seats').get((req, res) => {
    res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
    res.json(db.seats.find(seat => seat.id == req.params.id));
});

router.route('/seats').post((req, res) => {
    const { day, seat, client, email } = req.body;
    const id = db.seats[Math.floor(Math.random() * db.seats.length)];

    db.seats.push({id, day, seat, client, email});
    res.json({ message: 'OK' });
});

router.route('/seats/:id').put((req, res) => {
    const seats = db.seats.find(seat => seat.id == req.params.id);

    if(!seats) {
        res.status(404).json({message:'Not found'});
        return;
    }

    seats.day = req.body.day;
    seats.seat = req.body.seat;
    seats.client = req.body.client;
    seats.email = req.body.email;

    res.json({ message: 'OK'});
    
});

router.route('/seats/:id').delete((req, res) => {
    db.seats = db.seats.filter(seat => seat.id != req.params.id);
    
    res.json({ message:'OK' });
});


module.exports = router;
