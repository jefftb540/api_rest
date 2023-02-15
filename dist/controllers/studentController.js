"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Photo = require('../models/Photo'); var _Photo2 = _interopRequireDefault(_Photo);
var _Student = require('../models/Student'); var _Student2 = _interopRequireDefault(_Student);

class StudentController {
  async create(req, res) {
    try {
      const newStudent = await _Student2.default.create(req.body);
      res.json(newStudent);
    } catch (e) {
      console.log(e);
      res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async index(req, res) {
    try {
      const students = await _Student2.default.findAll({
        attributes: ['id', 'name', 'lastname', 'email', 'age', 'weight', 'high'],
        order: [['id', 'DESC'], [_Photo2.default, 'id', 'desc']],
        include: {
          model: _Photo2.default,
          attributes: ['filename', 'url'],
        },
      });
      if (!students) return res.json({ errors: ['There\'s no students in the system'] });

      res.json(students);
    } catch (e) {
      console.log(e);
      res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async show(req, res) {
    try {
      if (!req.params.id) res.json({ errors: ['Missing ID'] });
      const student = await _Student2.default.findByPk(req.params.id, {
        attributes: ['id', 'name', 'lastname', 'email', 'age', 'weight', 'high'],
        order: [['id', 'DESC'], [_Photo2.default, 'id', 'desc']],
        include: {
          model: _Photo2.default,
          attributes: ['url', 'filename'],
        },
      });
      if (!student) res.json({ errors: ['Student does not exists'] });
      res.json(student);
    } catch (e) {
      console.log(e);
      res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async update(req, res) {
    try {
      if (!req.params.id) res.json({ errors: ['Missing ID'] });
      const student = await _Student2.default.findByPk(req.params.id);
      if (!student) res.json({ errors: ['Student does not exists'] });
      const newStudent = await student.update(req.body);
      res.json(newStudent);
    } catch (e) {
      console.log(e);
      res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async delete(req, res) {
    try {
      if (!req.params.id) res.json({ errors: ['Missing ID'] });
      const student = await _Student2.default.findByPk(req.params.id);
      if (!student) res.json({ errors: ['Student does not exists'] });
      student.destroy();
      res.json({ deleted: true, ...student });
    } catch (e) {
      console.log(e);
      res.json({ errors: e.errors.map((err) => err.message) });
    }
  }
}

exports. default = new StudentController();
