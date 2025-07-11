import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-config-prettier/flat";

export default [
  js.configs.recommended,
  {
    // Tarayıcı ortamını ve ECMAScript sürümünü tanımlayın
    env: {
      browser: true,
      es2021: true,
    },

    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        fetch: "readonly",
        document: "readonly",
        window: "readonly",
        alert: "readonly", // alert global fonksiyonu
        __dirname: "readonly",
        console: "readonly",
        process: "readonly",
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      // React ile ilgili kural kapatmaları
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",

      // Kullanılmayan değişkenler warning olsun
      "no-unused-vars": "warn",

      // Tanımsız global uyarılarını kapat (alert gibi)
      "no-undef": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  prettier,
];
