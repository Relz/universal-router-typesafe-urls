import { capitalize, uncapitalize } from '../src/Core/helpers/text';

describe('capitalize function', () => {
    test('capitalize first letter', () => {
        expect(capitalize('relz')).toBe('Relz');
    });
    test(`doesn't change capitalized string`, () => {
        expect(capitalize('Relz')).toBe('Relz');
    });
    test(`doesn't change string if first character is not letter`, () => {
        expect(capitalize('_relz')).toBe('_relz');
    });
});

describe('uncapitalize function', () => {
    test('uncapitalize first letter', () => {
        expect(uncapitalize('Relz')).toBe('relz');
    });
    test(`doesn't change uncapitalize string`, () => {
        expect(uncapitalize('relz')).toBe('relz');
    });
    test(`doesn't change string if first character is not letter`, () => {
        expect(uncapitalize('_Relz')).toBe('_Relz');
    });
});
