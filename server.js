const express = require('express');
const cookieParser = require('cookie-parser');

const connectDB = require('./config/db');

const app = express();

// connect database
connectDB();

//init middleware
app.use(express.json({ extended: false })); // to parse body
app.use(cookieParser()); // to use cookie-parser

app.get('/', (req, res) => res.send('API running '));

// define routes
app.use('/api/user', require('./routes/user.route'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
