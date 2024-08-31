import eslint from '@repo/eslint-config/react.js';

/** @type {import("eslint").Linter.Config} */
export default {
  ...eslint.configs,
  languageOptions: {
    parserOptions: {
      project: true,
    },
  },
};
