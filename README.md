📋 Attendance Management System

A full-stack Attendance Management System built using Node.js, Express, MongoDB, and React.js.
It supports role-based access for Admins and Users, with secure authentication, attendance tracking, reporting, and user management.

🚀 Features
👤 Authentication

Secure login using JWT

Password hashing using bcrypt

Role-based access (Admin/User)

Inactive and deleted user handling

🧑‍💼 Admin Panel

Create users (Admin/User)

Activate / Deactivate users

Soft delete users

View all users

Download attendance reports (Excel)

Role-based route protection

🕒 Attendance

Check-in and Check-out

Auto calculation of working hours

Location capture (latitude/longitude)

Prevent multiple check-ins or check-outs per day

📊 Reports

Download monthly or date-range reports

Excel format export

Admin-only access

👤 User Profile

View personal profile (read-only)

View role, status, join date

🧱 Tech Stack
Frontend

React.js

React Router

Axios

CSS

Backend

Node.js

Express.js

MongoDB (Mongoose)

JWT Authentication

bcrypt

exceljs