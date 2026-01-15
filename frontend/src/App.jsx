import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendance';
import Admin from './pages/Admin';
import Reports from "./pages/Reports";
import Profile from './pages/Profile';

const isAuth = () => !!localStorage.getItem('token');
const getRole = () => localStorage.getItem('role');

const Private = ({ children }) => isAuth() ? children : <Navigate to="/" />;
const Public = ({ children }) => isAuth() ? <Navigate to="/dashboard" /> : children;
const AdminOnly = ({ children }) => isAuth() && getRole() === 'admin' ? children : <Navigate to="/dashboard" />;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Public><Login /></Public>} />
        <Route path="/dashboard" element={<Private><Dashboard /></Private>} />
        <Route path="/attendance" element={<Private><Attendance /></Private>} />
        <Route path="/admin" element={<AdminOnly><Admin /></AdminOnly>} />
        <Route path="/reports" element={<AdminOnly><Reports /></AdminOnly>} />
        <Route path="/profile" element={<Private><Profile /></Private>} />
      </Routes>
    </BrowserRouter>
  );
}
