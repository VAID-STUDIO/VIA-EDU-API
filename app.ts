import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import studentRoutes from './routes/students';
import { authenticateToken } from './middleware/authenticateToken';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7120;
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

mongoose.connect('mongodb://localhost:27017/via_education', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

interface User {
    role: string;
}

app.use('/students', studentRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ code: 500, message: 'Внутренняя ошибка сервера' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
