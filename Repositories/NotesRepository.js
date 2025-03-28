const { Op } = require("sequelize");
const Notes = require("../Models/Notes");
const Tag = require("../Models/Tags");

class NotesRepository {
  async createNote(title, text, tag, userId) {
    try {
      let tagId = null;
      //Проверяем тег на null
      if (tag) {
        let FindTag = await Tag.findOne({ where: { name: tag } });
        //ЕСли тег не null, но такого тега не существует
        if (!FindTag) {
          console.log("Тег не найден, создаем новый тег:", tag);
          FindTag = await Tag.create({ name: tag });
          console.log("Новый тег создан:", FindTag);
        }
        tagId = FindTag.id;
      }
      console.log("Создание заметки");
      await Notes.create({
        title: title,
        text: text,
        tagId: tagId,
        userId: userId,
      });
    } catch (error) {
      console.log("Ошибка создания заметки", error);
      throw error;
    }
  }
  async getNotes(title, tag, userId) {
    try {
      console.log(title, tag, userId);

      if (title && tag) {
        return await Notes.findAll({
          where: {
            title: { [Op.iLike]: `%${title}%` },
            tagId: tag,
            userId: userId,
          },
          include: [
            {
              model: Tag,
              as: "tag",
              attributes: ["name"],
            },
          ],
        });
      }

      if (title && !tag) {
        return await Notes.findAll({
          where: { title: { [Op.iLike]: `%${title}%` }, userId: userId },
        });
      }

      if (!title && tag) {
        return await Notes.findAll({
          where: { tagId: tag, userId: userId },
          include: [
            {
              model: Tag,
              as: "tag",
              attributes: ["name"],
            },
          ],
        });
      }

      if (!title && !tag) {
        return await Notes.findAll({
          where: { userId: userId },
        });
      }
    } catch (error) {
      console.log("Ошибка получения заметок", error);
      throw error;
    }
  }

  async getNote(id) {
    try {
      return await Notes.findOne({
        where: { id: id },
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

module.exports = NotesRepository;
