const catDao = require('../daos/CatDao');
const CatDTO = require('../dtos/CatDTO');

class CatService {

  async createCat(catData) {
    const cat = await catDao.createCat(catData);
    return new CatDTO(cat);
  }

  async getAllCats() {
    const cats = await catDao.getAllCats();
    return cats.map(cat => new CatDTO(cat));
  }

  async getCatById(id) {
    const cat = await catDao.getCatById(id);
    if (!cat) throw new Error('Cat not found');
    return new CatDTO(cat);
  }

  async updateCat(id, updateData) {
    const cat = await catDao.updateCat(id, updateData);
    if (!cat) throw new Error('Cat not found');
    return new CatDTO(cat);
  }

  async deleteCat(id) {
    const cat = await catDao.deleteCat(id);
    if (!cat) throw new Error('Cat not found');
    return new CatDTO(cat);
  }
}

module.exports = new CatService();
