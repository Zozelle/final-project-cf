class CatDTO {
  
    constructor(cat) {
    this.id = cat._id;
    this.name = cat.name;
    this.breed = cat.breed;
    this.age = cat.age;
    this.description = cat.description;
    this.photoUrl = cat.photoUrl;
  }
  
}

module.exports = CatDTO;
