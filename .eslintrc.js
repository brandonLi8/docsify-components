// Copyright © 2019-2021 Brandon Li. All rights reserved.

/**
 * ESlint configuration file. See https://eslint.org/docs/user-guide/configuring for documentation of implementing
 * the .eslintrc file.
 *
 * Values for the rules:
 *   0 - no error
 *   1 - warn
 *   2 - error
 *
 * See https://eslint.org/docs/rules for documentation on rules.
 *
 * @author Brandon Li <brandon.li@berkeley.edu>
 */

module.exports = {
  extends: 'eslint:recommended',

  // Overriding rules.
  rules: {

    /* ———————————————————————————————— Whitespace ———————————————————————————————————————— */

    'computed-property-spacing': [ 2, 'never' ],
    'no-multi-spaces': [ 2, { ignoreEOLComments: true } ],
    'space-before-blocks': 2,
    'space-before-function-paren': [ 2, { asyncArrow: 'always', named: 'never', anonymous: 'never' } ],
    'spaced-comment': [ 2, 'always', { exceptions: [ '-', '*', '=' ] } ],
    'semi-spacing': 2,
    'brace-style': [ 2, 'stroustrup', { allowSingleLine: true } ],
    'no-trailing-spaces': 2,
    'eol-last': [ 2, 'never' ],
    'lines-around-comment': [ 2, {
      afterBlockComment: false,
      beforeLineComment: true,
      afterLineComment: false
    } ],
    'indent': 0,

    'array-bracket-spacing': [ 2, 'always' ],
    'block-spacing': [ 2, 'always' ],
    'comma-spacing': [ 2, { before: false, after: true } ],
    'key-spacing': 2,
    'keyword-spacing': [ 2, { overrides: { catch: { after: !!0 } } } ],
    'object-curly-spacing': [ 2, 'always' ],
    'space-in-parens': [ 2, 'never' ],
    'func-call-spacing': [ 2, 'never' ],
    'template-curly-spacing': [ 2, 'never' ],

    /* —————————————————————————————— Best Practices —————————————————————————————————————— */

    'no-unused-vars': [ 2, { args: 'none' } ],
    'comma-dangle': 2,
    'semi': [ 2, 'always' ],
    'prefer-const': [ 2, {
      destructuring: 'any',
      ignoreReadBeforeAssign: false
    } ],
    'eqeqeq': 2,
    'no-caller': 2,
    'no-new-func': 2,
    'dot-notation': 2,
    'no-var': 2,
    'no-template-curly-in-string': 2,
    'no-extend-native': 2,
    'no-return-assign': 2,
    'no-useless-call': 2,
    'no-undef-init': 2,
    'one-var': [ 2, 'never' ],
    'radix': 2,
    'default-case': 2,
    'object-shorthand': 2,
    'no-console': 2,

    /* ———————————————————————————————— Stylistic ————————————————————————————————————————— */

    'quotes': [ 2, 'single' ],
    'padded-blocks': 0
  },
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType : 'module'
  }
};