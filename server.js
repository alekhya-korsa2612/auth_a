const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRouter = require('./routes/authRouter');
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', authRouter);

mongoose.connect('mongodb://localhost:27017/authentication', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (error) => console.error('MongoDB connection error:', error));
db.once('open', () => console.log('Connected to Database'));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



