const express = require('express');
const mongoose = require('mongoose');


const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

const socket = require('socket.io');
const path = require("path");
const cors = require('cors');

const app = express()

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  req.io = io;
  next();
});


app.use('/api', testimonialsRoutes); // add post routes to server
app.use('/api', concertsRoutes); // add user routes to server
app.use('/api', seatsRoutes); // add user routes to server

app.use(express.static(path.join(__dirname + "/client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});


app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

mongoose.connect('mongodb://localhost:27017/NewWaveDB', { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

const server = app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
  }); 

const io = socket(server);

io.on('connection', socket => {
  console.log('New socket')
  socket.on('seatsUpdated', seats => {
    socket.broadcast('seatsUpdated', seats);
  });
});

module.exports = server;
