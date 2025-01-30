import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const app = express();
const PORT = 7120;
const SECRET_KEY = 'your_secret_key';

mongoose.connect('mongodb://localhost:27017/via_education', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const studentSchema = new mongoose.Schema({
    id: String,
    name: String,
    age: Number,
    grade: String,
});
const Student = mongoose.model('Student', studentSchema);

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ code: 401, message: 'Не авторизован' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ code: 403, message: 'Доступ запрещен' });
        req.user = user;
        next();
    });
};

app.get('/students/:studentId', authenticateToken, async (req, res) => {
    const student = await Student.findOne({ id: req.params.studentId });
    if (!student) {
        return res.status(404).json({ code: 404, message: 'Ученик не найден' });
    }
    res.json(student);
});

app.get('/admin/students', authenticateToken, async (req, res) => {
    if (!['Administrator', 'FOXFORD_Staff'].includes(req.user.role)) {
        return res.status(403).json({ code: 403, message: 'Доступ запрещен' });
    }
    const students = await Student.find();
    res.json(students);
});

app.listen(PORT, () => {
    console.log(Server running on http://localhost:${PORT});
});
