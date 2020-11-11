const express = require('express');
const router = express.Router();
const db = require('./../db');

const app = express()


//CONCERTS
router.route('/concerts').get((req, res) => {
    res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
    res.json(db.concerts, {id: req.params.id})
});

router.route('/concerts').post((req, res) => {
    const {performer, genre, price, day} = req.body;
    const id =  db.concerts[Math.floor(Math.random() * db.concerts.length)];
   
    res.json({ message: 'OK' })
});

router.route('/concerts/:id').put((req, res) => {
    
    const concerts = db.concerts.find(concert => concert.id == req.params.id);

    if(!concerts) {
        res.status(404).json({message:'Not found'})
    }

    res.json({message: 'OK'});
});

router.route('/concerts/:id').delete((req, res) => {
    db.concerts = db.concerts.find(concert => concert.id =! req.params.id);

     res.json({message:'OK'});
});

app.use((req, res) => {
    res.status(404).json({ message: '404 not found...' });
    db.concerts = db.concerts.find(concert => concert.id =! req.params.id);
    
    res.json({message:'OK'});
});

module.exports = router;
