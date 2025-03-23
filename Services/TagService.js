const tagRepository = require("../Repositories/TagRepository");

class TagService {
  async createTag(name) {
    try {
      return await tagRepository.createTag(name);
    } catch (error) {
      console.log("Ошибка создания тега", error);
      throw error;
    }
  }
  async getTags() {
    try {
      return await tagRepository.getTags();
    } catch (error) {
      console.log("Ошибка получения тегов", error);
      throw error;
    }
  }
  async getTag(id) {
    try {
      return await tagRepository.getTag(id);
    } catch (error) {
      console.log("Ошибка получения тега", error);
      throw error;
    }
  }
}

module.exports = new TagService();
