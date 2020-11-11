const express = require('express');
const app = express()

const cors = require('cors');

// import routes
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use('/api', testimonialsRoutes); // add post routes to server
app.use('/api', concertsRoutes); // add user routes to server
app.use('/api', seatsRoutes); // add user routes to server

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
