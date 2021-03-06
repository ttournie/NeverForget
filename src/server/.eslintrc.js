module.exports = {
  env: {
    node: true,
    es6: true,
    mocha: true,
  },
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "no-underscore-dangle": ["error", { "allow": ["_id"] }],
  },
};
