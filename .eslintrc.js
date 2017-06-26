module.exports = {
  "env": {
    "browser": true,
    "es6": true,
  },
  "extends": "airbnb",
  "installedESLint": true,
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true,
    },
    "sourceType": "module",
  },
  "rules": {
    "arrow-body-style": [
      "off",
    ],
    "class-methods-use-this": "warn",
    "indent": [
      "error",
      2,
      {
        "SwitchCase": 1,
      }
    ],
    "linebreak-style": [
      "error",
      "unix",
    ],
    "quotes": [
      "error", "double"
    ],
    "jsx-quotes": [
      "error", "prefer-double"
    ],
    "semi": [
      "error",
      "always",
    ],
    "no-unused-vars": [
      "warn",
      {
        "argsIgnorePattern": "^_",
      }
    ],
    "no-underscore-dangle": [
      "off"
    ],
    "new-cap": [
      "error",
      {
        "capIsNew": false,
      }
    ],
    "max-len": [
      "error",
      {
        code: 120,
      }
    ],
    "jsx-no-target-blank": "off",
    "generator-star-spacing": [
      "off",
    ],
    "no-param-reassign": [
      "error",
      {
        "props": false,
      },
    ],
    "no-alert": "off",
    "no-shadow": "off",
    "no-use-before-define": [
      "error",
      {
        "functions": false,
      },
    ],
    "quote-props": [
      "error",
      "consistent"
    ],
    "import/no-extraneous-dependencies": [
      "off",
    ],
    "import/no-unresolved": [
      "off",
    ],
    "import/prefer-default-export": "off",
  },
};
