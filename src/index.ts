import { RedisClientType } from './common/types';
const bodyParser = require( 'body-parser' );

const express = require( 'express' );
const redis = require( 'redis' );

const app = express();

const redisClient: RedisClientType = redis.createClient( { socket: { host: 'redis' } } );
redisClient.connect();

redisClient.on( 'error', ( err: any ) => {
    console.log( 'Error ' + err );
} );

redisClient.on( 'connect', async() => {
    console.log( 'Connected to Redis' );
} );

app.use( bodyParser.json() );
app.use( bodyParser.text() );
app.use( bodyParser.urlencoded( { extended:true } ) );
app.use( '/', require( './routes' ) );


app.listen( 4000, () => {
    console.log( 'server running on port 4000' );
} );

export default redisClient;
