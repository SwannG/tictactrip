import request from 'supertest';
import { shortText } from '../common/texts';
const { app, redisClient } = require( '../../index' );

describe( 'Auth middleware', () => {

    afterAll( () => {
        redisClient.quit();
    } );

    let response: request.Response;

    describe( 'Send request to /api/justify without token', () => {
        it( 'should respond with a 400', async() => {
            response = await request( app ).post( '/api/justify' )
                .send( shortText );

            expect( response.statusCode ).toBe( 400 );
        } );
    } );

    describe( 'Send request to /api/justify with an invalid token', () => {
        it( 'should respond with a 400', async() => {
            response = await request( app ).post( '/api/justify' )
                .set( 'Authorization', 'bearer token' )
                // .set( 'Content-Type', 'text/plain' )
                .send( shortText );

            expect( response.statusCode ).toBe( 400 );
        } );
    } );

    describe( 'Send request to /api/justify with a valid token', () => {
        let responseAuth: request.Response;

        beforeAll( async() => {
            responseAuth = await request( app ).post( '/api/token' ).send( {
                email: 'swann@swann.com'
            } );
        } );

        it( 'should respond with a 200', async() => {
            response = await request( app ).post( '/api/justify' )
                .set( 'Authorization', 'bearer ' + responseAuth.body.token )
                .set( 'Content-Type', 'text/plain' )
                .send( shortText );

            expect( response.statusCode ).toBe( 200 );
        } );
    } );
} );