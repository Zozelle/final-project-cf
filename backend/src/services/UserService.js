const userDao = require('../daos/UserDao');
const UserDTO = require('../dtos/UserDTO');

class UserService {
  async createUser(userData) {
    const user = await userDao.createUser(userData);
    return new UserDTO(user);
  }

  async getUserById(id) {
    const user = await userDao.getUserById(id);
    if (!user) throw new Error('User not found');
    return new UserDTO(user);
  }

  async getUserByEmail(email) {
    const user = await userDao.getUserByEmail(email);
    return user ? new UserDTO(user) : null;
  }
    
  async getUserByEmailWithPassword(email) {
    return userDao.getUserByEmail(email);
  }

  async getAllUsers() {
    const users = await userDao.getAllUsers();
    return users.map(user => new UserDTO(user));
  }

  async updateUser(id, updateData) {
    const user = await userDao.updateUser(id, updateData);
    if (!user) throw new Error('User not found');
    return new UserDTO(user);
  }

  async deleteUser(id) {
    const user = await userDao.deleteUser(id);
    if (!user) throw new Error('User not found');
    return new UserDTO(user);
  }
}

module.exports = new UserService();