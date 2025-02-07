const bcrypt = require('bcrypt');
const generateTokens = require('../utils/generateTokens');
const cookieConfig = require('../configs/cookie.config');
const userService = require('../services/userService');

class AuthController {
  #service;

  constructor(service) {
    this.#service = service;
  }

  login = async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        console.log('Ошибка: Не все поля заполнены');
        return res.status(400).json({ error: 'Заполните все поля' });
      }

      const user = await this.#service.getUser(username);
      if (!user) {
        console.log('Ошибка: Пользователь не найден');
        return res.status(401).json({ error: 'Неверный логин или пароль' });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        console.log('Ошибка: Неверный пароль');
        return res.status(401).json({ error: 'Неверный логин или пароль' });
      }

      const { accessToken, refreshToken } = generateTokens({ user });

      console.log('Вход выполнен:', user.username);

      return res
        .cookie('refreshToken', refreshToken, cookieConfig.refresh)
        .json({ user: { id: user.id, username: user.username, role: user.role }, accessToken });
    } catch (error) {
      console.error('Ошибка сервера:', error);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }
  };

  logout = (req, res) => {
    console.log('Выход из системы');
    res.clearCookie('refreshToken').sendStatus(200);
  };
}

module.exports = new AuthController(userService);
