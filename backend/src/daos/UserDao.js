const User = require('../models/User');

class UserDao {

  async createUser(userData) {
    const user = new User(userData);
    return user.save();
  }

  async getUserById(id) {
    return User.findById(id).exec();
  }

  async getUserByEmail(email) {
    return User.findOne({ email }).exec();
  }

  async getAllUsers() {
    return User.find().exec();
  }

  async updateUser(id, updateData) {
    return User.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async deleteUser(id) {
    return User.findByIdAndDelete(id).exec();
  }
}

module.exports = new UserDao();
