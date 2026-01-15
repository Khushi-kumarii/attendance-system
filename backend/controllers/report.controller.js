const Attendance = require('../models/Attendance');
const Excel = require('exceljs');


exports.download = async (req, res) => {
  const { start, end } = req.query;

  if (!start || !end) return res.status(400).json({ message: 'Start and end dates are required' });

  const data = await Attendance.find({ date: { $gte: start, $lte: end } }).populate('user');

  if (!data.length) {
    return res.status(404).json({ message: 'No attendance data found for selected range' });
  }

  const wb = new Excel.Workbook();
  const ws = wb.addWorksheet('Report');

  ws.columns = [
    { header: 'Name', key: 'name' },
    { header: 'Date', key: 'date' },
    { header: 'Check In', key: 'ci' },
    { header: 'Check Out', key: 'co' },
    { header: 'Hours', key: 'h' },
    { header: 'Location', key: 'loc' },
    { header: 'Late', key: 'l' },
    { header: 'Device', key: 'd' }
  ];

  data.forEach(d => ws.addRow({
    name: d.user.name,
    date: d.date,
    ci: d.checkIn?.time,
    co: d.checkOut?.time,
    h: d.workingHours,
    loc: `${d.checkIn?.lat || ''}, ${d.checkIn?.lng || ''}`,
    l: d.late ? 'Yes' : 'No',
    d: d.device
  }));

  res.setHeader('Content-Type', 'application/vnd.openxmlformats');
  res.setHeader('Content-Disposition', 'attachment; filename=attendance.xlsx');
  await wb.xlsx.write(res);
  res.end();
};
