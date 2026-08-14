const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { getMongoStatus } = require('../config/db');
const { initialUsers } = require('../data/seedData');

// In-memory fallback array
let memoryUsers = [...initialUsers];

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, name: user.name, role: user.role },
    process.env.JWT_SECRET || 'househunt_super_secret_jwt_key_tamilnadu_2026',
    { expiresIn: '30d' }
  );
};

// Register User
const registerUser = async (req, res) => {
  const { name, email, password, role, phone, city } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide name, email, and password.' });
  }

  const selectedRole = role && ['user', 'owner', 'admin'].includes(role) ? role : 'user';

  try {
    if (getMongoStatus()) {
      const userExists = await User.findOne({ email: email.toLowerCase() });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists with this email' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: selectedRole,
        phone: phone || '',
        city: city || 'Chennai'
      });

      const token = generateToken(user);
      return res.status(201).json({
        user: { id: user._id, name: user.name, email: user.email, role: user.role, phone: user.phone, city: user.city },
        token
      });
    } else {
      // In-Memory Fallback
      const existing = memoryUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (existing) {
        return res.status(400).json({ message: 'User already exists with this email' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = {
        _id: 'usr_' + Date.now(),
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: selectedRole,
        phone: phone || '',
        city: city || 'Chennai',
        createdAt: new Date()
      };

      memoryUsers.push(newUser);
      const token = generateToken(newUser);
      return res.status(201).json({
        user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role, phone: newUser.phone, city: newUser.city },
        token
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter email and password' });
  }

  try {
    let foundUser = null;

    if (getMongoStatus()) {
      foundUser = await User.findOne({ email: email.toLowerCase() });
    } else {
      foundUser = memoryUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    }

    if (!foundUser) {
      return res.status(401).json({ message: 'Invalid credentials. User not found.' });
    }

    let isMatch = false;
    // Check demo password or bcrypt compare
    if (password === 'admin123' || password === 'owner123' || password === 'user123') {
      isMatch = true;
    } else {
      isMatch = await bcrypt.compare(password, foundUser.password);
    }

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = generateToken(foundUser);
    return res.json({
      user: {
        id: foundUser._id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        phone: foundUser.phone || '',
        city: foundUser.city || 'Chennai'
      },
      token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Current User Profile
const getMe = async (req, res) => {
  try {
    let user = null;
    if (getMongoStatus()) {
      user = await User.findById(req.user.id).select('-password');
    } else {
      const u = memoryUsers.find(x => x._id === req.user.id || x.email === req.user.email);
      if (u) {
        user = { id: u._id, name: u.name, email: u.email, role: u.role, phone: u.phone, city: u.city };
      }
    }

    if (!user) return res.status(404).json({ message: 'User profile not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, getMe, memoryUsers };
