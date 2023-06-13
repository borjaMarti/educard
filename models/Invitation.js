const mongoose = require('mongoose');

const InvitationSchema = new mongoose.Schema({
  classId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Invitation', InvitationSchema);