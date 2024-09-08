const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    './base.js',
    'eslint-plugin-react-refresh',
    'eslint-plugin-react-hooks',
  ],
  plugins: ['only-warn'],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    browser: true,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  rules: {
    'no-console': 'warn',
  },
  ignorePatterns: ['.*.js', './node_modules/', './dist/'],
  overrides: [{ files: ['*.js?(x)', '*.ts?(x)'] }],
};
