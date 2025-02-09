require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwtConfig = require('../configs/jwt.config');

const generateTokens = (payload) => ({
  accessToken: jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, jwtConfig.access),
  refreshToken: jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, jwtConfig.refresh),
});

const parsToken = (token, tokenKey) =>
  jwt.verify(
    token,
    tokenKey === 'accessToken' ? process.env.ACCESS_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET,
  );

module.exports = { generateTokens, parsToken };
