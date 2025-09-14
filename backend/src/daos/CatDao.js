const Cat = require('../models/Cat');

class CatDao {

  async createCat(catData) {
    const cat = new Cat(catData);
    return cat.save();
  }

  async getCatById(id) {
    return Cat.findById(id).exec();
  }

async getAllCats() {
  return Cat.find().exec();
}

  async updateCat(id, updateData) {
    return Cat.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async deleteCat(id) {
    return Cat.findByIdAndDelete(id).exec();
  }
}

module.exports = new CatDao();
