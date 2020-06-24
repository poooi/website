
// @ts-check

/** @type { import("@types/eslint").Linter.Config } */
module.exports = {
  env: {
    browser: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'import', 'prettier'],
  extends: [
    'airbnb',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  settings: {
    react: {
      version: require('react').version,
    },
  },
  rules: {
    'no-console': ['error', { allow: ['info', 'error'] }],
    'import/prefer-default-export': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/state-in-constructor': 'off',
    '@typescript-eslint/unbound-method': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/require-await': 'off',
    'react/jsx-props-no-spreading': 'off',
    "prettier/prettier": "error",
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
}
