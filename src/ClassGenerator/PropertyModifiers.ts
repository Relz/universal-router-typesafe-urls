import type { FieldAccessModifier } from './FieldAccessModifier';
import type { FieldInstanceRestrictionModifier } from './FieldInstanceRestrictionModifier';
import type { PropertyModificationProhibitingModifier } from './PropertyModificationProhibitingModifier';

export class PropertyModifiers {
    public readonly fieldAccessModifier: FieldAccessModifier;

    public readonly fieldInstanceRestrictionModifier: FieldInstanceRestrictionModifier | undefined;

    public readonly propertyModificationProhibitingModifier: PropertyModificationProhibitingModifier | undefined;

    public constructor(
        fieldAccessModifier: FieldAccessModifier,
        fieldInstanceRestrictionModifier?: FieldInstanceRestrictionModifier,
        propertyModificationProhibitingModifier?: PropertyModificationProhibitingModifier,
    ) {
        this.fieldAccessModifier = fieldAccessModifier;
        this.fieldInstanceRestrictionModifier = fieldInstanceRestrictionModifier;
        this.propertyModificationProhibitingModifier = propertyModificationProhibitingModifier;
    }

    public toString(): string {
        return [
            this.fieldAccessModifier,
            this.fieldInstanceRestrictionModifier,
            this.propertyModificationProhibitingModifier,
        ]
            .filter((element: string | undefined) => element !== undefined)
            .join(' ');
    }
}
