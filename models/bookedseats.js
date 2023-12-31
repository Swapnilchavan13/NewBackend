const mongoose = require('mongoose');

// Define schemas for each day of the week
const daySchema = new mongoose.Schema({
  seatNumber: {
    type: Number,
    required: true,
  },
  showTime: {
    type: String,
    required: true,
  },
  mobNum: {
    type: String,
    required: true,
  },
  sdate: {
    type: String,
    required: true,
  }
});

// Define models for each day of the week
const MondaySeat = mongoose.model('MondaySeat', daySchema);
const TuesdaySeat = mongoose.model('TuesdaySeat', daySchema);
const WednesdaySeat = mongoose.model('WednesdaySeat', daySchema);
const ThursdaySeat = mongoose.model('ThursdaySeat', daySchema);
const FridaySeat = mongoose.model('FridaySeat', daySchema);
const SaturdaySeat = mongoose.model('SaturdaySeat', daySchema);
const SundaySeat = mongoose.model('SundaySeat', daySchema);
// const BookedSeat = mongoose.model('BookedSeat', bookedSeatSchema);


// Export the models
module.exports = {
  MondaySeat,
  TuesdaySeat,
  WednesdaySeat,
  ThursdaySeat,
  FridaySeat,
  SaturdaySeat,
  SundaySeat,
};