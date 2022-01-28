import request from 'supertest';
import { shortText } from '../common/texts';
const { app, redisClient } = require( '../../index' );

describe( 'Send request to /api/justify', () => {

    afterAll( () => {
        redisClient.quit();
    } );

    let responseAuth: request.Response;

    beforeAll( async() => {
        responseAuth = await request( app ).post( '/api/token' ).send( {
            email: 'swann@swann.com'
        } );
        await redisClient.set( responseAuth.body.token, 79952 );
    } );

    describe( 'With a text of 48 words and 79952 words already justified', () => {

        it( 'Should respond with a 402', async() => {

            const response: request.Response = await request( app ).post( '/api/justify' )
                .set( 'Authorization', 'bearer ' + responseAuth.body.token )
                .set( 'Content-Type', 'text/plain' )
                .send( shortText );

            expect( response.statusCode ).toBe( 402 );
        } );
    } );
} );