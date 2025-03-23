const Tags = require("../Models/Tags");

class TagRepository {
  async createTag(name) {
    try {
      console.log("Создание тега");
      return await Tags.create({ name: name });
    } catch (error) {
      console.log("Ошибка создания тега", error);
      throw error;
    }
  }
  async getTags() {
    try {
      console.log("Получение всех тегов");
      return await Tags.findAll();
    } catch (error) {
      console.log("Ошибка получения тегов", error);
      throw error;
    }
  }
  async getTag(id) {
    try {
      return await Tags.findOne({ where: { id: id } });
    } catch (error) {
      console.log("Ошибка получения тега", error);
      throw error;
    }
  }
}

module.exports = new TagRepository();
