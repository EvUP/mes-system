const bcrypt = require('bcrypt');
const { generateTokens, parsToken } = require('../utils/generateTokens');
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
        .cookie('accessToken', accessToken, cookieConfig.access)
        .json({
          user: { id: user.id, username: user.username, role: user.role },
          accessToken, // ✅ теперь клиенту возвращается accessToken
        });
    } catch (error) {
      console.error('Ошибка сервера:', error);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }
  };

  logout = (req, res) => {
    console.log('Выход из системы');
    return res
      .clearCookie('refreshToken')
      .clearCookie('accessToken')
      .status(200)
      .json({ message: 'Выход из системы' });
  };

  current = async (req, res) => {
    try {
      const accessToken = req.cookies.accessToken;
      if (!accessToken) {
        return res.status(403).json({ error: 'Пользователь не найден' });
      }

      const decoded = parsToken(accessToken, 'accessToken');
      const user = await this.#service.getUserById(decoded.user.id);

      if (!user) {
        return res.status(401).json({ error: 'Пользователь не найден' });
      }

      return res.json({
        user: { id: user.id, username: user.username, role: user.role },
        accessToken, // ✅ возвращаем accessToken
      });
    } catch (error) {
      console.error('Ошибка получения текущего пользователя:', error);
      return res.status(403).json({ error: 'Пользователь не найден' });
    }
  };

  refresh = async (req, res) => {
    try {
      const refresh = req?.cookies?.refreshToken;
      if (!refresh) {
        return res.status(401).json({ error: 'Пользователь не найден' });
      }
      const decoded = parsToken(refresh, 'refreshToken');

      const user = await this.#service.getUserById(decoded.user.id);

      if (!user) {
        return res.status(401).json({ error: 'Пользователь не найден' });
      }
      const { accessToken, refreshToken } = generateTokens({ user });

      return res
        .cookie('refreshToken', refreshToken, cookieConfig.refresh)
        .cookie('accessToken', accessToken, cookieConfig.access)
        .json({
          user: { id: user.id, username: user.username, role: user.role },
          accessToken, 
        });
    } catch (error) {
      console.error('Ошибка получения текущего пользователя:', error);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }
  };
}

module.exports = new AuthController(userService);
