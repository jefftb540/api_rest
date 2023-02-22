Object.defineProperty(exports, '__esModule', { value: true }); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } const _jsonwebtoken = require('jsonwebtoken');

const _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
const _User = require('../models/User');

const _User2 = _interopRequireDefault(_User);

class TokenController {
  async create(req, res) {
    const { email = '', password = '' } = req.body;
    if (!email || !password) return res.status(400).json({ errors: ['Credenciais inválidas'] });

    const user = await _User2.default.findOne({ where: { email } });
    if (!user) return res.status(400).json({ errors: ['Usuário não existe'] });
    if (!(await user.isValidPassword(password))) return res.status(400).json({ errors: ['Senha invalida'] });

    const { id } = user;
    const token = _jsonwebtoken2.default.sign(
      { id, email },
      process.env.TOKEN_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRATION },
    );
    return res.json({ token });
  }
}

exports.default = new TokenController();
