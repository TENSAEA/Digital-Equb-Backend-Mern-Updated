/*const mongoose = require('mongoose');

const ContributionSchema = new mongoose.Schema({
  equb: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Equb', // Reference to the Equb
    required: true,
  },
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the contributing member
    required: true,
  },
  amount: {
    type: Number,
    required: true, // Contribution amount
  },
  contributionDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Contribution', ContributionSchema);
*/