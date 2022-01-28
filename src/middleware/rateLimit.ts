import { Request, Response, NextFunction } from 'express';
import redisClient from '../index';

module.exports = {
    isRateLimitReached: async( req: Request, res: Response, next: NextFunction ) => {
        const nbWordsAlreadyJustified: string | null = await redisClient.get( res.locals.token );
        const nbWordsToJustify: number = req.body.split( ' ' ).length;

        res.locals.nbWordsToJustify = nbWordsToJustify;

        if ( nbWordsAlreadyJustified !== null && parseInt( nbWordsAlreadyJustified ) + nbWordsToJustify >= 80000 ) {
            return res.status( 402 ).send( { message: 'Payment Required' } );
        }

        next();
    }
};