import type { ClassInstanceCreationExpression } from '../src/Core/Helpers/SourceCode';
import { getClassInstanceCreationExpressions } from '../src/Core/Helpers/SourceCode';

const className = 'SomeClass';

const simpleClassInstanceCreationExpression = `new ${className}()`;

const classInstanceCreationExpressionWithGenericType = `new ${className}<boolean>()`;

const classInstanceCreationExpressionWithGenericTypes = `new ${className}<string, number, SomeCustomType>()`;

const classInstanceCreationExpressionWithNotFormattedGenericTypes = `    new ${className}   <   string   ,    number  ,   SomeCustomType     >    ()    `;

const classInstanceCreationExpressionWithSimpleArgumentsExpression = `new ${className}(42)`;

const complexArgumentsExpression = `[
    42,
    true,
    'some string',
    "some string",
    \`some string\`,
    \`\${someObject})] \${')]' + ")]" + \`\`}])\`,
    undefined,
    null,
    [],
    () => () => ([42]),
]`;

const classInstanceCreationExpressionWithComplexArgumentsExpression = `new ${className}(${complexArgumentsExpression})`;

const multipleClassInstanceCreationExpression = `
new ${className}();
new ${className}();
`;

const classInstanceCreationExpressionWithSyntaxErrorInGenericTypeDeclaration1 = `new ${className}<number,()`;

const classInstanceCreationExpressionWithSyntaxErrorInGenericTypeDeclaration2 = `new ${className}number()`;

const classInstanceCreationExpressionWithSyntaxErrorInGenericTypeDeclaration3 = `new ${className}`;

const classInstanceCreationExpressionWithSyntaxErrorInArgumentsExpression1 = `new ${className}(`;

const classInstanceCreationExpressionWithSyntaxErrorInArgumentsExpression2 = `new ${className})`;

const classInstanceCreationExpressionWithSyntaxErrorInArgumentsExpression3 = `new ${className}`;

const argumentsExpressionExample = `[
    {
        path: '/',
        action: (context) => new RootController(context),
    },
    {
        name: 'simple-controller',
        path: '/simple',
        action: (context) => new SimpleController(context),
    },
    {
        path: '/parameterized/:some_parameter',
        action: (context) => {
            let parameter = context.params.parameter;
            if (Array.isArray(parameter)) {
                parameter = parameter[0];
            }

            return new ParameterizedController(context, parameter);
        },
    },
    {
        path: '/optional_parameterized/:some_optional_parameter?',
        action: (context) => {
            let parameter = context.params.parameter;
            if (Array.isArray(parameter)) {
                parameter = parameter[0];
            }

            return new ParameterizedController(context, parameter);
        },
    },
    {
        path: '/users',
        children: [
            {
                path: '',
                action: (context) => new UsersController(context),
            },
            {
                path: '/:username',
                action: (context) => {
                    let username = context.params.username;
                    if (Array.isArray(username)) {
                        username = username[0];
                    }

                    return new UserController(context, username);
                },
            },
        ],
    },
]`;

const classInstanceCreationExpressionExample = `import { RootController } from '../controllers/RootController';
import UniversalRouter, { RouterContext } from 'universal-router';
import { SimpleController } from '../controllers/SimpleController';
import { ParameterizedController } from '../controllers/ParameterizedController';

export function createRouter() {
    return new UniversalRouter<any, RouterContext>(${argumentsExpressionExample});
}
`;

// eslint-disable-next-line max-statements
describe('getClassInstanceCreationExpressions function', () => {
    test('determines simple expression', () => {
        const classInstanceCreationExpressions: ClassInstanceCreationExpression[] = getClassInstanceCreationExpressions(
            simpleClassInstanceCreationExpression,
            className,
        );

        expect(classInstanceCreationExpressions.length).toBe(1);

        const [classInstanceCreationExpression] = classInstanceCreationExpressions;

        if (classInstanceCreationExpression === undefined) {
            return;
        }

        expect(classInstanceCreationExpression.genericTypeNames).toEqual([]);
        expect(classInstanceCreationExpression.argumentsExpression).toBe('');
    });

    test('determines generic type name', () => {
        const classInstanceCreationExpressions: ClassInstanceCreationExpression[] = getClassInstanceCreationExpressions(
            classInstanceCreationExpressionWithGenericType,
            className,
        );

        expect(classInstanceCreationExpressions.length).toBe(1);

        const [classInstanceCreationExpression] = classInstanceCreationExpressions;

        if (classInstanceCreationExpression === undefined) {
            return;
        }

        expect(classInstanceCreationExpression.genericTypeNames).toEqual(['boolean']);
        expect(classInstanceCreationExpression.argumentsExpression).toBe('');
    });

    test('determines generic type names', () => {
        const classInstanceCreationExpressions: ClassInstanceCreationExpression[] = getClassInstanceCreationExpressions(
            classInstanceCreationExpressionWithGenericTypes,
            className,
        );

        expect(classInstanceCreationExpressions.length).toBe(1);

        const [classInstanceCreationExpression] = classInstanceCreationExpressions;

        if (classInstanceCreationExpression === undefined) {
            return;
        }

        expect(classInstanceCreationExpression.genericTypeNames).toEqual(['string', 'number', 'SomeCustomType']);
        expect(classInstanceCreationExpression.argumentsExpression).toBe('');
    });

    test(`determines generic type names if code isn't formatted`, () => {
        const classInstanceCreationExpressions: ClassInstanceCreationExpression[] = getClassInstanceCreationExpressions(
            classInstanceCreationExpressionWithNotFormattedGenericTypes,
            className,
        );

        expect(classInstanceCreationExpressions.length).toBe(1);

        const [classInstanceCreationExpression] = classInstanceCreationExpressions;

        if (classInstanceCreationExpression === undefined) {
            return;
        }

        expect(classInstanceCreationExpression.genericTypeNames).toEqual(['string', 'number', 'SomeCustomType']);
        expect(classInstanceCreationExpression.argumentsExpression).toBe('');
    });

    test(`determines simple arguments expression`, () => {
        const classInstanceCreationExpressions: ClassInstanceCreationExpression[] = getClassInstanceCreationExpressions(
            classInstanceCreationExpressionWithSimpleArgumentsExpression,
            className,
        );

        expect(classInstanceCreationExpressions.length).toBe(1);

        const [classInstanceCreationExpression] = classInstanceCreationExpressions;

        if (classInstanceCreationExpression === undefined) {
            return;
        }

        expect(classInstanceCreationExpression.genericTypeNames.length).toBe(0);
        expect(classInstanceCreationExpression.argumentsExpression).toBe('42');
    });

    test(`determines complex arguments expression`, () => {
        const classInstanceCreationExpressions: ClassInstanceCreationExpression[] = getClassInstanceCreationExpressions(
            classInstanceCreationExpressionWithComplexArgumentsExpression,
            className,
        );

        expect(classInstanceCreationExpressions.length).toBe(1);

        const [classInstanceCreationExpression] = classInstanceCreationExpressions;

        if (classInstanceCreationExpression === undefined) {
            return;
        }

        expect(classInstanceCreationExpression.genericTypeNames).toEqual([]);
        expect(classInstanceCreationExpression.argumentsExpression).toBe(complexArgumentsExpression);
    });

    test(`determines multiple class instance creation expressions`, () => {
        const classInstanceCreationExpressions: ClassInstanceCreationExpression[] = getClassInstanceCreationExpressions(
            multipleClassInstanceCreationExpression,
            className,
        );

        expect(classInstanceCreationExpressions.length).toBe(2);
    });

    test(`not crashes if class instance creation not found`, () => {
        const classInstanceCreationExpressions: ClassInstanceCreationExpression[] = getClassInstanceCreationExpressions(
            '',
            className,
        );

        expect(classInstanceCreationExpressions).toEqual([]);
    });

    test(`not crashes if class instance creation has syntax error in generic types declaration`, () => {
        [
            classInstanceCreationExpressionWithSyntaxErrorInGenericTypeDeclaration1,
            classInstanceCreationExpressionWithSyntaxErrorInGenericTypeDeclaration2,
            classInstanceCreationExpressionWithSyntaxErrorInGenericTypeDeclaration3,
        ]
            .map((sourceCode: string) => getClassInstanceCreationExpressions(sourceCode, className))
            .forEach((classInstanceCreationExpressions: ClassInstanceCreationExpression[]) => {
                expect(classInstanceCreationExpressions.length).toBe(1);

                const [classInstanceCreationExpression] = classInstanceCreationExpressions;

                if (classInstanceCreationExpression === undefined) {
                    return;
                }

                expect(classInstanceCreationExpression.genericTypeNames).toEqual([]);
            });
    });

    test(`not crashes if class instance creation has syntax error in arguments expression`, () => {
        [
            classInstanceCreationExpressionWithSyntaxErrorInArgumentsExpression1,
            classInstanceCreationExpressionWithSyntaxErrorInArgumentsExpression2,
            classInstanceCreationExpressionWithSyntaxErrorInArgumentsExpression3,
        ]
            .map((sourceCode: string) => getClassInstanceCreationExpressions(sourceCode, className))
            .forEach((classInstanceCreationExpressions: ClassInstanceCreationExpression[]) => {
                expect(classInstanceCreationExpressions.length).toBe(1);

                const [classInstanceCreationExpression] = classInstanceCreationExpressions;

                if (classInstanceCreationExpression === undefined) {
                    return;
                }

                expect(classInstanceCreationExpression.genericTypeNames).toEqual([]);
                expect(classInstanceCreationExpression.argumentsExpression).toBe('');
            });
    });

    test(`determines class instance creation expression example`, () => {
        const classInstanceCreationExpressions: ClassInstanceCreationExpression[] = getClassInstanceCreationExpressions(
            classInstanceCreationExpressionExample,
            'UniversalRouter',
        );

        expect(classInstanceCreationExpressions.length).toBe(1);

        const [classInstanceCreationExpression] = classInstanceCreationExpressions;

        if (classInstanceCreationExpression === undefined) {
            return;
        }

        expect(classInstanceCreationExpression.genericTypeNames).toEqual(['any', 'RouterContext']);
        expect(classInstanceCreationExpression.argumentsExpression).toBe(argumentsExpressionExample);
    });
});
