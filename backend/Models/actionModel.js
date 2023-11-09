const mongoose = require('mongoose');

const ActionSchema = new mongoose.Schema({
  complaint: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Complaint',
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  actionDescription: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['In Progress', 'Completed'], // Enum for status values
    default: 'In Progress', // Default status is 'In Progress'
  },
  location: {
    // type: String, // You can adjust the type as needed
  },
  attachment: {
    type: String,
  },
});

module.exports = mongoose.model('Action', ActionSchema);
