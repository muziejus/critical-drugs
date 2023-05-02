"use strict";

module.exports = {
  useTabs: false,
  semi: true,
  trailingComma: "es5",
  bracketSpacing: true,
  arrowParens: "avoid",
  overrides: [
    {
      files: "*.{js,ts}",
      options: {
        singleQuote: false,
      },
    },
  ],
};
