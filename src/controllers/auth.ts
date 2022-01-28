import { Request, Response } from 'express';
import redisClient from '../index';
const { generateRandomToken, setClientToken } = require( '../common/authUtils' );

export const postLogin = async( req: Request, res: Response ) => {
    const emailRegex: RegExp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if ( typeof req.body.email !== 'string' || !req.body.email.match( emailRegex ) ) {
        return res.status( 400 ).json( { message: 'Missing or Invalid email address' } );
    }
    const token: string = generateRandomToken();
    await setClientToken( redisClient, req.body.email, token );

    res.status( 200 ).json( { token: token } );
};