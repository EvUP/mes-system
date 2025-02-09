const { User } = require('../../db/models');

class UserService {
  async getUser(username) {
    return User.findOne({ where: { username } });
  }

  async getUserById(id) {
    return User.findOne({ where: { id } });
  }

  async createUser(userData) {
    return User.create(userData);
  }
}

module.exports = new UserService();
