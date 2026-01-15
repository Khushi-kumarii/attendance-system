const Attendance = require('../models/Attendance');
const moment = require('moment');
const UAParser = require('ua-parser-js');

exports.checkIn = async (req, res) => {
  try {
    const today = moment().format('YYYY-MM-DD');

    const exists = await Attendance.findOne({ user: req.user.id, date: today });
    if (exists) return res.status(400).json({ msg: 'Already checked in today' });

    const parser = new UAParser(req.headers['user-agent']);
    const device = parser.getBrowser().name || 'Unknown';
    const ip = req.ip;

    const record = await Attendance.create({
      user: req.user.id,
      date: today,
      checkIn: {
        time: moment().format('HH:mm:ss'),
        lat: req.body.lat || null,
        lng: req.body.lng || null
      },
      device,
      ip,
      late: moment().hour() > 10
    });

    res.json({ msg: 'Checked in successfully', record });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Check-in failed' });
  }
};

exports.checkOut = async (req, res) => {
  try {
    const today = moment().format('YYYY-MM-DD');

    const record = await Attendance.findOne({ user: req.user.id, date: today });
    if (!record) return res.status(400).json({ msg: 'Check in first' });
    if (record.checkOut?.time) return res.status(400).json({ msg: 'Already checked out' });

    const startTime = moment(`${today} ${record.checkIn.time}`, 'YYYY-MM-DD HH:mm:ss');
    const endTime = moment();

    const duration = moment.duration(endTime.diff(startTime));
    const hours = duration.asHours().toFixed(2);

    record.checkOut = {
      time: endTime.format('HH:mm:ss'),
      lat: req.body.lat || null,
      lng: req.body.lng || null
    };

    record.workingHours = `${hours} hrs`;
    await record.save();

    res.json({ msg: 'Checked out successfully', record });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Check-out failed' });
  }
};
