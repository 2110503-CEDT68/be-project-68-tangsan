const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const cors = require('cors');
const mongoSanitize = require('@exortek/express-mongo-sanitize');
const helmet = require('helmet');
const { xss } = require('express-xss-sanitizer');
const hpp = require('hpp');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Route files
const auth = require('./routes/auth');
const restaurants = require('./routes/restaurants');
const reservations = require('./routes/reservations');

const app = express();

// Body parser
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(mongoSanitize()); 
app.use(helmet());        
app.use(xss());           
app.use(hpp());
           
// Mount routers
app.use('/api/v1/auth', auth);
app.use('/api/v1/restaurants', restaurants);
app.use('/api/v1/reservations', reservations);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});