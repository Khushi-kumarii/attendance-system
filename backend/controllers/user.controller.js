const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.addUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: 'Email already exists.' });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash, role });

    res.status(201).json({ message: 'User created successfully.', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error. Could not create user.' });
  }
};

exports.getUsers = async (_, res) => {
  try {
    const users = await User.find({ deleted: false });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch users.' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({ message: 'User updated successfully.', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update user.' });
  }
};

exports.toggleStatus = async (req, res) => {
   if (req.user.id === req.params.id) {
    return res.status(400).json({ message: 'You cannot change your own status.' });
  }
  try {
    const u = await User.findById(req.params.id);

    if (!u) {
      return res.status(404).json({ message: 'User not found.' });
    }

    u.status = u.status === 'active' ? 'inactive' : 'active';
    await u.save();

    res.json({ message: `User is now ${u.status}.`, user: u });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to toggle user status.' });
  }
};

exports.softDelete = async (req, res) => {
   
  if (req.user.id === req.params.id) {
    return res.status(400).json({ message: 'You cannot delete your own account' });
  }
  
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { deleted: true }, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({ message: 'User deleted successfully.', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete user.' });
  }
};
exports.getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user || user.deleted) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch profile.' });
  }
};
