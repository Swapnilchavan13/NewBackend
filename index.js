const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const twilio = require('twilio');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

mongoose.set('strictQuery', false);

// MongoDB Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// const BookedSeat = require('./models/bookedseats');

const {
  MondaySeat,
  TuesdaySeat,
  WednesdaySeat,
  ThursdaySeat,
  BookedSeat,
  SaturdaySeat,
  SundaySeat,
} = require('./models/bookedseats'); // Import your Mongoose models here

// Twilio API credentials
const accountSid = 'ACf495c3028b01961eb2fe87cc4a917bb2';
const authToken = process.env.auth;
const twilioPhoneNumber = '+17209614582';

// Create a Twilio client
const client = twilio(accountSid, authToken);

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Enable CORS to allow requests from your React frontend
app.use(cors());

// POST request to create a new seat for a specific day
app.post('/seats/:day', async (req, res) => {
  const day = req.params.day;
  let model;

  switch (day) {
    case 'monday':
      model = MondaySeat;
      break;
    case 'tuesday':
      model = TuesdaySeat;
      break;
    case 'wednesday':
      model = WednesdaySeat;
      break;
    case 'thursday':
      model = ThursdaySeat;
      break;
    case 'saturday':
      model = SaturdaySeat;
      break;
    case 'sunday':
      model = SundaySeat;
      break;
    default:
      return res.status(404).json({ error: 'Invalid day' });
  }

  const { seatNumber } = req.body;

  try {
    const newSeat = new model({ seatNumber });
    await newSeat.save();
    res.status(201).json(newSeat);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


// GET request to retrieve all seats for a specific day as an array
app.get('/seats/:day', async (req, res) => {
  const day = req.params.day;
  let model;

  switch (day) {
    case 'monday':
      model = MondaySeat;
      break;
    case 'tuesday':
      model = TuesdaySeat;
      break;
    case 'wednesday':
      model = WednesdaySeat;
      break;
    case 'thursday':
      model = ThursdaySeat;
      break;
    case 'saturday':
      model = SaturdaySeat;
      break;
    case 'sunday':
      model = SundaySeat;
      break;
    default:
      return res.status(404).json({ error: 'Invalid day' });
  }

  try {
    const seats = await model.find({}, { seatNumber: 1, _id: 0 });
    const seatNumbers = seats.map((seat) => seat.seatNumber);
    res.json(seatNumbers);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Book the seats

app.post('/book-seats', async (req, res) => {
  const { selectedSeats } = req.body;

  try {
    // Store the selected seats in the bookedSeats collection in your database
    await BookedSeat.insertMany(selectedSeats.map((seatNumber) => ({ seatNumber })));

    res.json({ success: true });
  } catch (error) {
    console.error('Failed to book seats:', error);
    res.status(500).json({ success: false, error: 'Failed to book seats' });
  }
});

// Route to get the list of booked seats from the database
app.get('/booked-seats', async (req, res) => {
  try {
    // Query the database to get all booked seats
    const bookedSeats = await BookedSeat.find({}, { seatNumber: 1, _id: 0 });
    const bookedSeatNumbers = bookedSeats.map((seat) => seat.seatNumber);
    res.json({ bookedSeats: bookedSeatNumbers });
  } catch (error) {
    console.error('Failed to fetch booked seats:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch booked seats' });
  }
});

// Send SMS route
app.post('/api/send-sms', (req, res) => {
  const { to, body } = req.body;

  client.messages
    .create({
      body,
      from: twilioPhoneNumber,
      to,
    })
    .then((message) => {
      console.log(`Message sent with SID: ${message.sid}`);
      res.json({ success: true });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ success: false, error: 'Failed to send SMS' });
    });
});

// Start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});
