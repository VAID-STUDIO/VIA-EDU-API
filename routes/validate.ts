import express, { Request, Response } from 'express';
import { authenticateToken } from '../middleware/authenticateToken';
import { check, validationResult } from 'express-validator';

const router = express.Router();

router.post('/validate-email', [
    authenticateToken,
    check('email').isEmail().withMessage('Invalid email format')
], (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    res.json({ message: 'Email is valid' });
});

router.post('/validate-class', [
    authenticateToken,
    check('class').isString().withMessage('Class must be a string')
], (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    res.json({ message: 'Class is valid' });
});

router.post('/validate-avatar', [
    authenticateToken,
    check('avatar').isURL().withMessage('Avatar must be a valid URL')
], (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    res.json({ message: 'Avatar is valid' });
});

export default router;
