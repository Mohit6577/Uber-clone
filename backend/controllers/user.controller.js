const userModel = require('../models/user.model.js');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const blackList = require('../models/blacklistToken.model');

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, fullname, password } = req.body;

  const hashPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    email,
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    password: hashPassword,
  });
  const token = user.generateAuthToken();
  res.status(201).json({ user, token });
};

module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select('+password');
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const isValid = await user.comparePassword(password);
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = user.generateAuthToken();
  res.cookie('token', token, { httpOnly: true });
  res.status(200).json({ user, token });
};

module.exports.getUserProfile = async (req, res, next) => {
  const user = req.user;
  res.status(200).json({ user });
};

module.exports.logoutUser = async (req, res, next) => {
  res.clearCookie('token');
  const user = req.cookies.token || req.headers.authorization.split(' ')[1];

  await blackList.create({ token: user });

  res.status(200).json({ message: 'Logged out' });
};
