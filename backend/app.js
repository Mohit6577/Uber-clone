const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/db');
const userRoutes = require('./routes/user.route');

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/users', userRoutes);

module.exports = app;
