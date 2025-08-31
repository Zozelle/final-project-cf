const Cat = require('../models/Cat');

class CatDao {
  // Create a new cat
  async createCat(catData) {
    const cat = new Cat(catData);
    return cat.save();
  }

  // Find a cat by ID
  async getCatById(id) {
    return Cat.findById(id).exec();
  }

  // Get all cats
async getAllCats() {
  return Cat.find().exec();
}

  // Update cat by ID with new data
  async updatCat(id, updateData) {
    return Cat.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  // Delete cat by ID
  async deleteCat(id) {
    return Cat.findByIdAndDelete(id).exec();
  }
}

module.exports = new CatDao();
