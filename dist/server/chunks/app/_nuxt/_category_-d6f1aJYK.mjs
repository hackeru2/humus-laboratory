import { _ as __nuxt_component_0 } from './nuxt-link-k6M4BS-g.mjs';
import { createVNode, useSSRContext, defineComponent, withAsyncContext, computed, mergeProps, withCtx, unref, openBlock, createBlock, Fragment, renderList, createCommentVNode, createTextVNode, toDisplayString } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { V as VCard, a as VCardText } from './VCard-Ufe3nPRD.mjs';
import { p as propsFactory, m as makeComponentProps, a as makeTagProps, g as genericComponent, u as useRtl, b as useRender, f as useRoute$1, h as useHead, i as useServerHead, j as useState, k as VBtn, V as VImg, d as VChip, c as createError, e as useOptimizeImage } from '../server.mjs';
import { u as useFetch } from './fetch-QY6ishtS.mjs';
import '../../nitro/node-server.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'nitropack/runtime/plugin';
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
import '../../index3.mjs';
import '@unhead/shared';
import 'vue-router';
import 'consola/core';
import './asyncData-dZ4Ck6yU.mjs';

const makeVContainerProps = propsFactory({
  fluid: {
    type: Boolean,
    default: false
  },
  ...makeComponentProps(),
  ...makeTagProps()
}, "VContainer");
const VContainer = genericComponent()({
  name: "VContainer",
  props: makeVContainerProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      rtlClasses
    } = useRtl();
    useRender(() => createVNode(props.tag, {
      "class": ["v-container", {
        "v-container--fluid": props.fluid
      }, rtlClasses.value, props.class],
      "style": props.style
    }, slots));
    return {};
  }
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ProductCard",
  __ssrInlineRender: true,
  props: {
    id: {},
    title: {},
    price: {},
    description: {},
    category: {},
    image: {},
    imageOptimized: {},
    rating: {},
    badge: {},
    shipping: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
        class: "m-4 relative w-full md:w-1/3 lg:w-1/4 xl:w-1/5",
        to: `/store/${_ctx.id}`
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (_ctx.badge) {
              _push2(`<span class="absolute bg-primary font-serif p-1 right-0 rounded-bl-md rounded-br-none rounded-tl-none rounded-tr-sm text-white text-xs z-10"${_scopeId}>${ssrInterpolate(_ctx.badge)}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(VCard, {
              border: "",
              variant: "outlined",
              class: "md:h-full"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="h-64 relative"${_scopeId2}><div class="-m-4 bg-white p-8 rounded-lg"${_scopeId2}><div${_scopeId2}>`);
                  if (_ctx.imageOptimized) {
                    _push3(ssrRenderComponent(VImg, {
                      src: _ctx.imageOptimized.src,
                      srcset: _ctx.imageOptimized.srcset,
                      sizes: _ctx.imageOptimized.sizes,
                      height: "250"
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(ssrRenderComponent(VImg, {
                      src: _ctx.image,
                      height: "250"
                    }, null, _parent3, _scopeId2));
                  }
                  _push3(`</div></div></div>`);
                  _push3(ssrRenderComponent(VCardText, { class: "mt-14" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div${_scopeId3}><span class="text-base"${_scopeId3}>${ssrInterpolate(_ctx.title)}</span><div class="flex font-medium items-center justify-between mt-4"${_scopeId3}><span class="font-bold text-base"${_scopeId3}>$${ssrInterpolate(_ctx.price)}</span>`);
                        if (_ctx.shipping) {
                          _push4(ssrRenderComponent(VChip, {
                            class: "dark:text-primary-400 text-primary-500 text-xs",
                            size: "small",
                            color: "primary"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(_ctx.shipping)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(_ctx.shipping), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div></div>`);
                      } else {
                        return [
                          createVNode("div", null, [
                            createVNode("span", { class: "text-base" }, toDisplayString(_ctx.title), 1),
                            createVNode("div", { class: "flex font-medium items-center justify-between mt-4" }, [
                              createVNode("span", { class: "font-bold text-base" }, "$" + toDisplayString(_ctx.price), 1),
                              _ctx.shipping ? (openBlock(), createBlock(VChip, {
                                key: 0,
                                class: "dark:text-primary-400 text-primary-500 text-xs",
                                size: "small",
                                color: "primary"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(_ctx.shipping), 1)
                                ]),
                                _: 1
                              })) : createCommentVNode("", true)
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "h-64 relative" }, [
                      createVNode("div", { class: "-m-4 bg-white p-8 rounded-lg" }, [
                        createVNode("div", null, [
                          _ctx.imageOptimized ? (openBlock(), createBlock(VImg, {
                            key: 0,
                            src: _ctx.imageOptimized.src,
                            srcset: _ctx.imageOptimized.srcset,
                            sizes: _ctx.imageOptimized.sizes,
                            height: "250"
                          }, null, 8, ["src", "srcset", "sizes"])) : (openBlock(), createBlock(VImg, {
                            key: 1,
                            src: _ctx.image,
                            height: "250"
                          }, null, 8, ["src"]))
                        ])
                      ])
                    ]),
                    createVNode(VCardText, { class: "mt-14" }, {
                      default: withCtx(() => [
                        createVNode("div", null, [
                          createVNode("span", { class: "text-base" }, toDisplayString(_ctx.title), 1),
                          createVNode("div", { class: "flex font-medium items-center justify-between mt-4" }, [
                            createVNode("span", { class: "font-bold text-base" }, "$" + toDisplayString(_ctx.price), 1),
                            _ctx.shipping ? (openBlock(), createBlock(VChip, {
                              key: 0,
                              class: "dark:text-primary-400 text-primary-500 text-xs",
                              size: "small",
                              color: "primary"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(_ctx.shipping), 1)
                              ]),
                              _: 1
                            })) : createCommentVNode("", true)
                          ])
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              _ctx.badge ? (openBlock(), createBlock("span", {
                key: 0,
                class: "absolute bg-primary font-serif p-1 right-0 rounded-bl-md rounded-br-none rounded-tl-none rounded-tr-sm text-white text-xs z-10"
              }, toDisplayString(_ctx.badge), 1)) : createCommentVNode("", true),
              createVNode(VCard, {
                border: "",
                variant: "outlined",
                class: "md:h-full"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "h-64 relative" }, [
                    createVNode("div", { class: "-m-4 bg-white p-8 rounded-lg" }, [
                      createVNode("div", null, [
                        _ctx.imageOptimized ? (openBlock(), createBlock(VImg, {
                          key: 0,
                          src: _ctx.imageOptimized.src,
                          srcset: _ctx.imageOptimized.srcset,
                          sizes: _ctx.imageOptimized.sizes,
                          height: "250"
                        }, null, 8, ["src", "srcset", "sizes"])) : (openBlock(), createBlock(VImg, {
                          key: 1,
                          src: _ctx.image,
                          height: "250"
                        }, null, 8, ["src"]))
                      ])
                    ])
                  ]),
                  createVNode(VCardText, { class: "mt-14" }, {
                    default: withCtx(() => [
                      createVNode("div", null, [
                        createVNode("span", { class: "text-base" }, toDisplayString(_ctx.title), 1),
                        createVNode("div", { class: "flex font-medium items-center justify-between mt-4" }, [
                          createVNode("span", { class: "font-bold text-base" }, "$" + toDisplayString(_ctx.price), 1),
                          _ctx.shipping ? (openBlock(), createBlock(VChip, {
                            key: 0,
                            class: "dark:text-primary-400 text-primary-500 text-xs",
                            size: "small",
                            color: "primary"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(_ctx.shipping), 1)
                            ]),
                            _: 1
                          })) : createCommentVNode("", true)
                        ])
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProductCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const useProducts = async () => {
  const { data, error } = await useFetch("/api/store/local-data", "$dm080I1Lt4");
  if (error.value) {
    throw createError({
      ...error.value,
      statusMessage: `Couldn't fetch products.`
    });
  }
  const fetchCategory = (category) => {
    const { optimizeImage } = useOptimizeImage();
    return data.value.products.filter((product) => !category || product.category === category).map(
      (product) => product.image ? {
        ...product,
        imageOptimized: optimizeImage(product.image)
      } : product
    );
  };
  return { ...data, fetchCategory };
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[category]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute$1();
    const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1) || "";
    useHead({
      title: () => capitalize(route.params.category)
    });
    useServerHead({
      meta: [
        { name: "description", content: () => capitalize(route.params.category) }
      ]
    });
    const { category } = route.params;
    const { fetchCategory } = ([__temp, __restore] = withAsyncContext(() => useProducts()), __temp = await __temp, __restore(), __temp);
    const products = fetchCategory(category == null ? void 0 : category.toString());
    const badges = [
      ...new Set(
        products.filter((product) => product.badge).map((product) => product.badge)
      )
    ];
    const filteredBadges = useState((category == null ? void 0 : category.toString()) || "all", () => {
      return /* @__PURE__ */ new Set();
    });
    const toggleFilter = (badge) => {
      if (filteredBadges.value.has(badge)) {
        filteredBadges.value.delete(badge);
      } else {
        filteredBadges.value.add(badge);
      }
    };
    const filteredProducts = computed(() => {
      if (filteredBadges.value.size) {
        return products.filter(
          (product) => filteredBadges.value.has(product.badge)
        );
      } else {
        return products;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ProductCard = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "pb-16" }, _attrs))}>`);
      _push(ssrRenderComponent(VContainer, { class: "py-8" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (badges.length) {
              _push2(`<section class="flex items-center justify-center m-4"${_scopeId}><span class="font-bold text-sm"${_scopeId}>Filter Badges</span><div class="ml-4 mt-2"${_scopeId}><!--[-->`);
              ssrRenderList(badges, (badge, index) => {
                _push2(ssrRenderComponent(VBtn, {
                  key: index,
                  text: badge,
                  variant: unref(filteredBadges).has(badge) ? "tonal" : "outlined",
                  class: "mr-2",
                  onClick: ($event) => toggleFilter(badge)
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div></section>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<section data-pg-name="Products" class="flex flex-wrap justify-center"${_scopeId}><!--[-->`);
            ssrRenderList(unref(filteredProducts), (product) => {
              _push2(ssrRenderComponent(_component_ProductCard, mergeProps({
                key: product.id
              }, product), null, _parent2, _scopeId));
            });
            _push2(`<!--]--></section>`);
          } else {
            return [
              badges.length ? (openBlock(), createBlock("section", {
                key: 0,
                class: "flex items-center justify-center m-4"
              }, [
                createVNode("span", { class: "font-bold text-sm" }, "Filter Badges"),
                createVNode("div", { class: "ml-4 mt-2" }, [
                  (openBlock(), createBlock(Fragment, null, renderList(badges, (badge, index) => {
                    return createVNode(VBtn, {
                      key: index,
                      text: badge,
                      variant: unref(filteredBadges).has(badge) ? "tonal" : "outlined",
                      class: "mr-2",
                      onClick: ($event) => toggleFilter(badge)
                    }, null, 8, ["text", "variant", "onClick"]);
                  }), 64))
                ])
              ])) : createCommentVNode("", true),
              createVNode("section", {
                "data-pg-name": "Products",
                class: "flex flex-wrap justify-center"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(filteredProducts), (product) => {
                  return openBlock(), createBlock(_component_ProductCard, mergeProps({
                    key: product.id
                  }, product), null, 16);
                }), 128))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[category].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
