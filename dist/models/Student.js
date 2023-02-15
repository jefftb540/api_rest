"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class Student extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      name: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        len: {
          args: [1, 255],
          msg: 'Nome não pode ser vazio',
        },
      },
      lastname: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        len: {
          args: [1, 255],
          msg: 'Sobrenome não pode ser vazio',
        },
      },
      email: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        unique: {
          msg: 'Email já existe',
        },
        validate: {
          isEmail: {
            msg: 'Email Inválido',
          },
        },
      },
      age: {
        type: _sequelize2.default.INTEGER,
        isInteger: {
          msg: 'Idade precisa ser um número inteiro',
        },
      },
      weight: {
        type: _sequelize2.default.FLOAT,
        isInteger: {
          msg: 'Peso precisa ser um número',
        },
      },
      high: {
        type: _sequelize2.default.FLOAT,
        isInteger: {
          msg: 'Altura precisa ser um número',
        },
      },
    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.hasMany(models.Photo, { foreignKey: 'student_id' });
  }
} exports.default = Student;
