import justifyText from '../../common/justify';
import { shortText, shortTextJustified, mediumText, mediumTextJustified, longText, longTextJustified } from './texts';

describe( 'Justify text', () => {
    it( 'should justify short text', () => {
        expect( justifyText( shortText ) ).toBe( shortTextJustified );
    } );

    it( 'should justify medium text', () => {
        expect( justifyText( mediumText ) ).toBe( mediumTextJustified );
    } );

    it( 'should justify long Text', () => {
        expect( justifyText( longText ) ).toBe( longTextJustified );
    } );
} );