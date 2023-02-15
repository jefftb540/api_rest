"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _studentController = require('../controllers/studentController'); var _studentController2 = _interopRequireDefault(_studentController);
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = new (0, _express.Router)();

router.post('/', _loginRequired2.default, _studentController2.default.create);
router.get('/', _loginRequired2.default, _studentController2.default.index);
router.get('/:id', _loginRequired2.default, _studentController2.default.show);
router.put('/:id', _loginRequired2.default, _studentController2.default.update);
router.delete('/:id', _loginRequired2.default, _studentController2.default.delete);

exports. default = router;
