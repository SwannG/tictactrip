import request from 'supertest';
const { app, redisClient } = require( '../../index' );

describe( 'Auth', () => {

    afterAll( () => {
        redisClient.quit();
    } );

    let response: request.Response;
    
    beforeAll( async() => {
        response = await request( app ).post( '/api/token' ).send( {
            email: 'swann@swann.com'
        } );
    } );
    
    it( 'should respond with status code 200', () => {
        expect( response.statusCode ).toEqual( 200 );
    } );

    it( 'should respond with a token', () => {
        expect( response.body.token.length ).toEqual( 36 );
    } );
    
    it ( 'should have set a key with the token', async() => {
        expect( await redisClient.get( response.body.token ) ).toBeDefined();
    } );
} );
