"use strict";

const { resolve } = require;

module.exports = {
  presets: ["@babel/preset-typescript"],
  plugins: [
    [
      resolve("@babel/plugin-transform-typescript"),
      {
        allowDeclareFields: true,
        onlyRemoveTypeImports: true,
        // Default enums are IIFEs
        optimizeConstEnums: true,
      },
    ],
    "@embroider/addon-dev/template-colocation-plugin",
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true,
      },
    ],
    "@babel/plugin-proposal-class-properties",
  ],
};
