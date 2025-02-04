import express, { Request, Response } from 'express';
import { authenticateToken } from '../middleware/authenticateToken';
import Student from '../models/student';
import sanitizeHtml from 'sanitize-html';

const router = express.Router();

const sanitizeData = (req: Request, res: Response, next: Function) => {
    req.body.name = sanitizeHtml(req.body.name);
    req.body.age = sanitizeHtml(req.body.age);
    req.body.grade = sanitizeHtml(req.body.grade);
    req.body.class = sanitizeHtml(req.body.class);
    req.body.publicEmail = sanitizeHtml(req.body.publicEmail);
    req.body.socialNetworks = req.body.socialNetworks.map((url: string) => sanitizeHtml(url));
    req.body.avatar = sanitizeHtml(req.body.avatar);
    req.body.description = sanitizeHtml(req.body.description);
    next();
};

router.get('/:studentId', authenticateToken, async (req: Request, res: Response) => {
    try {
        const student = await Student.findOne({ id: req.params.studentId });
        if (!student) {
            return res.status(404).json({ code: 404, message: 'Ученик не найден' });
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ code: 500, message: 'Внутренняя ошибка сервера' });
    }
});

router.get('/admin/students', authenticateToken, async (req: Request, res: Response) => {
    try {
        if (!['Administrator', 'FOXFORD_Staff'].includes(req.user.role)) {
            return res.status(403).json({ code: 403, message: 'Доступ запрещен' });
        }
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ code: 500, message: 'Внутренняя ошибка сервера' });
    }
});

export default router;
