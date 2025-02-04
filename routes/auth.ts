import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import VIA_Account from '../models/viaAccount';
import { authenticateToken } from '../middleware/authenticateToken';

dotenv.config();

const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

router.post('/sign-up', async (req: Request, res: Response) => {
    try {
        const { username, password, email, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAccount = new VIA_Account({ username, password: hashedPassword, email, role });
        await newAccount.save();
        res.status(201).json({ message: 'Account created successfully' });
    } catch (error) {
        res.status(500).json({ code: 500, message: 'Внутренняя ошибка сервера' });
    }
});

router.post('/log-in', async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const account = await VIA_Account.findOne({ username });
        if (!account) {
            return res.status(404).json({ code: 404, message: 'Аккаунт не найден' });
        }
        const isPasswordValid = await bcrypt.compare(password, account.password);
        if (!isPasswordValid) {
            return res.status(401).json({ code: 401, message: 'Неверный пароль' });
        }
        const token = jwt.sign({ username: account.username, role: account.role }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ code: 500, message: 'Внутренняя ошибка сервера' });
    }
});

router.get('/protected', authenticateToken, (req: Request, res: Response) => {
    res.json({ message: 'This is a protected route' });
});

export default router;
