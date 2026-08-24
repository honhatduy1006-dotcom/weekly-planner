import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { listTasks, createTask, updateTask, deleteTask } from '../controllers/task.controller';

const router = Router();

router.use(authMiddleware); // toàn bộ route /api/tasks đều yêu cầu đăng nhập

router.get('/', listTasks);
router.post('/', createTask);
router.patch('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;