import { capitalize, isTextSegmentEquals, uncapitalize } from '../src/Core/Helpers/Text';

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

test('isTextSegmentEquals function', () => {
    const text = 'URL Generation for Universal Router.';

    expect(isTextSegmentEquals(text, 0, 'URL ')).toBeTruthy();
    expect(isTextSegmentEquals(text, 1, 'RL')).toBeTruthy();
    expect(isTextSegmentEquals(text, 12, 'on for Universal')).toBeTruthy();
    expect(isTextSegmentEquals(text, 29, 'Router')).toBeTruthy();

    expect(isTextSegmentEquals(text, 0, 'RL')).toBeFalsy();
    expect(isTextSegmentEquals(text, 0, 'USSR')).toBeFalsy();
    expect(isTextSegmentEquals(text, 0, 'URLs')).toBeFalsy();
    expect(isTextSegmentEquals(text, 29, 'Router!')).toBeFalsy();
});
