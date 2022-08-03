export const capitalize = (string: string): string => `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

export const uncapitalize = (string: string): string => `${string.charAt(0).toLocaleLowerCase()}${string.slice(1)}`;

export const isTextSegmentEquals = (text: string, shift: number, textToCompare: string): boolean => {
    // eslint-disable-next-line unicorn/no-for-loop
    for (let index = 0; index < textToCompare.length; ++index) {
        const lhs: string | undefined = text[shift + index];
        const rhs: string | undefined = textToCompare[index];

        if (lhs !== rhs) {
            return false;
        }
    }

    return true;
};
