import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

export default function Reports() {
  const [month, setMonth] = useState('');
  const [range, setRange] = useState({ start: '', end: '' });
  const [dialog, setDialog] = useState({ open: false, title: '', message: '' });
  const navigate = useNavigate();

    const download = async (start, end) => {
    try {
    const res = await axios.get('/reports/download', {
      params: { start, end },
      responseType: 'blob'
    });

    const blob = new Blob([res.data]);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'attendance.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);

    setMonth('');
    setRange({ start: '', end: '' });

  } catch (err) {
    const message =
      err?.response?.data?.message || 'Download failed';

    setDialog({
      open: true,
      title: 'Download Failed',
      message
    });
  }
};


   const isValidDate = (d) => {
    const date = new Date(d);
    return d && !isNaN(date.getTime());
    };

    const isFuture = (d) => {
    const input = new Date(d);
    const today = new Date();
    today.setHours(0,0,0,0);
    return input > today;
    };

    const downloadMonth = () => {
  if (!month) {
    return setDialog({
      open: true,
      title: 'Missing Month',
      message: 'Please select a month before downloading.'
    });
  }

  const [year, mon] = month.split('-').map(Number);

  const selectedMonth = new Date(year, mon - 1, 1);
  const now = new Date();
  const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  if (year < 2020) {
    return setDialog({
      open: true,
      title: 'Invalid Year',
      message: 'Please select a valid year.'
    });
  }

  if (selectedMonth > currentMonth) {
    return setDialog({
      open: true,
      title: 'Future Month',
      message: 'Future months are not allowed.'
    });
  }

  download(`${month}-01`, `${month}-31`);
};

const downloadRange = () => {
  if (!range.start || !range.end) {
    return setDialog({
      open: true,
      title: 'Missing Dates',
      message: 'Please select both start and end dates.'
    });
  }

  if (!isValidDate(range.start) || !isValidDate(range.end)) {
    return setDialog({
      open: true,
      title: 'Invalid Date',
      message: 'Please select valid calendar dates.'
    });
  }

  if (new Date(range.start) > new Date(range.end)) {
    return setDialog({
      open: true,
      title: 'Invalid Range',
      message: 'Start date must be before end date.'
    });
  }

  if (isFuture(range.start) || isFuture(range.end)) {
    return setDialog({
      open: true,
      title: 'Future Date',
      message: 'Future dates are not allowed.'
    });
  }

  download(range.start, range.end);
};

  return (
    <div className="admin-page">
      <div className="admin-shell">

        <div className="admin-header">
          <h1 className="admin-title">Attendance Reports</h1>
          <button className="back-btn" onClick={() => navigate('/admin')}>
            ← Go Back
          </button>
        </div>

        <div className="reports-container">

          <div className="report-card">
            <h3>Monthly Report</h3>
            <div className="report-row">
              <input
                type="month"
                value={month}
                onChange={e => setMonth(e.target.value)}
              />
              <button onClick={downloadMonth}>Download</button>
            </div>
          </div>

          <div className="report-card">
            <h3>Date Range Report</h3>
            <div className="report-row">
              <input
                type="date"
                value={range.start}
                onChange={e => setRange({ ...range, start: e.target.value })}
              />
              <input
                type="date"
                value={range.end}
                onChange={e => setRange({ ...range, end: e.target.value })}
              />
              <button onClick={downloadRange}>Download</button>
            </div>
          </div>

        </div>
      </div>

      {dialog.open && (
        <div className="confirm-overlay">
          <div className="confirm-modal">
            <h3>{dialog.title}</h3>
            <p>{dialog.message}</p>
            <div className="confirm-actions">
              <button
                className="danger"
                onClick={() => setDialog({ open: false, title: '', message: '' })}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
