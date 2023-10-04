const mongoose = require('mongoose');

const bookedSeatSchema = new mongoose.Schema({
  seatNumber: {
    type: Number,
    required: true,
  },
});


const newbookedSeatSchema = new mongoose.Schema({
  seatNumber: {
    type: Number,
    required: true,
  },
});

const NewBookedSeat = mongoose.model('NewBookedSeat', newbookedSeatSchema);
const BookedSeat = mongoose.model('BookedSeat', bookedSeatSchema);

module.exports = BookedSeat;