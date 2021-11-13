const express = require('express');
const cookieSessioin = require('cookie-session');

const connectDB = require('./config/db');

const app = express();

// connect database
connectDB();

//init middleware
app.use(express.json({ extended: false })); // to parse body
app.use(
  cookieSessioin({
    name: 'session',
    keys: ['super', 'duper'],
  })
);

// routes
app.use('/api/user', require('./routes/user.route'));

app.use('/api/vehicle', require('./routes/vehicle.route'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
