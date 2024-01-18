import { d as defineEventHandler } from './nitro/node-server.mjs';
import products from './data.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'nitropack/runtime/plugin';
import 'vue';
import 'nitropack/dist/runtime/plugin';
import 'node:fs';
import 'node:url';
import 'shikiji';
import 'shikiji-transformers';
import 'unified';
import 'mdast-util-to-string';
import 'micromark';
import 'unist-util-stringify-position';
import 'micromark-util-character';
import 'micromark-util-chunked';
import 'micromark-util-resolve-all';
import 'micromark-util-sanitize-uri';
import 'slugify';
import 'remark-parse';
import 'remark-rehype';
import 'remark-mdc';
import 'hast-util-to-string';
import 'github-slugger';
import 'detab';
import 'remark-emoji';
import 'remark-gfm';
import 'rehype-external-links';
import 'rehype-sort-attribute-values';
import 'rehype-sort-attributes';
import 'rehype-raw';
import 'ipx';

const index = defineEventHandler(async () => {
  const categories = [...new Set(products.map((product) => product.category))];
  const badges = [
    ...new Set(
      products.filter((product) => product.badge).map((product) => product.badge)
    )
  ];
  return {
    products,
    categories,
    badges
  };
});

export { index as default };
