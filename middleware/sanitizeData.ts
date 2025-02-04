import { Request, Response, NextFunction } from 'express';
import sanitizeHtml from 'sanitize-html';

const sanitizeData = (req: Request, res: Response, next: NextFunction) => {
    for (const key in req.body) {
        if (req.body.hasOwnProperty(key)) {
            req.body[key] = sanitizeHtml(req.body[key]);
        }
    }
    next();
};

export default sanitizeData;
