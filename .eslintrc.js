module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'class-methods-use-this': 'off',
    // 'import/no-extraneous-dependencies': ['error', { dependencies: true }],
    'consistent-return': 'off',
    // max-len': 150,
    'no-param-reassign': 'off',
    camelcase: 'off',
  },
};
