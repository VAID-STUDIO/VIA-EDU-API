import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { authenticateToken } from '../middleware/authenticateToken';
import RevokedToken from '../models/revokedToken';

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

router.post('/revoke/api-token', authenticateToken, async (req: Request, res: Response) => {
    try {
        const { token } = req.body;
        const revokedToken = new RevokedToken({ token });
        await revokedToken.save();
        res.json({ message: 'Token revoked successfully' });
    } catch (error) {
        res.status(500).json({ code: 500, message: 'Внутренняя ошибка сервера' });
    }
});

router.post('/refresh/api-token', authenticateToken, (req: Request, res: Response) => {
    try {
        const { token } = req.body;
        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) return res.status(403).json({ code: 403, message: 'Доступ запрещен' });
            const newToken = jwt.sign({ username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
            res.json({ token: newToken });
        });
    } catch (error) {
        res.status(500).json({ code: 500, message: 'Внутренняя ошибка сервера' });
    }
});

export default router;
