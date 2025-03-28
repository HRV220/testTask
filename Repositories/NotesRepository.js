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
      const note = await this.getNote(id);
      if (!note) {
        console.log("Заметка с таким id не найдена");
        throw new Error("Заметка с таким id не найдена");
      }
      // Удаление заметки
      const result = await Notes.destroy({ where: { id: id } });

      // Проверка, если заметка не была удалена
      if (result === 0) {
        throw new Error("Не удалось удалить заметку");
      }

      // Возвращаем успешный ответ
      return { message: "Заметка успешно удалена", status: "success" };
    } catch (error) {
      console.log("Ошибка удаления заметки", error);
    }
  }
  async updateNote(id, title, text, tag) {
    try {
      const note = await this.getNote(id);
      if (!note) {
        console.log("Заметка с таким id не найдена");
        throw new Error("Заметка с таким id не найдена");
      }

      // Обновляем заметку
      const [updatedRows] = await Notes.update(
        { title: title, text: text, tagId: tag },
        { where: { id: id } }
      );

      // Если ничего не было обновлено, выбрасываем ошибку
      if (updatedRows === 0) {
        throw new Error("Не удалось обновить заметку");
      }
      // Возвращаем успешный ответ
      return { message: "Заметка успешно обновлена", status: "success" };
    } catch (error) {
      console.log("Ошибка обновления заметки", error);
    }
  }
}

module.exports = NotesRepository;
