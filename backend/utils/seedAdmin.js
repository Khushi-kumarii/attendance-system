const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = async function seedAdmin() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.warn('⚠ Admin seed skipped: ADMIN_EMAIL or ADMIN_PASSWORD not set');
      return;
    }

    const existing = await User.findOne({ email: adminEmail });
    if (existing) {
      console.log('ℹ Admin already exists');
      return;
    }

    if (adminPassword.length < 8) {
      console.warn('⚠ Admin password should be at least 8 characters');
    }

    const hash = await bcrypt.hash(adminPassword, 12);

    await User.create({
      name: 'System Admin',
      email: adminEmail,
      password: hash,
      role: 'admin',
      status: 'active'
    });

    console.log('✅ Admin user created');
  } catch (err) {
    console.error('❌ Admin seed failed:', err.message);
  }
};
