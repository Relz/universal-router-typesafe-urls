export class Argument {
    public readonly type: string;

    public readonly name: string;

    public readonly initialValue: string | undefined;

    public constructor(name: string, type: string, initialValue?: string) {
        this.name = name;
        this.type = type;
        this.initialValue = initialValue;
    }

    public toString(): string {
        const initialValue = this.initialValue === undefined ? '' : ` = ${this.initialValue}`;

        return `${this.name}: ${this.type}${initialValue}`;
    }
}
