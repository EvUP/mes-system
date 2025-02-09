require('dotenv').config();

const currentOrigin = process.env.ORIGIN ? JSON.parse(process.env.ORIGIN) : [];

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

module.exports = corsOptions;
