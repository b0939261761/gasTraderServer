module.exports = {
  root: true,
  env: {
    node: true
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    parser: 'babel-eslint'
  },
  extends: ['airbnb-base', 'plugin:node/recommended'],
  rules: {
    'comma-dangle': ['error', 'never'],
    'arrow-parens': ['error', 'as-needed'],
    'no-empty': ['error', { allowEmptyCatch: true }],
    'import/extensions': ['error', 'ignorePackages']

    //   // Require Radix Parameter (radix)
    //   radix: ['error', 'as-needed'],

    //   // disallow the use of console (no-console)
    //   'no-console': ['error', { allow: ['info', 'warn', 'error'] }],

    //   // disallow the unary operators ++ and -- (no-plusplus)
    //   'no-plusplus': 'off',

    //   'no-unused-vars': ['error', { argsIgnorePattern: '^(req|res|next)$' }],

    //   'no-underscore-dangle': ['error', { allowAfterThis: true }],

  }
};
