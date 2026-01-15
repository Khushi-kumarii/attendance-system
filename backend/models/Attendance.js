const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    date: {
      type: String,
      required: true,
      index: true
    },
    checkIn: {
      time: { type: String },
      lat: { type: Number },
      lng: { type: Number }
    },
    checkOut: {
      time: { type: String },
      lat: { type: Number },
      lng: { type: Number }
    },
    workingHours: {
      type: String
    },
    late: {
      type: Boolean,
      default: false
    },
    ip: {
      type: String
    },
    device: {
      type: String
    }
  },
  { timestamps: true }
);

AttendanceSchema.index({ user: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', AttendanceSchema);
