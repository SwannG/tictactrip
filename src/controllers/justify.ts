import { Request, Response } from 'express';
import justifyText from '../common/justify'
import redisClient from '../index'

export const postJustify = async(req: Request, res: Response) => {
    const justifiedText = justifyText(req.body);
    const nbWordsJustified: number = res.locals.nbWordsToJustify;
    const token: string = res.locals.token;

    const nbWordsAlreadyJustified = await redisClient.get(res.locals.token);

    nbWordsAlreadyJustified !== null ?
        await redisClient.set(token, parseInt(nbWordsAlreadyJustified) + nbWordsJustified)
        :
        await  redisClient.set(token, res.locals.nbWordsToJustify)

    return res.status(200).send(justifiedText)
}