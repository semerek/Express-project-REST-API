const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {

  try {
    res.json(await Seat.find());
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};


exports.getById = async (req, res) => {

  try {
    const sea = await Seat.findOne({_id: req.params.id});
    if (!sea) res.status(404).json({ message: 'Not found' });
    else res.json(sea);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.addNew = async (req, res) => {

  try {
    const {day, seat, client, email } = req.body;
    const newSeat = new Seat({day: day, seat: seat, client: client, email: email });
    await newSeat.save();
    res.json({ message: 'OK' });

  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.updateById = async (req, res) => {

  const { day, seat, client, email } = req.body;

  try {
    if (sea) {
      const sea = await Seat.findOne({_id: req.params.id});
      await Seat.updateOne({ _id: req.params.id }, { $set: {day: day, seat: seat, client: client, email: email } });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteById = async (req, res) => {

  try {
    const sea = await (Seat.findById(req.params.id));
    if (sea) {
      await Sea.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};