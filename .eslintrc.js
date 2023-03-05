module.exports = {
    'env': {
        'es2021': true,
        'node': true,
    },
    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    'overrides': [
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module',
    },
    'plugins': [
        '@typescript-eslint',
    ],
    'rules': {
        'indent': [
            'error',
        ],
        'linebreak-style': [
            'error',
            'unix',
        ],
        'quotes': [
            'error',
            'single',
        ],
        'semi': [
            'error',
            'always',
        ],
        'max-len': [
            'error',
            {
                'code': 120,
            },
        ],
        'eol-last': [
            'error',
            'always',
        ],
        'comma-dangle': [
            'error',
            {
                arrays: 'always-multiline',
                objects: 'always-multiline',
                imports: 'always-multiline',
                exports: 'always-multiline',
                functions: 'always-multiline',
            },
        ],
        'arrow-parens': [
            'error',
            'always',
        ],
        'space-in-parens': [
            'error',
            'never',
        ],
        'object-curly-spacing': [
            'error',
            'always',
        ],
        'keyword-spacing': [
            'error',
            {
                'before': true,
            },
        ],
        'arrow-spacing': [
            'error',
            {
                before: true,
                after: true,
            },
        ],
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-empty-interface': 'error',
        '@typescript-eslint/member-delimiter-style': 'error',
        '@typescript-eslint/no-explicit-any': 'off',
    },
};
