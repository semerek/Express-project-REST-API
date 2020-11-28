const express = require('express');
const app = express()
const socket = require('socket.io');


const cors = require('cors');

// import routes
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use('/api', testimonialsRoutes); // add post routes to server
app.use('/api', concertsRoutes); // add user routes to server
app.use('/api', seatsRoutes); // add user routes to server

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

const server = app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
  }); 

const io = socket(server);

io.on('connection', socket => {
  console.log('New socket')
})
