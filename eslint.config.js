import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,

  {
    extends: ["eslint:recommended", "plugin:react/recommended", "airbnb"],
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
    },
    env: {
      browser: true,
      es2021: true,
    },
    rules: {
      "react/prop-types": "warn",
      "react/react-in-jsx-scope": "off",
      "no-console": "warn",
      "import/prefer-default-export": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
