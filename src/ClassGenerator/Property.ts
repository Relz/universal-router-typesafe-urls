import type { PropertyModifiers } from './PropertyModifiers';

export class Property {
    public readonly modifiers: PropertyModifiers;

    public readonly name: string;

    public readonly type: string;

    public readonly initialValue: string;

    public constructor(modifiers: PropertyModifiers, name: string, type: string, initialValue: string) {
        this.modifiers = modifiers;
        this.name = name;
        this.type = type;
        this.initialValue = initialValue;
    }

    public toString(): string {
        return `${this.modifiers} ${this.name}: ${this.type} = ${this.initialValue};`;
    }
}
