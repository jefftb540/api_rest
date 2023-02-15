import User from '../models/User';

class UserController {
  async create(req, res) {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (e) {
      console.log(e);
      res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (e) {
      console.log(e);
    }
  }

  async show(req, res) {
    try {
      const id = req.userId;
      const user = await User.findByPk(id);
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
      const user = await User.findByPk(id);
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
      const user = await User.findByPk(id);
      if (!user) return res.status(400).json({ errors: ['User does not exists'] });
      await user.destroy();
      return res.json(user);
    } catch (e) {
      console.log(e);
    }
  }
}

export default new UserController();
