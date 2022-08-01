import type { FieldAccessModifier } from './FieldAccessModifier';
import type { FieldInstanceRestrictionModifier } from './FieldInstanceRestrictionModifier';

export class MethodModifiers {
    public readonly fieldAccessModifier: FieldAccessModifier;

    public readonly fieldInstanceRestrictionModifier: FieldInstanceRestrictionModifier | undefined;

    public constructor(
        fieldAccessModifier: FieldAccessModifier,
        fieldInstanceRestrictionModifier?: FieldInstanceRestrictionModifier,
    ) {
        this.fieldAccessModifier = fieldAccessModifier;
        this.fieldInstanceRestrictionModifier = fieldInstanceRestrictionModifier;
    }

    public toString(): string {
        return [this.fieldAccessModifier, this.fieldInstanceRestrictionModifier]
            .filter((element: string | undefined) => element !== undefined)
            .join(' ');
    }
}
