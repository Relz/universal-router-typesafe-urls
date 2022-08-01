import type { Argument } from './Argument';
import { Method } from './Method';
import type { MethodModifiers } from './MethodModifiers';
import { Property } from './Property';
import type { PropertyModifiers } from './PropertyModifiers';

export class ClassGenerator {
    private readonly name: string;

    private readonly exportModule: boolean;

    private readonly isAbstract: boolean;

    private readonly properties: Property[] = [];

    private readonly methods: Method[] = [];

    public constructor(name: string, isAbstract = false, exportModule = false) {
        this.name = name;
        this.isAbstract = isAbstract;
        this.exportModule = exportModule;
    }

    // eslint-disable-next-line max-lines-per-function
    private static format(classString: string): string {
        let currentIndent = 0;

        return (
            classString
                .split('\n')
                // Remove leading empty line and multiple empty lines
                .filter((line: string, index: number, lines: string[]) => {
                    const isFirstLine: boolean = index === 0;
                    const isEmptyLine: boolean = line.length === 0;

                    if (isFirstLine) {
                        return !isEmptyLine;
                    }

                    const previousLine: string = lines[index - 1] ?? '';
                    const isEmptyPreviousLine: boolean = previousLine.length === 0;

                    return !isEmptyLine || !isEmptyPreviousLine;
                })
                // Remove empty line at first line inside class
                .filter((line: string, index: number, lines: string[]) => {
                    const isFirstLine: boolean = index === 0;
                    if (isFirstLine) {
                        return true;
                    }

                    const isEmptyLine: boolean = line.length === 0;
                    const previousLine: string = lines[index - 1] ?? '';
                    const previousLineLastChar = previousLine[previousLine.length - 1];

                    return previousLineLastChar !== '{' || !isEmptyLine;
                })
                // Remove empty line at last line inside class
                .filter((line: string, index: number, lines: string[]) => {
                    const lastLineIndex: number = lines.length - 1;
                    const isLastLine: boolean = index === lastLineIndex;
                    const isEmptyLine: boolean = line.length === 0;
                    if (!isEmptyLine || isLastLine) {
                        return true;
                    }

                    const nextLine: string = lines[index + 1] ?? '';
                    // eslint-disable-next-line prefer-destructuring
                    const nextLineFirstChar = nextLine[0];

                    return nextLineFirstChar !== '}';
                })
                // Add indent
                // eslint-disable-next-line max-statements
                .map((line: string) => {
                    const isEmptyLine: boolean = line.length === 0;
                    if (isEmptyLine) {
                        return line;
                    }

                    // eslint-disable-next-line prefer-destructuring
                    const firstChar = line[0];
                    const lastChar = line[line.length - 1];

                    if (firstChar === '}') {
                        --currentIndent;
                    }

                    const indent: string = ClassGenerator.getIndent(currentIndent);

                    if (lastChar === '{') {
                        ++currentIndent;
                    }

                    return `${indent}${line}`;
                })
                .join('\n')
        );
    }

    private static getIndent(count: number): string {
        return Array.from({ length: count }).fill('\t').join('');
    }

    public addMethod(modifiers: MethodModifiers, name: string, type: string, args: Argument[], body: string): this {
        this.methods.push(new Method(modifiers, name, type, args, body));

        return this;
    }

    public addProperty(modifiers: PropertyModifiers, name: string, type: string, initialValue: string): this {
        this.properties.push(new Property(modifiers, name, type, initialValue));

        return this;
    }

    public generate(): string {
        return ClassGenerator.format(`
${this.exportModule ? 'export ' : ''}${this.isAbstract ? 'abstract ' : ''}class ${this.name} {
${this.properties.map((property: Property) => `${property}`).join('\n\n')}

${this.methods.map((method: Method) => `${method}`).join('\n\n')}
}
`);
    }
}
