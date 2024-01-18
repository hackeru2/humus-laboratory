import { d as defineEventHandler, c as createError } from './nitro/node-server.mjs';
import { products } from './index.mjs';
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

const apiBaseUrl = "https://fakestoreapi.com";
const _id_ = defineEventHandler(async (event) => {
  var _a;
  const { id } = event.context.params;
  let product;
  if ((_a = products) == null ? void 0 : _a.length) {
    product = products.find((product2) => +product2.id === +id);
  }
  if (!product) {
    product = await $fetch(`${apiBaseUrl}/products/${id}`);
    if (product) {
      product = {
        ...product,
        badge: "",
        shipping: ""
      };
    } else {
      throw createError({
        statusCode: 404,
        message: "Product not fetched."
      });
    }
  }
  return product;
});

export { _id_ as default };
