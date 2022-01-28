import { RedisClientType } from './common/types';
const bodyParser = require( 'body-parser' );
const config =  require( '../config' );
const express = require( 'express' );
const redis = require( 'redis' );

const app = express();

console.log( `NODE_ENV=${process.env.NODE_ENV}` );

const redisClient: RedisClientType = redis.createClient( { socket: { host: process.env.REDIS_HOST } } );

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
    app.listen( 4000, () => {
        console.log( 'server running on port 4000' );
    } );
} else {
    module.exports = {
        app,
        redisClient
    };
}

export default redisClient;