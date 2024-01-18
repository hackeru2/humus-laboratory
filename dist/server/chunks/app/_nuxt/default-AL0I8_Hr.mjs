import { m as makeLayoutItemProps, u as useLayoutItem, b as makeLayoutProps, c as createLayout, d as useLayout, _ as __nuxt_component_0, e as __nuxt_component_1 } from './MobileNav-m4-oxc0J.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-k6M4BS-g.mjs';
import { toRef, shallowRef, computed, createVNode, defineComponent, withCtx, unref, createTextVNode, toDisplayString, renderSlot, useSSRContext, ref, watchEffect, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-yVxbj29m.mjs';
import { p as propsFactory, q as makeBorderProps, m as makeComponentProps, r as makeElevationProps, s as makeRoundedProps, a as makeTagProps, t as makeThemeProps, g as genericComponent, z as provideTheme, v as useBackgroundColor, w as useBorder, x as useElevation, y as useRounded, L as useResizeObserver, b as useRender, C as convertToUnit, u as useRtl, W as useNuxtApp, n as VIcon } from '../server.mjs';
import { V as VCard } from './VCard-Ufe3nPRD.mjs';
import { u as useSsrBoot } from './scopeId-RSGnEtwA.mjs';
import '../../handlers/renderer.mjs';
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

const makeVFooterProps = propsFactory({
  app: Boolean,
  color: String,
  height: {
    type: [Number, String],
    default: "auto"
  },
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeElevationProps(),
  ...makeLayoutItemProps(),
  ...makeRoundedProps(),
  ...makeTagProps({
    tag: "footer"
  }),
  ...makeThemeProps()
}, "VFooter");
const VFooter = genericComponent()({
  name: "VFooter",
  props: makeVFooterProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
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
    const autoHeight = shallowRef(32);
    const {
      resizeRef
    } = useResizeObserver();
    const height = computed(() => props.height === "auto" ? autoHeight.value : parseInt(props.height, 10));
    const {
      layoutItemStyles
    } = useLayoutItem({
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position: computed(() => "bottom"),
      layoutSize: height,
      elementSize: computed(() => props.height === "auto" ? void 0 : height.value),
      active: computed(() => props.app),
      absolute: toRef(props, "absolute")
    });
    useRender(() => createVNode(props.tag, {
      "ref": resizeRef,
      "class": ["v-footer", themeClasses.value, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, roundedClasses.value, props.class],
      "style": [backgroundColorStyles.value, props.app ? layoutItemStyles.value : {
        height: convertToUnit(props.height)
      }, props.style]
    }, slots));
    return {};
  }
});
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0$1;
  _push(ssrRenderComponent(VFooter, mergeProps({
    name: "footer",
    class: "pb-24 pt-12"
  }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="container mx-auto px-8"${_scopeId}><div class="flex flex-wrap justify-center space-x-8"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_NuxtLink, {
          href: "https://www.facebook.com/vuedesigner",
          "aria-label": "facebook",
          external: "",
          target: "_blank"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VIcon, {
                icon: "i-logos-facebook",
                class: "text-2xl"
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(VIcon, {
                  icon: "i-logos-facebook",
                  class: "text-2xl"
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_NuxtLink, {
          href: "https://twitter.com/vuedesigner",
          "aria-label": "twitter",
          external: "",
          target: "_blank"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VIcon, {
                icon: "i-logos-twitter",
                class: "text-2xl"
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(VIcon, {
                  icon: "i-logos-twitter",
                  class: "text-2xl"
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_NuxtLink, {
          href: "https://discord.gg/BYp45Nnu5T",
          "aria-label": "discord",
          external: "",
          target: "_blank"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VIcon, {
                icon: "i-logos-discord-icon",
                class: "text-2xl"
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(VIcon, {
                  icon: "i-logos-discord-icon",
                  class: "text-2xl"
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_NuxtLink, {
          href: "https://www.youtube.com/@vuedesigner",
          "aria-label": "youtube",
          external: "",
          target: "_blank"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VIcon, {
                icon: "i-logos-youtube-icon",
                class: "text-2xl"
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(VIcon, {
                  icon: "i-logos-youtube-icon",
                  class: "text-2xl"
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</div></div>`);
      } else {
        return [
          createVNode("div", { class: "container mx-auto px-8" }, [
            createVNode("div", { class: "flex flex-wrap justify-center space-x-8" }, [
              createVNode(_component_NuxtLink, {
                href: "https://www.facebook.com/vuedesigner",
                "aria-label": "facebook",
                external: "",
                target: "_blank"
              }, {
                default: withCtx(() => [
                  createVNode(VIcon, {
                    icon: "i-logos-facebook",
                    class: "text-2xl"
                  })
                ]),
                _: 1
              }),
              createVNode(_component_NuxtLink, {
                href: "https://twitter.com/vuedesigner",
                "aria-label": "twitter",
                external: "",
                target: "_blank"
              }, {
                default: withCtx(() => [
                  createVNode(VIcon, {
                    icon: "i-logos-twitter",
                    class: "text-2xl"
                  })
                ]),
                _: 1
              }),
              createVNode(_component_NuxtLink, {
                href: "https://discord.gg/BYp45Nnu5T",
                "aria-label": "discord",
                external: "",
                target: "_blank"
              }, {
                default: withCtx(() => [
                  createVNode(VIcon, {
                    icon: "i-logos-discord-icon",
                    class: "text-2xl"
                  })
                ]),
                _: 1
              }),
              createVNode(_component_NuxtLink, {
                href: "https://www.youtube.com/@vuedesigner",
                "aria-label": "youtube",
                external: "",
                target: "_blank"
              }, {
                default: withCtx(() => [
                  createVNode(VIcon, {
                    icon: "i-logos-youtube-icon",
                    class: "text-2xl"
                  })
                ]),
                _: 1
              })
            ])
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("my-nuxt-vuetify-tailwindcss-layer/components/TheFooter.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
function useVuetifyBreakpoint() {
  const smAndDown = ref(false);
  const { $vuetify } = useNuxtApp();
  if ($vuetify) {
    watchEffect(() => {
      smAndDown.value = $vuetify.display.smAndDown;
    });
  }
  return { smAndDown };
}
const makeVAppProps = propsFactory({
  ...makeComponentProps(),
  ...makeLayoutProps({
    fullHeight: true
  }),
  ...makeThemeProps()
}, "VApp");
const VApp = genericComponent()({
  name: "VApp",
  props: makeVAppProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const theme = provideTheme(props);
    const {
      layoutClasses,
      getLayoutItem,
      items,
      layoutRef
    } = createLayout(props);
    const {
      rtlClasses
    } = useRtl();
    useRender(() => {
      var _a;
      return createVNode("div", {
        "ref": layoutRef,
        "class": ["v-application", theme.themeClasses.value, layoutClasses.value, rtlClasses.value, props.class],
        "style": [props.style]
      }, [createVNode("div", {
        "class": "v-application__wrap"
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)])]);
    });
    return {
      getLayoutItem,
      items,
      theme
    };
  }
});
const makeVMainProps = propsFactory({
  scrollable: Boolean,
  ...makeComponentProps(),
  ...makeTagProps({
    tag: "main"
  })
}, "VMain");
const VMain = genericComponent()({
  name: "VMain",
  props: makeVMainProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      mainStyles
    } = useLayout();
    const {
      ssrBootStyles
    } = useSsrBoot();
    useRender(() => createVNode(props.tag, {
      "class": ["v-main", {
        "v-main--scrollable": props.scrollable
      }, props.class],
      "style": [mainStyles.value, ssrBootStyles.value, props.style]
    }, {
      default: () => {
        var _a, _b;
        return [props.scrollable ? createVNode("div", {
          "class": "v-main__scroller"
        }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]) : (_b = slots.default) == null ? void 0 : _b.call(slots)];
      }
    }));
    return {};
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const display = useVuetifyBreakpoint();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_mobile_nav = __nuxt_component_0;
      const _component_SideBar = __nuxt_component_1;
      const _component_TheFooter = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(VApp, {
        id: "inspire",
        style: { background: _ctx.$vuetify.theme.themes.light.colors.primary }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, { class: "text-white mx-auto" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate((unref(display), _ctx.$nuxt.$vuetify.display.width))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString((unref(display), _ctx.$nuxt.$vuetify.display.width)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_mobile_nav, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_SideBar, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(VMain, { class: "py-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "default")
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_TheFooter, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCard, { class: "text-white mx-auto" }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString((unref(display), _ctx.$nuxt.$vuetify.display.width)), 1)
                ]),
                _: 1
              }),
              createVNode(_component_mobile_nav),
              createVNode(_component_SideBar),
              createVNode(VMain, { class: "py-4" }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              }),
              createVNode(_component_TheFooter)
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
