module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/essential',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'no-eval': 'off',
    'no-compare-neg-zero': 'off',
    'no-empty': 'off',
    'no-undef': 'off',
    '@typescript-eslint/no-unused-vars': 0
  }
};
