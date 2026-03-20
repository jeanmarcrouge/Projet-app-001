const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { createUser, findUserByEmail } = require('../models/userModel');

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      company_id: user.company_id,
    },
    process.env.JWT_SECRET || 'dev_secret',
    { expiresIn: '7d' }
  );
}

async function register(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({ email, password: hashedPassword });

    return res.status(201).json({
      user,
      token: generateToken(user),
    });
  } catch (error) {
    return next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    return res.json({
      user: {
        id: user.id,
        email: user.email,
        company_id: user.company_id,
      },
      token: generateToken(user),
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  register,
  login,
};
