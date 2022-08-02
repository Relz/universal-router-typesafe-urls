export const capitalize = (string: string): string => `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

export const uncapitalize = (string: string): string => `${string.charAt(0).toLocaleLowerCase()}${string.slice(1)}`;
