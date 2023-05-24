const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Connect to MongoDB
mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://bayarsurendev:02atau1s1qTy0ukl@cluster0.kif9fm4.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Increase timeout if necessary
})
.then(() => console.log('DB connected'))
.catch(err => console.log('DB ERROR', err));

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const cargoRoutes = require('./routes/cargo');
const upload = require('./routes/upload');
const order = require('./routes/order');
const adminRoutes = require('./routes/admin');
const ratingRoutes = require('./routes/rating');
const sitesRoutes = require('./routes/sites');

// App middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

// if (process.env.NODE_ENV === 'development') {
  app.use(cors({origin: ['http://localhost:3000', 'http://localhost:3001', 'https://ecargo.vercel.app']}));
// }

// Middlewares
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', cargoRoutes);
app.use('/api', upload);
app.use('/api', order);
app.use('/api', adminRoutes);
app.use('/api', ratingRoutes);
app.use('/api', sitesRoutes);

const port = process.env.PORT || 5000;
app.listen(5000, () => {
  console.log(`Server running on port`);
});
