const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const twilio = require('twilio');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 8000;
// MongoDB Connection

mongoose.set('strictQuery', false);

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


// Book the Monday seats
app.post('/book-monday', async (req, res) => {
  const { selectedSeats, showTime, mobNum } = req.body;

  try {
    // Check if the selected seats and showTime are already booked
    const existingBookings = await MondaySeat.find({
      seatNumber: { $in: selectedSeats },
      showTime,
    });

    if (existingBookings.length > 0) {
      // Tickets are already booked
      res.json({ success: false, message: 'Sorry Seats are already booked Please select another Seats' });
    } else {
      // Store the selected seats for Monday in the database
      const seatsToBook = selectedSeats.map((seatNumber) => ({
        seatNumber,
        showTime,
        mobNum,
        sdate
      }));

      // Assuming MondaySeat is your database model for Monday bookings
      await MondaySeat.insertMany(seatsToBook);

      res.json({ success: true });
    }
  } catch (error) {
    console.error('Failed to book seats:', error);
    res.status(500).json({ success: false, error: 'Failed to book seats' });
  }
});


// Book the Tuesday seats
app.post('/book-tuesday', async (req, res) => {
  const { selectedSeats, showTime, mobNum } = req.body;


  try {
    // Check if the selected seats and showTime are already booked
    const existingBookings = await TuesdaySeat.find({
      seatNumber: { $in: selectedSeats },
      showTime,
    });

    if (existingBookings.length > 0) {
      // Tickets are already booked
      res.json({ success: false, message: 'Sorry Seats are already booked Please select another Seats' });
    } else {
      // Store the selected seats for Tuesday in the database
      const seatsToBook = selectedSeats.map((seatNumber) => ({
        seatNumber,
        showTime,
        mobNum,
        sdate
      }));

      // Assuming MondaySeat is your database model for Tuesday bookings
      await TuesdaySeat.insertMany(seatsToBook);

      res.json({ success: true });
    }
  } catch (error) {
    console.error('Failed to book seats:', error);
    res.status(500).json({ success: false, error: 'Failed to book seats' });
  }
});


// Book the Wednesday seats
app.post('/book-wednesday', async (req, res) => {
  const { selectedSeats, showTime, mobNum } = req.body;

  try {
    // Check if the selected seats and showTime are already booked
    const existingBookings = await WednesdaySeat.find({
      seatNumber: { $in: selectedSeats },
      showTime,
    });

    if (existingBookings.length > 0) {
      // Tickets are already booked
      res.json({ success: false, message: 'Sorry Seats are already booked Please select another Seats' });
    } else {
      // Store the selected seats for Wednesday in the database
      const seatsToBook = selectedSeats.map((seatNumber) => ({
        seatNumber,
        showTime,
        mobNum,
        sdate
      }));

      // Assuming MondaySeat is your database model for Wednesday bookings
      await WednesdaySeat.insertMany(seatsToBook);

      res.json({ success: true });
    }
  } catch (error) {
    console.error('Failed to book seats:', error);
    res.status(500).json({ success: false, error: 'Failed to book seats' });
  }
});


// Book the Thursday seats
app.post('/book-thursday', async (req, res) => {
  const { selectedSeats, showTime, mobNum } = req.body;

  try {
    // Check if the selected seats and showTime are already booked
    const existingBookings = await ThursdaySeat.find({
      seatNumber: { $in: selectedSeats },
      showTime,
    });

    if (existingBookings.length > 0) {
      // Tickets are already booked
      res.json({ success: false, message: 'Sorry Seats are already booked Please select another Seats' });
    } else {
      // Store the selected seats for Thursday in the database
      const seatsToBook = selectedSeats.map((seatNumber) => ({
        seatNumber,
        showTime,
        mobNum,
        sdate
      }));

      // Assuming MondaySeat is your database model for Thursday bookings
      await ThursdaySeat.insertMany(seatsToBook);

      res.json({ success: true });
    }
  } catch (error) {
    console.error('Failed to book seats:', error);
    res.status(500).json({ success: false, error: 'Failed to book seats' });
  }
});


// Book the Friday seats
app.post('/book-friday', async (req, res) => {
  const { selectedSeats, showTime, mobNum } = req.body;

  try {
    // Check if the selected seats and showTime are already booked
    const existingBookings = await FridaySeat.find({
      seatNumber: { $in: selectedSeats },
      showTime,
    });

    if (existingBookings.length > 0) {
      // Tickets are already booked
      res.json({ success: false, message: 'Sorry Seats are already booked Please select another Seats' });
    } else {
      // Store the selected seats for Friday in the database
      const seatsToBook = selectedSeats.map((seatNumber) => ({
        seatNumber,
        showTime,
        mobNum,
        sdate
      }));

      // Assuming MondaySeat is your database model for Friday bookings
      await FridaySeat.insertMany(seatsToBook);

      res.json({ success: true });
    }
  } catch (error) {
    console.error('Failed to book seats:', error);
    res.status(500).json({ success: false, error: 'Failed to book seats' });
  }
});


// Book the saturday seats
app.post('/book-saturday', async (req, res) => {
  const { selectedSeats, showTime, mobNum } = req.body;

  try {
    // Check if the selected seats and showTime are already booked
    const existingBookings = await SaturdaySeat.find({
      seatNumber: { $in: selectedSeats },
      showTime,
    });

    if (existingBookings.length > 0) {
      // Tickets are already booked
      res.json({ success: false, message: 'Sorry Seats are already booked Please select another Seats' });
    } else {
      // Store the selected seats for saturday in the database
      const seatsToBook = selectedSeats.map((seatNumber) => ({
        seatNumber,
        showTime,
        mobNum,
        sdate
      }));

      // Assuming MondaySeat is your database model for saturday bookings
      await SaturdaySeat.insertMany(seatsToBook);

      res.json({ success: true });
    }
  } catch (error) {
    console.error('Failed to book seats:', error);
    res.status(500).json({ success: false, error: 'Failed to book seats' });
  }
});

// Book the Sunday seats
app.post('/book-sunday', async (req, res) => {
  const { selectedSeats, showTime, mobNum } = req.body;

  try {
    // Check if the selected seats and showTime are already booked
    const existingBookings = await SundaySeat.find({
      seatNumber: { $in: selectedSeats },
      showTime,
    });

    if (existingBookings.length > 0) {
      // Tickets are already booked
      res.json({ success: false, message: 'Sorry Seats are already booked Please select another Seats' });
    } else {
      // Store the selected seats for Sunday in the database
      const seatsToBook = selectedSeats.map((seatNumber) => ({
        seatNumber,
        showTime,
        mobNum,
        sdate
      }));

      // Assuming MondaySeat is your database model for Sunday bookings
      await SundaySeat.insertMany(seatsToBook);

      res.json({ success: true });
    }
  } catch (error) {
    console.error('Failed to book seats:', error);
    res.status(500).json({ success: false, error: 'Failed to book seats' });
  }
});


// Route to get the list of booked Monday seats from the database
app.get('/booked-monday', async (req, res) => {
  try {
    // Query the database to get all booked seats for Monday
    const bookedSeats = await MondaySeat.find({}, { _id: 0 });

    res.json({ bookedSeats });
  } catch (error) {
    console.error('Failed to fetch booked seats:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch booked seats' });
  }
});


// Route to get the list of booked Tuesday seats from the database
app.get('/booked-tuesday', async (req, res) => {
  try {
    // Query the database to get all booked seats for Monday
    const bookedSeats = await TuesdaySeat.find({}, { _id: 0 });

    res.json({ bookedSeats });
  } catch (error) {
    console.error('Failed to fetch booked seats:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch booked seats' });
  }
});

// Route to get the list of booked Wednesday seats from the database
app.get('/booked-wednesday', async (req, res) => {

  try {
    // Query the database to get all booked seats for Monday
    const bookedSeats = await WednesdaySeat.find({}, { _id: 0 });

    res.json({ bookedSeats });
  } catch (error) {
    console.error('Failed to fetch booked seats:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch booked seats' });
  }
});


// Route to get the list of booked thurstday seats from the database
app.get('/booked-thursday', async (req, res) => {
  try {
    // Query the database to get all booked seats for Monday
    const bookedSeats = await ThursdaySeat.find({}, { _id: 0 });

    res.json({ bookedSeats });
  } catch (error) {
    console.error('Failed to fetch booked seats:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch booked seats' });
  }
});

// Route to get the list of booked thurstday seats from the database
app.get('/booked-friday', async (req, res) => {
  try {
    // Query the database to get all booked seats for Monday
    const bookedSeats = await FridaySeat.find({}, { _id: 0 });

    res.json({ bookedSeats });
  } catch (error) {
    console.error('Failed to fetch booked seats:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch booked seats' });
  }
});

// Route to get the list of booked saturday seats from the database
app.get('/booked-saturday', async (req, res) => {
  try {
    // Query the database to get all booked seats for Monday
    const bookedSeats = await SaturdaySeat.find({}, { _id: 0 });

    res.json({ bookedSeats });
  } catch (error) {
    console.error('Failed to fetch booked seats:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch booked seats' });
  }
});

// Route to get the list of booked sunday seats from the database
app.get('/booked-sunday', async (req, res) => {

  try {
    // Query the database to get all booked seats for Monday
    const bookedSeats = await SundaySeat.find({}, { _id: 0 });

    res.json({ bookedSeats });
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