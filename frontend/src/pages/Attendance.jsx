import axios from '../api/axios';
import { useState } from 'react';

export default function Attendance() {
  const [loading, setLoading] = useState(false);
  const [dialog, setDialog] = useState({ open: false, title: '', message: '' });

  const getLoc = () =>
    new Promise(resolve => {
      if (!navigator.geolocation) return resolve({ lat: null, lng: null });

      navigator.geolocation.getCurrentPosition(
        pos => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => resolve({ lat: null, lng: null }),
        { enableHighAccuracy: true, timeout: 10000 }
      );
    });

  const checkIn = async () => {
    try {
      setLoading(true);
      const loc = await getLoc();
      const res = await axios.post('/attendance/checkin', loc);

      setDialog({
        open: true,
        title: 'Success',
        message: res.data.msg || 'Checked in successfully'
      });
    } catch (e) {
      setDialog({
        open: true,
        title: 'Error',
        message: e.response?.data?.msg || 'Check-in failed'
      });
    } finally {
      setLoading(false);
    }
  };

  const checkOut = async () => {
    try {
      setLoading(true);
      const loc = await getLoc();
      const res = await axios.post('/attendance/checkout', loc);

      setDialog({
        open: true,
        title: 'Success',
        message: res.data.msg || 'Checked out successfully'
      });
    } catch (e) {
      setDialog({
        open: true,
        title: 'Error',
        message: e.response?.data?.msg || 'Check-out failed'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="attendance-shell">
        <h1 className="attendance-title">Attendance</h1>

        <div className="attendance-card">
          <p className="attendance-sub">Mark your attendance for today</p>

          <div className="attendance-actions">
            <button className="checkin" disabled={loading} onClick={checkIn}>
              {loading ? 'Please wait…' : 'Check In'}
            </button>

            <button className="checkout" disabled={loading} onClick={checkOut}>
              {loading ? 'Please wait…' : 'Check Out'}
            </button>
          </div>
        </div>
      </div>

      {/* Dialog Box */}
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
