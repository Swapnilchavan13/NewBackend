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

const BookedSeat = require('./models/bookedseats');


// Twilio API credentials
const accountSid = 'ACf495c3028b01961eb2fe87cc4a917bb2';
const authToken = '2970039d64ea69fd5b286269ac23c21b';
const twilioPhoneNumber = '+17209614582';

// Create a Twilio client
const client = twilio(accountSid, authToken);

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Enable CORS to allow requests from your React frontend
app.use(cors());

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