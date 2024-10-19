import unusedImports from "eslint-plugin-unused-imports";
import prettier from "eslint-plugin-prettier";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends("eslint:recommended", "next", "next/core-web-vitals", "prettier"),
  {
    plugins: {
      "unused-imports": unusedImports,
      prettier,
    },

    rules: {
      "react/no-unescaped-entities": "off",
      "@next/next/no-img-element": "off",
      "unused-imports/no-unused-imports": "error",

      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      "react-hooks/exhaustive-deps": "off",
      "prettier/prettier": ["error"],
    },
  },
];
