import { Router } from 'express';
const router = Router();
import { login, logout, getMe } from '../controllers/authController.js';
import { authenticate } from '../middleware/authMiddleware.js';

router.post('/login', login);
router.post('/logout', logout);
router.get('/me', authenticate, getMe);

export default router;
