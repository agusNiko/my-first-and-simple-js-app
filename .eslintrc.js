module.exports = {
  // eslint-disable-next-line quotes
  "env": {
    // eslint-disable-next-line quotes
    "browser": true,
    'es2021': true,
    'node': true,
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 12,
    'sourceType': 'module'
  },
  'rules': {
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
  }
};
