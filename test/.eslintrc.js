const path = require('path');

module.exports = {
    parserOptions: {
        project: path.join(__dirname, 'tsconfig.json') // The path to your tsconfig.json
    },
    plugins: ['@euberdeveloper'],
    extends: [
        'plugin:@euberdeveloper/typescript',
        'plugin:@euberdeveloper/mocha',
        'plugin:@euberdeveloper/prettier'
    ],
    rules: {
        '@typescript-eslint/no-require-imports': 'off',
        '@typescript-eslint/no-invalid-this': 'off',
        '@typescript-eslint/no-unnecessary-condition': 'off'
    }
};