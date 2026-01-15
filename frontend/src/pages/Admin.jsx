import axios from '../api/axios';
import { useEffect, useState } from 'react';

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [confirm, setConfirm] = useState({ open: false, action: null, user: null });
  const [actionLoading, setActionLoading] = useState(false); // NEW
  const [showPassword, setShowPassword] = useState(false);

  const load = async () => {
    const res = await axios.get('/users');
    setUsers(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const add = async () => {
    setError('');
    setSuccess('');

    if (!form.name || !form.email || !form.password) {
      setError('Please fill all fields.');
      return;
    }

    try {
      await axios.post('/users', form);
      setForm({ name: '', email: '', password: '', role: 'user' });
      setSuccess('User created successfully.');
      load();
    } catch (err) {
      if (err.response) {
        if (err.response.status === 409) setError('This email is already registered.');
        else if (err.response.status === 400) setError(err.response.data?.message || 'Invalid input.');
        else setError('Something went wrong. Please try again.');
      } else setError('Network error. Please check your connection.');
    }
  };

  const askToggle = user => {
    if (!user) return;
    setConfirm({ open: true, action: 'toggle', user });
  };

  const askDelete = user => {
    if (!user) return;
    setConfirm({ open: true, action: 'delete', user });
  };

  const onConfirm = async () => {
    const { action, user } = confirm;
    if (!user || !action) return;

    try {
      setActionLoading(true);

      if (action === 'toggle') {
        await axios.patch(`/users/${user._id}/status`);
      }

      if (action === 'delete') {
        await axios.delete(`/users/${user._id}`);
      }

      setConfirm({ open: false, action: null, user: null });
      load();
    } catch (err) {
      alert(err.response?.data?.message || 'Action failed');
    } finally {
      setActionLoading(false);
    }
  };

useEffect(() => {
  if (success || error) {
    const timer = setTimeout(() => {
      setSuccess('');
      setError('');
    }, 2000);

    return () => clearTimeout(timer);
  }
}, [success, error]);

  return (
    <div className="admin-page">
      <div className="admin-shell">

        <div className="admin-header">
          <h1 className="admin-title">Admin Dashboard</h1>
          <button className="reports-btn" onClick={() => window.location.href = '/reports'}>
            Reports
          </button>
        </div>

        <div className="card create-card full-width">
          {error && <div className="form-error">{error}</div>}
          {success && <div className="form-success">{success}</div>}

          <h2>Create User</h2>

          <div className="form-grid">
            <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            <div className="password-field">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
              />
              <span className="toggle-eye" onClick={() => setShowPassword(p => !p)}>
                {showPassword ? '🙈' : '👁'}
              </span>
            </div>
            <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button onClick={add}>Add User</button>
        </div>

        <div className="card users-table">
          <h2>Users</h2>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
              <tr key={u._id} className={u.role === 'admin' ? 'admin-row' : ''}>
                  <td>{u.name}</td>
                    <td className={u.role === 'admin' ? 'admin-text' : ''}>
                    {u.role}
                    </td>
                    <td><span className={`status ${u.status}`}>{u.status}</span></td>
                    <td className="actions">
                    {u.role === 'admin' ? (
                    <span style={{ opacity: 0.6, fontSize: '13px' }}>Protected</span>
                    ) : (
                    <>
                    <button onClick={() => askToggle(u)}>
                    {u.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                    <button className="delete" onClick={() => askDelete(u)}>Delete</button>
                    </>
                    )}
                    </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {confirm.open && (
        <div className="confirm-overlay">
          <div className="confirm-modal">
            <h3>{confirm.action === 'delete' ? 'Delete User' : 'Change Status'}</h3>
            <p>
              {confirm.action === 'delete'
                ? `Are you sure you want to delete ${confirm.user?.name}?`
                : `Are you sure you want to ${confirm.user?.status === 'active' ? 'deactivate' : 'activate'} ${confirm.user?.name}?`}
            </p>

            <div className="confirm-actions">
              <button className="back-btn" disabled={actionLoading}
                onClick={() => setConfirm({ open: false, action: null, user: null })}>
                Cancel
              </button>
              <button className="danger" disabled={actionLoading} onClick={onConfirm}>
                {actionLoading ? 'Please wait...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
