module.exports = {
    env: {
        node: true,
        jasmine: true,
    },
    extends: [
        'eslint:all',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/all',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:promise/recommended',
        'plugin:node/recommended',
        'plugin:regexp/recommended',
        'plugin:sonarjs/recommended',
        'plugin:unicorn/recommended',
        'plugin:eslint-comments/recommended',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.eslint.json',
        sourceType: 'module',
        ecmaFeatures: {
            modules: true,
        },
    },
    settings: {
        node: {
            tryExtensions: ['.ts'],
        },
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts'],
        },
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
                project: './',
            },
        },
    },
    rules: {
        'newline-before-return': 'error',
        camelcase: 'off', // More customizable "@typescript-eslint/naming-convention" rule is used
        'one-var': 'off',
        'multiline-comment-style': 'off',
        'no-ternary': 'off',
        'no-nested-ternary': 'off',
        'no-undefined': 'off',
        'no-plusplus': 'off',
        'no-warning-comments': 'off',
        'no-underscore-dangle': 'off',
        'node/no-unsupported-features/es-syntax': ['error', { ignores: ['modules'] }],
        'sort-imports': ['error', { allowSeparatedGroups: true }],
        'max-params': ['error', { max: 5 }],
        'no-void': ['error'],
        'no-restricted-syntax': ['error'],
        // @typescript-eslint
        '@typescript-eslint/prefer-readonly-parameter-types': 'off',
        '@typescript-eslint/no-type-alias': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/no-magic-numbers': [
            'error',
            {
                ignore: [0, 1, -1],
                enforceConst: true,
                ignoreNumericLiteralTypes: true,
                ignoreEnums: true,
            },
        ],
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'default',
                format: ['camelCase'],
                leadingUnderscore: 'forbid',
                trailingUnderscore: 'forbid',
            },
            {
                selector: 'variable',
                format: ['camelCase', 'PascalCase'],
            },
            {
                selector: 'typeLike',
                format: ['PascalCase'],
            },
            {
                selector: 'function',
                format: ['camelCase'],
            },
            {
                selector: 'interface',
                format: ['PascalCase'],
                prefix: ['I'],
            },
            {
                selector: 'parameter',
                format: ['camelCase'],
                leadingUnderscore: 'allow',
            },
        ],
        '@typescript-eslint/init-declarations': 'off',
        '@typescript-eslint/no-misused-promises': [
            'error',
            {
                checksVoidReturn: false,
            },
        ],
        '@typescript-eslint/no-confusing-void-expression': ['error', { ignoreArrowShorthand: true }],
        '@typescript-eslint/member-ordering': 'error',
        '@typescript-eslint/ban-types': [
            'error',
            {
                extendDefaults: true,
            },
        ],
        // unicorn
        'unicorn/no-nested-ternary': 'off',
        'unicorn/no-useless-undefined': 'off',
        'unicorn/no-array-for-each': 'off',
        'unicorn/no-array-reduce': 'off',
        'unicorn/prevent-abbreviations': ['error', { allowList: { arg: true, args: true } }],
        'unicorn/filename-case': [
            'error',
            {
                cases: {
                    pascalCase: true,
                    camelCase: true,
                },
                ignore: ['^index\\.ts$', '\\.d\\.ts$', '\\.test\\.ts$'],
            },
        ],
        // import
        'import/no-useless-path-segments': 'error',
        'import/no-default-export': 'error',
        // eslint-comments
        'eslint-comments/disable-enable-pair': 'off',
    },
    overrides: [
        {
            files: 'test/**/*',
            rules: {
                'max-lines-per-function': 'off',
                '@typescript-eslint/no-magic-numbers': 'off',
            },
        },
    ],
};
