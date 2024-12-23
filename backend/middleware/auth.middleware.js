const userModel = require('../models/user.model.js');
const blackList = require('../models/blacklistToken.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const isBlackListed = await blackList.findOne({ token: token });
  if (isBlackListed) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
    req.user = user;

    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};
