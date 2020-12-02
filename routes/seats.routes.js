const express = require('express');
const router = express.Router();
const db = require('../db.js');
const { v4: uuidv4 } = require('uuid');



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

    const checkBooking = db.seats.some(booking => booking.day == day && booking.seat == seat);
    if (!checkBooking) {
        db.seats.push({
            id: uuidv4(),
            day: day,
            seat: seat,
            client: client,
            email: email,
        });
        req.io.emit('seatsUpdated', db.seats);
        res.json({ message: 'ok' });
    } else {
        res.status(409).json({ message: "The slot is already taken..." });
    }
});

router.route('/seats/:id').put((req, res) => {
    
    const{day, seat, client, email} = req.body;
    const seats = db.seats.find(seat => seat.id == req.params.id);
    index = db.seats.indexOf(seats);

    const updatedSeat= {
        ...seats,
        day: day,
        seat: seat,
        client: client,
        email: email,
    };
    
    db.seat(index) = updatedSeat;
    res.json({ message: 'OK'});
    
});

router.route('/seats/:id').delete((req, res) => {
    const seat = db.seats.find(seat => seat.id == req.params.id);
    const index = db.seat.indexOf(seat);
    db.seats.splice(index, 1);
    
    res.json({ message:'OK' });
});


module.exports = router;
