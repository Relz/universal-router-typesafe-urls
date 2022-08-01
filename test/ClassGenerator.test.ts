import { Argument } from '../src/ClassGenerator/Argument';
import { ClassGenerator } from '../src/ClassGenerator/ClassGenerator';
import { MethodModifiers } from '../src/ClassGenerator/MethodModifiers';
import { PropertyModifiers } from '../src/ClassGenerator/PropertyModifiers';

const className = 'ClassName';

const emptyClass = `class ${className} {
}
`;

const emptyAbstractClass = `abstract class ${className} {
}
`;

const exportedEmptyClass = `export class ${className} {
}
`;

const classWithProperty = `class ${className} {
\tpublic static readonly prop1: string = 'some string 1';

\tprotected static readonly prop2: string = 'some string 2';

\tprivate static readonly prop3: string = 'some string 3';

\tpublic static prop4: number | undefined = 42;

\tpublic readonly prop5: CustomType = new CustomType();

\tpublic prop6: boolean = false;
}
`;

const classWithMethods = `class ${className} {
\tpublic static method1(): void {
\t}

\tprotected static method2(): void {
\t}

\tprivate static method3(): void {
\t}

\tpublic method4(): void {
\t}

\tpublic method5(arg: string): string {
\t\treturn \`method5 got \${arg}\`;
\t}
}
`;

const classWithPropertiesAndMethods = `class ${className} {
\tpublic static readonly prop1: string = 'some string 1';

\tprotected static readonly prop2: string = 'some string 2';

\tprivate static readonly prop3: string = 'some string 3';

\tpublic static prop4: number | undefined = 42;

\tpublic readonly prop5: CustomType = new CustomType();

\tpublic prop6: boolean = false;

\tpublic static method1(): void {
\t}

\tprotected static method2(): void {
\t}

\tprivate static method3(): void {
\t}

\tpublic method4(): void {
\t}

\tpublic method5(arg: string): string {
\t\treturn \`method5 got \${arg}\`;
\t}
}
`;

test('Empty class generation', () => {
    expect(new ClassGenerator(className).generate()).toBe(emptyClass);
});

test('Empty abstract class generation', () => {
    expect(new ClassGenerator(className, true).generate()).toBe(emptyAbstractClass);
});

test('Exported empty class generation', () => {
    expect(new ClassGenerator(className, false, true).generate()).toBe(exportedEmptyClass);
});

test('Class with properties generation', () => {
    expect(
        new ClassGenerator(className)
            .addProperty(new PropertyModifiers('public', 'static', 'readonly'), 'prop1', 'string', `'some string 1'`)
            .addProperty(new PropertyModifiers('protected', 'static', 'readonly'), 'prop2', 'string', `'some string 2'`)
            .addProperty(new PropertyModifiers('private', 'static', 'readonly'), 'prop3', 'string', `'some string 3'`)
            .addProperty(new PropertyModifiers('public', 'static'), 'prop4', 'number | undefined', '42')
            .addProperty(
                new PropertyModifiers('public', undefined, 'readonly'),
                'prop5',
                'CustomType',
                'new CustomType()',
            )
            .addProperty(new PropertyModifiers('public'), 'prop6', 'boolean', 'false')
            .generate(),
    ).toBe(classWithProperty);
});

test('Class with methods generation', () => {
    expect(
        new ClassGenerator(className)
            .addMethod(new MethodModifiers('public', 'static'), 'method1', 'void', [], '')
            .addMethod(new MethodModifiers('protected', 'static'), 'method2', 'void', [], '')
            .addMethod(new MethodModifiers('private', 'static'), 'method3', 'void', [], '')
            .addMethod(new MethodModifiers('public'), 'method4', 'void', [], '')
            .addMethod(
                new PropertyModifiers('public'),
                'method5',
                'string',
                [new Argument('arg', 'string')],
                // eslint-disable-next-line no-template-curly-in-string
                'return `method5 got ${arg}`;',
            )
            .generate(),
    ).toBe(classWithMethods);
});

test('Class with properties and methods generation', () => {
    expect(
        new ClassGenerator(className)
            .addProperty(new PropertyModifiers('public', 'static', 'readonly'), 'prop1', 'string', `'some string 1'`)
            .addProperty(new PropertyModifiers('protected', 'static', 'readonly'), 'prop2', 'string', `'some string 2'`)
            .addProperty(new PropertyModifiers('private', 'static', 'readonly'), 'prop3', 'string', `'some string 3'`)
            .addProperty(new PropertyModifiers('public', 'static'), 'prop4', 'number | undefined', '42')
            .addProperty(
                new PropertyModifiers('public', undefined, 'readonly'),
                'prop5',
                'CustomType',
                'new CustomType()',
            )
            .addProperty(new PropertyModifiers('public'), 'prop6', 'boolean', 'false')
            .addMethod(new MethodModifiers('public', 'static'), 'method1', 'void', [], '')
            .addMethod(new MethodModifiers('protected', 'static'), 'method2', 'void', [], '')
            .addMethod(new MethodModifiers('private', 'static'), 'method3', 'void', [], '')
            .addMethod(new MethodModifiers('public'), 'method4', 'void', [], '')
            .addMethod(
                new PropertyModifiers('public'),
                'method5',
                'string',
                [new Argument('arg', 'string')],
                // eslint-disable-next-line no-template-curly-in-string
                'return `method5 got ${arg}`;',
            )
            .generate(),
    ).toBe(classWithPropertiesAndMethods);
});
