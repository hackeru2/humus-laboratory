import { d as defineEventHandler, c as createError } from './nitro/node-server.mjs';
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

let products;
let categories = [];
const apiBaseUrl = "https://fakestoreapi.com";
const badges = [
  "Low Stock",
  "Selling Fast!",
  "New!",
  "Presale",
  "Clearance",
  "Get 10% OFF^"
];
const idsOfFractionOfTheProductsArray = (products2, fraction) => {
  return products2.map((product) => ({
    id: product.id,
    sort: Math.random()
  })).sort((a, b) => a.sort - b.sort).map(({ id }) => id).slice(0, Math.floor(products2.length * fraction));
};
const getRandomItem = (items) => {
  return items[Math.floor(Math.random() * items.length)];
};
const index = defineEventHandler(async () => {
  if (products) {
    return { products, categories, badges };
  }
  const rawProducts = await $fetch(`${apiBaseUrl}/products`);
  if (!rawProducts) {
    throw createError({
      statusCode: 404,
      message: "Products not fetched."
    });
  }
  const productIdsForBadges = idsOfFractionOfTheProductsArray(rawProducts, 0.25);
  const productIdsForFreeShipping = idsOfFractionOfTheProductsArray(
    rawProducts,
    0.25
  );
  products = rawProducts.map((product) => ({
    ...product,
    price: (+product.price).toFixed(2),
    badge: productIdsForBadges.includes(product.id) ? getRandomItem(badges) : "",
    shipping: productIdsForFreeShipping.includes(product.id) ? "Free Shipping" : ""
  }));
  categories = await $fetch(`${apiBaseUrl}/products/categories`);
  return {
    products,
    categories,
    badges
  };
});

export { index as default, products };
