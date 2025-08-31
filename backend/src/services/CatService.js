const catDao = require('../daos/CatDao');
const CatDTO = require('../dtos/CatDto');

class CatService {
  // Create a new cat
  async createCat(catData) {
    const cat = await catDao.createCat(catData);
    return new CatDTO(cat);
  }

  // Get all cats
  async getAllCats() {
    const cats = await catDao.getAllCats();
    return cats.map(cat => new CatDTO(cat));
  }

  // Get cat by ID
  async getCatById(id) {
    const cat = await catDao.getCatById(id);
    if (!cat) throw new Error('Cat not found');
    return new CatDTO(cat);
  }

  // Update cat by ID
  async updateCat(id, updateData) {
    const cat = await catDao.updateCat(id, updateData);
    if (!cat) throw new Error('Cat not found');
    return new CatDTO(cat);
  }

  // Delete cat by ID
  async deleteCat(id) {
    const cat = await catDao.deleteCat(id);
    if (!cat) throw new Error('Cat not found');
    return new CatDTO(cat);
  }
}

module.exports = new CatService();
