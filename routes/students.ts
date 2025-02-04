import express, { Request, Response } from 'express';
import { authenticateToken } from '../middleware/authenticateToken';
import Student from '../models/student';

const router = express.Router();

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
