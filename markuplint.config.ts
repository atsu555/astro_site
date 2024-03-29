import type { Config } from "@markuplint/ml-config";

const config: Config = {
  extends: ["markuplint:recommended"],
  parser: {
    ".astro$": "@markuplint/astro-parser",
  },
  rules: {
    "invalid-attr": {
      options: {
        allowAttrs: [
          "{...props}",
          // MEMO：.astroファイル上でやむを得ず必要な属性があれば追加する
        ],
      },
    },
    "no-refer-to-non-existent-id": false,
    "character-reference": false,
  },
  nodeRules: [
    {
      selector: "link",
      rules: {
        "no-use-event-handler-attr": false,
      },
    },
    {
      selector: "img",
      rules: {
        "required-attr": ["alt", "width", "height", "decoding"],
      },
    },
    {
      selector: "button",
      rules: {
        "required-attr": ["type"],
      },
    },
    {
      selector: "option",
      rules: {
        "require-accessible-name": false,
      },
    },
  ],
};

export default config;
