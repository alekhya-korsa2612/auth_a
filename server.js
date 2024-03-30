const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRouter = require('./routes/authRouter');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', authRouter);
const uri = 'mongodb+srv://korsaalekhya516:<6bA91pJwoK0rGY6w>@cluster0.wq9diur.mongodb.net/';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB Atlas with Mongoose');
}).catch((error) => {
  console.error('Error connecting to MongoDB Atlas with Mongoose:', error);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});




