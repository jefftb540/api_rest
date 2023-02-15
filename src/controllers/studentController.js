import Photo from '../models/Photo';
import Student from '../models/Student';

class StudentController {
  async create(req, res) {
    try {
      const newStudent = await Student.create(req.body);
      res.json(newStudent);
    } catch (e) {
      console.log(e);
      res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async index(req, res) {
    try {
      const students = await Student.findAll({
        attributes: ['id', 'name', 'lastname', 'email', 'age', 'weight', 'high'],
        order: [['id', 'DESC'], [Photo, 'id', 'desc']],
        include: {
          model: Photo,
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
      const student = await Student.findByPk(req.params.id, {
        attributes: ['id', 'name', 'lastname', 'email', 'age', 'weight', 'high'],
        order: [['id', 'DESC'], [Photo, 'id', 'desc']],
        include: {
          model: Photo,
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
      const student = await Student.findByPk(req.params.id);
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
      const student = await Student.findByPk(req.params.id);
      if (!student) res.json({ errors: ['Student does not exists'] });
      student.destroy();
      res.json({ deleted: true, ...student });
    } catch (e) {
      console.log(e);
      res.json({ errors: e.errors.map((err) => err.message) });
    }
  }
}

export default new StudentController();
