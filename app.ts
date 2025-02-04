import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import studentRoutes from './routes/students';
import { authenticateToken } from './middleware/authenticateToken';
import winston from 'winston';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7120;
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

mongoose.connect('mongodb://localhost:27017/via_education', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 10, // Adjust the pool size for better performance
    serverSelectionTimeoutMS: 5000, // Adjust the timeout settings
});

interface User {
    role: string;
}

// Configure winston logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'app.log' })
    ]
});

app.use('/students', studentRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    logger.error(`Error occurred: ${err.message}`);
    logger.error(`Stack trace: ${err.stack}`);
    res.status(500).json({ code: 500, message: 'Внутренняя ошибка сервера' });
});

app.listen(PORT, () => {
    logger.info(`Server running on http://localhost:${PORT}`);
});
