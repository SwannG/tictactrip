import { Request, Response, NextFunction } from 'express';
import redisClient from '../index'
const {isAuthenticated} = require('../common/authUtils');

module.exports = {
    isLoggedApi: async (req: Request, res: Response, next: NextFunction) => {
        if (req.headers.authorization === undefined) {
            return res.status(400).json({message: 'You must provide a token'})
        }

        const token: string = req.headers.authorization.split(" ")[1]

        if (!await isAuthenticated(redisClient, token)) {
            return res.status(400).json({message: 'Invalid token'})
        }
        // To get token in the next middleware
        res.locals.token = token
        next();
    }
}