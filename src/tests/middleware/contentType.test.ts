import request from 'supertest';
import { shortText } from '../common/texts';
const { app, redisClient } = require( '../../index' );

describe( 'ContentType middleware', () => {

    afterAll( () => {
        redisClient.quit();
    } );

    describe( 'Send request to /api/justify', () => {
        let responseAuth: request.Response;

        beforeAll( async() => {
            responseAuth = await request( app ).post( '/api/token' ).send( {
                email: 'swann@swann.com'
            } );
        } );

        describe( 'With a wrong content-type', () => {

            it( 'Should respond with a 415', async() => {

                const response: request.Response = await request( app ).post( '/api/justify' )
                    .set( 'Authorization', 'bearer ' + responseAuth.body.token )
                    .set( 'Content-Type', 'application/json' )
                    .send( { text: 'lalala' } );

                expect( response.statusCode ).toBe( 415 );
            } );
        } );

        describe( 'With a valid content-type', () => {

            it( 'should respond with a 200', async() => {
                const response: request.Response = await request( app ).post( '/api/justify' )
                    .set( 'Authorization', 'bearer ' + responseAuth.body.token )
                    .set( 'Content-Type', 'text/plain' )
                    .send( shortText );

                expect( response.statusCode ).toBe( 200 );
            } );
        } );
    } );

    describe( 'Send request to /api/token', () => {

        describe( 'With a wrong content-type', () => {

            it( 'Should respond with a 415', async() => {
                const response: request.Response = await request( app ).post( '/api/token' )
                    .set( 'Content-Type', 'text/plain' )
                    .send( 'swann@swann.com' );

                expect( response.statusCode ).toBe( 415 );
            } );
        } );

        describe( 'With a valid content-type', () => {

            it( 'should respond with a 200', async() => {
                const response: request.Response = await request( app ).post( '/api/token' )
                    .set( 'Content-Type', 'application/json' )
                    .send( { email: 'swann@swann' } );

                expect( response.statusCode ).toBe( 200 );
            } );
        } );
    } );
    
} );