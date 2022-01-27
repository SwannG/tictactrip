import { Request, Response, NextFunction } from 'express';

module.exports = {
    isTextPlain: async (req: Request, res: Response, next: NextFunction) => {
        const contentType: string|undefined = req.headers['content-type'];

        if (contentType !== 'text/plain') {
            return res.status(415).send({message: 'The content-type must be text/plain'})
        }
        next();
    },
    isJson: async (req: Request, res: Response, next: NextFunction) => {
        const contentType: string|undefined = req.headers['content-type'];

        if (contentType !== 'application/json') {
            return res.status(415).send({message: 'The content-type must be application/json'})
        }
        next();
    }
}