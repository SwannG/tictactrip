import justifyText from '../../common/justify'
import {shortText, shortTextJustified, mediumText, mediumTextJustified, longText, longTextJustified} from './texts'

describe('Justify text', () => {
    it('should justify short text', () => {
        expect(justifyText(shortText)).toEqual(shortTextJustified);
    })

    it('should justify medium text', () => {
        expect(justifyText(mediumText)).toEqual(mediumTextJustified);
    })

    it('should justify longText', () => {
        expect(justifyText(longText)).toEqual(longTextJustified);
    })
})