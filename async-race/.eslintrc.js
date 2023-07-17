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
  rules: {},
  root: true,
  ignorePatterns: ["webpack.config.js", ".eslintrc.js"]
};
