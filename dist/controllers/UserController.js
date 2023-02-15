"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserController {
  async create(req, res) {
    try {
      const newUser = await _User2.default.create(req.body);
      res.json(newUser);
    } catch (e) {
      console.log(e);
      res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async index(req, res) {
    try {
      const users = await _User2.default.findAll();
      res.json(users);
    } catch (e) {
      console.log(e);
    }
  }

  async show(req, res) {
    try {
      const id = req.userId;
      const user = await _User2.default.findByPk(id);
      if (!user) return res.status(400).json({ errors: ['User does not exists'] });
      const { name, email } = user;
      res.json({ id, name, email });
    } catch (e) {
      console.log(e);
    }
  }

  async update(req, res) {
    try {
      const id = req.userId;
      if (!id) return res.status(400).json({ errors: ['Missing ID'] });
      const user = await _User2.default.findByPk(id);
      if (!user) return res.status(400).json({ errors: ['User does not exists'] });
      const updatedUser = await user.update(req.body);
      const { name, email } = updatedUser;
      return res.json({ id, name, email });
    } catch (e) {
      console.log(e);
    }
  }

  async delete(req, res) {
    try {
      const id = req.userId;
      if (!id) return res.status(400).json({ errors: ['Missing ID'] });
      const user = await _User2.default.findByPk(id);
      if (!user) return res.status(400).json({ errors: ['User does not exists'] });
      await user.destroy();
      return res.json(user);
    } catch (e) {
      console.log(e);
    }
  }
}

exports. default = new UserController();
