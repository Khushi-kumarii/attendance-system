import axios from '../api/axios';
import { useEffect, useState } from 'react';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/users/me')
      .then(res => setUser(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page">Loading...</div>;

  return (
    <div className="page">
      <div className="app-shell">
        <h1 className="page-title">My Profile</h1>

        <div className="card profile-card">
          <div className="profile-row">
            <span>Name</span>
            <strong>{user.name}</strong>
          </div>

          <div className="profile-row">
            <span>Email</span>
            <strong>{user.email}</strong>
          </div>

          <div className="profile-row">
            <span>Role</span>
            <strong>{user.role}</strong>
          </div>

          <div className="profile-row">
            <span>Status</span>
            <strong>{user.status}</strong>
          </div>

          <div className="profile-row">
            <span>Joined</span>
            <strong>{new Date(user.createdAt).toLocaleDateString()}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
