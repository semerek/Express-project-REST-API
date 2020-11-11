const express = require('express');
const router = express.Router();
const db = require('./../db');

const app = express()


//SEATS

router.route('/seats').get((req, res) => {
    res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
    res.json(db.seats, { id: req.params.id })
});

router.route('/seats').post((req, res) => {
    const { day, seat, client, email } = req.body;
    const id = db.seats[Math.floor(Math.random() * db.seats.length)];

    res.json({ message: 'OK' })
});

router.route('/seats/:id').put((req, res) => {
    const seats = db.concerts.find(seat => seat.id == req.params.id);

    if(!seats) {
        res.status(404).json({message:'Not found'})
    }

    res.json({message: 'OK'});
    
});

router.route('/seats/:id').delete((req, res) => {
    db.seats = db.seats.find(seat => seat.id =! req.params.id);
    
    res.json({message:'OK'});
});


app.use((req, res) => {
    res.status(404).json({ message: '404 not found...' });
})

module.exports = router;
