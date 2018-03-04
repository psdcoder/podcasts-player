const restrictedGlobals = require('./utils/confusing-browser-globals');

module.exports = {
  extends: ['airbnb'],
  env: {
    browser: true,
    jest: true,
  },
  parser: 'babel-eslint',
  settings: {
    'import/resolver': {
      webpack: {
        config: './webpack.development.js',
      },
    },
  },
  rules: {
    'import/prefer-default-export': 'off',
    "import/no-extraneous-dependencies": ["error", {"devDependencies": ["webpack.*.js"]}],
    'max-len': [
      'warn',
      120,
      2,
      {
        ignoreComments: true,
        ignoreUrls: true,
      },
    ],
    'no-underscore-dangle': 'off',
    'no-return-assign': ['error', 'except-parens'],
    'no-restricted-globals': ['error'].concat(restrictedGlobals),
  },
};
