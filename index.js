const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const twilio = require('twilio');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 8000;

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

const BookedSeat = require('./models/bookedseats');

const {
  MondaySeat,
  TuesdaySeat,
  WednesdaySeat,
  ThursdaySeat,
  FridaySeat,
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


// Book the monday seats
app.post('/book-monday', async (req, res) => {
  const { selectedSeats } = req.body;

  try {
    // Store the selected seats in the bookedSeats collection in your database
    await MondaySeat.insertMany(selectedSeats.map((seatNumber) => ({ seatNumber })));

    res.json({ success: true });
  } catch (error) {
    console.error('Failed to book seats:', error);
    res.status(500).json({ success: false, error: 'Failed to book seats' });
  }
});

// Book the Tuesday seats
app.post('/book-tuesday', async (req, res) => {
  const { selectedSeats } = req.body;

  try {
    // Store the selected seats in the bookedSeats collection in your database
    await TuesdaySeat.insertMany(selectedSeats.map((seatNumber) => ({ seatNumber })));

    res.json({ success: true });
  } catch (error) {
    console.error('Failed to book seats:', error);
    res.status(500).json({ success: false, error: 'Failed to book seats' });
  }
});


// Book the Wednesday seats
app.post('/book-wednesday', async (req, res) => {
  const { selectedSeats } = req.body;

  try {
    // Store the selected seats in the bookedSeats collection in your database
    await WednesdaySeat.insertMany(selectedSeats.map((seatNumber) => ({ seatNumber })));

    res.json({ success: true });
  } catch (error) {
    console.error('Failed to book seats:', error);
    res.status(500).json({ success: false, error: 'Failed to book seats' });
  }
});


// Book the Thursday seats
app.post('/book-thursday', async (req, res) => {
  const { selectedSeats } = req.body;

  try {
    // Store the selected seats in the bookedSeats collection in your database
    await ThursdaySeat.insertMany(selectedSeats.map((seatNumber) => ({ seatNumber })));

    res.json({ success: true });
  } catch (error) {
    console.error('Failed to book seats:', error);
    res.status(500).json({ success: false, error: 'Failed to book seats' });
  }
});


// Book the Friday seats
app.post('/book-friday', async (req, res) => {
  const { selectedSeats } = req.body;

  try {
    // Store the selected seats in the bookedSeats collection in your database
    await FridaySeat.insertMany(selectedSeats.map((seatNumber) => ({ seatNumber })));

    res.json({ success: true });
  } catch (error) {
    console.error('Failed to book seats:', error);
    res.status(500).json({ success: false, error: 'Failed to book seats' });
  }
});


// Book the saturday seats
app.post('/book-saturday', async (req, res) => {
  const { selectedSeats } = req.body;

  try {
    // Store the selected seats in the bookedSeats collection in your database
    await SaturdaySeat.insertMany(selectedSeats.map((seatNumber) => ({ seatNumber })));

    res.json({ success: true });
  } catch (error) {
    console.error('Failed to book seats:', error);
    res.status(500).json({ success: false, error: 'Failed to book seats' });
  }
});


// Book the Sunday seats
app.post('/book-sunday', async (req, res) => {
  const { selectedSeats } = req.body;

  try {
    // Store the selected seats in the bookedSeats collection in your database
    await SundaySeat.insertMany(selectedSeats.map((seatNumber) => ({ seatNumber })));

    res.json({ success: true });
  } catch (error) {
    console.error('Failed to book seats:', error);
    res.status(500).json({ success: false, error: 'Failed to book seats' });
  }
});


// Route to get the list of booked Monday seats from the database
app.get('/booked-monday', async (req, res) => {
  try {
    // Query the database to get all booked seats
    const bookedSeats = await MondaySeat.find({}, { seatNumber: 1, _id: 0 });
    const bookedSeatNumbers = bookedSeats.map((seat) => seat.seatNumber);
    res.json({ bookedSeats: bookedSeatNumbers });
  } catch (error) {
    console.error('Failed to fetch booked seats:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch booked seats' });
  }
});

// Route to get the list of booked Tuesday seats from the database
app.get('/booked-tuesday', async (req, res) => {
  try {
    // Query the database to get all booked seats
    const bookedSeats = await TuesdaySeat.find({}, { seatNumber: 1, _id: 0 });
    const bookedSeatNumbers = bookedSeats.map((seat) => seat.seatNumber);
    res.json({ bookedSeats: bookedSeatNumbers });
  } catch (error) {
    console.error('Failed to fetch booked seats:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch booked seats' });
  }
});

// Route to get the list of booked Wednesday seats from the database
app.get('/booked-wednesday', async (req, res) => {
  try {
    // Query the database to get all booked seats
    const bookedSeats = await WednesdaySeat.find({}, { seatNumber: 1, _id: 0 });
    const bookedSeatNumbers = bookedSeats.map((seat) => seat.seatNumber);
    res.json({ bookedSeats: bookedSeatNumbers });
  } catch (error) {
    console.error('Failed to fetch booked seats:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch booked seats' });
  }
});


// Route to get the list of booked thurstday seats from the database
app.get('/booked-thursday', async (req, res) => {
  try {
    // Query the database to get all booked seats
    const bookedSeats = await ThursdaySeat.find({}, { seatNumber: 1, _id: 0 });
    const bookedSeatNumbers = bookedSeats.map((seat) => seat.seatNumber);
    res.json({ bookedSeats: bookedSeatNumbers });
  } catch (error) {
    console.error('Failed to fetch booked seats:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch booked seats' });
  }
});

// Route to get the list of booked thurstday seats from the database
app.get('/booked-friday', async (req, res) => {
  try {
    // Query the database to get all booked seats
    const bookedSeats = await FridaySeat.find({}, { seatNumber: 1, _id: 0 });
    const bookedSeatNumbers = bookedSeats.map((seat) => seat.seatNumber);
    res.json({ bookedSeats: bookedSeatNumbers });
  } catch (error) {
    console.error('Failed to fetch booked seats:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch booked seats' });
  }
});

// Route to get the list of booked saturday seats from the database
app.get('/booked-saturday', async (req, res) => {
  try {
    // Query the database to get all booked seats
    const bookedSeats = await SaturdaySeat.find({}, { seatNumber: 1, _id: 0 });
    const bookedSeatNumbers = bookedSeats.map((seat) => seat.seatNumber);
    res.json({ bookedSeats: bookedSeatNumbers });
  } catch (error) {
    console.error('Failed to fetch booked seats:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch booked seats' });
  }
});

// Route to get the list of booked sunday seats from the database
app.get('/booked-sunday', async (req, res) => {
  try {
    // Query the database to get all booked seats
    const bookedSeats = await SundaySeat.find({}, { seatNumber: 1, _id: 0 });
    const bookedSeatNumbers = bookedSeats.map((seat) => seat.seatNumber);
    res.json({ bookedSeats: bookedSeatNumbers });
  } catch (error) {
    console.error('Failed to fetch booked seats:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch booked seats' });
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