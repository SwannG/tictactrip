import uuid from 'node-uuid';
import { RedisClientType } from './types';

export const generateRandomToken = (): string => {
    return uuid.v4();
};

export const isAuthenticated = async( redisClient: RedisClientType, token: string ): Promise<number> => {
    return await redisClient.exists( token );
};

export const setClientToken = async( redisClient: RedisClientType, userEmail: string, token: string ) => {
    await redisClient.set( token, 0 );
    await redisClient.expire( token, 24 * 3600 );
};