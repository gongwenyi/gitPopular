module.exports = {
  "extends": "airbnb",
  "plugins": [
      "react",
      "react-native"
  ],
  "parserOptions": {
      "ecmaVersion": 2016,
      "sourceType": "module",
      "ecmaFeatures": {
        "experimentalObjectRestSpread": true,
        "jsx": true
      }
  },
  "globals": {
      "__DEV__": true,
      "fetch": true,
      "storage": true,
      "require": true
  },
  "parser": "babel-eslint",
  "rules": {
      "max-len": ["error", 120],
      "no-console": 0,
      "import/prefer-default-export": 0,
      "no-underscore-dangle": 0,
      "class-methods-use-this": 0,
      "react/forbid-prop-types": [0, { "forbid": ["any", "array", "object"] }],
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      "react/prop-types": 1,
  }
};