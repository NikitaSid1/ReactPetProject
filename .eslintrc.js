const RULE_OFF = 0;
const RULE_WARN = 1;
const RULE_ERROR = 2;

module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },

  rules: {
    'linebreak-style': RULE_OFF,
    'object-curly-newline': RULE_OFF,
    'no-param-reassign': RULE_OFF,
    'no-underscore-dangle': RULE_OFF,
    'consistent-return': RULE_OFF,
    'import/prefer-default-export': RULE_OFF,
    'react/function-component-definition': RULE_OFF,
    'react/prop-types': RULE_OFF,
    'react/react-in-jsx-scope': RULE_OFF,
    'react/jsx-props-no-spreading': RULE_OFF,
    'jsx-a11y/label-has-associated-control': RULE_OFF,
    'operator-linebreak': RULE_OFF,
    'react/jsx-indent': RULE_OFF,
    'react/require-default-props': RULE_OFF,
    'no-console': [RULE_WARN, { allow: ['error'] }],
    'newline-before-return': RULE_ERROR,
    'max-len': [
      RULE_ERROR,
      {
        code: 100,
        tabWidth: 2,
        ignoreStrings: true,
      },
    ],
    'require-await': RULE_ERROR,
  },

  extends: ['plugin:react/recommended', 'airbnb'],

  overrides: [],

  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  plugins: ['react'],
};
