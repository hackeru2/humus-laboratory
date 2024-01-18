import { b as buildAssetsURL } from '../../handlers/renderer.mjs';
import { createVNode, toRef, shallowRef, computed, useSSRContext, withCtx, unref, createTextVNode, openBlock, createBlock, Fragment, renderList, ref, mergeProps, toDisplayString, createCommentVNode } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { V as VRow, a as VCol, _ as __nuxt_component_0 } from './MobileNav-m4-oxc0J.mjs';
import { l as defineStore, p as propsFactory, m as makeComponentProps, a as makeTagProps, g as genericComponent, b as useRender, q as makeBorderProps, r as makeElevationProps, s as makeRoundedProps, t as makeThemeProps, v as useBackgroundColor, w as useBorder, x as useElevation, y as useRounded, z as provideTheme, u as useRtl, A as provideDefaults, V as VImg, B as VDefaultsProvider, C as convertToUnit, D as VExpandTransition, F as useProxiedModel, I as IconValue, G as makeDisplayProps, H as makeGroupProps, J as useDisplay, K as useGroup, L as useResizeObserver, M as VFadeTransition, n as VIcon, P as makeGroupItemProps, Q as useGroupItem, N as focusableChildren, O as clamp, o as VSpacer, k as VBtn, E as VAvatar, d as VChip, R as VSheet, S as VScaleTransition } from '../server.mjs';
import { V as VCard, a as VCardText, b as VCardItem, c as VCardTitle, d as VCardSubtitle } from './VCard-Ufe3nPRD.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-yVxbj29m.mjs';
import { V as VDivider, a as VList, b as VListItem } from './scopeId-RSGnEtwA.mjs';
import { m as makeDelayProps, u as useDelay, V as VTextField, a as VOverlay } from './VTextField-0QwpCnyT.mjs';
import 'vue-bundle-renderer/runtime';
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
import 'devalue';
import '@unhead/ssr';
import '../../index3.mjs';
import '@unhead/shared';
import 'vue-router';
import 'consola/core';

const _imports_0 = "" + buildAssetsURL("20.zqvXVjQB.jpg");
const _imports_1 = "" + buildAssetsURL("30.khr8fOmD.jpg");
const useCartStore = defineStore("cart", () => {
  const loadCartFromLocalStorage = () => {
    return {};
  };
  const items = ref(loadCartFromLocalStorage());
  function addItem(item) {
    items.value = { ...items.value, [item.dish_id]: item };
  }
  function onClickAdd(dish) {
    const dish_id = dish._id;
    let cart_item = items.value[dish_id];
    if (!cart_item)
      return createCartItem(dish);
    items.value[dish_id].quantity++;
  }
  function createCartItem(dish) {
    return addItem({
      ...dish,
      _id: null,
      quantity: 1,
      dish_id: dish._id
    });
  }
  function removeItem(_id) {
    console.log(_id);
    items.value[_id].quantity--;
  }
  return { items, removeItem, addItem, onClickAdd };
});
const _sfc_main$6 = {
  __name: "Quantity",
  __ssrInlineRender: true,
  props: {
    dish: Object
  },
  setup(__props) {
    const { dish } = __props;
    const cart = useCartStore();
    const disabledMinus = computed(
      () => {
        var _a, _b;
        return !cart.items[(_a = dish._id) != null ? _a : dish.dish_id] || !cart.items[(_b = dish._id) != null ? _b : dish.dish_id].quantity;
      }
    );
    const disabledPlus = computed(
      () => {
        var _a, _b;
        return cart.items[(_a = dish._id) != null ? _a : dish.dish_id] && cart.items[(_b = dish._id) != null ? _b : dish.dish_id].quantity >= 99;
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.dish) {
        _push(ssrRenderComponent(VCardText, mergeProps({ class: "mt-n2" }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a, _b, _c, _d;
            if (_push2) {
              _push2(ssrRenderComponent(VBtn, {
                icon: "i-material-symbols-add-circle-outline",
                variant: "text",
                disabled: disabledPlus.value,
                onClick: ($event) => unref(cart).onClickAdd(__props.dish)
              }, null, _parent2, _scopeId));
              _push2(` ${ssrInterpolate(unref(cart).items[(_a = __props.dish._id) != null ? _a : __props.dish.dish_id] ? unref(cart).items[(_b = __props.dish._id) != null ? _b : __props.dish.dish_id].quantity : 0)} `);
              _push2(ssrRenderComponent(VBtn, {
                icon: "i-material-symbols-do-not-disturb-on-outline",
                disabled: disabledMinus.value,
                variant: "text",
                onClick: ($event) => unref(cart).removeItem(__props.dish._id)
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(VBtn, {
                  icon: "i-material-symbols-add-circle-outline",
                  variant: "text",
                  disabled: disabledPlus.value,
                  onClick: ($event) => unref(cart).onClickAdd(__props.dish)
                }, null, 8, ["disabled", "onClick"]),
                createTextVNode(" " + toDisplayString(unref(cart).items[(_c = __props.dish._id) != null ? _c : __props.dish.dish_id] ? unref(cart).items[(_d = __props.dish._id) != null ? _d : __props.dish.dish_id].quantity : 0) + " ", 1),
                createVNode(VBtn, {
                  icon: "i-material-symbols-do-not-disturb-on-outline",
                  disabled: disabledMinus.value,
                  variant: "text",
                  onClick: ($event) => unref(cart).removeItem(__props.dish._id)
                }, null, 8, ["disabled", "onClick"])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Quantity.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = {
  __name: "DishCard",
  __ssrInlineRender: true,
  props: {
    dish: Object
  },
  setup(__props) {
    useCartStore();
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.dish) {
        _push(ssrRenderComponent(VCard, mergeProps({
          color: "transparent",
          class: ["mx-sm-6", {
            "w-100": _ctx.$nuxt.$vuetify.display.sm
          }]
        }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(VImg, {
                height: "70",
                src: __props.dish.image,
                class: "imag"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(VCard, {
                class: "mt-n10",
                color: "#303030"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCardItem, { class: "text-center" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VCardTitle, { class: "mt-10" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(__props.dish.name)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(__props.dish.name), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(VCardSubtitle, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<span class="me-1" data-v-9cc152cc${_scopeId4}>Starting From</span>`);
                              } else {
                                return [
                                  createVNode("span", { class: "me-1" }, "Starting From")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_sfc_main$6, { dish: __props.dish }, null, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(VCardTitle, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`$${ssrInterpolate(__props.dish.price)}.00`);
                              } else {
                                return [
                                  createTextVNode("$" + toDisplayString(__props.dish.price) + ".00", 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VCardTitle, { class: "mt-10" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(__props.dish.name), 1)
                              ]),
                              _: 1
                            }),
                            createVNode(VCardSubtitle, null, {
                              default: withCtx(() => [
                                createVNode("span", { class: "me-1" }, "Starting From")
                              ]),
                              _: 1
                            }),
                            createVNode(_sfc_main$6, { dish: __props.dish }, null, 8, ["dish"]),
                            createVNode(VCardTitle, null, {
                              default: withCtx(() => [
                                createTextVNode("$" + toDisplayString(__props.dish.price) + ".00", 1)
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCardText, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VRow, {
                            align: "center",
                            class: "mx-0"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(VIcon, {
                                  color: "yellow",
                                  icon: "i-material-symbols-star",
                                  size: "small"
                                }, null, _parent5, _scopeId4));
                                _push5(`<div class="text-grey ms-4" data-v-9cc152cc${_scopeId4}><h6 data-v-9cc152cc${_scopeId4}>${ssrInterpolate(__props.dish.star)}</h6></div>`);
                                _push5(ssrRenderComponent(VSpacer, null, null, _parent5, _scopeId4));
                                _push5(`<div class="text-grey ms-4" data-v-9cc152cc${_scopeId4}> 1360 <h5 data-v-9cc152cc${_scopeId4}>Total Sale</h5></div>`);
                              } else {
                                return [
                                  createVNode(VIcon, {
                                    color: "yellow",
                                    icon: "i-material-symbols-star",
                                    size: "small"
                                  }),
                                  createVNode("div", { class: "text-grey ms-4" }, [
                                    createVNode("h6", null, toDisplayString(__props.dish.star), 1)
                                  ]),
                                  createVNode(VSpacer),
                                  createVNode("div", { class: "text-grey ms-4" }, [
                                    createTextVNode(" 1360 "),
                                    createVNode("h5", null, "Total Sale")
                                  ])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VRow, {
                              align: "center",
                              class: "mx-0"
                            }, {
                              default: withCtx(() => [
                                createVNode(VIcon, {
                                  color: "yellow",
                                  icon: "i-material-symbols-star",
                                  size: "small"
                                }),
                                createVNode("div", { class: "text-grey ms-4" }, [
                                  createVNode("h6", null, toDisplayString(__props.dish.star), 1)
                                ]),
                                createVNode(VSpacer),
                                createVNode("div", { class: "text-grey ms-4" }, [
                                  createTextVNode(" 1360 "),
                                  createVNode("h5", null, "Total Sale")
                                ])
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VCardItem, { class: "text-center" }, {
                        default: withCtx(() => [
                          createVNode(VCardTitle, { class: "mt-10" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(__props.dish.name), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(VCardSubtitle, null, {
                            default: withCtx(() => [
                              createVNode("span", { class: "me-1" }, "Starting From")
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$6, { dish: __props.dish }, null, 8, ["dish"]),
                          createVNode(VCardTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("$" + toDisplayString(__props.dish.price) + ".00", 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VCardText, null, {
                        default: withCtx(() => [
                          createVNode(VRow, {
                            align: "center",
                            class: "mx-0"
                          }, {
                            default: withCtx(() => [
                              createVNode(VIcon, {
                                color: "yellow",
                                icon: "i-material-symbols-star",
                                size: "small"
                              }),
                              createVNode("div", { class: "text-grey ms-4" }, [
                                createVNode("h6", null, toDisplayString(__props.dish.star), 1)
                              ]),
                              createVNode(VSpacer),
                              createVNode("div", { class: "text-grey ms-4" }, [
                                createTextVNode(" 1360 "),
                                createVNode("h5", null, "Total Sale")
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
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(VImg, {
                  height: "70",
                  src: __props.dish.image,
                  class: "imag"
                }, null, 8, ["src"]),
                createVNode(VCard, {
                  class: "mt-n10",
                  color: "#303030"
                }, {
                  default: withCtx(() => [
                    createVNode(VCardItem, { class: "text-center" }, {
                      default: withCtx(() => [
                        createVNode(VCardTitle, { class: "mt-10" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(__props.dish.name), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(VCardSubtitle, null, {
                          default: withCtx(() => [
                            createVNode("span", { class: "me-1" }, "Starting From")
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$6, { dish: __props.dish }, null, 8, ["dish"]),
                        createVNode(VCardTitle, null, {
                          default: withCtx(() => [
                            createTextVNode("$" + toDisplayString(__props.dish.price) + ".00", 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VCardText, null, {
                      default: withCtx(() => [
                        createVNode(VRow, {
                          align: "center",
                          class: "mx-0"
                        }, {
                          default: withCtx(() => [
                            createVNode(VIcon, {
                              color: "yellow",
                              icon: "i-material-symbols-star",
                              size: "small"
                            }),
                            createVNode("div", { class: "text-grey ms-4" }, [
                              createVNode("h6", null, toDisplayString(__props.dish.star), 1)
                            ]),
                            createVNode(VSpacer),
                            createVNode("div", { class: "text-grey ms-4" }, [
                              createTextVNode(" 1360 "),
                              createVNode("h5", null, "Total Sale")
                            ])
                          ]),
                          _: 1
                        })
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
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DishCard.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const DishCard = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-9cc152cc"]]);
const makeVToolbarTitleProps = propsFactory({
  text: String,
  ...makeComponentProps(),
  ...makeTagProps()
}, "VToolbarTitle");
const VToolbarTitle = genericComponent()({
  name: "VToolbarTitle",
  props: makeVToolbarTitleProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => {
      const hasText = !!(slots.default || slots.text || props.text);
      return createVNode(props.tag, {
        "class": ["v-toolbar-title", props.class],
        "style": props.style
      }, {
        default: () => {
          var _a;
          return [hasText && createVNode("div", {
            "class": "v-toolbar-title__placeholder"
          }, [slots.text ? slots.text() : props.text, (_a = slots.default) == null ? void 0 : _a.call(slots)])];
        }
      });
    });
    return {};
  }
});
const allowedDensities = [null, "prominent", "default", "comfortable", "compact"];
const makeVToolbarProps = propsFactory({
  absolute: Boolean,
  collapse: Boolean,
  color: String,
  density: {
    type: String,
    default: "default",
    validator: (v) => allowedDensities.includes(v)
  },
  extended: Boolean,
  extensionHeight: {
    type: [Number, String],
    default: 48
  },
  flat: Boolean,
  floating: Boolean,
  height: {
    type: [Number, String],
    default: 64
  },
  image: String,
  title: String,
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeElevationProps(),
  ...makeRoundedProps(),
  ...makeTagProps({
    tag: "header"
  }),
  ...makeThemeProps()
}, "VToolbar");
const VToolbar = genericComponent()({
  name: "VToolbar",
  props: makeVToolbarProps(),
  setup(props, _ref) {
    var _a;
    let {
      slots
    } = _ref;
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "color"));
    const {
      borderClasses
    } = useBorder(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      themeClasses
    } = provideTheme(props);
    const {
      rtlClasses
    } = useRtl();
    const isExtended = shallowRef(!!(props.extended || ((_a = slots.extension) == null ? void 0 : _a.call(slots))));
    const contentHeight = computed(() => parseInt(Number(props.height) + (props.density === "prominent" ? Number(props.height) : 0) - (props.density === "comfortable" ? 8 : 0) - (props.density === "compact" ? 16 : 0), 10));
    const extensionHeight = computed(() => isExtended.value ? parseInt(Number(props.extensionHeight) + (props.density === "prominent" ? Number(props.extensionHeight) : 0) - (props.density === "comfortable" ? 4 : 0) - (props.density === "compact" ? 8 : 0), 10) : 0);
    provideDefaults({
      VBtn: {
        variant: "text"
      }
    });
    useRender(() => {
      var _a2;
      const hasTitle = !!(props.title || slots.title);
      const hasImage = !!(slots.image || props.image);
      const extension = (_a2 = slots.extension) == null ? void 0 : _a2.call(slots);
      isExtended.value = !!(props.extended || extension);
      return createVNode(props.tag, {
        "class": ["v-toolbar", {
          "v-toolbar--absolute": props.absolute,
          "v-toolbar--collapse": props.collapse,
          "v-toolbar--flat": props.flat,
          "v-toolbar--floating": props.floating,
          [`v-toolbar--density-${props.density}`]: true
        }, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, roundedClasses.value, themeClasses.value, rtlClasses.value, props.class],
        "style": [backgroundColorStyles.value, props.style]
      }, {
        default: () => [hasImage && createVNode("div", {
          "key": "image",
          "class": "v-toolbar__image"
        }, [!slots.image ? createVNode(VImg, {
          "key": "image-img",
          "cover": true,
          "src": props.image
        }, null) : createVNode(VDefaultsProvider, {
          "key": "image-defaults",
          "disabled": !props.image,
          "defaults": {
            VImg: {
              cover: true,
              src: props.image
            }
          }
        }, slots.image)]), createVNode(VDefaultsProvider, {
          "defaults": {
            VTabs: {
              height: convertToUnit(contentHeight.value)
            }
          }
        }, {
          default: () => {
            var _a3, _b, _c;
            return [createVNode("div", {
              "class": "v-toolbar__content",
              "style": {
                height: convertToUnit(contentHeight.value)
              }
            }, [slots.prepend && createVNode("div", {
              "class": "v-toolbar__prepend"
            }, [(_a3 = slots.prepend) == null ? void 0 : _a3.call(slots)]), hasTitle && createVNode(VToolbarTitle, {
              "key": "title",
              "text": props.title
            }, {
              text: slots.title
            }), (_b = slots.default) == null ? void 0 : _b.call(slots), slots.append && createVNode("div", {
              "class": "v-toolbar__append"
            }, [(_c = slots.append) == null ? void 0 : _c.call(slots)])])];
          }
        }), createVNode(VDefaultsProvider, {
          "defaults": {
            VTabs: {
              height: convertToUnit(extensionHeight.value)
            }
          }
        }, {
          default: () => [createVNode(VExpandTransition, null, {
            default: () => [isExtended.value && createVNode("div", {
              "class": "v-toolbar__extension",
              "style": {
                height: convertToUnit(extensionHeight.value)
              }
            }, [extension])]
          })]
        })]
      });
    });
    return {
      contentHeight,
      extensionHeight
    };
  }
});
const _sfc_main$4 = {
  __name: "Checkout",
  __ssrInlineRender: true,
  setup(__props) {
    const cart = useCartStore();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VCard, mergeProps({
        color: "#4E4E4E",
        height: "655",
        class: "rounded-xl"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, {
              class: "mx-2 mt-4 rounded-lg",
              "max-width": "344",
              color: "#6D6D6D"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCardItem, { title: "DELIVERY ADDRESS" }, {
                    subtitle: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VIcon, {
                          icon: "i-material-symbols-map-marker",
                          size: "18",
                          class: "me-1 pb-1"
                        }, null, _parent4, _scopeId3));
                        _push4(` Po.1478, Street No. 52 West New York `);
                      } else {
                        return [
                          createVNode(VIcon, {
                            icon: "i-material-symbols-map-marker",
                            size: "18",
                            class: "me-1 pb-1"
                          }),
                          createTextVNode(" Po.1478, Street No. 52 West New York ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardText, { class: "mt-n3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VIcon, {
                          size: "16",
                          icon: "i-material-symbols-clock-outline",
                          class: "mr-2"
                        }, null, _parent4, _scopeId3));
                        _push4(`20 min`);
                      } else {
                        return [
                          createVNode(VIcon, {
                            size: "16",
                            icon: "i-material-symbols-clock-outline",
                            class: "mr-2"
                          }),
                          createTextVNode("20 min")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCardItem, { title: "DELIVERY ADDRESS" }, {
                      subtitle: withCtx(() => [
                        createVNode(VIcon, {
                          icon: "i-material-symbols-map-marker",
                          size: "18",
                          class: "me-1 pb-1"
                        }),
                        createTextVNode(" Po.1478, Street No. 52 West New York ")
                      ]),
                      _: 1
                    }),
                    createVNode(VCardText, { class: "mt-n3" }, {
                      default: withCtx(() => [
                        createVNode(VIcon, {
                          size: "16",
                          icon: "i-material-symbols-clock-outline",
                          class: "mr-2"
                        }),
                        createTextVNode("20 min")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VToolbar, {
              color: "transparent",
              class: "pr-1 mt-n2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VBtn, {
                    icon: "",
                    class: "hidden-xs-only"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VIcon, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`i-material-symbols-cart`);
                            } else {
                              return [
                                createTextVNode("i-material-symbols-cart")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VIcon, null, {
                            default: withCtx(() => [
                              createTextVNode("i-material-symbols-cart")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VToolbarTitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Cart`);
                      } else {
                        return [
                          createTextVNode("Cart")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VSpacer, null, null, _parent3, _scopeId2));
                  _push3(`<span class="text-caption" data-v-8ad87b54${_scopeId2}>Order ID: #1099</span>`);
                } else {
                  return [
                    createVNode(VBtn, {
                      icon: "",
                      class: "hidden-xs-only"
                    }, {
                      default: withCtx(() => [
                        createVNode(VIcon, null, {
                          default: withCtx(() => [
                            createTextVNode("i-material-symbols-cart")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VToolbarTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("Cart")
                      ]),
                      _: 1
                    }),
                    createVNode(VSpacer),
                    createVNode("span", { class: "text-caption" }, "Order ID: #1099")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCard, {
              class: "rounded-xl ma-2 pa-1 mt-n2",
              variant: "outlined"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VChip, {
                    variant: "flat",
                    color: "red"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Delivery `);
                      } else {
                        return [
                          createTextVNode(" Delivery ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VChip, {
                    variant: "text",
                    class: "ml-5"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Dine in `);
                      } else {
                        return [
                          createTextVNode(" Dine in ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VChip, {
                    variant: "text",
                    color: "red"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` | `);
                      } else {
                        return [
                          createTextVNode(" | ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VChip, { variant: "text" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Takeaway `);
                      } else {
                        return [
                          createTextVNode(" Takeaway ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VChip, {
                      variant: "flat",
                      color: "red"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Delivery ")
                      ]),
                      _: 1
                    }),
                    createVNode(VChip, {
                      variant: "text",
                      class: "ml-5"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Dine in ")
                      ]),
                      _: 1
                    }),
                    createVNode(VChip, {
                      variant: "text",
                      color: "red"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" | ")
                      ]),
                      _: 1
                    }),
                    createVNode(VChip, { variant: "text" }, {
                      default: withCtx(() => [
                        createTextVNode(" Takeaway ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<!--[-->`);
            ssrRenderList(unref(cart).items, (item, index2) => {
              _push2(`<!--[-->${ssrInterpolate(item)} `);
              _push2(ssrRenderComponent(VCard, {
                class: "ma-2 mt-n2",
                title: item.name,
                subtitle: item.desc,
                color: "transparent",
                flat: ""
              }, {
                prepend: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VAvatar, { color: "" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VImg, {
                            src: item.image,
                            alt: "John"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VImg, {
                              src: item.image,
                              alt: "John"
                            }, null, 8, ["src"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VAvatar, { color: "" }, {
                        default: withCtx(() => [
                          createVNode(VImg, {
                            src: item.image,
                            alt: "John"
                          }, null, 8, ["src"])
                        ]),
                        _: 2
                      }, 1024)
                    ];
                  }
                }),
                append: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VBtn, {
                      density: "compact",
                      icon: "i-material-symbols-circle-edit-outline",
                      "x-small": ""
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VBtn, {
                        density: "compact",
                        icon: "i-material-symbols-circle-edit-outline",
                        "x-small": ""
                      })
                    ];
                  }
                }),
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$6), {
                      dish: item,
                      class: "ml-14"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$6), {
                        dish: item,
                        class: "ml-14"
                      }, null, 8, ["dish"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(VDivider, {
                inset: "",
                class: "mt-n2"
              }, null, _parent2, _scopeId));
              _push2(`<!--]-->`);
            });
            _push2(`<!--]-->`);
            _push2(ssrRenderComponent(VCard, {
              class: "rounded-xl ma-2 pa-1 mt-n2",
              elevation: "16"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VChip, {
                    variant: "text",
                    class: "mRight"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Promotion Code `);
                      } else {
                        return [
                          createTextVNode(" Promotion Code ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VChip, {
                    variant: "flat",
                    color: "black"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` TRYNEW `);
                      } else {
                        return [
                          createTextVNode(" TRYNEW ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VChip, {
                      variant: "text",
                      class: "mRight"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Promotion Code ")
                      ]),
                      _: 1
                    }),
                    createVNode(VChip, {
                      variant: "flat",
                      color: "black"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" TRYNEW ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCard, {
              color: "transparent",
              class: "ma-2",
              flat: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VList, {
                    density: "comfortable",
                    class: "text-white"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VListItem, { title: "Sub Total" }, {
                          append: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VBtn, { variant: "text" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`$155.20`);
                                  } else {
                                    return [
                                      createTextVNode("$155.20")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VBtn, { variant: "text" }, {
                                  default: withCtx(() => [
                                    createTextVNode("$155.20")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VListItem, { title: "Delivery Charge" }, {
                          append: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VBtn, { variant: "text" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`$10`);
                                  } else {
                                    return [
                                      createTextVNode("$10")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VBtn, { variant: "text" }, {
                                  default: withCtx(() => [
                                    createTextVNode("$10")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VDivider, { inset: "" }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VListItem, { title: "TOTAL" }, {
                          append: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VBtn, { variant: "text" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`$165.20`);
                                  } else {
                                    return [
                                      createTextVNode("$165.20")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VBtn, { variant: "text" }, {
                                  default: withCtx(() => [
                                    createTextVNode("$165.20")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VListItem, { title: "Sub Total" }, {
                            append: withCtx(() => [
                              createVNode(VBtn, { variant: "text" }, {
                                default: withCtx(() => [
                                  createTextVNode("$155.20")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VListItem, { title: "Delivery Charge" }, {
                            append: withCtx(() => [
                              createVNode(VBtn, { variant: "text" }, {
                                default: withCtx(() => [
                                  createTextVNode("$10")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VDivider, { inset: "" }),
                          createVNode(VListItem, { title: "TOTAL" }, {
                            append: withCtx(() => [
                              createVNode(VBtn, { variant: "text" }, {
                                default: withCtx(() => [
                                  createTextVNode("$165.20")
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VList, {
                      density: "comfortable",
                      class: "text-white"
                    }, {
                      default: withCtx(() => [
                        createVNode(VListItem, { title: "Sub Total" }, {
                          append: withCtx(() => [
                            createVNode(VBtn, { variant: "text" }, {
                              default: withCtx(() => [
                                createTextVNode("$155.20")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(VListItem, { title: "Delivery Charge" }, {
                          append: withCtx(() => [
                            createVNode(VBtn, { variant: "text" }, {
                              default: withCtx(() => [
                                createTextVNode("$10")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(VDivider, { inset: "" }),
                        createVNode(VListItem, { title: "TOTAL" }, {
                          append: withCtx(() => [
                            createVNode(VBtn, { variant: "text" }, {
                              default: withCtx(() => [
                                createTextVNode("$165.20")
                              ]),
                              _: 1
                            })
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
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VChip, {
              variant: "flat",
              color: "black",
              class: "px-10 mLeft"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Confirm Order `);
                } else {
                  return [
                    createTextVNode(" Confirm Order ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCard, {
                class: "mx-2 mt-4 rounded-lg",
                "max-width": "344",
                color: "#6D6D6D"
              }, {
                default: withCtx(() => [
                  createVNode(VCardItem, { title: "DELIVERY ADDRESS" }, {
                    subtitle: withCtx(() => [
                      createVNode(VIcon, {
                        icon: "i-material-symbols-map-marker",
                        size: "18",
                        class: "me-1 pb-1"
                      }),
                      createTextVNode(" Po.1478, Street No. 52 West New York ")
                    ]),
                    _: 1
                  }),
                  createVNode(VCardText, { class: "mt-n3" }, {
                    default: withCtx(() => [
                      createVNode(VIcon, {
                        size: "16",
                        icon: "i-material-symbols-clock-outline",
                        class: "mr-2"
                      }),
                      createTextVNode("20 min")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VToolbar, {
                color: "transparent",
                class: "pr-1 mt-n2"
              }, {
                default: withCtx(() => [
                  createVNode(VBtn, {
                    icon: "",
                    class: "hidden-xs-only"
                  }, {
                    default: withCtx(() => [
                      createVNode(VIcon, null, {
                        default: withCtx(() => [
                          createTextVNode("i-material-symbols-cart")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VToolbarTitle, null, {
                    default: withCtx(() => [
                      createTextVNode("Cart")
                    ]),
                    _: 1
                  }),
                  createVNode(VSpacer),
                  createVNode("span", { class: "text-caption" }, "Order ID: #1099")
                ]),
                _: 1
              }),
              createVNode(VCard, {
                class: "rounded-xl ma-2 pa-1 mt-n2",
                variant: "outlined"
              }, {
                default: withCtx(() => [
                  createVNode(VChip, {
                    variant: "flat",
                    color: "red"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Delivery ")
                    ]),
                    _: 1
                  }),
                  createVNode(VChip, {
                    variant: "text",
                    class: "ml-5"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Dine in ")
                    ]),
                    _: 1
                  }),
                  createVNode(VChip, {
                    variant: "text",
                    color: "red"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" | ")
                    ]),
                    _: 1
                  }),
                  createVNode(VChip, { variant: "text" }, {
                    default: withCtx(() => [
                      createTextVNode(" Takeaway ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              (openBlock(true), createBlock(Fragment, null, renderList(unref(cart).items, (item, index2) => {
                return openBlock(), createBlock(Fragment, { key: index2 }, [
                  createTextVNode(toDisplayString(item) + " ", 1),
                  createVNode(VCard, {
                    class: "ma-2 mt-n2",
                    title: item.name,
                    subtitle: item.desc,
                    color: "transparent",
                    flat: ""
                  }, {
                    prepend: withCtx(() => [
                      createVNode(VAvatar, { color: "" }, {
                        default: withCtx(() => [
                          createVNode(VImg, {
                            src: item.image,
                            alt: "John"
                          }, null, 8, ["src"])
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    append: withCtx(() => [
                      createVNode(VBtn, {
                        density: "compact",
                        icon: "i-material-symbols-circle-edit-outline",
                        "x-small": ""
                      })
                    ]),
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$6), {
                        dish: item,
                        class: "ml-14"
                      }, null, 8, ["dish"])
                    ]),
                    _: 2
                  }, 1032, ["title", "subtitle"]),
                  createVNode(VDivider, {
                    inset: "",
                    class: "mt-n2"
                  })
                ], 64);
              }), 128)),
              createVNode(VCard, {
                class: "rounded-xl ma-2 pa-1 mt-n2",
                elevation: "16"
              }, {
                default: withCtx(() => [
                  createVNode(VChip, {
                    variant: "text",
                    class: "mRight"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Promotion Code ")
                    ]),
                    _: 1
                  }),
                  createVNode(VChip, {
                    variant: "flat",
                    color: "black"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" TRYNEW ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VCard, {
                color: "transparent",
                class: "ma-2",
                flat: ""
              }, {
                default: withCtx(() => [
                  createVNode(VList, {
                    density: "comfortable",
                    class: "text-white"
                  }, {
                    default: withCtx(() => [
                      createVNode(VListItem, { title: "Sub Total" }, {
                        append: withCtx(() => [
                          createVNode(VBtn, { variant: "text" }, {
                            default: withCtx(() => [
                              createTextVNode("$155.20")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VListItem, { title: "Delivery Charge" }, {
                        append: withCtx(() => [
                          createVNode(VBtn, { variant: "text" }, {
                            default: withCtx(() => [
                              createTextVNode("$10")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VDivider, { inset: "" }),
                      createVNode(VListItem, { title: "TOTAL" }, {
                        append: withCtx(() => [
                          createVNode(VBtn, { variant: "text" }, {
                            default: withCtx(() => [
                              createTextVNode("$165.20")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VChip, {
                variant: "flat",
                color: "black",
                class: "px-10 mLeft"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Confirm Order ")
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
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Checkout.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const Checkout = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-8ad87b54"]]);
const makeVHoverProps = propsFactory({
  disabled: Boolean,
  modelValue: {
    type: Boolean,
    default: void 0
  },
  ...makeDelayProps()
}, "VHover");
const VHover = genericComponent()({
  name: "VHover",
  props: makeVHoverProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const isHovering = useProxiedModel(props, "modelValue");
    const {
      runOpenDelay,
      runCloseDelay
    } = useDelay(props, (value) => !props.disabled && (isHovering.value = value));
    return () => {
      var _a;
      return (_a = slots.default) == null ? void 0 : _a.call(slots, {
        isHovering: isHovering.value,
        props: {
          onMouseenter: runOpenDelay,
          onMouseleave: runCloseDelay
        }
      });
    };
  }
});
const _sfc_main$3 = {
  __name: "CatAvatar",
  __ssrInlineRender: true,
  props: {
    item: Object,
    active: Number
  },
  setup(__props) {
    ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VHover, _attrs, {
        default: withCtx(({ isHovering, props }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, mergeProps({
              class: "rounded",
              elevation: isHovering ? 2 : 12
            }, props, {
              height: "100",
              width: "100",
              variant: "flat"
            }), {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VOverlay, {
                    "model-value": isHovering,
                    contained: "",
                    scrim: "#036358",
                    class: "align-center justify-center rounded"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VBtn, {
                          variant: "flat",
                          onClick: ($event) => _ctx.$emit("clicked")
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(__props.item.name)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(__props.item.name), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VBtn, {
                            variant: "flat",
                            onClick: ($event) => _ctx.$emit("clicked")
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(__props.item.name), 1)
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VOverlay, {
                    "model-value": isHovering,
                    contained: "",
                    scrim: "#036358",
                    class: "align-center justify-center rounded"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VBtn, { variant: "flat" }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(__props.item.name)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(__props.item.name), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VBtn, { variant: "flat" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(__props.item.name), 1)
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VAvatar, {
                    size: "100",
                    rounded: ""
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VImg, {
                          src: __props.item.name + ".png",
                          cover: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VImg, {
                            src: __props.item.name + ".png",
                            cover: ""
                          }, null, 8, ["src"])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VOverlay, {
                      "model-value": isHovering,
                      contained: "",
                      scrim: "#036358",
                      class: "align-center justify-center rounded"
                    }, {
                      default: withCtx(() => [
                        createVNode(VBtn, {
                          variant: "flat",
                          onClick: ($event) => _ctx.$emit("clicked")
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(__props.item.name), 1)
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ]),
                      _: 2
                    }, 1032, ["model-value"]),
                    createVNode(VOverlay, {
                      "model-value": isHovering,
                      contained: "",
                      scrim: "#036358",
                      class: "align-center justify-center rounded"
                    }, {
                      default: withCtx(() => [
                        createVNode(VBtn, { variant: "flat" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(__props.item.name), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 2
                    }, 1032, ["model-value"]),
                    createVNode(VAvatar, {
                      size: "100",
                      rounded: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(VImg, {
                          src: __props.item.name + ".png",
                          cover: ""
                        }, null, 8, ["src"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCard, mergeProps({
                class: "rounded",
                elevation: isHovering ? 2 : 12
              }, props, {
                height: "100",
                width: "100",
                variant: "flat"
              }), {
                default: withCtx(() => [
                  createVNode(VOverlay, {
                    "model-value": isHovering,
                    contained: "",
                    scrim: "#036358",
                    class: "align-center justify-center rounded"
                  }, {
                    default: withCtx(() => [
                      createVNode(VBtn, {
                        variant: "flat",
                        onClick: ($event) => _ctx.$emit("clicked")
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(__props.item.name), 1)
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ]),
                    _: 2
                  }, 1032, ["model-value"]),
                  createVNode(VOverlay, {
                    "model-value": isHovering,
                    contained: "",
                    scrim: "#036358",
                    class: "align-center justify-center rounded"
                  }, {
                    default: withCtx(() => [
                      createVNode(VBtn, { variant: "flat" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(__props.item.name), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 2
                  }, 1032, ["model-value"]),
                  createVNode(VAvatar, {
                    size: "100",
                    rounded: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(VImg, {
                        src: __props.item.name + ".png",
                        cover: ""
                      }, null, 8, ["src"])
                    ]),
                    _: 1
                  })
                ]),
                _: 2
              }, 1040, ["elevation"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CatAvatar.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
function bias(val) {
  const c = 0.501;
  const x = Math.abs(val);
  return Math.sign(val) * (x / ((1 / c - 2) * (1 - x) + 1));
}
function calculateUpdatedOffset(_ref) {
  let {
    selectedElement,
    containerSize,
    contentSize,
    isRtl,
    currentScrollOffset,
    isHorizontal
  } = _ref;
  const clientSize = isHorizontal ? selectedElement.clientWidth : selectedElement.clientHeight;
  const offsetStart = isHorizontal ? selectedElement.offsetLeft : selectedElement.offsetTop;
  const adjustedOffsetStart = isRtl && isHorizontal ? contentSize - offsetStart - clientSize : offsetStart;
  const totalSize = containerSize + currentScrollOffset;
  const itemOffset = clientSize + adjustedOffsetStart;
  const additionalOffset = clientSize * 0.4;
  if (adjustedOffsetStart <= currentScrollOffset) {
    currentScrollOffset = Math.max(adjustedOffsetStart - additionalOffset, 0);
  } else if (totalSize <= itemOffset) {
    currentScrollOffset = Math.min(currentScrollOffset - (totalSize - itemOffset - additionalOffset), contentSize - containerSize);
  }
  return currentScrollOffset;
}
const VSlideGroupSymbol = Symbol.for("vuetify:v-slide-group");
const makeVSlideGroupProps = propsFactory({
  centerActive: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  symbol: {
    type: null,
    default: VSlideGroupSymbol
  },
  nextIcon: {
    type: IconValue,
    default: "$next"
  },
  prevIcon: {
    type: IconValue,
    default: "$prev"
  },
  showArrows: {
    type: [Boolean, String],
    validator: (v) => typeof v === "boolean" || ["always", "desktop", "mobile"].includes(v)
  },
  ...makeComponentProps(),
  ...makeDisplayProps(),
  ...makeTagProps(),
  ...makeGroupProps({
    selectedClass: "v-slide-group-item--active"
  })
}, "VSlideGroup");
const VSlideGroup = genericComponent()({
  name: "VSlideGroup",
  props: makeVSlideGroupProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      isRtl
    } = useRtl();
    const {
      displayClasses,
      mobile
    } = useDisplay(props);
    const group = useGroup(props, props.symbol);
    const isOverflowing = shallowRef(false);
    const scrollOffset = shallowRef(0);
    const containerSize = shallowRef(0);
    const contentSize = shallowRef(0);
    const isHorizontal = computed(() => props.direction === "horizontal");
    const {
      resizeRef: containerRef,
      contentRect: containerRect
    } = useResizeObserver();
    const {
      resizeRef: contentRef,
      contentRect
    } = useResizeObserver();
    computed(() => {
      if (!group.selected.value.length)
        return -1;
      return group.items.value.findIndex((item) => item.id === group.selected.value[0]);
    });
    computed(() => {
      if (!group.selected.value.length)
        return -1;
      return group.items.value.findIndex((item) => item.id === group.selected.value[group.selected.value.length - 1]);
    });
    const disableTransition = shallowRef(false);
    let startTouch = 0;
    let startOffset = 0;
    function onTouchstart(e) {
      const sizeProperty = isHorizontal.value ? "clientX" : "clientY";
      const sign = isRtl.value && isHorizontal.value ? -1 : 1;
      startOffset = sign * scrollOffset.value;
      startTouch = e.touches[0][sizeProperty];
      disableTransition.value = true;
    }
    function onTouchmove(e) {
      if (!isOverflowing.value)
        return;
      const sizeProperty = isHorizontal.value ? "clientX" : "clientY";
      const sign = isRtl.value && isHorizontal.value ? -1 : 1;
      scrollOffset.value = sign * (startOffset + startTouch - e.touches[0][sizeProperty]);
    }
    function onTouchend(e) {
      const maxScrollOffset = contentSize.value - containerSize.value;
      if (scrollOffset.value < 0 || !isOverflowing.value) {
        scrollOffset.value = 0;
      } else if (scrollOffset.value >= maxScrollOffset) {
        scrollOffset.value = maxScrollOffset;
      }
      disableTransition.value = false;
    }
    function onScroll() {
      if (!containerRef.value)
        return;
      containerRef.value[isHorizontal.value ? "scrollLeft" : "scrollTop"] = 0;
    }
    const isFocused = shallowRef(false);
    function onFocusin(e) {
      isFocused.value = true;
      if (!isOverflowing.value || !contentRef.value)
        return;
      for (const el of e.composedPath()) {
        for (const item of contentRef.value.children) {
          if (item === el) {
            scrollOffset.value = calculateUpdatedOffset({
              selectedElement: item,
              containerSize: containerSize.value,
              contentSize: contentSize.value,
              isRtl: isRtl.value,
              currentScrollOffset: scrollOffset.value,
              isHorizontal: isHorizontal.value
            });
            return;
          }
        }
      }
    }
    function onFocusout(e) {
      isFocused.value = false;
    }
    function onFocus(e) {
      var _a;
      if (!isFocused.value && !(e.relatedTarget && ((_a = contentRef.value) == null ? void 0 : _a.contains(e.relatedTarget))))
        focus();
    }
    function onKeydown(e) {
      if (!contentRef.value)
        return;
      if (isHorizontal.value) {
        if (e.key === "ArrowRight") {
          focus(isRtl.value ? "prev" : "next");
        } else if (e.key === "ArrowLeft") {
          focus(isRtl.value ? "next" : "prev");
        }
      } else {
        if (e.key === "ArrowDown") {
          focus("next");
        } else if (e.key === "ArrowUp") {
          focus("prev");
        }
      }
      if (e.key === "Home") {
        focus("first");
      } else if (e.key === "End") {
        focus("last");
      }
    }
    function focus(location) {
      var _a, _b, _c, _d, _e;
      if (!contentRef.value)
        return;
      if (!location) {
        const focusable = focusableChildren(contentRef.value);
        (_a = focusable[0]) == null ? void 0 : _a.focus();
      } else if (location === "next") {
        const el = (_b = contentRef.value.querySelector(":focus")) == null ? void 0 : _b.nextElementSibling;
        if (el)
          el.focus();
        else
          focus("first");
      } else if (location === "prev") {
        const el = (_c = contentRef.value.querySelector(":focus")) == null ? void 0 : _c.previousElementSibling;
        if (el)
          el.focus();
        else
          focus("last");
      } else if (location === "first") {
        (_d = contentRef.value.firstElementChild) == null ? void 0 : _d.focus();
      } else if (location === "last") {
        (_e = contentRef.value.lastElementChild) == null ? void 0 : _e.focus();
      }
    }
    function scrollTo(location) {
      const newAbsoluteOffset = scrollOffset.value + (location === "prev" ? -1 : 1) * containerSize.value;
      scrollOffset.value = clamp(newAbsoluteOffset, 0, contentSize.value - containerSize.value);
    }
    const contentStyles = computed(() => {
      let scrollAmount = scrollOffset.value > contentSize.value - containerSize.value ? -(contentSize.value - containerSize.value) + bias(contentSize.value - containerSize.value - scrollOffset.value) : -scrollOffset.value;
      if (scrollOffset.value <= 0) {
        scrollAmount = bias(-scrollOffset.value);
      }
      const sign = isRtl.value && isHorizontal.value ? -1 : 1;
      return {
        transform: `translate${isHorizontal.value ? "X" : "Y"}(${sign * scrollAmount}px)`,
        transition: disableTransition.value ? "none" : "",
        willChange: disableTransition.value ? "transform" : ""
      };
    });
    const slotProps = computed(() => ({
      next: group.next,
      prev: group.prev,
      select: group.select,
      isSelected: group.isSelected
    }));
    const hasAffixes = computed(() => {
      switch (props.showArrows) {
        case "always":
          return true;
        case "desktop":
          return !mobile.value;
        case true:
          return isOverflowing.value || Math.abs(scrollOffset.value) > 0;
        case "mobile":
          return mobile.value || isOverflowing.value || Math.abs(scrollOffset.value) > 0;
        default:
          return !mobile.value && (isOverflowing.value || Math.abs(scrollOffset.value) > 0);
      }
    });
    const hasPrev = computed(() => {
      return Math.abs(scrollOffset.value) > 0;
    });
    const hasNext = computed(() => {
      return contentSize.value > Math.abs(scrollOffset.value) + containerSize.value;
    });
    useRender(() => createVNode(props.tag, {
      "class": ["v-slide-group", {
        "v-slide-group--vertical": !isHorizontal.value,
        "v-slide-group--has-affixes": hasAffixes.value,
        "v-slide-group--is-overflowing": isOverflowing.value
      }, displayClasses.value, props.class],
      "style": props.style,
      "tabindex": isFocused.value || group.selected.value.length ? -1 : 0,
      "onFocus": onFocus
    }, {
      default: () => {
        var _a2, _b2;
        var _a, _b, _c;
        return [hasAffixes.value && createVNode("div", {
          "key": "prev",
          "class": ["v-slide-group__prev", {
            "v-slide-group__prev--disabled": !hasPrev.value
          }],
          "onClick": () => hasPrev.value && scrollTo("prev")
        }, [(_a2 = (_a = slots.prev) == null ? void 0 : _a.call(slots, slotProps.value)) != null ? _a2 : createVNode(VFadeTransition, null, {
          default: () => [createVNode(VIcon, {
            "icon": isRtl.value ? props.nextIcon : props.prevIcon
          }, null)]
        })]), createVNode("div", {
          "key": "container",
          "ref": containerRef,
          "class": "v-slide-group__container",
          "onScroll": onScroll
        }, [createVNode("div", {
          "ref": contentRef,
          "class": "v-slide-group__content",
          "style": contentStyles.value,
          "onTouchstartPassive": onTouchstart,
          "onTouchmovePassive": onTouchmove,
          "onTouchendPassive": onTouchend,
          "onFocusin": onFocusin,
          "onFocusout": onFocusout,
          "onKeydown": onKeydown
        }, [(_b = slots.default) == null ? void 0 : _b.call(slots, slotProps.value)])]), hasAffixes.value && createVNode("div", {
          "key": "next",
          "class": ["v-slide-group__next", {
            "v-slide-group__next--disabled": !hasNext.value
          }],
          "onClick": () => hasNext.value && scrollTo("next")
        }, [(_b2 = (_c = slots.next) == null ? void 0 : _c.call(slots, slotProps.value)) != null ? _b2 : createVNode(VFadeTransition, null, {
          default: () => [createVNode(VIcon, {
            "icon": isRtl.value ? props.prevIcon : props.nextIcon
          }, null)]
        })])];
      }
    }));
    return {
      selected: group.selected,
      scrollTo,
      scrollOffset,
      focus
    };
  }
});
const VSlideGroupItem = genericComponent()({
  name: "VSlideGroupItem",
  props: makeGroupItemProps(),
  emits: {
    "group:selected": (val) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const slideGroupItem = useGroupItem(props, VSlideGroupSymbol);
    return () => {
      var _a;
      return (_a = slots.default) == null ? void 0 : _a.call(slots, {
        isSelected: slideGroupItem.isSelected.value,
        select: slideGroupItem.select,
        toggle: slideGroupItem.toggle,
        selectedClass: slideGroupItem.selectedClass.value
      });
    };
  }
});
const _sfc_main$1 = {
  components: { CatAvatar: _sfc_main$3, DishCard },
  props: ["items", "dish"],
  data: () => ({
    model: null
  })
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_cat_avatar = _sfc_main$3;
  const _component_dish_card = DishCard;
  _push(`<!--[-->`);
  _push(ssrRenderComponent(VToolbar, {
    color: "transparent",
    class: "pr-1 mt-n2"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(VToolbarTitle, { class: "text-white" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Categories`);
            } else {
              return [
                createTextVNode("Categories")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(VSpacer, null, null, _parent2, _scopeId));
        _push2(`<span class="text-caption text-white"${_scopeId}>View More</span>`);
        _push2(ssrRenderComponent(VBtn, {
          density: "compact",
          icon: "i-material-symbols-chevron-right-box",
          color: "grey"
        }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(VToolbarTitle, { class: "text-white" }, {
            default: withCtx(() => [
              createTextVNode("Categories")
            ]),
            _: 1
          }),
          createVNode(VSpacer),
          createVNode("span", { class: "text-caption text-white" }, "View More"),
          createVNode(VBtn, {
            density: "compact",
            icon: "i-material-symbols-chevron-right-box",
            color: "grey"
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<h6 class="text-white ml-4 mt-n4"><span class="text-red">2+ new </span> categories added this week </h6>`);
  _push(ssrRenderComponent(VSheet, {
    class: "mx-auto my-20",
    elevation: "8",
    "max-width": "800",
    color: "transperent"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(VSlideGroup, {
          modelValue: _ctx.model,
          "onUpdate:modelValue": ($event) => _ctx.model = $event,
          class: "pa-4",
          "selected-class": "selected-class",
          "show-arrows": ""
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<!--[-->`);
              ssrRenderList($props.items, (item, n) => {
                _push3(ssrRenderComponent(VSlideGroupItem, { key: n }, {
                  default: withCtx(({ isSelected, toggle, selectedClass }, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(ssrRenderComponent(VCard, {
                        color: "none",
                        class: [["ma-4", selectedClass], "rounded"],
                        height: "100",
                        width: "100",
                        onClick: toggle
                      }, {
                        default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(ssrRenderComponent(_component_cat_avatar, {
                              item,
                              active: 0
                            }, null, _parent5, _scopeId4));
                            _push5(`<div class="d-flex fill-height align-center justify-center"${_scopeId4}>`);
                            _push5(ssrRenderComponent(VScaleTransition, null, {
                              default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                if (_push6) {
                                  if (isSelected) {
                                    _push6(ssrRenderComponent(VIcon, {
                                      color: "white",
                                      size: "48",
                                      icon: "mdi-close-circle-outline"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    _push6(`<!---->`);
                                  }
                                } else {
                                  return [
                                    isSelected ? (openBlock(), createBlock(VIcon, {
                                      key: 0,
                                      color: "white",
                                      size: "48",
                                      icon: "mdi-close-circle-outline"
                                    })) : createCommentVNode("", true)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent5, _scopeId4));
                            _push5(`</div>`);
                          } else {
                            return [
                              createVNode(_component_cat_avatar, {
                                item,
                                active: 0
                              }, null, 8, ["item"]),
                              createVNode("div", { class: "d-flex fill-height align-center justify-center" }, [
                                createVNode(VScaleTransition, null, {
                                  default: withCtx(() => [
                                    isSelected ? (openBlock(), createBlock(VIcon, {
                                      key: 0,
                                      color: "white",
                                      size: "48",
                                      icon: "mdi-close-circle-outline"
                                    })) : createCommentVNode("", true)
                                  ]),
                                  _: 2
                                }, 1024)
                              ])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent4, _scopeId3));
                    } else {
                      return [
                        createVNode(VCard, {
                          color: "none",
                          class: [["ma-4", selectedClass], "rounded"],
                          height: "100",
                          width: "100",
                          onClick: toggle
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_cat_avatar, {
                              item,
                              active: 0
                            }, null, 8, ["item"]),
                            createVNode("div", { class: "d-flex fill-height align-center justify-center" }, [
                              createVNode(VScaleTransition, null, {
                                default: withCtx(() => [
                                  isSelected ? (openBlock(), createBlock(VIcon, {
                                    key: 0,
                                    color: "white",
                                    size: "48",
                                    icon: "mdi-close-circle-outline"
                                  })) : createCommentVNode("", true)
                                ]),
                                _: 2
                              }, 1024)
                            ])
                          ]),
                          _: 2
                        }, 1032, ["class", "onClick"])
                      ];
                    }
                  }),
                  _: 2
                }, _parent3, _scopeId2));
              });
              _push3(`<!--]-->`);
            } else {
              return [
                (openBlock(true), createBlock(Fragment, null, renderList($props.items, (item, n) => {
                  return openBlock(), createBlock(VSlideGroupItem, { key: n }, {
                    default: withCtx(({ isSelected, toggle, selectedClass }) => [
                      createVNode(VCard, {
                        color: "none",
                        class: [["ma-4", selectedClass], "rounded"],
                        height: "100",
                        width: "100",
                        onClick: toggle
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_cat_avatar, {
                            item,
                            active: 0
                          }, null, 8, ["item"]),
                          createVNode("div", { class: "d-flex fill-height align-center justify-center" }, [
                            createVNode(VScaleTransition, null, {
                              default: withCtx(() => [
                                isSelected ? (openBlock(), createBlock(VIcon, {
                                  key: 0,
                                  color: "white",
                                  size: "48",
                                  icon: "mdi-close-circle-outline"
                                })) : createCommentVNode("", true)
                              ]),
                              _: 2
                            }, 1024)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["class", "onClick"])
                    ]),
                    _: 2
                  }, 1024);
                }), 128))
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(VExpandTransition, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              if (_ctx.model != null) {
                _push3(ssrRenderComponent(VSheet, { height: "auto" }, {
                  default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(`<div class="d-flex fill-height align-center justify-center py-6"${_scopeId3}>`);
                      _push4(ssrRenderComponent(_component_dish_card, { dishe: $props.dish }, null, _parent4, _scopeId3));
                      _push4(`<h3 class="text-h6"${_scopeId3}>Selected ${ssrInterpolate(_ctx.model)}</h3></div>`);
                    } else {
                      return [
                        createVNode("div", { class: "d-flex fill-height align-center justify-center py-6" }, [
                          createVNode(_component_dish_card, { dishe: $props.dish }, null, 8, ["dishe"]),
                          createVNode("h3", { class: "text-h6" }, "Selected " + toDisplayString(_ctx.model), 1)
                        ])
                      ];
                    }
                  }),
                  _: 1
                }, _parent3, _scopeId2));
              } else {
                _push3(`<!---->`);
              }
            } else {
              return [
                _ctx.model != null ? (openBlock(), createBlock(VSheet, {
                  key: 0,
                  height: "auto"
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "d-flex fill-height align-center justify-center py-6" }, [
                      createVNode(_component_dish_card, { dishe: $props.dish }, null, 8, ["dishe"]),
                      createVNode("h3", { class: "text-h6" }, "Selected " + toDisplayString(_ctx.model), 1)
                    ])
                  ]),
                  _: 1
                })) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(VSlideGroup, {
            modelValue: _ctx.model,
            "onUpdate:modelValue": ($event) => _ctx.model = $event,
            class: "pa-4",
            "selected-class": "selected-class",
            "show-arrows": ""
          }, {
            default: withCtx(() => [
              (openBlock(true), createBlock(Fragment, null, renderList($props.items, (item, n) => {
                return openBlock(), createBlock(VSlideGroupItem, { key: n }, {
                  default: withCtx(({ isSelected, toggle, selectedClass }) => [
                    createVNode(VCard, {
                      color: "none",
                      class: [["ma-4", selectedClass], "rounded"],
                      height: "100",
                      width: "100",
                      onClick: toggle
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_cat_avatar, {
                          item,
                          active: 0
                        }, null, 8, ["item"]),
                        createVNode("div", { class: "d-flex fill-height align-center justify-center" }, [
                          createVNode(VScaleTransition, null, {
                            default: withCtx(() => [
                              isSelected ? (openBlock(), createBlock(VIcon, {
                                key: 0,
                                color: "white",
                                size: "48",
                                icon: "mdi-close-circle-outline"
                              })) : createCommentVNode("", true)
                            ]),
                            _: 2
                          }, 1024)
                        ])
                      ]),
                      _: 2
                    }, 1032, ["class", "onClick"])
                  ]),
                  _: 2
                }, 1024);
              }), 128))
            ]),
            _: 1
          }, 8, ["modelValue", "onUpdate:modelValue"]),
          createVNode(VExpandTransition, null, {
            default: withCtx(() => [
              _ctx.model != null ? (openBlock(), createBlock(VSheet, {
                key: 0,
                height: "auto"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "d-flex fill-height align-center justify-center py-6" }, [
                    createVNode(_component_dish_card, { dishe: $props.dish }, null, 8, ["dishe"]),
                    createVNode("h3", { class: "text-h6" }, "Selected " + toDisplayString(_ctx.model), 1)
                  ])
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CatCarousel.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const CatCarousel = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const useDishStore = defineStore("dish", () => {
  const dishes = ref([
    {
      _id: "_1",
      image: "500-g-humus.png",
      desc: "Thin Crust",
      name: "Hamburger",
      money: "$10.00",
      price: 10,
      star: "4.5"
    },
    {
      _id: "_2",
      image: "22.png",
      name: "Pizza",
      desc: "Thick bun",
      price: 25,
      money: "$25.00",
      star: "4.1"
    },
    {
      _id: "_3",
      image: "33.png",
      name: "Sushi",
      desc: "Lucid Energy",
      price: 15,
      money: "$15.00",
      star: "4.3"
    },
    {
      _id: "_4",
      desc: "Great Distance!",
      image: "44.png",
      name: "Gratin",
      price: 23,
      money: "$23.00",
      star: "4.9"
    }
  ]);
  return { dishes };
});
const __default__ = {
  components: { DishCard, MobileNav: __nuxt_component_0, CatCarousel, Quantity: _sfc_main$6, Checkout },
  data: () => ({
    items: [
      {
        name: "humus"
      },
      {
        name: "thina"
      },
      {
        name: "falafel"
      },
      {
        name: "spice"
      },
      {
        name: "hatzils"
      },
      {
        name: "soup"
      },
      {
        name: "logo"
      }
    ]
  })
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const dish = useDishStore();
    const dishes = dish.dishes;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VRow, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCol, {
              cols: "12",
              sm: "12",
              md: "6"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VTextField, {
                    density: "compact",
                    placeholder: "Search restaurant, Food, Cuisine or a Dish",
                    "append-inner-icon": "mdi-magnify",
                    variant: "outlined",
                    rounded: "",
                    class: "text-grey mx-8"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(CatCarousel, {
                    items: _ctx.items,
                    dish: unref(dishes)[0]
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VToolbar, {
                    color: "transparent",
                    class: "pr-1 mt-n2"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VToolbarTitle, { class: "text-white" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Popular Dishes`);
                            } else {
                              return [
                                createTextVNode("Popular Dishes")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VSpacer, null, null, _parent4, _scopeId3));
                        _push4(`<span class="text-caption text-white" data-v-71b214c9${_scopeId3}>View More</span>`);
                        _push4(ssrRenderComponent(VBtn, {
                          density: "compact",
                          icon: "i-material-symbols-chevron-right-box",
                          color: "grey"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VToolbarTitle, { class: "text-white" }, {
                            default: withCtx(() => [
                              createTextVNode("Popular Dishes")
                            ]),
                            _: 1
                          }),
                          createVNode(VSpacer),
                          createVNode("span", { class: "text-caption text-white" }, "View More"),
                          createVNode(VBtn, {
                            density: "compact",
                            icon: "i-material-symbols-chevron-right-box",
                            color: "grey"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<h6 class="text-white ml-4 mt-n4" data-v-71b214c9${_scopeId2}><span class="text-red" data-v-71b214c9${_scopeId2}>20+ new </span> dishes added this week </h6><div class="d-flex flex-wrap justify-space-evenly mt-4" color="transparent" data-v-71b214c9${_scopeId2}><!--[-->`);
                  ssrRenderList(unref(dishes), (dish2, i) => {
                    _push3(ssrRenderComponent(DishCard, {
                      key: i,
                      dish: dish2
                    }, null, _parent3, _scopeId2));
                  });
                  _push3(`<!--]--></div>`);
                  _push3(ssrRenderComponent(VToolbar, {
                    color: "transparent",
                    class: "pr-1 mt-n2"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VToolbarTitle, { class: "text-white" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Order Reports`);
                            } else {
                              return [
                                createTextVNode("Order Reports")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VSpacer, null, null, _parent4, _scopeId3));
                        _push4(`<span class="text-caption text-white" data-v-71b214c9${_scopeId3}>View all</span>`);
                        _push4(ssrRenderComponent(VBtn, {
                          density: "compact",
                          icon: "i-material-symbols-chevron-right-box",
                          color: "grey"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VToolbarTitle, { class: "text-white" }, {
                            default: withCtx(() => [
                              createTextVNode("Order Reports")
                            ]),
                            _: 1
                          }),
                          createVNode(VSpacer),
                          createVNode("span", { class: "text-caption text-white" }, "View all"),
                          createVNode(VBtn, {
                            density: "compact",
                            icon: "i-material-symbols-chevron-right-box",
                            color: "grey"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<h6 class="text-white ml-4 mt-n4" data-v-71b214c9${_scopeId2}><span class="text-red" data-v-71b214c9${_scopeId2}>Wow 100+ new </span> Order got this week </h6>`);
                  _push3(ssrRenderComponent(VCard, {
                    class: "rounded-xl ma-2 pa-1",
                    color: "#424343"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VRow, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                sm: "1"
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                sm: "2",
                                class: "text-center"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<span class="text-caption" data-v-71b214c9${_scopeId5}>Customer</span>`);
                                  } else {
                                    return [
                                      createVNode("span", { class: "text-caption" }, "Customer")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                sm: "2",
                                class: "text-center"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<span class="text-caption" data-v-71b214c9${_scopeId5}>Order number</span>`);
                                  } else {
                                    return [
                                      createVNode("span", { class: "text-caption" }, "Order number")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                sm: "2",
                                class: "text-center"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<span class="text-caption" data-v-71b214c9${_scopeId5}>address</span>`);
                                  } else {
                                    return [
                                      createVNode("span", { class: "text-caption" }, "address")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                sm: "2",
                                class: "text-center"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<span class="text-caption" data-v-71b214c9${_scopeId5}>Amount</span>`);
                                  } else {
                                    return [
                                      createVNode("span", { class: "text-caption" }, "Amount")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                sm: "2",
                                class: "text-center"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<span class="text-caption" data-v-71b214c9${_scopeId5}>Status</span>`);
                                  } else {
                                    return [
                                      createVNode("span", { class: "text-caption" }, "Status")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                sm: "1",
                                class: "text-center"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, {
                                  cols: "12",
                                  sm: "1"
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  sm: "2",
                                  class: "text-center"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("span", { class: "text-caption" }, "Customer")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  sm: "2",
                                  class: "text-center"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("span", { class: "text-caption" }, "Order number")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  sm: "2",
                                  class: "text-center"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("span", { class: "text-caption" }, "address")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  sm: "2",
                                  class: "text-center"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("span", { class: "text-caption" }, "Amount")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  sm: "2",
                                  class: "text-center"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("span", { class: "text-caption" }, "Status")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  sm: "1",
                                  class: "text-center"
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, {
                                cols: "12",
                                sm: "1"
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                sm: "2",
                                class: "text-center"
                              }, {
                                default: withCtx(() => [
                                  createVNode("span", { class: "text-caption" }, "Customer")
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                sm: "2",
                                class: "text-center"
                              }, {
                                default: withCtx(() => [
                                  createVNode("span", { class: "text-caption" }, "Order number")
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                sm: "2",
                                class: "text-center"
                              }, {
                                default: withCtx(() => [
                                  createVNode("span", { class: "text-caption" }, "address")
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                sm: "2",
                                class: "text-center"
                              }, {
                                default: withCtx(() => [
                                  createVNode("span", { class: "text-caption" }, "Amount")
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                sm: "2",
                                class: "text-center"
                              }, {
                                default: withCtx(() => [
                                  createVNode("span", { class: "text-caption" }, "Status")
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                sm: "1",
                                class: "text-center"
                              })
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VRow, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCol, {
                          cols: "12",
                          sm: "3",
                          class: ""
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VAvatar, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VImg, {
                                      src: _imports_0,
                                      alt: "John"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VImg, {
                                        src: _imports_0,
                                        alt: "John"
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`<span class="text-caption text-white ml-1" data-v-71b214c9${_scopeId4}>Jamsed Jhon</span>`);
                            } else {
                              return [
                                createVNode(VAvatar, null, {
                                  default: withCtx(() => [
                                    createVNode(VImg, {
                                      src: _imports_0,
                                      alt: "John"
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode("span", { class: "text-caption text-white ml-1" }, "Jamsed Jhon")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCol, {
                          cols: "12",
                          sm: "2",
                          class: "text-center mt-2"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<span class="text-caption text-white" data-v-71b214c9${_scopeId4}>0123595874</span>`);
                            } else {
                              return [
                                createVNode("span", { class: "text-caption text-white" }, "0123595874")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCol, {
                          cols: "12",
                          sm: "2",
                          class: "text-center mt-2"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<span class="text-caption text-white" data-v-71b214c9${_scopeId4}>Karking Teagha</span>`);
                            } else {
                              return [
                                createVNode("span", { class: "text-caption text-white" }, "Karking Teagha")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCol, {
                          cols: "12",
                          sm: "2",
                          class: "text-center mt-2"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<span class="text-caption text-white" data-v-71b214c9${_scopeId4}>$120.45</span>`);
                            } else {
                              return [
                                createVNode("span", { class: "text-caption text-white" }, "$120.45")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCol, {
                          cols: "12",
                          sm: "2",
                          class: "text-center"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VChip, {
                                variant: "flat",
                                color: "green"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Completed `);
                                  } else {
                                    return [
                                      createTextVNode(" Completed ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VChip, {
                                  variant: "flat",
                                  color: "green"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Completed ")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCol, {
                          cols: "12",
                          sm: "1",
                          class: "text-center"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCol, {
                            cols: "12",
                            sm: "3",
                            class: ""
                          }, {
                            default: withCtx(() => [
                              createVNode(VAvatar, null, {
                                default: withCtx(() => [
                                  createVNode(VImg, {
                                    src: _imports_0,
                                    alt: "John"
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode("span", { class: "text-caption text-white ml-1" }, "Jamsed Jhon")
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            sm: "2",
                            class: "text-center mt-2"
                          }, {
                            default: withCtx(() => [
                              createVNode("span", { class: "text-caption text-white" }, "0123595874")
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            sm: "2",
                            class: "text-center mt-2"
                          }, {
                            default: withCtx(() => [
                              createVNode("span", { class: "text-caption text-white" }, "Karking Teagha")
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            sm: "2",
                            class: "text-center mt-2"
                          }, {
                            default: withCtx(() => [
                              createVNode("span", { class: "text-caption text-white" }, "$120.45")
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            sm: "2",
                            class: "text-center"
                          }, {
                            default: withCtx(() => [
                              createVNode(VChip, {
                                variant: "flat",
                                color: "green"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Completed ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            sm: "1",
                            class: "text-center"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VRow, { class: "mt-n5" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCol, {
                          cols: "12",
                          sm: "3",
                          class: ""
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VAvatar, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VImg, {
                                      src: _imports_1,
                                      alt: "John"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VImg, {
                                        src: _imports_1,
                                        alt: "John"
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`<span class="text-caption text-white ml-1" data-v-71b214c9${_scopeId4}>Peter Poker</span>`);
                            } else {
                              return [
                                createVNode(VAvatar, null, {
                                  default: withCtx(() => [
                                    createVNode(VImg, {
                                      src: _imports_1,
                                      alt: "John"
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode("span", { class: "text-caption text-white ml-1" }, "Peter Poker")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCol, {
                          cols: "12",
                          sm: "2",
                          class: "text-center mt-2"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<span class="text-caption text-white" data-v-71b214c9${_scopeId4}>36258475</span>`);
                            } else {
                              return [
                                createVNode("span", { class: "text-caption text-white" }, "36258475")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCol, {
                          cols: "12",
                          sm: "2",
                          class: "text-center mt-2"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<span class="text-caption text-white" data-v-71b214c9${_scopeId4}>City 1 november</span>`);
                            } else {
                              return [
                                createVNode("span", { class: "text-caption text-white" }, "City 1 november")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCol, {
                          cols: "12",
                          sm: "2",
                          class: "text-center mt-2"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<span class="text-caption text-white" data-v-71b214c9${_scopeId4}>$140.45</span>`);
                            } else {
                              return [
                                createVNode("span", { class: "text-caption text-white" }, "$140.45")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCol, {
                          cols: "12",
                          sm: "2",
                          class: "text-center"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VChip, {
                                variant: "flat",
                                color: "orange"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Pending `);
                                  } else {
                                    return [
                                      createTextVNode(" Pending ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VChip, {
                                  variant: "flat",
                                  color: "orange"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Pending ")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCol, {
                          cols: "12",
                          sm: "1",
                          class: "text-center"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCol, {
                            cols: "12",
                            sm: "3",
                            class: ""
                          }, {
                            default: withCtx(() => [
                              createVNode(VAvatar, null, {
                                default: withCtx(() => [
                                  createVNode(VImg, {
                                    src: _imports_1,
                                    alt: "John"
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode("span", { class: "text-caption text-white ml-1" }, "Peter Poker")
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            sm: "2",
                            class: "text-center mt-2"
                          }, {
                            default: withCtx(() => [
                              createVNode("span", { class: "text-caption text-white" }, "36258475")
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            sm: "2",
                            class: "text-center mt-2"
                          }, {
                            default: withCtx(() => [
                              createVNode("span", { class: "text-caption text-white" }, "City 1 november")
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            sm: "2",
                            class: "text-center mt-2"
                          }, {
                            default: withCtx(() => [
                              createVNode("span", { class: "text-caption text-white" }, "$140.45")
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            sm: "2",
                            class: "text-center"
                          }, {
                            default: withCtx(() => [
                              createVNode(VChip, {
                                variant: "flat",
                                color: "orange"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Pending ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            sm: "1",
                            class: "text-center"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VTextField, {
                      density: "compact",
                      placeholder: "Search restaurant, Food, Cuisine or a Dish",
                      "append-inner-icon": "mdi-magnify",
                      variant: "outlined",
                      rounded: "",
                      class: "text-grey mx-8"
                    }),
                    createVNode(CatCarousel, {
                      items: _ctx.items,
                      dish: unref(dishes)[0]
                    }, null, 8, ["items", "dish"]),
                    createVNode(VToolbar, {
                      color: "transparent",
                      class: "pr-1 mt-n2"
                    }, {
                      default: withCtx(() => [
                        createVNode(VToolbarTitle, { class: "text-white" }, {
                          default: withCtx(() => [
                            createTextVNode("Popular Dishes")
                          ]),
                          _: 1
                        }),
                        createVNode(VSpacer),
                        createVNode("span", { class: "text-caption text-white" }, "View More"),
                        createVNode(VBtn, {
                          density: "compact",
                          icon: "i-material-symbols-chevron-right-box",
                          color: "grey"
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("h6", { class: "text-white ml-4 mt-n4" }, [
                      createVNode("span", { class: "text-red" }, "20+ new "),
                      createTextVNode(" dishes added this week ")
                    ]),
                    createVNode("div", {
                      class: "d-flex flex-wrap justify-space-evenly mt-4",
                      color: "transparent"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(dishes), (dish2, i) => {
                        return openBlock(), createBlock(DishCard, {
                          key: i,
                          dish: dish2
                        }, null, 8, ["dish"]);
                      }), 128))
                    ]),
                    createVNode(VToolbar, {
                      color: "transparent",
                      class: "pr-1 mt-n2"
                    }, {
                      default: withCtx(() => [
                        createVNode(VToolbarTitle, { class: "text-white" }, {
                          default: withCtx(() => [
                            createTextVNode("Order Reports")
                          ]),
                          _: 1
                        }),
                        createVNode(VSpacer),
                        createVNode("span", { class: "text-caption text-white" }, "View all"),
                        createVNode(VBtn, {
                          density: "compact",
                          icon: "i-material-symbols-chevron-right-box",
                          color: "grey"
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("h6", { class: "text-white ml-4 mt-n4" }, [
                      createVNode("span", { class: "text-red" }, "Wow 100+ new "),
                      createTextVNode(" Order got this week ")
                    ]),
                    createVNode(VCard, {
                      class: "rounded-xl ma-2 pa-1",
                      color: "#424343"
                    }, {
                      default: withCtx(() => [
                        createVNode(VRow, null, {
                          default: withCtx(() => [
                            createVNode(VCol, {
                              cols: "12",
                              sm: "1"
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              sm: "2",
                              class: "text-center"
                            }, {
                              default: withCtx(() => [
                                createVNode("span", { class: "text-caption" }, "Customer")
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              sm: "2",
                              class: "text-center"
                            }, {
                              default: withCtx(() => [
                                createVNode("span", { class: "text-caption" }, "Order number")
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              sm: "2",
                              class: "text-center"
                            }, {
                              default: withCtx(() => [
                                createVNode("span", { class: "text-caption" }, "address")
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              sm: "2",
                              class: "text-center"
                            }, {
                              default: withCtx(() => [
                                createVNode("span", { class: "text-caption" }, "Amount")
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              sm: "2",
                              class: "text-center"
                            }, {
                              default: withCtx(() => [
                                createVNode("span", { class: "text-caption" }, "Status")
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              sm: "1",
                              class: "text-center"
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VRow, null, {
                      default: withCtx(() => [
                        createVNode(VCol, {
                          cols: "12",
                          sm: "3",
                          class: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(VAvatar, null, {
                              default: withCtx(() => [
                                createVNode(VImg, {
                                  src: _imports_0,
                                  alt: "John"
                                })
                              ]),
                              _: 1
                            }),
                            createVNode("span", { class: "text-caption text-white ml-1" }, "Jamsed Jhon")
                          ]),
                          _: 1
                        }),
                        createVNode(VCol, {
                          cols: "12",
                          sm: "2",
                          class: "text-center mt-2"
                        }, {
                          default: withCtx(() => [
                            createVNode("span", { class: "text-caption text-white" }, "0123595874")
                          ]),
                          _: 1
                        }),
                        createVNode(VCol, {
                          cols: "12",
                          sm: "2",
                          class: "text-center mt-2"
                        }, {
                          default: withCtx(() => [
                            createVNode("span", { class: "text-caption text-white" }, "Karking Teagha")
                          ]),
                          _: 1
                        }),
                        createVNode(VCol, {
                          cols: "12",
                          sm: "2",
                          class: "text-center mt-2"
                        }, {
                          default: withCtx(() => [
                            createVNode("span", { class: "text-caption text-white" }, "$120.45")
                          ]),
                          _: 1
                        }),
                        createVNode(VCol, {
                          cols: "12",
                          sm: "2",
                          class: "text-center"
                        }, {
                          default: withCtx(() => [
                            createVNode(VChip, {
                              variant: "flat",
                              color: "green"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Completed ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(VCol, {
                          cols: "12",
                          sm: "1",
                          class: "text-center"
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VRow, { class: "mt-n5" }, {
                      default: withCtx(() => [
                        createVNode(VCol, {
                          cols: "12",
                          sm: "3",
                          class: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(VAvatar, null, {
                              default: withCtx(() => [
                                createVNode(VImg, {
                                  src: _imports_1,
                                  alt: "John"
                                })
                              ]),
                              _: 1
                            }),
                            createVNode("span", { class: "text-caption text-white ml-1" }, "Peter Poker")
                          ]),
                          _: 1
                        }),
                        createVNode(VCol, {
                          cols: "12",
                          sm: "2",
                          class: "text-center mt-2"
                        }, {
                          default: withCtx(() => [
                            createVNode("span", { class: "text-caption text-white" }, "36258475")
                          ]),
                          _: 1
                        }),
                        createVNode(VCol, {
                          cols: "12",
                          sm: "2",
                          class: "text-center mt-2"
                        }, {
                          default: withCtx(() => [
                            createVNode("span", { class: "text-caption text-white" }, "City 1 november")
                          ]),
                          _: 1
                        }),
                        createVNode(VCol, {
                          cols: "12",
                          sm: "2",
                          class: "text-center mt-2"
                        }, {
                          default: withCtx(() => [
                            createVNode("span", { class: "text-caption text-white" }, "$140.45")
                          ]),
                          _: 1
                        }),
                        createVNode(VCol, {
                          cols: "12",
                          sm: "2",
                          class: "text-center"
                        }, {
                          default: withCtx(() => [
                            createVNode(VChip, {
                              variant: "flat",
                              color: "orange"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Pending ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(VCol, {
                          cols: "12",
                          sm: "1",
                          class: "text-center"
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCol, {
              cols: "12",
              md: "6",
              sm: "12"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(Checkout, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(Checkout)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCol, {
                cols: "12",
                sm: "12",
                md: "6"
              }, {
                default: withCtx(() => [
                  createVNode(VTextField, {
                    density: "compact",
                    placeholder: "Search restaurant, Food, Cuisine or a Dish",
                    "append-inner-icon": "mdi-magnify",
                    variant: "outlined",
                    rounded: "",
                    class: "text-grey mx-8"
                  }),
                  createVNode(CatCarousel, {
                    items: _ctx.items,
                    dish: unref(dishes)[0]
                  }, null, 8, ["items", "dish"]),
                  createVNode(VToolbar, {
                    color: "transparent",
                    class: "pr-1 mt-n2"
                  }, {
                    default: withCtx(() => [
                      createVNode(VToolbarTitle, { class: "text-white" }, {
                        default: withCtx(() => [
                          createTextVNode("Popular Dishes")
                        ]),
                        _: 1
                      }),
                      createVNode(VSpacer),
                      createVNode("span", { class: "text-caption text-white" }, "View More"),
                      createVNode(VBtn, {
                        density: "compact",
                        icon: "i-material-symbols-chevron-right-box",
                        color: "grey"
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("h6", { class: "text-white ml-4 mt-n4" }, [
                    createVNode("span", { class: "text-red" }, "20+ new "),
                    createTextVNode(" dishes added this week ")
                  ]),
                  createVNode("div", {
                    class: "d-flex flex-wrap justify-space-evenly mt-4",
                    color: "transparent"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(dishes), (dish2, i) => {
                      return openBlock(), createBlock(DishCard, {
                        key: i,
                        dish: dish2
                      }, null, 8, ["dish"]);
                    }), 128))
                  ]),
                  createVNode(VToolbar, {
                    color: "transparent",
                    class: "pr-1 mt-n2"
                  }, {
                    default: withCtx(() => [
                      createVNode(VToolbarTitle, { class: "text-white" }, {
                        default: withCtx(() => [
                          createTextVNode("Order Reports")
                        ]),
                        _: 1
                      }),
                      createVNode(VSpacer),
                      createVNode("span", { class: "text-caption text-white" }, "View all"),
                      createVNode(VBtn, {
                        density: "compact",
                        icon: "i-material-symbols-chevron-right-box",
                        color: "grey"
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("h6", { class: "text-white ml-4 mt-n4" }, [
                    createVNode("span", { class: "text-red" }, "Wow 100+ new "),
                    createTextVNode(" Order got this week ")
                  ]),
                  createVNode(VCard, {
                    class: "rounded-xl ma-2 pa-1",
                    color: "#424343"
                  }, {
                    default: withCtx(() => [
                      createVNode(VRow, null, {
                        default: withCtx(() => [
                          createVNode(VCol, {
                            cols: "12",
                            sm: "1"
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            sm: "2",
                            class: "text-center"
                          }, {
                            default: withCtx(() => [
                              createVNode("span", { class: "text-caption" }, "Customer")
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            sm: "2",
                            class: "text-center"
                          }, {
                            default: withCtx(() => [
                              createVNode("span", { class: "text-caption" }, "Order number")
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            sm: "2",
                            class: "text-center"
                          }, {
                            default: withCtx(() => [
                              createVNode("span", { class: "text-caption" }, "address")
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            sm: "2",
                            class: "text-center"
                          }, {
                            default: withCtx(() => [
                              createVNode("span", { class: "text-caption" }, "Amount")
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            sm: "2",
                            class: "text-center"
                          }, {
                            default: withCtx(() => [
                              createVNode("span", { class: "text-caption" }, "Status")
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            sm: "1",
                            class: "text-center"
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VRow, null, {
                    default: withCtx(() => [
                      createVNode(VCol, {
                        cols: "12",
                        sm: "3",
                        class: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(VAvatar, null, {
                            default: withCtx(() => [
                              createVNode(VImg, {
                                src: _imports_0,
                                alt: "John"
                              })
                            ]),
                            _: 1
                          }),
                          createVNode("span", { class: "text-caption text-white ml-1" }, "Jamsed Jhon")
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, {
                        cols: "12",
                        sm: "2",
                        class: "text-center mt-2"
                      }, {
                        default: withCtx(() => [
                          createVNode("span", { class: "text-caption text-white" }, "0123595874")
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, {
                        cols: "12",
                        sm: "2",
                        class: "text-center mt-2"
                      }, {
                        default: withCtx(() => [
                          createVNode("span", { class: "text-caption text-white" }, "Karking Teagha")
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, {
                        cols: "12",
                        sm: "2",
                        class: "text-center mt-2"
                      }, {
                        default: withCtx(() => [
                          createVNode("span", { class: "text-caption text-white" }, "$120.45")
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, {
                        cols: "12",
                        sm: "2",
                        class: "text-center"
                      }, {
                        default: withCtx(() => [
                          createVNode(VChip, {
                            variant: "flat",
                            color: "green"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Completed ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, {
                        cols: "12",
                        sm: "1",
                        class: "text-center"
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VRow, { class: "mt-n5" }, {
                    default: withCtx(() => [
                      createVNode(VCol, {
                        cols: "12",
                        sm: "3",
                        class: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(VAvatar, null, {
                            default: withCtx(() => [
                              createVNode(VImg, {
                                src: _imports_1,
                                alt: "John"
                              })
                            ]),
                            _: 1
                          }),
                          createVNode("span", { class: "text-caption text-white ml-1" }, "Peter Poker")
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, {
                        cols: "12",
                        sm: "2",
                        class: "text-center mt-2"
                      }, {
                        default: withCtx(() => [
                          createVNode("span", { class: "text-caption text-white" }, "36258475")
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, {
                        cols: "12",
                        sm: "2",
                        class: "text-center mt-2"
                      }, {
                        default: withCtx(() => [
                          createVNode("span", { class: "text-caption text-white" }, "City 1 november")
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, {
                        cols: "12",
                        sm: "2",
                        class: "text-center mt-2"
                      }, {
                        default: withCtx(() => [
                          createVNode("span", { class: "text-caption text-white" }, "$140.45")
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, {
                        cols: "12",
                        sm: "2",
                        class: "text-center"
                      }, {
                        default: withCtx(() => [
                          createVNode(VChip, {
                            variant: "flat",
                            color: "orange"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Pending ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, {
                        cols: "12",
                        sm: "1",
                        class: "text-center"
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VCol, {
                cols: "12",
                md: "6",
                sm: "12"
              }, {
                default: withCtx(() => [
                  createVNode(Checkout)
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-71b214c9"]]);

export { index as default };
