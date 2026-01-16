📋 Attendance Management System

A full-stack Attendance Management System built using Node.js, Express, MongoDB, and React.js.
The application supports role-based access control for Admins and Users, with secure authentication, attendance tracking, reporting, and user management.

🚀 Features
👤 Authentication

Secure login using JWT

Password hashing using bcrypt

Role-based access (Admin / User)

Inactive and soft-deleted user handling

🧑‍💼 Admin Panel

Create users (Admin / User)

Activate / Deactivate user accounts

Soft delete users

View all registered users

Download attendance reports (Excel format)

Admin-only route protection

🕒 Attendance Management

Daily Check-in / Check-out

Automatic calculation of working hours

Location tracking (latitude & longitude)

Prevents multiple check-ins or check-outs on the same day

📊 Reports

Download reports by month or date range

Excel (.xlsx) export

Accessible to Admin only

👤 User Profile

View personal profile (read-only)

Displays name, email, role, status, and join date

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

⚙️ Installation & Setup
1️⃣ Clone Repository
git clone <https://github.com/Khushi-kumarii/attendance-system>
cd attendance-system

2️⃣ Install Dependencies

Backend
cd backend
npm install


Frontend
cd frontend
npm install

3️⃣ Environment Variables

Create a .env file inside backend/:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin@system.com
ADMIN_PASSWORD=Admin@1234

4️⃣ Run the Application

Backend
npm start

Frontend
npm run dev

🔐 Default Admin Credentials

On first server start, a default admin is auto-created:

Field	Value:
Email	admin@system.com
Password	admin123

⚠️ Note: This password is for initial access only and should be changed in production.

🌟 Bonus Implementations

Location tracking (latitude & longitude)

Excel report export

Auto-seed admin account

Soft delete users

Confirmation dialogs for critical actions

Role-based dashboards

👩‍💻 Author

Khushi 
Full-Stack Developer
Node.js | Express | MongoDB | React