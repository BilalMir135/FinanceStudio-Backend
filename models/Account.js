const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'users',
    },
    journalEntries: {
      type: String,
    },
    img: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('accounts', AccountSchema);
