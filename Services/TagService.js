class TagService {
  constructor(tagRepository) {
    this.tagRepository = tagRepository;
  }
  async createTag(name) {
    try {
      return await this.tagRepository.createTag(name);
    } catch (error) {
      console.log("Ошибка создания тега", error);
      throw error;
    }
  }
  async getTags() {
    try {
      return await this.tagRepository.getTags();
    } catch (error) {
      console.log("Ошибка получения тегов", error);
      throw error;
    }
  }
  async getTag(id) {
    try {
      return await this.tagRepository.getTag(id);
    } catch (error) {
      console.log("Ошибка получения тега", error);
      throw error;
    }
  }
}

module.exports = TagService;
