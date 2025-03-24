const TagService = require("../Services/TagService");
const { validationResult } = require("express-validator");

class TagController {
  async createTag(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { name } = req.body;
      const tag = await TagService.createTag(name);
      res.status(201).json(tag);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
  async getTags(req, res) {
    try {
      const tags = await TagService.getTags();
      res.json(tags);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
  async getTag(req, res) {
    try {
      const { id } = req.params;
      const tag = await TagService.getTag(Number(id));
      res.json(tag);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
}

module.exports = new TagController();
