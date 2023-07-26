module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ["airbnb-base", "airbnb-typescript/base"],
  overrides: [],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  parserOptions: {
    ecmaVersion: "latest",
    project: "./tsconfig.json",
  },
  rules: {
    "import/no-cycle": 0,
    "no-param-reassign": 0,
    "class-methods-use-this": 0,
  },
  root: true,
  ignorePatterns: ["webpack.config.js", ".eslintrc.js", "dist/main.js"],
};
