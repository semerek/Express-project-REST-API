const express = require('express');
const router = express.Router();
const db = require('./../db');

const app = express()



//GET /testimonials – zwracanie całej listy wpisów
router.route('/testimonials').get((req, res) => {
    res.json(db.testimonials);
});

//GET /testimonials/:id – zwracanie konkretnego wpisu.
router.route('/testimonials/:id').get((req, res) => {
    res.json(db.testimonials, {id: req.params.id})
});

//GET /testimonials/random – zwracanie losowego wpisu.
router.route('/testimonials/random').get((req, res) => {
    res.json(db.testimonials[Math.floor(Math.random() * db.testimonials.length)])
 });

//POST /testimonials – dodawanie nowego wpisu na bazie req.body, otrzymanego od części frontendowej.
router.route('/testimonials').post((req, res) => {
    const {author, text} = req.body;
    const id =  db.testimonials[Math.floor(Math.random() * db.testimonials.length)];
    res.json({ message: 'OK' })
});
//PUT /testimonials/:id – modyfikacja wpisu o danym id na bazie req.body otrzymanego od części frontendowej.
router.route('/testimonials/:id').put ((req, res) => {
    
    const testimonials = db.testimonials.find(testimonial => testimonial.id == req.params.id);

    if(!testimonials) {
        res.status(404).json({message:'Not found'})
    }

});

//DELETE /testimonials/:id – usunięcie wpisu o konkretnym id.
router.route('/testimonials/:id').delete((req, res) => {
    db.testimonials = db.testimonials.find(testimonial => testimonial.id =! req.params.id);
    
    res.json({message:'OK'});
});

app.use((req, res) => {
    res.status(404).json({ message: '404 not found...' });
})

module.exports = router;
