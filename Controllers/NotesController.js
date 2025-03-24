const NotesServices = require("../Services/NotesService");
const { validationResult } = require("express-validator");

class NotesController {
  async createNote(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { title, text, tag } = req.body;
      const userId = Number(req.user.id);
      console.log("Создание заметки:", { title, text, userId: req.user.id });
      const note = await NotesServices.createNote(title, text, tag, userId);
      res.status(201).json(note);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
  async getNotes(req, res) {
    try {
      const userId = Number(req.user.id);
      const { title, tag } = req.query;
      console.log("Controller getNotes:", title, tag, userId);
      const notes = await NotesServices.getNotes(title, tag, userId);
      res.json(notes);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  async getNote(req, res) {
    try {
      const { id } = req.params;
      console.log("Controller getNote:", id);
      const note = await NotesServices.getNote(Number(id));
      res.json(note);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  async updateNote(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { id } = req.params;
      const { title, text, tag } = req.body;
      const note = await NotesServices.updateNote(id, title, text, tag);
      res.json(note);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  async deleteNote(req, res) {
    try {
      const { id } = req.params;
      const note = await NotesServices.deleteNote(id);
      res.json(note);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
}

module.exports = new NotesController();
