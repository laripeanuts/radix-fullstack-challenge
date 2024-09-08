import eslint from '@repo/eslint-config/react.js';

/** @type {import("eslint").Linter.Config} */
export default {
  ...eslint.configs,
  languageOptions: {
    parserOptions: {
      project: true,
    },
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    ...eslint.configs.rules,
    'no-console': 'warn',
  },
};
