class CatDTO {
  
    constructor(cat) {
    this.id = cat._id;
    this.name = cat.name;
    this.age = cat.age;
    this.color = cat.color;
    this.favoriteGames = cat.favoriteGames;
    this.specialty = cat.specialty;
    this.likes = cat.likes
    this.imageUrl = cat.imageUrl;
  }
  
}

module.exports = CatDTO;
