import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import dotenv from 'dotenv';
import { check, validationResult } from 'express-validator';
import sanitizeHtml from 'sanitize-html';
import VIA_Account from '../models/viaAccount';
import { authenticateToken } from '../middleware/authenticateToken';

dotenv.config();

const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

const sanitizeData = (req: Request, res: Response, next: Function) => {
    req.body.username = sanitizeHtml(req.body.username);
    req.body.password = sanitizeHtml(req.body.password);
    req.body.email = sanitizeHtml(req.body.email);
    next();
};

router.post('/sign-up', [
    check('username').isString().withMessage('Username must be a string'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    check('email').isEmail().withMessage('Invalid email format')
], sanitizeData, async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { username, password, email, role } = req.body;
        const hashedPassword = await argon2.hash(password);
        const newAccount = new VIA_Account({ username, password: hashedPassword, email, role });
        await newAccount.save();
        res.status(201).json({ message: 'Account created successfully' });
    } catch (error) {
        res.status(500).json({ code: 500, message: 'Внутренняя ошибка сервера' });
    }
});

router.post('/log-in', sanitizeData, async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const account = await VIA_Account.findOne({ username });
        if (!account) {
            return res.status(404).json({ code: 404, message: 'Аккаунт не найден' });
        }
        const isPasswordValid = await argon2.verify(account.password, password);
        if (!isPasswordValid) {
            return res.status(401).json({ code: 401, message: 'Неверный пароль' });
        }
        const token = jwt.sign({ username: account.username, role: account.role }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ code: 500, message: 'Внутренняя ошибка сервера' });
    }
});

router.post('/log-in/api-token', sanitizeData, async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const account = await VIA_Account.findOne({ username });
        if (!account) {
            return res.status(404).json({ code: 404, message: 'Аккаунт не найден' });
        }
        const isPasswordValid = await argon2.verify(account.password, password);
        if (!isPasswordValid) {
            return res.status(401).json({ code: 401, message: 'Неверный пароль' });
        }
        const token = jwt.sign({ username: account.username, role: account.role }, SECRET_KEY, { expiresIn: '9999 years' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ code: 500, message: 'Внутренняя ошибка сервера' });
    }
});

router.get('/protected', authenticateToken, (req: Request, res: Response) => {
    res.json({ message: 'This is a protected route' });
});

export default router;
