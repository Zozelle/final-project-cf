const User = require('../models/User');

class UserDao {
    // Create a new user
  async createUser(userData) {
    const user = new User(userData);
    return user.save();
  }

  // Find a user by ID
  async getUserById(id) {
    return User.findById(id).exec();
  }

  // Find a user by email
  async getUserByEmail(email) {
    return User.findOne({ email }).exec();
  }

    // Get all users
  async getAllUsers() {
    return User.find().exec();
  }

  // Update user by ID with new data
  async updateUser(id, updateData) {
    return User.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  // Delete user by ID
  async deleteUser(id) {
    return User.findByIdAndDelete(id).exec();
  }
}

module.exports = new UserDao();
