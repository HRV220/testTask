const { where } = require("sequelize");
const { Op } = require("sequelize");
const Notes = require("../Models/Notes");
const Tag = require("../Models/Tags");

class NotesRepository {
  async createNote(title, text, tag, userId) {
    try {
      console.log("Создание заметки");
      return await Notes.create({
        title: title,
        text: text,
        tag: Number(tag),
        userId: Number(userId),
      });
    } catch (error) {
      console.log("Ошибка создания заметки", error);
      throw error;
    }
  }
  async getNotes(title, tag, userId) {
    try {
      console.log(title, tag, userId);

      let whereCondition = { userId: Number(userId) };

      if (title) {
        whereCondition.title = { [Op.iLike]: `%${title}%` };
      }

      if (tag) {
        whereCondition.tag = Number(tag);
      }

      return await Notes.findAll({
        where: whereCondition,
        include: [
          {
            model: Tag,
            as: "tag",
            attributes: ["name"],
          },
        ],
      });
    } catch (error) {
      console.log("Ошибка получения заметок", error);
      throw error;
    }
  }

  async getNote(id) {
    try {
      return await Notes.findOne({ where: { id: id } });
    } catch (error) {
      console.log("Ошибка получения заметок", error);
      throw error;
    }
  }

  async deleteNote(id) {
    try {
      console.log("Удаление заметки", id);
      return await Notes.destroy({ where: { id: id } });
    } catch (error) {
      console.log("Ошибка удаления заметки", error);
    }
  }
  async updateNote(id, title, text, tag) {
    try {
      console.log("Обновлене заметки", id);
      return await Notes.update(
        { title: title, text: text, tagId: tag },
        { where: { id: id } }
      );
    } catch (error) {
      console.log("Ошибка обновления заметки", error);
    }
  }
}

module.exports = new NotesRepository();
