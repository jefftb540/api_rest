import Sequelize, { Model } from 'sequelize';

export default class Student extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        defaultValue: '',
        len: {
          args: [1, 255],
          msg: 'Nome não pode ser vazio',
        },
      },
      lastname: {
        type: Sequelize.STRING,
        defaultValue: '',
        len: {
          args: [1, 255],
          msg: 'Sobrenome não pode ser vazio',
        },
      },
      email: {
        type: Sequelize.STRING,
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
        type: Sequelize.INTEGER,
        isInteger: {
          msg: 'Idade precisa ser um número inteiro',
        },
      },
      weight: {
        type: Sequelize.FLOAT,
        isInteger: {
          msg: 'Peso precisa ser um número',
        },
      },
      high: {
        type: Sequelize.FLOAT,
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
}
