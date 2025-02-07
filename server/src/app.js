const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');

const authRouter = require('./routes/authRouter');
const orderRouter = require('./routes/orderRoutes');
const equipmentRouter = require('./routes/equipmentRoutes');

require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api', orderRouter);
app.use('/api', equipmentRouter);

module.exports = app;
