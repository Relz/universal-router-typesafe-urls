import { isTextSegmentEquals } from './Text';

export class ClassInstanceCreationExpression {
    public readonly argumentsExpression: string;

    public readonly className: string;

    public readonly genericTypeNames: string[];

    public constructor(className: string, genericTypeNames: string[], argumentsExpression: string) {
        this.className = className;
        this.genericTypeNames = genericTypeNames;
        this.argumentsExpression = argumentsExpression;
    }
}

const classInstanceCreationPrefix = 'new ';
const stringLiterals: Set<string> = new Set<string>([`'`, '`', '"']);

const findTextIndexes = (text: string, searchValue: string): number[] => {
    const indexes: number[] = [];

    for (let index = 0; index < text.length; ++index) {
        const char: string | undefined = text[index];
        if (char === searchValue[0] && isTextSegmentEquals(text, index, searchValue)) {
            indexes.push(index);
        }
    }

    return indexes;
};

// eslint-disable-next-line max-statements
const getGenericTypeNames = (text: string, shift: number): string[] => {
    let startIndex = shift;

    for (startIndex; startIndex < text.length; ++startIndex) {
        if (text[startIndex] === '<') {
            ++startIndex;
            break;
        }
    }

    if (startIndex === text.length) {
        return [];
    }

    let genericTypeNamesString = '';

    for (let index = startIndex; index < text.length; ++index) {
        const char: string | undefined = text[index];
        if (char === '>') {
            break;
        } else if (index === text.length - 1) {
            return [];
        }
        genericTypeNamesString += char;
    }

    return genericTypeNamesString.split(',').map((genericTypeName: string) => genericTypeName.trim());
};

const skipStringLiteral = (text: string, shift: number, stringLiteralChar: string): number => {
    let index = shift + 1;

    for (index; index < text.length; ) {
        const char: string = text[index] ?? '';
        const previousChar: string = text[index - 1] ?? '';
        if (stringLiterals.has(char) && previousChar !== '\\') {
            if (char === stringLiteralChar) {
                break;
            } else {
                index = skipStringLiteral(text, index, char);
            }
        } else {
            ++index;
        }
    }

    return index + 1;
};

// eslint-disable-next-line max-statements
const getArgumentsExpression = (text: string, shift: number): string => {
    let argumentsExpression = '';

    let roundBracketLevel = 0;

    for (let index = shift; index < text.length; ) {
        const char: string = text[index] ?? '';

        if (char === '(') {
            if (roundBracketLevel > 0) {
                argumentsExpression += char;
            }
            ++roundBracketLevel;
        } else if (char === ')') {
            if (roundBracketLevel === 0) {
                return '';
            }
            --roundBracketLevel;

            if (roundBracketLevel === 0) {
                break;
            }
            argumentsExpression += char;
        } else if (stringLiterals.has(char)) {
            const literalStartIndex: number = index;
            index = skipStringLiteral(text, index, char);
            argumentsExpression += text.slice(literalStartIndex, index);
            // eslint-disable-next-line no-continue
            continue;
        } else if (roundBracketLevel > 0) {
            argumentsExpression += char;
        }
        ++index;
    }

    return argumentsExpression;
};

export const getClassInstanceCreationExpressions = (
    sourceCode: string,
    className: string,
): ClassInstanceCreationExpression[] => {
    const classInstanceCreationExpressionIndexes: number[] = findTextIndexes(
        sourceCode,
        `${classInstanceCreationPrefix}${className}`,
    ).map((index: number) => index + classInstanceCreationPrefix.length);

    return classInstanceCreationExpressionIndexes.map((index: number) => {
        const genericTypeNames: string[] = getGenericTypeNames(sourceCode, index + className.length);
        const argumentsExpression: string = getArgumentsExpression(sourceCode, index + className.length);

        return new ClassInstanceCreationExpression(className, genericTypeNames, argumentsExpression);
    });
};
