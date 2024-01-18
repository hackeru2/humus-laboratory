import { defineComponent, ref, computed, getCurrentInstance, toRaw, createVNode, withMemo, Fragment, h, createStaticVNode, Teleport, withCtx, unref, renderSlot, useSSRContext, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-yVxbj29m.mjs';
import { l as hash, E as withQuery, j as joinURL } from '../../nitro/node-server.mjs';
import { T as selectiveClient, U as useRequestEvent, h as useHead, f as useRoute$1, i as useServerHead, k as VBtn, W as useNuxtApp, Z as site, Y as useRuntimeConfig } from '../server.mjs';
import nodeCrypto from 'node:crypto';
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

nodeCrypto.webcrypto?.subtle || {};
const randomUUID = () => {
  return nodeCrypto.randomUUID();
};

const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({ ref: "header" }, _attrs))}><div class="relative bg-primary-600 dark:bg-primary-200 text-white dark:text-primary-800 w-screen"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="h-72 bg-primary-600 dark:bg-primary-200 text-white dark:text-neutral-950 w-full" fill="currentColor" preserveAspectRatio="none"><path fill-opacity="1" d="M0,160L48,181.3C96,203,192,245,288,261.3C384,277,480,267,576,245.3C672,224,768,192,864,192C960,192,1056,224,1152,218.7C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg><div class="absolute left-10 top-10 sm:left-20">`);
  ssrRenderSlot(_ctx.$slots, "default", {}, () => {
    _push(`Header`);
  }, _push, _parent);
  _push(`</div></div></section>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TheHeader.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const pKey = "_islandPromises";
const SSR_UID_RE = /data-island-uid="([^"]*)"/;
const DATA_ISLAND_UID_RE = /data-island-uid(="")?(?!="[^"])/g;
const SLOTNAME_RE = /data-island-slot="([^"]*)"/g;
const SLOT_FALLBACK_RE = / data-island-slot="([^"]*)"[^>]*>/g;
const getId = randomUUID;
const NuxtIsland = defineComponent({
  name: "NuxtIsland",
  props: {
    name: {
      type: String,
      required: true
    },
    lazy: Boolean,
    props: {
      type: Object,
      default: () => void 0
    },
    context: {
      type: Object,
      default: () => ({})
    },
    source: {
      type: String,
      default: () => void 0
    },
    dangerouslyLoadClientComponents: {
      type: Boolean,
      default: false
    }
  },
  async setup(props, { slots, expose }) {
    var _a2, _b2, _c2;
    var _a, _b, _c;
    let canTeleport = true;
    const teleportKey = ref(0);
    const key = ref(0);
    computed(() => selectiveClient);
    const error = ref(null);
    const config = useRuntimeConfig();
    const nuxtApp = useNuxtApp();
    const filteredProps = computed(() => props.props ? Object.fromEntries(Object.entries(props.props).filter(([key2]) => !key2.startsWith("data-v-"))) : {});
    const hashId = computed(() => hash([props.name, filteredProps.value, props.context, props.source]));
    getCurrentInstance();
    const event = useRequestEvent();
    const eventFetch = event.fetch;
    ref(false);
    function setPayload(key2, result) {
      nuxtApp.payload.data[key2] = {
        __nuxt_island: {
          key: key2,
          ...{ params: { ...props.context, props: props.props ? JSON.stringify(props.props) : void 0 } },
          result: {
            props: result.props,
            slots: result.slots,
            components: result.components
          }
        },
        ...result
      };
    }
    const payloadSlots = {};
    const payloadComponents = {};
    if (nuxtApp.isHydrating) {
      Object.assign(payloadSlots, (_a2 = (_a = toRaw(nuxtApp.payload.data[`${props.name}_${hashId.value}`])) == null ? void 0 : _a.slots) != null ? _a2 : {});
      Object.assign(payloadComponents, (_b2 = (_b = toRaw(nuxtApp.payload.data[`${props.name}_${hashId.value}`])) == null ? void 0 : _b.components) != null ? _b2 : {});
    }
    const ssrHTML = ref("");
    const uid = ref((_c2 = (_c = ssrHTML.value.match(SSR_UID_RE)) == null ? void 0 : _c[1]) != null ? _c2 : getId());
    const availableSlots = computed(() => [...ssrHTML.value.matchAll(SLOTNAME_RE)].map((m) => m[1]));
    const html = computed(() => {
      const currentSlots = Object.keys(slots);
      let html2 = ssrHTML.value;
      return html2.replaceAll(SLOT_FALLBACK_RE, (full, slotName) => {
        var _a22;
        if (!currentSlots.includes(slotName)) {
          return full + ((_a22 = payloadSlots[slotName]) == null ? void 0 : _a22.fallback);
        }
        return full;
      });
    });
    const cHead = ref({ link: [], style: [] });
    useHead(cHead);
    async function _fetchComponent(force = false) {
      var _a3;
      var _a22;
      const key2 = `${props.name}_${hashId.value}`;
      if (((_a22 = nuxtApp.payload.data[key2]) == null ? void 0 : _a22.html) && !force) {
        return nuxtApp.payload.data[key2];
      }
      const url = `/__nuxt_island/${key2}.json`;
      const r = await eventFetch(withQuery(props.source ? url : joinURL((_a3 = config.app.baseURL) != null ? _a3 : "", url), {
        ...props.context,
        props: props.props ? JSON.stringify(props.props) : void 0
      }));
      const result = await r.json();
      setPayload(key2, result);
      return result;
    }
    async function fetchComponent(force = false) {
      nuxtApp[pKey] = nuxtApp[pKey] || {};
      if (!nuxtApp[pKey][uid.value]) {
        nuxtApp[pKey][uid.value] = _fetchComponent(force).finally(() => {
          delete nuxtApp[pKey][uid.value];
        });
      }
      try {
        const res = await nuxtApp[pKey][uid.value];
        cHead.value.link = res.head.link;
        cHead.value.style = res.head.style;
        ssrHTML.value = res.html.replaceAll(DATA_ISLAND_UID_RE, `data-island-uid="${uid.value}"`);
        key.value++;
        error.value = null;
        Object.assign(payloadSlots, res.slots || {});
        Object.assign(payloadComponents, res.components || {});
        if (selectiveClient && false)
          ;
        if (false)
          ;
      } catch (e) {
        error.value = e;
      }
    }
    expose({
      refresh: () => fetchComponent(true)
    });
    {
      await fetchComponent();
    }
    return (_ctx, _cache) => {
      var _a3;
      var _a22;
      if (!html.value || error.value) {
        return [(_a3 = (_a22 = slots.fallback) == null ? void 0 : _a22.call(slots, { error: error.value })) != null ? _a3 : createVNode("div")];
      }
      return [
        withMemo([key.value], () => {
          return createVNode(Fragment, { key: key.value }, [h(createStaticVNode(html.value || "<div></div>", 1))]);
        }, _cache, 0),
        // should away be triggered ONE tick after re-rendering the static node
        withMemo([teleportKey.value], () => {
          const teleports = [];
          teleportKey.value === 0 || !!(teleportKey.value && !(teleportKey.value % 2));
          if (uid.value && html.value && canTeleport) {
            for (const slot in slots) {
              if (availableSlots.value.includes(slot)) {
                teleports.push(
                  createVNode(
                    Teleport,
                    // use different selectors for even and odd teleportKey to force trigger the teleport
                    { to: `uid=${uid.value};slot=${slot}` },
                    { default: () => {
                      var _a32;
                      return (((_a32 = payloadSlots[slot].props) == null ? void 0 : _a32.length) ? payloadSlots[slot].props : [{}]).map((data) => {
                        var _a4;
                        return (_a4 = slots[slot]) == null ? void 0 : _a4.call(slots, data);
                      });
                    } }
                  )
                );
              }
            }
            {
              for (const [id2, info] of Object.entries(payloadComponents != null ? payloadComponents : {})) {
                const { html: html2 } = info;
                teleports.push(createVNode(Teleport, { to: `uid=${uid.value};client=${id2}` }, {
                  default: () => [createStaticVNode(html2, 1)]
                }));
              }
            }
          }
          return h(Fragment, teleports);
        }, _cache, 1)
      ];
    };
  }
});
const createServerComponent = /* @__NO_SIDE_EFFECTS__ */ (name) => {
  return defineComponent({
    name,
    inheritAttrs: false,
    props: { lazy: Boolean },
    setup(props, { attrs, slots, expose }) {
      const islandRef = ref(null);
      expose({
        refresh: () => {
          var _a;
          return (_a = islandRef.value) == null ? void 0 : _a.refresh();
        }
      });
      return () => {
        return h(NuxtIsland, {
          name,
          lazy: props.lazy,
          props: attrs,
          ref: islandRef
        }, slots);
      };
    }
  });
};
const __nuxt_component_1 = /* @__PURE__ */ createServerComponent("StaticMarkdown");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[...slug]",
  __ssrInlineRender: true,
  setup(__props) {
    const { github } = site;
    const slug = useRoute$1().params.slug.toString().replace(/,/g, "/") || useRoute$1().name.toString().replace(/,/g, "/");
    useServerHead({
      meta: [
        { name: "description", content: () => slug || "" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TheHeader = __nuxt_component_0;
      const _component_StaticMarkdown = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_TheHeader, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}><div class="flex items-center"${_scopeId}><h2 class="text-5xl font-semibold"${_scopeId}>Quick Start</h2></div><div class="flex items-center mt-4"${_scopeId}><h6${_scopeId}>Github repo for this template</h6>`);
            _push2(ssrRenderComponent(VBtn, {
              size: "small",
              class: "ml-2",
              color: "secondary",
              href: unref(github),
              target: "_blank"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="text-sm text-subtitle-2"${_scopeId2}>Click here</span>`);
                } else {
                  return [
                    createVNode("span", { class: "text-sm text-subtitle-2" }, "Click here")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode("div", { class: "flex items-center" }, [
                  createVNode("h2", { class: "text-5xl font-semibold" }, "Quick Start")
                ]),
                createVNode("div", { class: "flex items-center mt-4" }, [
                  createVNode("h6", null, "Github repo for this template"),
                  createVNode(VBtn, {
                    size: "small",
                    class: "ml-2",
                    color: "secondary",
                    href: unref(github),
                    target: "_blank"
                  }, {
                    default: withCtx(() => [
                      createVNode("span", { class: "text-sm text-subtitle-2" }, "Click here")
                    ]),
                    _: 1
                  }, 8, ["href"])
                ]),
                renderSlot(_ctx.$slots, "default")
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`<section class="container mx-auto"><div class="px-10 w-full"><div class="flex flex-col rounded-lg"><article class="dark:xl:divide-gray-700 xl:divide-gray-200 xl:divide-y"><div class="dark:divide-gray-700 divide-gray-200 divide-y pb-16 xl:divide-y-0 xl:gap-x-10 xl:grid xl:grid-cols-4 xl:pb-20 xl:sticky" style="${ssrRenderStyle({ "grid-template-rows": "auto 1fr" })}"><div class="dark:divide-gray-700 divide-gray-200 divide-y xl:col-span-3 xl:pb-0 xl:row-span-2">`);
      _push(ssrRenderComponent(_component_StaticMarkdown, { path: unref(slug) }, null, _parent));
      _push(`</div></div></article></div></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/quick-start/[...slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
