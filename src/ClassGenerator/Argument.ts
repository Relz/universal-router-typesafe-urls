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
        const name = this.initialValue === undefined ? this.name : this.name.replace(/\?$/u, '');
        const initialValue = this.initialValue === undefined ? '' : ` = ${this.initialValue}`;

        return `${name}: ${this.type}${initialValue}`;
    }
}
