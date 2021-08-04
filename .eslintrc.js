const common = {
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended', // Prettier recommended rules
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': ['off'],
    '@typescript-eslint/explicit-module-boundary-types': ['off'],
    'prettier/prettier': ['error', {}, { usePrettierrc: true }], // Includes .prettierrc.js rules
  },
};

module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  parserOptions: { ecmaVersion: 8 }, // to enable features such as async/await
  ignorePatterns: [
    'node_modules/*',
    'build/*',
    '.eslintrc.js',
    '.prettierrc.js',
    '*.json',
  ], // We don't want to lint generated files nor node_modules, but we want to lint .prettierrc.js (ignored by default by eslint)
  rules: {
    ...common.rules,
  },
  extends: [...common.extends],
  overrides: [
    // This configuration will apply only to TypeScript files
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      settings: { react: { version: 'detect' } },
      env: {
        browser: true,
        node: true,
        es6: true,
      },
      extends: [
        ...common.extends,
        'plugin:@typescript-eslint/recommended', // TypeScript rules
      ],
      rules: {
        ...common.rules,
        // We will use TypeScript's types for component props instead
        'react/prop-types': 'off',

        '@typescript-eslint/no-unused-vars': ['warn'],
        '@typescript-eslint/no-explicit-any': 'off',

        // I suggest this setting for requiring return types on functions only where useful
      },
    },
  ],
};
