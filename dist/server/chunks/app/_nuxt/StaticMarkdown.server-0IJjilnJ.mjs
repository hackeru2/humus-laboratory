import _sfc_main$1 from './ContentRenderer-YBpt4f7p.mjs';
import { u as useAsyncData } from './asyncData-dZ4Ck6yU.mjs';
import { q as queryContent } from './query-SikIwG9o.mjs';
import { i as useServerHead, h as useHead } from '../server.mjs';
import { defineComponent, withAsyncContext, mergeProps, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import './ContentRendererMarkdown-fpzIxd3r.mjs';
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
import 'property-information';
import './preview-XkkWx2PZ.mjs';
import '../../index3.mjs';
import '@unhead/shared';
import 'vue-router';
import 'consola/core';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "StaticMarkdown.server",
  __ssrInlineRender: true,
  props: {
    base: {
      type: String,
      default: "/"
    },
    path: {
      type: String,
      required: true
    }
  },
  async setup(__props) {
    let __temp, __restore;
    const { base, path } = __props;
    const { data: post } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(path, () => {
      return queryContent(base, path).findOne();
    }, "$JRIpHqKPZp")), __temp = await __temp, __restore(), __temp);
    useServerHead({
      meta: [
        { name: "description", content: () => {
          var _a;
          return (_a = post.value) == null ? void 0 : _a.title;
        } }
      ]
    });
    useHead({
      title: () => {
        var _a;
        return (_a = post.value) == null ? void 0 : _a.title;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ContentRenderer = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "post",
        class: "dark:prose-invert dark:prose-gray-100 flex flex-col heading-offset max-w-none prose prose-gray-800 rounded-lg"
      }, _attrs))}>`);
      _push(ssrRenderComponent(_component_ContentRenderer, {
        id: "content",
        value: unref(post)
      }, {
        empty: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p${_scopeId}>No content found.</p>`);
          } else {
            return [
              createVNode("p", null, "No content found.")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/StaticMarkdown.server.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
