import { RedisClientType } from './common/types';
const bodyParser = require( 'body-parser' );
const express = require( 'express' );
const redis = require( 'redis' );

const app = express();

console.log( `NODE_ENV=${process.env.NODE_ENV}` );

const redisClient: RedisClientType = redis.createClient( { socket: { host: process.env.REDIS_HOST, port: process.env.REDIS_PORT } } );

redisClient.connect();

redisClient.on( 'error', ( err: any ) => {
    console.log( 'Error ' + err );
} );

redisClient.on( 'connect', async() => {
    console.log( 'Connected to Redis' );
} );

process.on( 'exit', function(){
    redisClient.quit();
} );

app.use( bodyParser.json() );
app.use( bodyParser.text() );
app.use( bodyParser.urlencoded( { extended:true } ) );
app.use( '/', require( './routes' ) );

if ( process.env.NODE_ENV !== 'test' ) {
    app.listen( process.env.SERVER_PORT, () => {
        console.log( `server running on port ${process.env.SERVER_PORT}` );
    } );
} else {
    module.exports = {
        app,
        redisClient
    };
}

export default redisClient;