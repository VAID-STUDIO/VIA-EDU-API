import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

interface User {
    role: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ code: 401, message: 'Не авторизован' });

    jwt.verify(token, SECRET_KEY, (err, user: User) => {
        if (err) return res.status(403).json({ code: 403, message: 'Доступ запрещен' });
        req.user = user;
        next();
    });
};
