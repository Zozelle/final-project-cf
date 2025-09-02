const catService = require('../services/CatService');

class CatController {
    
  async createCat(req, res, next) {
    try {
      const cat = await catService.createCat(req.body);
      res.status(201).json(cat);
    } catch (error) {
      next(error);
    }
  }

  async getAllCats(req, res, next) {
    try {
      const cats = await catService.getAllCats();
      res.json(cats);
    } catch (error) {
      next(error);
    }
  }

  async getCatById(req, res, next) {
    try {
      const cat = await catService.getCatById(req.params.id);
      res.json(cat);
    } catch (error) {
      next(error);
    }
  }

  async updateCat(req, res, next) {
    try {
      const cat = await catService.updateCat(req.params.id, req.body);
      res.json(cat);
    } catch (error) {
      next(error);
    }
  }

  async deleteCat(req, res, next) {
    try {
      const cat = await catService.deleteCat(req.params.id);
      res.json(cat);
    } catch (error) {
      next(error);
    }
  }

}

module.exports = new CatController();
