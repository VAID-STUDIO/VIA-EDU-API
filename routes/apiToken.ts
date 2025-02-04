import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { authenticateToken } from '../middleware/authenticateToken';

dotenv.config();

const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

router.post('/create/api-token', authenticateToken, (req: Request, res: Response) => {
    try {
        const eternalToken = jwt.sign({ username: req.user.username, role: req.user.role }, SECRET_KEY, { expiresIn: '9999 years' });
        res.json({ token: eternalToken });
    } catch (error) {
        res.status(500).json({ code: 500, message: 'Внутренняя ошибка сервера' });
    }
});

export default router;
