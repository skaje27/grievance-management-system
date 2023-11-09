const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  complaintText: {
    type: String,
    required: true,
  },
  department: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now,
  },
  location: {
    // type: String
    // [Number], // Use an array to store coordinates [longitude, latitude]
    // index: '2dsphere', // Create a geospatial index for geolocation queries
  },
  user: {
    type: String,
    // mongoose.Schema.Types.ObjectId,
    // ref: 'UserModel', // Replace with the actual User model name
    required: true,
  },
  attachment: {
    type: String,
  },
});

module.exports = mongoose.model('Complaint', ComplaintSchema);
