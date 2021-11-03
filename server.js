const express = require('express');

const connectDB = require('./config/db');

const app = express();

// connect database
connectDB();

//init middleware
app.use(express.json({ extended: false })); // to parse body

app.get('/', (req, res) => res.send('API running '));

// define routes
app.use('/user', require('./routes/user.route'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
