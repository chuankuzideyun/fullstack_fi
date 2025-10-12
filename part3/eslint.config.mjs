import globals from "globals"
import { defineConfig } from "eslint/config"
import stylisticPlugin from "@stylistic/js"

export default defineConfig([
  {
    ignores: ["dist/**"],
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: globals.node
    },
    plugins: {
      "@stylistic/js": stylisticPlugin
    },
    rules: {
      "@stylistic/js/indent": ["error", 2],
      "@stylistic/js/linebreak-style": ["error", "unix"],
      "@stylistic/js/quotes": ["error", "single"],
      "@stylistic/js/semi": ["error", "never"]
    }
  }
])
