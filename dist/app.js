"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _path = require('path');
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _helmet = require('helmet'); var _helmet2 = _interopRequireDefault(_helmet);
var _TokenRoutes = require('./routes/TokenRoutes'); var _TokenRoutes2 = _interopRequireDefault(_TokenRoutes);
var _userRoutes = require('./routes/userRoutes'); var _userRoutes2 = _interopRequireDefault(_userRoutes);
var _studentRoutes = require('./routes/studentRoutes'); var _studentRoutes2 = _interopRequireDefault(_studentRoutes);
var _photoRoutes = require('./routes/photoRoutes'); var _photoRoutes2 = _interopRequireDefault(_photoRoutes);
require('./database/index');

const whitelist = ['http://localhost:3000'];

const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) callback(null, true);
    else callback(new Error('Not Allowed by Cors'));
  },
};
_dotenv2.default.config();
class App {
  constructor() {
    this.app = _express2.default.call(void 0, );
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(_express2.default.urlencoded({ extended: true }));
    this.app.use(_express2.default.json());
    this.app.use(_express2.default.static(_path.resolve.call(void 0, __dirname, 'uploads')));
    this.app.use(_cors2.default.call(void 0, corsOptions));
    this.app.use(_helmet2.default.call(void 0, ));
  }

  routes() {
    this.app.use('/tokens/', _TokenRoutes2.default);
    this.app.use('/users/', _userRoutes2.default);
    this.app.use('/students/', _studentRoutes2.default);
    this.app.use('/photos/', _photoRoutes2.default);
  }
}

exports. default = new App().app;
