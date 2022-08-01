import type { Argument } from './Argument';
import type { MethodModifiers } from './MethodModifiers';

export class Method {
    public readonly args: Argument[];

    public readonly body: string;

    public readonly modifiers: MethodModifiers;

    public readonly name: string;

    public readonly type: string;

    public constructor(modifiers: MethodModifiers, name: string, type: string, args: Argument[], body: string) {
        this.modifiers = modifiers;
        this.name = name;
        this.type = type;
        this.args = args;
        this.body = body;
    }

    public toString(): string {
        const args: string[] = this.args.map((arg: Argument) => `${arg}`);

        return `${this.modifiers} ${this.name}(${args}): ${this.type} {
${this.body}
}`;
    }
}
