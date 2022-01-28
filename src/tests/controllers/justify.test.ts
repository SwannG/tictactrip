import request from 'supertest';
const { app, redisClient } = require( '../../index' );
import { shortText, shortTextJustified } from '../common/texts';


describe( 'Justify', () => {

    afterAll( () => {
        redisClient.quit();
    } );

    let responseAuth: request.Response;
    let responseJustify: request.Response;

    beforeAll( async() => {
        responseAuth = await request( app ).post( '/api/token' ).send( {
            email: 'swann@swann.com'
        } );
        
        responseJustify = await request( app ).post( '/api/justify' )
            .set( 'Authorization', 'bearer ' + responseAuth.body.token )
            .set( 'Content-Type', 'text/plain' )
            .send( shortText );
    } );

    it( 'should respond with status code 200', () => {
        expect( responseJustify.statusCode ).toEqual( 200 );
    } );
    
    it( 'should have justify the text sent', () => {
        expect( responseJustify.text ).toEqual( shortTextJustified );
    } );
} );