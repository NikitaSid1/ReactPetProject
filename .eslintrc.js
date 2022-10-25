module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  rules: {
    'linebreak-style': 0,
    'object-curly-newline': 0,
    'no-param-reassign': 0,
    'no-underscore-dangle': 0,
    'consistent-return': 0,
    'import/prefer-default-export': 0,
    'react/function-component-definition': 0,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    'react/jsx-props-no-spreading': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'operator-linebreak': 0,
    'no-console': 1,
    'react/jsx-indent': 0,
    'react/require-default-props': 0,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  plugins: ['react'],
};
