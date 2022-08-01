export class Argument {
    public readonly type: string;

    public readonly name: string;

    public constructor(name: string, type: string) {
        this.name = name;
        this.type = type;
    }

    public toString(): string {
        return `${this.name}: ${this.type}`;
    }
}
