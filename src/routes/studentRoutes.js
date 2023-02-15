import { Router } from 'express';
import studentController from '../controllers/studentController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/', loginRequired, studentController.create);
router.get('/', loginRequired, studentController.index);
router.get('/:id', loginRequired, studentController.show);
router.put('/:id', loginRequired, studentController.update);
router.delete('/:id', loginRequired, studentController.delete);

export default router;
