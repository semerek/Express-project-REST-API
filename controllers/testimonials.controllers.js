const Testimonial = require('../models/testimonial.model');
var sanitize = require('mongo-sanitize');



//GET /testimonials – zwracanie całej listy wpisów
exports.getAll = async (req, res) => {

  try {
    res.json(await Testimonial.find());
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

//GET /testimonials/:id – zwracanie konkretnego wpisu.
exports.getById = async (req, res) => {

  try {
    const tes = await Testimonial.findOne({_id: req.params.id});
    if (!tes) res.status(404).json({ message: 'Not found' });
    else res.json(tes);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

//GET /testimonials/random – zwracanie losowego wpisu.
exports.getRandom = async (req, res) => {

  try {
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const tes = await Testimonial.findOne().skip(rand);
    if (!tes) res.status(404).json({ message: 'Not found' });
    else res.json(tes);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

//POST /testimonials – dodawanie nowego wpisu na bazie req.body, otrzymanego od części frontendowej.
exports.addNew = async (req, res) => {

  try {
    const clean = sanitize(req.body);
    const { author, text } = clean
    const newTestimonial = new Testimonial({ author: author, text: text });
    await newTestimonial.save();
    res.json({ message: 'OK' });

  } catch (err) {
    res.status(500).json({ message: err });
  }

};
//PUT /testimonials/:id – modyfikacja wpisu o danym id na bazie req.body otrzymanego od części frontendowej.
exports.updateById = async (req, res) => {

  const { author, text } = req.body;
  try {
    const tes = await Testimonial.findOne({_id: req.params.id});
    if (tes) {
      await Testimonial.updateOne({ _id: req.params.id }, { $set: { author: author, text: text } });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

//DELETE /testimonials/:id – usunięcie wpisu o konkretnym id.
exports.deleteById = async (req, res) => {

  try {
    const tes = await (Testimonial.findById(req.params.id));
    if (tes) {
      await Testimonial.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};