const mongoose = require('mongoose');

const bookedSeatSchema = new mongoose.Schema({
  seatNumber: {
    type: Number,
    required: true,
  },
});

const BookedSeat = mongoose.model('BookedSeat', bookedSeatSchema);

module.exports = BookedSeat;
