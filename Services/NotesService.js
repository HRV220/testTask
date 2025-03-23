const notesRepository = require("../Repositories/NotesRepository");

class NotesServices {
  async createNote(title, text, tag, userId) {
    try {
      return await notesRepository.createNote(title, text, tag, userId);
    } catch (error) {
      console.log("Ошибка создания заметки", error);
      throw error;
    }
  }

  async getNotes(title, tag, userId) {
    try {
      console.log("Service getNotes:", title, tag, userId);
      return await notesRepository.getNotes(title, tag, userId);
    } catch (error) {
      console.log("Ошибка получения заметок", error);
      throw error;
    }
  }

  async getNote(id) {
    try {
      return await notesRepository.getNote(id);
    } catch (error) {
      console.log("Ошибка получения заметок", error);
      throw error;
    }
  }

  async deleteNote(id) {
    try {
      return await notesRepository.deleteNote(id);
    } catch (error) {
      this.logger.error("Ошибка удаления заметки", error);
      throw error;
    }
  }
  async updateNote(id, title, text, tag) {
    try {
      return await notesRepository.updateNote(id, title, text, tag);
    } catch (error) {
      this.logger.error("Ошибка обновления заметки", error);
      throw error;
    }
  }
}

module.exports = new NotesServices();
