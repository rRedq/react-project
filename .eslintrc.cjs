module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'next/core-web-vitals',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'react-compiler'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off',
    '@typescript-eslint/ban-ts-comment': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-var-requires': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': 'error',
    'no-undef': 'error',
    'react-compiler/react-compiler': 'error',
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
};
