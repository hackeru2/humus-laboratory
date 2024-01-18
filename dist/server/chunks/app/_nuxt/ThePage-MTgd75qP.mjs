import __nuxt_component_0 from './Icon-x9auxwcP.mjs';
import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
import './index-fUe8j3v4.mjs';
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
import '../server.mjs';
import '../../index3.mjs';
import '@unhead/shared';
import 'vue-router';
import 'consola/core';
import '@iconify/vue/dist/offline';
import '@iconify/vue';
import './_plugin-vue_export-helper-yVxbj29m.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "ThePage",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    summary: {
      type: String,
      default: ""
    },
    fromBg: {
      type: String,
      default: "#8B5CF6"
    },
    toBg: {
      type: String,
      default: "#D946EF"
    },
    image: {
      type: String,
      default: ""
    },
    logo: {
      type: String,
      default: "i-vscode-icons:file-type-coffeelint"
    },
    author: {
      type: String,
      default: "Pinegrow"
    },
    twitter: {
      type: String,
      default: "@vuedesigner"
    }
  },
  setup(__props) {
    const props = __props;
    const backgroundImage = computed(() => {
      return {
        "background-image": `linear-gradient(
        to right,
        ${props.fromBg},
        ${props.toBg}
      );`
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "rounded-3xl w-full",
        style: unref(backgroundImage)
      }, _attrs))}><div class="flex flex-row h-full pl-6 py-6 w-full"><div class="flex flex-col w-1/2"><div data-pg-name="Logo" class="flex flex-row items-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: __props.logo,
        size: "72",
        class: "mt-4"
      }, null, _parent));
      _push(`<span class="text-white font-extrabold ml-2 mt-4 p-4 text-6xl">${ssrInterpolate(__props.title)}</span></div><h5 class="mt-8 p-4 text-white text-4xl" style="${ssrRenderStyle({ "white-space": "normal" })}"><span>${ssrInterpolate(__props.description)}</span></h5>`);
      if (__props.summary) {
        _push(`<h5 class="mt-2 p-4 text-white text-2xl" style="${ssrRenderStyle({ "white-space": "normal" })}">${ssrInterpolate(__props.summary)}</h5>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.twitter) {
        _push(`<div class="flex flex-row items-center mt-auto">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "logos:twitter",
          size: "32"
        }, null, _parent));
        _push(`<span class="ml-3 text-2xl text-white">${ssrInterpolate(__props.twitter)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="-my-6 w-1/2"><img cover${ssrRenderAttr("src", __props.image)} height="630" width="630" class="h-full rounded-r-3xl w-full"></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/OgImage/ThePage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
