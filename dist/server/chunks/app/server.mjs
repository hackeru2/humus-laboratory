import { hasInjectionContext, getCurrentInstance as getCurrentInstance$1, version as version$1, ref, watchEffect, watch, inject as inject$1, toRef, isRef, defineAsyncComponent, reactive, computed, toRefs, isVNode, Comment, Fragment, warn, unref, provide, defineComponent as defineComponent$1, capitalize, camelize, h, createVNode, mergeProps, onScopeDispose, toRaw, readonly, Text, Transition, resolveDynamicComponent, withDirectives, resolveDirective, vShow, shallowRef, nextTick, createTextVNode, useSSRContext, shallowReactive, Suspense, effectScope, TransitionGroup, withCtx, createApp, isReactive, onErrorCaptured, onServerPrefetch, getCurrentScope, toDisplayString, openBlock, createBlock, createCommentVNode, isReadonly, markRaw, toValue, isShallow } from 'vue';
import { h as useRuntimeConfig$1, $ as $fetch, E as withQuery, N as hasProtocol, p as parseURL, O as isScriptProtocol, j as joinURL, c as createError$1, P as klona, Q as parse, R as getRequestHeader, B as defu, S as sanitizeStatusCode, n as destr, T as isEqual$1, U as setCookie, V as getCookie, W as deleteCookie, X as encodeParam, M as createHooks, z as toRouteMatcher, A as createRouter, w as withoutTrailingSlash, C as withoutBase, Y as join, Z as basename, _ as dirname, a0 as withLeadingSlash, a1 as encodePath, a2 as getRequestHeaders, s as setResponseHeader, a3 as withBase, G as withTrailingSlash, a4 as hasTrailingSlash } from '../nitro/node-server.mjs';
import { g as getActiveHead } from '../index3.mjs';
import { useRoute as useRoute$2, RouterView, createMemoryHistory, createRouter as createRouter$1, START_LOCATION } from 'vue-router';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSuspense, ssrRenderVNode, ssrRenderStyle, ssrInterpolate } from 'vue/server-renderer';
import { createConsola as createConsola$1 } from 'consola/core';
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
import '@unhead/shared';

function createContext$1(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als && currentInstance === void 0) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers$1.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers$1.delete(onLeave);
      }
    }
  };
}
function createNamespace$1(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext$1({ ...defaultOpts, ...opts });
      }
      contexts[key];
      return contexts[key];
    }
  };
}
const _globalThis$1 = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey$2 = "__unctx__";
const defaultNamespace = _globalThis$1[globalKey$2] || (_globalThis$1[globalKey$2] = createNamespace$1());
const getContext = (key, opts = {}) => defaultNamespace.get(key, opts);
const asyncHandlersKey$1 = "__unctx_async_handlers__";
const asyncHandlers$1 = _globalThis$1[asyncHandlersKey$1] || (_globalThis$1[asyncHandlersKey$1] = /* @__PURE__ */ new Set());

const basicReporter = {
  log(logObj) {
    (console[logObj.type] || console.log)(...logObj.args);
  }
};
function createConsola(options = {}) {
  return createConsola$1({
    reporters: [basicReporter],
    ...options
  });
}
const consola = createConsola();
consola.consola = consola;

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var _a, _b;
const appConfig = useRuntimeConfig$1().app;
const baseURL = () => appConfig.baseURL;
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  });
}
const nuxtAppCtx = /* @__PURE__ */ getContext("nuxt-app", {
  asyncContext: false
});
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    _scope: effectScope(),
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.9.3";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: reactive({
      data: {},
      state: {},
      once: /* @__PURE__ */ new Set(),
      _errors: {},
      ...{ serverRendered: true }
    }),
    static: {
      data: {}
    },
    runWithContext: (fn) => nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn)),
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: {},
    _payloadRevivers: {},
    ...options
  };
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    const contextCaller = async function(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    };
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  {
    if (nuxtApp.ssrContext) {
      nuxtApp.ssrContext.nuxt = nuxtApp;
      nuxtApp.ssrContext._payloadReducers = {};
      nuxtApp.payload.path = nuxtApp.ssrContext.url;
    }
    nuxtApp.ssrContext = nuxtApp.ssrContext || {};
    if (nuxtApp.ssrContext.payload) {
      Object.assign(nuxtApp.payload, nuxtApp.ssrContext.payload);
    }
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: options.ssrContext.runtimeConfig.public,
      app: options.ssrContext.runtimeConfig.app
    };
  }
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
async function applyPlugin(nuxtApp, plugin2) {
  if (plugin2.hooks) {
    nuxtApp.hooks.addHooks(plugin2.hooks);
  }
  if (typeof plugin2 === "function") {
    const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin2(nuxtApp)) || {};
    if (provide2 && typeof provide2 === "object") {
      for (const key in provide2) {
        nuxtApp.provide(key, provide2[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  var _a2, _b2;
  const resolvedPlugins = [];
  const unresolvedPlugins = [];
  const parallels = [];
  const errors = [];
  let promiseDepth = 0;
  async function executePlugin(plugin2) {
    if (plugin2.dependsOn && !plugin2.dependsOn.every((name) => resolvedPlugins.includes(name))) {
      unresolvedPlugins.push([new Set(plugin2.dependsOn), plugin2]);
    } else {
      const promise = applyPlugin(nuxtApp, plugin2).then(async () => {
        if (plugin2._name) {
          resolvedPlugins.push(plugin2._name);
          await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
            if (dependsOn.has(plugin2._name)) {
              dependsOn.delete(plugin2._name);
              if (dependsOn.size === 0) {
                promiseDepth++;
                await executePlugin(unexecutedPlugin);
              }
            }
          }));
        }
      });
      if (plugin2.parallel) {
        parallels.push(promise.catch((e) => errors.push(e)));
      } else {
        await promise;
      }
    }
  }
  for (const plugin2 of plugins2) {
    if (((_a2 = nuxtApp.ssrContext) == null ? void 0 : _a2.islandContext) && ((_b2 = plugin2.env) == null ? void 0 : _b2.islands) === false) {
      continue;
    }
    await executePlugin(plugin2);
  }
  await Promise.all(parallels);
  if (promiseDepth) {
    for (let i = 0; i < promiseDepth; i++) {
      await Promise.all(parallels);
    }
  }
  if (errors.length) {
    throw errors[0];
  }
}
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin2) {
  if (typeof plugin2 === "function") {
    return plugin2;
  }
  const _name = plugin2._name || plugin2.name;
  delete plugin2.name;
  return Object.assign(plugin2.setup || (() => {
  }), plugin2, { [NuxtPluginIndicator]: true, _name });
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => args ? setup(...args) : setup();
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
// @__NO_SIDE_EFFECTS__
function useNuxtApp() {
  var _a2;
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = (_a2 = getCurrentInstance$1()) == null ? void 0 : _a2.appContext.app.$nuxt;
  }
  nuxtAppInstance = nuxtAppInstance || nuxtAppCtx.tryUse();
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig() {
  return (/* @__PURE__ */ useNuxtApp()).$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
function defineAppConfig(config) {
  return config;
}
function defineHeadPlugin(plugin2) {
  return plugin2;
}
function hashCode(s) {
  let h2 = 9;
  for (let i = 0; i < s.length; )
    h2 = Math.imul(h2 ^ s.charCodeAt(i++), 9 ** 9);
  return ((h2 ^ h2 >>> 9) + 65536).toString(16).substring(1, 8).toLowerCase();
}
function resolveTitleTemplate(template, title) {
  if (template == null)
    return title || null;
  if (typeof template === "function")
    return template(title);
  return template;
}
function unpackToArray(input, options) {
  const unpacked = [];
  const kFn = options.resolveKeyData || ((ctx) => ctx.key);
  const vFn = options.resolveValueData || ((ctx) => ctx.value);
  for (const [k2, v] of Object.entries(input)) {
    unpacked.push(...(Array.isArray(v) ? v : [v]).map((i) => {
      const ctx = { key: k2, value: i };
      const val = vFn(ctx);
      if (typeof val === "object")
        return unpackToArray(val, options);
      if (Array.isArray(val))
        return val;
      return {
        [typeof options.key === "function" ? options.key(ctx) : options.key]: kFn(ctx),
        [typeof options.value === "function" ? options.value(ctx) : options.value]: val
      };
    }).flat());
  }
  return unpacked;
}
function unpackToString(value, options) {
  return Object.entries(value).map(([key, value2]) => {
    if (typeof value2 === "object")
      value2 = unpackToString(value2, options);
    if (options.resolve) {
      const resolved = options.resolve({ key, value: value2 });
      if (resolved)
        return resolved;
    }
    if (typeof value2 === "number")
      value2 = value2.toString();
    if (typeof value2 === "string" && options.wrapValue) {
      value2 = value2.replace(new RegExp(options.wrapValue, "g"), `\\${options.wrapValue}`);
      value2 = `${options.wrapValue}${value2}${options.wrapValue}`;
    }
    return `${key}${options.keyValueSeparator || ""}${value2}`;
  }).join(options.entrySeparator || "");
}
const p = (p2) => ({ keyValue: p2, metaKey: "property" });
const k = (p2) => ({ keyValue: p2 });
const MetaPackingSchema = {
  appleItunesApp: {
    unpack: {
      entrySeparator: ", ",
      resolve({ key, value }) {
        return `${fixKeyCase(key)}=${value}`;
      }
    }
  },
  articleExpirationTime: p("article:expiration_time"),
  articleModifiedTime: p("article:modified_time"),
  articlePublishedTime: p("article:published_time"),
  bookReleaseDate: p("book:release_date"),
  charset: {
    metaKey: "charset"
  },
  contentSecurityPolicy: {
    unpack: {
      entrySeparator: "; ",
      resolve({ key, value }) {
        return `${fixKeyCase(key)} ${value}`;
      }
    },
    metaKey: "http-equiv"
  },
  contentType: {
    metaKey: "http-equiv"
  },
  defaultStyle: {
    metaKey: "http-equiv"
  },
  fbAppId: p("fb:app_id"),
  msapplicationConfig: k("msapplication-Config"),
  msapplicationTileColor: k("msapplication-TileColor"),
  msapplicationTileImage: k("msapplication-TileImage"),
  ogAudioSecureUrl: p("og:audio:secure_url"),
  ogAudioUrl: p("og:audio"),
  ogImageSecureUrl: p("og:image:secure_url"),
  ogImageUrl: p("og:image"),
  ogSiteName: p("og:site_name"),
  ogVideoSecureUrl: p("og:video:secure_url"),
  ogVideoUrl: p("og:video"),
  profileFirstName: p("profile:first_name"),
  profileLastName: p("profile:last_name"),
  profileUsername: p("profile:username"),
  refresh: {
    metaKey: "http-equiv",
    unpack: {
      entrySeparator: ";",
      resolve({ key, value }) {
        if (key === "seconds")
          return `${value}`;
      }
    }
  },
  robots: {
    unpack: {
      entrySeparator: ", ",
      resolve({ key, value }) {
        if (typeof value === "boolean")
          return `${fixKeyCase(key)}`;
        else
          return `${fixKeyCase(key)}:${value}`;
      }
    }
  },
  xUaCompatible: {
    metaKey: "http-equiv"
  }
};
const openGraphNamespaces = [
  "og",
  "book",
  "article",
  "profile"
];
function resolveMetaKeyType(key) {
  var _a2;
  const fKey = fixKeyCase(key).split(":")[0];
  if (openGraphNamespaces.includes(fKey))
    return "property";
  return ((_a2 = MetaPackingSchema[key]) == null ? void 0 : _a2.metaKey) || "name";
}
function resolveMetaKeyValue(key) {
  var _a2;
  return ((_a2 = MetaPackingSchema[key]) == null ? void 0 : _a2.keyValue) || fixKeyCase(key);
}
function fixKeyCase(key) {
  const updated2 = key.replace(/([A-Z])/g, "-$1").toLowerCase();
  const fKey = updated2.split("-")[0];
  if (openGraphNamespaces.includes(fKey) || fKey === "twitter")
    return key.replace(/([A-Z])/g, ":$1").toLowerCase();
  return updated2;
}
function changeKeyCasingDeep(input) {
  if (Array.isArray(input)) {
    return input.map((entry2) => changeKeyCasingDeep(entry2));
  }
  if (typeof input !== "object" || Array.isArray(input))
    return input;
  const output = {};
  for (const [key, value] of Object.entries(input))
    output[fixKeyCase(key)] = changeKeyCasingDeep(value);
  return output;
}
function resolvePackedMetaObjectValue(value, key) {
  const definition = MetaPackingSchema[key];
  if (key === "refresh")
    return `${value.seconds};url=${value.url}`;
  return unpackToString(
    changeKeyCasingDeep(value),
    {
      keyValueSeparator: "=",
      entrySeparator: ", ",
      resolve({ value: value2, key: key2 }) {
        if (value2 === null)
          return "";
        if (typeof value2 === "boolean")
          return `${key2}`;
      },
      ...definition == null ? void 0 : definition.unpack
    }
  );
}
const ObjectArrayEntries = ["og:image", "og:video", "og:audio", "twitter:image"];
function sanitize(input) {
  const out = {};
  Object.entries(input).forEach(([k2, v]) => {
    if (String(v) !== "false" && k2)
      out[k2] = v;
  });
  return out;
}
function handleObjectEntry(key, v) {
  const value = sanitize(v);
  const fKey = fixKeyCase(key);
  const attr = resolveMetaKeyType(fKey);
  if (ObjectArrayEntries.includes(fKey)) {
    const input = {};
    Object.entries(value).forEach(([k2, v2]) => {
      input[`${key}${k2 === "url" ? "" : `${k2.charAt(0).toUpperCase()}${k2.slice(1)}`}`] = v2;
    });
    return unpackMeta(input).sort((a, b) => {
      var _a2, _b2;
      return (((_a2 = a[attr]) == null ? void 0 : _a2.length) || 0) - (((_b2 = b[attr]) == null ? void 0 : _b2.length) || 0);
    });
  }
  return [{ [attr]: fKey, ...value }];
}
function unpackMeta(input) {
  const extras = [];
  const primitives = {};
  Object.entries(input).forEach(([key, value]) => {
    if (!Array.isArray(value)) {
      if (typeof value === "object" && value) {
        if (ObjectArrayEntries.includes(fixKeyCase(key))) {
          extras.push(...handleObjectEntry(key, value));
          return;
        }
        primitives[key] = sanitize(value);
      } else {
        primitives[key] = value;
      }
      return;
    }
    value.forEach((v) => {
      extras.push(...typeof v === "string" ? unpackMeta({ [key]: v }) : handleObjectEntry(key, v));
    });
  });
  const meta = unpackToArray(primitives, {
    key({ key }) {
      return resolveMetaKeyType(key);
    },
    value({ key }) {
      return key === "charset" ? "charset" : "content";
    },
    resolveKeyData({ key }) {
      return resolveMetaKeyValue(key);
    },
    resolveValueData({ value, key }) {
      if (value === null)
        return "_null";
      if (typeof value === "object")
        return resolvePackedMetaObjectValue(value, key);
      return typeof value === "number" ? value.toString() : value;
    }
  });
  return [...extras, ...meta].map((m) => {
    if (m.content === "_null")
      m.content = null;
    return m;
  });
}
const sepSub = "%separator";
function processTemplateParams(s, p2, sep) {
  if (typeof s !== "string" || !s.includes("%"))
    return s;
  function sub(token) {
    let val;
    if (["s", "pageTitle"].includes(token)) {
      val = p2.pageTitle;
    } else if (token.includes(".")) {
      val = token.split(".").reduce((acc, key) => acc ? acc[key] || void 0 : void 0, p2);
    } else {
      val = p2[token];
    }
    return typeof val !== "undefined" ? (val || "").replace(/"/g, '\\"') : false;
  }
  let decoded = s;
  try {
    decoded = decodeURI(s);
  } catch {
  }
  const tokens = (decoded.match(/%(\w+\.+\w+)|%(\w+)/g) || []).sort().reverse();
  tokens.forEach((token) => {
    const re = sub(token.slice(1));
    if (typeof re === "string") {
      s = s.replace(new RegExp(`\\${token}(\\W|$)`, "g"), (_, args) => `${re}${args}`).trim();
    }
  });
  if (s.includes(sepSub)) {
    if (s.endsWith(sepSub))
      s = s.slice(0, -sepSub.length).trim();
    if (s.startsWith(sepSub))
      s = s.slice(sepSub.length).trim();
    s = s.replace(new RegExp(`\\${sepSub}\\s*\\${sepSub}`, "g"), sepSub);
    s = processTemplateParams(s, { separator: sep }, sep);
  }
  return s;
}
version$1.startsWith("3");
function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput(ref2, lastKey = "") {
  if (ref2 instanceof Promise)
    return ref2;
  const root = resolveUnref(ref2);
  if (!ref2 || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput(r, lastKey));
  if (typeof root === "object") {
    return Object.fromEntries(
      Object.entries(root).map(([k2, v]) => {
        if (k2 === "titleTemplate" || k2.startsWith("on"))
          return [k2, unref(v)];
        return [k2, resolveUnrefHeadInput(v, k2)];
      })
    );
  }
  return root;
}
const headSymbol = "usehead";
const _global = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const globalKey$1 = "__unhead_injection_handler__";
function setHeadInjectionHandler(handler) {
  _global[globalKey$1] = handler;
}
function injectHead() {
  if (globalKey$1 in _global) {
    return _global[globalKey$1]();
  }
  const head = inject$1(headSymbol);
  if (!head && "production" !== "production")
    console.warn("Unhead is missing Vue context, falling back to shared context. This may have unexpected results.");
  return head || getActiveHead();
}
function useHead(input, options = {}) {
  const head = options.head || injectHead();
  if (head) {
    if (!head.ssr)
      return clientUseHead(head, input, options);
    return head.push(input, options);
  }
}
function clientUseHead(head, input, options = {}) {
  const deactivated = ref(false);
  const resolvedInput = ref({});
  watchEffect(() => {
    resolvedInput.value = deactivated.value ? {} : resolveUnrefHeadInput(input);
  });
  const entry2 = head.push(resolvedInput.value, options);
  watch(resolvedInput, (e) => {
    entry2.patch(e);
  });
  getCurrentInstance$1();
  return entry2;
}
function useSeoMeta(input, options) {
  const { title, titleTemplate, ...meta } = input;
  return useHead({
    title,
    titleTemplate,
    // @ts-expect-error runtime type
    _flatMeta: meta
  }, {
    ...options,
    transform(t) {
      const meta2 = unpackMeta({ ...t._flatMeta });
      delete t._flatMeta;
      return {
        // @ts-expect-error runtime type
        ...t,
        meta: meta2
      };
    }
  });
}
function useServerHead(input, options = {}) {
  const head = options.head || injectHead();
  delete options.head;
  if (head)
    return head.push(input, { ...options, mode: "server" });
}
const unhead_KgADcZ0jPj = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    setHeadInjectionHandler(
      // need a fresh instance of the nuxt app to avoid parallel requests interfering with each other
      () => (/* @__PURE__ */ useNuxtApp()).vueApp._context.provides.usehead
    );
    nuxtApp.vueApp.use(head);
  }
});
function createContext(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als && currentInstance === void 0) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace2) => {
      if (!replace2) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext({ ...defaultOpts, ...opts });
      }
      contexts[key];
      return contexts[key];
    }
  };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
_globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());
function executeAsync(function_) {
  const restores = [];
  for (const leaveHandler of asyncHandlers) {
    const restore2 = leaveHandler();
    if (restore2) {
      restores.push(restore2);
    }
  }
  const restore = () => {
    for (const restore2 of restores) {
      restore2();
    }
  };
  let awaitable = function_();
  if (awaitable && typeof awaitable === "object" && "catch" in awaitable) {
    awaitable = awaitable.catch((error) => {
      restore();
      throw error;
    });
  }
  return [awaitable, restore];
}
const interpolatePath = (route, match) => {
  return match.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a2;
    return ((_a2 = route.params[r.slice(1)]) == null ? void 0 : _a2.toString()) || "";
  });
};
const generateRouteKey$1 = (routeProps, override) => {
  const matchedRoute = routeProps.route.matched.find((m) => {
    var _a2;
    return ((_a2 = m.components) == null ? void 0 : _a2.default) === routeProps.Component.type;
  });
  const source = override ?? (matchedRoute == null ? void 0 : matchedRoute.meta.key) ?? (matchedRoute && interpolatePath(routeProps.route, matchedRoute));
  return typeof source === "function" ? source(routeProps.route) : source;
};
const wrapInKeepAlive = (props, children) => {
  return { default: () => children };
};
function toArray$1(value) {
  return Array.isArray(value) ? value : [value];
}
const LayoutMetaSymbol = Symbol("layout-meta");
const PageRouteSymbol = Symbol("route");
const useRouter$1 = () => {
  var _a2;
  return (_a2 = /* @__PURE__ */ useNuxtApp()) == null ? void 0 : _a2.$router;
};
const useRoute$1 = () => {
  if (hasInjectionContext()) {
    return inject$1(PageRouteSymbol, (/* @__PURE__ */ useNuxtApp())._route);
  }
  return (/* @__PURE__ */ useNuxtApp())._route;
};
// @__NO_SIDE_EFFECTS__
function defineNuxtRouteMiddleware(middleware) {
  return middleware;
}
const isProcessingMiddleware = () => {
  try {
    if ((/* @__PURE__ */ useNuxtApp())._processingMiddleware) {
      return true;
    }
  } catch {
    return true;
  }
  return false;
};
const navigateTo = (to, options) => {
  if (!to) {
    to = "/";
  }
  const toPath = typeof to === "string" ? to : withQuery(to.path || "/", to.query || {}) + (to.hash || "");
  if (options == null ? void 0 : options.open) {
    return Promise.resolve();
  }
  const isExternal = (options == null ? void 0 : options.external) || hasProtocol(toPath, { acceptRelative: true });
  if (isExternal) {
    if (!(options == null ? void 0 : options.external)) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const protocol = parseURL(toPath).protocol;
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter$1();
  const nuxtApp = /* @__PURE__ */ useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
      const redirect = async function(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedLoc = location2.replace(/"/g, "%22");
        nuxtApp.ssrContext._renderResponse = {
          statusCode: sanitizeStatusCode((options == null ? void 0 : options.redirectCode) || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: location2 }
        };
        return response;
      };
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    nuxtApp._scope.stop();
    if (options == null ? void 0 : options.replace) {
      (void 0).replace(toPath);
    } else {
      (void 0).href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  return (options == null ? void 0 : options.replace) ? router.replace(to) : router.push(to);
};
const NUXT_ERROR_SIGNATURE = "__nuxt_error";
const useError = () => toRef((/* @__PURE__ */ useNuxtApp()).payload, "error");
const showError = (error) => {
  const nuxtError = createError(error);
  try {
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    const error2 = useError();
    if (false)
      ;
    error2.value = error2.value || nuxtError;
  } catch {
    throw nuxtError;
  }
  return nuxtError;
};
const clearError = async (options = {}) => {
  const nuxtApp = /* @__PURE__ */ useNuxtApp();
  const error = useError();
  nuxtApp.callHook("app:error:cleared", options);
  if (options.redirect) {
    await useRouter$1().replace(options.redirect);
  }
  error.value = null;
};
const isNuxtError = (error) => !!error && typeof error === "object" && NUXT_ERROR_SIGNATURE in error;
const createError = (error) => {
  const nuxtError = createError$1(error);
  Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
    value: true,
    configurable: false,
    writable: false
  });
  return nuxtError;
};
const __nuxt_page_meta$8 = {
  // layout: 'default',
  // name: 'index',
  // alias: 'index',
  title: "Home",
  description: "Style Up Your Life!",
  hidden: true,
  navOrder: 1,
  type: "primary",
  icon: "i-mdi-home"
  // ogImage: 'images/ogImage.png', // url or local images inside public folder, for eg, ~/public/images/ogImage.png
};
const __nuxt_page_meta$7 = {
  // layout: 'default',
  // name: 'contact-us',
  // alias: 'contact-us',
  title: "Contact Us",
  description: `Get in Touch: We're All Ears!`,
  navOrder: "11",
  type: "secondary",
  icon: "i-mdi-home"
  // ogImage: 'images/ogImage.png', // url or local images inside public folder, for eg, ~/public/images/ogImage.png
};
const __nuxt_page_meta$6 = {
  // layout: 'default',
  // name: 'delivery-policy',
  // alias: 'delivery-policy',
  title: "Delivery Policy",
  description: `Delivering Promises, One Policy at a Time!`,
  navOrder: "10",
  type: "secondary",
  icon: "i-mdi-home"
  // ogImage: 'images/ogImage.png', // url or local images inside public folder, for eg, ~/public/images/ogImage.png
};
const __nuxt_page_meta$5 = {
  // layout: 'default',
  // name: 'help-faqs',
  // alias: 'help-faqs',
  title: "Help & FAQs",
  description: `We're Here to Help: Your Support Hub!`,
  navOrder: "12",
  type: "secondary",
  icon: "i-mdi-home"
  // ogImage: 'images/ogImage.png', // url or local images inside public folder, for eg, ~/public/images/ogImage.png
};
const __nuxt_page_meta$4 = {
  // layout: 'default',
  // name: 'order-history',
  // alias: 'order-history',
  title: "Order History",
  description: `Your Purchase Journey, Your Order History!`,
  navOrder: "8",
  type: "secondary",
  icon: "i-mdi-home"
  // ogImage: 'images/ogImage.png', // url or local images inside public folder, for eg, ~/public/images/ogImage.png
};
const __nuxt_page_meta$3 = {
  // layout: 'default',
  name: "quick-start",
  // alias: '[...slug]',
  title: "Quick Start",
  description: `Start Strong, Start Fast: Your Quick Launch Guide!`,
  navOrder: "4",
  type: "primary",
  icon: "i-mdi-home"
  // ogImage: 'images/ogImage.png', // url or local images inside public folder, for eg, ~/public/images/ogImage.png
};
const __nuxt_page_meta$2 = {
  // layout: 'default',
  // name: 'returns',
  // alias: 'returns',
  title: "Returns",
  description: `Seamless Returns, Your Satisfaction Guaranteed!`,
  navOrder: "9",
  type: "secondary",
  icon: "i-mdi-home"
  // ogImage: 'images/ogImage.png', // url or local images inside public folder, for eg, ~/public/images/ogImage.png
};
const __nuxt_page_meta$1 = {
  // layout: 'default',
  name: "store",
  // alias: '[...slug]',
  title: "Store",
  description: `Shop 'til You Drop: Your E-Commerce Haven!`,
  navOrder: "3",
  hidden: true,
  type: "primary",
  icon: "i-mdi-home"
  // ogImage: 'images/ogImage.png', // url or local images inside public folder, for eg, ~/public/images/ogImage.png
};
const __nuxt_page_meta = {
  // layout: 'default',
  // name: 'track-order',
  // alias: 'track-order',
  title: "Track Order",
  description: `Track Your Order, Every Step of the Way!`,
  navOrder: "7",
  type: "secondary",
  icon: "i-mdi-home"
  // ogImage: 'images/ogImage.png', // url or local images inside public folder, for eg, ~/public/images/ogImage.png
};
const _routes = [
  {
    name: (__nuxt_page_meta$8 == null ? void 0 : __nuxt_page_meta$8.name) ?? "category",
    path: (__nuxt_page_meta$8 == null ? void 0 : __nuxt_page_meta$8.path) ?? "/:category()",
    meta: __nuxt_page_meta$8 || {},
    alias: (__nuxt_page_meta$8 == null ? void 0 : __nuxt_page_meta$8.alias) || [],
    redirect: (__nuxt_page_meta$8 == null ? void 0 : __nuxt_page_meta$8.redirect) || void 0,
    component: () => import('./_nuxt/_category_-d6f1aJYK.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$7 == null ? void 0 : __nuxt_page_meta$7.name) ?? "contact-us",
    path: (__nuxt_page_meta$7 == null ? void 0 : __nuxt_page_meta$7.path) ?? "/contact-us",
    meta: __nuxt_page_meta$7 || {},
    alias: (__nuxt_page_meta$7 == null ? void 0 : __nuxt_page_meta$7.alias) || [],
    redirect: (__nuxt_page_meta$7 == null ? void 0 : __nuxt_page_meta$7.redirect) || void 0,
    component: () => import('./_nuxt/contact-us-HXL99Wsa.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$6 == null ? void 0 : __nuxt_page_meta$6.name) ?? "delivery-policy",
    path: (__nuxt_page_meta$6 == null ? void 0 : __nuxt_page_meta$6.path) ?? "/delivery-policy",
    meta: __nuxt_page_meta$6 || {},
    alias: (__nuxt_page_meta$6 == null ? void 0 : __nuxt_page_meta$6.alias) || [],
    redirect: (__nuxt_page_meta$6 == null ? void 0 : __nuxt_page_meta$6.redirect) || void 0,
    component: () => import('./_nuxt/delivery-policy-1jLat1eo.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$5 == null ? void 0 : __nuxt_page_meta$5.name) ?? "help-faqs",
    path: (__nuxt_page_meta$5 == null ? void 0 : __nuxt_page_meta$5.path) ?? "/help-faqs",
    meta: __nuxt_page_meta$5 || {},
    alias: (__nuxt_page_meta$5 == null ? void 0 : __nuxt_page_meta$5.alias) || [],
    redirect: (__nuxt_page_meta$5 == null ? void 0 : __nuxt_page_meta$5.redirect) || void 0,
    component: () => import('./_nuxt/help-faqs-TYdVB4U1.mjs').then((m) => m.default || m)
  },
  {
    name: "index",
    path: "/",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/index-24B6_rxN.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$4 == null ? void 0 : __nuxt_page_meta$4.name) ?? "order-history",
    path: (__nuxt_page_meta$4 == null ? void 0 : __nuxt_page_meta$4.path) ?? "/order-history",
    meta: __nuxt_page_meta$4 || {},
    alias: (__nuxt_page_meta$4 == null ? void 0 : __nuxt_page_meta$4.alias) || [],
    redirect: (__nuxt_page_meta$4 == null ? void 0 : __nuxt_page_meta$4.redirect) || void 0,
    component: () => import('./_nuxt/order-history-jejMJ839.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$3 == null ? void 0 : __nuxt_page_meta$3.name) ?? "quick-start-slug",
    path: (__nuxt_page_meta$3 == null ? void 0 : __nuxt_page_meta$3.path) ?? "/quick-start/:slug(.*)*",
    meta: __nuxt_page_meta$3 || {},
    alias: (__nuxt_page_meta$3 == null ? void 0 : __nuxt_page_meta$3.alias) || [],
    redirect: (__nuxt_page_meta$3 == null ? void 0 : __nuxt_page_meta$3.redirect) || void 0,
    component: () => import('./_nuxt/_...slug_-D6q0mUk2.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$2 == null ? void 0 : __nuxt_page_meta$2.name) ?? "returns",
    path: (__nuxt_page_meta$2 == null ? void 0 : __nuxt_page_meta$2.path) ?? "/returns",
    meta: __nuxt_page_meta$2 || {},
    alias: (__nuxt_page_meta$2 == null ? void 0 : __nuxt_page_meta$2.alias) || [],
    redirect: (__nuxt_page_meta$2 == null ? void 0 : __nuxt_page_meta$2.redirect) || void 0,
    component: () => import('./_nuxt/returns-NO3iJtjM.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$1 == null ? void 0 : __nuxt_page_meta$1.name) ?? "store-id",
    path: (__nuxt_page_meta$1 == null ? void 0 : __nuxt_page_meta$1.path) ?? "/store/:id(.*)*",
    meta: __nuxt_page_meta$1 || {},
    alias: (__nuxt_page_meta$1 == null ? void 0 : __nuxt_page_meta$1.alias) || [],
    redirect: (__nuxt_page_meta$1 == null ? void 0 : __nuxt_page_meta$1.redirect) || void 0,
    component: () => import('./_nuxt/_...id_-8FvAEI61.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta == null ? void 0 : __nuxt_page_meta.name) ?? "track-order",
    path: (__nuxt_page_meta == null ? void 0 : __nuxt_page_meta.path) ?? "/track-order",
    meta: __nuxt_page_meta || {},
    alias: (__nuxt_page_meta == null ? void 0 : __nuxt_page_meta.alias) || [],
    redirect: (__nuxt_page_meta == null ? void 0 : __nuxt_page_meta.redirect) || void 0,
    component: () => import('./_nuxt/track-order-WurSJpPC.mjs').then((m) => m.default || m)
  }
];
const _wrapIf = (component, props, slots) => {
  props = props === true ? {} : props;
  return { default: () => {
    var _a2;
    return props ? h(component, props, slots) : (_a2 = slots.default) == null ? void 0 : _a2.call(slots);
  } };
};
function generateRouteKey(route) {
  const source = (route == null ? void 0 : route.meta.key) ?? route.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a2;
    return ((_a2 = route.params[r.slice(1)]) == null ? void 0 : _a2.toString()) || "";
  });
  return typeof source === "function" ? source(route) : source;
}
function isChangingPage(to, from) {
  if (to === from || from === START_LOCATION) {
    return false;
  }
  if (generateRouteKey(to) !== generateRouteKey(from)) {
    return true;
  }
  const areComponentsSame = to.matched.every(
    (comp, index) => {
      var _a2, _b2;
      return comp.components && comp.components.default === ((_b2 = (_a2 = from.matched[index]) == null ? void 0 : _a2.components) == null ? void 0 : _b2.default);
    }
  );
  if (areComponentsSame) {
    return false;
  }
  return true;
}
const appLayoutTransition = false;
const appPageTransition = false;
const appKeepalive = false;
const selectiveClient = false;
const nuxtLinkDefaults = { "componentName": "NuxtLink" };
const asyncDataDefaults = { "deep": true };
const fetchDefaults = {};
const routerOptions0 = {
  scrollBehavior(to, from, savedPosition) {
    var _a2;
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    const behavior = ((_a2 = useRouter$1().options) == null ? void 0 : _a2.scrollBehaviorType) ?? "auto";
    let position = savedPosition || void 0;
    const routeAllowsScrollToTop = typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop;
    if (!position && from && to && routeAllowsScrollToTop !== false && isChangingPage(to, from)) {
      position = { left: 0, top: 0 };
    }
    if (to.path === from.path) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior };
      }
    }
    const hasTransition = (route) => !!(route.meta.pageTransition ?? appPageTransition);
    const hookToWait = hasTransition(from) && hasTransition(to) ? "page:transition:finish" : "page:finish";
    return new Promise((resolve) => {
      nuxtApp.hooks.hookOnce(hookToWait, async () => {
        await nextTick();
        if (to.hash) {
          position = { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior };
        }
        resolve(position);
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = (void 0).querySelector(selector);
    if (elem) {
      return parseFloat(getComputedStyle(elem).scrollMarginTop);
    }
  } catch {
  }
  return 0;
}
const configRouterOptions = {
  hashMode: false,
  scrollBehaviorType: "auto"
};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};
const validate = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  var _a2;
  let __temp, __restore;
  if (!((_a2 = to.meta) == null ? void 0 : _a2.validate)) {
    return;
  }
  useRouter$1();
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  {
    return result;
  }
});
const manifest_45route_45rule = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  {
    return;
  }
});
const globalMiddleware = [
  validate,
  manifest_45route_45rule
];
const namedMiddleware = {};
const plugin$3 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup(nuxtApp) {
    var _a2, _b2, _c;
    let __temp, __restore;
    let routerBase = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
    if (routerOptions.hashMode && !routerBase.includes("#")) {
      routerBase += "#";
    }
    const history = ((_a2 = routerOptions.history) == null ? void 0 : _a2.call(routerOptions, routerBase)) ?? createMemoryHistory(routerBase);
    const routes = ((_b2 = routerOptions.routes) == null ? void 0 : _b2.call(routerOptions, _routes)) ?? _routes;
    let startPosition;
    const initialURL = nuxtApp.ssrContext.url;
    const router = createRouter$1({
      ...routerOptions,
      scrollBehavior: (to, from, savedPosition) => {
        var _a3;
        if (from === START_LOCATION) {
          startPosition = savedPosition;
          return;
        }
        router.options.scrollBehavior = routerOptions.scrollBehavior;
        return (_a3 = routerOptions.scrollBehavior) == null ? void 0 : _a3.call(routerOptions, to, START_LOCATION, startPosition || savedPosition);
      },
      history,
      routes
    });
    nuxtApp.vueApp.use(router);
    const previousRoute = shallowRef(router.currentRoute.value);
    router.afterEach((_to, from) => {
      previousRoute.value = from;
    });
    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
      get: () => previousRoute.value
    });
    const _route = shallowRef(router.resolve(initialURL));
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value;
    };
    nuxtApp.hook("page:finish", syncCurrentRoute);
    router.afterEach((to, from) => {
      var _a3, _b3, _c2, _d;
      if (((_b3 = (_a3 = to.matched[0]) == null ? void 0 : _a3.components) == null ? void 0 : _b3.default) === ((_d = (_c2 = from.matched[0]) == null ? void 0 : _c2.components) == null ? void 0 : _d.default)) {
        syncCurrentRoute();
      }
    });
    const route = {};
    for (const key in _route.value) {
      Object.defineProperty(route, key, {
        get: () => _route.value[key]
      });
    }
    nuxtApp._route = shallowReactive(route);
    nuxtApp._middleware = nuxtApp._middleware || {
      global: [],
      named: {}
    };
    useError();
    try {
      if (true) {
        ;
        [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
        ;
      }
      ;
      [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
      ;
    } catch (error2) {
      [__temp, __restore] = executeAsync(() => nuxtApp.runWithContext(() => showError(error2))), await __temp, __restore();
    }
    if ((_c = nuxtApp.ssrContext) == null ? void 0 : _c.islandContext) {
      return { provide: { router } };
    }
    const initialLayout = nuxtApp.payload.state._layout;
    router.beforeEach(async (to, from) => {
      var _a3, _b3;
      await nuxtApp.callHook("page:loading:start");
      to.meta = reactive(to.meta);
      if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout;
      }
      nuxtApp._processingMiddleware = true;
      if (!((_a3 = nuxtApp.ssrContext) == null ? void 0 : _a3.islandContext)) {
        const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
        for (const component of to.matched) {
          const componentMiddleware = component.meta.middleware;
          if (!componentMiddleware) {
            continue;
          }
          for (const entry2 of toArray$1(componentMiddleware)) {
            middlewareEntries.add(entry2);
          }
        }
        for (const entry2 of middlewareEntries) {
          const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_b3 = namedMiddleware[entry2]) == null ? void 0 : _b3.call(namedMiddleware).then((r) => r.default || r)) : entry2;
          if (!middleware) {
            throw new Error(`Unknown route middleware: '${entry2}'.`);
          }
          const result = await nuxtApp.runWithContext(() => middleware(to, from));
          {
            if (result === false || result instanceof Error) {
              const error2 = result || createError$1({
                statusCode: 404,
                statusMessage: `Page Not Found: ${initialURL}`
              });
              await nuxtApp.runWithContext(() => showError(error2));
              return false;
            }
          }
          if (result === true) {
            continue;
          }
          if (result || result === false) {
            return result;
          }
        }
      }
    });
    router.onError(async () => {
      delete nuxtApp._processingMiddleware;
      await nuxtApp.callHook("page:loading:end");
    });
    router.afterEach(async (to, _from, failure) => {
      delete nuxtApp._processingMiddleware;
      if (failure) {
        await nuxtApp.callHook("page:loading:end");
      }
      if ((failure == null ? void 0 : failure.type) === 4) {
        return;
      }
      if (to.matched.length === 0) {
        await nuxtApp.runWithContext(() => showError(createError$1({
          statusCode: 404,
          fatal: false,
          statusMessage: `Page not found: ${to.fullPath}`,
          data: {
            path: to.fullPath
          }
        })));
      } else if (to.redirectedFrom && to.fullPath !== initialURL) {
        await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
      }
    });
    nuxtApp.hooks.hookOnce("app:created", async () => {
      try {
        await router.replace({
          ...router.resolve(initialURL),
          name: void 0,
          // #4920, #4982
          force: true
        });
        router.options.scrollBehavior = routerOptions.scrollBehavior;
      } catch (error2) {
        await nuxtApp.runWithContext(() => showError(error2));
      }
    });
    return { provide: { router } };
  }
});
function useRequestEvent(nuxtApp = /* @__PURE__ */ useNuxtApp()) {
  var _a2;
  return (_a2 = nuxtApp.ssrContext) == null ? void 0 : _a2.event;
}
function useRequestHeaders(include) {
  const event = useRequestEvent();
  const _headers = event ? getRequestHeaders(event) : {};
  if (!include || !event) {
    return _headers;
  }
  const headers = /* @__PURE__ */ Object.create(null);
  for (const _key of include) {
    const key = _key.toLowerCase();
    const header = _headers[key];
    if (header) {
      headers[key] = header;
    }
  }
  return headers;
}
function useRequestFetch() {
  var _a2;
  return ((_a2 = useRequestEvent()) == null ? void 0 : _a2.$fetch) || globalThis.$fetch;
}
function prerenderRoutes(path) {
  {
    return;
  }
}
const useStateKeyPrefix = "$s";
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = useStateKeyPrefix + _key;
  const nuxt = /* @__PURE__ */ useNuxtApp();
  const state = toRef(nuxt.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxt.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
const _0_siteConfig_7pzUtwM1Zj = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt-site-config:init",
  enforce: "pre",
  async setup(nuxtApp) {
    const state = useState("site-config");
    {
      const { context } = useRequestEvent();
      nuxtApp.hooks.hook("app:rendered", () => {
        state.value = context.siteConfig.get({
          debug: (/* @__PURE__ */ useRuntimeConfig())["nuxt-site-config"].debug,
          resolveRefs: true
        });
      });
    }
    let stack = {};
    return {
      provide: {
        nuxtSiteConfig: stack
      }
    };
  }
});
const isVue2 = false;
/*!
 * pinia v2.1.7
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */
let activePinia;
const setActivePinia = (pinia) => activePinia = pinia;
const piniaSymbol = (
  /* istanbul ignore next */
  Symbol()
);
function isPlainObject$1(o) {
  return o && typeof o === "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON !== "function";
}
var MutationType;
(function(MutationType2) {
  MutationType2["direct"] = "direct";
  MutationType2["patchObject"] = "patch object";
  MutationType2["patchFunction"] = "patch function";
})(MutationType || (MutationType = {}));
function createPinia() {
  const scope = effectScope(true);
  const state = scope.run(() => ref({}));
  let _p = [];
  let toBeInstalled = [];
  const pinia = markRaw({
    install(app) {
      setActivePinia(pinia);
      {
        pinia._a = app;
        app.provide(piniaSymbol, pinia);
        app.config.globalProperties.$pinia = pinia;
        toBeInstalled.forEach((plugin2) => _p.push(plugin2));
        toBeInstalled = [];
      }
    },
    use(plugin2) {
      if (!this._a && !isVue2) {
        toBeInstalled.push(plugin2);
      } else {
        _p.push(plugin2);
      }
      return this;
    },
    _p,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: scope,
    _s: /* @__PURE__ */ new Map(),
    state
  });
  return pinia;
}
const noop = () => {
};
function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
  subscriptions.push(callback);
  const removeSubscription = () => {
    const idx = subscriptions.indexOf(callback);
    if (idx > -1) {
      subscriptions.splice(idx, 1);
      onCleanup();
    }
  };
  if (!detached && getCurrentScope()) {
    onScopeDispose(removeSubscription);
  }
  return removeSubscription;
}
function triggerSubscriptions(subscriptions, ...args) {
  subscriptions.slice().forEach((callback) => {
    callback(...args);
  });
}
const fallbackRunWithContext = (fn) => fn();
function mergeReactiveObjects(target, patchToApply) {
  if (target instanceof Map && patchToApply instanceof Map) {
    patchToApply.forEach((value, key) => target.set(key, value));
  }
  if (target instanceof Set && patchToApply instanceof Set) {
    patchToApply.forEach(target.add, target);
  }
  for (const key in patchToApply) {
    if (!patchToApply.hasOwnProperty(key))
      continue;
    const subPatch = patchToApply[key];
    const targetValue = target[key];
    if (isPlainObject$1(targetValue) && isPlainObject$1(subPatch) && target.hasOwnProperty(key) && !isRef(subPatch) && !isReactive(subPatch)) {
      target[key] = mergeReactiveObjects(targetValue, subPatch);
    } else {
      target[key] = subPatch;
    }
  }
  return target;
}
const skipHydrateSymbol = (
  /* istanbul ignore next */
  Symbol()
);
function shouldHydrate(obj) {
  return !isPlainObject$1(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
}
const { assign } = Object;
function isComputed(o) {
  return !!(isRef(o) && o.effect);
}
function createOptionsStore(id, options, pinia, hot) {
  const { state, actions, getters } = options;
  const initialState = pinia.state.value[id];
  let store;
  function setup() {
    if (!initialState && (!("production" !== "production") )) {
      {
        pinia.state.value[id] = state ? state() : {};
      }
    }
    const localState = toRefs(pinia.state.value[id]);
    return assign(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
      computedGetters[name] = markRaw(computed(() => {
        setActivePinia(pinia);
        const store2 = pinia._s.get(id);
        return getters[name].call(store2, store2);
      }));
      return computedGetters;
    }, {}));
  }
  store = createSetupStore(id, setup, options, pinia, hot, true);
  return store;
}
function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
  let scope;
  const optionsForPlugin = assign({ actions: {} }, options);
  const $subscribeOptions = {
    deep: true
    // flush: 'post',
  };
  let isListening;
  let isSyncListening;
  let subscriptions = [];
  let actionSubscriptions = [];
  let debuggerEvents;
  const initialState = pinia.state.value[$id];
  if (!isOptionsStore && !initialState && (!("production" !== "production") )) {
    {
      pinia.state.value[$id] = {};
    }
  }
  ref({});
  let activeListener;
  function $patch(partialStateOrMutator) {
    let subscriptionMutation;
    isListening = isSyncListening = false;
    if (typeof partialStateOrMutator === "function") {
      partialStateOrMutator(pinia.state.value[$id]);
      subscriptionMutation = {
        type: MutationType.patchFunction,
        storeId: $id,
        events: debuggerEvents
      };
    } else {
      mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
      subscriptionMutation = {
        type: MutationType.patchObject,
        payload: partialStateOrMutator,
        storeId: $id,
        events: debuggerEvents
      };
    }
    const myListenerId = activeListener = Symbol();
    nextTick().then(() => {
      if (activeListener === myListenerId) {
        isListening = true;
      }
    });
    isSyncListening = true;
    triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
  }
  const $reset = isOptionsStore ? function $reset2() {
    const { state } = options;
    const newState = state ? state() : {};
    this.$patch(($state) => {
      assign($state, newState);
    });
  } : (
    /* istanbul ignore next */
    noop
  );
  function $dispose() {
    scope.stop();
    subscriptions = [];
    actionSubscriptions = [];
    pinia._s.delete($id);
  }
  function wrapAction(name, action) {
    return function() {
      setActivePinia(pinia);
      const args = Array.from(arguments);
      const afterCallbackList = [];
      const onErrorCallbackList = [];
      function after(callback) {
        afterCallbackList.push(callback);
      }
      function onError(callback) {
        onErrorCallbackList.push(callback);
      }
      triggerSubscriptions(actionSubscriptions, {
        args,
        name,
        store,
        after,
        onError
      });
      let ret;
      try {
        ret = action.apply(this && this.$id === $id ? this : store, args);
      } catch (error) {
        triggerSubscriptions(onErrorCallbackList, error);
        throw error;
      }
      if (ret instanceof Promise) {
        return ret.then((value) => {
          triggerSubscriptions(afterCallbackList, value);
          return value;
        }).catch((error) => {
          triggerSubscriptions(onErrorCallbackList, error);
          return Promise.reject(error);
        });
      }
      triggerSubscriptions(afterCallbackList, ret);
      return ret;
    };
  }
  const partialStore = {
    _p: pinia,
    // _s: scope,
    $id,
    $onAction: addSubscription.bind(null, actionSubscriptions),
    $patch,
    $reset,
    $subscribe(callback, options2 = {}) {
      const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
      const stopWatcher = scope.run(() => watch(() => pinia.state.value[$id], (state) => {
        if (options2.flush === "sync" ? isSyncListening : isListening) {
          callback({
            storeId: $id,
            type: MutationType.direct,
            events: debuggerEvents
          }, state);
        }
      }, assign({}, $subscribeOptions, options2)));
      return removeSubscription;
    },
    $dispose
  };
  const store = reactive(partialStore);
  pinia._s.set($id, store);
  const runWithContext = pinia._a && pinia._a.runWithContext || fallbackRunWithContext;
  const setupStore = runWithContext(() => pinia._e.run(() => (scope = effectScope()).run(setup)));
  for (const key in setupStore) {
    const prop = setupStore[key];
    if (isRef(prop) && !isComputed(prop) || isReactive(prop)) {
      if (!isOptionsStore) {
        if (initialState && shouldHydrate(prop)) {
          if (isRef(prop)) {
            prop.value = initialState[key];
          } else {
            mergeReactiveObjects(prop, initialState[key]);
          }
        }
        {
          pinia.state.value[$id][key] = prop;
        }
      }
    } else if (typeof prop === "function") {
      const actionValue = wrapAction(key, prop);
      {
        setupStore[key] = actionValue;
      }
      optionsForPlugin.actions[key] = prop;
    } else ;
  }
  {
    assign(store, setupStore);
    assign(toRaw(store), setupStore);
  }
  Object.defineProperty(store, "$state", {
    get: () => pinia.state.value[$id],
    set: (state) => {
      $patch(($state) => {
        assign($state, state);
      });
    }
  });
  pinia._p.forEach((extender) => {
    {
      assign(store, scope.run(() => extender({
        store,
        app: pinia._a,
        pinia,
        options: optionsForPlugin
      })));
    }
  });
  if (initialState && isOptionsStore && options.hydrate) {
    options.hydrate(store.$state, initialState);
  }
  isListening = true;
  isSyncListening = true;
  return store;
}
function defineStore(idOrOptions, setup, setupOptions) {
  let id;
  let options;
  const isSetupStore = typeof setup === "function";
  if (typeof idOrOptions === "string") {
    id = idOrOptions;
    options = isSetupStore ? setupOptions : setup;
  } else {
    options = idOrOptions;
    id = idOrOptions.id;
  }
  function useStore(pinia, hot) {
    const hasContext = hasInjectionContext();
    pinia = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (pinia) || (hasContext ? inject$1(piniaSymbol, null) : null);
    if (pinia)
      setActivePinia(pinia);
    pinia = activePinia;
    if (!pinia._s.has(id)) {
      if (isSetupStore) {
        createSetupStore(id, setup, options, pinia);
      } else {
        createOptionsStore(id, options, pinia);
      }
    }
    const store = pinia._s.get(id);
    return store;
  }
  useStore.$id = id;
  return useStore;
}
const CookieDefaults = {
  path: "/",
  watch: true,
  decode: (val) => destr(decodeURIComponent(val)),
  encode: (val) => encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val))
};
function useCookie(name, _opts) {
  var _a2;
  const opts = { ...CookieDefaults, ..._opts };
  const cookies = readRawCookies(opts) || {};
  let delay;
  if (opts.maxAge !== void 0) {
    delay = opts.maxAge * 1e3;
  } else if (opts.expires) {
    delay = opts.expires.getTime() - Date.now();
  }
  const hasExpired = delay !== void 0 && delay <= 0;
  const cookieValue = klona(hasExpired ? void 0 : cookies[name] ?? ((_a2 = opts.default) == null ? void 0 : _a2.call(opts)));
  const cookie = ref(cookieValue);
  {
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    const writeFinalCookieValue = () => {
      if (opts.readonly || isEqual$1(cookie.value, cookies[name])) {
        return;
      }
      writeServerCookie(useRequestEvent(nuxtApp), name, cookie.value, opts);
    };
    const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
    nuxtApp.hooks.hookOnce("app:error", () => {
      unhook();
      return writeFinalCookieValue();
    });
  }
  return cookie;
}
function readRawCookies(opts = {}) {
  {
    return parse(getRequestHeader(useRequestEvent(), "cookie") || "", opts);
  }
}
function writeServerCookie(event, name, value, opts = {}) {
  if (event) {
    if (value !== null && value !== void 0) {
      return setCookie(event, name, value, opts);
    }
    if (getCookie(event, name) !== void 0) {
      return deleteCookie(event, name, opts);
    }
  }
}
function definePayloadReducer(name, reduce) {
  {
    (/* @__PURE__ */ useNuxtApp()).ssrContext._payloadReducers[name] = reduce;
  }
}
const plugin$2 = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  const pinia = createPinia();
  nuxtApp.vueApp.use(pinia);
  setActivePinia(pinia);
  {
    nuxtApp.payload.pinia = pinia.state.value;
  }
  return {
    provide: {
      pinia
    }
  };
});
const reducers = {
  NuxtError: (data) => isNuxtError(data) && data.toJSON(),
  EmptyShallowRef: (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_"),
  EmptyRef: (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_"),
  ShallowRef: (data) => isRef(data) && isShallow(data) && data.value,
  ShallowReactive: (data) => isReactive(data) && isShallow(data) && toRaw(data),
  Ref: (data) => isRef(data) && data.value,
  Reactive: (data) => isReactive(data) && toRaw(data)
};
{
  reducers.Island = (data) => data && (data == null ? void 0 : data.__nuxt_island);
}
const revive_payload_server_eJ33V7gbc6 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const reducer in reducers) {
      definePayloadReducer(reducer, reducers[reducer]);
    }
  }
});
const LazyContentDoc = defineAsyncComponent(() => import('./_nuxt/ContentDoc-o34ZW02G.mjs').then((r) => r.default));
const LazyContentList = defineAsyncComponent(() => import('./_nuxt/ContentList-nzkbrCFZ.mjs').then((r) => r.default));
const LazyContentNavigation = defineAsyncComponent(() => import('./_nuxt/ContentNavigation-sLIFikM2.mjs').then((r) => r.default));
const LazyContentQuery = defineAsyncComponent(() => import('./_nuxt/ContentQuery-Xm-_H6BK.mjs').then((r) => r.default));
const LazyContentRenderer = defineAsyncComponent(() => import('./_nuxt/ContentRenderer-YBpt4f7p.mjs').then((r) => r.default));
const LazyContentRendererMarkdown = defineAsyncComponent(() => import('./_nuxt/ContentRendererMarkdown-fpzIxd3r.mjs').then((r) => r.default));
const LazyContentSlot = defineAsyncComponent(() => import('./_nuxt/ContentSlot-WpkxLJyG.mjs').then((r) => r.default));
const LazyDocumentDrivenEmpty = defineAsyncComponent(() => import('./_nuxt/DocumentDrivenEmpty-0F21m9Fc.mjs').then((r) => r.default));
const LazyDocumentDrivenNotFound = defineAsyncComponent(() => import('./_nuxt/DocumentDrivenNotFound-H4UioZw7.mjs').then((r) => r.default));
const LazyMarkdown = defineAsyncComponent(() => import('./_nuxt/Markdown-9oYR31L_.mjs').then((r) => r.default));
const LazyProseCode = defineAsyncComponent(() => import('./_nuxt/ProseCode-xVD6NDj9.mjs').then((r) => r.default));
const LazyProseCodeInline = defineAsyncComponent(() => import('./_nuxt/ProseCodeInline-1xm3gof5.mjs').then((r) => r.default));
const LazyProsePre = defineAsyncComponent(() => import('./_nuxt/ProsePre-zEvFSiWa.mjs').then((r) => r.default));
const LazyProseA = defineAsyncComponent(() => import('./_nuxt/ProseA-A0iZmJ0p.mjs').then((r) => r.default));
const LazyProseBlockquote = defineAsyncComponent(() => import('./_nuxt/ProseBlockquote--isaCLTp.mjs').then((r) => r.default));
const LazyProseEm = defineAsyncComponent(() => import('./_nuxt/ProseEm-zJwzfIh_.mjs').then((r) => r.default));
const LazyProseH1 = defineAsyncComponent(() => import('./_nuxt/ProseH1-VsK1V_Nz.mjs').then((r) => r.default));
const LazyProseH2 = defineAsyncComponent(() => import('./_nuxt/ProseH2-zWhPaZ_h.mjs').then((r) => r.default));
const LazyProseH3 = defineAsyncComponent(() => import('./_nuxt/ProseH3-9Xyep5Fs.mjs').then((r) => r.default));
const LazyProseH4 = defineAsyncComponent(() => import('./_nuxt/ProseH4-RVWPa5U1.mjs').then((r) => r.default));
const LazyProseH5 = defineAsyncComponent(() => import('./_nuxt/ProseH5-v4S3y8xJ.mjs').then((r) => r.default));
const LazyProseH6 = defineAsyncComponent(() => import('./_nuxt/ProseH6-ayWkgEqH.mjs').then((r) => r.default));
const LazyProseHr = defineAsyncComponent(() => import('./_nuxt/ProseHr-R9GioHBB.mjs').then((r) => r.default));
const LazyProseImg = defineAsyncComponent(() => import('./_nuxt/ProseImg-LiXw_sfI.mjs').then((r) => r.default));
const LazyProseLi = defineAsyncComponent(() => import('./_nuxt/ProseLi-A-GB9yhi.mjs').then((r) => r.default));
const LazyProseOl = defineAsyncComponent(() => import('./_nuxt/ProseOl-KnWkq5kJ.mjs').then((r) => r.default));
const LazyProseP = defineAsyncComponent(() => import('./_nuxt/ProseP-Fi4ZisKp.mjs').then((r) => r.default));
const LazyProseScript = defineAsyncComponent(() => import('./_nuxt/ProseScript-NvphtX9L.mjs').then((r) => r.default));
const LazyProseStrong = defineAsyncComponent(() => import('./_nuxt/ProseStrong-WlPae72_.mjs').then((r) => r.default));
const LazyProseTable = defineAsyncComponent(() => import('./_nuxt/ProseTable-Inz9BRrw.mjs').then((r) => r.default));
const LazyProseTbody = defineAsyncComponent(() => import('./_nuxt/ProseTbody-f4IDdTxi.mjs').then((r) => r.default));
const LazyProseTd = defineAsyncComponent(() => import('./_nuxt/ProseTd-teKMJsKh.mjs').then((r) => r.default));
const LazyProseTh = defineAsyncComponent(() => import('./_nuxt/ProseTh-W25FvdPU.mjs').then((r) => r.default));
const LazyProseThead = defineAsyncComponent(() => import('./_nuxt/ProseThead-YIuKQLOd.mjs').then((r) => r.default));
const LazyProseTr = defineAsyncComponent(() => import('./_nuxt/ProseTr-d3jC5r7V.mjs').then((r) => r.default));
const LazyProseUl = defineAsyncComponent(() => import('./_nuxt/ProseUl-u2hkP-LL.mjs').then((r) => r.default));
const LazyIcon = defineAsyncComponent(() => import('./_nuxt/Icon-x9auxwcP.mjs').then((r) => r.default));
const LazyIconCSS = defineAsyncComponent(() => import('./_nuxt/IconCSS-ToPUI7Tf.mjs').then((r) => r.default));
const lazyGlobalComponents = [
  ["ContentDoc", LazyContentDoc],
  ["ContentList", LazyContentList],
  ["ContentNavigation", LazyContentNavigation],
  ["ContentQuery", LazyContentQuery],
  ["ContentRenderer", LazyContentRenderer],
  ["ContentRendererMarkdown", LazyContentRendererMarkdown],
  ["MDCSlot", LazyContentSlot],
  ["DocumentDrivenEmpty", LazyDocumentDrivenEmpty],
  ["DocumentDrivenNotFound", LazyDocumentDrivenNotFound],
  ["Markdown", LazyMarkdown],
  ["ProseCode", LazyProseCode],
  ["ProseCodeInline", LazyProseCodeInline],
  ["ProsePre", LazyProsePre],
  ["ProseA", LazyProseA],
  ["ProseBlockquote", LazyProseBlockquote],
  ["ProseEm", LazyProseEm],
  ["ProseH1", LazyProseH1],
  ["ProseH2", LazyProseH2],
  ["ProseH3", LazyProseH3],
  ["ProseH4", LazyProseH4],
  ["ProseH5", LazyProseH5],
  ["ProseH6", LazyProseH6],
  ["ProseHr", LazyProseHr],
  ["ProseImg", LazyProseImg],
  ["ProseLi", LazyProseLi],
  ["ProseOl", LazyProseOl],
  ["ProseP", LazyProseP],
  ["ProseScript", LazyProseScript],
  ["ProseStrong", LazyProseStrong],
  ["ProseTable", LazyProseTable],
  ["ProseTbody", LazyProseTbody],
  ["ProseTd", LazyProseTd],
  ["ProseTh", LazyProseTh],
  ["ProseThead", LazyProseThead],
  ["ProseTr", LazyProseTr],
  ["ProseUl", LazyProseUl],
  ["Icon", LazyIcon],
  ["IconCSS", LazyIconCSS]
];
const components_plugin_KR1HBZs4kY = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components",
  setup(nuxtApp) {
    for (const [name, component] of lazyGlobalComponents) {
      nuxtApp.vueApp.component(name, component);
      nuxtApp.vueApp.component("Lazy" + name, component);
    }
  }
});
const COOKIE_EXPIRES_IN_DAYS = 365 * 24 * 60 * 60 * 1e3;
const STATE_KEY = "viewportState";
function createViewportManager(options, state) {
  const breakpoint = computed({
    get() {
      return state.value || options.fallbackBreakpoint;
    },
    set(newBreakpoint) {
      state.value = newBreakpoint;
      if (options.cookieName && false) {
        const date2 = /* @__PURE__ */ new Date();
        date2.setTime(date2.getTime() + COOKIE_EXPIRES_IN_DAYS);
        (void 0).cookie = `${options.cookieName}=${state.value}; SameSite=Strict; Secure; Expires=${date2.toUTCString()}; Path=/`;
      }
    }
  });
  const queries = computed(() => {
    const breakpoints2 = options.breakpoints || {};
    const breakpointsKeys = Object.keys(breakpoints2).sort((a, b) => breakpoints2[a] - breakpoints2[b]);
    const output = {};
    let i = breakpointsKeys.length;
    while (i--) {
      const currentKey = breakpointsKeys[i];
      const size = breakpoints2[currentKey];
      const nextSize = breakpoints2[breakpointsKeys[i + 1]];
      let mediaQuery = "";
      if (i > 0) {
        mediaQuery = `(min-width: ${size}px)`;
      } else {
        mediaQuery = "(min-width: 1px)";
      }
      if (nextSize) {
        mediaQuery += ` and (max-width: ${nextSize - 1}px)`;
      }
      output[currentKey] = {
        mediaQuery,
        size
      };
    }
    return output;
  });
  const queriesKeys = computed(() => Object.keys(queries.value));
  return {
    breakpoint,
    breakpointValue,
    isGreaterThan,
    isGreaterOrEquals,
    isLessThan,
    match,
    matches,
    queries
  };
  function breakpointValue(searchBreakpoint) {
    const breakpoints2 = options.breakpoints || {};
    return breakpoints2[searchBreakpoint];
  }
  function isGreaterThan(searchBreakpoint) {
    const currentIndex = queriesKeys.value.indexOf(breakpoint.value);
    const breakpointIndex = queriesKeys.value.indexOf(searchBreakpoint);
    if (breakpointIndex === -1) {
      return false;
    }
    return breakpointIndex > currentIndex;
  }
  function isGreaterOrEquals(searchBreakpoint) {
    return isGreaterThan(searchBreakpoint) || match(searchBreakpoint);
  }
  function isLessThan(searchBreakpoint) {
    const currentIndex = queriesKeys.value.indexOf(breakpoint.value);
    const breakpointIndex = queriesKeys.value.indexOf(searchBreakpoint);
    if (breakpointIndex === -1) {
      return false;
    }
    return breakpointIndex < currentIndex;
  }
  function match(breakpointToMatch) {
    return breakpoint.value === breakpointToMatch;
  }
  function matches(...breakpointsToMatch) {
    return breakpointsToMatch.includes(breakpoint.value);
  }
}
async function detectBreakpoint(cookie, userAgent) {
  try {
    if (cookie && cookie in this.breakpoints) {
      return cookie;
    }
    if (!userAgent) {
      return this.fallbackBreakpoint;
    }
    const { default: Bowser } = await import(
      /* webpackChunkName: "bowser" */
      'bowser'
    );
    const parser = Bowser.getParser(userAgent);
    const deviceType = parser.getPlatformType();
    if (deviceType in this.defaultBreakpoints) {
      return this.defaultBreakpoints[deviceType];
    }
    return this.fallbackBreakpoint;
  } catch (error) {
    console.error(error);
    return this.fallbackBreakpoint;
  }
}
function parseCookie(input) {
  if (!input.length) {
    return {};
  }
  return Object.fromEntries(input.split(/; */).map((cookie) => cookie.split("=", 2)));
}
const viewportOptions = { "breakpoints": { "desktop": 1024, "desktopMedium": 1280, "desktopWide": 1600, "mobile": 320, "mobileMedium": 375, "mobileWide": 425, "tablet": 768 }, "cookieName": "viewport", "defaultBreakpoints": { "desktop": "desktop", "mobile": "mobile", "tablet": "tablet" }, "fallbackBreakpoint": "desktop" };
const plugin_server_UqHjXsAzTd = /* @__PURE__ */ defineNuxtPlugin(async (nuxtApp) => {
  var _a2, _b2, _c;
  let __temp, __restore;
  const state = useState(STATE_KEY, "$vFUyxW0qJf");
  const manager = createViewportManager(viewportOptions, state);
  let cookie = "";
  let userAgent = "";
  const headers = (_c = (_b2 = (_a2 = nuxtApp == null ? void 0 : nuxtApp.ssrContext) == null ? void 0 : _a2.event) == null ? void 0 : _b2.req) == null ? void 0 : _c.headers;
  if (headers != null) {
    cookie = headers.cookie;
    userAgent = headers["user-agent"];
  }
  if (typeof cookie !== "string") {
    cookie = "";
  }
  cookie = parseCookie(cookie)[viewportOptions.cookieName];
  state.value = ([__temp, __restore] = executeAsync(() => detectBreakpoint.call(viewportOptions, cookie, userAgent)), __temp = await __temp, __restore(), __temp);
  return nuxtApp.provide("viewport", manager);
});
const css = `@font-face { font-family: "Inter fallback"; src: local("BlinkMacSystemFont"); size-adjust: 115.3099%; ascent-override: 84.0128%; descent-override: 20.9416%; line-gap-override: 0%; } @font-face { font-family: "Inter fallback"; src: local("Segoe UI"); size-adjust: 107.1644%; ascent-override: 90.3985%; descent-override: 22.5334%; line-gap-override: 0%; } @font-face { font-family: "Inter fallback"; src: local("Roboto"); size-adjust: 107.2828%; ascent-override: 90.2987%; descent-override: 22.5085%; line-gap-override: 0%; } @font-face { font-family: "Inter fallback"; src: local("Helvetica Neue"); size-adjust: 106.0574%; ascent-override: 91.342%; descent-override: 22.7685%; line-gap-override: 0%; } @font-face { font-family: "Inter fallback"; src: local("Arial"); size-adjust: 107.4014%; ascent-override: 90.199%; descent-override: 22.4836%; line-gap-override: 0%; } @font-face { font-family: "Inter fallback"; src: local("Noto Sans"); size-adjust: 100.6532%; ascent-override: 96.2463%; descent-override: 23.991%; line-gap-override: 0%; } @font-face { font-family: "Kalam fallback"; src: local("BlinkMacSystemFont"); size-adjust: 105.8052%; ascent-override: 100.4676%; descent-override: 50.1866%; line-gap-override: 0%; } @font-face { font-family: "Kalam fallback"; src: local("Segoe UI"); size-adjust: 98.3311%; ascent-override: 108.1041%; descent-override: 54.0012%; line-gap-override: 0%; } @font-face { font-family: "Kalam fallback"; src: local("Roboto"); size-adjust: 98.4398%; ascent-override: 107.9848%; descent-override: 53.9416%; line-gap-override: 0%; } @font-face { font-family: "Kalam fallback"; src: local("Helvetica Neue"); size-adjust: 97.3154%; ascent-override: 109.2324%; descent-override: 54.5648%; line-gap-override: 0%; } @font-face { font-family: "Kalam fallback"; src: local("Arial"); size-adjust: 98.5487%; ascent-override: 107.8655%; descent-override: 53.882%; line-gap-override: 0%; } @font-face { font-family: "Kalam fallback"; src: local("Noto Sans"); size-adjust: 92.3567%; ascent-override: 115.0972%; descent-override: 57.4945%; line-gap-override: 0%; } `;
const font_fallback_inlining_plugin_server_0jIQFwhKjU = /* @__PURE__ */ defineNuxtPlugin(() => {
  useHead({ style: [{ children: css + ` ` }] });
});
function useNitroOrigin(e) {
  {
    e = e || useRequestEvent();
    return e.context.siteConfigNitroOrigin;
  }
}
function useSiteConfig(options) {
  let stack;
  stack = useRequestEvent().context.siteConfig.get(defu({ resolveRefs: true }, options));
  return stack || {};
}
function resolveSitePath(pathOrUrl, options) {
  let path = pathOrUrl;
  if (hasProtocol(pathOrUrl, { strict: false, acceptRelative: true })) {
    const parsed = parseURL(pathOrUrl);
    path = parsed.pathname;
  }
  const base = withLeadingSlash(options.base || "/");
  if (base !== "/" && path.startsWith(base)) {
    path = path.slice(base.length);
  }
  const origin = options.absolute ? options.siteUrl : "";
  const baseWithOrigin = options.withBase ? withBase(base, origin || "/") : origin;
  const resolvedUrl = withBase(path, baseWithOrigin);
  return path === "/" && !options.withBase ? withTrailingSlash(resolvedUrl) : fixSlashes(options.trailingSlash, resolvedUrl);
}
function fixSlashes(trailingSlash, pathOrUrl) {
  const $url = parseURL(pathOrUrl);
  const isFileUrl = $url.pathname.includes(".");
  if (isFileUrl)
    return pathOrUrl;
  const fixedPath = trailingSlash ? withTrailingSlash($url.pathname) : withoutTrailingSlash($url.pathname);
  return `${$url.protocol ? `${$url.protocol}//` : ""}${$url.host || ""}${fixedPath}${$url.search || ""}${$url.hash || ""}`;
}
function createSitePathResolver(options = {}) {
  const siteConfig = useSiteConfig();
  const nitroOrigin = useNitroOrigin();
  const nuxtBase = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL || "/";
  return (path) => {
    return computed(() => resolveSitePath(unref(path), {
      absolute: unref(options.absolute),
      withBase: unref(options.withBase),
      siteUrl: unref(options.canonical) !== false || false ? siteConfig.url : nitroOrigin,
      trailingSlash: siteConfig.trailingSlash,
      base: nuxtBase
    }));
  };
}
function withSiteUrl(path, options = {}) {
  const siteConfig = useSiteConfig();
  const nitroOrigin = useNitroOrigin();
  const base = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL || "/";
  return computed(() => {
    return resolveSitePath(unref(path), {
      absolute: true,
      siteUrl: unref(options.canonical) !== false || false ? siteConfig.url : nitroOrigin,
      trailingSlash: siteConfig.trailingSlash,
      base,
      withBase: unref(options.withBase)
    });
  });
}
const defaults_9rtUot57OJ = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt-seo:defaults",
  setup() {
    const siteConfig = useSiteConfig() || {};
    const route = useRoute$1();
    const resolveUrl = createSitePathResolver({ withBase: true, absolute: true });
    const canonicalUrl = computed(() => resolveUrl(route.path || "/").value || route.path);
    const minimalPriority = {
      // give nuxt.config values higher priority
      tagPriority: 101
    };
    useHead({
      link: [{ rel: "canonical", href: () => canonicalUrl.value }]
    });
    const locale = siteConfig.currentLocale || siteConfig.defaultLocale;
    if (locale) {
      useServerHead({
        htmlAttrs: { lang: locale }
      });
    }
    useHead({
      templateParams: { site: siteConfig, siteName: siteConfig.name || "" },
      titleTemplate: "%s %separator %siteName"
    }, minimalPriority);
    const seoMeta = {
      ogUrl: () => canonicalUrl.value,
      ogLocale: locale,
      ogSiteName: siteConfig.name
    };
    if (siteConfig.description)
      seoMeta.description = siteConfig.description;
    if (siteConfig.twitter) {
      const id = siteConfig.twitter.startsWith("@") ? siteConfig.twitter : `@${siteConfig.twitter}`;
      seoMeta.twitterCreator = id;
      seoMeta.twitterSite = id;
    }
    useSeoMeta(seoMeta, minimalPriority);
  }
});
const siteConfig_XJTWbJLGEl = /* @__PURE__ */ defineNuxtPlugin(() => {
  const head = injectHead();
  if (!head)
    return;
  const siteConfig = useSiteConfig();
  const input = {
    meta: [],
    templateParams: {
      site: siteConfig,
      // support legacy
      siteUrl: siteConfig.url,
      siteName: siteConfig.name
    }
  };
  if (siteConfig.separator)
    input.templateParams.separator = siteConfig.separator;
  if (siteConfig.titleSeparator)
    input.templateParams.titleSeparator = siteConfig.titleSeparator;
  if (siteConfig.description) {
    input.templateParams.siteDescription = siteConfig.description;
    input.meta.push(
      {
        name: "description",
        content: "%site.description"
      }
    );
  }
  head.push(input, { tagPriority: 150 });
});
// @__NO_SIDE_EFFECTS__
function InferSeoMetaPlugin(options = {}) {
  return defineHeadPlugin({
    hooks: {
      entries: {
        resolve({ entries }) {
          var _a2;
          let titleTemplate = null;
          for (const entry2 of entries) {
            const inputKey = entry2.resolvedInput ? "resolvedInput" : "input";
            const input = entry2[inputKey];
            if (typeof input.titleTemplate !== "undefined")
              titleTemplate = input.titleTemplate;
          }
          for (const entry2 of entries) {
            const inputKey = entry2.resolvedInput ? "resolvedInput" : "input";
            const input = entry2[inputKey];
            const resolvedMeta = input.meta || [];
            titleTemplate = resolveTitleTemplate(titleTemplate, input.title);
            const title = input.title;
            const description = (_a2 = resolvedMeta.find((meta) => meta.name === "description")) == null ? void 0 : _a2.content;
            const hasOgTitle = resolvedMeta.some((meta) => meta.property === "og:title");
            const hasOgImage = resolvedMeta.some((meta) => meta.property === "og:image");
            const hasTwitterCard = resolvedMeta.some((meta) => meta.name === "twitter:card");
            const hasOgDescription = resolvedMeta.some((meta) => meta.property === "og:description");
            entry2[inputKey].meta = input.meta || [];
            if (!hasOgTitle && (input.titleTemplate || input.title)) {
              let newOgTitle = (options == null ? void 0 : options.ogTitle) || titleTemplate || input.title;
              if (typeof newOgTitle === "function")
                newOgTitle = newOgTitle(title);
              if (newOgTitle) {
                entry2[inputKey].meta.push({
                  property: "og:title",
                  // have the og:title be removed if we don't have a title
                  content: String(newOgTitle)
                });
              }
            }
            if (description && !hasOgDescription) {
              let newOgDescription = (options == null ? void 0 : options.ogDescription) || description;
              if (typeof newOgDescription === "function")
                newOgDescription = newOgDescription(title);
              if (newOgDescription) {
                entry2[inputKey].meta.push({
                  property: "og:description",
                  content: String(newOgDescription)
                });
              }
            }
            if (hasOgImage && !hasTwitterCard) {
              entry2[inputKey].meta.push({
                name: "twitter:card",
                content: (options == null ? void 0 : options.twitterCard) || "summary_large_image"
              });
            }
          }
        }
      }
    }
  });
}
const inferSeoMetaPlugin_zOJ1kxPqxh = /* @__PURE__ */ defineNuxtPlugin(() => {
  const head = injectHead();
  if (!head)
    return;
  head.use(/* @__PURE__ */ InferSeoMetaPlugin());
});
function defineSchemaOrgResolver(schema) {
  return schema;
}
function idReference(node) {
  return {
    "@id": typeof node !== "string" ? node["@id"] : node
  };
}
function resolvableDateToDate(val) {
  try {
    const date2 = val instanceof Date ? val : new Date(Date.parse(val));
    return `${date2.getFullYear()}-${date2.getMonth()}-${date2.getDate()}`;
  } catch (e) {
  }
  return typeof val === "string" ? val : val.toString();
}
const IS_VALID_W3C_DATE = [
  /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,
  /^\d{4}-[01]\d-[0-3]\d$/,
  /^\d{4}-[01]\d$/,
  /^\d{4}$/
];
function isValidW3CDate(d) {
  return IS_VALID_W3C_DATE.some((r) => r.test(d));
}
function resolvableDateToIso(val) {
  if (!val)
    return val;
  try {
    if (val instanceof Date)
      return val.toISOString();
    else if (isValidW3CDate(val))
      return val;
    else
      return new Date(Date.parse(val)).toISOString();
  } catch (e) {
  }
  return typeof val === "string" ? val : val.toString();
}
const IdentityId = "#identity";
function setIfEmpty(node, field, value) {
  if (!(node == null ? void 0 : node[field]) && value)
    node[field] = value;
}
function asArray(input) {
  return Array.isArray(input) ? input : [input];
}
function dedupeMerge(node, field, value) {
  const dedupeMerge2 = [];
  const input = asArray(node[field]);
  dedupeMerge2.push(...input);
  const data = new Set(dedupeMerge2);
  data.add(value);
  node[field] = [...data.values()].filter(Boolean);
}
function prefixId(url, id) {
  if (hasProtocol(id))
    return id;
  if (!id.startsWith("#"))
    id = `#${id}`;
  return withBase(id, url);
}
function trimLength(val, length) {
  if (!val)
    return val;
  if (val.length > length) {
    const trimmedString = val.substring(0, length);
    return trimmedString.substring(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));
  }
  return val;
}
function resolveDefaultType(node, defaultType) {
  const val = node["@type"];
  if (val === defaultType)
    return;
  const types = /* @__PURE__ */ new Set([
    ...asArray(defaultType),
    ...asArray(val)
  ]);
  node["@type"] = types.size === 1 ? val : [...types.values()];
}
function resolveWithBase(base, urlOrPath) {
  if (!urlOrPath || hasProtocol(urlOrPath) || !urlOrPath.startsWith("/") && !urlOrPath.startsWith("#"))
    return urlOrPath;
  return withBase(urlOrPath, base);
}
function resolveAsGraphKey(key) {
  if (!key)
    return key;
  return key.substring(key.lastIndexOf("#"));
}
function stripEmptyProperties(obj) {
  Object.keys(obj).forEach((k2) => {
    if (obj[k2] && typeof obj[k2] === "object") {
      if (obj[k2].__v_isReadonly || obj[k2].__v_isRef)
        return;
      stripEmptyProperties(obj[k2]);
      return;
    }
    if (obj[k2] === "" || obj[k2] === null || typeof obj[k2] === "undefined")
      delete obj[k2];
  });
  return obj;
}
const offerResolver = defineSchemaOrgResolver({
  cast(node) {
    if (typeof node === "number" || typeof node === "string") {
      return {
        price: node
      };
    }
    return node;
  },
  defaults: {
    "@type": "Offer",
    "availability": "InStock"
  },
  resolve(node, ctx) {
    setIfEmpty(node, "priceCurrency", ctx.meta.currency);
    setIfEmpty(node, "priceValidUntil", new Date(Date.UTC((/* @__PURE__ */ new Date()).getFullYear() + 1, 12, -1, 0, 0, 0)));
    if (node.url)
      resolveWithBase(ctx.meta.host, node.url);
    if (node.availability)
      node.availability = withBase(node.availability, "https://schema.org/");
    if (node.priceValidUntil)
      node.priceValidUntil = resolvableDateToIso(node.priceValidUntil);
    return node;
  }
});
const aggregateOfferResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "AggregateOffer"
  },
  inheritMeta: [
    { meta: "currency", key: "priceCurrency" }
  ],
  resolve(node, ctx) {
    node.offers = resolveRelation(node.offers, ctx, offerResolver);
    if (node.offers)
      setIfEmpty(node, "offerCount", asArray(node.offers).length);
    return node;
  }
});
const aggregateRatingResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "AggregateRating"
  }
});
const searchActionResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint"
    },
    "query-input": {
      "@type": "PropertyValueSpecification",
      "valueRequired": true,
      "valueName": "search_term_string"
    }
  },
  resolve(node, ctx) {
    if (typeof node.target === "string") {
      node.target = {
        "@type": "EntryPoint",
        "urlTemplate": resolveWithBase(ctx.meta.host, node.target)
      };
    }
    return node;
  }
});
const PrimaryWebSiteId = "#website";
const webSiteResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "WebSite"
  },
  inheritMeta: [
    "inLanguage",
    { meta: "host", key: "url" }
  ],
  idPrefix: ["host", PrimaryWebSiteId],
  resolve(node, ctx) {
    node.potentialAction = resolveRelation(node.potentialAction, ctx, searchActionResolver, {
      array: true
    });
    node.publisher = resolveRelation(node.publisher, ctx);
    return node;
  },
  resolveRootNode(node, { find }) {
    if (resolveAsGraphKey(node["@id"]) === PrimaryWebSiteId) {
      const identity = find(IdentityId);
      if (identity)
        setIfEmpty(node, "publisher", idReference(identity));
      const webPage = find(PrimaryWebPageId);
      if (webPage)
        setIfEmpty(webPage, "isPartOf", idReference(node));
    }
    return node;
  }
});
const listItemResolver = defineSchemaOrgResolver({
  cast(node) {
    if (typeof node === "string") {
      node = {
        name: node
      };
    }
    return node;
  },
  defaults: {
    "@type": "ListItem"
  },
  resolve(node, ctx) {
    if (typeof node.item === "string")
      node.item = resolveWithBase(ctx.meta.host, node.item);
    else if (typeof node.item === "object")
      node.item = resolveRelation(node.item, ctx);
    return node;
  }
});
const PrimaryBreadcrumbId = "#breadcrumb";
const breadcrumbResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "BreadcrumbList"
  },
  idPrefix: ["url", PrimaryBreadcrumbId],
  resolve(breadcrumb, ctx) {
    if (breadcrumb.itemListElement) {
      let index = 1;
      breadcrumb.itemListElement = resolveRelation(breadcrumb.itemListElement, ctx, listItemResolver, {
        array: true,
        afterResolve(node) {
          setIfEmpty(node, "position", index++);
        }
      });
    }
    return breadcrumb;
  },
  resolveRootNode(node, { find }) {
    const webPage = find(PrimaryWebPageId);
    if (webPage)
      setIfEmpty(webPage, "breadcrumb", idReference(node));
  }
});
const imageResolver = defineSchemaOrgResolver({
  alias: "image",
  cast(input) {
    if (typeof input === "string") {
      input = {
        url: input
      };
    }
    return input;
  },
  defaults: {
    "@type": "ImageObject"
  },
  inheritMeta: [
    // @todo possibly only do if there's a caption
    "inLanguage"
  ],
  idPrefix: "host",
  resolve(image, { meta }) {
    image.url = resolveWithBase(meta.host, image.url);
    setIfEmpty(image, "contentUrl", image.url);
    if (image.height && !image.width)
      delete image.height;
    if (image.width && !image.height)
      delete image.width;
    return image;
  }
});
const addressResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "PostalAddress"
  }
});
const organizationResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "Organization"
  },
  idPrefix: ["host", IdentityId],
  inheritMeta: [
    { meta: "host", key: "url" }
  ],
  resolve(node, ctx) {
    resolveDefaultType(node, "Organization");
    node.address = resolveRelation(node.address, ctx, addressResolver);
    return node;
  },
  resolveRootNode(node, ctx) {
    const isIdentity = resolveAsGraphKey(node["@id"]) === IdentityId;
    const webPage = ctx.find(PrimaryWebPageId);
    if (node.logo && isIdentity) {
      if (!ctx.find("#organization")) {
        const logoNode = resolveRelation(node.logo, ctx, imageResolver, {
          root: true,
          afterResolve(logo) {
            logo["@id"] = prefixId(ctx.meta.host, "#logo");
            setIfEmpty(logo, "caption", node.name);
          }
        });
        if (webPage && logoNode)
          setIfEmpty(webPage, "primaryImageOfPage", idReference(logoNode));
        ctx.nodes.push({
          // we want to make a simple node that has the essentials, this will allow parent nodes to inject
          // as well without inserting invalid data (i.e LocalBusiness operatingHours)
          "@type": "Organization",
          "name": node.name,
          "url": node.url,
          "sameAs": node.sameAs,
          // 'image': idReference(logoNode),
          "address": node.address,
          // needs to be a URL
          "logo": resolveRelation(node.logo, ctx, imageResolver, { root: false }).url,
          "_priority": -1,
          "@id": prefixId(ctx.meta.host, "#organization")
          // avoid the id so nothing can link to it
        });
      }
      delete node.logo;
    }
    if (isIdentity && webPage)
      setIfEmpty(webPage, "about", idReference(node));
    const webSite = ctx.find(PrimaryWebSiteId);
    if (webSite)
      setIfEmpty(webSite, "publisher", idReference(node));
  }
});
const personResolver = defineSchemaOrgResolver({
  cast(node) {
    if (typeof node === "string") {
      return {
        name: node
      };
    }
    return node;
  },
  defaults: {
    "@type": "Person"
  },
  idPrefix: ["host", IdentityId],
  resolve(node, ctx) {
    if (node.url)
      node.url = resolveWithBase(ctx.meta.host, node.url);
    return node;
  },
  resolveRootNode(node, { find, meta }) {
    if (resolveAsGraphKey(node["@id"]) === IdentityId) {
      setIfEmpty(node, "url", meta.host);
      const webPage = find(PrimaryWebPageId);
      if (webPage)
        setIfEmpty(webPage, "about", idReference(node));
      const webSite = find(PrimaryWebSiteId);
      if (webSite)
        setIfEmpty(webSite, "publisher", idReference(node));
    }
    const article = find(PrimaryArticleId);
    if (article)
      setIfEmpty(article, "author", idReference(node));
  }
});
const readActionResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "ReadAction"
  },
  resolve(node, ctx) {
    if (!node.target.includes(ctx.meta.url))
      node.target.unshift(ctx.meta.url);
    return node;
  }
});
const PrimaryWebPageId = "#webpage";
const webPageResolver = defineSchemaOrgResolver({
  defaults({ meta }) {
    const endPath = withoutTrailingSlash(meta.url.substring(meta.url.lastIndexOf("/") + 1));
    let type = "WebPage";
    switch (endPath) {
      case "about":
      case "about-us":
        type = "AboutPage";
        break;
      case "search":
        type = "SearchResultsPage";
        break;
      case "checkout":
        type = "CheckoutPage";
        break;
      case "contact":
      case "get-in-touch":
      case "contact-us":
        type = "ContactPage";
        break;
      case "faq":
        type = "FAQPage";
        break;
    }
    const defaults2 = {
      "@type": type
    };
    return defaults2;
  },
  idPrefix: ["url", PrimaryWebPageId],
  inheritMeta: [
    { meta: "title", key: "name" },
    "description",
    "datePublished",
    "dateModified",
    "url"
  ],
  resolve(node, ctx) {
    node.dateModified = resolvableDateToIso(node.dateModified);
    node.datePublished = resolvableDateToIso(node.datePublished);
    resolveDefaultType(node, "WebPage");
    node.about = resolveRelation(node.about, ctx, organizationResolver);
    node.breadcrumb = resolveRelation(node.breadcrumb, ctx, breadcrumbResolver);
    node.author = resolveRelation(node.author, ctx, personResolver);
    node.primaryImageOfPage = resolveRelation(node.primaryImageOfPage, ctx, imageResolver);
    node.potentialAction = resolveRelation(node.potentialAction, ctx, readActionResolver);
    if (node["@type"] === "WebPage" && ctx.meta.url) {
      setIfEmpty(node, "potentialAction", [
        {
          "@type": "ReadAction",
          "target": [ctx.meta.url]
        }
      ]);
    }
    return node;
  },
  resolveRootNode(webPage, { find, meta }) {
    const identity = find(IdentityId);
    const webSite = find(PrimaryWebSiteId);
    const logo = find("#logo");
    if (identity && meta.url === meta.host)
      setIfEmpty(webPage, "about", idReference(identity));
    if (logo)
      setIfEmpty(webPage, "primaryImageOfPage", idReference(logo));
    if (webSite)
      setIfEmpty(webPage, "isPartOf", idReference(webSite));
    const breadcrumb = find(PrimaryBreadcrumbId);
    if (breadcrumb)
      setIfEmpty(webPage, "breadcrumb", idReference(breadcrumb));
    return webPage;
  }
});
const PrimaryArticleId = "#article";
const articleResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "Article"
  },
  inheritMeta: [
    "inLanguage",
    "description",
    "image",
    "dateModified",
    "datePublished",
    { meta: "title", key: "headline" }
  ],
  idPrefix: ["url", PrimaryArticleId],
  resolve(node, ctx) {
    node.author = resolveRelation(node.author, ctx, personResolver, {
      root: true
    });
    node.publisher = resolveRelation(node.publisher, ctx);
    node.dateModified = resolvableDateToIso(node.dateModified);
    node.datePublished = resolvableDateToIso(node.datePublished);
    resolveDefaultType(node, "Article");
    node.headline = trimLength(node.headline, 110);
    return node;
  },
  resolveRootNode(node, { find, meta }) {
    var _a2;
    const webPage = find(PrimaryWebPageId);
    const identity = find(IdentityId);
    if (node.image && !node.thumbnailUrl) {
      const firstImage = asArray(node.image)[0];
      if (typeof firstImage === "string")
        setIfEmpty(node, "thumbnailUrl", resolveWithBase(meta.host, firstImage));
      else if (firstImage == null ? void 0 : firstImage["@id"])
        setIfEmpty(node, "thumbnailUrl", (_a2 = find(firstImage["@id"])) == null ? void 0 : _a2.url);
    }
    if (identity) {
      setIfEmpty(node, "publisher", idReference(identity));
      setIfEmpty(node, "author", idReference(identity));
    }
    if (webPage) {
      setIfEmpty(node, "isPartOf", idReference(webPage));
      setIfEmpty(node, "mainEntityOfPage", idReference(webPage));
      setIfEmpty(webPage, "potentialAction", [
        {
          "@type": "ReadAction",
          "target": [meta.url]
        }
      ]);
      setIfEmpty(webPage, "dateModified", node.dateModified);
      setIfEmpty(webPage, "datePublished", node.datePublished);
    }
    return node;
  }
});
const bookEditionResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "Book"
  },
  inheritMeta: [
    "inLanguage"
  ],
  resolve(node, ctx) {
    if (node.bookFormat)
      node.bookFormat = withBase(node.bookFormat, "https://schema.org/");
    if (node.datePublished)
      node.datePublished = resolvableDateToDate(node.datePublished);
    node.author = resolveRelation(node.author, ctx);
    return node;
  },
  resolveRootNode(node, { find }) {
    const identity = find(IdentityId);
    if (identity)
      setIfEmpty(node, "provider", idReference(identity));
    return node;
  }
});
const PrimaryBookId = "#book";
const bookResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "Book"
  },
  inheritMeta: [
    "description",
    "url",
    { meta: "title", key: "name" }
  ],
  idPrefix: ["url", PrimaryBookId],
  resolve(node, ctx) {
    node.workExample = resolveRelation(node.workExample, ctx, bookEditionResolver);
    node.author = resolveRelation(node.author, ctx);
    if (node.url)
      withBase(node.url, ctx.meta.host);
    return node;
  },
  resolveRootNode(node, { find }) {
    const identity = find(IdentityId);
    if (identity)
      setIfEmpty(node, "author", idReference(identity));
    return node;
  }
});
const commentResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "Comment"
  },
  idPrefix: "url",
  resolve(node, ctx) {
    node.author = resolveRelation(node.author, ctx, personResolver, {
      root: true
    });
    return node;
  },
  resolveRootNode(node, { find }) {
    const article = find(PrimaryArticleId);
    if (article)
      setIfEmpty(node, "about", idReference(article));
  }
});
const courseResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "Course"
  },
  resolve(node, ctx) {
    node.provider = resolveRelation(node.provider, ctx, organizationResolver, {
      root: true
    });
    return node;
  },
  resolveRootNode(node, { find }) {
    const identity = find(IdentityId);
    if (identity)
      setIfEmpty(node, "provider", idReference(identity));
    return node;
  }
});
const placeResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "Place"
  },
  resolve(node, ctx) {
    if (typeof node.address !== "string")
      node.address = resolveRelation(node.address, ctx, addressResolver);
    return node;
  }
});
const virtualLocationResolver = defineSchemaOrgResolver({
  cast(node) {
    if (typeof node === "string") {
      return {
        url: node
      };
    }
    return node;
  },
  defaults: {
    "@type": "VirtualLocation"
  }
});
const PrimaryEventId = "#event";
const eventResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "Event"
  },
  inheritMeta: [
    "inLanguage",
    "description",
    "image",
    { meta: "title", key: "name" }
  ],
  idPrefix: ["url", PrimaryEventId],
  resolve(node, ctx) {
    var _a2;
    if (node.location) {
      const isVirtual = node.location === "string" || ((_a2 = node.location) == null ? void 0 : _a2.url) !== "undefined";
      node.location = resolveRelation(node.location, ctx, isVirtual ? virtualLocationResolver : placeResolver);
    }
    node.performer = resolveRelation(node.performer, ctx, personResolver, {
      root: true
    });
    node.organizer = resolveRelation(node.organizer, ctx, organizationResolver, {
      root: true
    });
    node.offers = resolveRelation(node.offers, ctx, offerResolver);
    if (node.eventAttendanceMode)
      node.eventAttendanceMode = withBase(node.eventAttendanceMode, "https://schema.org/");
    if (node.eventStatus)
      node.eventStatus = withBase(node.eventStatus, "https://schema.org/");
    const isOnline = node.eventStatus === "https://schema.org/EventMovedOnline";
    const dates = ["startDate", "previousStartDate", "endDate"];
    dates.forEach((date2) => {
      if (!isOnline) {
        if (node[date2] instanceof Date && node[date2].getHours() === 0 && node[date2].getMinutes() === 0)
          node[date2] = resolvableDateToDate(node[date2]);
      } else {
        node[date2] = resolvableDateToIso(node[date2]);
      }
    });
    setIfEmpty(node, "endDate", node.startDate);
    return node;
  },
  resolveRootNode(node, { find }) {
    const identity = find(IdentityId);
    if (identity)
      setIfEmpty(node, "organizer", idReference(identity));
  }
});
const ratingResolver = defineSchemaOrgResolver({
  cast(node) {
    if (node === "number") {
      return {
        ratingValue: node
      };
    }
    return node;
  },
  defaults: {
    "@type": "Rating",
    "bestRating": 5,
    "worstRating": 1
  }
});
const openingHoursResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "OpeningHoursSpecification",
    "opens": "00:00",
    "closes": "23:59"
  }
});
const localBusinessResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": ["Organization", "LocalBusiness"]
  },
  inheritMeta: [
    { key: "url", meta: "host" },
    { key: "currenciesAccepted", meta: "currency" }
  ],
  idPrefix: ["host", IdentityId],
  resolve(node, ctx) {
    resolveDefaultType(node, ["Organization", "LocalBusiness"]);
    node.address = resolveRelation(node.address, ctx, addressResolver);
    node.openingHoursSpecification = resolveRelation(node.openingHoursSpecification, ctx, openingHoursResolver);
    node = resolveNode({ ...node }, ctx, organizationResolver);
    return node;
  },
  resolveRootNode(node, ctx) {
    organizationResolver.resolveRootNode(node, ctx);
    return node;
  }
});
const foodEstablishmentResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": ["Organization", "LocalBusiness", "FoodEstablishment"]
  },
  inheritMeta: [
    { key: "url", meta: "host" },
    { key: "currenciesAccepted", meta: "currency" }
  ],
  idPrefix: ["host", IdentityId],
  resolve(node, ctx) {
    resolveDefaultType(node, ["Organization", "LocalBusiness", "FoodEstablishment"]);
    node.starRating = resolveRelation(node.starRating, ctx, ratingResolver);
    node = resolveNode(node, ctx, localBusinessResolver);
    return node;
  },
  resolveRootNode(node, ctx) {
    localBusinessResolver.resolveRootNode(node, ctx);
    return node;
  }
});
const howToStepDirectionResolver = defineSchemaOrgResolver({
  cast(node) {
    if (typeof node === "string") {
      return {
        text: node
      };
    }
    return node;
  },
  defaults: {
    "@type": "HowToDirection"
  }
});
const howToStepResolver = defineSchemaOrgResolver({
  cast(node) {
    if (typeof node === "string") {
      return {
        text: node
      };
    }
    return node;
  },
  defaults: {
    "@type": "HowToStep"
  },
  resolve(step, ctx) {
    if (step.url)
      step.url = resolveWithBase(ctx.meta.url, step.url);
    if (step.image) {
      step.image = resolveRelation(step.image, ctx, imageResolver, {
        root: true
      });
    }
    if (step.itemListElement)
      step.itemListElement = resolveRelation(step.itemListElement, ctx, howToStepDirectionResolver);
    return step;
  }
});
const HowToId = "#howto";
const howToResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "HowTo"
  },
  inheritMeta: [
    "description",
    "image",
    "inLanguage",
    { meta: "title", key: "name" }
  ],
  idPrefix: ["url", HowToId],
  resolve(node, ctx) {
    node.step = resolveRelation(node.step, ctx, howToStepResolver);
    return node;
  },
  resolveRootNode(node, { find }) {
    const webPage = find(PrimaryWebPageId);
    if (webPage)
      setIfEmpty(node, "mainEntityOfPage", idReference(webPage));
  }
});
const itemListResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "ItemList"
  },
  resolve(node, ctx) {
    if (node.itemListElement) {
      let index = 1;
      node.itemListElement = resolveRelation(node.itemListElement, ctx, listItemResolver, {
        array: true,
        afterResolve(node2) {
          setIfEmpty(node2, "position", index++);
        }
      });
    }
    return node;
  }
});
const quantitativeValueResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "QuantitativeValue"
  }
});
const monetaryAmountResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "MonetaryAmount"
  },
  resolve(node, ctx) {
    node.value = resolveRelation(node.value, ctx, quantitativeValueResolver);
    return node;
  }
});
const jobPostingResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "JobPosting"
  },
  idPrefix: ["url", "#job-posting"],
  resolve(node, ctx) {
    node.datePosted = resolvableDateToIso(node.datePosted);
    node.hiringOrganization = resolveRelation(node.hiringOrganization, ctx, organizationResolver);
    node.jobLocation = resolveRelation(node.jobLocation, ctx, placeResolver);
    node.baseSalary = resolveRelation(node.baseSalary, ctx, monetaryAmountResolver);
    node.validThrough = resolvableDateToIso(node.validThrough);
    return node;
  },
  resolveRootNode(jobPosting, { find }) {
    const webPage = find(PrimaryWebPageId);
    const identity = find(IdentityId);
    if (identity)
      setIfEmpty(jobPosting, "hiringOrganization", idReference(identity));
    if (webPage)
      setIfEmpty(jobPosting, "mainEntityOfPage", idReference(webPage));
    return jobPosting;
  }
});
const reviewResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "Review"
  },
  inheritMeta: [
    "inLanguage"
  ],
  resolve(review, ctx) {
    review.reviewRating = resolveRelation(review.reviewRating, ctx, ratingResolver);
    review.author = resolveRelation(review.author, ctx, personResolver);
    return review;
  }
});
const videoResolver = defineSchemaOrgResolver({
  cast(input) {
    if (typeof input === "string") {
      input = {
        url: input
      };
    }
    return input;
  },
  alias: "video",
  defaults: {
    "@type": "VideoObject"
  },
  inheritMeta: [
    { meta: "title", key: "name" },
    "description",
    "image",
    "inLanguage",
    { meta: "datePublished", key: "uploadDate" }
  ],
  idPrefix: "host",
  resolve(video, ctx) {
    if (video.uploadDate)
      video.uploadDate = resolvableDateToIso(video.uploadDate);
    video.url = resolveWithBase(ctx.meta.host, video.url);
    if (video.caption && !video.description)
      video.description = video.caption;
    if (!video.description)
      video.description = "No description";
    if (video.thumbnailUrl)
      video.thumbnailUrl = resolveRelation(video.thumbnailUrl, ctx, imageResolver);
    return video;
  },
  resolveRootNode(video, { find }) {
    var _a2;
    if (video.image && !video.thumbnailUrl) {
      const firstImage = asArray(video.image)[0];
      setIfEmpty(video, "thumbnailUrl", (_a2 = find(firstImage["@id"])) == null ? void 0 : _a2.url);
    }
  }
});
const movieResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "Movie"
  },
  resolve(node, ctx) {
    node.aggregateRating = resolveRelation(node.aggregateRating, ctx, aggregateRatingResolver);
    node.review = resolveRelation(node.review, ctx, reviewResolver);
    node.director = resolveRelation(node.director, ctx, personResolver);
    node.actor = resolveRelation(node.actor, ctx, personResolver);
    node.trailer = resolveRelation(node.trailer, ctx, videoResolver);
    if (node.dateCreated)
      node.dateCreated = resolvableDateToDate(node.dateCreated);
    return node;
  }
});
const defaults = Object.freeze({
  ignoreUnknown: false,
  respectType: false,
  respectFunctionNames: false,
  respectFunctionProperties: false,
  unorderedObjects: true,
  unorderedArrays: false,
  unorderedSets: false,
  excludeKeys: void 0,
  excludeValues: void 0,
  replacer: void 0
});
function objectHash(object, options) {
  if (options) {
    options = { ...defaults, ...options };
  } else {
    options = defaults;
  }
  const hasher = createHasher(options);
  hasher.dispatch(object);
  return hasher.toString();
}
const defaultPrototypesKeys = Object.freeze([
  "prototype",
  "__proto__",
  "constructor"
]);
function createHasher(options) {
  let buff = "";
  let context = /* @__PURE__ */ new Map();
  const write = (str) => {
    buff += str;
  };
  return {
    toString() {
      return buff;
    },
    getContext() {
      return context;
    },
    dispatch(value) {
      if (options.replacer) {
        value = options.replacer(value);
      }
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    },
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      if (objectLength < 10) {
        objType = "unknown:[" + objString + "]";
      } else {
        objType = objString.slice(8, objectLength - 1);
      }
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = context.get(object)) === void 0) {
        context.set(object, context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        write("buffer:");
        return write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else if (!options.ignoreUnknown) {
          this.unkown(object, objType);
        }
      } else {
        let keys2 = Object.keys(object);
        if (options.unorderedObjects) {
          keys2 = keys2.sort();
        }
        let extraKeys = [];
        if (options.respectType !== false && !isNativeFunction(object)) {
          extraKeys = defaultPrototypesKeys;
        }
        if (options.excludeKeys) {
          keys2 = keys2.filter((key) => {
            return !options.excludeKeys(key);
          });
          extraKeys = extraKeys.filter((key) => {
            return !options.excludeKeys(key);
          });
        }
        write("object:" + (keys2.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          write(":");
          if (!options.excludeValues) {
            this.dispatch(object[key]);
          }
          write(",");
        };
        for (const key of keys2) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    },
    array(arr, unordered) {
      unordered = unordered === void 0 ? options.unorderedArrays !== false : unordered;
      write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry2 of arr) {
          this.dispatch(entry2);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry2) => {
        const hasher = createHasher(options);
        hasher.dispatch(entry2);
        for (const [key, value] of hasher.getContext()) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    },
    date(date2) {
      return write("date:" + date2.toJSON());
    },
    symbol(sym) {
      return write("symbol:" + sym.toString());
    },
    unkown(value, type) {
      write(type);
      if (!value) {
        return;
      }
      write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          Array.from(value.entries()),
          true
          /* ordered */
        );
      }
    },
    error(err) {
      return write("error:" + err.toString());
    },
    boolean(bool) {
      return write("bool:" + bool);
    },
    string(string) {
      write("string:" + string.length + ":");
      write(string);
    },
    function(fn) {
      write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
      if (options.respectFunctionNames !== false) {
        this.dispatch("function-name:" + String(fn.name));
      }
      if (options.respectFunctionProperties) {
        this.object(fn);
      }
    },
    number(number) {
      return write("number:" + number);
    },
    xml(xml) {
      return write("xml:" + xml.toString());
    },
    null() {
      return write("Null");
    },
    undefined() {
      return write("Undefined");
    },
    regexp(regex) {
      return write("regex:" + regex.toString());
    },
    uint8array(arr) {
      write("uint8array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint8clampedarray(arr) {
      write("uint8clampedarray:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int8array(arr) {
      write("int8array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint16array(arr) {
      write("uint16array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int16array(arr) {
      write("int16array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint32array(arr) {
      write("uint32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int32array(arr) {
      write("int32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    float32array(arr) {
      write("float32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    float64array(arr) {
      write("float64array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    arraybuffer(arr) {
      write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    },
    url(url) {
      return write("url:" + url.toString());
    },
    map(map) {
      write("map:");
      const arr = [...map];
      return this.array(arr, options.unorderedSets !== false);
    },
    set(set2) {
      write("set:");
      const arr = [...set2];
      return this.array(arr, options.unorderedSets !== false);
    },
    file(file) {
      write("file:");
      return this.dispatch([file.name, file.size, file.type, file.lastModfied]);
    },
    blob() {
      if (options.ignoreUnknown) {
        return write("[blob]");
      }
      throw new Error(
        'Hashing Blob objects is currently not supported\nUse "options.replacer" or "options.ignoreUnknown"\n'
      );
    },
    domwindow() {
      return write("domwindow");
    },
    bigint(number) {
      return write("bigint:" + number.toString());
    },
    /* Node.js standard native objects */
    process() {
      return write("process");
    },
    timer() {
      return write("timer");
    },
    pipe() {
      return write("pipe");
    },
    tcp() {
      return write("tcp");
    },
    udp() {
      return write("udp");
    },
    tty() {
      return write("tty");
    },
    statwatcher() {
      return write("statwatcher");
    },
    securecontext() {
      return write("securecontext");
    },
    connection() {
      return write("connection");
    },
    zlib() {
      return write("zlib");
    },
    context() {
      return write("context");
    },
    nodescript() {
      return write("nodescript");
    },
    httpparser() {
      return write("httpparser");
    },
    dataview() {
      return write("dataview");
    },
    signal() {
      return write("signal");
    },
    fsevent() {
      return write("fsevent");
    },
    tlswrap() {
      return write("tlswrap");
    }
  };
}
const nativeFunc = "[native code] }";
const nativeFuncLength = nativeFunc.length;
function isNativeFunction(f) {
  if (typeof f !== "function") {
    return false;
  }
  return Function.prototype.toString.call(f).slice(-nativeFuncLength) === nativeFunc;
}
class WordArray {
  constructor(words, sigBytes) {
    words = this.words = words || [];
    this.sigBytes = sigBytes === void 0 ? words.length * 4 : sigBytes;
  }
  toString(encoder) {
    return (encoder || Hex).stringify(this);
  }
  concat(wordArray) {
    this.clamp();
    if (this.sigBytes % 4) {
      for (let i = 0; i < wordArray.sigBytes; i++) {
        const thatByte = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
        this.words[this.sigBytes + i >>> 2] |= thatByte << 24 - (this.sigBytes + i) % 4 * 8;
      }
    } else {
      for (let j = 0; j < wordArray.sigBytes; j += 4) {
        this.words[this.sigBytes + j >>> 2] = wordArray.words[j >>> 2];
      }
    }
    this.sigBytes += wordArray.sigBytes;
    return this;
  }
  clamp() {
    this.words[this.sigBytes >>> 2] &= 4294967295 << 32 - this.sigBytes % 4 * 8;
    this.words.length = Math.ceil(this.sigBytes / 4);
  }
  clone() {
    return new WordArray([...this.words]);
  }
}
const Hex = {
  stringify(wordArray) {
    const hexChars = [];
    for (let i = 0; i < wordArray.sigBytes; i++) {
      const bite = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
      hexChars.push((bite >>> 4).toString(16), (bite & 15).toString(16));
    }
    return hexChars.join("");
  }
};
const Base64 = {
  stringify(wordArray) {
    const keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const base64Chars = [];
    for (let i = 0; i < wordArray.sigBytes; i += 3) {
      const byte1 = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
      const byte2 = wordArray.words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
      const byte3 = wordArray.words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
      const triplet = byte1 << 16 | byte2 << 8 | byte3;
      for (let j = 0; j < 4 && i * 8 + j * 6 < wordArray.sigBytes * 8; j++) {
        base64Chars.push(keyStr.charAt(triplet >>> 6 * (3 - j) & 63));
      }
    }
    return base64Chars.join("");
  }
};
const Latin1 = {
  parse(latin1Str) {
    const latin1StrLength = latin1Str.length;
    const words = [];
    for (let i = 0; i < latin1StrLength; i++) {
      words[i >>> 2] |= (latin1Str.charCodeAt(i) & 255) << 24 - i % 4 * 8;
    }
    return new WordArray(words, latin1StrLength);
  }
};
const Utf8 = {
  parse(utf8Str) {
    return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
  }
};
class BufferedBlockAlgorithm {
  constructor() {
    this._data = new WordArray();
    this._nDataBytes = 0;
    this._minBufferSize = 0;
    this.blockSize = 512 / 32;
  }
  reset() {
    this._data = new WordArray();
    this._nDataBytes = 0;
  }
  _append(data) {
    if (typeof data === "string") {
      data = Utf8.parse(data);
    }
    this._data.concat(data);
    this._nDataBytes += data.sigBytes;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _doProcessBlock(_dataWords, _offset) {
  }
  _process(doFlush) {
    let processedWords;
    let nBlocksReady = this._data.sigBytes / (this.blockSize * 4);
    if (doFlush) {
      nBlocksReady = Math.ceil(nBlocksReady);
    } else {
      nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
    }
    const nWordsReady = nBlocksReady * this.blockSize;
    const nBytesReady = Math.min(nWordsReady * 4, this._data.sigBytes);
    if (nWordsReady) {
      for (let offset = 0; offset < nWordsReady; offset += this.blockSize) {
        this._doProcessBlock(this._data.words, offset);
      }
      processedWords = this._data.words.splice(0, nWordsReady);
      this._data.sigBytes -= nBytesReady;
    }
    return new WordArray(processedWords, nBytesReady);
  }
}
class Hasher extends BufferedBlockAlgorithm {
  update(messageUpdate) {
    this._append(messageUpdate);
    this._process();
    return this;
  }
  finalize(messageUpdate) {
    if (messageUpdate) {
      this._append(messageUpdate);
    }
  }
}
const H = [
  1779033703,
  -1150833019,
  1013904242,
  -1521486534,
  1359893119,
  -1694144372,
  528734635,
  1541459225
];
const K = [
  1116352408,
  1899447441,
  -1245643825,
  -373957723,
  961987163,
  1508970993,
  -1841331548,
  -1424204075,
  -670586216,
  310598401,
  607225278,
  1426881987,
  1925078388,
  -2132889090,
  -1680079193,
  -1046744716,
  -459576895,
  -272742522,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  -1740746414,
  -1473132947,
  -1341970488,
  -1084653625,
  -958395405,
  -710438585,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  -2117940946,
  -1838011259,
  -1564481375,
  -1474664885,
  -1035236496,
  -949202525,
  -778901479,
  -694614492,
  -200395387,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  -2067236844,
  -1933114872,
  -1866530822,
  -1538233109,
  -1090935817,
  -965641998
];
const W = [];
class SHA256 extends Hasher {
  constructor() {
    super(...arguments);
    this._hash = new WordArray([...H]);
  }
  reset() {
    super.reset();
    this._hash = new WordArray([...H]);
  }
  _doProcessBlock(M, offset) {
    const H2 = this._hash.words;
    let a = H2[0];
    let b = H2[1];
    let c = H2[2];
    let d = H2[3];
    let e = H2[4];
    let f = H2[5];
    let g = H2[6];
    let h2 = H2[7];
    for (let i = 0; i < 64; i++) {
      if (i < 16) {
        W[i] = M[offset + i] | 0;
      } else {
        const gamma0x = W[i - 15];
        const gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;
        const gamma1x = W[i - 2];
        const gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
        W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
      }
      const ch = e & f ^ ~e & g;
      const maj = a & b ^ a & c ^ b & c;
      const sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
      const sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);
      const t1 = h2 + sigma1 + ch + K[i] + W[i];
      const t2 = sigma0 + maj;
      h2 = g;
      g = f;
      f = e;
      e = d + t1 | 0;
      d = c;
      c = b;
      b = a;
      a = t1 + t2 | 0;
    }
    H2[0] = H2[0] + a | 0;
    H2[1] = H2[1] + b | 0;
    H2[2] = H2[2] + c | 0;
    H2[3] = H2[3] + d | 0;
    H2[4] = H2[4] + e | 0;
    H2[5] = H2[5] + f | 0;
    H2[6] = H2[6] + g | 0;
    H2[7] = H2[7] + h2 | 0;
  }
  finalize(messageUpdate) {
    super.finalize(messageUpdate);
    const nBitsTotal = this._nDataBytes * 8;
    const nBitsLeft = this._data.sigBytes * 8;
    this._data.words[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
    this._data.words[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(
      nBitsTotal / 4294967296
    );
    this._data.words[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
    this._data.sigBytes = this._data.words.length * 4;
    this._process();
    return this._hash;
  }
}
function sha256base64(message) {
  return new SHA256().finalize(message).toString(Base64);
}
function hash(object, options = {}) {
  const hashed = typeof object === "string" ? object : objectHash(object, options);
  return sha256base64(hashed).slice(0, 10);
}
const ProductId = "#product";
const productResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "Product"
  },
  inheritMeta: [
    "description",
    "image",
    { meta: "title", key: "name" }
  ],
  idPrefix: ["url", ProductId],
  resolve(node, ctx) {
    setIfEmpty(node, "sku", hash(node.name));
    node.aggregateOffer = resolveRelation(node.aggregateOffer, ctx, aggregateOfferResolver);
    node.aggregateRating = resolveRelation(node.aggregateRating, ctx, aggregateRatingResolver);
    node.offers = resolveRelation(node.offers, ctx, offerResolver);
    node.review = resolveRelation(node.review, ctx, reviewResolver);
    return node;
  },
  resolveRootNode(product, { find }) {
    const webPage = find(PrimaryWebPageId);
    const identity = find(IdentityId);
    if (identity)
      setIfEmpty(product, "brand", idReference(identity));
    if (webPage)
      setIfEmpty(product, "mainEntityOfPage", idReference(webPage));
    return product;
  }
});
const answerResolver = defineSchemaOrgResolver({
  cast(node) {
    if (typeof node === "string") {
      return {
        text: node
      };
    }
    return node;
  },
  defaults: {
    "@type": "Answer"
  }
});
const questionResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "Question"
  },
  inheritMeta: [
    "inLanguage"
  ],
  idPrefix: "url",
  resolve(question, ctx) {
    if (question.question) {
      question.name = question.question;
      delete question.question;
    }
    if (question.answer) {
      question.acceptedAnswer = question.answer;
      delete question.answer;
    }
    question.acceptedAnswer = resolveRelation(question.acceptedAnswer, ctx, answerResolver);
    return question;
  },
  resolveRootNode(question, { find }) {
    const webPage = find(PrimaryWebPageId);
    if (webPage && asArray(webPage["@type"]).includes("FAQPage"))
      dedupeMerge(webPage, "mainEntity", idReference(question));
  }
});
const RecipeId = "#recipe";
const recipeResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "Recipe"
  },
  inheritMeta: [
    { meta: "title", key: "name" },
    "description",
    "image",
    "datePublished"
  ],
  idPrefix: ["url", RecipeId],
  resolve(node, ctx) {
    node.recipeInstructions = resolveRelation(node.recipeInstructions, ctx, howToStepResolver);
    return node;
  },
  resolveRootNode(node, { find }) {
    const article = find(PrimaryArticleId);
    const webPage = find(PrimaryWebPageId);
    if (article)
      setIfEmpty(node, "mainEntityOfPage", idReference(article));
    else if (webPage)
      setIfEmpty(node, "mainEntityOfPage", idReference(webPage));
    if (article == null ? void 0 : article.author)
      setIfEmpty(node, "author", article.author);
    return node;
  }
});
const softwareAppResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "SoftwareApplication"
  },
  resolve(node, ctx) {
    resolveDefaultType(node, "SoftwareApplication");
    node.offers = resolveRelation(node.offers, ctx, offerResolver);
    node.aggregateRating = resolveRelation(node.aggregateRating, ctx, aggregateRatingResolver);
    node.review = resolveRelation(node.review, ctx, reviewResolver);
    return node;
  }
});
function loadResolver(resolver2) {
  switch (resolver2) {
    case "address":
      return addressResolver;
    case "aggregateOffer":
      return aggregateOfferResolver;
    case "aggregateRating":
      return aggregateRatingResolver;
    case "article":
      return articleResolver;
    case "breadcrumb":
      return breadcrumbResolver;
    case "comment":
      return commentResolver;
    case "event":
      return eventResolver;
    case "foodEstablishment":
      return foodEstablishmentResolver;
    case "virtualLocation":
      return virtualLocationResolver;
    case "place":
      return placeResolver;
    case "howTo":
      return howToResolver;
    case "howToStep":
      return howToStepResolver;
    case "image":
      return imageResolver;
    case "localBusiness":
      return localBusinessResolver;
    case "offer":
      return offerResolver;
    case "openingHours":
      return openingHoursResolver;
    case "organization":
      return organizationResolver;
    case "person":
      return personResolver;
    case "product":
      return productResolver;
    case "question":
      return questionResolver;
    case "recipe":
      return recipeResolver;
    case "review":
      return reviewResolver;
    case "video":
      return videoResolver;
    case "webPage":
      return webPageResolver;
    case "webSite":
      return webSiteResolver;
    case "book":
      return bookResolver;
    case "course":
      return courseResolver;
    case "itemList":
      return itemListResolver;
    case "jobPosting":
      return jobPostingResolver;
    case "listItem":
      return listItemResolver;
    case "movie":
      return movieResolver;
    case "searchAction":
      return searchActionResolver;
    case "readAction":
      return readActionResolver;
    case "softwareApp":
      return softwareAppResolver;
    case "bookEdition":
      return bookEditionResolver;
  }
  return null;
}
const resolver = {
  __proto__: null,
  loadResolver
};
function resolveMeta(meta) {
  if (!meta.host && meta.canonicalHost)
    meta.host = meta.canonicalHost;
  if (!meta.tagPosition && meta.position)
    meta.tagPosition = meta.position;
  if (!meta.currency && meta.defaultCurrency)
    meta.currency = meta.defaultCurrency;
  if (!meta.inLanguage && meta.defaultLanguage)
    meta.inLanguage = meta.defaultLanguage;
  if (!meta.path)
    meta.path = "/";
  if (!meta.host && false)
    meta.host = (void 0).location.host;
  if (!meta.url && meta.canonicalUrl)
    meta.url = meta.canonicalUrl;
  if (meta.path !== "/") {
    if (meta.trailingSlash && !hasTrailingSlash(meta.path))
      meta.path = withTrailingSlash(meta.path);
    else if (!meta.trailingSlash && hasTrailingSlash(meta.path))
      meta.path = withoutTrailingSlash(meta.path);
  }
  meta.url = joinURL(meta.host || "", meta.path);
  return {
    ...meta,
    host: meta.host,
    url: meta.url,
    currency: meta.currency,
    image: meta.image,
    inLanguage: meta.inLanguage,
    title: meta.title,
    description: meta.description,
    datePublished: meta.datePublished,
    dateModified: meta.dateModified
  };
}
function resolveNode(node, ctx, resolver2) {
  var _a2;
  if (resolver2 == null ? void 0 : resolver2.cast)
    node = resolver2.cast(node, ctx);
  if (resolver2 == null ? void 0 : resolver2.defaults) {
    let defaults2 = resolver2.defaults || {};
    if (typeof defaults2 === "function")
      defaults2 = defaults2(ctx);
    node = {
      ...defaults2,
      ...node
    };
  }
  (_a2 = resolver2.inheritMeta) == null ? void 0 : _a2.forEach((entry2) => {
    if (typeof entry2 === "string")
      setIfEmpty(node, entry2, ctx.meta[entry2]);
    else
      setIfEmpty(node, entry2.key, ctx.meta[entry2.meta]);
  });
  if (resolver2 == null ? void 0 : resolver2.resolve)
    node = resolver2.resolve(node, ctx);
  for (const k2 in node) {
    const v = node[k2];
    if (typeof v === "object" && (v == null ? void 0 : v._resolver))
      node[k2] = resolveRelation(v, ctx, v._resolver);
  }
  stripEmptyProperties(node);
  return node;
}
function resolveNodeId(node, ctx, resolver2, resolveAsRoot = false) {
  var _a2, _b2, _c;
  if (node["@id"] && node["@id"].startsWith("http"))
    return node;
  const prefix = (Array.isArray(resolver2.idPrefix) ? resolver2.idPrefix[0] : resolver2.idPrefix) || "url";
  const rootId = node["@id"] || (Array.isArray(resolver2.idPrefix) ? (_a2 = resolver2.idPrefix) == null ? void 0 : _a2[1] : void 0);
  if (!node["@id"] && resolveAsRoot && rootId) {
    node["@id"] = prefixId(ctx.meta[prefix], rootId);
    return node;
  }
  if ((_b2 = node["@id"]) == null ? void 0 : _b2.startsWith("#/schema/")) {
    node["@id"] = prefixId(ctx.meta[prefix], node["@id"]);
    return node;
  }
  let alias = resolver2 == null ? void 0 : resolver2.alias;
  if (!alias) {
    const type = ((_c = asArray(node["@type"])) == null ? void 0 : _c[0]) || "";
    alias = type.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  }
  const hashNodeData = {};
  Object.entries(node).forEach(([key, val]) => {
    if (!key.startsWith("_"))
      hashNodeData[key] = val;
  });
  node["@id"] = prefixId(ctx.meta[prefix], `#/schema/${alias}/${node["@id"] || hashCode(JSON.stringify(hashNodeData))}`);
  return node;
}
function resolveRelation(input, ctx, fallbackResolver, options = {}) {
  if (!input)
    return input;
  const ids = asArray(input).map((a) => {
    var _a2;
    const keys2 = Object.keys(a).length;
    if (keys2 === 1 && a["@id"] || keys2 === 2 && a["@id"] && a["@type"]) {
      return {
        // we drop @type
        "@id": ((_a2 = ctx.find(a["@id"])) == null ? void 0 : _a2["@id"]) || a["@id"]
      };
    }
    let resolver2 = fallbackResolver;
    if (a._resolver) {
      resolver2 = a._resolver;
      if (typeof resolver2 === "string")
        resolver2 = loadResolver(resolver2);
      delete a._resolver;
    }
    if (!resolver2)
      return a;
    let node = resolveNode(a, ctx, resolver2);
    if (options.afterResolve)
      options.afterResolve(node);
    if (options.generateId || options.root)
      node = resolveNodeId(node, ctx, resolver2, false);
    if (options.root) {
      if (resolver2.resolveRootNode)
        resolver2.resolveRootNode(node, ctx);
      ctx.push(node);
      return idReference(node["@id"]);
    }
    return node;
  });
  if (!options.array && ids.length === 1)
    return ids[0];
  return ids;
}
function isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
    return false;
  }
  if (Symbol.iterator in value) {
    return false;
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }
  return true;
}
function _defu(baseObject, defaults2, namespace = ".", merger) {
  if (!isPlainObject(defaults2)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults2);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject(value) && isPlainObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p2, c) => _defu(p2, c, "", merger), {})
  );
}
function groupBy(array, predicate) {
  return array.reduce((acc, value, index, array2) => {
    const key = predicate(value, index, array2);
    if (!acc[key])
      acc[key] = [];
    acc[key].push(value);
    return acc;
  }, {});
}
function uniqueBy(array, predicate) {
  return Object.values(groupBy(array, predicate)).map((a) => a[a.length - 1]);
}
const merge = createDefu((object, key, value) => {
  if (Array.isArray(object[key])) {
    object[key] = [.../* @__PURE__ */ new Set([...object[key], ...value])];
    if (key === "itemListElement") {
      object[key] = [...uniqueBy(object[key], (item) => item.position)];
    }
    return true;
  }
});
function dedupeNodes(nodes) {
  const dedupedNodes = {};
  for (const key of nodes.keys()) {
    const n = nodes[key];
    const nodeKey = resolveAsGraphKey(n["@id"] || hash(n));
    if (dedupedNodes[nodeKey])
      dedupedNodes[nodeKey] = merge(nodes[key], dedupedNodes[nodeKey]);
    else
      dedupedNodes[nodeKey] = nodes[key];
  }
  return Object.values(dedupedNodes);
}
function normaliseNodes(nodes) {
  const sortedNodeKeys = nodes.keys();
  const dedupedNodes = {};
  for (const key of sortedNodeKeys) {
    const n = nodes[key];
    const nodeKey = resolveAsGraphKey(n["@id"] || hash(n));
    const groupedKeys = groupBy(Object.keys(n), (key2) => {
      const val = n[key2];
      if (key2.startsWith("_"))
        return "ignored";
      if (Array.isArray(val) || typeof val === "object")
        return "relations";
      return "primitives";
    });
    const keys2 = [
      ...(groupedKeys.primitives || []).sort(),
      ...(groupedKeys.relations || []).sort()
    ];
    let newNode = {};
    for (const key2 of keys2)
      newNode[key2] = n[key2];
    if (dedupedNodes[nodeKey])
      newNode = merge(newNode, dedupedNodes[nodeKey]);
    dedupedNodes[nodeKey] = newNode;
  }
  return Object.values(dedupedNodes);
}
function createSchemaOrgGraph() {
  const ctx = {
    find(id) {
      const key = resolveAsGraphKey(id);
      return ctx.nodes.filter((n) => !!n["@id"]).find((n) => resolveAsGraphKey(n["@id"]) === key);
    },
    push(input) {
      asArray(input).forEach((node) => {
        const registeredNode = node;
        ctx.nodes.push(registeredNode);
      });
    },
    resolveGraph(meta) {
      ctx.meta = resolveMeta({ ...meta });
      ctx.nodes.forEach((node, key) => {
        const resolver2 = node._resolver;
        if (resolver2) {
          node = resolveNode(node, ctx, resolver2);
          node = resolveNodeId(node, ctx, resolver2, true);
        }
        ctx.nodes[key] = node;
      });
      ctx.nodes = dedupeNodes(ctx.nodes);
      ctx.nodes.forEach((node) => {
        var _a2;
        if (node.image && typeof node.image === "string") {
          node.image = resolveRelation(node.image, ctx, imageResolver, {
            root: true
          });
        }
        if ((_a2 = node._resolver) == null ? void 0 : _a2.resolveRootNode)
          node._resolver.resolveRootNode(node, ctx);
        delete node._resolver;
      });
      return normaliseNodes(ctx.nodes);
    },
    nodes: [],
    meta: {}
  };
  return ctx;
}
function SchemaOrgUnheadPlugin(config, meta, options) {
  config = resolveMeta({ ...config });
  let graph;
  let resolvedMeta = {};
  return defineHeadPlugin((head) => ({
    key: "schema-org",
    hooks: {
      "entries:resolve": function() {
        graph = createSchemaOrgGraph();
      },
      "tag:normalise": async function({ tag }) {
        if (tag.key === "schema-org-graph") {
          const { loadResolver: loadResolver2 } = await Promise.resolve().then(function() {
            return resolver;
          });
          const nodes = await tag.props.nodes;
          for (const node of Array.isArray(nodes) ? nodes : [nodes]) {
            const newNode = {
              ...node,
              _resolver: loadResolver2(await node._resolver)
            };
            graph.push(newNode);
          }
          tag.tagPosition = tag.tagPosition || config.tagPosition === "head" ? "head" : "bodyClose";
        }
        if (tag.tag === "htmlAttrs" && tag.props.lang) {
          resolvedMeta.inLanguage = tag.props.lang;
        } else if (tag.tag === "title") {
          resolvedMeta.title = tag.textContent;
        } else if (tag.tag === "meta" && tag.props.name === "description") {
          resolvedMeta.description = tag.props.content;
        } else if (tag.tag === "link" && tag.props.rel === "canonical") {
          resolvedMeta.url = tag.props.href;
          if (resolvedMeta.url && !resolvedMeta.host) {
            try {
              resolvedMeta.host = new URL(resolvedMeta.url).origin;
            } catch {
            }
          }
        } else if (tag.tag === "meta" && tag.props.property === "og:image") {
          resolvedMeta.image = tag.props.content;
        } else if (tag.tag === "templateParams" && tag.props.schemaOrg) {
          resolvedMeta = {
            ...resolvedMeta,
            // @ts-expect-error untyped
            ...tag.props.schemaOrg
          };
          delete tag.props.schemaOrg;
        }
      },
      "tags:resolve": async function(ctx) {
        for (const tag of ctx.tags) {
          if (tag.tag === "script" && tag.key === "schema-org-graph") {
            const minify = (options == null ? void 0 : options.minify) || "production" === "production";
            tag.innerHTML = JSON.stringify({
              "@context": "https://schema.org",
              "@graph": graph.resolveGraph({ ...await (meta == null ? void 0 : meta()) || {}, ...config, ...resolvedMeta })
            }, (_, value) => {
              if (typeof value !== "object")
                return processTemplateParams(value, head._templateParams, head._separator);
              return value;
            }, minify ? 0 : 2);
            delete tag.props.nodes;
            return;
          }
        }
      }
    }
  }));
}
function provideResolver(input, resolver2) {
  if (!input)
    input = {};
  input._resolver = resolver2;
  return input;
}
function defineOrganization(input) {
  return provideResolver(input, "organization");
}
function definePerson(input) {
  return provideResolver(input, "person");
}
function defineWebPage(input) {
  return provideResolver(input, "webPage");
}
function defineWebSite(input) {
  return provideResolver(input, "webSite");
}
function useSchemaOrg(input) {
  const config = (/* @__PURE__ */ useRuntimeConfig())["nuxt-schema-org"] || (/* @__PURE__ */ useRuntimeConfig()).public["nuxt-schema-org"];
  const script = {
    type: "application/ld+json",
    key: "schema-org-graph",
    nodes: input,
    ...(config == null ? void 0 : config.scriptAttributes) || {}
  };
  {
    return useServerHead({
      script: [script]
    });
  }
}
const defaults_TgNupsGd8e = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt-schema-org:defaults",
  setup() {
    const runtimeConfig = (/* @__PURE__ */ useRuntimeConfig())["nuxt-schema-org"] || (/* @__PURE__ */ useRuntimeConfig()).public["nuxt-schema-org"];
    const siteConfig = useSiteConfig();
    if (!(siteConfig == null ? void 0 : siteConfig.name))
      return;
    useSchemaOrg([
      defineWebSite({
        name: (siteConfig == null ? void 0 : siteConfig.name) || "",
        inLanguage: (siteConfig == null ? void 0 : siteConfig.currentLocale) || "",
        description: (siteConfig == null ? void 0 : siteConfig.description) || ""
      }),
      defineWebPage()
    ]);
    if (runtimeConfig.identity || siteConfig.identity) {
      const identity = runtimeConfig.identity || siteConfig.identity;
      let identityPayload = {
        name: siteConfig.name,
        url: siteConfig.url
      };
      let identityType = "Organization";
      if (typeof identity !== "string") {
        identityPayload = defu(identity, identityPayload);
        identityType = identity.type;
      } else {
        identityType = identity;
      }
      if (siteConfig.twitter) {
        const id = siteConfig.twitter.startsWith("@") ? siteConfig.twitter.slice(1) : siteConfig.twitter;
        identityPayload.sameAs = [
          `https://twitter.com/${id}`
        ];
      }
      useSchemaOrg([
        identityType === "Person" ? definePerson(identityPayload) : defineOrganization(identityPayload)
      ]);
    }
  }
});
function isInternalRoute(path) {
  const lastSegment = path.split("/").pop() || path;
  return lastSegment.includes(".") || path.startsWith("/__") || path.startsWith("@");
}
function filterIsOgImageOption(key) {
  const keys2 = [
    "url",
    "extension",
    "width",
    "height",
    "fonts",
    "alt",
    "props",
    "renderer",
    "html",
    "component",
    "renderer",
    "emojis",
    "_query",
    "satori",
    "resvg",
    "sharp",
    "screenshot",
    "cacheMaxAgeSeconds"
  ];
  return keys2.includes(key);
}
function separateProps(options, ignoreKeys = []) {
  options = options || {};
  const _props = defu(options.props, Object.fromEntries(
    Object.entries({ ...options }).filter(([k2]) => !filterIsOgImageOption(k2) && !ignoreKeys.includes(k2))
  ));
  const props = {};
  Object.entries(_props).forEach(([key, val]) => {
    props[key.replace(/-([a-z])/g, (g) => g[1].toUpperCase())] = val;
  });
  return {
    ...Object.fromEntries(
      Object.entries({ ...options }).filter(([k2]) => filterIsOgImageOption(k2) || ignoreKeys.includes(k2))
    ),
    props
  };
}
function withoutQuery$1(path) {
  return path.split("?")[0];
}
function getExtension(path) {
  path = withoutQuery$1(path);
  const lastSegment = path.split("/").pop() || path;
  return lastSegment.split(".").pop() || lastSegment;
}
const og_image_canonical_urls_server_3MRa0uZwqs = /* @__PURE__ */ defineNuxtPlugin({
  setup(nuxtApp) {
    nuxtApp.hooks.hook("app:rendered", async (ctx) => {
      const { ssrContext } = ctx;
      const e = useRequestEvent();
      const path = parseURL(e.path).pathname;
      if (isInternalRoute(path))
        return;
      ssrContext == null ? void 0 : ssrContext.head.use({
        key: "nuxt-og-image:overrides-and-canonical-urls",
        hooks: {
          "tags:resolve": async (ctx2) => {
            const hasPrimaryPayload = ctx2.tags.some((tag) => tag.tag === "script" && tag.props.id === "nuxt-og-image-options");
            let overrides;
            for (const tag of ctx2.tags) {
              if (tag.tag === "script" && tag.props.id === "nuxt-og-image-overrides") {
                if (hasPrimaryPayload) {
                  overrides = separateProps(JSON.parse(tag.innerHTML || "{}"));
                  delete ctx2.tags[ctx2.tags.indexOf(tag)];
                } else {
                  tag.props.id = "nuxt-og-image-options";
                  tag.innerHTML = JSON.stringify(separateProps(JSON.parse(tag.innerHTML || "{}")));
                  tag._d = "script:id:nuxt-og-image-options";
                }
                break;
              }
            }
            ctx2.tags = ctx2.tags.filter(Boolean);
            for (const tag of ctx2.tags) {
              if (tag.tag === "meta" && (tag.props.property === "og:image" || tag.props.name === "twitter:image:src")) {
                if (!tag.props.content.startsWith("https")) {
                  await nuxtApp.runWithContext(() => {
                    tag.props.content = toValue(withSiteUrl(tag.props.content));
                  });
                }
              } else if (overrides && tag.tag === "script" && tag.props.id === "nuxt-og-image-options") {
                tag.innerHTML = JSON.stringify(defu(overrides, JSON.parse(tag.innerHTML)));
              }
            }
          }
        }
      });
    });
  }
});
function getOgImagePath(pagePath, _options) {
  const options = defu(_options, useOgImageRuntimeConfig().defaults);
  return joinURL("/__og-image__/image", pagePath, `og.${options.extension}`);
}
function useOgImageRuntimeConfig() {
  return (/* @__PURE__ */ useRuntimeConfig())["nuxt-og-image"];
}
const componentNames = [{ "hash": "9vTbydvSjN", "pascalName": "OgImageThePage", "kebabName": "og-image-the-page", "category": "app" }, { "hash": "i0Vxmj8bqg", "pascalName": "BrandedLogo", "kebabName": "branded-logo", "category": "community", "credits": "Full Stack Heroes <https://fullstackheroes.com/>" }, { "hash": "EtP6PjHVxf", "pascalName": "Nuxt", "kebabName": "nuxt", "category": "community", "credits": "NuxtLabs <https://nuxtlabs.com/>" }, { "hash": "pc4vJGC02t", "pascalName": "NuxtSeo", "kebabName": "nuxt-seo", "category": "community", "credits": "Nuxt SEO <https://nuxtseo.com/>" }, { "hash": "KfQI8hATPp", "pascalName": "Pergel", "kebabName": "pergel", "category": "community", "credits": "Pergel <https://nuxtlabs.com/>" }, { "hash": "YDrRRvPRVl", "pascalName": "SimpleBlog", "kebabName": "simple-blog", "category": "community", "credits": "Full Stack Heroes <https://fullstackheroes.com/>" }, { "hash": "wt558K6QyQ", "pascalName": "UnJs", "kebabName": "un-js", "category": "community", "credits": "UnJS <https://unjs.io/>" }, { "hash": "6RdQZcuwZZ", "pascalName": "Wave", "kebabName": "wave", "category": "community", "credits": "Full Stack Heroes <https://fullstackheroes.com/>" }, { "hash": "gaB1TrbtTl", "pascalName": "WithEmoji", "kebabName": "with-emoji", "category": "community", "credits": "Full Stack Heroes <https://fullstackheroes.com/>" }];
function createOgImageMeta(src, input, resolvedOptions, ssrContext) {
  const _input = separateProps(defu(input, ssrContext._ogImagePayload));
  let url = src || input.url || resolvedOptions.url;
  if (!url)
    return;
  if (input._query && Object.keys(input._query).length && url)
    url = withQuery(url, { _query: input._query });
  let urlExtension = getExtension(url) || resolvedOptions.extension;
  if (urlExtension === "jpg")
    urlExtension = "jpeg";
  const meta = [
    { property: "og:image", content: url },
    { property: "og:image:type", content: `image/${urlExtension}` },
    { name: "twitter:card", content: "summary_large_image" },
    // we don't need this but avoids issue when using useSeoMeta({ twitterImage })
    { name: "twitter:image", content: url },
    { name: "twitter:image:src", content: url }
  ];
  if (resolvedOptions.width) {
    meta.push({ property: "og:image:width", content: resolvedOptions.width });
    meta.push({ name: "twitter:image:width", content: resolvedOptions.width });
  }
  if (resolvedOptions.height) {
    meta.push({ property: "og:image:height", content: resolvedOptions.height });
    meta.push({ name: "twitter:image:height", content: resolvedOptions.height });
  }
  if (resolvedOptions.alt) {
    meta.push({ property: "og:image:alt", content: resolvedOptions.alt });
    meta.push({ name: "twitter:image:alt", content: resolvedOptions.alt });
  }
  ssrContext._ogImageInstances = ssrContext._ogImageInstances || [];
  const script = [];
  if (src) {
    script.push({
      id: "nuxt-og-image-options",
      type: "application/json",
      processTemplateParams: true,
      innerHTML: () => {
        if (!_input.props.title)
          _input.props.title = "%s";
        delete _input.url;
        return _input;
      },
      // we want this to be last in our head
      tagPosition: "bodyClose"
    });
  }
  const instance = useServerHead({
    script,
    meta
  }, {
    tagPriority: 35
  });
  ssrContext._ogImagePayload = _input;
  ssrContext._ogImageInstances.push(instance);
}
function normaliseOptions(_options) {
  const options = { ...unref(_options) };
  if (!options)
    return options;
  if (options.component && componentNames) {
    const originalName = options.component;
    for (const component of componentNames) {
      if (component.pascalName.endsWith(originalName) || component.kebabName.endsWith(originalName)) {
        options.component = component.pascalName;
        break;
      }
    }
  }
  return options;
}
const route_rule_og_image_server_OQYH1Ux5Eu = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hooks.hook("app:rendered", async (ctx) => {
    var _a2, _b2, _c, _d, _e, _f;
    const { ssrContext } = ctx;
    const e = useRequestEvent();
    const path = parseURL(e.path).pathname;
    if (isInternalRoute(path))
      return;
    const _routeRulesMatcher = toRouteMatcher(
      createRouter({ routes: (_b2 = (_a2 = ssrContext == null ? void 0 : ssrContext.runtimeConfig) == null ? void 0 : _a2.nitro) == null ? void 0 : _b2.routeRules })
    );
    let routeRules = defu({}, ..._routeRulesMatcher.matchAll(
      withoutBase(path.split("?")[0], (_c = ssrContext == null ? void 0 : ssrContext.runtimeConfig) == null ? void 0 : _c.app.baseURL)
    ).reverse()).ogImage;
    if (typeof routeRules === "undefined")
      return;
    const ogImageInstances = nuxtApp.ssrContext._ogImageInstances || [];
    if (routeRules === false) {
      ogImageInstances == null ? void 0 : ogImageInstances.forEach((e2) => {
        e2.dispose();
      });
      nuxtApp.ssrContext._ogImagePayload = void 0;
      nuxtApp.ssrContext._ogImageInstances = void 0;
      return;
    }
    routeRules = defu((_f = (_e = (_d = nuxtApp.ssrContext) == null ? void 0 : _d.event.context._nitro) == null ? void 0 : _e.routeRules) == null ? void 0 : _f.ogImage, routeRules);
    const { defaults: defaults2 } = useOgImageRuntimeConfig();
    const resolvedOptions = normaliseOptions(defu(routeRules, defaults2));
    const src = getOgImagePath(ssrContext.url, resolvedOptions);
    createOgImageMeta(src, routeRules, resolvedOptions, nuxtApp.ssrContext);
  });
});
const robot_meta_server_oar2tuqbRB = /* @__PURE__ */ defineNuxtPlugin({
  setup() {
    const event = useRequestEvent();
    const ctx = event.context.robots;
    if (!ctx)
      return;
    useServerHead({
      meta: [
        {
          "name": "robots",
          "content": () => ctx.rule || "",
          "data-hint": void 0
        }
      ]
    });
  }
});
function dateConfiguration() {
  const options = JSON.parse("{}");
  return options;
}
function configureDate(vuetifyOptions) {
  const dateOptions = dateConfiguration();
  vuetifyOptions.date = dateOptions;
}
const vuetify_date_BsJkzwGv36 = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("vuetify:configuration", ({ vuetifyOptions }) => {
    configureDate(vuetifyOptions);
  });
});
const IN_BROWSER = false;
const SUPPORTS_TOUCH = IN_BROWSER;
function getNestedValue(obj, path, fallback) {
  const last = path.length - 1;
  if (last < 0)
    return obj === void 0 ? fallback : obj;
  for (let i = 0; i < last; i++) {
    if (obj == null) {
      return fallback;
    }
    obj = obj[path[i]];
  }
  if (obj == null)
    return fallback;
  return obj[path[last]] === void 0 ? fallback : obj[path[last]];
}
function deepEqual(a, b) {
  if (a === b)
    return true;
  if (a instanceof Date && b instanceof Date && a.getTime() !== b.getTime()) {
    return false;
  }
  if (a !== Object(a) || b !== Object(b)) {
    return false;
  }
  const props = Object.keys(a);
  if (props.length !== Object.keys(b).length) {
    return false;
  }
  return props.every((p2) => deepEqual(a[p2], b[p2]));
}
function getObjectValueByPath(obj, path, fallback) {
  if (obj == null || !path || typeof path !== "string")
    return fallback;
  if (obj[path] !== void 0)
    return obj[path];
  path = path.replace(/\[(\w+)\]/g, ".$1");
  path = path.replace(/^\./, "");
  return getNestedValue(obj, path.split("."), fallback);
}
function getPropertyFromItem(item, property, fallback) {
  if (property === true)
    return item === void 0 ? fallback : item;
  if (property == null || typeof property === "boolean")
    return fallback;
  if (item !== Object(item)) {
    if (typeof property !== "function")
      return fallback;
    const value2 = property(item, fallback);
    return typeof value2 === "undefined" ? fallback : value2;
  }
  if (typeof property === "string")
    return getObjectValueByPath(item, property, fallback);
  if (Array.isArray(property))
    return getNestedValue(item, property, fallback);
  if (typeof property !== "function")
    return fallback;
  const value = property(item, fallback);
  return typeof value === "undefined" ? fallback : value;
}
function createRange(length) {
  let start = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return Array.from({
    length
  }, (v, k2) => start + k2);
}
function convertToUnit(str) {
  let unit = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "px";
  if (str == null || str === "") {
    return void 0;
  } else if (isNaN(+str)) {
    return String(str);
  } else if (!isFinite(+str)) {
    return void 0;
  } else {
    return `${Number(str)}${unit}`;
  }
}
function isObject(obj) {
  return obj !== null && typeof obj === "object" && !Array.isArray(obj);
}
function refElement(obj) {
  if (obj && "$el" in obj) {
    const el = obj.$el;
    if ((el == null ? void 0 : el.nodeType) === Node.TEXT_NODE) {
      return el.nextElementSibling;
    }
    return el;
  }
  return obj;
}
const keyCodes = Object.freeze({
  enter: 13,
  tab: 9,
  delete: 46,
  esc: 27,
  space: 32,
  up: 38,
  down: 40,
  left: 37,
  right: 39,
  end: 35,
  home: 36,
  del: 46,
  backspace: 8,
  insert: 45,
  pageup: 33,
  pagedown: 34,
  shift: 16
});
function keys(o) {
  return Object.keys(o);
}
function has(obj, key) {
  return key.every((k2) => obj.hasOwnProperty(k2));
}
function pick(obj, paths) {
  const found = {};
  const keys2 = new Set(Object.keys(obj));
  for (const path of paths) {
    if (keys2.has(path)) {
      found[path] = obj[path];
    }
  }
  return found;
}
function pickWithRest(obj, paths, exclude) {
  const found = /* @__PURE__ */ Object.create(null);
  const rest = /* @__PURE__ */ Object.create(null);
  for (const key in obj) {
    if (paths.some((path) => path instanceof RegExp ? path.test(key) : path === key) && !(exclude == null ? void 0 : exclude.some((path) => path === key))) {
      found[key] = obj[key];
    } else {
      rest[key] = obj[key];
    }
  }
  return [found, rest];
}
function omit(obj, exclude) {
  const clone = {
    ...obj
  };
  exclude.forEach((prop) => delete clone[prop]);
  return clone;
}
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const bubblingEvents = ["onAfterscriptexecute", "onAnimationcancel", "onAnimationend", "onAnimationiteration", "onAnimationstart", "onAuxclick", "onBeforeinput", "onBeforescriptexecute", "onChange", "onClick", "onCompositionend", "onCompositionstart", "onCompositionupdate", "onContextmenu", "onCopy", "onCut", "onDblclick", "onFocusin", "onFocusout", "onFullscreenchange", "onFullscreenerror", "onGesturechange", "onGestureend", "onGesturestart", "onGotpointercapture", "onInput", "onKeydown", "onKeypress", "onKeyup", "onLostpointercapture", "onMousedown", "onMousemove", "onMouseout", "onMouseover", "onMouseup", "onMousewheel", "onPaste", "onPointercancel", "onPointerdown", "onPointerenter", "onPointerleave", "onPointermove", "onPointerout", "onPointerover", "onPointerup", "onReset", "onSelect", "onSubmit", "onTouchcancel", "onTouchend", "onTouchmove", "onTouchstart", "onTransitioncancel", "onTransitionend", "onTransitionrun", "onTransitionstart", "onWheel"];
function filterInputAttrs(attrs) {
  const [events, props] = pickWithRest(attrs, [onRE]);
  const inputEvents = omit(events, bubblingEvents);
  const [rootAttrs, inputAttrs] = pickWithRest(props, ["class", "style", "id", /^data-/]);
  Object.assign(rootAttrs, events);
  Object.assign(inputAttrs, inputEvents);
  return [rootAttrs, inputAttrs];
}
function wrapInArray(v) {
  return v == null ? [] : Array.isArray(v) ? v : [v];
}
function debounce(fn, delay) {
  let timeoutId = 0;
  const wrap = function() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), unref(delay));
  };
  wrap.clear = () => {
    clearTimeout(timeoutId);
  };
  wrap.immediate = fn;
  return wrap;
}
function clamp(value) {
  let min = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  let max = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
  return Math.max(min, Math.min(max, value));
}
function padEnd(str, length) {
  let char = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "0";
  return str + char.repeat(Math.max(0, length - str.length));
}
function padStart(str, length) {
  let char = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "0";
  return char.repeat(Math.max(0, length - str.length)) + str;
}
function chunk(str) {
  let size = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  const chunked = [];
  let index = 0;
  while (index < str.length) {
    chunked.push(str.substr(index, size));
    index += size;
  }
  return chunked;
}
function chunkArray(array) {
  let size = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  return Array.from({
    length: Math.ceil(array.length / size)
  }, (v, i) => array.slice(i * size, i * size + size));
}
function mergeDeep() {
  let source = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  let target = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  let arrayFn = arguments.length > 2 ? arguments[2] : void 0;
  const out = {};
  for (const key in source) {
    out[key] = source[key];
  }
  for (const key in target) {
    const sourceProperty = source[key];
    const targetProperty = target[key];
    if (isObject(sourceProperty) && isObject(targetProperty)) {
      out[key] = mergeDeep(sourceProperty, targetProperty, arrayFn);
      continue;
    }
    if (Array.isArray(sourceProperty) && Array.isArray(targetProperty) && arrayFn) {
      out[key] = arrayFn(sourceProperty, targetProperty);
      continue;
    }
    out[key] = targetProperty;
  }
  return out;
}
function flattenFragments(nodes) {
  return nodes.map((node) => {
    if (node.type === Fragment) {
      return flattenFragments(node.children);
    } else {
      return node;
    }
  }).flat();
}
function toKebabCase() {
  let str = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  if (toKebabCase.cache.has(str))
    return toKebabCase.cache.get(str);
  const kebab = str.replace(/[^a-z]/gi, "-").replace(/\B([A-Z])/g, "-$1").toLowerCase();
  toKebabCase.cache.set(str, kebab);
  return kebab;
}
toKebabCase.cache = /* @__PURE__ */ new Map();
function findChildrenWithProvide(key, vnode) {
  if (!vnode || typeof vnode !== "object")
    return [];
  if (Array.isArray(vnode)) {
    return vnode.map((child) => findChildrenWithProvide(key, child)).flat(1);
  } else if (Array.isArray(vnode.children)) {
    return vnode.children.map((child) => findChildrenWithProvide(key, child)).flat(1);
  } else if (vnode.component) {
    if (Object.getOwnPropertySymbols(vnode.component.provides).includes(key)) {
      return [vnode.component];
    } else if (vnode.component.subTree) {
      return findChildrenWithProvide(key, vnode.component.subTree).flat(1);
    }
  }
  return [];
}
function destructComputed(getter) {
  const refs = reactive({});
  const base = computed(getter);
  watchEffect(() => {
    for (const key in base.value) {
      refs[key] = base.value[key];
    }
  }, {
    flush: "sync"
  });
  return toRefs(refs);
}
function includes(arr, val) {
  return arr.includes(val);
}
function eventName(propName) {
  return propName[2].toLowerCase() + propName.slice(3);
}
const EventProp = () => [Function, Array];
function hasEvent(props, name) {
  name = "on" + capitalize(name);
  return !!(props[name] || props[`${name}Once`] || props[`${name}Capture`] || props[`${name}OnceCapture`] || props[`${name}CaptureOnce`]);
}
function callEvent(handler) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }
  if (Array.isArray(handler)) {
    for (const h2 of handler) {
      h2(...args);
    }
  } else if (typeof handler === "function") {
    handler(...args);
  }
}
function focusableChildren(el) {
  let filterByTabIndex = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
  const targets = ["button", "[href]", 'input:not([type="hidden"])', "select", "textarea", "[tabindex]"].map((s) => `${s}${filterByTabIndex ? ':not([tabindex="-1"])' : ""}:not([disabled])`).join(", ");
  return [...el.querySelectorAll(targets)];
}
function getNextElement(elements, location, condition) {
  let _el;
  let idx = elements.indexOf((void 0).activeElement);
  const inc = location === "next" ? 1 : -1;
  do {
    idx += inc;
    _el = elements[idx];
  } while ((!_el || _el.offsetParent == null || !((condition == null ? void 0 : condition(_el)) ?? true)) && idx < elements.length && idx >= 0);
  return _el;
}
function focusChild(el, location) {
  var _a2, _b2, _c, _d;
  const focusable = focusableChildren(el);
  if (!location) {
    if (el === (void 0).activeElement || !el.contains((void 0).activeElement)) {
      (_a2 = focusable[0]) == null ? void 0 : _a2.focus();
    }
  } else if (location === "first") {
    (_b2 = focusable[0]) == null ? void 0 : _b2.focus();
  } else if (location === "last") {
    (_c = focusable.at(-1)) == null ? void 0 : _c.focus();
  } else if (typeof location === "number") {
    (_d = focusable[location]) == null ? void 0 : _d.focus();
  } else {
    const _el = getNextElement(focusable, location);
    if (_el)
      _el.focus();
    else
      focusChild(el, location === "next" ? "first" : "last");
  }
}
function matchesSelector(el, selector) {
  return null;
}
function ensureValidVNode(vnodes) {
  return vnodes.some((child) => {
    if (!isVNode(child))
      return true;
    if (child.type === Comment)
      return false;
    return child.type !== Fragment || ensureValidVNode(child.children);
  }) ? vnodes : null;
}
function defer(timeout, cb) {
  {
    cb();
    return () => {
    };
  }
}
const block = ["top", "bottom"];
const inline = ["start", "end", "left", "right"];
function parseAnchor(anchor, isRtl) {
  let [side, align] = anchor.split(" ");
  if (!align) {
    align = includes(block, side) ? "start" : includes(inline, side) ? "top" : "center";
  }
  return {
    side: toPhysical(side, isRtl),
    align: toPhysical(align, isRtl)
  };
}
function toPhysical(str, isRtl) {
  if (str === "start")
    return isRtl ? "right" : "left";
  if (str === "end")
    return isRtl ? "left" : "right";
  return str;
}
function flipSide(anchor) {
  return {
    side: {
      center: "center",
      top: "bottom",
      bottom: "top",
      left: "right",
      right: "left"
    }[anchor.side],
    align: anchor.align
  };
}
function flipAlign(anchor) {
  return {
    side: anchor.side,
    align: {
      center: "center",
      top: "bottom",
      bottom: "top",
      left: "right",
      right: "left"
    }[anchor.align]
  };
}
function flipCorner(anchor) {
  return {
    side: anchor.align,
    align: anchor.side
  };
}
function getAxis(anchor) {
  return includes(block, anchor.side) ? "y" : "x";
}
const mainTRC = 2.4;
const Rco = 0.2126729;
const Gco = 0.7151522;
const Bco = 0.072175;
const normBG = 0.55;
const normTXT = 0.58;
const revTXT = 0.57;
const revBG = 0.62;
const blkThrs = 0.03;
const blkClmp = 1.45;
const deltaYmin = 5e-4;
const scaleBoW = 1.25;
const scaleWoB = 1.25;
const loConThresh = 0.078;
const loConFactor = 12.82051282051282;
const loConOffset = 0.06;
const loClip = 1e-3;
function APCAcontrast(text, background) {
  const Rtxt = (text.r / 255) ** mainTRC;
  const Gtxt = (text.g / 255) ** mainTRC;
  const Btxt = (text.b / 255) ** mainTRC;
  const Rbg = (background.r / 255) ** mainTRC;
  const Gbg = (background.g / 255) ** mainTRC;
  const Bbg = (background.b / 255) ** mainTRC;
  let Ytxt = Rtxt * Rco + Gtxt * Gco + Btxt * Bco;
  let Ybg = Rbg * Rco + Gbg * Gco + Bbg * Bco;
  if (Ytxt <= blkThrs)
    Ytxt += (blkThrs - Ytxt) ** blkClmp;
  if (Ybg <= blkThrs)
    Ybg += (blkThrs - Ybg) ** blkClmp;
  if (Math.abs(Ybg - Ytxt) < deltaYmin)
    return 0;
  let outputContrast;
  if (Ybg > Ytxt) {
    const SAPC = (Ybg ** normBG - Ytxt ** normTXT) * scaleBoW;
    outputContrast = SAPC < loClip ? 0 : SAPC < loConThresh ? SAPC - SAPC * loConFactor * loConOffset : SAPC - loConOffset;
  } else {
    const SAPC = (Ybg ** revBG - Ytxt ** revTXT) * scaleWoB;
    outputContrast = SAPC > -loClip ? 0 : SAPC > -loConThresh ? SAPC - SAPC * loConFactor * loConOffset : SAPC + loConOffset;
  }
  return outputContrast * 100;
}
function consoleWarn(message) {
  warn(`Vuetify: ${message}`);
}
function consoleError(message) {
  warn(`Vuetify error: ${message}`);
}
function deprecate(original, replacement) {
  replacement = Array.isArray(replacement) ? replacement.slice(0, -1).map((s) => `'${s}'`).join(", ") + ` or '${replacement.at(-1)}'` : `'${replacement}'`;
  warn(`[Vuetify UPGRADE] '${original}' is deprecated, use ${replacement} instead.`);
}
const delta = 0.20689655172413793;
const cielabForwardTransform = (t) => t > delta ** 3 ? Math.cbrt(t) : t / (3 * delta ** 2) + 4 / 29;
const cielabReverseTransform = (t) => t > delta ? t ** 3 : 3 * delta ** 2 * (t - 4 / 29);
function fromXYZ$1(xyz) {
  const transform2 = cielabForwardTransform;
  const transformedY = transform2(xyz[1]);
  return [116 * transformedY - 16, 500 * (transform2(xyz[0] / 0.95047) - transformedY), 200 * (transformedY - transform2(xyz[2] / 1.08883))];
}
function toXYZ$1(lab) {
  const transform2 = cielabReverseTransform;
  const Ln = (lab[0] + 16) / 116;
  return [transform2(Ln + lab[1] / 500) * 0.95047, transform2(Ln), transform2(Ln - lab[2] / 200) * 1.08883];
}
const srgbForwardMatrix = [[3.2406, -1.5372, -0.4986], [-0.9689, 1.8758, 0.0415], [0.0557, -0.204, 1.057]];
const srgbForwardTransform = (C) => C <= 31308e-7 ? C * 12.92 : 1.055 * C ** (1 / 2.4) - 0.055;
const srgbReverseMatrix = [[0.4124, 0.3576, 0.1805], [0.2126, 0.7152, 0.0722], [0.0193, 0.1192, 0.9505]];
const srgbReverseTransform = (C) => C <= 0.04045 ? C / 12.92 : ((C + 0.055) / 1.055) ** 2.4;
function fromXYZ(xyz) {
  const rgb = Array(3);
  const transform2 = srgbForwardTransform;
  const matrix = srgbForwardMatrix;
  for (let i = 0; i < 3; ++i) {
    rgb[i] = Math.round(clamp(transform2(matrix[i][0] * xyz[0] + matrix[i][1] * xyz[1] + matrix[i][2] * xyz[2])) * 255);
  }
  return {
    r: rgb[0],
    g: rgb[1],
    b: rgb[2]
  };
}
function toXYZ(_ref) {
  let {
    r,
    g,
    b
  } = _ref;
  const xyz = [0, 0, 0];
  const transform2 = srgbReverseTransform;
  const matrix = srgbReverseMatrix;
  r = transform2(r / 255);
  g = transform2(g / 255);
  b = transform2(b / 255);
  for (let i = 0; i < 3; ++i) {
    xyz[i] = matrix[i][0] * r + matrix[i][1] * g + matrix[i][2] * b;
  }
  return xyz;
}
function isCssColor(color) {
  return !!color && /^(#|var\(--|(rgb|hsl)a?\()/.test(color);
}
function isParsableColor(color) {
  return isCssColor(color) && !/^((rgb|hsl)a?\()?var\(--/.test(color);
}
const cssColorRe = /^(?<fn>(?:rgb|hsl)a?)\((?<values>.+)\)/;
const mappers = {
  rgb: (r, g, b, a) => ({
    r,
    g,
    b,
    a
  }),
  rgba: (r, g, b, a) => ({
    r,
    g,
    b,
    a
  }),
  hsl: (h2, s, l, a) => HSLtoRGB({
    h: h2,
    s,
    l,
    a
  }),
  hsla: (h2, s, l, a) => HSLtoRGB({
    h: h2,
    s,
    l,
    a
  }),
  hsv: (h2, s, v, a) => HSVtoRGB({
    h: h2,
    s,
    v,
    a
  }),
  hsva: (h2, s, v, a) => HSVtoRGB({
    h: h2,
    s,
    v,
    a
  })
};
function parseColor(color) {
  if (typeof color === "number") {
    if (isNaN(color) || color < 0 || color > 16777215) {
      consoleWarn(`'${color}' is not a valid hex color`);
    }
    return {
      r: (color & 16711680) >> 16,
      g: (color & 65280) >> 8,
      b: color & 255
    };
  } else if (typeof color === "string" && cssColorRe.test(color)) {
    const {
      groups
    } = color.match(cssColorRe);
    const {
      fn,
      values
    } = groups;
    const realValues = values.split(/,\s*/).map((v) => {
      if (v.endsWith("%") && ["hsl", "hsla", "hsv", "hsva"].includes(fn)) {
        return parseFloat(v) / 100;
      } else {
        return parseFloat(v);
      }
    });
    return mappers[fn](...realValues);
  } else if (typeof color === "string") {
    let hex = color.startsWith("#") ? color.slice(1) : color;
    if ([3, 4].includes(hex.length)) {
      hex = hex.split("").map((char) => char + char).join("");
    } else if (![6, 8].includes(hex.length)) {
      consoleWarn(`'${color}' is not a valid hex(a) color`);
    }
    const int = parseInt(hex, 16);
    if (isNaN(int) || int < 0 || int > 4294967295) {
      consoleWarn(`'${color}' is not a valid hex(a) color`);
    }
    return HexToRGB(hex);
  } else if (typeof color === "object") {
    if (has(color, ["r", "g", "b"])) {
      return color;
    } else if (has(color, ["h", "s", "l"])) {
      return HSVtoRGB(HSLtoHSV(color));
    } else if (has(color, ["h", "s", "v"])) {
      return HSVtoRGB(color);
    }
  }
  throw new TypeError(`Invalid color: ${color == null ? color : String(color) || color.constructor.name}
Expected #hex, #hexa, rgb(), rgba(), hsl(), hsla(), object or number`);
}
function HSVtoRGB(hsva) {
  const {
    h: h2,
    s,
    v,
    a
  } = hsva;
  const f = (n) => {
    const k2 = (n + h2 / 60) % 6;
    return v - v * s * Math.max(Math.min(k2, 4 - k2, 1), 0);
  };
  const rgb = [f(5), f(3), f(1)].map((v2) => Math.round(v2 * 255));
  return {
    r: rgb[0],
    g: rgb[1],
    b: rgb[2],
    a
  };
}
function HSLtoRGB(hsla) {
  return HSVtoRGB(HSLtoHSV(hsla));
}
function HSLtoHSV(hsl) {
  const {
    h: h2,
    s,
    l,
    a
  } = hsl;
  const v = l + s * Math.min(l, 1 - l);
  const sprime = v === 0 ? 0 : 2 - 2 * l / v;
  return {
    h: h2,
    s: sprime,
    v,
    a
  };
}
function toHex(v) {
  const h2 = Math.round(v).toString(16);
  return ("00".substr(0, 2 - h2.length) + h2).toUpperCase();
}
function RGBtoHex(_ref2) {
  let {
    r,
    g,
    b,
    a
  } = _ref2;
  return `#${[toHex(r), toHex(g), toHex(b), a !== void 0 ? toHex(Math.round(a * 255)) : ""].join("")}`;
}
function HexToRGB(hex) {
  hex = parseHex(hex);
  let [r, g, b, a] = chunk(hex, 2).map((c) => parseInt(c, 16));
  a = a === void 0 ? a : a / 255;
  return {
    r,
    g,
    b,
    a
  };
}
function parseHex(hex) {
  if (hex.startsWith("#")) {
    hex = hex.slice(1);
  }
  hex = hex.replace(/([^0-9a-f])/gi, "F");
  if (hex.length === 3 || hex.length === 4) {
    hex = hex.split("").map((x) => x + x).join("");
  }
  if (hex.length !== 6) {
    hex = padEnd(padEnd(hex, 6), 8, "F");
  }
  return hex;
}
function lighten(value, amount) {
  const lab = fromXYZ$1(toXYZ(value));
  lab[0] = lab[0] + amount * 10;
  return fromXYZ(toXYZ$1(lab));
}
function darken(value, amount) {
  const lab = fromXYZ$1(toXYZ(value));
  lab[0] = lab[0] - amount * 10;
  return fromXYZ(toXYZ$1(lab));
}
function getLuma(color) {
  const rgb = parseColor(color);
  return toXYZ(rgb)[1];
}
function getForeground(color) {
  const blackContrast = Math.abs(APCAcontrast(parseColor(0), parseColor(color)));
  const whiteContrast = Math.abs(APCAcontrast(parseColor(16777215), parseColor(color)));
  return whiteContrast > Math.min(blackContrast, 50) ? "#fff" : "#000";
}
function propsFactory(props, source) {
  return (defaults2) => {
    return Object.keys(props).reduce((obj, prop) => {
      const isObjectDefinition = typeof props[prop] === "object" && props[prop] != null && !Array.isArray(props[prop]);
      const definition = isObjectDefinition ? props[prop] : {
        type: props[prop]
      };
      if (defaults2 && prop in defaults2) {
        obj[prop] = {
          ...definition,
          default: defaults2[prop]
        };
      } else {
        obj[prop] = definition;
      }
      if (source && !obj[prop].source) {
        obj[prop].source = source;
      }
      return obj;
    }, {});
  };
}
const makeComponentProps = propsFactory({
  class: [String, Array],
  style: {
    type: [String, Array, Object],
    default: null
  }
}, "component");
const DefaultsSymbol = Symbol.for("vuetify:defaults");
function createDefaults(options) {
  return ref(options);
}
function injectDefaults() {
  const defaults2 = inject$1(DefaultsSymbol);
  if (!defaults2)
    throw new Error("[Vuetify] Could not find defaults instance");
  return defaults2;
}
function provideDefaults(defaults2, options) {
  const injectedDefaults = injectDefaults();
  const providedDefaults = ref(defaults2);
  const newDefaults = computed(() => {
    const disabled = unref(options == null ? void 0 : options.disabled);
    if (disabled)
      return injectedDefaults.value;
    const scoped = unref(options == null ? void 0 : options.scoped);
    const reset = unref(options == null ? void 0 : options.reset);
    const root = unref(options == null ? void 0 : options.root);
    if (providedDefaults.value == null && !(scoped || reset || root))
      return injectedDefaults.value;
    let properties = mergeDeep(providedDefaults.value, {
      prev: injectedDefaults.value
    });
    if (scoped)
      return properties;
    if (reset || root) {
      const len = Number(reset || Infinity);
      for (let i = 0; i <= len; i++) {
        if (!properties || !("prev" in properties)) {
          break;
        }
        properties = properties.prev;
      }
      if (properties && typeof root === "string" && root in properties) {
        properties = mergeDeep(mergeDeep(properties, {
          prev: properties
        }), properties[root]);
      }
      return properties;
    }
    return properties.prev ? mergeDeep(properties.prev, properties) : properties;
  });
  provide(DefaultsSymbol, newDefaults);
  return newDefaults;
}
function propIsDefined(vnode, prop) {
  var _a2, _b2;
  return typeof ((_a2 = vnode.props) == null ? void 0 : _a2[prop]) !== "undefined" || typeof ((_b2 = vnode.props) == null ? void 0 : _b2[toKebabCase(prop)]) !== "undefined";
}
function internalUseDefaults() {
  let props = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  let name = arguments.length > 1 ? arguments[1] : void 0;
  let defaults2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : injectDefaults();
  const vm = getCurrentInstance("useDefaults");
  name = name ?? vm.type.name ?? vm.type.__name;
  if (!name) {
    throw new Error("[Vuetify] Could not determine component name");
  }
  const componentDefaults = computed(() => {
    var _a2;
    return (_a2 = defaults2.value) == null ? void 0 : _a2[props._as ?? name];
  });
  const _props = new Proxy(props, {
    get(target, prop) {
      var _a2, _b2, _c, _d;
      const propValue = Reflect.get(target, prop);
      if (prop === "class" || prop === "style") {
        return [(_a2 = componentDefaults.value) == null ? void 0 : _a2[prop], propValue].filter((v) => v != null);
      } else if (typeof prop === "string" && !propIsDefined(vm.vnode, prop)) {
        return ((_b2 = componentDefaults.value) == null ? void 0 : _b2[prop]) ?? ((_d = (_c = defaults2.value) == null ? void 0 : _c.global) == null ? void 0 : _d[prop]) ?? propValue;
      }
      return propValue;
    }
  });
  const _subcomponentDefaults = shallowRef();
  watchEffect(() => {
    if (componentDefaults.value) {
      const subComponents = Object.entries(componentDefaults.value).filter((_ref) => {
        let [key] = _ref;
        return key.startsWith(key[0].toUpperCase());
      });
      _subcomponentDefaults.value = subComponents.length ? Object.fromEntries(subComponents) : void 0;
    } else {
      _subcomponentDefaults.value = void 0;
    }
  });
  function provideSubDefaults() {
    const injected = injectSelf(DefaultsSymbol, vm);
    provide(DefaultsSymbol, computed(() => {
      return _subcomponentDefaults.value ? mergeDeep((injected == null ? void 0 : injected.value) ?? {}, _subcomponentDefaults.value) : injected == null ? void 0 : injected.value;
    }));
  }
  return {
    props: _props,
    provideSubDefaults
  };
}
function defineComponent(options) {
  options._setup = options._setup ?? options.setup;
  if (!options.name) {
    consoleWarn("The component is missing an explicit name, unable to generate default prop value");
    return options;
  }
  if (options._setup) {
    options.props = propsFactory(options.props ?? {}, options.name)();
    const propKeys = Object.keys(options.props).filter((key) => key !== "class" && key !== "style");
    options.filterProps = function filterProps(props) {
      return pick(props, propKeys);
    };
    options.props._as = String;
    options.setup = function setup(props, ctx) {
      const defaults2 = injectDefaults();
      if (!defaults2.value)
        return options._setup(props, ctx);
      const {
        props: _props,
        provideSubDefaults
      } = internalUseDefaults(props, props._as ?? options.name, defaults2);
      const setupBindings = options._setup(_props, ctx);
      provideSubDefaults();
      return setupBindings;
    };
  }
  return options;
}
function genericComponent() {
  let exposeDefaults = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
  return (options) => (exposeDefaults ? defineComponent : defineComponent$1)(options);
}
function createSimpleFunctional(klass) {
  let tag = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "div";
  let name = arguments.length > 2 ? arguments[2] : void 0;
  return genericComponent()({
    name: name ?? capitalize(camelize(klass.replace(/__/g, "-"))),
    props: {
      tag: {
        type: String,
        default: tag
      },
      ...makeComponentProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      return () => {
        var _a2;
        return h(props.tag, {
          class: [klass, props.class],
          style: props.style
        }, (_a2 = slots.default) == null ? void 0 : _a2.call(slots));
      };
    }
  });
}
function attachedRoot(node) {
  if (typeof node.getRootNode !== "function") {
    while (node.parentNode)
      node = node.parentNode;
    if (node !== void 0)
      return null;
    return void 0;
  }
  const root = node.getRootNode();
  if (root !== void 0 && root.getRootNode({
    composed: true
  }) !== void 0)
    return null;
  return root;
}
function getCurrentInstance(name, message) {
  const vm = getCurrentInstance$1();
  if (!vm) {
    throw new Error(`[Vuetify] ${name} ${message || "must be called from inside a setup function"}`);
  }
  return vm;
}
function getCurrentInstanceName() {
  let name = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "composables";
  const vm = getCurrentInstance(name).type;
  return toKebabCase((vm == null ? void 0 : vm.aliasName) || (vm == null ? void 0 : vm.name));
}
let _uid = 0;
let _map = /* @__PURE__ */ new WeakMap();
function getUid() {
  const vm = getCurrentInstance("getUid");
  if (_map.has(vm))
    return _map.get(vm);
  else {
    const uid = _uid++;
    _map.set(vm, uid);
    return uid;
  }
}
getUid.reset = () => {
  _uid = 0;
  _map = /* @__PURE__ */ new WeakMap();
};
function injectSelf(key) {
  let vm = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstance("injectSelf");
  const {
    provides
  } = vm;
  if (provides && key in provides) {
    return provides[key];
  }
  return void 0;
}
function useRender(render) {
  const vm = getCurrentInstance("useRender");
  vm.render = render;
}
const IconValue = [String, Function, Object, Array];
const IconSymbol = Symbol.for("vuetify:icons");
const makeIconProps = propsFactory({
  icon: {
    type: IconValue
  },
  // Could not remove this and use makeTagProps, types complained because it is not required
  tag: {
    type: String,
    required: true
  }
}, "icon");
const VComponentIcon = genericComponent()({
  name: "VComponentIcon",
  props: makeIconProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    return () => {
      const Icon = props.icon;
      return createVNode(props.tag, null, {
        default: () => {
          var _a2;
          return [props.icon ? createVNode(Icon, null, null) : (_a2 = slots.default) == null ? void 0 : _a2.call(slots)];
        }
      });
    };
  }
});
const VSvgIcon = defineComponent({
  name: "VSvgIcon",
  inheritAttrs: false,
  props: makeIconProps(),
  setup(props, _ref2) {
    let {
      attrs
    } = _ref2;
    return () => {
      return createVNode(props.tag, mergeProps(attrs, {
        "style": null
      }), {
        default: () => [createVNode("svg", {
          "class": "v-icon__svg",
          "xmlns": "http://www.w3.org/2000/svg",
          "viewBox": "0 0 24 24",
          "role": "img",
          "aria-hidden": "true"
        }, [Array.isArray(props.icon) ? props.icon.map((path) => Array.isArray(path) ? createVNode("path", {
          "d": path[0],
          "fill-opacity": path[1]
        }, null) : createVNode("path", {
          "d": path
        }, null)) : createVNode("path", {
          "d": props.icon
        }, null)])]
      });
    };
  }
});
defineComponent({
  name: "VLigatureIcon",
  props: makeIconProps(),
  setup(props) {
    return () => {
      return createVNode(props.tag, null, {
        default: () => [props.icon]
      });
    };
  }
});
const VClassIcon = defineComponent({
  name: "VClassIcon",
  props: makeIconProps(),
  setup(props) {
    return () => {
      return createVNode(props.tag, {
        "class": props.icon
      }, null);
    };
  }
});
const defaultSets = {
  svg: {
    component: VSvgIcon
  },
  class: {
    component: VClassIcon
  }
};
function createIcons(options) {
  return mergeDeep({
    defaultSet: "mdi",
    sets: {
      ...defaultSets,
      mdi
    },
    aliases: {
      ...aliases$1,
      /* eslint-disable max-len */
      vuetify: ["M8.2241 14.2009L12 21L22 3H14.4459L8.2241 14.2009Z", ["M7.26303 12.4733L7.00113 12L2 3H12.5261C12.5261 3 12.5261 3 12.5261 3L7.26303 12.4733Z", 0.6]],
      "vuetify-outline": "svg:M7.26 12.47 12.53 3H2L7.26 12.47ZM14.45 3 8.22 14.2 12 21 22 3H14.45ZM18.6 5 12 16.88 10.51 14.2 15.62 5ZM7.26 8.35 5.4 5H9.13L7.26 8.35Z"
      /* eslint-enable max-len */
    }
  }, options);
}
const useIcon = (props) => {
  const icons = inject$1(IconSymbol);
  if (!icons)
    throw new Error("Missing Vuetify Icons provide!");
  const iconData = computed(() => {
    var _a2;
    const iconAlias = unref(props);
    if (!iconAlias)
      return {
        component: VComponentIcon
      };
    let icon = iconAlias;
    if (typeof icon === "string") {
      icon = icon.trim();
      if (icon.startsWith("$")) {
        icon = (_a2 = icons.aliases) == null ? void 0 : _a2[icon.slice(1)];
      }
    }
    if (!icon)
      throw new Error(`Could not find aliased icon "${iconAlias}"`);
    if (Array.isArray(icon)) {
      return {
        component: VSvgIcon,
        icon
      };
    } else if (typeof icon !== "string") {
      return {
        component: VComponentIcon,
        icon
      };
    }
    const iconSetName = Object.keys(icons.sets).find((setName) => typeof icon === "string" && icon.startsWith(`${setName}:`));
    const iconName = iconSetName ? icon.slice(iconSetName.length + 1) : icon;
    const iconSet = icons.sets[iconSetName ?? icons.defaultSet];
    return {
      component: iconSet.component,
      icon: iconName
    };
  });
  return {
    iconData
  };
};
const aliases$1 = {
  collapse: "mdi-chevron-up",
  complete: "mdi-check",
  cancel: "mdi-close-circle",
  close: "mdi-close",
  delete: "mdi-close-circle",
  // delete (e.g. v-chip close)
  clear: "mdi-close-circle",
  success: "mdi-check-circle",
  info: "mdi-information",
  warning: "mdi-alert-circle",
  error: "mdi-close-circle",
  prev: "mdi-chevron-left",
  next: "mdi-chevron-right",
  checkboxOn: "mdi-checkbox-marked",
  checkboxOff: "mdi-checkbox-blank-outline",
  checkboxIndeterminate: "mdi-minus-box",
  delimiter: "mdi-circle",
  // for carousel
  sortAsc: "mdi-arrow-up",
  sortDesc: "mdi-arrow-down",
  expand: "mdi-chevron-down",
  menu: "mdi-menu",
  subgroup: "mdi-menu-down",
  dropdown: "mdi-menu-down",
  radioOn: "mdi-radiobox-marked",
  radioOff: "mdi-radiobox-blank",
  edit: "mdi-pencil",
  ratingEmpty: "mdi-star-outline",
  ratingFull: "mdi-star",
  ratingHalf: "mdi-star-half-full",
  loading: "mdi-cached",
  first: "mdi-page-first",
  last: "mdi-page-last",
  unfold: "mdi-unfold-more-horizontal",
  file: "mdi-paperclip",
  plus: "mdi-plus",
  minus: "mdi-minus",
  calendar: "mdi-calendar",
  eyeDropper: "mdi-eyedropper"
};
const mdi = {
  // Not using mergeProps here, functional components merge props by default (?)
  component: (props) => h(VClassIcon, {
    ...props,
    class: "mdi"
  })
};
function iconsConfiguration() {
  return {
    defaultSet: "mdi",
    aliases,
    sets: { mdi }
  };
}
const aliases = JSON.parse('{"collapse":"i-mdi:chevron-up","complete":"i-mdi:check","cancel":"i-mdi:close-circle","close":"i-mdi:close","delete":"i-mdi:close-circle","clear":"i-mdi:close-circle","success":"i-mdi:check-circle","info":"i-mdi:information","warning":"i-mdi:alert-circle","error":"i-mdi:close-circle","prev":"i-mdi:chevron-left","next":"i-mdi:chevron-right","checkboxOn":"i-mdi:checkbox-marked","checkboxOff":"i-mdi:checkbox-blank-outline","checkboxIndeterminate":"i-mdi:minus-box","delimiter":"i-mdi:circle","sortAsc":"i-mdi:arrow-up","sortDesc":"i-mdi:arrow-down","expand":"i-mdi:chevron-down","menu":"i-mdi:menu","subgroup":"i-mdi:menu-down","dropdown":"i-mdi:menu-down","radioOn":"i-mdi:radiobox-marked","radioOff":"i-mdi:radiobox-blank","edit":"i-mdi:pencil","ratingEmpty":"i-mdi:star-outline","ratingFull":"i-mdi:star","ratingHalf":"i-mdi:star-half-full","loading":"i-mdi:cached","first":"i-mdi:page-first","last":"i-mdi:page-last","unfold":"i-mdi:unfold-more-horizontal","file":"i-mdi:paperclip","plus":"i-mdi:plus","minus":"i-mdi:minus","calendar":"i-mdi:calendar"}');
function configureIcons(vuetifyOptions) {
  {
    const icons = iconsConfiguration();
    const custom = (icons == null ? void 0 : icons.defaultSet) === "custom";
    if (custom)
      return;
    vuetifyOptions.icons = icons;
  }
}
const vuetify_icons_RMzWu406ID = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("vuetify:configuration", ({ vuetifyOptions }) => {
    configureIcons(vuetifyOptions);
  });
});
const ssrClientHintsConfiguration = JSON.parse('{"reloadOnFirstRequest":true,"viewportSize":true,"prefersColorScheme":true,"prefersReducedMotion":false,"clientWidth":100,"prefersColorSchemeOptions":{"baseUrl":"/","defaultTheme":"light","themeNames":["light","dark"],"cookieName":"color-scheme","darkThemeName":"dark","lightThemeName":"light","useBrowserThemeOnly":false}}');
class BrowserInfo {
  constructor(name, version2, os) {
    __publicField(this, "type", "browser");
    this.name = name;
    this.version = version2;
    this.os = os;
  }
}
class SearchBotDeviceInfo {
  constructor(name, version2, os, bot) {
    __publicField(this, "type", "bot-device");
    this.name = name;
    this.version = version2;
    this.os = os;
    this.bot = bot;
  }
}
class BotInfo {
  constructor() {
    __publicField(this, "type", "bot");
    __publicField(this, "bot", true);
    // NOTE: deprecated test name instead
    __publicField(this, "name", "bot");
    __publicField(this, "version", null);
    __publicField(this, "os", null);
  }
}
const SEARCHBOX_UA_REGEX = /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/;
const SEARCHBOT_OS_REGEX = /(nuhk|curl|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/;
const REQUIRED_VERSION_PARTS = 3;
const userAgentRules = [
  ["aol", /AOLShield\/([0-9\._]+)/],
  ["brave", /Brave\/([0-9\._]+)/],
  ["edge", /Edge\/([0-9\._]+)/],
  ["edge-ios", /EdgiOS\/([0-9\._]+)/],
  ["yandexbrowser", /YaBrowser\/([0-9\._]+)/],
  ["kakaotalk", /KAKAOTALK\s([0-9\.]+)/],
  ["samsung", /SamsungBrowser\/([0-9\.]+)/],
  ["silk", /\bSilk\/([0-9._-]+)\b/],
  ["miui", /MiuiBrowser\/([0-9\.]+)$/],
  ["beaker", /BeakerBrowser\/([0-9\.]+)/],
  ["edge-chromium", /EdgA?\/([0-9\.]+)/],
  [
    "chromium-webview",
    /(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/
  ],
  ["chrome", /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
  ["phantomjs", /PhantomJS\/([0-9\.]+)(:?\s|$)/],
  ["crios", /CriOS\/([0-9\.]+)(:?\s|$)/],
  ["firefox", /Firefox\/([0-9\.]+)(?:\s|$)/],
  ["fxios", /FxiOS\/([0-9\.]+)/],
  ["opera-mini", /Opera Mini.*Version\/([0-9\.]+)/],
  ["opera", /Opera\/([0-9\.]+)(?:\s|$)/],
  ["opera", /OPR\/([0-9\.]+)(:?\s|$)/],
  ["pie", /^Microsoft Pocket Internet Explorer\/(\d+\.\d+)$/],
  ["pie", /^Mozilla\/\d\.\d+\s\(compatible;\s(?:MSP?IE|MSInternet Explorer) (\d+\.\d+);.*Windows CE.*\)$/],
  ["netfront", /^Mozilla\/\d\.\d+.*NetFront\/(\d.\d)/],
  ["ie", /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],
  ["ie", /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
  ["ie", /MSIE\s(7\.0)/],
  ["bb10", /BB10;\sTouch.*Version\/([0-9\.]+)/],
  ["android", /Android\s([0-9\.]+)/],
  ["ios", /Version\/([0-9\._]+).*Mobile.*Safari.*/],
  ["safari", /Version\/([0-9\._]+).*Safari/],
  ["facebook", /FB[AS]V\/([0-9\.]+)/],
  ["instagram", /Instagram\s([0-9\.]+)/],
  ["ios-webview", /AppleWebKit\/([0-9\.]+).*Mobile/],
  ["ios-webview", /AppleWebKit\/([0-9\.]+).*Gecko\)$/],
  ["curl", /^curl\/([0-9\.]+)$/],
  ["searchbot", SEARCHBOX_UA_REGEX]
];
const operatingSystemRules = [
  ["iOS", /iP(hone|od|ad)/],
  ["Android OS", /Android/],
  ["BlackBerry OS", /BlackBerry|BB10/],
  ["Windows Mobile", /IEMobile/],
  ["Amazon OS", /Kindle/],
  ["Windows 3.11", /Win16/],
  ["Windows 95", /(Windows 95)|(Win95)|(Windows_95)/],
  ["Windows 98", /(Windows 98)|(Win98)/],
  ["Windows 2000", /(Windows NT 5.0)|(Windows 2000)/],
  ["Windows XP", /(Windows NT 5.1)|(Windows XP)/],
  ["Windows Server 2003", /(Windows NT 5.2)/],
  ["Windows Vista", /(Windows NT 6.0)/],
  ["Windows 7", /(Windows NT 6.1)/],
  ["Windows 8", /(Windows NT 6.2)/],
  ["Windows 8.1", /(Windows NT 6.3)/],
  ["Windows 10", /(Windows NT 10.0)/],
  ["Windows ME", /Windows ME/],
  ["Windows CE", /Windows CE|WinCE|Microsoft Pocket Internet Explorer/],
  ["Open BSD", /OpenBSD/],
  ["Sun OS", /SunOS/],
  ["Chrome OS", /CrOS/],
  ["Linux", /(Linux)|(X11)/],
  ["Mac OS", /(Mac_PowerPC)|(Macintosh)/],
  ["QNX", /QNX/],
  ["BeOS", /BeOS/],
  ["OS/2", /OS\/2/]
];
function matchUserAgent(ua) {
  return ua !== "" && userAgentRules.reduce(
    (matched, [browser, regex]) => {
      if (matched)
        return matched;
      const uaMatch = regex.exec(ua);
      return !!uaMatch && [browser, uaMatch];
    },
    false
  );
}
function parseUserAgent(ua) {
  const matchedRule = matchUserAgent(ua);
  if (!matchedRule)
    return null;
  const [name, match] = matchedRule;
  if (name === "searchbot")
    return new BotInfo();
  let versionParts = match[1] && match[1].split(".").join("_").split("_").slice(0, 3);
  if (versionParts) {
    if (versionParts.length < REQUIRED_VERSION_PARTS) {
      versionParts = [
        ...versionParts,
        ...createVersionParts(REQUIRED_VERSION_PARTS - versionParts.length)
      ];
    }
  } else {
    versionParts = [];
  }
  const version2 = versionParts.join(".");
  const os = detectOS(ua);
  const searchBotMatch = SEARCHBOT_OS_REGEX.exec(ua);
  if (searchBotMatch && searchBotMatch[1])
    return new SearchBotDeviceInfo(name, version2, os, searchBotMatch[1]);
  return new BrowserInfo(name, version2, os);
}
function detectOS(ua) {
  for (let ii = 0, count = operatingSystemRules.length; ii < count; ii++) {
    const [os, regex] = operatingSystemRules[ii];
    const match = regex.exec(ua);
    if (match)
      return os;
  }
  return null;
}
function createVersionParts(count) {
  const output = [];
  for (let ii = 0; ii < count; ii++)
    output.push("0");
  return output;
}
const VuetifyHTTPClientHints = "vuetify:nuxt:ssr-client-hints";
const AcceptClientHintsHeaders = {
  prefersColorScheme: "Sec-CH-Prefers-Color-Scheme",
  prefersReducedMotion: "Sec-CH-Prefers-Reduced-Motion",
  viewportHeight: "Sec-CH-Viewport-Height",
  viewportWidth: "Sec-CH-Viewport-Width"
};
const AcceptClientHintsRequestHeaders = Object.entries(AcceptClientHintsHeaders).reduce((acc, [key, value]) => {
  acc[key] = value.toLowerCase();
  return acc;
}, {});
const HttpRequestHeaders = Array.from(Object.values(AcceptClientHintsRequestHeaders)).concat("user-agent", "cookie");
const plugin$1 = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  const state = useState(VuetifyHTTPClientHints, "$BFdZRRaN0J");
  const requestHeaders = useRequestHeaders(HttpRequestHeaders);
  const userAgentHeader = requestHeaders["user-agent"];
  const userAgent = userAgentHeader ? parseUserAgent(userAgentHeader) : null;
  const clientHintsRequest = collectClientHints(userAgent, ssrClientHintsConfiguration, requestHeaders);
  writeClientHintsResponseHeaders(clientHintsRequest, ssrClientHintsConfiguration);
  state.value = clientHintsRequest;
  state.value.colorSchemeCookie = writeThemeCookie(
    clientHintsRequest,
    ssrClientHintsConfiguration
  );
  nuxtApp.hook("vuetify:before-create", async ({ vuetifyOptions }) => {
    const clientWidth = clientHintsRequest.viewportWidth;
    const clientHeight = clientHintsRequest.viewportHeight;
    vuetifyOptions.ssr = typeof clientWidth === "number" ? {
      clientWidth,
      clientHeight
    } : true;
    if (clientHintsRequest.colorSchemeFromCookie) {
      if (vuetifyOptions.theme === false) {
        vuetifyOptions.theme = { defaultTheme: clientHintsRequest.colorSchemeFromCookie };
      } else {
        vuetifyOptions.theme ?? (vuetifyOptions.theme = {});
        vuetifyOptions.theme.defaultTheme = clientHintsRequest.colorSchemeFromCookie;
      }
    }
    await nuxtApp.hooks.callHook("vuetify:ssr-client-hints", {
      vuetifyOptions,
      ssrClientHintsConfiguration: {
        ...ssrClientHintsConfiguration,
        enabled: true
      },
      ssrClientHints: state.value
    });
  });
  return {
    provide: reactive({
      ssrClientHints: state
    })
  };
});
const chromiumBasedBrowserFeatures = {
  prefersColorScheme: (_, v) => v[0] >= 93,
  prefersReducedMotion: (_, v) => v[0] >= 108,
  viewportHeight: (_, v) => v[0] >= 108,
  viewportWidth: (_, v) => v[0] >= 108
};
const allowedBrowsers = [
  // 'edge',
  // 'edge-ios',
  ["chrome", chromiumBasedBrowserFeatures],
  ["edge-chromium", chromiumBasedBrowserFeatures],
  ["chromium-webview", chromiumBasedBrowserFeatures],
  ["opera", {
    prefersColorScheme: (android, v) => v[0] >= (android ? 66 : 79),
    prefersReducedMotion: (android, v) => v[0] >= (android ? 73 : 94),
    viewportHeight: (android, v) => v[0] >= (android ? 73 : 94),
    viewportWidth: (android, v) => v[0] >= (android ? 73 : 94)
  }]
];
const ClientHeaders = ["Accept-CH", "Vary", "Critical-CH"];
function browserFeatureAvailable(userAgent, feature) {
  var _a2;
  if (userAgent == null || userAgent.type !== "browser")
    return false;
  try {
    const browserName = userAgent.name;
    const android = ((_a2 = userAgent.os) == null ? void 0 : _a2.toLowerCase().startsWith("android")) ?? false;
    const versions = userAgent.version.split(".").map((v) => Number.parseInt(v));
    return allowedBrowsers.some(([name, check]) => {
      if (browserName !== name)
        return false;
      try {
        return check[feature](android, versions);
      } catch {
        return false;
      }
    });
  } catch {
    return false;
  }
}
function lookupClientHints(userAgent, ssrClientHintsConfiguration2) {
  const features = {
    firstRequest: true,
    prefersColorSchemeAvailable: false,
    prefersReducedMotionAvailable: false,
    viewportHeightAvailable: false,
    viewportWidthAvailable: false
  };
  if (userAgent == null || userAgent.type !== "browser")
    return features;
  if (ssrClientHintsConfiguration2.prefersColorScheme)
    features.prefersColorSchemeAvailable = browserFeatureAvailable(userAgent, "prefersColorScheme");
  if (ssrClientHintsConfiguration2.prefersReducedMotion)
    features.prefersReducedMotionAvailable = browserFeatureAvailable(userAgent, "prefersReducedMotion");
  if (ssrClientHintsConfiguration2.viewportSize) {
    features.viewportHeightAvailable = browserFeatureAvailable(userAgent, "viewportHeight");
    features.viewportWidthAvailable = browserFeatureAvailable(userAgent, "viewportWidth");
  }
  return features;
}
function collectClientHints(userAgent, ssrClientHintsConfiguration2, headers) {
  var _a2, _b2, _c, _d;
  const hints = lookupClientHints(userAgent, ssrClientHintsConfiguration2);
  if (ssrClientHintsConfiguration2.prefersColorScheme) {
    if (ssrClientHintsConfiguration2.prefersColorSchemeOptions) {
      const cookieName = ssrClientHintsConfiguration2.prefersColorSchemeOptions.cookieName;
      const cookieValue = (_a2 = headers.cookie) == null ? void 0 : _a2.split(";").find((c) => c.trim().startsWith(`${cookieName}=`));
      if (cookieValue) {
        const value = (_b2 = cookieValue.split("=")) == null ? void 0 : _b2[1].trim();
        if (ssrClientHintsConfiguration2.prefersColorSchemeOptions.themeNames.includes(value)) {
          hints.colorSchemeFromCookie = value;
          hints.firstRequest = false;
        }
      }
    }
    if (!hints.colorSchemeFromCookie) {
      const value = hints.prefersColorSchemeAvailable ? (_c = headers[AcceptClientHintsRequestHeaders.prefersColorScheme]) == null ? void 0 : _c.toLowerCase() : void 0;
      if (value === "dark" || value === "light" || value === "no-preference") {
        hints.prefersColorScheme = value;
        hints.firstRequest = false;
      }
      if (ssrClientHintsConfiguration2.prefersColorSchemeOptions) {
        if (!value || value === "no-preference") {
          hints.colorSchemeFromCookie = ssrClientHintsConfiguration2.prefersColorSchemeOptions.defaultTheme;
        } else {
          hints.colorSchemeFromCookie = value === "dark" ? ssrClientHintsConfiguration2.prefersColorSchemeOptions.darkThemeName : ssrClientHintsConfiguration2.prefersColorSchemeOptions.lightThemeName;
        }
      }
    }
  }
  if (hints.prefersReducedMotionAvailable && ssrClientHintsConfiguration2.prefersReducedMotion) {
    const value = (_d = headers[AcceptClientHintsRequestHeaders.prefersReducedMotion]) == null ? void 0 : _d.toLowerCase();
    if (value === "no-preference" || value === "reduce") {
      hints.prefersReducedMotion = value;
      hints.firstRequest = false;
    }
  }
  if (hints.viewportHeightAvailable && ssrClientHintsConfiguration2.viewportSize) {
    const header = headers[AcceptClientHintsRequestHeaders.viewportHeight];
    if (header) {
      hints.firstRequest = false;
      try {
        hints.viewportHeight = Number.parseInt(header);
      } catch {
        hints.viewportHeight = ssrClientHintsConfiguration2.clientHeight;
      }
    }
  } else {
    hints.viewportHeight = ssrClientHintsConfiguration2.clientHeight;
  }
  if (hints.viewportWidthAvailable && ssrClientHintsConfiguration2.viewportSize) {
    const header = headers[AcceptClientHintsRequestHeaders.viewportWidth];
    if (header) {
      hints.firstRequest = false;
      try {
        hints.viewportWidth = Number.parseInt(header);
      } catch {
        hints.viewportWidth = ssrClientHintsConfiguration2.clientWidth;
      }
    }
  } else {
    hints.viewportWidth = ssrClientHintsConfiguration2.clientWidth;
  }
  return hints;
}
function writeClientHintHeaders(key, headers) {
  ClientHeaders.forEach((header) => {
    headers[header] = (headers[header] ? headers[header] : []).concat(key);
  });
}
function writeClientHintsResponseHeaders(clientHintsRequest, ssrClientHintsConfiguration2) {
  const headers = {};
  if (ssrClientHintsConfiguration2.prefersColorScheme && clientHintsRequest.prefersColorSchemeAvailable)
    writeClientHintHeaders(AcceptClientHintsHeaders.prefersColorScheme, headers);
  if (ssrClientHintsConfiguration2.prefersReducedMotion && clientHintsRequest.prefersReducedMotionAvailable)
    writeClientHintHeaders(AcceptClientHintsHeaders.prefersReducedMotion, headers);
  if (ssrClientHintsConfiguration2.viewportSize && clientHintsRequest.viewportHeightAvailable && clientHintsRequest.viewportWidthAvailable) {
    writeClientHintHeaders(AcceptClientHintsHeaders.viewportHeight, headers);
    writeClientHintHeaders(AcceptClientHintsHeaders.viewportWidth, headers);
  }
  if (Object.keys(headers).length === 0)
    return;
  const nuxtApp = /* @__PURE__ */ useNuxtApp();
  const callback = () => {
    const event = useRequestEvent(nuxtApp);
    Object.entries(headers).forEach(([key, value]) => {
      setResponseHeader(event, key, value);
    });
  };
  const unhook = nuxtApp.hooks.hookOnce("app:rendered", callback);
  nuxtApp.hooks.hookOnce("app:error", () => {
    unhook();
    return callback();
  });
}
function writeThemeCookie(clientHintsRequest, ssrClientHintsConfiguration2) {
  if (!ssrClientHintsConfiguration2.prefersColorScheme || !ssrClientHintsConfiguration2.prefersColorSchemeOptions)
    return;
  const cookieName = ssrClientHintsConfiguration2.prefersColorSchemeOptions.cookieName;
  const themeName = clientHintsRequest.colorSchemeFromCookie ?? ssrClientHintsConfiguration2.prefersColorSchemeOptions.defaultTheme;
  const path = ssrClientHintsConfiguration2.prefersColorSchemeOptions.baseUrl;
  const date2 = /* @__PURE__ */ new Date();
  const expires = new Date(date2.setDate(date2.getDate() + 365));
  if (!clientHintsRequest.firstRequest || !ssrClientHintsConfiguration2.reloadOnFirstRequest) {
    useCookie(cookieName, {
      path,
      expires,
      sameSite: "lax"
    }).value = themeName;
  }
  return `${cookieName}=${themeName}; Path=${path}; Expires=${expires.toUTCString()}; SameSite=Lax`;
}
const unocss_MzCDxu9LMj = /* @__PURE__ */ defineNuxtPlugin(() => {
});
const vuetify_7h9QAQEssH = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
});
const _1_absoluteImageUrls_server_kwrlqpobcr = /* @__PURE__ */ defineNuxtPlugin({
  enforce: "post",
  setup() {
    const head = injectHead();
    if (!head)
      return;
    const resolver2 = createSitePathResolver({
      withBase: true,
      absolute: true,
      canonical: true
    });
    head.use({
      hooks: {
        "tags:resolve": async ({ tags }) => {
          for (const tag of tags) {
            if (tag.tag !== "meta")
              continue;
            if (tag.props.property !== "og:image:url" && tag.props.property !== "og:image" && tag.props.name !== "twitter:image")
              continue;
            if (!tag.props.content || tag.props.content.startsWith("http") || tag.props.content.startsWith("//"))
              continue;
            tag.props.content = unref(resolver2(tag.props.content));
          }
        }
      }
    });
  }
});
const _0_routeRules_server_lt3u18Dpwh = /* @__PURE__ */ defineNuxtPlugin({
  enforce: "post",
  async setup() {
    const head = injectHead();
    if (!head)
      return;
    const event = useRequestEvent();
    if (event.context._nitro.routeRules.head)
      head.push(event.context._nitro.routeRules.head, { mode: "server" });
    if (event.context._nitro.routeRules.seoMeta) {
      const meta = unpackMeta({ ...event.context._nitro.routeRules.seoMeta });
      head.push({
        meta
      }, { mode: "server" });
    }
  }
});
const init_74KpgUZBCI = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt-schema-org:init",
  enforce: "post",
  setup(nuxtApp) {
    const head = injectHead();
    const config = (/* @__PURE__ */ useRuntimeConfig())["nuxt-schema-org"] || (/* @__PURE__ */ useRuntimeConfig()).public["nuxt-schema-org"];
    const route = useRoute$1();
    const siteConfig = useSiteConfig();
    const schemaOrg = computed(() => {
      var _a2;
      return {
        ...((_a2 = route.meta) == null ? void 0 : _a2.schemaOrg) || {},
        ...siteConfig,
        url: joinURL(siteConfig.url, route.path),
        host: siteConfig.url,
        inLanguage: siteConfig.currentLocale || siteConfig.defaultLocale,
        path: route.path
      };
    });
    head.push({ templateParams: { schemaOrg } });
    head.use(
      SchemaOrgUnheadPlugin({}, async () => {
        const meta = {};
        await nuxtApp.hooks.callHook("schema-org:meta", meta);
        return meta;
      }, {
        minify: config.minify,
        trailingSlash: siteConfig.trailingSlash
      })
    );
  }
});
const en = {
  badge: "Badge",
  open: "Open",
  close: "Close",
  confirmEdit: {
    ok: "OK",
    cancel: "Cancel"
  },
  dataIterator: {
    noResultsText: "No matching records found",
    loadingText: "Loading items..."
  },
  dataTable: {
    itemsPerPageText: "Rows per page:",
    ariaLabel: {
      sortDescending: "Sorted descending.",
      sortAscending: "Sorted ascending.",
      sortNone: "Not sorted.",
      activateNone: "Activate to remove sorting.",
      activateDescending: "Activate to sort descending.",
      activateAscending: "Activate to sort ascending."
    },
    sortBy: "Sort by"
  },
  dataFooter: {
    itemsPerPageText: "Items per page:",
    itemsPerPageAll: "All",
    nextPage: "Next page",
    prevPage: "Previous page",
    firstPage: "First page",
    lastPage: "Last page",
    pageText: "{0}-{1} of {2}"
  },
  dateRangeInput: {
    divider: "to"
  },
  datePicker: {
    itemsSelected: "{0} selected",
    range: {
      title: "Select dates",
      header: "Enter dates"
    },
    title: "Select date",
    header: "Enter date",
    input: {
      placeholder: "Enter date"
    }
  },
  noDataText: "No data available",
  carousel: {
    prev: "Previous visual",
    next: "Next visual",
    ariaLabel: {
      delimiter: "Carousel slide {0} of {1}"
    }
  },
  calendar: {
    moreEvents: "{0} more",
    today: "Today"
  },
  input: {
    clear: "Clear {0}",
    prependAction: "{0} prepended action",
    appendAction: "{0} appended action",
    otp: "Please enter OTP character {0}"
  },
  fileInput: {
    counter: "{0} files",
    counterSize: "{0} files ({1} in total)"
  },
  timePicker: {
    am: "AM",
    pm: "PM"
  },
  pagination: {
    ariaLabel: {
      root: "Pagination Navigation",
      next: "Next page",
      previous: "Previous page",
      page: "Go to page {0}",
      currentPage: "Page {0}, Current page",
      first: "First page",
      last: "Last page"
    }
  },
  stepper: {
    next: "Next",
    prev: "Previous"
  },
  rating: {
    ariaLabel: {
      item: "Rating {0} of {1}"
    }
  },
  loading: "Loading...",
  infiniteScroll: {
    loadMore: "Load more",
    empty: "No more"
  }
};
const defaultRtl = {
  af: false,
  ar: true,
  bg: false,
  ca: false,
  ckb: false,
  cs: false,
  de: false,
  el: false,
  en: false,
  es: false,
  et: false,
  fa: true,
  fi: false,
  fr: false,
  hr: false,
  hu: false,
  he: true,
  id: false,
  it: false,
  ja: false,
  ko: false,
  lv: false,
  lt: false,
  nl: false,
  no: false,
  pl: false,
  pt: false,
  ro: false,
  ru: false,
  sk: false,
  sl: false,
  srCyrl: false,
  srLatn: false,
  sv: false,
  th: false,
  tr: false,
  az: false,
  uk: false,
  vi: false,
  zhHans: false,
  zhHant: false
};
function useToggleScope(source, fn) {
  let scope;
  function start() {
    scope = effectScope();
    scope.run(() => fn.length ? fn(() => {
      scope == null ? void 0 : scope.stop();
      start();
    }) : fn());
  }
  watch(source, (active) => {
    if (active && !scope) {
      start();
    } else if (!active) {
      scope == null ? void 0 : scope.stop();
      scope = void 0;
    }
  }, {
    immediate: true
  });
  onScopeDispose(() => {
    scope == null ? void 0 : scope.stop();
  });
}
function useProxiedModel(props, prop, defaultValue) {
  let transformIn = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : (v) => v;
  let transformOut = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : (v) => v;
  const vm = getCurrentInstance("useProxiedModel");
  const internal = ref(props[prop] !== void 0 ? props[prop] : defaultValue);
  const kebabProp = toKebabCase(prop);
  const checkKebab = kebabProp !== prop;
  const isControlled = checkKebab ? computed(() => {
    var _a2, _b2, _c, _d;
    void props[prop];
    return !!((((_a2 = vm.vnode.props) == null ? void 0 : _a2.hasOwnProperty(prop)) || ((_b2 = vm.vnode.props) == null ? void 0 : _b2.hasOwnProperty(kebabProp))) && (((_c = vm.vnode.props) == null ? void 0 : _c.hasOwnProperty(`onUpdate:${prop}`)) || ((_d = vm.vnode.props) == null ? void 0 : _d.hasOwnProperty(`onUpdate:${kebabProp}`))));
  }) : computed(() => {
    var _a2, _b2;
    void props[prop];
    return !!(((_a2 = vm.vnode.props) == null ? void 0 : _a2.hasOwnProperty(prop)) && ((_b2 = vm.vnode.props) == null ? void 0 : _b2.hasOwnProperty(`onUpdate:${prop}`)));
  });
  useToggleScope(() => !isControlled.value, () => {
    watch(() => props[prop], (val) => {
      internal.value = val;
    });
  });
  const model = computed({
    get() {
      const externalValue = props[prop];
      return transformIn(isControlled.value ? externalValue : internal.value);
    },
    set(internalValue) {
      const newValue = transformOut(internalValue);
      const value = toRaw(isControlled.value ? props[prop] : internal.value);
      if (value === newValue || transformIn(value) === internalValue) {
        return;
      }
      internal.value = newValue;
      vm == null ? void 0 : vm.emit(`update:${prop}`, newValue);
    }
  });
  Object.defineProperty(model, "externalValue", {
    get: () => isControlled.value ? props[prop] : internal.value
  });
  return model;
}
const LANG_PREFIX = "$vuetify.";
const replace = (str, params) => {
  return str.replace(/\{(\d+)\}/g, (match, index) => {
    return String(params[+index]);
  });
};
const createTranslateFunction = (current, fallback, messages) => {
  return function(key) {
    for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      params[_key - 1] = arguments[_key];
    }
    if (!key.startsWith(LANG_PREFIX)) {
      return replace(key, params);
    }
    const shortKey = key.replace(LANG_PREFIX, "");
    const currentLocale = current.value && messages.value[current.value];
    const fallbackLocale = fallback.value && messages.value[fallback.value];
    let str = getObjectValueByPath(currentLocale, shortKey, null);
    if (!str) {
      consoleWarn(`Translation key "${key}" not found in "${current.value}", trying fallback locale`);
      str = getObjectValueByPath(fallbackLocale, shortKey, null);
    }
    if (!str) {
      consoleError(`Translation key "${key}" not found in fallback`);
      str = key;
    }
    if (typeof str !== "string") {
      consoleError(`Translation key "${key}" has a non-string value`);
      str = key;
    }
    return replace(str, params);
  };
};
function createNumberFunction(current, fallback) {
  return (value, options) => {
    const numberFormat = new Intl.NumberFormat([current.value, fallback.value], options);
    return numberFormat.format(value);
  };
}
function useProvided(props, prop, provided) {
  const internal = useProxiedModel(props, prop, props[prop] ?? provided.value);
  internal.value = props[prop] ?? provided.value;
  watch(provided, (v) => {
    if (props[prop] == null) {
      internal.value = provided.value;
    }
  });
  return internal;
}
function createProvideFunction(state) {
  return (props) => {
    const current = useProvided(props, "locale", state.current);
    const fallback = useProvided(props, "fallback", state.fallback);
    const messages = useProvided(props, "messages", state.messages);
    return {
      name: "vuetify",
      current,
      fallback,
      messages,
      t: createTranslateFunction(current, fallback, messages),
      n: createNumberFunction(current, fallback),
      provide: createProvideFunction({
        current,
        fallback,
        messages
      })
    };
  };
}
function createVuetifyAdapter(options) {
  const current = shallowRef((options == null ? void 0 : options.locale) ?? "en");
  const fallback = shallowRef((options == null ? void 0 : options.fallback) ?? "en");
  const messages = ref({
    en,
    ...options == null ? void 0 : options.messages
  });
  return {
    name: "vuetify",
    current,
    fallback,
    messages,
    t: createTranslateFunction(current, fallback, messages),
    n: createNumberFunction(current, fallback),
    provide: createProvideFunction({
      current,
      fallback,
      messages
    })
  };
}
const LocaleSymbol = Symbol.for("vuetify:locale");
function isLocaleInstance(obj) {
  return obj.name != null;
}
function createLocale(options) {
  const i18n = (options == null ? void 0 : options.adapter) && isLocaleInstance(options == null ? void 0 : options.adapter) ? options == null ? void 0 : options.adapter : createVuetifyAdapter(options);
  const rtl = createRtl(i18n, options);
  return {
    ...i18n,
    ...rtl
  };
}
function useLocale() {
  const locale = inject$1(LocaleSymbol);
  if (!locale)
    throw new Error("[Vuetify] Could not find injected locale instance");
  return locale;
}
function createRtl(i18n, options) {
  const rtl = ref((options == null ? void 0 : options.rtl) ?? defaultRtl);
  const isRtl = computed(() => rtl.value[i18n.current.value] ?? false);
  return {
    isRtl,
    rtl,
    rtlClasses: computed(() => `v-locale--is-${isRtl.value ? "rtl" : "ltr"}`)
  };
}
function useRtl() {
  const locale = inject$1(LocaleSymbol);
  if (!locale)
    throw new Error("[Vuetify] Could not find injected rtl instance");
  return {
    isRtl: locale.isRtl,
    rtlClasses: locale.rtlClasses
  };
}
const firstDay = {
  "001": 1,
  AD: 1,
  AE: 6,
  AF: 6,
  AG: 0,
  AI: 1,
  AL: 1,
  AM: 1,
  AN: 1,
  AR: 1,
  AS: 0,
  AT: 1,
  AU: 1,
  AX: 1,
  AZ: 1,
  BA: 1,
  BD: 0,
  BE: 1,
  BG: 1,
  BH: 6,
  BM: 1,
  BN: 1,
  BR: 0,
  BS: 0,
  BT: 0,
  BW: 0,
  BY: 1,
  BZ: 0,
  CA: 0,
  CH: 1,
  CL: 1,
  CM: 1,
  CN: 1,
  CO: 0,
  CR: 1,
  CY: 1,
  CZ: 1,
  DE: 1,
  DJ: 6,
  DK: 1,
  DM: 0,
  DO: 0,
  DZ: 6,
  EC: 1,
  EE: 1,
  EG: 6,
  ES: 1,
  ET: 0,
  FI: 1,
  FJ: 1,
  FO: 1,
  FR: 1,
  GB: 1,
  "GB-alt-variant": 0,
  GE: 1,
  GF: 1,
  GP: 1,
  GR: 1,
  GT: 0,
  GU: 0,
  HK: 0,
  HN: 0,
  HR: 1,
  HU: 1,
  ID: 0,
  IE: 1,
  IL: 0,
  IN: 0,
  IQ: 6,
  IR: 6,
  IS: 1,
  IT: 1,
  JM: 0,
  JO: 6,
  JP: 0,
  KE: 0,
  KG: 1,
  KH: 0,
  KR: 0,
  KW: 6,
  KZ: 1,
  LA: 0,
  LB: 1,
  LI: 1,
  LK: 1,
  LT: 1,
  LU: 1,
  LV: 1,
  LY: 6,
  MC: 1,
  MD: 1,
  ME: 1,
  MH: 0,
  MK: 1,
  MM: 0,
  MN: 1,
  MO: 0,
  MQ: 1,
  MT: 0,
  MV: 5,
  MX: 0,
  MY: 1,
  MZ: 0,
  NI: 0,
  NL: 1,
  NO: 1,
  NP: 0,
  NZ: 1,
  OM: 6,
  PA: 0,
  PE: 0,
  PH: 0,
  PK: 0,
  PL: 1,
  PR: 0,
  PT: 0,
  PY: 0,
  QA: 6,
  RE: 1,
  RO: 1,
  RS: 1,
  RU: 1,
  SA: 0,
  SD: 6,
  SE: 1,
  SG: 0,
  SI: 1,
  SK: 1,
  SM: 1,
  SV: 0,
  SY: 6,
  TH: 0,
  TJ: 1,
  TM: 1,
  TR: 1,
  TT: 0,
  TW: 0,
  UA: 1,
  UM: 0,
  US: 0,
  UY: 1,
  UZ: 1,
  VA: 1,
  VE: 0,
  VI: 0,
  VN: 1,
  WS: 0,
  XK: 1,
  YE: 0,
  ZA: 0,
  ZW: 0
};
function getWeekArray(date2, locale) {
  const weeks = [];
  let currentWeek = [];
  const firstDayOfMonth = startOfMonth(date2);
  const lastDayOfMonth = endOfMonth(date2);
  const firstDayWeekIndex = (firstDayOfMonth.getDay() - firstDay[locale.slice(-2).toUpperCase()] + 7) % 7;
  const lastDayWeekIndex = (lastDayOfMonth.getDay() - firstDay[locale.slice(-2).toUpperCase()] + 7) % 7;
  for (let i = 0; i < firstDayWeekIndex; i++) {
    const adjacentDay = new Date(firstDayOfMonth);
    adjacentDay.setDate(adjacentDay.getDate() - (firstDayWeekIndex - i));
    currentWeek.push(adjacentDay);
  }
  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    const day = new Date(date2.getFullYear(), date2.getMonth(), i);
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }
  for (let i = 1; i < 7 - lastDayWeekIndex; i++) {
    const adjacentDay = new Date(lastDayOfMonth);
    adjacentDay.setDate(adjacentDay.getDate() + i);
    currentWeek.push(adjacentDay);
  }
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }
  return weeks;
}
function startOfWeek(date2) {
  const d = new Date(date2);
  while (d.getDay() !== 0) {
    d.setDate(d.getDate() - 1);
  }
  return d;
}
function endOfWeek(date2) {
  const d = new Date(date2);
  while (d.getDay() !== 6) {
    d.setDate(d.getDate() + 1);
  }
  return d;
}
function startOfMonth(date2) {
  return new Date(date2.getFullYear(), date2.getMonth(), 1);
}
function endOfMonth(date2) {
  return new Date(date2.getFullYear(), date2.getMonth() + 1, 0);
}
function parseLocalDate(value) {
  const parts = value.split("-").map(Number);
  return new Date(parts[0], parts[1] - 1, parts[2]);
}
const _YYYMMDD = /^([12]\d{3}-([1-9]|0[1-9]|1[0-2])-([1-9]|0[1-9]|[12]\d|3[01]))$/;
function date(value) {
  if (value == null)
    return /* @__PURE__ */ new Date();
  if (value instanceof Date)
    return value;
  if (typeof value === "string") {
    let parsed;
    if (_YYYMMDD.test(value)) {
      return parseLocalDate(value);
    } else {
      parsed = Date.parse(value);
    }
    if (!isNaN(parsed))
      return new Date(parsed);
  }
  return null;
}
const sundayJanuarySecond2000 = new Date(2e3, 0, 2);
function getWeekdays(locale) {
  const daysFromSunday = firstDay[locale.slice(-2).toUpperCase()];
  return createRange(7).map((i) => {
    const weekday = new Date(sundayJanuarySecond2000);
    weekday.setDate(sundayJanuarySecond2000.getDate() + daysFromSunday + i);
    const formattedDay = new Intl.DateTimeFormat(locale, {
      weekday: "short"
    }).format(weekday);
    return formattedDay.charAt(0).toUpperCase() + formattedDay.slice(1);
  });
}
function format(value, formatString, locale, formats) {
  const newDate = date(value) ?? /* @__PURE__ */ new Date();
  const customFormat = formats == null ? void 0 : formats[formatString];
  if (typeof customFormat === "function") {
    return customFormat(newDate, formatString, locale);
  }
  let options = {};
  switch (formatString) {
    case "fullDateWithWeekday":
      options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
      };
      break;
    case "hours12h":
      options = {
        hour: "numeric",
        hour12: true
      };
      break;
    case "normalDateWithWeekday":
      options = {
        weekday: "short",
        day: "numeric",
        month: "short"
      };
      break;
    case "keyboardDate":
      options = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      };
      break;
    case "monthAndDate":
      options = {
        month: "long",
        day: "numeric"
      };
      break;
    case "monthAndYear":
      options = {
        month: "long",
        year: "numeric"
      };
      break;
    case "month":
      options = {
        month: "long"
      };
      break;
    case "monthShort":
      options = {
        month: "short"
      };
      break;
    case "dayOfMonth":
      options = {
        day: "numeric"
      };
      break;
    case "shortDate":
      options = {
        year: "2-digit",
        month: "numeric",
        day: "numeric"
      };
      break;
    case "weekdayShort":
      options = {
        weekday: "short"
      };
      break;
    case "year":
      options = {
        year: "numeric"
      };
      break;
    default:
      options = customFormat ?? {
        timeZone: "UTC",
        timeZoneName: "short"
      };
  }
  return new Intl.DateTimeFormat(locale, options).format(newDate);
}
function toISO(adapter, value) {
  const date2 = adapter.toJsDate(value);
  const year = date2.getFullYear();
  const month = padStart(String(date2.getMonth() + 1), 2, "0");
  const day = padStart(String(date2.getDate()), 2, "0");
  return `${year}-${month}-${day}`;
}
function parseISO(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}
function addMinutes(date2, amount) {
  const d = new Date(date2);
  d.setMinutes(d.getMinutes() + amount);
  return d;
}
function addHours(date2, amount) {
  const d = new Date(date2);
  d.setHours(d.getHours() + amount);
  return d;
}
function addDays(date2, amount) {
  const d = new Date(date2);
  d.setDate(d.getDate() + amount);
  return d;
}
function addWeeks(date2, amount) {
  const d = new Date(date2);
  d.setDate(d.getDate() + amount * 7);
  return d;
}
function addMonths(date2, amount) {
  const d = new Date(date2);
  d.setMonth(d.getMonth() + amount);
  return d;
}
function getYear(date2) {
  return date2.getFullYear();
}
function getMonth(date2) {
  return date2.getMonth();
}
function getNextMonth(date2) {
  return new Date(date2.getFullYear(), date2.getMonth() + 1, 1);
}
function getHours(date2) {
  return date2.getHours();
}
function getMinutes(date2) {
  return date2.getMinutes();
}
function startOfYear(date2) {
  return new Date(date2.getFullYear(), 0, 1);
}
function endOfYear(date2) {
  return new Date(date2.getFullYear(), 11, 31);
}
function isWithinRange(date2, range) {
  return isAfter(date2, range[0]) && isBefore(date2, range[1]);
}
function isValid(date2) {
  const d = new Date(date2);
  return d instanceof Date && !isNaN(d.getTime());
}
function isAfter(date2, comparing) {
  return date2.getTime() > comparing.getTime();
}
function isBefore(date2, comparing) {
  return date2.getTime() < comparing.getTime();
}
function isEqual(date2, comparing) {
  return date2.getTime() === comparing.getTime();
}
function isSameDay(date2, comparing) {
  return date2.getDate() === comparing.getDate() && date2.getMonth() === comparing.getMonth() && date2.getFullYear() === comparing.getFullYear();
}
function isSameMonth(date2, comparing) {
  return date2.getMonth() === comparing.getMonth() && date2.getFullYear() === comparing.getFullYear();
}
function getDiff(date2, comparing, unit) {
  const d = new Date(date2);
  const c = new Date(comparing);
  if (unit === "month") {
    return d.getMonth() - c.getMonth() + (d.getFullYear() - c.getFullYear()) * 12;
  }
  return Math.floor((d.getTime() - c.getTime()) / (1e3 * 60 * 60 * 24));
}
function setHours(date2, count) {
  const d = new Date(date2);
  d.setHours(count);
  return d;
}
function setMinutes(date2, count) {
  const d = new Date(date2);
  d.setMinutes(count);
  return d;
}
function setMonth(date2, count) {
  const d = new Date(date2);
  d.setMonth(count);
  return d;
}
function setYear(date2, year) {
  const d = new Date(date2);
  d.setFullYear(year);
  return d;
}
function startOfDay(date2) {
  return new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
}
function endOfDay(date2) {
  return new Date(date2.getFullYear(), date2.getMonth(), date2.getDate(), 23, 59, 59, 999);
}
class VuetifyDateAdapter {
  constructor(options) {
    this.locale = options.locale;
    this.formats = options.formats;
  }
  date(value) {
    return date(value);
  }
  toJsDate(date2) {
    return date2;
  }
  toISO(date2) {
    return toISO(this, date2);
  }
  parseISO(date2) {
    return parseISO(date2);
  }
  addMinutes(date2, amount) {
    return addMinutes(date2, amount);
  }
  addHours(date2, amount) {
    return addHours(date2, amount);
  }
  addDays(date2, amount) {
    return addDays(date2, amount);
  }
  addWeeks(date2, amount) {
    return addWeeks(date2, amount);
  }
  addMonths(date2, amount) {
    return addMonths(date2, amount);
  }
  getWeekArray(date2) {
    return getWeekArray(date2, this.locale);
  }
  startOfWeek(date2) {
    return startOfWeek(date2);
  }
  endOfWeek(date2) {
    return endOfWeek(date2);
  }
  startOfMonth(date2) {
    return startOfMonth(date2);
  }
  endOfMonth(date2) {
    return endOfMonth(date2);
  }
  format(date2, formatString) {
    return format(date2, formatString, this.locale, this.formats);
  }
  isEqual(date2, comparing) {
    return isEqual(date2, comparing);
  }
  isValid(date2) {
    return isValid(date2);
  }
  isWithinRange(date2, range) {
    return isWithinRange(date2, range);
  }
  isAfter(date2, comparing) {
    return isAfter(date2, comparing);
  }
  isBefore(date2, comparing) {
    return !isAfter(date2, comparing) && !isEqual(date2, comparing);
  }
  isSameDay(date2, comparing) {
    return isSameDay(date2, comparing);
  }
  isSameMonth(date2, comparing) {
    return isSameMonth(date2, comparing);
  }
  setMinutes(date2, count) {
    return setMinutes(date2, count);
  }
  setHours(date2, count) {
    return setHours(date2, count);
  }
  setMonth(date2, count) {
    return setMonth(date2, count);
  }
  setYear(date2, year) {
    return setYear(date2, year);
  }
  getDiff(date2, comparing, unit) {
    return getDiff(date2, comparing, unit);
  }
  getWeekdays() {
    return getWeekdays(this.locale);
  }
  getYear(date2) {
    return getYear(date2);
  }
  getMonth(date2) {
    return getMonth(date2);
  }
  getNextMonth(date2) {
    return getNextMonth(date2);
  }
  getHours(date2) {
    return getHours(date2);
  }
  getMinutes(date2) {
    return getMinutes(date2);
  }
  startOfDay(date2) {
    return startOfDay(date2);
  }
  endOfDay(date2) {
    return endOfDay(date2);
  }
  startOfYear(date2) {
    return startOfYear(date2);
  }
  endOfYear(date2) {
    return endOfYear(date2);
  }
}
const DateOptionsSymbol = Symbol.for("vuetify:date-options");
const DateAdapterSymbol = Symbol.for("vuetify:date-adapter");
function createDate(options, locale) {
  const _options = mergeDeep({
    adapter: VuetifyDateAdapter,
    locale: {
      af: "af-ZA",
      // ar: '', # not the same value for all variants
      bg: "bg-BG",
      ca: "ca-ES",
      ckb: "",
      cs: "cs-CZ",
      de: "de-DE",
      el: "el-GR",
      en: "en-US",
      // es: '', # not the same value for all variants
      et: "et-EE",
      fa: "fa-IR",
      fi: "fi-FI",
      // fr: '', #not the same value for all variants
      hr: "hr-HR",
      hu: "hu-HU",
      he: "he-IL",
      id: "id-ID",
      it: "it-IT",
      ja: "ja-JP",
      ko: "ko-KR",
      lv: "lv-LV",
      lt: "lt-LT",
      nl: "nl-NL",
      no: "no-NO",
      pl: "pl-PL",
      pt: "pt-PT",
      ro: "ro-RO",
      ru: "ru-RU",
      sk: "sk-SK",
      sl: "sl-SI",
      srCyrl: "sr-SP",
      srLatn: "sr-SP",
      sv: "sv-SE",
      th: "th-TH",
      tr: "tr-TR",
      az: "az-AZ",
      uk: "uk-UA",
      vi: "vi-VN",
      zhHans: "zh-CN",
      zhHant: "zh-TW"
    }
  }, options);
  return {
    options: _options,
    instance: createInstance(_options, locale)
  };
}
function createInstance(options, locale) {
  const instance = reactive(typeof options.adapter === "function" ? new options.adapter({
    locale: options.locale[locale.current.value] ?? locale.current.value,
    formats: options.formats
  }) : options.adapter);
  watch(locale.current, (value) => {
    instance.locale = options.locale[value] ?? value ?? instance.locale;
  });
  return instance;
}
function useDate() {
  const options = inject$1(DateOptionsSymbol);
  if (!options)
    throw new Error("[Vuetify] Could not find injected date options");
  const locale = useLocale();
  return createInstance(options, locale);
}
function getWeek(adapter, value) {
  const date2 = adapter.toJsDate(value);
  let year = adapter.getYear(date2);
  let d1w1 = adapter.startOfYear(date2);
  if (date2 < d1w1) {
    year = year - 1;
    d1w1 = adapter.startOfYear(adapter.setYear(date2, year));
  } else {
    const tv = adapter.startOfYear(adapter.setYear(date2, year + 1));
    if (date2 >= tv) {
      year = year + 1;
      d1w1 = tv;
    }
  }
  const diffTime = Math.abs(date2.getTime() - d1w1.getTime());
  const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
  return Math.floor(diffDays / 7) + 1;
}
const breakpoints = ["sm", "md", "lg", "xl", "xxl"];
const DisplaySymbol = Symbol.for("vuetify:display");
const defaultDisplayOptions = {
  mobileBreakpoint: "lg",
  thresholds: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
    xxl: 2560
  }
};
const parseDisplayOptions = function() {
  let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : defaultDisplayOptions;
  return mergeDeep(defaultDisplayOptions, options);
};
function getClientWidth(ssr) {
  return typeof ssr === "object" && ssr.clientWidth || 0;
}
function getClientHeight(ssr) {
  return typeof ssr === "object" && ssr.clientHeight || 0;
}
function getPlatform(ssr) {
  const userAgent = "ssr";
  function match(regexp) {
    return Boolean(userAgent.match(regexp));
  }
  const android = match(/android/i);
  const ios = match(/iphone|ipad|ipod/i);
  const cordova = match(/cordova/i);
  const electron = match(/electron/i);
  const chrome = match(/chrome/i);
  const edge = match(/edge/i);
  const firefox = match(/firefox/i);
  const opera = match(/opera/i);
  const win = match(/win/i);
  const mac = match(/mac/i);
  const linux = match(/linux/i);
  return {
    android,
    ios,
    cordova,
    electron,
    chrome,
    edge,
    firefox,
    opera,
    win,
    mac,
    linux,
    touch: SUPPORTS_TOUCH,
    ssr: userAgent === "ssr"
  };
}
function createDisplay(options, ssr) {
  const {
    thresholds,
    mobileBreakpoint
  } = parseDisplayOptions(options);
  const height = shallowRef(getClientHeight(ssr));
  const platform = shallowRef(getPlatform());
  const state = reactive({});
  const width = shallowRef(getClientWidth(ssr));
  function updateSize() {
    height.value = getClientHeight();
    width.value = getClientWidth();
  }
  function update() {
    updateSize();
    platform.value = getPlatform();
  }
  watchEffect(() => {
    const xs = width.value < thresholds.sm;
    const sm = width.value < thresholds.md && !xs;
    const md = width.value < thresholds.lg && !(sm || xs);
    const lg = width.value < thresholds.xl && !(md || sm || xs);
    const xl = width.value < thresholds.xxl && !(lg || md || sm || xs);
    const xxl = width.value >= thresholds.xxl;
    const name = xs ? "xs" : sm ? "sm" : md ? "md" : lg ? "lg" : xl ? "xl" : "xxl";
    const breakpointValue = typeof mobileBreakpoint === "number" ? mobileBreakpoint : thresholds[mobileBreakpoint];
    const mobile = width.value < breakpointValue;
    state.xs = xs;
    state.sm = sm;
    state.md = md;
    state.lg = lg;
    state.xl = xl;
    state.xxl = xxl;
    state.smAndUp = !xs;
    state.mdAndUp = !(xs || sm);
    state.lgAndUp = !(xs || sm || md);
    state.xlAndUp = !(xs || sm || md || lg);
    state.smAndDown = !(md || lg || xl || xxl);
    state.mdAndDown = !(lg || xl || xxl);
    state.lgAndDown = !(xl || xxl);
    state.xlAndDown = !xxl;
    state.name = name;
    state.height = height.value;
    state.width = width.value;
    state.mobile = mobile;
    state.mobileBreakpoint = mobileBreakpoint;
    state.platform = platform.value;
    state.thresholds = thresholds;
  });
  return {
    ...toRefs(state),
    update,
    ssr: !!ssr
  };
}
const makeDisplayProps = propsFactory({
  mobileBreakpoint: [Number, String]
}, "display");
function useDisplay() {
  let props = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  const display = inject$1(DisplaySymbol);
  if (!display)
    throw new Error("Could not find Vuetify display injection");
  const mobile = computed(() => {
    if (!props.mobileBreakpoint)
      return display.mobile.value;
    const breakpointValue = typeof props.mobileBreakpoint === "number" ? props.mobileBreakpoint : display.thresholds.value[props.mobileBreakpoint];
    return display.width.value < breakpointValue;
  });
  const displayClasses = computed(() => {
    if (!name)
      return {};
    return {
      [`${name}--mobile`]: mobile.value
    };
  });
  return {
    ...display,
    displayClasses,
    mobile
  };
}
const ThemeSymbol = Symbol.for("vuetify:theme");
const makeThemeProps = propsFactory({
  theme: String
}, "theme");
function genDefaults() {
  return {
    defaultTheme: "light",
    variations: {
      colors: [],
      lighten: 0,
      darken: 0
    },
    themes: {
      light: {
        dark: false,
        colors: {
          background: "#FFFFFF",
          surface: "#FFFFFF",
          "surface-bright": "#FFFFFF",
          "surface-variant": "#424242",
          "on-surface-variant": "#EEEEEE",
          primary: "#1867C0",
          "primary-darken-1": "#1F5592",
          secondary: "#48A9A6",
          "secondary-darken-1": "#018786",
          error: "#B00020",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FB8C00"
        },
        variables: {
          "border-color": "#000000",
          "border-opacity": 0.12,
          "high-emphasis-opacity": 0.87,
          "medium-emphasis-opacity": 0.6,
          "disabled-opacity": 0.38,
          "idle-opacity": 0.04,
          "hover-opacity": 0.04,
          "focus-opacity": 0.12,
          "selected-opacity": 0.08,
          "activated-opacity": 0.12,
          "pressed-opacity": 0.12,
          "dragged-opacity": 0.08,
          "theme-kbd": "#212529",
          "theme-on-kbd": "#FFFFFF",
          "theme-code": "#F5F5F5",
          "theme-on-code": "#000000"
        }
      },
      dark: {
        dark: true,
        colors: {
          background: "#121212",
          surface: "#212121",
          "surface-bright": "#ccbfd6",
          "surface-variant": "#a3a3a3",
          "on-surface-variant": "#424242",
          primary: "#2196F3",
          "primary-darken-1": "#277CC1",
          secondary: "#54B6B2",
          "secondary-darken-1": "#48A9A6",
          error: "#CF6679",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FB8C00"
        },
        variables: {
          "border-color": "#FFFFFF",
          "border-opacity": 0.12,
          "high-emphasis-opacity": 1,
          "medium-emphasis-opacity": 0.7,
          "disabled-opacity": 0.5,
          "idle-opacity": 0.1,
          "hover-opacity": 0.04,
          "focus-opacity": 0.12,
          "selected-opacity": 0.08,
          "activated-opacity": 0.12,
          "pressed-opacity": 0.16,
          "dragged-opacity": 0.08,
          "theme-kbd": "#212529",
          "theme-on-kbd": "#FFFFFF",
          "theme-code": "#343434",
          "theme-on-code": "#CCCCCC"
        }
      }
    }
  };
}
function parseThemeOptions() {
  var _a2, _b2;
  let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : genDefaults();
  const defaults2 = genDefaults();
  if (!options)
    return {
      ...defaults2,
      isDisabled: true
    };
  const themes = {};
  for (const [key, theme] of Object.entries(options.themes ?? {})) {
    const defaultTheme = theme.dark || key === "dark" ? (_a2 = defaults2.themes) == null ? void 0 : _a2.dark : (_b2 = defaults2.themes) == null ? void 0 : _b2.light;
    themes[key] = mergeDeep(defaultTheme, theme);
  }
  return mergeDeep(defaults2, {
    ...options,
    themes
  });
}
function createTheme(options) {
  const parsedOptions = parseThemeOptions(options);
  const name = ref(parsedOptions.defaultTheme);
  const themes = ref(parsedOptions.themes);
  const computedThemes = computed(() => {
    const acc = {};
    for (const [name2, original] of Object.entries(themes.value)) {
      const theme = acc[name2] = {
        ...original,
        colors: {
          ...original.colors
        }
      };
      if (parsedOptions.variations) {
        for (const name3 of parsedOptions.variations.colors) {
          const color = theme.colors[name3];
          if (!color)
            continue;
          for (const variation of ["lighten", "darken"]) {
            const fn = variation === "lighten" ? lighten : darken;
            for (const amount of createRange(parsedOptions.variations[variation], 1)) {
              theme.colors[`${name3}-${variation}-${amount}`] = RGBtoHex(fn(parseColor(color), amount));
            }
          }
        }
      }
      for (const color of Object.keys(theme.colors)) {
        if (/^on-[a-z]/.test(color) || theme.colors[`on-${color}`])
          continue;
        const onColor = `on-${color}`;
        const colorVal = parseColor(theme.colors[color]);
        theme.colors[onColor] = getForeground(colorVal);
      }
    }
    return acc;
  });
  const current = computed(() => computedThemes.value[name.value]);
  const styles = computed(() => {
    const lines = [];
    if (current.value.dark) {
      createCssClass(lines, ":root", ["color-scheme: dark"]);
    }
    createCssClass(lines, ":root", genCssVariables(current.value));
    for (const [themeName, theme] of Object.entries(computedThemes.value)) {
      createCssClass(lines, `.v-theme--${themeName}`, [`color-scheme: ${theme.dark ? "dark" : "normal"}`, ...genCssVariables(theme)]);
    }
    const bgLines = [];
    const fgLines = [];
    const colors = new Set(Object.values(computedThemes.value).flatMap((theme) => Object.keys(theme.colors)));
    for (const key of colors) {
      if (/^on-[a-z]/.test(key)) {
        createCssClass(fgLines, `.${key}`, [`color: rgb(var(--v-theme-${key})) !important`]);
      } else {
        createCssClass(bgLines, `.bg-${key}`, [`--v-theme-overlay-multiplier: var(--v-theme-${key}-overlay-multiplier)`, `background-color: rgb(var(--v-theme-${key})) !important`, `color: rgb(var(--v-theme-on-${key})) !important`]);
        createCssClass(fgLines, `.text-${key}`, [`color: rgb(var(--v-theme-${key})) !important`]);
        createCssClass(fgLines, `.border-${key}`, [`--v-border-color: var(--v-theme-${key})`]);
      }
    }
    lines.push(...bgLines, ...fgLines);
    return lines.map((str, i) => i === 0 ? str : `    ${str}`).join("");
  });
  function getHead() {
    return {
      style: [{
        children: styles.value,
        id: "vuetify-theme-stylesheet",
        nonce: parsedOptions.cspNonce || false
      }]
    };
  }
  function install(app) {
    if (parsedOptions.isDisabled)
      return;
    const head = app._context.provides.usehead;
    if (head) {
      if (head.push) {
        head.push(getHead);
      } else {
        {
          head.addHeadObjs(getHead());
        }
      }
    }
  }
  const themeClasses = computed(() => parsedOptions.isDisabled ? void 0 : `v-theme--${name.value}`);
  return {
    install,
    isDisabled: parsedOptions.isDisabled,
    name,
    themes,
    current,
    computedThemes,
    themeClasses,
    styles,
    global: {
      name,
      current
    }
  };
}
function provideTheme(props) {
  getCurrentInstance("provideTheme");
  const theme = inject$1(ThemeSymbol, null);
  if (!theme)
    throw new Error("Could not find Vuetify theme injection");
  const name = computed(() => {
    return props.theme ?? theme.name.value;
  });
  const current = computed(() => theme.themes.value[name.value]);
  const themeClasses = computed(() => theme.isDisabled ? void 0 : `v-theme--${name.value}`);
  const newTheme = {
    ...theme,
    name,
    current,
    themeClasses
  };
  provide(ThemeSymbol, newTheme);
  return newTheme;
}
function useTheme() {
  getCurrentInstance("useTheme");
  const theme = inject$1(ThemeSymbol, null);
  if (!theme)
    throw new Error("Could not find Vuetify theme injection");
  return theme;
}
function createCssClass(lines, selector, content) {
  lines.push(`${selector} {
`, ...content.map((line) => `  ${line};
`), "}\n");
}
function genCssVariables(theme) {
  const lightOverlay = theme.dark ? 2 : 1;
  const darkOverlay = theme.dark ? 1 : 2;
  const variables = [];
  for (const [key, value] of Object.entries(theme.colors)) {
    const rgb = parseColor(value);
    variables.push(`--v-theme-${key}: ${rgb.r},${rgb.g},${rgb.b}`);
    if (!key.startsWith("on-")) {
      variables.push(`--v-theme-${key}-overlay-multiplier: ${getLuma(value) > 0.18 ? lightOverlay : darkOverlay}`);
    }
  }
  for (const [key, value] of Object.entries(theme.variables)) {
    const color = typeof value === "string" && value.startsWith("#") ? parseColor(value) : void 0;
    const rgb = color ? `${color.r}, ${color.g}, ${color.b}` : void 0;
    variables.push(`--v-${key}: ${rgb ?? value}`);
  }
  return variables;
}
function useResizeObserver(callback) {
  const resizeRef = ref();
  const contentRect = ref();
  return {
    resizeRef,
    contentRect: readonly(contentRect)
  };
}
function createVuetify() {
  let vuetify = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const {
    blueprint,
    ...rest
  } = vuetify;
  const options = mergeDeep(blueprint, rest);
  const {
    aliases: aliases2 = {},
    components = {},
    directives: directives2 = {}
  } = options;
  const defaults2 = createDefaults(options.defaults);
  const display = createDisplay(options.display, options.ssr);
  const theme = createTheme(options.theme);
  const icons = createIcons(options.icons);
  const locale = createLocale(options.locale);
  const date2 = createDate(options.date, locale);
  const install = (app) => {
    for (const key in directives2) {
      app.directive(key, directives2[key]);
    }
    for (const key in components) {
      app.component(key, components[key]);
    }
    for (const key in aliases2) {
      app.component(key, defineComponent({
        ...aliases2[key],
        name: key,
        aliasName: aliases2[key].name
      }));
    }
    theme.install(app);
    app.provide(DefaultsSymbol, defaults2);
    app.provide(DisplaySymbol, display);
    app.provide(ThemeSymbol, theme);
    app.provide(IconSymbol, icons);
    app.provide(LocaleSymbol, locale);
    app.provide(DateOptionsSymbol, date2.options);
    app.provide(DateAdapterSymbol, date2.instance);
    getUid.reset();
    {
      app.mixin({
        computed: {
          $vuetify() {
            return reactive({
              defaults: inject.call(this, DefaultsSymbol),
              display: inject.call(this, DisplaySymbol),
              theme: inject.call(this, ThemeSymbol),
              icons: inject.call(this, IconSymbol),
              locale: inject.call(this, LocaleSymbol),
              date: inject.call(this, DateAdapterSymbol)
            });
          }
        }
      });
    }
  };
  return {
    install,
    defaults: defaults2,
    display,
    theme,
    icons,
    locale,
    date: date2
  };
}
const version = "3.4.10";
createVuetify.version = version;
function inject(key) {
  var _a2, _b2;
  const vm = this.$;
  const provides = ((_a2 = vm.parent) == null ? void 0 : _a2.provides) ?? ((_b2 = vm.vnode.appContext) == null ? void 0 : _b2.provides);
  if (provides && key in provides) {
    return provides[key];
  }
}
function defaultConditional() {
  return true;
}
function checkEvent(e, el, binding) {
  if (!e || checkIsActive(e, binding) === false)
    return false;
  const root = attachedRoot(el);
  if (typeof ShadowRoot !== "undefined" && root instanceof ShadowRoot && root.host === e.target)
    return false;
  const elements = (typeof binding.value === "object" && binding.value.include || (() => []))();
  elements.push(el);
  return !elements.some((el2) => el2 == null ? void 0 : el2.contains(e.target));
}
function checkIsActive(e, binding) {
  const isActive = typeof binding.value === "object" && binding.value.closeConditional || defaultConditional;
  return isActive(e);
}
function directive(e, el, binding) {
  const handler = typeof binding.value === "function" ? binding.value : binding.value.handler;
  el._clickOutside.lastMousedownWasOutside && checkEvent(e, el, binding) && setTimeout(() => {
    checkIsActive(e, binding) && handler && handler(e);
  }, 0);
}
function handleShadow(el, callback) {
  const root = attachedRoot(el);
  callback(void 0);
  if (typeof ShadowRoot !== "undefined" && root instanceof ShadowRoot) {
    callback(root);
  }
}
const ClickOutside = {
  // [data-app] may not be found
  // if using bind, inserted makes
  // sure that the root element is
  // available, iOS does not support
  // clicks on body
  mounted(el, binding) {
    const onClick = (e) => directive(e, el, binding);
    const onMousedown = (e) => {
      el._clickOutside.lastMousedownWasOutside = checkEvent(e, el, binding);
    };
    handleShadow(el, (app) => {
      app.addEventListener("click", onClick, true);
      app.addEventListener("mousedown", onMousedown, true);
    });
    if (!el._clickOutside) {
      el._clickOutside = {
        lastMousedownWasOutside: false
      };
    }
    el._clickOutside[binding.instance.$.uid] = {
      onClick,
      onMousedown
    };
  },
  unmounted(el, binding) {
    if (!el._clickOutside)
      return;
    handleShadow(el, (app) => {
      var _a2;
      if (!app || !((_a2 = el._clickOutside) == null ? void 0 : _a2[binding.instance.$.uid]))
        return;
      const {
        onClick,
        onMousedown
      } = el._clickOutside[binding.instance.$.uid];
      app.removeEventListener("click", onClick, true);
      app.removeEventListener("mousedown", onMousedown, true);
    });
    delete el._clickOutside[binding.instance.$.uid];
  }
};
function mounted$5(el, binding) {
  return;
}
function unmounted$5(el, binding) {
  var _a2;
  const observe = (_a2 = el._observe) == null ? void 0 : _a2[binding.instance.$.uid];
  if (!observe)
    return;
  observe.observer.unobserve(el);
  delete el._observe[binding.instance.$.uid];
}
const Intersect = {
  mounted: mounted$5,
  unmounted: unmounted$5
};
const Intersect$1 = Intersect;
function mounted$4(el, binding) {
  const modifiers = binding.modifiers || {};
  const value = binding.value;
  const {
    once,
    immediate,
    ...modifierKeys
  } = modifiers;
  const defaultValue = !Object.keys(modifierKeys).length;
  const {
    handler,
    options
  } = typeof value === "object" ? value : {
    handler: value,
    options: {
      attributes: (modifierKeys == null ? void 0 : modifierKeys.attr) ?? defaultValue,
      characterData: (modifierKeys == null ? void 0 : modifierKeys.char) ?? defaultValue,
      childList: (modifierKeys == null ? void 0 : modifierKeys.child) ?? defaultValue,
      subtree: (modifierKeys == null ? void 0 : modifierKeys.sub) ?? defaultValue
    }
  };
  const observer = new MutationObserver(function() {
    let mutations = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    let observer2 = arguments.length > 1 ? arguments[1] : void 0;
    handler == null ? void 0 : handler(mutations, observer2);
    if (once)
      unmounted$4(el, binding);
  });
  if (immediate)
    handler == null ? void 0 : handler([], observer);
  el._mutate = Object(el._mutate);
  el._mutate[binding.instance.$.uid] = {
    observer
  };
  observer.observe(el, options);
}
function unmounted$4(el, binding) {
  var _a2;
  if (!((_a2 = el._mutate) == null ? void 0 : _a2[binding.instance.$.uid]))
    return;
  el._mutate[binding.instance.$.uid].observer.disconnect();
  delete el._mutate[binding.instance.$.uid];
}
const Mutate = {
  mounted: mounted$4,
  unmounted: unmounted$4
};
function mounted$3(el, binding) {
  var _a2, _b2;
  const handler = binding.value;
  const options = {
    passive: !((_a2 = binding.modifiers) == null ? void 0 : _a2.active)
  };
  (void 0).addEventListener("resize", handler, options);
  el._onResize = Object(el._onResize);
  el._onResize[binding.instance.$.uid] = {
    handler,
    options
  };
  if (!((_b2 = binding.modifiers) == null ? void 0 : _b2.quiet)) {
    handler();
  }
}
function unmounted$3(el, binding) {
  var _a2;
  if (!((_a2 = el._onResize) == null ? void 0 : _a2[binding.instance.$.uid]))
    return;
  const {
    handler,
    options
  } = el._onResize[binding.instance.$.uid];
  (void 0).removeEventListener("resize", handler, options);
  delete el._onResize[binding.instance.$.uid];
}
const Resize = {
  mounted: mounted$3,
  unmounted: unmounted$3
};
const stopSymbol = Symbol("rippleStop");
const DELAY_RIPPLE = 80;
function transform(el, value) {
  el.style.transform = value;
  el.style.webkitTransform = value;
}
function isTouchEvent(e) {
  return e.constructor.name === "TouchEvent";
}
function isKeyboardEvent(e) {
  return e.constructor.name === "KeyboardEvent";
}
const calculate = function(e, el) {
  var _a2;
  let value = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  let localX = 0;
  let localY = 0;
  if (!isKeyboardEvent(e)) {
    const offset = el.getBoundingClientRect();
    const target = isTouchEvent(e) ? e.touches[e.touches.length - 1] : e;
    localX = target.clientX - offset.left;
    localY = target.clientY - offset.top;
  }
  let radius = 0;
  let scale = 0.3;
  if ((_a2 = el._ripple) == null ? void 0 : _a2.circle) {
    scale = 0.15;
    radius = el.clientWidth / 2;
    radius = value.center ? radius : radius + Math.sqrt((localX - radius) ** 2 + (localY - radius) ** 2) / 4;
  } else {
    radius = Math.sqrt(el.clientWidth ** 2 + el.clientHeight ** 2) / 2;
  }
  const centerX = `${(el.clientWidth - radius * 2) / 2}px`;
  const centerY = `${(el.clientHeight - radius * 2) / 2}px`;
  const x = value.center ? centerX : `${localX - radius}px`;
  const y = value.center ? centerY : `${localY - radius}px`;
  return {
    radius,
    scale,
    x,
    y,
    centerX,
    centerY
  };
};
const ripples = {
  /* eslint-disable max-statements */
  show(e, el) {
    var _a2;
    let value = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    if (!((_a2 = el == null ? void 0 : el._ripple) == null ? void 0 : _a2.enabled)) {
      return;
    }
    const container = (void 0).createElement("span");
    const animation = (void 0).createElement("span");
    container.appendChild(animation);
    container.className = "v-ripple__container";
    if (value.class) {
      container.className += ` ${value.class}`;
    }
    const {
      radius,
      scale,
      x,
      y,
      centerX,
      centerY
    } = calculate(e, el, value);
    const size = `${radius * 2}px`;
    animation.className = "v-ripple__animation";
    animation.style.width = size;
    animation.style.height = size;
    el.appendChild(container);
    const computed2 = (void 0).getComputedStyle(el);
    if (computed2 && computed2.position === "static") {
      el.style.position = "relative";
      el.dataset.previousPosition = "static";
    }
    animation.classList.add("v-ripple__animation--enter");
    animation.classList.add("v-ripple__animation--visible");
    transform(animation, `translate(${x}, ${y}) scale3d(${scale},${scale},${scale})`);
    animation.dataset.activated = String(performance.now());
    setTimeout(() => {
      animation.classList.remove("v-ripple__animation--enter");
      animation.classList.add("v-ripple__animation--in");
      transform(animation, `translate(${centerX}, ${centerY}) scale3d(1,1,1)`);
    }, 0);
  },
  hide(el) {
    var _a2;
    if (!((_a2 = el == null ? void 0 : el._ripple) == null ? void 0 : _a2.enabled))
      return;
    const ripples2 = el.getElementsByClassName("v-ripple__animation");
    if (ripples2.length === 0)
      return;
    const animation = ripples2[ripples2.length - 1];
    if (animation.dataset.isHiding)
      return;
    else
      animation.dataset.isHiding = "true";
    const diff = performance.now() - Number(animation.dataset.activated);
    const delay = Math.max(250 - diff, 0);
    setTimeout(() => {
      animation.classList.remove("v-ripple__animation--in");
      animation.classList.add("v-ripple__animation--out");
      setTimeout(() => {
        var _a3;
        const ripples3 = el.getElementsByClassName("v-ripple__animation");
        if (ripples3.length === 1 && el.dataset.previousPosition) {
          el.style.position = el.dataset.previousPosition;
          delete el.dataset.previousPosition;
        }
        if (((_a3 = animation.parentNode) == null ? void 0 : _a3.parentNode) === el)
          el.removeChild(animation.parentNode);
      }, 300);
    }, delay);
  }
};
function isRippleEnabled(value) {
  return typeof value === "undefined" || !!value;
}
function rippleShow(e) {
  const value = {};
  const element = e.currentTarget;
  if (!(element == null ? void 0 : element._ripple) || element._ripple.touched || e[stopSymbol])
    return;
  e[stopSymbol] = true;
  if (isTouchEvent(e)) {
    element._ripple.touched = true;
    element._ripple.isTouch = true;
  } else {
    if (element._ripple.isTouch)
      return;
  }
  value.center = element._ripple.centered || isKeyboardEvent(e);
  if (element._ripple.class) {
    value.class = element._ripple.class;
  }
  if (isTouchEvent(e)) {
    if (element._ripple.showTimerCommit)
      return;
    element._ripple.showTimerCommit = () => {
      ripples.show(e, element, value);
    };
    element._ripple.showTimer = (void 0).setTimeout(() => {
      var _a2;
      if ((_a2 = element == null ? void 0 : element._ripple) == null ? void 0 : _a2.showTimerCommit) {
        element._ripple.showTimerCommit();
        element._ripple.showTimerCommit = null;
      }
    }, DELAY_RIPPLE);
  } else {
    ripples.show(e, element, value);
  }
}
function rippleStop(e) {
  e[stopSymbol] = true;
}
function rippleHide(e) {
  const element = e.currentTarget;
  if (!(element == null ? void 0 : element._ripple))
    return;
  (void 0).clearTimeout(element._ripple.showTimer);
  if (e.type === "touchend" && element._ripple.showTimerCommit) {
    element._ripple.showTimerCommit();
    element._ripple.showTimerCommit = null;
    element._ripple.showTimer = (void 0).setTimeout(() => {
      rippleHide(e);
    });
    return;
  }
  (void 0).setTimeout(() => {
    if (element._ripple) {
      element._ripple.touched = false;
    }
  });
  ripples.hide(element);
}
function rippleCancelShow(e) {
  const element = e.currentTarget;
  if (!(element == null ? void 0 : element._ripple))
    return;
  if (element._ripple.showTimerCommit) {
    element._ripple.showTimerCommit = null;
  }
  (void 0).clearTimeout(element._ripple.showTimer);
}
let keyboardRipple = false;
function keyboardRippleShow(e) {
  if (!keyboardRipple && (e.keyCode === keyCodes.enter || e.keyCode === keyCodes.space)) {
    keyboardRipple = true;
    rippleShow(e);
  }
}
function keyboardRippleHide(e) {
  keyboardRipple = false;
  rippleHide(e);
}
function focusRippleHide(e) {
  if (keyboardRipple) {
    keyboardRipple = false;
    rippleHide(e);
  }
}
function updateRipple(el, binding, wasEnabled) {
  const {
    value,
    modifiers
  } = binding;
  const enabled = isRippleEnabled(value);
  if (!enabled) {
    ripples.hide(el);
  }
  el._ripple = el._ripple ?? {};
  el._ripple.enabled = enabled;
  el._ripple.centered = modifiers.center;
  el._ripple.circle = modifiers.circle;
  if (isObject(value) && value.class) {
    el._ripple.class = value.class;
  }
  if (enabled && !wasEnabled) {
    if (modifiers.stop) {
      el.addEventListener("touchstart", rippleStop, {
        passive: true
      });
      el.addEventListener("mousedown", rippleStop);
      return;
    }
    el.addEventListener("touchstart", rippleShow, {
      passive: true
    });
    el.addEventListener("touchend", rippleHide, {
      passive: true
    });
    el.addEventListener("touchmove", rippleCancelShow, {
      passive: true
    });
    el.addEventListener("touchcancel", rippleHide);
    el.addEventListener("mousedown", rippleShow);
    el.addEventListener("mouseup", rippleHide);
    el.addEventListener("mouseleave", rippleHide);
    el.addEventListener("keydown", keyboardRippleShow);
    el.addEventListener("keyup", keyboardRippleHide);
    el.addEventListener("blur", focusRippleHide);
    el.addEventListener("dragstart", rippleHide, {
      passive: true
    });
  } else if (!enabled && wasEnabled) {
    removeListeners(el);
  }
}
function removeListeners(el) {
  el.removeEventListener("mousedown", rippleShow);
  el.removeEventListener("touchstart", rippleShow);
  el.removeEventListener("touchend", rippleHide);
  el.removeEventListener("touchmove", rippleCancelShow);
  el.removeEventListener("touchcancel", rippleHide);
  el.removeEventListener("mouseup", rippleHide);
  el.removeEventListener("mouseleave", rippleHide);
  el.removeEventListener("keydown", keyboardRippleShow);
  el.removeEventListener("keyup", keyboardRippleHide);
  el.removeEventListener("dragstart", rippleHide);
  el.removeEventListener("blur", focusRippleHide);
}
function mounted$2(el, binding) {
  updateRipple(el, binding, false);
}
function unmounted$2(el) {
  delete el._ripple;
  removeListeners(el);
}
function updated$1(el, binding) {
  if (binding.value === binding.oldValue) {
    return;
  }
  const wasEnabled = isRippleEnabled(binding.oldValue);
  updateRipple(el, binding, wasEnabled);
}
const Ripple = {
  mounted: mounted$2,
  unmounted: unmounted$2,
  updated: updated$1
};
function mounted$1(el, binding) {
  const {
    self: self2 = false
  } = binding.modifiers ?? {};
  const value = binding.value;
  const options = typeof value === "object" && value.options || {
    passive: true
  };
  const handler = typeof value === "function" || "handleEvent" in value ? value : value.handler;
  const target = self2 ? el : binding.arg ? (void 0).querySelector(binding.arg) : void 0;
  if (!target)
    return;
  target.addEventListener("scroll", handler, options);
  el._onScroll = Object(el._onScroll);
  el._onScroll[binding.instance.$.uid] = {
    handler,
    options,
    // Don't reference self
    target: self2 ? void 0 : target
  };
}
function unmounted$1(el, binding) {
  var _a2;
  if (!((_a2 = el._onScroll) == null ? void 0 : _a2[binding.instance.$.uid]))
    return;
  const {
    handler,
    options,
    target = el
  } = el._onScroll[binding.instance.$.uid];
  target.removeEventListener("scroll", handler, options);
  delete el._onScroll[binding.instance.$.uid];
}
function updated(el, binding) {
  if (binding.value === binding.oldValue)
    return;
  unmounted$1(el, binding);
  mounted$1(el, binding);
}
const Scroll = {
  mounted: mounted$1,
  unmounted: unmounted$1,
  updated
};
const handleGesture = (wrapper) => {
  const {
    touchstartX,
    touchendX,
    touchstartY,
    touchendY
  } = wrapper;
  const dirRatio = 0.5;
  const minDistance = 16;
  wrapper.offsetX = touchendX - touchstartX;
  wrapper.offsetY = touchendY - touchstartY;
  if (Math.abs(wrapper.offsetY) < dirRatio * Math.abs(wrapper.offsetX)) {
    wrapper.left && touchendX < touchstartX - minDistance && wrapper.left(wrapper);
    wrapper.right && touchendX > touchstartX + minDistance && wrapper.right(wrapper);
  }
  if (Math.abs(wrapper.offsetX) < dirRatio * Math.abs(wrapper.offsetY)) {
    wrapper.up && touchendY < touchstartY - minDistance && wrapper.up(wrapper);
    wrapper.down && touchendY > touchstartY + minDistance && wrapper.down(wrapper);
  }
};
function touchstart(event, wrapper) {
  var _a2;
  const touch = event.changedTouches[0];
  wrapper.touchstartX = touch.clientX;
  wrapper.touchstartY = touch.clientY;
  (_a2 = wrapper.start) == null ? void 0 : _a2.call(wrapper, {
    originalEvent: event,
    ...wrapper
  });
}
function touchend(event, wrapper) {
  var _a2;
  const touch = event.changedTouches[0];
  wrapper.touchendX = touch.clientX;
  wrapper.touchendY = touch.clientY;
  (_a2 = wrapper.end) == null ? void 0 : _a2.call(wrapper, {
    originalEvent: event,
    ...wrapper
  });
  handleGesture(wrapper);
}
function touchmove(event, wrapper) {
  var _a2;
  const touch = event.changedTouches[0];
  wrapper.touchmoveX = touch.clientX;
  wrapper.touchmoveY = touch.clientY;
  (_a2 = wrapper.move) == null ? void 0 : _a2.call(wrapper, {
    originalEvent: event,
    ...wrapper
  });
}
function createHandlers() {
  let value = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const wrapper = {
    touchstartX: 0,
    touchstartY: 0,
    touchendX: 0,
    touchendY: 0,
    touchmoveX: 0,
    touchmoveY: 0,
    offsetX: 0,
    offsetY: 0,
    left: value.left,
    right: value.right,
    up: value.up,
    down: value.down,
    start: value.start,
    move: value.move,
    end: value.end
  };
  return {
    touchstart: (e) => touchstart(e, wrapper),
    touchend: (e) => touchend(e, wrapper),
    touchmove: (e) => touchmove(e, wrapper)
  };
}
function mounted(el, binding) {
  var _a2;
  const value = binding.value;
  const target = (value == null ? void 0 : value.parent) ? el.parentElement : el;
  const options = (value == null ? void 0 : value.options) ?? {
    passive: true
  };
  const uid = (_a2 = binding.instance) == null ? void 0 : _a2.$.uid;
  if (!target || !uid)
    return;
  const handlers = createHandlers(binding.value);
  target._touchHandlers = target._touchHandlers ?? /* @__PURE__ */ Object.create(null);
  target._touchHandlers[uid] = handlers;
  keys(handlers).forEach((eventName2) => {
    target.addEventListener(eventName2, handlers[eventName2], options);
  });
}
function unmounted(el, binding) {
  var _a2, _b2;
  const target = ((_a2 = binding.value) == null ? void 0 : _a2.parent) ? el.parentElement : el;
  const uid = (_b2 = binding.instance) == null ? void 0 : _b2.$.uid;
  if (!(target == null ? void 0 : target._touchHandlers) || !uid)
    return;
  const handlers = target._touchHandlers[uid];
  keys(handlers).forEach((eventName2) => {
    target.removeEventListener(eventName2, handlers[eventName2]);
  });
  delete target._touchHandlers[uid];
}
const Touch = {
  mounted,
  unmounted
};
const directives = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ClickOutside,
  Intersect,
  Mutate,
  Resize,
  Ripple,
  Scroll,
  Touch
});
const makeBorderProps = propsFactory({
  border: [Boolean, Number, String]
}, "border");
function useBorder(props) {
  let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  const borderClasses = computed(() => {
    const border = isRef(props) ? props.value : props.border;
    const classes = [];
    if (border === true || border === "") {
      classes.push(`${name}--border`);
    } else if (typeof border === "string" || border === 0) {
      for (const value of String(border).split(" ")) {
        classes.push(`border-${value}`);
      }
    }
    return classes;
  });
  return {
    borderClasses
  };
}
const allowedDensities = [null, "default", "comfortable", "compact"];
const makeDensityProps = propsFactory({
  density: {
    type: String,
    default: "default",
    validator: (v) => allowedDensities.includes(v)
  }
}, "density");
function useDensity(props) {
  let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  const densityClasses = computed(() => {
    return `${name}--density-${props.density}`;
  });
  return {
    densityClasses
  };
}
const makeElevationProps = propsFactory({
  elevation: {
    type: [Number, String],
    validator(v) {
      const value = parseInt(v);
      return !isNaN(value) && value >= 0 && // Material Design has a maximum elevation of 24
      // https://material.io/design/environment/elevation.html#default-elevations
      value <= 24;
    }
  }
}, "elevation");
function useElevation(props) {
  const elevationClasses = computed(() => {
    const elevation = isRef(props) ? props.value : props.elevation;
    const classes = [];
    if (elevation == null)
      return classes;
    classes.push(`elevation-${elevation}`);
    return classes;
  });
  return {
    elevationClasses
  };
}
const makeRoundedProps = propsFactory({
  rounded: {
    type: [Boolean, Number, String],
    default: void 0
  }
}, "rounded");
function useRounded(props) {
  let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  const roundedClasses = computed(() => {
    const rounded = isRef(props) ? props.value : props.rounded;
    const classes = [];
    if (rounded === true || rounded === "") {
      classes.push(`${name}--rounded`);
    } else if (typeof rounded === "string" || rounded === 0) {
      for (const value of String(rounded).split(" ")) {
        classes.push(`rounded-${value}`);
      }
    }
    return classes;
  });
  return {
    roundedClasses
  };
}
const makeTagProps = propsFactory({
  tag: {
    type: String,
    default: "div"
  }
}, "tag");
function useColor(colors) {
  return destructComputed(() => {
    const classes = [];
    const styles = {};
    if (colors.value.background) {
      if (isCssColor(colors.value.background)) {
        styles.backgroundColor = colors.value.background;
        if (!colors.value.text && isParsableColor(colors.value.background)) {
          const backgroundColor = parseColor(colors.value.background);
          if (backgroundColor.a == null || backgroundColor.a === 1) {
            const textColor = getForeground(backgroundColor);
            styles.color = textColor;
            styles.caretColor = textColor;
          }
        }
      } else {
        classes.push(`bg-${colors.value.background}`);
      }
    }
    if (colors.value.text) {
      if (isCssColor(colors.value.text)) {
        styles.color = colors.value.text;
        styles.caretColor = colors.value.text;
      } else {
        classes.push(`text-${colors.value.text}`);
      }
    }
    return {
      colorClasses: classes,
      colorStyles: styles
    };
  });
}
function useTextColor(props, name) {
  const colors = computed(() => ({
    text: isRef(props) ? props.value : name ? props[name] : null
  }));
  const {
    colorClasses: textColorClasses,
    colorStyles: textColorStyles
  } = useColor(colors);
  return {
    textColorClasses,
    textColorStyles
  };
}
function useBackgroundColor(props, name) {
  const colors = computed(() => ({
    background: isRef(props) ? props.value : name ? props[name] : null
  }));
  const {
    colorClasses: backgroundColorClasses,
    colorStyles: backgroundColorStyles
  } = useColor(colors);
  return {
    backgroundColorClasses,
    backgroundColorStyles
  };
}
const allowedVariants = ["elevated", "flat", "tonal", "outlined", "text", "plain"];
function genOverlays(isClickable, name) {
  return createVNode(Fragment, null, [isClickable && createVNode("span", {
    "key": "overlay",
    "class": `${name}__overlay`
  }, null), createVNode("span", {
    "key": "underlay",
    "class": `${name}__underlay`
  }, null)]);
}
const makeVariantProps = propsFactory({
  color: String,
  variant: {
    type: String,
    default: "elevated",
    validator: (v) => allowedVariants.includes(v)
  }
}, "variant");
function useVariant(props) {
  let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  const variantClasses = computed(() => {
    const {
      variant
    } = unref(props);
    return `${name}--variant-${variant}`;
  });
  const {
    colorClasses,
    colorStyles
  } = useColor(computed(() => {
    const {
      variant,
      color
    } = unref(props);
    return {
      [["elevated", "flat"].includes(variant) ? "background" : "text"]: color
    };
  }));
  return {
    colorClasses,
    colorStyles,
    variantClasses
  };
}
const makeVBtnGroupProps = propsFactory({
  divided: Boolean,
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeElevationProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps()
}, "VBtnGroup");
const VBtnGroup = genericComponent()({
  name: "VBtnGroup",
  props: makeVBtnGroupProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      densityClasses
    } = useDensity(props);
    const {
      borderClasses
    } = useBorder(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    provideDefaults({
      VBtn: {
        height: "auto",
        color: toRef(props, "color"),
        density: toRef(props, "density"),
        flat: true,
        variant: toRef(props, "variant")
      }
    });
    useRender(() => {
      return createVNode(props.tag, {
        "class": ["v-btn-group", {
          "v-btn-group--divided": props.divided
        }, themeClasses.value, borderClasses.value, densityClasses.value, elevationClasses.value, roundedClasses.value, props.class],
        "style": props.style
      }, slots);
    });
  }
});
const makeGroupProps = propsFactory({
  modelValue: {
    type: null,
    default: void 0
  },
  multiple: Boolean,
  mandatory: [Boolean, String],
  max: Number,
  selectedClass: String,
  disabled: Boolean
}, "group");
const makeGroupItemProps = propsFactory({
  value: null,
  disabled: Boolean,
  selectedClass: String
}, "group-item");
function useGroupItem(props, injectKey) {
  let required = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
  const vm = getCurrentInstance("useGroupItem");
  if (!vm) {
    throw new Error("[Vuetify] useGroupItem composable must be used inside a component setup function");
  }
  const id = getUid();
  provide(Symbol.for(`${injectKey.description}:id`), id);
  const group = inject$1(injectKey, null);
  if (!group) {
    if (!required)
      return group;
    throw new Error(`[Vuetify] Could not find useGroup injection with symbol ${injectKey.description}`);
  }
  const value = toRef(props, "value");
  const disabled = computed(() => !!(group.disabled.value || props.disabled));
  group.register({
    id,
    value,
    disabled
  }, vm);
  const isSelected = computed(() => {
    return group.isSelected(id);
  });
  const selectedClass = computed(() => isSelected.value && [group.selectedClass.value, props.selectedClass]);
  watch(isSelected, (value2) => {
    vm.emit("group:selected", {
      value: value2
    });
  });
  return {
    id,
    isSelected,
    toggle: () => group.select(id, !isSelected.value),
    select: (value2) => group.select(id, value2),
    selectedClass,
    value,
    disabled,
    group
  };
}
function useGroup(props, injectKey) {
  const items = reactive([]);
  const selected = useProxiedModel(props, "modelValue", [], (v) => {
    if (v == null)
      return [];
    return getIds(items, wrapInArray(v));
  }, (v) => {
    const arr = getValues(items, v);
    return props.multiple ? arr : arr[0];
  });
  const groupVm = getCurrentInstance("useGroup");
  function register(item, vm) {
    const unwrapped = item;
    const key = Symbol.for(`${injectKey.description}:id`);
    const children = findChildrenWithProvide(key, groupVm == null ? void 0 : groupVm.vnode);
    const index = children.indexOf(vm);
    if (index > -1) {
      items.splice(index, 0, unwrapped);
    } else {
      items.push(unwrapped);
    }
  }
  function unregister(id) {
    forceMandatoryValue();
    const index = items.findIndex((item) => item.id === id);
    items.splice(index, 1);
  }
  function forceMandatoryValue() {
    const item = items.find((item2) => !item2.disabled);
    if (item && props.mandatory === "force" && !selected.value.length) {
      selected.value = [item.id];
    }
  }
  function select(id, value) {
    const item = items.find((item2) => item2.id === id);
    if (value && (item == null ? void 0 : item.disabled))
      return;
    if (props.multiple) {
      const internalValue = selected.value.slice();
      const index = internalValue.findIndex((v) => v === id);
      const isSelected = ~index;
      value = value ?? !isSelected;
      if (isSelected && props.mandatory && internalValue.length <= 1)
        return;
      if (!isSelected && props.max != null && internalValue.length + 1 > props.max)
        return;
      if (index < 0 && value)
        internalValue.push(id);
      else if (index >= 0 && !value)
        internalValue.splice(index, 1);
      selected.value = internalValue;
    } else {
      const isSelected = selected.value.includes(id);
      if (props.mandatory && isSelected)
        return;
      selected.value = value ?? !isSelected ? [id] : [];
    }
  }
  function step(offset) {
    if (props.multiple)
      consoleWarn('This method is not supported when using "multiple" prop');
    if (!selected.value.length) {
      const item = items.find((item2) => !item2.disabled);
      item && (selected.value = [item.id]);
    } else {
      const currentId = selected.value[0];
      const currentIndex = items.findIndex((i) => i.id === currentId);
      let newIndex = (currentIndex + offset) % items.length;
      let newItem = items[newIndex];
      while (newItem.disabled && newIndex !== currentIndex) {
        newIndex = (newIndex + offset) % items.length;
        newItem = items[newIndex];
      }
      if (newItem.disabled)
        return;
      selected.value = [items[newIndex].id];
    }
  }
  const state = {
    register,
    unregister,
    selected,
    select,
    disabled: toRef(props, "disabled"),
    prev: () => step(items.length - 1),
    next: () => step(1),
    isSelected: (id) => selected.value.includes(id),
    selectedClass: computed(() => props.selectedClass),
    items: computed(() => items),
    getItemIndex: (value) => getItemIndex(items, value)
  };
  provide(injectKey, state);
  return state;
}
function getItemIndex(items, value) {
  const ids = getIds(items, [value]);
  if (!ids.length)
    return -1;
  return items.findIndex((item) => item.id === ids[0]);
}
function getIds(items, modelValue) {
  const ids = [];
  modelValue.forEach((value) => {
    const item = items.find((item2) => deepEqual(value, item2.value));
    const itemByIndex = items[value];
    if ((item == null ? void 0 : item.value) != null) {
      ids.push(item.id);
    } else if (itemByIndex != null) {
      ids.push(itemByIndex.id);
    }
  });
  return ids;
}
function getValues(items, ids) {
  const values = [];
  ids.forEach((id) => {
    const itemIndex = items.findIndex((item) => item.id === id);
    if (~itemIndex) {
      const item = items[itemIndex];
      values.push(item.value != null ? item.value : itemIndex);
    }
  });
  return values;
}
const VBtnToggleSymbol = Symbol.for("vuetify:v-btn-toggle");
const makeVBtnToggleProps = propsFactory({
  ...makeVBtnGroupProps(),
  ...makeGroupProps()
}, "VBtnToggle");
genericComponent()({
  name: "VBtnToggle",
  props: makeVBtnToggleProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      isSelected,
      next,
      prev,
      select,
      selected
    } = useGroup(props, VBtnToggleSymbol);
    useRender(() => {
      const btnGroupProps = VBtnGroup.filterProps(props);
      return createVNode(VBtnGroup, mergeProps({
        "class": ["v-btn-toggle", props.class]
      }, btnGroupProps, {
        "style": props.style
      }), {
        default: () => {
          var _a2;
          return [(_a2 = slots.default) == null ? void 0 : _a2.call(slots, {
            isSelected,
            next,
            prev,
            select,
            selected
          })];
        }
      });
    });
    return {
      next,
      prev,
      select
    };
  }
});
const makeVDefaultsProviderProps = propsFactory({
  defaults: Object,
  disabled: Boolean,
  reset: [Number, String],
  root: [Boolean, String],
  scoped: Boolean
}, "VDefaultsProvider");
const VDefaultsProvider = genericComponent(false)({
  name: "VDefaultsProvider",
  props: makeVDefaultsProviderProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      defaults: defaults2,
      disabled,
      reset,
      root,
      scoped
    } = toRefs(props);
    provideDefaults(defaults2, {
      reset,
      root,
      scoped,
      disabled
    });
    return () => {
      var _a2;
      return (_a2 = slots.default) == null ? void 0 : _a2.call(slots);
    };
  }
});
const predefinedSizes = ["x-small", "small", "default", "large", "x-large"];
const makeSizeProps = propsFactory({
  size: {
    type: [String, Number],
    default: "default"
  }
}, "size");
function useSize(props) {
  let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  return destructComputed(() => {
    let sizeClasses;
    let sizeStyles;
    if (includes(predefinedSizes, props.size)) {
      sizeClasses = `${name}--size-${props.size}`;
    } else if (props.size) {
      sizeStyles = {
        width: convertToUnit(props.size),
        height: convertToUnit(props.size)
      };
    }
    return {
      sizeClasses,
      sizeStyles
    };
  });
}
const makeVIconProps = propsFactory({
  color: String,
  start: Boolean,
  end: Boolean,
  icon: IconValue,
  ...makeComponentProps(),
  ...makeSizeProps(),
  ...makeTagProps({
    tag: "i"
  }),
  ...makeThemeProps()
}, "VIcon");
const VIcon = genericComponent()({
  name: "VIcon",
  props: makeVIconProps(),
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const slotIcon = ref();
    const {
      themeClasses
    } = provideTheme(props);
    const {
      iconData
    } = useIcon(computed(() => slotIcon.value || props.icon));
    const {
      sizeClasses
    } = useSize(props);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(toRef(props, "color"));
    useRender(() => {
      var _a2, _b2;
      const slotValue = (_a2 = slots.default) == null ? void 0 : _a2.call(slots);
      if (slotValue) {
        slotIcon.value = (_b2 = flattenFragments(slotValue).filter((node) => node.type === Text && node.children && typeof node.children === "string")[0]) == null ? void 0 : _b2.children;
      }
      return createVNode(iconData.value.component, {
        "tag": props.tag,
        "icon": iconData.value.icon,
        "class": ["v-icon", "notranslate", themeClasses.value, sizeClasses.value, textColorClasses.value, {
          "v-icon--clickable": !!attrs.onClick,
          "v-icon--start": props.start,
          "v-icon--end": props.end
        }, props.class],
        "style": [!sizeClasses.value ? {
          fontSize: convertToUnit(props.size),
          height: convertToUnit(props.size),
          width: convertToUnit(props.size)
        } : void 0, textColorStyles.value, props.style],
        "role": attrs.onClick ? "button" : void 0,
        "aria-hidden": !attrs.onClick
      }, {
        default: () => [slotValue]
      });
    });
    return {};
  }
});
function useIntersectionObserver(callback, options) {
  const intersectionRef = ref();
  const isIntersecting = shallowRef(false);
  return {
    intersectionRef,
    isIntersecting
  };
}
const makeVProgressCircularProps = propsFactory({
  bgColor: String,
  color: String,
  indeterminate: [Boolean, String],
  modelValue: {
    type: [Number, String],
    default: 0
  },
  rotate: {
    type: [Number, String],
    default: 0
  },
  width: {
    type: [Number, String],
    default: 4
  },
  ...makeComponentProps(),
  ...makeSizeProps(),
  ...makeTagProps({
    tag: "div"
  }),
  ...makeThemeProps()
}, "VProgressCircular");
const VProgressCircular = genericComponent()({
  name: "VProgressCircular",
  props: makeVProgressCircularProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const MAGIC_RADIUS_CONSTANT = 20;
    const CIRCUMFERENCE = 2 * Math.PI * MAGIC_RADIUS_CONSTANT;
    const root = ref();
    const {
      themeClasses
    } = provideTheme(props);
    const {
      sizeClasses,
      sizeStyles
    } = useSize(props);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(toRef(props, "color"));
    const {
      textColorClasses: underlayColorClasses,
      textColorStyles: underlayColorStyles
    } = useTextColor(toRef(props, "bgColor"));
    const {
      intersectionRef,
      isIntersecting
    } = useIntersectionObserver();
    const {
      resizeRef,
      contentRect
    } = useResizeObserver();
    const normalizedValue = computed(() => Math.max(0, Math.min(100, parseFloat(props.modelValue))));
    const width = computed(() => Number(props.width));
    const size = computed(() => {
      return sizeStyles.value ? Number(props.size) : contentRect.value ? contentRect.value.width : Math.max(width.value, 32);
    });
    const diameter = computed(() => MAGIC_RADIUS_CONSTANT / (1 - width.value / size.value) * 2);
    const strokeWidth = computed(() => width.value / size.value * diameter.value);
    const strokeDashOffset = computed(() => convertToUnit((100 - normalizedValue.value) / 100 * CIRCUMFERENCE));
    watchEffect(() => {
      intersectionRef.value = root.value;
      resizeRef.value = root.value;
    });
    useRender(() => createVNode(props.tag, {
      "ref": root,
      "class": ["v-progress-circular", {
        "v-progress-circular--indeterminate": !!props.indeterminate,
        "v-progress-circular--visible": isIntersecting.value,
        "v-progress-circular--disable-shrink": props.indeterminate === "disable-shrink"
      }, themeClasses.value, sizeClasses.value, textColorClasses.value, props.class],
      "style": [sizeStyles.value, textColorStyles.value, props.style],
      "role": "progressbar",
      "aria-valuemin": "0",
      "aria-valuemax": "100",
      "aria-valuenow": props.indeterminate ? void 0 : normalizedValue.value
    }, {
      default: () => [createVNode("svg", {
        "style": {
          transform: `rotate(calc(-90deg + ${Number(props.rotate)}deg))`
        },
        "xmlns": "http://www.w3.org/2000/svg",
        "viewBox": `0 0 ${diameter.value} ${diameter.value}`
      }, [createVNode("circle", {
        "class": ["v-progress-circular__underlay", underlayColorClasses.value],
        "style": underlayColorStyles.value,
        "fill": "transparent",
        "cx": "50%",
        "cy": "50%",
        "r": MAGIC_RADIUS_CONSTANT,
        "stroke-width": strokeWidth.value,
        "stroke-dasharray": CIRCUMFERENCE,
        "stroke-dashoffset": 0
      }, null), createVNode("circle", {
        "class": "v-progress-circular__overlay",
        "fill": "transparent",
        "cx": "50%",
        "cy": "50%",
        "r": MAGIC_RADIUS_CONSTANT,
        "stroke-width": strokeWidth.value,
        "stroke-dasharray": CIRCUMFERENCE,
        "stroke-dashoffset": strokeDashOffset.value
      }, null)]), slots.default && createVNode("div", {
        "class": "v-progress-circular__content"
      }, [slots.default({
        value: normalizedValue.value
      })])]
    }));
    return {};
  }
});
const makeDimensionProps = propsFactory({
  height: [Number, String],
  maxHeight: [Number, String],
  maxWidth: [Number, String],
  minHeight: [Number, String],
  minWidth: [Number, String],
  width: [Number, String]
}, "dimension");
function useDimension(props) {
  const dimensionStyles = computed(() => ({
    height: convertToUnit(props.height),
    maxHeight: convertToUnit(props.maxHeight),
    maxWidth: convertToUnit(props.maxWidth),
    minHeight: convertToUnit(props.minHeight),
    minWidth: convertToUnit(props.minWidth),
    width: convertToUnit(props.width)
  }));
  return {
    dimensionStyles
  };
}
const oppositeMap = {
  center: "center",
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
};
const makeLocationProps = propsFactory({
  location: String
}, "location");
function useLocation(props) {
  let opposite = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  let offset = arguments.length > 2 ? arguments[2] : void 0;
  const {
    isRtl
  } = useRtl();
  const locationStyles = computed(() => {
    if (!props.location)
      return {};
    const {
      side,
      align
    } = parseAnchor(props.location.split(" ").length > 1 ? props.location : `${props.location} center`, isRtl.value);
    function getOffset(side2) {
      return offset ? offset(side2) : 0;
    }
    const styles = {};
    if (side !== "center") {
      if (opposite)
        styles[oppositeMap[side]] = `calc(100% - ${getOffset(side)}px)`;
      else
        styles[side] = 0;
    }
    if (align !== "center") {
      if (opposite)
        styles[oppositeMap[align]] = `calc(100% - ${getOffset(align)}px)`;
      else
        styles[align] = 0;
    } else {
      if (side === "center")
        styles.top = styles.left = "50%";
      else {
        styles[{
          top: "left",
          bottom: "left",
          left: "top",
          right: "top"
        }[side]] = "50%";
      }
      styles.transform = {
        top: "translateX(-50%)",
        bottom: "translateX(-50%)",
        left: "translateY(-50%)",
        right: "translateY(-50%)",
        center: "translate(-50%, -50%)"
      }[side];
    }
    return styles;
  });
  return {
    locationStyles
  };
}
const makeVProgressLinearProps = propsFactory({
  absolute: Boolean,
  active: {
    type: Boolean,
    default: true
  },
  bgColor: String,
  bgOpacity: [Number, String],
  bufferValue: {
    type: [Number, String],
    default: 0
  },
  clickable: Boolean,
  color: String,
  height: {
    type: [Number, String],
    default: 4
  },
  indeterminate: Boolean,
  max: {
    type: [Number, String],
    default: 100
  },
  modelValue: {
    type: [Number, String],
    default: 0
  },
  reverse: Boolean,
  stream: Boolean,
  striped: Boolean,
  roundedBar: Boolean,
  ...makeComponentProps(),
  ...makeLocationProps({
    location: "top"
  }),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps()
}, "VProgressLinear");
const VProgressLinear = genericComponent()({
  name: "VProgressLinear",
  props: makeVProgressLinearProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const progress = useProxiedModel(props, "modelValue");
    const {
      isRtl,
      rtlClasses
    } = useRtl();
    const {
      themeClasses
    } = provideTheme(props);
    const {
      locationStyles
    } = useLocation(props);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(props, "color");
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(computed(() => props.bgColor || props.color));
    const {
      backgroundColorClasses: barColorClasses,
      backgroundColorStyles: barColorStyles
    } = useBackgroundColor(props, "color");
    const {
      roundedClasses
    } = useRounded(props);
    const {
      intersectionRef,
      isIntersecting
    } = useIntersectionObserver();
    const max = computed(() => parseInt(props.max, 10));
    const height = computed(() => parseInt(props.height, 10));
    const normalizedBuffer = computed(() => parseFloat(props.bufferValue) / max.value * 100);
    const normalizedValue = computed(() => parseFloat(progress.value) / max.value * 100);
    const isReversed = computed(() => isRtl.value !== props.reverse);
    const transition = computed(() => props.indeterminate ? "fade-transition" : "slide-x-transition");
    const opacity = computed(() => {
      return props.bgOpacity == null ? props.bgOpacity : parseFloat(props.bgOpacity);
    });
    function handleClick(e) {
      if (!intersectionRef.value)
        return;
      const {
        left,
        right,
        width
      } = intersectionRef.value.getBoundingClientRect();
      const value = isReversed.value ? width - e.clientX + (right - width) : e.clientX - left;
      progress.value = Math.round(value / width * max.value);
    }
    useRender(() => createVNode(props.tag, {
      "ref": intersectionRef,
      "class": ["v-progress-linear", {
        "v-progress-linear--absolute": props.absolute,
        "v-progress-linear--active": props.active && isIntersecting.value,
        "v-progress-linear--reverse": isReversed.value,
        "v-progress-linear--rounded": props.rounded,
        "v-progress-linear--rounded-bar": props.roundedBar,
        "v-progress-linear--striped": props.striped
      }, roundedClasses.value, themeClasses.value, rtlClasses.value, props.class],
      "style": [{
        bottom: props.location === "bottom" ? 0 : void 0,
        top: props.location === "top" ? 0 : void 0,
        height: props.active ? convertToUnit(height.value) : 0,
        "--v-progress-linear-height": convertToUnit(height.value),
        ...locationStyles.value
      }, props.style],
      "role": "progressbar",
      "aria-hidden": props.active ? "false" : "true",
      "aria-valuemin": "0",
      "aria-valuemax": props.max,
      "aria-valuenow": props.indeterminate ? void 0 : normalizedValue.value,
      "onClick": props.clickable && handleClick
    }, {
      default: () => [props.stream && createVNode("div", {
        "key": "stream",
        "class": ["v-progress-linear__stream", textColorClasses.value],
        "style": {
          ...textColorStyles.value,
          [isReversed.value ? "left" : "right"]: convertToUnit(-height.value),
          borderTop: `${convertToUnit(height.value / 2)} dotted`,
          opacity: opacity.value,
          top: `calc(50% - ${convertToUnit(height.value / 4)})`,
          width: convertToUnit(100 - normalizedBuffer.value, "%"),
          "--v-progress-linear-stream-to": convertToUnit(height.value * (isReversed.value ? 1 : -1))
        }
      }, null), createVNode("div", {
        "class": ["v-progress-linear__background", backgroundColorClasses.value],
        "style": [backgroundColorStyles.value, {
          opacity: opacity.value,
          width: convertToUnit(!props.stream ? 100 : normalizedBuffer.value, "%")
        }]
      }, null), createVNode(Transition, {
        "name": transition.value
      }, {
        default: () => [!props.indeterminate ? createVNode("div", {
          "class": ["v-progress-linear__determinate", barColorClasses.value],
          "style": [barColorStyles.value, {
            width: convertToUnit(normalizedValue.value, "%")
          }]
        }, null) : createVNode("div", {
          "class": "v-progress-linear__indeterminate"
        }, [["long", "short"].map((bar) => createVNode("div", {
          "key": bar,
          "class": ["v-progress-linear__indeterminate", bar, barColorClasses.value],
          "style": barColorStyles.value
        }, null))])]
      }), slots.default && createVNode("div", {
        "class": "v-progress-linear__content"
      }, [slots.default({
        value: normalizedValue.value,
        buffer: normalizedBuffer.value
      })])]
    }));
    return {};
  }
});
const makeLoaderProps = propsFactory({
  loading: [Boolean, String]
}, "loader");
function useLoader(props) {
  let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  const loaderClasses = computed(() => ({
    [`${name}--loading`]: props.loading
  }));
  return {
    loaderClasses
  };
}
function LoaderSlot(props, _ref) {
  var _a2;
  let {
    slots
  } = _ref;
  return createVNode("div", {
    "class": `${props.name}__loader`
  }, [((_a2 = slots.default) == null ? void 0 : _a2.call(slots, {
    color: props.color,
    isActive: props.active
  })) || createVNode(VProgressLinear, {
    "absolute": props.absolute,
    "active": props.active,
    "color": props.color,
    "height": "2",
    "indeterminate": true
  }, null)]);
}
const positionValues = ["static", "relative", "fixed", "absolute", "sticky"];
const makePositionProps = propsFactory({
  position: {
    type: String,
    validator: (
      /* istanbul ignore next */
      (v) => positionValues.includes(v)
    )
  }
}, "position");
function usePosition(props) {
  let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  const positionClasses = computed(() => {
    return props.position ? `${name}--${props.position}` : void 0;
  });
  return {
    positionClasses
  };
}
function useRoute() {
  const vm = getCurrentInstance("useRoute");
  return computed(() => {
    var _a2;
    return (_a2 = vm == null ? void 0 : vm.proxy) == null ? void 0 : _a2.$route;
  });
}
function useRouter() {
  var _a2, _b2;
  return (_b2 = (_a2 = getCurrentInstance("useRouter")) == null ? void 0 : _a2.proxy) == null ? void 0 : _b2.$router;
}
function useLink(props, attrs) {
  const RouterLink = resolveDynamicComponent("RouterLink");
  const isLink = computed(() => !!(props.href || props.to));
  const isClickable = computed(() => {
    return (isLink == null ? void 0 : isLink.value) || hasEvent(attrs, "click") || hasEvent(props, "click");
  });
  if (typeof RouterLink === "string") {
    return {
      isLink,
      isClickable,
      href: toRef(props, "href")
    };
  }
  const link = props.to ? RouterLink.useLink(props) : void 0;
  const route = useRoute();
  return {
    isLink,
    isClickable,
    route: link == null ? void 0 : link.route,
    navigate: link == null ? void 0 : link.navigate,
    isActive: link && computed(() => {
      var _a2, _b2, _c;
      if (!props.exact)
        return (_a2 = link.isActive) == null ? void 0 : _a2.value;
      if (!route.value)
        return (_b2 = link.isExactActive) == null ? void 0 : _b2.value;
      return ((_c = link.isExactActive) == null ? void 0 : _c.value) && deepEqual(link.route.value.query, route.value.query);
    }),
    href: computed(() => props.to ? link == null ? void 0 : link.route.value.href : props.href)
  };
}
const makeRouterProps = propsFactory({
  href: String,
  replace: Boolean,
  to: [String, Object],
  exact: Boolean
}, "router");
function useSelectLink(link, select) {
  watch(() => {
    var _a2;
    return (_a2 = link.isActive) == null ? void 0 : _a2.value;
  }, (isActive) => {
    if (link.isLink.value && isActive && select) {
      nextTick(() => {
        select(true);
      });
    }
  }, {
    immediate: true
  });
}
const makeVBtnProps = propsFactory({
  active: {
    type: Boolean,
    default: void 0
  },
  symbol: {
    type: null,
    default: VBtnToggleSymbol
  },
  flat: Boolean,
  icon: [Boolean, String, Function, Object],
  prependIcon: IconValue,
  appendIcon: IconValue,
  block: Boolean,
  slim: Boolean,
  stacked: Boolean,
  ripple: {
    type: [Boolean, Object],
    default: true
  },
  text: String,
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeGroupItemProps(),
  ...makeLoaderProps(),
  ...makeLocationProps(),
  ...makePositionProps(),
  ...makeRoundedProps(),
  ...makeRouterProps(),
  ...makeSizeProps(),
  ...makeTagProps({
    tag: "button"
  }),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: "elevated"
  })
}, "VBtn");
const VBtn = genericComponent()({
  name: "VBtn",
  directives: {
    Ripple
  },
  props: makeVBtnProps(),
  emits: {
    "group:selected": (val) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      borderClasses
    } = useBorder(props);
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(props);
    const {
      densityClasses
    } = useDensity(props);
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      loaderClasses
    } = useLoader(props);
    const {
      locationStyles
    } = useLocation(props);
    const {
      positionClasses
    } = usePosition(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      sizeClasses,
      sizeStyles
    } = useSize(props);
    const group = useGroupItem(props, props.symbol, false);
    const link = useLink(props, attrs);
    const isActive = computed(() => {
      var _a2;
      if (props.active !== void 0) {
        return props.active;
      }
      if (link.isLink.value) {
        return (_a2 = link.isActive) == null ? void 0 : _a2.value;
      }
      return group == null ? void 0 : group.isSelected.value;
    });
    const isDisabled = computed(() => (group == null ? void 0 : group.disabled.value) || props.disabled);
    const isElevated = computed(() => {
      return props.variant === "elevated" && !(props.disabled || props.flat || props.border);
    });
    const valueAttr = computed(() => {
      if (props.value === void 0 || typeof props.value === "symbol")
        return void 0;
      return Object(props.value) === props.value ? JSON.stringify(props.value, null, 0) : props.value;
    });
    function onClick(e) {
      var _a2;
      if (isDisabled.value || link.isLink.value && (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0 || attrs.target === "_blank"))
        return;
      (_a2 = link.navigate) == null ? void 0 : _a2.call(link, e);
      group == null ? void 0 : group.toggle();
    }
    useSelectLink(link, group == null ? void 0 : group.select);
    useRender(() => {
      var _a2, _b2;
      const Tag = link.isLink.value ? "a" : props.tag;
      const hasPrepend = !!(props.prependIcon || slots.prepend);
      const hasAppend = !!(props.appendIcon || slots.append);
      const hasIcon = !!(props.icon && props.icon !== true);
      const hasColor = (group == null ? void 0 : group.isSelected.value) && (!link.isLink.value || ((_a2 = link.isActive) == null ? void 0 : _a2.value)) || !group || ((_b2 = link.isActive) == null ? void 0 : _b2.value);
      return withDirectives(createVNode(Tag, {
        "type": Tag === "a" ? void 0 : "button",
        "class": ["v-btn", group == null ? void 0 : group.selectedClass.value, {
          "v-btn--active": isActive.value,
          "v-btn--block": props.block,
          "v-btn--disabled": isDisabled.value,
          "v-btn--elevated": isElevated.value,
          "v-btn--flat": props.flat,
          "v-btn--icon": !!props.icon,
          "v-btn--loading": props.loading,
          "v-btn--slim": props.slim,
          "v-btn--stacked": props.stacked
        }, themeClasses.value, borderClasses.value, hasColor ? colorClasses.value : void 0, densityClasses.value, elevationClasses.value, loaderClasses.value, positionClasses.value, roundedClasses.value, sizeClasses.value, variantClasses.value, props.class],
        "style": [hasColor ? colorStyles.value : void 0, dimensionStyles.value, locationStyles.value, sizeStyles.value, props.style],
        "disabled": isDisabled.value || void 0,
        "href": link.href.value,
        "onClick": onClick,
        "value": valueAttr.value
      }, {
        default: () => {
          var _a3;
          return [genOverlays(true, "v-btn"), !props.icon && hasPrepend && createVNode("span", {
            "key": "prepend",
            "class": "v-btn__prepend"
          }, [!slots.prepend ? createVNode(VIcon, {
            "key": "prepend-icon",
            "icon": props.prependIcon
          }, null) : createVNode(VDefaultsProvider, {
            "key": "prepend-defaults",
            "disabled": !props.prependIcon,
            "defaults": {
              VIcon: {
                icon: props.prependIcon
              }
            }
          }, slots.prepend)]), createVNode("span", {
            "class": "v-btn__content",
            "data-no-activator": ""
          }, [!slots.default && hasIcon ? createVNode(VIcon, {
            "key": "content-icon",
            "icon": props.icon
          }, null) : createVNode(VDefaultsProvider, {
            "key": "content-defaults",
            "disabled": !hasIcon,
            "defaults": {
              VIcon: {
                icon: props.icon
              }
            }
          }, {
            default: () => {
              var _a4;
              return [((_a4 = slots.default) == null ? void 0 : _a4.call(slots)) ?? props.text];
            }
          })]), !props.icon && hasAppend && createVNode("span", {
            "key": "append",
            "class": "v-btn__append"
          }, [!slots.append ? createVNode(VIcon, {
            "key": "append-icon",
            "icon": props.appendIcon
          }, null) : createVNode(VDefaultsProvider, {
            "key": "append-defaults",
            "disabled": !props.appendIcon,
            "defaults": {
              VIcon: {
                icon: props.appendIcon
              }
            }
          }, slots.append)]), !!props.loading && createVNode("span", {
            "key": "loader",
            "class": "v-btn__loader"
          }, [((_a3 = slots.loader) == null ? void 0 : _a3.call(slots)) ?? createVNode(VProgressCircular, {
            "color": typeof props.loading === "boolean" ? void 0 : props.loading,
            "indeterminate": true,
            "size": "23",
            "width": "2"
          }, null)])];
        }
      }), [[resolveDirective("ripple"), !isDisabled.value && props.ripple, null]]);
    });
    return {};
  }
});
const makeVConfirmEditProps = propsFactory({
  modelValue: null,
  color: String,
  cancelText: {
    type: String,
    default: "$vuetify.confirmEdit.cancel"
  },
  okText: {
    type: String,
    default: "$vuetify.confirmEdit.ok"
  }
}, "VConfirmEdit");
const VConfirmEdit = genericComponent()({
  name: "VConfirmEdit",
  props: makeVConfirmEditProps(),
  emits: {
    cancel: () => true,
    save: (value) => true,
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const model = useProxiedModel(props, "modelValue");
    const internalModel = ref();
    watchEffect(() => {
      internalModel.value = structuredClone(toRaw(model.value));
    });
    const {
      t
    } = useLocale();
    const isPristine = computed(() => {
      return deepEqual(model.value, internalModel.value);
    });
    function save() {
      model.value = internalModel.value;
      emit("save", internalModel.value);
    }
    function cancel() {
      internalModel.value = structuredClone(toRaw(model.value));
      emit("cancel");
    }
    let actionsUsed = false;
    useRender(() => {
      var _a2;
      const actions = createVNode(Fragment, null, [createVNode(VBtn, {
        "disabled": isPristine.value,
        "variant": "text",
        "color": props.color,
        "onClick": cancel,
        "text": t(props.cancelText)
      }, null), createVNode(VBtn, {
        "disabled": isPristine.value,
        "variant": "text",
        "color": props.color,
        "onClick": save,
        "text": t(props.okText)
      }, null)]);
      return createVNode(Fragment, null, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots, {
        model: internalModel,
        get actions() {
          actionsUsed = true;
          return actions;
        }
      }), !actionsUsed && actions]);
    });
  }
});
const makeVSheetProps = propsFactory({
  color: String,
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeLocationProps(),
  ...makePositionProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps()
}, "VSheet");
const VSheet = genericComponent()({
  name: "VSheet",
  props: makeVSheetProps(),
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
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      locationStyles
    } = useLocation(props);
    const {
      positionClasses
    } = usePosition(props);
    const {
      roundedClasses
    } = useRounded(props);
    useRender(() => createVNode(props.tag, {
      "class": ["v-sheet", themeClasses.value, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value, props.class],
      "style": [backgroundColorStyles.value, dimensionStyles.value, locationStyles.value, props.style]
    }, slots));
    return {};
  }
});
const makeVCalendarIntervalEventProps = propsFactory({
  allDay: Boolean,
  interval: Object,
  intervalDivisions: {
    type: Number,
    required: true
  },
  intervalDuration: {
    type: Number,
    required: true
  },
  intervalHeight: {
    type: Number,
    required: true
  },
  event: Object
}, "VCalendarIntervalEvent");
const VCalendarIntervalEvent = genericComponent()({
  name: "VCalendarIntervalEvent",
  props: makeVCalendarIntervalEventProps(),
  setup(props) {
    const adapter = useDate();
    const calcHeight = () => {
      var _a2, _b2, _c, _d;
      if (!((_a2 = props.event) == null ? void 0 : _a2.first) && !((_b2 = props.event) == null ? void 0 : _b2.last) || adapter.isEqual((_c = props.event) == null ? void 0 : _c.start, (_d = props.interval) == null ? void 0 : _d.start)) {
        return {
          height: "100%",
          margin: convertToUnit(0)
        };
      } else {
        const {
          height,
          margin
        } = Array.from({
          length: props.intervalDivisions
        }, (x) => x * (props.intervalDuration / props.intervalDivisions)).reduce((total, div, index) => {
          var _a3, _b3;
          if (adapter.isBefore(adapter.addMinutes((_a3 = props.interval) == null ? void 0 : _a3.start, div), (_b3 = props.event) == null ? void 0 : _b3.start)) {
            return {
              height: convertToUnit(props.intervalHeight / props.intervalDivisions * index),
              margin: convertToUnit(props.intervalHeight / props.intervalDivisions * index)
            };
          }
          return {
            height: total.height,
            margin: total.margin
          };
        }, {
          height: "",
          margin: ""
        });
        return {
          height,
          margin
        };
      }
    };
    useRender(() => {
      var _a2, _b2, _c, _d, _e;
      return createVNode(VSheet, {
        "height": calcHeight().height,
        "density": "comfortable",
        "style": `width: 100%; margin-top: ${calcHeight().margin}`,
        "class": "align-center pa-1",
        "color": ((_a2 = props.event) == null ? void 0 : _a2.color) ?? void 0,
        "rounded": ((_b2 = props.event) == null ? void 0 : _b2.first) && ((_c = props.event) == null ? void 0 : _c.last) ? true : ((_d = props.event) == null ? void 0 : _d.first) ? "t" : ((_e = props.event) == null ? void 0 : _e.last) ? "b" : false
      }, {
        default: () => {
          var _a3, _b3;
          return [((_a3 = props.event) == null ? void 0 : _a3.first) ? (_b3 = props.event) == null ? void 0 : _b3.title : ""];
        }
      });
    });
    return {};
  }
});
const makeVCalendarIntervalProps = propsFactory({
  day: {
    type: Object,
    default: () => ({})
  },
  dayIndex: Number,
  events: Array,
  intervalDivisions: {
    type: Number,
    default: 2
  },
  intervalDuration: {
    type: Number,
    default: 60
  },
  intervalHeight: {
    type: Number,
    default: 48
  },
  intervalFormat: {
    type: [String, Function],
    default: "fullTime12h"
  },
  intervalStart: {
    type: Number,
    default: 0
  }
}, "VCalendarInterval");
const VCalendarInterval = genericComponent()({
  name: "VCalendarInterval",
  props: {
    index: {
      type: Number,
      required: true
    },
    ...makeVCalendarIntervalProps()
  },
  setup(props, _ref) {
    const adapter = useDate();
    const interval = computed(() => {
      const start = adapter.addMinutes(adapter.startOfDay(props.day.date), props.intervalDuration * (props.index + props.intervalStart));
      const end = adapter.addMinutes(adapter.startOfDay(props.day.date), props.intervalDuration * (props.index + props.intervalStart + 1) - 1);
      return {
        ...props.day,
        label: adapter.format(start, "fullTime24h"),
        start,
        end,
        events: props.events ? props.events.filter((e) => !e.allDay && (adapter.isEqual(start, e.start) || adapter.isWithinRange(e.start, [start, end]) || adapter.isWithinRange(start, [e.start, e.end]) || adapter.isEqual(end, e.end))).map((e) => {
          return {
            ...e,
            first: adapter.isEqual(start, e.start) || adapter.isWithinRange(e.start, [start, end]),
            last: adapter.isEqual(end, e.end) || adapter.isWithinRange(e.end, [start, end])
          };
        }) : []
      };
    });
    useRender(() => {
      var _a2, _b2;
      return props.dayIndex === 0 ? createVNode("div", {
        "class": "v-calendar-day__row-with-label",
        "style": `height: ${convertToUnit(props.intervalHeight)}`
      }, [createVNode("div", {
        "class": "v-calendar-day__row-label"
      }, [createVNode("slot", {
        "name": "intervalFormat",
        "interval": interval.value
      }, [props.index ? props.intervalFormat ? typeof props.intervalFormat === "string" ? adapter.format(interval.value.start, "hours12h") : props.intervalFormat(interval.value) : interval.value.label : ""])]), createVNode("div", {
        "class": "v-calendar-day__row-hairline"
      }, null), createVNode("div", {
        "class": ["v-calendar-day__row-content", interval.value.events.some((e) => !e.last) ? "v-calendar-day__row-content-through" : ""]
      }, [createVNode("slot", {
        "name": "intervalBody",
        "interval": interval.value
      }, [(_a2 = interval.value.events) == null ? void 0 : _a2.map((event) => createVNode(VCalendarIntervalEvent, {
        "event": event,
        "interval": interval.value,
        "intervalDivisions": props.intervalDivisions,
        "intervalDuration": props.intervalDuration,
        "intervalHeight": props.intervalHeight
      }, null))])])]) : createVNode("div", {
        "class": "v-calendar-day__row-without-label",
        "style": `height: ${convertToUnit(props.intervalHeight)}`
      }, [createVNode("div", {
        "class": ["v-calendar-day__row-content", interval.value.events.some((e) => !e.last) ? "v-calendar-day__row-content-through" : ""]
      }, [createVNode("slot", {
        "name": "intervalBody",
        "interval": interval.value
      }, [(_b2 = interval.value.events) == null ? void 0 : _b2.filter((event) => !event.allDay).map((event) => createVNode(VCalendarIntervalEvent, {
        "event": event,
        "interval": interval.value,
        "intervalDivisions": props.intervalDivisions,
        "intervalDuration": props.intervalDuration,
        "intervalHeight": props.intervalHeight
      }, null))])])]);
    });
    return {
      interval
    };
  }
});
const makeVCalendarDayProps = propsFactory({
  hideDayHeader: Boolean,
  intervals: {
    type: Number,
    default: 24
  },
  ...makeVCalendarIntervalProps()
}, "VCalendarDay");
const VCalendarDay = genericComponent()({
  name: "VCalendarDay",
  props: makeVCalendarDayProps(),
  setup(props) {
    const adapter = useDate();
    const intervals = computed(() => [...Array.from({
      length: props.intervals
    }, (v, i) => i).filter((int, index) => props.intervalDuration * (index + props.intervalStart) < 1440)]);
    useRender(() => {
      const calendarIntervalProps = VCalendarInterval.filterProps(props);
      return createVNode("div", {
        "class": "v-calendar-day__container"
      }, [!props.hideDayHeader && createVNode("div", {
        "key": "calender-week-name",
        "class": "v-calendar-weekly__head-weekday"
      }, [adapter.format(props.day.date, "weekdayShort"), createVNode("div", null, [createVNode(VBtn, {
        "icon": true,
        "text": adapter.format(props.day.date, "dayOfMonth"),
        "variant": "text"
      }, null)])]), intervals.value.map((_, index) => createVNode(VCalendarInterval, mergeProps({
        "index": index
      }, calendarIntervalProps), null))]);
    });
    return {
      intervals
    };
  }
});
const makeVCalendarHeaderProps = propsFactory({
  nextIcon: {
    type: String,
    default: "$next"
  },
  prevIcon: {
    type: String,
    default: "$prev"
  },
  title: String,
  text: {
    type: String,
    default: "$vuetify.calendar.today"
  },
  viewMode: {
    type: String,
    default: "month"
  }
}, "VCalendarHeader");
const VCalendarHeader = genericComponent()({
  name: "VCalendarHeader",
  props: makeVCalendarHeaderProps(),
  emits: {
    "click:next": () => true,
    "click:prev": () => true,
    "click:toToday": () => true
  },
  setup(props, _ref) {
    let {
      emit
    } = _ref;
    const {
      t
    } = useLocale();
    function prev() {
      emit("click:prev");
    }
    function next() {
      emit("click:next");
    }
    function toToday() {
      emit("click:toToday");
    }
    useRender(() => createVNode("div", {
      "class": "v-calendar-header"
    }, [props.text && createVNode(VBtn, {
      "key": "today",
      "class": "v-calendar-header__today",
      "text": t(props.text),
      "variant": "outlined",
      "onClick": toToday
    }, null), createVNode(VBtn, {
      "density": "comfortable",
      "icon": props.prevIcon,
      "variant": "text",
      "onClick": prev
    }, null), createVNode(VBtn, {
      "density": "comfortable",
      "icon": props.nextIcon,
      "variant": "text",
      "onClick": next
    }, null), createVNode("div", {
      "class": "v-calendar-header__title"
    }, [props.title])]));
    return {};
  }
});
const makeTransitionProps$1 = propsFactory({
  transition: {
    type: [Boolean, String, Object],
    default: "fade-transition",
    validator: (val) => val !== true
  }
}, "transition");
const MaybeTransition = (props, _ref) => {
  let {
    slots
  } = _ref;
  const {
    transition,
    disabled,
    ...rest
  } = props;
  const {
    component = Transition,
    ...customProps
  } = typeof transition === "object" ? transition : {};
  return h(component, mergeProps(typeof transition === "string" ? {
    name: disabled ? "" : transition
  } : customProps, rest, {
    disabled
  }), slots);
};
const makeVBadgeProps = propsFactory({
  bordered: Boolean,
  color: String,
  content: [Number, String],
  dot: Boolean,
  floating: Boolean,
  icon: IconValue,
  inline: Boolean,
  label: {
    type: String,
    default: "$vuetify.badge"
  },
  max: [Number, String],
  modelValue: {
    type: Boolean,
    default: true
  },
  offsetX: [Number, String],
  offsetY: [Number, String],
  textColor: String,
  ...makeComponentProps(),
  ...makeLocationProps({
    location: "top end"
  }),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeTransitionProps$1({
    transition: "scale-rotate-transition"
  })
}, "VBadge");
const VBadge = genericComponent()({
  name: "VBadge",
  inheritAttrs: false,
  props: makeVBadgeProps(),
  setup(props, ctx) {
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "color"));
    const {
      roundedClasses
    } = useRounded(props);
    const {
      t
    } = useLocale();
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(toRef(props, "textColor"));
    const {
      themeClasses
    } = useTheme();
    const {
      locationStyles
    } = useLocation(props, true, (side) => {
      const base = props.floating ? props.dot ? 2 : 4 : props.dot ? 8 : 12;
      return base + (["top", "bottom"].includes(side) ? +(props.offsetY ?? 0) : ["left", "right"].includes(side) ? +(props.offsetX ?? 0) : 0);
    });
    useRender(() => {
      const value = Number(props.content);
      const content = !props.max || isNaN(value) ? props.content : value <= +props.max ? value : `${props.max}+`;
      const [badgeAttrs, attrs] = pickWithRest(ctx.attrs, ["aria-atomic", "aria-label", "aria-live", "role", "title"]);
      return createVNode(props.tag, mergeProps({
        "class": ["v-badge", {
          "v-badge--bordered": props.bordered,
          "v-badge--dot": props.dot,
          "v-badge--floating": props.floating,
          "v-badge--inline": props.inline
        }, props.class]
      }, attrs, {
        "style": props.style
      }), {
        default: () => {
          var _a2, _b2;
          return [createVNode("div", {
            "class": "v-badge__wrapper"
          }, [(_b2 = (_a2 = ctx.slots).default) == null ? void 0 : _b2.call(_a2), createVNode(MaybeTransition, {
            "transition": props.transition
          }, {
            default: () => {
              var _a3, _b3;
              return [withDirectives(createVNode("span", mergeProps({
                "class": ["v-badge__badge", themeClasses.value, backgroundColorClasses.value, roundedClasses.value, textColorClasses.value],
                "style": [backgroundColorStyles.value, textColorStyles.value, props.inline ? {} : locationStyles.value],
                "aria-atomic": "true",
                "aria-label": t(props.label, value),
                "aria-live": "polite",
                "role": "status"
              }, badgeAttrs), [props.dot ? void 0 : ctx.slots.badge ? (_b3 = (_a3 = ctx.slots).badge) == null ? void 0 : _b3.call(_a3) : props.icon ? createVNode(VIcon, {
                "icon": props.icon
              }, null) : content]), [[vShow, props.modelValue]])];
            }
          })])];
        }
      });
    });
    return {};
  }
});
const makeTransitionProps = propsFactory({
  disabled: Boolean,
  group: Boolean,
  hideOnLeave: Boolean,
  leaveAbsolute: Boolean,
  mode: String,
  origin: String
}, "transition");
function createCssTransition(name, origin, mode) {
  return genericComponent()({
    name,
    props: makeTransitionProps({
      mode,
      origin
    }),
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const functions = {
        onBeforeEnter(el) {
          if (props.origin) {
            el.style.transformOrigin = props.origin;
          }
        },
        onLeave(el) {
          if (props.leaveAbsolute) {
            const {
              offsetTop,
              offsetLeft,
              offsetWidth,
              offsetHeight
            } = el;
            el._transitionInitialStyles = {
              position: el.style.position,
              top: el.style.top,
              left: el.style.left,
              width: el.style.width,
              height: el.style.height
            };
            el.style.position = "absolute";
            el.style.top = `${offsetTop}px`;
            el.style.left = `${offsetLeft}px`;
            el.style.width = `${offsetWidth}px`;
            el.style.height = `${offsetHeight}px`;
          }
          if (props.hideOnLeave) {
            el.style.setProperty("display", "none", "important");
          }
        },
        onAfterLeave(el) {
          if (props.leaveAbsolute && (el == null ? void 0 : el._transitionInitialStyles)) {
            const {
              position,
              top,
              left,
              width,
              height
            } = el._transitionInitialStyles;
            delete el._transitionInitialStyles;
            el.style.position = position || "";
            el.style.top = top || "";
            el.style.left = left || "";
            el.style.width = width || "";
            el.style.height = height || "";
          }
        }
      };
      return () => {
        const tag = props.group ? TransitionGroup : Transition;
        return h(tag, {
          name: props.disabled ? "" : name,
          css: !props.disabled,
          ...props.group ? void 0 : {
            mode: props.mode
          },
          ...props.disabled ? {} : functions
        }, slots.default);
      };
    }
  });
}
function createJavascriptTransition(name, functions) {
  let mode = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "in-out";
  return genericComponent()({
    name,
    props: {
      mode: {
        type: String,
        default: mode
      },
      disabled: Boolean
    },
    setup(props, _ref2) {
      let {
        slots
      } = _ref2;
      return () => {
        return h(Transition, {
          name: props.disabled ? "" : name,
          css: !props.disabled,
          // mode: props.mode, // TODO: vuejs/vue-next#3104
          ...props.disabled ? {} : functions
        }, slots.default);
      };
    }
  });
}
function ExpandTransitionGenerator() {
  let expandedParentClass = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  let x = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  const sizeProperty = x ? "width" : "height";
  const offsetProperty = camelize(`offset-${sizeProperty}`);
  return {
    onBeforeEnter(el) {
      el._parent = el.parentNode;
      el._initialStyle = {
        transition: el.style.transition,
        overflow: el.style.overflow,
        [sizeProperty]: el.style[sizeProperty]
      };
    },
    onEnter(el) {
      const initialStyle = el._initialStyle;
      el.style.setProperty("transition", "none", "important");
      el.style.overflow = "hidden";
      const offset = `${el[offsetProperty]}px`;
      el.style[sizeProperty] = "0";
      void el.offsetHeight;
      el.style.transition = initialStyle.transition;
      if (expandedParentClass && el._parent) {
        el._parent.classList.add(expandedParentClass);
      }
      requestAnimationFrame(() => {
        el.style[sizeProperty] = offset;
      });
    },
    onAfterEnter: resetStyles,
    onEnterCancelled: resetStyles,
    onLeave(el) {
      el._initialStyle = {
        transition: "",
        overflow: el.style.overflow,
        [sizeProperty]: el.style[sizeProperty]
      };
      el.style.overflow = "hidden";
      el.style[sizeProperty] = `${el[offsetProperty]}px`;
      void el.offsetHeight;
      requestAnimationFrame(() => el.style[sizeProperty] = "0");
    },
    onAfterLeave,
    onLeaveCancelled: onAfterLeave
  };
  function onAfterLeave(el) {
    if (expandedParentClass && el._parent) {
      el._parent.classList.remove(expandedParentClass);
    }
    resetStyles(el);
  }
  function resetStyles(el) {
    const size = el._initialStyle[sizeProperty];
    el.style.overflow = el._initialStyle.overflow;
    if (size != null)
      el.style[sizeProperty] = size;
    delete el._initialStyle;
  }
}
createCssTransition("fab-transition", "center center", "out-in");
createCssTransition("dialog-bottom-transition");
createCssTransition("dialog-top-transition");
const VFadeTransition = createCssTransition("fade-transition");
const VScaleTransition = createCssTransition("scale-transition");
createCssTransition("scroll-x-transition");
createCssTransition("scroll-x-reverse-transition");
createCssTransition("scroll-y-transition");
createCssTransition("scroll-y-reverse-transition");
createCssTransition("slide-x-transition");
createCssTransition("slide-x-reverse-transition");
const VSlideYTransition = createCssTransition("slide-y-transition");
createCssTransition("slide-y-reverse-transition");
const VExpandTransition = createJavascriptTransition("expand-transition", ExpandTransitionGenerator());
const VExpandXTransition = createJavascriptTransition("expand-x-transition", ExpandTransitionGenerator("", true));
function useAspectStyles(props) {
  return {
    aspectStyles: computed(() => {
      const ratio = Number(props.aspectRatio);
      return ratio ? {
        paddingBottom: String(1 / ratio * 100) + "%"
      } : void 0;
    })
  };
}
const makeVResponsiveProps = propsFactory({
  aspectRatio: [String, Number],
  contentClass: String,
  inline: Boolean,
  ...makeComponentProps(),
  ...makeDimensionProps()
}, "VResponsive");
const VResponsive = genericComponent()({
  name: "VResponsive",
  props: makeVResponsiveProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      aspectStyles
    } = useAspectStyles(props);
    const {
      dimensionStyles
    } = useDimension(props);
    useRender(() => {
      var _a2;
      return createVNode("div", {
        "class": ["v-responsive", {
          "v-responsive--inline": props.inline
        }, props.class],
        "style": [dimensionStyles.value, props.style]
      }, [createVNode("div", {
        "class": "v-responsive__sizer",
        "style": aspectStyles.value
      }, null), (_a2 = slots.additional) == null ? void 0 : _a2.call(slots), slots.default && createVNode("div", {
        "class": ["v-responsive__content", props.contentClass]
      }, [slots.default()])]);
    });
    return {};
  }
});
const makeVImgProps = propsFactory({
  alt: String,
  cover: Boolean,
  draggable: {
    type: [Boolean, String],
    default: void 0
  },
  eager: Boolean,
  gradient: String,
  lazySrc: String,
  options: {
    type: Object,
    // For more information on types, navigate to:
    // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    default: () => ({
      root: void 0,
      rootMargin: void 0,
      threshold: void 0
    })
  },
  sizes: String,
  src: {
    type: [String, Object],
    default: ""
  },
  crossorigin: String,
  referrerpolicy: String,
  srcset: String,
  position: String,
  ...makeVResponsiveProps(),
  ...makeComponentProps(),
  ...makeTransitionProps$1()
}, "VImg");
const VImg = genericComponent()({
  name: "VImg",
  directives: {
    intersect: Intersect$1
  },
  props: makeVImgProps(),
  emits: {
    loadstart: (value) => true,
    load: (value) => true,
    error: (value) => true
  },
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const vm = getCurrentInstance("VImg");
    const currentSrc = shallowRef("");
    const image = ref();
    const state = shallowRef(props.eager ? "loading" : "idle");
    const naturalWidth = shallowRef();
    const naturalHeight = shallowRef();
    const normalisedSrc = computed(() => {
      return props.src && typeof props.src === "object" ? {
        src: props.src.src,
        srcset: props.srcset || props.src.srcset,
        lazySrc: props.lazySrc || props.src.lazySrc,
        aspect: Number(props.aspectRatio || props.src.aspect || 0)
      } : {
        src: props.src,
        srcset: props.srcset,
        lazySrc: props.lazySrc,
        aspect: Number(props.aspectRatio || 0)
      };
    });
    const aspectRatio = computed(() => {
      return normalisedSrc.value.aspect || naturalWidth.value / naturalHeight.value || 0;
    });
    watch(() => props.src, () => {
      init(state.value !== "idle");
    });
    watch(aspectRatio, (val, oldVal) => {
      if (!val && oldVal && image.value) {
        pollForSize(image.value);
      }
    });
    function init(isIntersecting) {
      if (props.eager && isIntersecting)
        return;
      state.value = "loading";
      if (normalisedSrc.value.lazySrc) {
        const lazyImg = new Image();
        lazyImg.src = normalisedSrc.value.lazySrc;
        pollForSize(lazyImg, null);
      }
      if (!normalisedSrc.value.src)
        return;
      nextTick(() => {
        var _a2;
        emit("loadstart", ((_a2 = image.value) == null ? void 0 : _a2.currentSrc) || normalisedSrc.value.src);
        setTimeout(() => {
          var _a3;
          if (vm.isUnmounted)
            return;
          if ((_a3 = image.value) == null ? void 0 : _a3.complete) {
            if (!image.value.naturalWidth) {
              onError();
            }
            if (state.value === "error")
              return;
            if (!aspectRatio.value)
              pollForSize(image.value, null);
            if (state.value === "loading")
              onLoad();
          } else {
            if (!aspectRatio.value)
              pollForSize(image.value);
            getSrc();
          }
        });
      });
    }
    function onLoad() {
      var _a2;
      if (vm.isUnmounted)
        return;
      getSrc();
      pollForSize(image.value);
      state.value = "loaded";
      emit("load", ((_a2 = image.value) == null ? void 0 : _a2.currentSrc) || normalisedSrc.value.src);
    }
    function onError() {
      var _a2;
      if (vm.isUnmounted)
        return;
      state.value = "error";
      emit("error", ((_a2 = image.value) == null ? void 0 : _a2.currentSrc) || normalisedSrc.value.src);
    }
    function getSrc() {
      const img = image.value;
      if (img)
        currentSrc.value = img.currentSrc || img.src;
    }
    let timer = -1;
    function pollForSize(img) {
      let timeout = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 100;
      const poll = () => {
        clearTimeout(timer);
        if (vm.isUnmounted)
          return;
        const {
          naturalHeight: imgHeight,
          naturalWidth: imgWidth
        } = img;
        if (imgHeight || imgWidth) {
          naturalWidth.value = imgWidth;
          naturalHeight.value = imgHeight;
        } else if (!img.complete && state.value === "loading" && timeout != null) {
          timer = (void 0).setTimeout(poll, timeout);
        } else if (img.currentSrc.endsWith(".svg") || img.currentSrc.startsWith("data:image/svg+xml")) {
          naturalWidth.value = 1;
          naturalHeight.value = 1;
        }
      };
      poll();
    }
    const containClasses = computed(() => ({
      "v-img__img--cover": props.cover,
      "v-img__img--contain": !props.cover
    }));
    const __image = () => {
      var _a2;
      if (!normalisedSrc.value.src || state.value === "idle")
        return null;
      const img = createVNode("img", {
        "class": ["v-img__img", containClasses.value],
        "style": {
          objectPosition: props.position
        },
        "src": normalisedSrc.value.src,
        "srcset": normalisedSrc.value.srcset,
        "alt": props.alt,
        "crossorigin": props.crossorigin,
        "referrerpolicy": props.referrerpolicy,
        "draggable": props.draggable,
        "sizes": props.sizes,
        "ref": image,
        "onLoad": onLoad,
        "onError": onError
      }, null);
      const sources = (_a2 = slots.sources) == null ? void 0 : _a2.call(slots);
      return createVNode(MaybeTransition, {
        "transition": props.transition,
        "appear": true
      }, {
        default: () => [withDirectives(sources ? createVNode("picture", {
          "class": "v-img__picture"
        }, [sources, img]) : img, [[vShow, state.value === "loaded"]])]
      });
    };
    const __preloadImage = () => createVNode(MaybeTransition, {
      "transition": props.transition
    }, {
      default: () => [normalisedSrc.value.lazySrc && state.value !== "loaded" && createVNode("img", {
        "class": ["v-img__img", "v-img__img--preload", containClasses.value],
        "style": {
          objectPosition: props.position
        },
        "src": normalisedSrc.value.lazySrc,
        "alt": props.alt,
        "crossorigin": props.crossorigin,
        "referrerpolicy": props.referrerpolicy,
        "draggable": props.draggable
      }, null)]
    });
    const __placeholder = () => {
      if (!slots.placeholder)
        return null;
      return createVNode(MaybeTransition, {
        "transition": props.transition,
        "appear": true
      }, {
        default: () => [(state.value === "loading" || state.value === "error" && !slots.error) && createVNode("div", {
          "class": "v-img__placeholder"
        }, [slots.placeholder()])]
      });
    };
    const __error = () => {
      if (!slots.error)
        return null;
      return createVNode(MaybeTransition, {
        "transition": props.transition,
        "appear": true
      }, {
        default: () => [state.value === "error" && createVNode("div", {
          "class": "v-img__error"
        }, [slots.error()])]
      });
    };
    const __gradient = () => {
      if (!props.gradient)
        return null;
      return createVNode("div", {
        "class": "v-img__gradient",
        "style": {
          backgroundImage: `linear-gradient(${props.gradient})`
        }
      }, null);
    };
    const isBooted = shallowRef(false);
    {
      const stop = watch(aspectRatio, (val) => {
        if (val) {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              isBooted.value = true;
            });
          });
          stop();
        }
      });
    }
    useRender(() => {
      const responsiveProps = VResponsive.filterProps(props);
      return withDirectives(createVNode(VResponsive, mergeProps({
        "class": ["v-img", {
          "v-img--booting": !isBooted.value
        }, props.class],
        "style": [{
          width: convertToUnit(props.width === "auto" ? naturalWidth.value : props.width)
        }, props.style]
      }, responsiveProps, {
        "aspectRatio": aspectRatio.value,
        "aria-label": props.alt,
        "role": props.alt ? "img" : void 0
      }), {
        additional: () => createVNode(Fragment, null, [createVNode(__image, null, null), createVNode(__preloadImage, null, null), createVNode(__gradient, null, null), createVNode(__placeholder, null, null), createVNode(__error, null, null)]),
        default: slots.default
      }), [[resolveDirective("intersect"), {
        handler: init,
        options: props.options
      }, null, {
        once: true
      }]]);
    });
    return {
      currentSrc,
      image,
      state,
      naturalWidth,
      naturalHeight
    };
  }
});
const makeVAvatarProps = propsFactory({
  start: Boolean,
  end: Boolean,
  icon: IconValue,
  image: String,
  text: String,
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeRoundedProps(),
  ...makeSizeProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: "flat"
  })
}, "VAvatar");
const VAvatar = genericComponent()({
  name: "VAvatar",
  props: makeVAvatarProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(props);
    const {
      densityClasses
    } = useDensity(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      sizeClasses,
      sizeStyles
    } = useSize(props);
    useRender(() => createVNode(props.tag, {
      "class": ["v-avatar", {
        "v-avatar--start": props.start,
        "v-avatar--end": props.end
      }, themeClasses.value, colorClasses.value, densityClasses.value, roundedClasses.value, sizeClasses.value, variantClasses.value, props.class],
      "style": [colorStyles.value, sizeStyles.value, props.style]
    }, {
      default: () => {
        var _a2;
        return [props.image ? createVNode(VImg, {
          "key": "image",
          "src": props.image,
          "alt": "",
          "cover": true
        }, null) : props.icon ? createVNode(VIcon, {
          "key": "icon",
          "icon": props.icon
        }, null) : ((_a2 = slots.default) == null ? void 0 : _a2.call(slots)) ?? props.text, genOverlays(false, "v-avatar")];
      }
    }));
    return {};
  }
});
const VChipGroupSymbol = Symbol.for("vuetify:v-chip-group");
const makeVChipGroupProps = propsFactory({
  column: Boolean,
  filter: Boolean,
  valueComparator: {
    type: Function,
    default: deepEqual
  },
  ...makeComponentProps(),
  ...makeGroupProps({
    selectedClass: "v-chip--selected"
  }),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: "tonal"
  })
}, "VChipGroup");
genericComponent()({
  name: "VChipGroup",
  props: makeVChipGroupProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      isSelected,
      select,
      next,
      prev,
      selected
    } = useGroup(props, VChipGroupSymbol);
    provideDefaults({
      VChip: {
        color: toRef(props, "color"),
        disabled: toRef(props, "disabled"),
        filter: toRef(props, "filter"),
        variant: toRef(props, "variant")
      }
    });
    useRender(() => createVNode(props.tag, {
      "class": ["v-chip-group", {
        "v-chip-group--column": props.column
      }, themeClasses.value, props.class],
      "style": props.style
    }, {
      default: () => {
        var _a2;
        return [(_a2 = slots.default) == null ? void 0 : _a2.call(slots, {
          isSelected,
          select,
          next,
          prev,
          selected: selected.value
        })];
      }
    }));
    return {};
  }
});
const makeVChipProps = propsFactory({
  activeClass: String,
  appendAvatar: String,
  appendIcon: IconValue,
  closable: Boolean,
  closeIcon: {
    type: IconValue,
    default: "$delete"
  },
  closeLabel: {
    type: String,
    default: "$vuetify.close"
  },
  draggable: Boolean,
  filter: Boolean,
  filterIcon: {
    type: String,
    default: "$complete"
  },
  label: Boolean,
  link: {
    type: Boolean,
    default: void 0
  },
  pill: Boolean,
  prependAvatar: String,
  prependIcon: IconValue,
  ripple: {
    type: [Boolean, Object],
    default: true
  },
  text: String,
  modelValue: {
    type: Boolean,
    default: true
  },
  onClick: EventProp(),
  onClickOnce: EventProp(),
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeElevationProps(),
  ...makeGroupItemProps(),
  ...makeRoundedProps(),
  ...makeRouterProps(),
  ...makeSizeProps(),
  ...makeTagProps({
    tag: "span"
  }),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: "tonal"
  })
}, "VChip");
const VChip = genericComponent()({
  name: "VChip",
  directives: {
    Ripple
  },
  props: makeVChipProps(),
  emits: {
    "click:close": (e) => true,
    "update:modelValue": (value) => true,
    "group:selected": (val) => true,
    click: (e) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const {
      borderClasses
    } = useBorder(props);
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(props);
    const {
      densityClasses
    } = useDensity(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      sizeClasses
    } = useSize(props);
    const {
      themeClasses
    } = provideTheme(props);
    const isActive = useProxiedModel(props, "modelValue");
    const group = useGroupItem(props, VChipGroupSymbol, false);
    const link = useLink(props, attrs);
    const isLink = computed(() => props.link !== false && link.isLink.value);
    const isClickable = computed(() => !props.disabled && props.link !== false && (!!group || props.link || link.isClickable.value));
    const closeProps = computed(() => ({
      "aria-label": t(props.closeLabel),
      onClick(e) {
        e.stopPropagation();
        isActive.value = false;
        emit("click:close", e);
      }
    }));
    function onClick(e) {
      var _a2;
      emit("click", e);
      if (!isClickable.value)
        return;
      (_a2 = link.navigate) == null ? void 0 : _a2.call(link, e);
      group == null ? void 0 : group.toggle();
    }
    function onKeyDown(e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick(e);
      }
    }
    return () => {
      const Tag = link.isLink.value ? "a" : props.tag;
      const hasAppendMedia = !!(props.appendIcon || props.appendAvatar);
      const hasAppend = !!(hasAppendMedia || slots.append);
      const hasClose = !!(slots.close || props.closable);
      const hasFilter = !!(slots.filter || props.filter) && group;
      const hasPrependMedia = !!(props.prependIcon || props.prependAvatar);
      const hasPrepend = !!(hasPrependMedia || slots.prepend);
      const hasColor = !group || group.isSelected.value;
      return isActive.value && withDirectives(createVNode(Tag, {
        "class": ["v-chip", {
          "v-chip--disabled": props.disabled,
          "v-chip--label": props.label,
          "v-chip--link": isClickable.value,
          "v-chip--filter": hasFilter,
          "v-chip--pill": props.pill
        }, themeClasses.value, borderClasses.value, hasColor ? colorClasses.value : void 0, densityClasses.value, elevationClasses.value, roundedClasses.value, sizeClasses.value, variantClasses.value, group == null ? void 0 : group.selectedClass.value, props.class],
        "style": [hasColor ? colorStyles.value : void 0, props.style],
        "disabled": props.disabled || void 0,
        "draggable": props.draggable,
        "href": link.href.value,
        "tabindex": isClickable.value ? 0 : void 0,
        "onClick": onClick,
        "onKeydown": isClickable.value && !isLink.value && onKeyDown
      }, {
        default: () => {
          var _a2;
          return [genOverlays(isClickable.value, "v-chip"), hasFilter && createVNode(VExpandXTransition, {
            "key": "filter"
          }, {
            default: () => [withDirectives(createVNode("div", {
              "class": "v-chip__filter"
            }, [!slots.filter ? createVNode(VIcon, {
              "key": "filter-icon",
              "icon": props.filterIcon
            }, null) : createVNode(VDefaultsProvider, {
              "key": "filter-defaults",
              "disabled": !props.filterIcon,
              "defaults": {
                VIcon: {
                  icon: props.filterIcon
                }
              }
            }, slots.filter)]), [[vShow, group.isSelected.value]])]
          }), hasPrepend && createVNode("div", {
            "key": "prepend",
            "class": "v-chip__prepend"
          }, [!slots.prepend ? createVNode(Fragment, null, [props.prependIcon && createVNode(VIcon, {
            "key": "prepend-icon",
            "icon": props.prependIcon,
            "start": true
          }, null), props.prependAvatar && createVNode(VAvatar, {
            "key": "prepend-avatar",
            "image": props.prependAvatar,
            "start": true
          }, null)]) : createVNode(VDefaultsProvider, {
            "key": "prepend-defaults",
            "disabled": !hasPrependMedia,
            "defaults": {
              VAvatar: {
                image: props.prependAvatar,
                start: true
              },
              VIcon: {
                icon: props.prependIcon,
                start: true
              }
            }
          }, slots.prepend)]), createVNode("div", {
            "class": "v-chip__content"
          }, [((_a2 = slots.default) == null ? void 0 : _a2.call(slots, {
            isSelected: group == null ? void 0 : group.isSelected.value,
            selectedClass: group == null ? void 0 : group.selectedClass.value,
            select: group == null ? void 0 : group.select,
            toggle: group == null ? void 0 : group.toggle,
            value: group == null ? void 0 : group.value.value,
            disabled: props.disabled
          })) ?? props.text]), hasAppend && createVNode("div", {
            "key": "append",
            "class": "v-chip__append"
          }, [!slots.append ? createVNode(Fragment, null, [props.appendIcon && createVNode(VIcon, {
            "key": "append-icon",
            "end": true,
            "icon": props.appendIcon
          }, null), props.appendAvatar && createVNode(VAvatar, {
            "key": "append-avatar",
            "end": true,
            "image": props.appendAvatar
          }, null)]) : createVNode(VDefaultsProvider, {
            "key": "append-defaults",
            "disabled": !hasAppendMedia,
            "defaults": {
              VAvatar: {
                end: true,
                image: props.appendAvatar
              },
              VIcon: {
                end: true,
                icon: props.appendIcon
              }
            }
          }, slots.append)]), hasClose && createVNode("button", mergeProps({
            "key": "close",
            "class": "v-chip__close",
            "type": "button"
          }, closeProps.value), [!slots.close ? createVNode(VIcon, {
            "key": "close-icon",
            "icon": props.closeIcon,
            "size": "x-small"
          }, null) : createVNode(VDefaultsProvider, {
            "key": "close-defaults",
            "defaults": {
              VIcon: {
                icon: props.closeIcon,
                size: "x-small"
              }
            }
          }, slots.close)])];
        }
      }), [[resolveDirective("ripple"), isClickable.value && props.ripple, null]]);
    };
  }
});
const makeVCalendarEventProps = propsFactory({
  allDay: Boolean,
  day: Object,
  event: Object
}, "VCalendarEvent");
const VCalendarEvent = genericComponent()({
  name: "VCalendarEvent",
  props: makeVCalendarEventProps(),
  setup(props) {
    useRender(() => createVNode(VChip, {
      "color": props.allDay ? "primary" : void 0,
      "density": "comfortable",
      "label": props.allDay,
      "width": "100%"
    }, {
      default: () => {
        var _a2, _b2;
        return [createVNode(VBadge, {
          "inline": true,
          "dot": true,
          "color": (_a2 = props.event) == null ? void 0 : _a2.color
        }, null), (_b2 = props.event) == null ? void 0 : _b2.title];
      }
    }));
    return {};
  }
});
const makeVCalendarMonthDayProps = propsFactory({
  active: Boolean,
  color: String,
  day: Object,
  disabled: Boolean,
  events: Array,
  title: [Number, String]
}, "VCalendarMonthDay");
const VCalendarMonthDay = genericComponent()({
  name: "VCalendarMonthDay",
  props: makeVCalendarMonthDayProps(),
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    useRender(() => {
      var _a2, _b2, _c, _d, _e, _f, _g, _h, _i;
      const hasTitle = !!(props.title || ((_a2 = slots.title) == null ? void 0 : _a2.call(slots, {
        title: props.title
      })));
      return createVNode("div", {
        "class": ["v-calendar-month__day"]
      }, [!((_b2 = props.day) == null ? void 0 : _b2.isHidden) && hasTitle && createVNode("div", {
        "key": "title",
        "class": "v-calendar-weekly__day-label"
      }, [((_c = slots.title) == null ? void 0 : _c.call(slots, {
        title: props.title
      })) ?? createVNode(VBtn, {
        "class": ((_d = props.day) == null ? void 0 : _d.isToday) ? "v-calendar-weekly__day-label__today" : void 0,
        "color": props.color,
        "disabled": props.disabled,
        "icon": true,
        "size": "x-small",
        "variant": ((_e = props.day) == null ? void 0 : _e.isToday) ? void 0 : "flat"
      }, {
        default: () => [props.title]
      })]), createVNode("div", {
        "key": "content",
        "class": "v-calendar-weekly__day-content"
      }, [((_f = slots.content) == null ? void 0 : _f.call(slots)) ?? createVNode("div", null, [createVNode("div", {
        "class": "v-calendar-weekly__day-alldayevents-container"
      }, [(_g = props.events) == null ? void 0 : _g.filter((event) => event.allDay).map((event) => createVNode(VCalendarEvent, {
        "day": props.day,
        "event": event,
        "allDay": true
      }, null))]), createVNode("div", {
        "class": "v-calendar-weekly__day-events-container"
      }, [(_h = props.events) == null ? void 0 : _h.filter((event) => !event.allDay).map((event) => createVNode(VCalendarEvent, {
        "day": props.day,
        "event": event
      }, null))])])]), (_i = slots.default) == null ? void 0 : _i.call(slots)]);
    });
    return {};
  }
});
const makeCalendarProps = propsFactory({
  allowedDates: [Array, Function],
  disabled: Boolean,
  displayValue: null,
  modelValue: Array,
  month: [Number, String],
  max: null,
  min: null,
  showAdjacentMonths: Boolean,
  year: [Number, String],
  weekdays: {
    type: Array,
    default: () => [0, 1, 2, 3, 4, 5, 6]
  }
}, "calendar");
function useCalendar(props) {
  const adapter = useDate();
  const model = useProxiedModel(props, "modelValue", [], (v) => wrapInArray(v));
  const displayValue = computed(() => {
    if (props.displayValue)
      return adapter.date(props.displayValue);
    if (model.value.length > 0)
      return adapter.date(model.value[0]);
    if (props.min)
      return adapter.date(props.min);
    if (Array.isArray(props.allowedDates))
      return adapter.date(props.allowedDates[0]);
    return adapter.date();
  });
  const year = useProxiedModel(props, "year", void 0, (v) => {
    const value = v != null ? Number(v) : adapter.getYear(displayValue.value);
    return adapter.startOfYear(adapter.setYear(adapter.date(), value));
  }, (v) => adapter.getYear(v));
  const month = useProxiedModel(props, "month", void 0, (v) => {
    const value = v != null ? Number(v) : adapter.getMonth(displayValue.value);
    const date2 = adapter.setYear(adapter.date(), adapter.getYear(year.value));
    return adapter.setMonth(date2, value);
  }, (v) => adapter.getMonth(v));
  const weeksInMonth = computed(() => {
    const weeks = adapter.getWeekArray(month.value);
    const days = weeks.flat();
    const daysInMonth2 = 6 * 7;
    if (days.length < daysInMonth2) {
      const lastDay = days[days.length - 1];
      let week = [];
      for (let day = 1; day <= daysInMonth2 - days.length; day++) {
        week.push(adapter.addDays(lastDay, day));
        if (day % 7 === 0) {
          weeks.push(week);
          week = [];
        }
      }
    }
    return weeks;
  });
  function genDays(days, today) {
    return days.filter((date2) => {
      return props.weekdays.includes(date2.getDay());
    }).map((date2, index) => {
      const isoDate = adapter.toISO(date2);
      const isAdjacent = !adapter.isSameMonth(date2, month.value);
      const isStart = adapter.isSameDay(date2, adapter.startOfMonth(month.value));
      const isEnd = adapter.isSameDay(date2, adapter.endOfMonth(month.value));
      const isSame = adapter.isSameDay(date2, month.value);
      return {
        date: date2,
        isoDate,
        formatted: adapter.format(date2, "keyboardDate"),
        year: adapter.getYear(date2),
        month: adapter.getMonth(date2),
        isDisabled: isDisabled(date2),
        isWeekStart: index % 7 === 0,
        isWeekEnd: index % 7 === 6,
        isToday: adapter.isSameDay(date2, today),
        isAdjacent,
        isHidden: isAdjacent && !props.showAdjacentMonths,
        isStart,
        isSelected: model.value.some((value) => adapter.isSameDay(date2, value)),
        isEnd,
        isSame,
        localized: adapter.format(date2, "dayOfMonth")
      };
    });
  }
  const daysInWeek = computed(() => {
    const lastDay = adapter.startOfWeek(model.value);
    const week = [];
    for (let day = 0; day <= 6; day++) {
      week.push(adapter.addDays(lastDay, day));
    }
    const days = week;
    const today = adapter.date();
    return genDays(days, today);
  });
  const daysInMonth = computed(() => {
    const days = weeksInMonth.value.flat();
    const today = adapter.date();
    return genDays(days, today);
  });
  const weekNumbers = computed(() => {
    return weeksInMonth.value.map((week) => {
      return week.length ? getWeek(adapter, week[0]) : null;
    });
  });
  function isDisabled(value) {
    if (props.disabled)
      return true;
    const date2 = adapter.date(value);
    if (props.min && adapter.isAfter(adapter.date(props.min), date2))
      return true;
    if (props.max && adapter.isAfter(date2, adapter.date(props.max)))
      return true;
    if (Array.isArray(props.allowedDates) && props.allowedDates.length > 0) {
      return !props.allowedDates.some((d) => adapter.isSameDay(adapter.date(d), date2));
    }
    if (typeof props.allowedDates === "function") {
      return !props.allowedDates(date2);
    }
    return false;
  }
  return {
    displayValue,
    daysInMonth,
    daysInWeek,
    genDays,
    model,
    weeksInMonth,
    weekNumbers
  };
}
const makeVCalendarProps = propsFactory({
  hideHeader: Boolean,
  hideWeekNumber: Boolean,
  ...makeCalendarProps(),
  ...makeVCalendarDayProps(),
  ...makeVCalendarHeaderProps()
}, "VCalender");
const VCalendar = genericComponent()({
  name: "VCalendar",
  props: makeVCalendarProps(),
  emits: {
    next: null,
    prev: null,
    "update:modelValue": null
  },
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const adapter = useDate();
    const {
      daysInMonth,
      daysInWeek,
      genDays,
      model,
      weekNumbers
    } = useCalendar(props);
    const dayNames = adapter.getWeekdays();
    function onClickNext() {
      if (props.viewMode === "month") {
        model.value = [adapter.addMonths(model.value[0], 1)];
      }
      if (props.viewMode === "week") {
        model.value = [adapter.addDays(model.value[0], 7)];
      }
      if (props.viewMode === "day") {
        model.value = [adapter.addDays(model.value[0], 1)];
      }
    }
    function onClickPrev() {
      if (props.viewMode === "month") {
        model.value = [adapter.addMonths(model.value[0], -1)];
      }
      if (props.viewMode === "week") {
        model.value = [adapter.addDays(model.value[0], -7)];
      }
      if (props.viewMode === "day") {
        model.value = [adapter.addDays(model.value[0], -1)];
      }
    }
    function onClickToday() {
      model.value = [/* @__PURE__ */ new Date()];
    }
    const title = computed(() => {
      return adapter.format(model.value[0], "monthAndYear");
    });
    useRender(() => {
      var _a2;
      const calendarDayProps = VCalendarDay.filterProps(props);
      const calendarHeaderProps = VCalendarHeader.filterProps(props);
      return createVNode("div", {
        "class": ["v-calendar", {
          "v-calendar-monthly": props.viewMode === "month",
          "v-calendar-weekly": props.viewMode === "week",
          "v-calendar-day": props.viewMode === "day"
        }]
      }, [createVNode("div", null, [!props.hideHeader && (!slots.header ? createVNode(VCalendarHeader, mergeProps({
        "key": "calendar-header"
      }, calendarHeaderProps, {
        "title": title.value,
        "onClick:next": onClickNext,
        "onClick:prev": onClickPrev,
        "onClick:toToday": onClickToday
      }), null) : slots.header({
        title: title.value
      }))]), createVNode("div", {
        "class": ["v-calendar__container", `days__${props.weekdays.length}`]
      }, [props.viewMode === "month" && !props.hideDayHeader && createVNode("div", {
        "class": ["v-calendar-weekly__head", `days__${props.weekdays.length}`, ...!props.hideWeekNumber ? ["v-calendar-weekly__head-weeknumbers"] : []],
        "key": "calenderWeeklyHead"
      }, [!props.hideWeekNumber ? createVNode("div", {
        "key": "weekNumber0",
        "class": "v-calendar-weekly__head-weeknumber"
      }, null) : "", props.weekdays.sort((a, b) => a - b).map((weekday) => createVNode("div", {
        "class": `v-calendar-weekly__head-weekday${!props.hideWeekNumber ? "-with-weeknumber" : ""}`
      }, [dayNames[weekday]]))]), props.viewMode === "month" && createVNode("div", {
        "key": "VCalendarMonth",
        "class": ["v-calendar-month__days", `days${!props.hideWeekNumber ? "-with-weeknumbers" : ""}__${props.weekdays.length}`, ...!props.hideWeekNumber ? ["v-calendar-month__weeknumbers"] : []]
      }, [chunkArray(daysInMonth.value, props.weekdays.length).map((week, wi) => [!props.hideWeekNumber ? createVNode("div", {
        "class": "v-calendar-month__weeknumber"
      }, [weekNumbers.value[wi]]) : "", week.map((day) => {
        var _a3;
        return createVNode(VCalendarMonthDay, {
          "color": adapter.isSameDay(/* @__PURE__ */ new Date(), day.date) ? "primary" : void 0,
          "day": day,
          "title": day ? adapter.format(day.date, "dayOfMonth") : "NaN",
          "events": (_a3 = props.events) == null ? void 0 : _a3.filter((e) => adapter.isSameDay(day.date, e.start) || adapter.isSameDay(day.date, e.end))
        }, null);
      })])]), props.viewMode === "week" && daysInWeek.value.map((day, i) => {
        var _a3;
        return createVNode(VCalendarDay, mergeProps(calendarDayProps, {
          "day": day,
          "dayIndex": i,
          "events": (_a3 = props.events) == null ? void 0 : _a3.filter((e) => adapter.isSameDay(e.start, day.date) || adapter.isSameDay(e.end, day.date))
        }), null);
      }), props.viewMode === "day" && createVNode(VCalendarDay, mergeProps(calendarDayProps, {
        "day": genDays([model.value[0]], adapter.date())[0],
        "events": (_a2 = props.events) == null ? void 0 : _a2.filter((e) => adapter.isSameDay(e.start, genDays([model.value[0]], adapter.date())[0].date) || adapter.isSameDay(e.end, genDays([model.value[0]], adapter.date())[0].date))
      }), null)])]);
    });
    return {
      daysInMonth,
      daysInWeek,
      genDays
    };
  }
});
const VPickerTitle = createSimpleFunctional("v-picker-title");
const makeVPickerProps = propsFactory({
  bgColor: String,
  landscape: Boolean,
  title: String,
  hideHeader: Boolean,
  ...makeVSheetProps()
}, "VPicker");
const VPicker = genericComponent()({
  name: "VPicker",
  props: makeVPickerProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "color"));
    useRender(() => {
      const sheetProps = VSheet.filterProps(props);
      const hasTitle = !!(props.title || slots.title);
      return createVNode(VSheet, mergeProps(sheetProps, {
        "color": props.bgColor,
        "class": ["v-picker", {
          "v-picker--landscape": props.landscape,
          "v-picker--with-actions": !!slots.actions
        }, props.class],
        "style": props.style
      }), {
        default: () => {
          var _a2;
          return [!props.hideHeader && createVNode("div", {
            "key": "header",
            "class": [backgroundColorClasses.value],
            "style": [backgroundColorStyles.value]
          }, [hasTitle && createVNode(VPickerTitle, {
            "key": "picker-title"
          }, {
            default: () => {
              var _a3;
              return [((_a3 = slots.title) == null ? void 0 : _a3.call(slots)) ?? props.title];
            }
          }), slots.header && createVNode("div", {
            "class": "v-picker__header"
          }, [slots.header()])]), createVNode("div", {
            "class": "v-picker__body"
          }, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)]), slots.actions && createVNode(VDefaultsProvider, {
            "defaults": {
              VBtn: {
                slim: true,
                variant: "text"
              }
            }
          }, {
            default: () => [createVNode("div", {
              "class": "v-picker__actions"
            }, [slots.actions()])]
          })];
        }
      });
    });
    return {};
  }
});
const labsComponents = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  VCalendar,
  VCalendarDay,
  VCalendarHeader,
  VCalendarInterval,
  VCalendarIntervalEvent,
  VCalendarMonthDay,
  VConfirmEdit,
  VPicker,
  VPickerTitle
});
const VSpacer = createSimpleFunctional("v-spacer", "div", "VSpacer");
const makeVDatePickerControlsProps = propsFactory({
  active: {
    type: [String, Array],
    default: void 0
  },
  disabled: {
    type: [Boolean, String, Array],
    default: false
  },
  nextIcon: {
    type: [String],
    default: "$next"
  },
  prevIcon: {
    type: [String],
    default: "$prev"
  },
  modeIcon: {
    type: [String],
    default: "$subgroup"
  },
  text: String,
  viewMode: {
    type: String,
    default: "month"
  }
}, "VDatePickerControls");
const VDatePickerControls = genericComponent()({
  name: "VDatePickerControls",
  props: makeVDatePickerControlsProps(),
  emits: {
    "click:year": () => true,
    "click:month": () => true,
    "click:prev": () => true,
    "click:next": () => true,
    "click:text": () => true
  },
  setup(props, _ref) {
    let {
      emit
    } = _ref;
    const disableMonth = computed(() => {
      return Array.isArray(props.disabled) ? props.disabled.includes("text") : !!props.disabled;
    });
    const disableYear = computed(() => {
      return Array.isArray(props.disabled) ? props.disabled.includes("mode") : !!props.disabled;
    });
    const disablePrev = computed(() => {
      return Array.isArray(props.disabled) ? props.disabled.includes("prev") : !!props.disabled;
    });
    const disableNext = computed(() => {
      return Array.isArray(props.disabled) ? props.disabled.includes("next") : !!props.disabled;
    });
    function onClickPrev() {
      emit("click:prev");
    }
    function onClickNext() {
      emit("click:next");
    }
    function onClickYear() {
      emit("click:year");
    }
    function onClickMonth() {
      emit("click:month");
    }
    useRender(() => {
      return createVNode("div", {
        "class": ["v-date-picker-controls"]
      }, [createVNode(VBtn, {
        "class": "v-date-picker-controls__month-btn",
        "disabled": disableMonth.value,
        "text": props.text,
        "variant": "text",
        "rounded": true,
        "onClick": onClickMonth
      }, null), createVNode(VBtn, {
        "key": "mode-btn",
        "class": "v-date-picker-controls__mode-btn",
        "disabled": disableYear.value,
        "density": "comfortable",
        "icon": props.modeIcon,
        "variant": "text",
        "onClick": onClickYear
      }, null), createVNode(VSpacer, {
        "key": "mode-spacer"
      }, null), createVNode("div", {
        "key": "month-buttons",
        "class": "v-date-picker-controls__month"
      }, [createVNode(VBtn, {
        "disabled": disablePrev.value,
        "icon": props.prevIcon,
        "variant": "text",
        "onClick": onClickPrev
      }, null), createVNode(VBtn, {
        "disabled": disableNext.value,
        "icon": props.nextIcon,
        "variant": "text",
        "onClick": onClickNext
      }, null)])]);
    });
    return {};
  }
});
const makeVDatePickerHeaderProps = propsFactory({
  appendIcon: String,
  color: String,
  header: String,
  transition: String,
  onClick: EventProp()
}, "VDatePickerHeader");
const VDatePickerHeader = genericComponent()({
  name: "VDatePickerHeader",
  props: makeVDatePickerHeaderProps(),
  emits: {
    click: () => true,
    "click:append": () => true
  },
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(props, "color");
    function onClick() {
      emit("click");
    }
    function onClickAppend() {
      emit("click:append");
    }
    useRender(() => {
      const hasContent = !!(slots.default || props.header);
      const hasAppend = !!(slots.append || props.appendIcon);
      return createVNode("div", {
        "class": ["v-date-picker-header", {
          "v-date-picker-header--clickable": !!props.onClick
        }, backgroundColorClasses.value],
        "style": backgroundColorStyles.value,
        "onClick": onClick
      }, [slots.prepend && createVNode("div", {
        "key": "prepend",
        "class": "v-date-picker-header__prepend"
      }, [slots.prepend()]), hasContent && createVNode(MaybeTransition, {
        "key": "content",
        "name": props.transition
      }, {
        default: () => {
          var _a2;
          return [createVNode("div", {
            "key": props.header,
            "class": "v-date-picker-header__content"
          }, [((_a2 = slots.default) == null ? void 0 : _a2.call(slots)) ?? props.header])];
        }
      }), hasAppend && createVNode("div", {
        "class": "v-date-picker-header__append"
      }, [!slots.append ? createVNode(VBtn, {
        "key": "append-btn",
        "icon": props.appendIcon,
        "variant": "text",
        "onClick": onClickAppend
      }, null) : createVNode(VDefaultsProvider, {
        "key": "append-defaults",
        "disabled": !props.appendIcon,
        "defaults": {
          VBtn: {
            icon: props.appendIcon,
            variant: "text"
          }
        }
      }, {
        default: () => {
          var _a2;
          return [(_a2 = slots.append) == null ? void 0 : _a2.call(slots)];
        }
      })])]);
    });
    return {};
  }
});
const makeVDatePickerMonthProps = propsFactory({
  color: String,
  hideWeekdays: Boolean,
  multiple: Boolean,
  showWeek: Boolean,
  ...makeCalendarProps()
}, "VDatePickerMonth");
const VDatePickerMonth = genericComponent()({
  name: "VDatePickerMonth",
  props: makeVDatePickerMonthProps(),
  emits: {
    "update:modelValue": (date2) => true,
    "update:month": (date2) => true,
    "update:year": (date2) => true
  },
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const daysRef = ref();
    const {
      daysInMonth,
      model,
      weekNumbers
    } = useCalendar(props);
    const adapter = useDate();
    function onClick(value) {
      if (props.multiple) {
        const index = model.value.findIndex((selection) => adapter.isSameDay(selection, value));
        if (index === -1) {
          model.value = [...model.value, value];
        } else {
          const value2 = [...model.value];
          value2.splice(index, 1);
          model.value = value2;
        }
      } else {
        model.value = [value];
      }
    }
    return () => createVNode("div", {
      "class": "v-date-picker-month"
    }, [props.showWeek && createVNode("div", {
      "key": "weeks",
      "class": "v-date-picker-month__weeks"
    }, [!props.hideWeekdays && createVNode("div", {
      "key": "hide-week-days",
      "class": "v-date-picker-month__day"
    }, [createTextVNode(" ")]), weekNumbers.value.map((week) => createVNode("div", {
      "class": ["v-date-picker-month__day", "v-date-picker-month__day--adjacent"]
    }, [week]))]), createVNode("div", {
      "ref": daysRef,
      "class": "v-date-picker-month__days"
    }, [!props.hideWeekdays && adapter.getWeekdays().map((weekDay) => createVNode("div", {
      "class": ["v-date-picker-month__day", "v-date-picker-month__weekday"]
    }, [weekDay[0]])), daysInMonth.value.map((item, i) => {
      const slotProps = {
        props: {
          onClick: () => onClick(item.date)
        },
        item,
        i
      };
      return createVNode("div", {
        "class": ["v-date-picker-month__day", {
          "v-date-picker-month__day--adjacent": item.isAdjacent,
          "v-date-picker-month__day--hide-adjacent": item.isHidden,
          "v-date-picker-month__day--selected": item.isSelected,
          "v-date-picker-month__day--week-end": item.isWeekEnd,
          "v-date-picker-month__day--week-start": item.isWeekStart
        }],
        "data-v-date": !item.isDisabled ? item.isoDate : void 0
      }, [(props.showAdjacentMonths || !item.isAdjacent) && createVNode(VDefaultsProvider, {
        "defaults": {
          VBtn: {
            color: (item.isSelected || item.isToday) && !item.isDisabled ? props.color : void 0,
            disabled: item.isDisabled,
            icon: true,
            ripple: false,
            text: item.localized,
            variant: item.isDisabled ? "text" : item.isToday && !item.isSelected ? "outlined" : "flat",
            onClick: () => onClick(item.date)
          }
        }
      }, {
        default: () => {
          var _a2;
          return [((_a2 = slots.day) == null ? void 0 : _a2.call(slots, slotProps)) ?? createVNode(VBtn, slotProps.props, null)];
        }
      })]);
    })])]);
  }
});
const makeVDatePickerMonthsProps = propsFactory({
  color: String,
  height: [String, Number],
  modelValue: Number
}, "VDatePickerMonths");
const VDatePickerMonths = genericComponent()({
  name: "VDatePickerMonths",
  props: makeVDatePickerMonthsProps(),
  emits: {
    "update:modelValue": (date2) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const adapter = useDate();
    const model = useProxiedModel(props, "modelValue");
    const months = computed(() => {
      let date2 = adapter.startOfYear(adapter.date());
      return createRange(12).map((i) => {
        const text = adapter.format(date2, "monthShort");
        date2 = adapter.getNextMonth(date2);
        return {
          text,
          value: i
        };
      });
    });
    watchEffect(() => {
      model.value = model.value ?? adapter.getMonth(adapter.date());
    });
    useRender(() => createVNode("div", {
      "class": "v-date-picker-months",
      "style": {
        height: convertToUnit(props.height)
      }
    }, [createVNode("div", {
      "class": "v-date-picker-months__content"
    }, [months.value.map((month, i) => {
      var _a2;
      const btnProps = {
        active: model.value === i,
        color: model.value === i ? props.color : void 0,
        rounded: true,
        text: month.text,
        variant: model.value === month.value ? "flat" : "text",
        onClick: () => onClick(i)
      };
      function onClick(i2) {
        model.value = i2;
      }
      return ((_a2 = slots.month) == null ? void 0 : _a2.call(slots, {
        month,
        i,
        props: btnProps
      })) ?? createVNode(VBtn, mergeProps({
        "key": "month"
      }, btnProps, {
        "onClick": () => onClick(i)
      }), null);
    })])]));
    return {};
  }
});
const makeVDatePickerYearsProps = propsFactory({
  color: String,
  height: [String, Number],
  min: null,
  max: null,
  modelValue: Number
}, "VDatePickerYears");
const VDatePickerYears = genericComponent()({
  name: "VDatePickerYears",
  props: makeVDatePickerYearsProps(),
  emits: {
    "update:modelValue": (year) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const adapter = useDate();
    const model = useProxiedModel(props, "modelValue");
    const years = computed(() => {
      const year = adapter.getYear(adapter.date());
      let min = year - 100;
      let max = year + 52;
      if (props.min) {
        min = adapter.getYear(adapter.date(props.min));
      }
      if (props.max) {
        max = adapter.getYear(adapter.date(props.max));
      }
      let date2 = adapter.startOfYear(adapter.date());
      date2 = adapter.setYear(date2, min);
      return createRange(max - min + 1, min).map((i) => {
        const text = adapter.format(date2, "year");
        date2 = adapter.setYear(date2, adapter.getYear(date2) + 1);
        return {
          text,
          value: i
        };
      });
    });
    watchEffect(() => {
      model.value = model.value ?? adapter.getYear(adapter.date());
    });
    const yearRef = ref();
    useRender(() => createVNode("div", {
      "class": "v-date-picker-years",
      "style": {
        height: convertToUnit(props.height)
      }
    }, [createVNode("div", {
      "class": "v-date-picker-years__content"
    }, [years.value.map((year, i) => {
      var _a2;
      const btnProps = {
        ref: model.value === year.value ? yearRef : void 0,
        active: model.value === year.value,
        color: model.value === year.value ? props.color : void 0,
        rounded: true,
        text: year.text,
        variant: model.value === year.value ? "flat" : "text",
        onClick: () => model.value = year.value
      };
      return ((_a2 = slots.year) == null ? void 0 : _a2.call(slots, {
        year,
        i,
        props: btnProps
      })) ?? createVNode(VBtn, mergeProps({
        "key": "month"
      }, btnProps), null);
    })])]));
    return {};
  }
});
const makeVDatePickerProps = propsFactory({
  // TODO: implement in v3.5
  // calendarIcon: {
  //   type: String,
  //   default: '$calendar',
  // },
  // keyboardIcon: {
  //   type: String,
  //   default: '$edit',
  // },
  // inputMode: {
  //   type: String as PropType<'calendar' | 'keyboard'>,
  //   default: 'calendar',
  // },
  // inputText: {
  //   type: String,
  //   default: '$vuetify.datePicker.input.placeholder',
  // },
  // inputPlaceholder: {
  //   type: String,
  //   default: 'dd/mm/yyyy',
  // },
  header: {
    type: String,
    default: "$vuetify.datePicker.header"
  },
  ...makeVDatePickerControlsProps(),
  ...makeVDatePickerMonthProps(),
  ...omit(makeVDatePickerMonthsProps(), ["modelValue"]),
  ...omit(makeVDatePickerYearsProps(), ["modelValue"]),
  ...makeVPickerProps({
    title: "$vuetify.datePicker.title"
  }),
  modelValue: null
}, "VDatePicker");
const VDatePicker = genericComponent()({
  name: "VDatePicker",
  props: makeVDatePickerProps(),
  emits: {
    "update:modelValue": (date2) => true,
    "update:month": (date2) => true,
    "update:year": (date2) => true,
    // 'update:inputMode': (date: any) => true,
    "update:viewMode": (date2) => true
  },
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const adapter = useDate();
    const {
      t
    } = useLocale();
    const model = useProxiedModel(props, "modelValue", void 0, (v) => wrapInArray(v), (v) => props.multiple ? v : v[0]);
    const viewMode = useProxiedModel(props, "viewMode");
    const internal = computed(() => {
      var _a2;
      const value = adapter.date((_a2 = model.value) == null ? void 0 : _a2[0]);
      return value && adapter.isValid(value) ? value : adapter.date();
    });
    const month = ref(Number(props.month ?? adapter.getMonth(adapter.startOfMonth(internal.value))));
    const year = ref(Number(props.year ?? adapter.getYear(adapter.startOfYear(adapter.setMonth(internal.value, month.value)))));
    const isReversing = shallowRef(false);
    const header = computed(() => {
      return props.multiple && model.value.length > 1 ? t("$vuetify.datePicker.itemsSelected", model.value.length) : model.value[0] && adapter.isValid(model.value[0]) ? adapter.format(model.value[0], "normalDateWithWeekday") : t(props.header);
    });
    const text = computed(() => {
      return adapter.format(adapter.setYear(adapter.setMonth(adapter.date(), month.value), year.value), "monthAndYear");
    });
    const headerTransition = computed(() => `date-picker-header${isReversing.value ? "-reverse" : ""}-transition`);
    const minDate = computed(() => {
      const date2 = adapter.date(props.min);
      return props.min && adapter.isValid(date2) ? date2 : null;
    });
    const maxDate = computed(() => {
      const date2 = adapter.date(props.max);
      return props.max && adapter.isValid(date2) ? date2 : null;
    });
    const disabled = computed(() => {
      if (props.disabled)
        return true;
      const targets = [];
      if (viewMode.value !== "month") {
        targets.push(...["prev", "next"]);
      } else {
        let _date = adapter.date();
        _date = adapter.setYear(_date, year.value);
        _date = adapter.setMonth(_date, month.value);
        if (minDate.value) {
          const date2 = adapter.addDays(adapter.startOfMonth(_date), -1);
          adapter.isAfter(minDate.value, date2) && targets.push("prev");
        }
        if (maxDate.value) {
          const date2 = adapter.addDays(adapter.endOfMonth(_date), 1);
          adapter.isAfter(date2, maxDate.value) && targets.push("next");
        }
      }
      return targets;
    });
    function onClickNext() {
      if (month.value < 11) {
        month.value++;
      } else {
        year.value++;
        month.value = 0;
      }
    }
    function onClickPrev() {
      if (month.value > 0) {
        month.value--;
      } else {
        year.value--;
        month.value = 11;
      }
    }
    function onClickDate() {
      viewMode.value = "month";
    }
    function onClickMonth() {
      viewMode.value = viewMode.value === "months" ? "month" : "months";
    }
    function onClickYear() {
      viewMode.value = viewMode.value === "year" ? "month" : "year";
    }
    watch(month, () => {
      if (viewMode.value === "months")
        onClickMonth();
      emit("update:month", month.value);
    });
    watch(year, () => {
      if (viewMode.value === "year")
        onClickYear();
      emit("update:year", year.value);
    });
    watch(model, (val, oldVal) => {
      const before = adapter.date(wrapInArray(val)[0]);
      const after = adapter.date(wrapInArray(oldVal)[0]);
      isReversing.value = adapter.isBefore(before, after);
    });
    useRender(() => {
      const pickerProps = VPicker.filterProps(props);
      const datePickerControlsProps = VDatePickerControls.filterProps(props);
      const datePickerHeaderProps = VDatePickerHeader.filterProps(props);
      const datePickerMonthProps = VDatePickerMonth.filterProps(props);
      const datePickerMonthsProps = omit(VDatePickerMonths.filterProps(props), ["modelValue"]);
      const datePickerYearsProps = omit(VDatePickerYears.filterProps(props), ["modelValue"]);
      const headerProps = {
        header: header.value,
        transition: headerTransition.value
      };
      return createVNode(VPicker, mergeProps(pickerProps, {
        "class": ["v-date-picker", `v-date-picker--${viewMode.value}`, {
          "v-date-picker--show-week": props.showWeek
        }, props.class],
        "style": props.style
      }), {
        title: () => {
          var _a2;
          return ((_a2 = slots.title) == null ? void 0 : _a2.call(slots)) ?? createVNode("div", {
            "class": "v-date-picker__title"
          }, [t(props.title)]);
        },
        header: () => slots.header ? createVNode(VDefaultsProvider, {
          "defaults": {
            VDatePickerHeader: {
              ...headerProps
            }
          }
        }, {
          default: () => {
            var _a2;
            return [(_a2 = slots.header) == null ? void 0 : _a2.call(slots, headerProps)];
          }
        }) : createVNode(VDatePickerHeader, mergeProps({
          "key": "header"
        }, datePickerHeaderProps, headerProps, {
          "onClick": viewMode.value !== "month" ? onClickDate : void 0
        }), {
          ...slots,
          default: void 0
        }),
        default: () => createVNode(Fragment, null, [createVNode(VDatePickerControls, mergeProps(datePickerControlsProps, {
          "disabled": disabled.value,
          "text": text.value,
          "onClick:next": onClickNext,
          "onClick:prev": onClickPrev,
          "onClick:month": onClickMonth,
          "onClick:year": onClickYear
        }), null), createVNode(VFadeTransition, {
          "hideOnLeave": true
        }, {
          default: () => [viewMode.value === "months" ? createVNode(VDatePickerMonths, mergeProps({
            "key": "date-picker-months"
          }, datePickerMonthsProps, {
            "modelValue": month.value,
            "onUpdate:modelValue": ($event) => month.value = $event,
            "min": minDate.value,
            "max": maxDate.value
          }), null) : viewMode.value === "year" ? createVNode(VDatePickerYears, mergeProps({
            "key": "date-picker-years"
          }, datePickerYearsProps, {
            "modelValue": year.value,
            "onUpdate:modelValue": ($event) => year.value = $event,
            "min": minDate.value,
            "max": maxDate.value
          }), null) : createVNode(VDatePickerMonth, mergeProps({
            "key": "date-picker-month"
          }, datePickerMonthProps, {
            "modelValue": model.value,
            "onUpdate:modelValue": ($event) => model.value = $event,
            "month": month.value,
            "onUpdate:month": ($event) => month.value = $event,
            "year": year.value,
            "onUpdate:year": ($event) => year.value = $event,
            "min": minDate.value,
            "max": maxDate.value
          }), null)]
        })]),
        actions: slots.actions
      });
    });
    return {};
  }
});
const isDev$1 = false;
function vuetifyConfiguration() {
  const options = JSON.parse('{"theme":{"defaultTheme":"light","themes":{"light":{"dark":false,"colors":{"primary":"#1D1D1D","primary-darken-1":"#dc8b29","secondary":"#5CBBF6","secondary-darken-1":"#7c541c","surface":"rgb(33, 33, 33)"},"variables":{"theme-on-background":"255,255,255"}},"dark":{"dark":true,"colors":{"primary":"#ecac6c","primary-darken-1":"#f2bd8b","secondary":"#a6845e","secondary-darken-1":"#b99d7f","tertiary":"#fbc988","success":"#71a36d","warning":"#fb985c","error":"#e97669","info":"#76a9df","neutral":"#585858","background":"#151515","on-background":"#ebebeb","surface":"rgb(33, 33, 33)","on-surface":"#ebebeb","surface-variant":"#1b1b1b","on-surface-variant":"#ebebeb"},"variables":{}}}},"defaults":{"global":{"ripple":true},"VCarousel":{"color":"primary"},"VBtn":{"variant":"flat","style":"","class":""},"VBtnSquare":{"color":"primary","variant":"flat","minHeight":"40px","style":"padding-left:12px; padding-right:12px; font-size: 0.875rem !important;line-height: 1.25rem !important;font-weight: 500 !important;line-height: 1.25rem;letter-spacing: .0178571429em !important; text-transform:none !important; border-radius:0.5rem !important;","class":""},"VIconBtn":{"color":"primary","variant":"flat","minHeight":"40px","style":"padding-left:12px; padding-right:12px; font-size: 0.875rem !important;line-height: 1.25rem !important;font-weight: 500 !important;line-height: 1.25rem;letter-spacing: .0178571429em !important; text-transform:none !important; border-radius:0.5rem !important;width: inherit;height: inherit;","class":""},"VTextField":{"color":"primary","variant":"outlined","density":"compact"}},"display":{"mobileBreakpoint":"xs","thresholds":{"xs":0,"sm":600,"md":960,"lg":1280,"xl":1920,"xxl":2560}},"ssr":{"clientWidth":100}}');
  options.directives = directives;
  options.aliases = { "VBtnSquare": VBtn, "VIconBtn": VBtn };
  options.components = { VDatePicker, ...labsComponents };
  return options;
}
async function configureVuetify() {
  const nuxtApp = /* @__PURE__ */ useNuxtApp();
  const vuetifyOptions = vuetifyConfiguration();
  await nuxtApp.hooks.callHook("vuetify:configuration", { isDev: isDev$1, vuetifyOptions });
  await nuxtApp.hooks.callHook("vuetify:before-create", { isDev: isDev$1, vuetifyOptions });
  const vuetify = createVuetify(vuetifyOptions);
  nuxtApp.vueApp.use(vuetify);
  nuxtApp.provide("vuetify", vuetify);
  await nuxtApp.hooks.callHook("vuetify:ready", vuetify);
}
const plugin = /* @__PURE__ */ defineNuxtPlugin({
  name: "vuetify:configuration:plugin",
  enforce: "post",
  setup() {
    (/* @__PURE__ */ useNuxtApp()).hook("app:created", configureVuetify);
  }
});
const plugins = [
  unhead_KgADcZ0jPj,
  plugin$3,
  _0_siteConfig_7pzUtwM1Zj,
  plugin$2,
  revive_payload_server_eJ33V7gbc6,
  components_plugin_KR1HBZs4kY,
  plugin_server_UqHjXsAzTd,
  font_fallback_inlining_plugin_server_0jIQFwhKjU,
  defaults_9rtUot57OJ,
  siteConfig_XJTWbJLGEl,
  inferSeoMetaPlugin_zOJ1kxPqxh,
  defaults_TgNupsGd8e,
  og_image_canonical_urls_server_3MRa0uZwqs,
  route_rule_og_image_server_OQYH1Ux5Eu,
  robot_meta_server_oar2tuqbRB,
  vuetify_date_BsJkzwGv36,
  vuetify_icons_RMzWu406ID,
  plugin$1,
  unocss_MzCDxu9LMj,
  vuetify_7h9QAQEssH,
  _1_absoluteImageUrls_server_kwrlqpobcr,
  _0_routeRules_server_lt3u18Dpwh,
  init_74KpgUZBCI,
  plugin
];
const removeUndefinedProps = (props) => {
  const filteredProps = /* @__PURE__ */ Object.create(null);
  for (const key in props) {
    const value = props[key];
    if (value !== void 0) {
      filteredProps[key] = value;
    }
  }
  return filteredProps;
};
const setupForUseMeta = (metaFactory, renderChild) => (props, ctx) => {
  useHead(() => metaFactory({ ...removeUndefinedProps(props), ...ctx.attrs }, ctx));
  return () => {
    var _a2, _b2;
    return renderChild ? (_b2 = (_a2 = ctx.slots).default) == null ? void 0 : _b2.call(_a2) : null;
  };
};
const globalProps = {
  accesskey: String,
  autocapitalize: String,
  autofocus: {
    type: Boolean,
    default: void 0
  },
  class: [String, Object, Array],
  contenteditable: {
    type: Boolean,
    default: void 0
  },
  contextmenu: String,
  dir: String,
  draggable: {
    type: Boolean,
    default: void 0
  },
  enterkeyhint: String,
  exportparts: String,
  hidden: {
    type: Boolean,
    default: void 0
  },
  id: String,
  inputmode: String,
  is: String,
  itemid: String,
  itemprop: String,
  itemref: String,
  itemscope: String,
  itemtype: String,
  lang: String,
  nonce: String,
  part: String,
  slot: String,
  spellcheck: {
    type: Boolean,
    default: void 0
  },
  style: String,
  tabindex: String,
  title: String,
  translate: String
};
defineComponent$1({
  name: "NoScript",
  inheritAttrs: false,
  props: {
    ...globalProps,
    title: String,
    body: Boolean,
    renderPriority: [String, Number]
  },
  setup: setupForUseMeta((props, { slots }) => {
    var _a2;
    const noscript = { ...props };
    const textContent = (((_a2 = slots.default) == null ? void 0 : _a2.call(slots)) || []).filter(({ children }) => children).map(({ children }) => children).join("");
    if (textContent) {
      noscript.children = textContent;
    }
    return {
      noscript: [noscript]
    };
  })
});
defineComponent$1({
  // eslint-disable-next-line vue/no-reserved-component-names
  name: "Link",
  inheritAttrs: false,
  props: {
    ...globalProps,
    as: String,
    crossorigin: String,
    disabled: Boolean,
    fetchpriority: String,
    href: String,
    hreflang: String,
    imagesizes: String,
    imagesrcset: String,
    integrity: String,
    media: String,
    prefetch: {
      type: Boolean,
      default: void 0
    },
    referrerpolicy: String,
    rel: String,
    sizes: String,
    title: String,
    type: String,
    /** @deprecated **/
    methods: String,
    /** @deprecated **/
    target: String,
    body: Boolean,
    renderPriority: [String, Number]
  },
  setup: setupForUseMeta((link) => ({
    link: [link]
  }))
});
defineComponent$1({
  // eslint-disable-next-line vue/no-reserved-component-names
  name: "Base",
  inheritAttrs: false,
  props: {
    ...globalProps,
    href: String,
    target: String
  },
  setup: setupForUseMeta((base) => ({
    base
  }))
});
defineComponent$1({
  // eslint-disable-next-line vue/no-reserved-component-names
  name: "Title",
  inheritAttrs: false,
  setup: setupForUseMeta((_, { slots }) => {
    var _a2, _b2, _c;
    return {
      title: ((_c = (_b2 = (_a2 = slots.default) == null ? void 0 : _a2.call(slots)) == null ? void 0 : _b2[0]) == null ? void 0 : _c.children) || null
    };
  })
});
defineComponent$1({
  // eslint-disable-next-line vue/no-reserved-component-names
  name: "Meta",
  inheritAttrs: false,
  props: {
    ...globalProps,
    charset: String,
    content: String,
    httpEquiv: String,
    name: String,
    body: Boolean,
    renderPriority: [String, Number]
  },
  setup: setupForUseMeta((props) => {
    const meta = { ...props };
    if (meta.httpEquiv) {
      meta["http-equiv"] = meta.httpEquiv;
      delete meta.httpEquiv;
    }
    return {
      meta: [meta]
    };
  })
});
defineComponent$1({
  // eslint-disable-next-line vue/no-reserved-component-names
  name: "Style",
  inheritAttrs: false,
  props: {
    ...globalProps,
    type: String,
    media: String,
    nonce: String,
    title: String,
    /** @deprecated **/
    scoped: {
      type: Boolean,
      default: void 0
    },
    body: Boolean,
    renderPriority: [String, Number]
  },
  setup: setupForUseMeta((props, { slots }) => {
    var _a2, _b2, _c;
    const style = { ...props };
    const textContent = (_c = (_b2 = (_a2 = slots.default) == null ? void 0 : _a2.call(slots)) == null ? void 0 : _b2[0]) == null ? void 0 : _c.children;
    if (textContent) {
      style.children = textContent;
    }
    return {
      style: [style]
    };
  })
});
const Head = defineComponent$1({
  // eslint-disable-next-line vue/no-reserved-component-names
  name: "Head",
  inheritAttrs: false,
  setup: (_props, ctx) => () => {
    var _a2, _b2;
    return (_b2 = (_a2 = ctx.slots).default) == null ? void 0 : _b2.call(_a2);
  }
});
defineComponent$1({
  // eslint-disable-next-line vue/no-reserved-component-names
  name: "Html",
  inheritAttrs: false,
  props: {
    ...globalProps,
    manifest: String,
    version: String,
    xmlns: String,
    renderPriority: [String, Number]
  },
  setup: setupForUseMeta((htmlAttrs) => ({ htmlAttrs }), true)
});
defineComponent$1({
  // eslint-disable-next-line vue/no-reserved-component-names
  name: "Body",
  inheritAttrs: false,
  props: {
    ...globalProps,
    renderPriority: [String, Number]
  },
  setup: setupForUseMeta((bodyAttrs) => ({ bodyAttrs }), true)
});
const site = {
  name: "VuCommerce",
  description: "Vue Designer Nuxt Vuetify Tailwind CSS",
  logo: "i-fluent-emoji:shopping-bags",
  author: "Pinegrow",
  url: "https://pg-nuxt-vuetify-tailwindcss.netlify.app",
  github: "https://github.com/pinegrow/pg-nuxt-vuetify-tailwindcss",
  defaultLocale: "en",
  // default
  identity: {
    type: "Organization"
  },
  twitter: "@vuedesigner",
  trailingSlash: false,
  // default
  titleSeparator: "|",
  // default
  nav: [
    { text: "Home", link: "/", type: "primary", icon: "i-mdi-home" },
    { text: "Women", link: "/women", type: "primary", icon: "i-mdi-home" },
    { text: "Men", link: "/men", type: "primary", icon: "i-mdi-home" },
    {
      text: "Jewellery",
      link: "/jewellery",
      type: "primary",
      icon: "i-mdi-home"
    },
    {
      text: "Electronics",
      link: "/electronics",
      type: "primary",
      icon: "i-mdi-home"
    },
    {
      text: "About Us",
      link: "/quick-start",
      type: "primary",
      icon: "i-mdi-home"
    },
    {
      text: "Track Order",
      link: "/track-order",
      type: "secondary",
      icon: "i-ic-outline-my-location"
    },
    {
      text: "Order History",
      link: "/order-history",
      type: "secondary",
      icon: "i-ic-baseline-history"
    },
    {
      text: "Returns",
      link: "/returns",
      type: "secondary",
      icon: "i-material-symbols-assignment-return-outline-rounded"
    },
    {
      text: "Delivery Policy",
      link: "/delivery-policy",
      type: "secondary",
      icon: "i-tabler-truck-return"
    },
    {
      text: "Contact Us",
      link: "/contact-us",
      type: "secondary",
      icon: "i-material-symbols-add-call"
    },
    {
      text: "Help & FAQs",
      link: "/help-faqs",
      type: "secondary",
      icon: "i-material-symbols-contact-support-outline"
    }
  ]
};
const pg_colors = {
  primary: {
    50: "#faf1ec",
    100: "#f9e0cb",
    200: "#f7ceab",
    300: "#f2bd8b",
    400: "#ecac6c",
    // 500: '#e59b4c',
    500: "#1D1D1D",
    600: "#dc8b29",
    700: "#c97f26",
    800: "#b77422",
    900: "#a5681f",
    950: "#935d1c",
    DEFAULT: "#825218"
  },
  secondary: {
    50: "#f0edeb",
    100: "#ded2c6",
    200: "#ccb7a2",
    300: "#b99d7f",
    400: "#a6845e",
    500: "#916b3d",
    600: "#7c541c",
    700: "#724d1a",
    800: "#674617",
    900: "#5d3f15",
    950: "#533813",
    DEFAULT: "#493211"
  },
  tertiary: {
    50: "#fdf5ed",
    100: "#ffead4",
    200: "#ffdfba",
    300: "#fdd4a1",
    400: "#fbc988",
    500: "#f8bf6e",
    600: "#f4b454",
    700: "#dfa54d",
    800: "#cb9646",
    900: "#b7873f",
    950: "#a37938",
    DEFAULT: "#906a32"
  },
  success: {
    50: "#ecf0ec",
    100: "#cdddcb",
    200: "#aec9ab",
    300: "#90b68c",
    400: "#71a36d",
    500: "#519050",
    600: "#2e7d32",
    700: "#2a722e",
    800: "#26682a",
    900: "#235e26",
    950: "#1f5422",
    DEFAULT: "#519050"
  },
  warning: {
    50: "#fcefeb",
    100: "#ffd9c7",
    200: "#ffc4a4",
    300: "#ffae7f",
    400: "#fb985c",
    500: "#f58238",
    600: "#ed6c02",
    700: "#d96302",
    800: "#c55a02",
    900: "#b25102",
    950: "#9f4801",
    DEFAULT: "#f58238"
  },
  error: {
    50: "#f9ecec",
    100: "#f9cfca",
    200: "#f6b2a9",
    300: "#f19488",
    400: "#e97669",
    500: "#df564c",
    600: "#d32f2f",
    700: "#c12b2b",
    800: "#b02727",
    900: "#9e2323",
    950: "#8d2020",
    DEFAULT: "#df564c"
  },
  info: {
    50: "#ebf1f9",
    100: "#d0dff2",
    200: "#b4ccec",
    300: "#96bbe5",
    400: "#76a9df",
    500: "#5098d8",
    600: "#0288d1",
    700: "#027cbf",
    800: "#0271ae",
    900: "#02669d",
    950: "#015b8c",
    DEFAULT: "#5098d8"
  },
  neutral: {
    50: "#ebebeb",
    100: "#c4c4c4",
    200: "#9f9f9f",
    300: "#7b7b7b",
    400: "#585858",
    500: "#383838",
    600: "#1b1b1b",
    700: "#191919",
    800: "#171717",
    900: "#151515",
    950: "#131313",
    DEFAULT: "#101010"
  }
};
const pg_font_urls = [
  "https://fonts.googleapis.com/css?family=Inter:100,200,300,400,500,600,700,800,900|Kalam:300,400,700&display=swap"
];
const pg_background_urls = {
  "design-image": "https://images.unsplash.com/photo-1537832816519-689ad163238b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDkyMnwwfDF8c2VhcmNofDI3fHxmYXNoaW9uJTIwY29sbGVjdGlvbnxlbnwwfHx8fDE2OTY4NzI4NzR8MA&ixlib=rb-4.0.3&q=80&w=1080",
  "design-image-large": "https://images.unsplash.com/photo-1537832816519-689ad163238b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDkyMnwwfDF8c2VhcmNofDI3fHxmYXNoaW9uJTIwY29sbGVjdGlvbnxlbnwwfHx8fDE2OTY4NzI4NzR8MA&ixlib=rb-4.0.3&q=80&w=2000"
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent$1({
  __name: "HeadAndMeta",
  __ssrInlineRender: true,
  setup(__props) {
    const link = [
      // ...[
      //   '/fonts/barlow-7cHpv4kjgoGqM7E_Ass52Hs.woff2',
      //   '/fonts/firacode-uU9eCBsR6Z2vfE9aq3bL0fxyUs4tcw4W_D1sJVD7Ng.woff2',
      //   '/fonts/barlow-7cHpv4kjgoGqM7E_DMs5.woff2',
      // ].map(
      //   (href) =>
      //     ({
      //       rel: 'preload',
      //       as: 'font',
      //       type: 'font/woff2',
      //       crossorigin: '',
      //       href,
      //     } as const),
      // ),
    ];
    const noscript = [];
    if (pg_font_urls.length) {
      const googleapis = "https://fonts.googleapis.com";
      const gstatic = "https://fonts.gstatic.com";
      link.push(
        { rel: "dns-prefetch", href: googleapis },
        { rel: "dns-prefetch", href: gstatic },
        { rel: "preconnect", crossorigin: "anonymous", href: googleapis },
        { rel: "preconnect", crossorigin: "anonymous", href: gstatic },
        {
          rel: "preload",
          as: "style",
          onload: "this.onload=null;this.rel='stylesheet'",
          href: pg_font_urls.toString()
        }
      );
      noscript.push(
        `<link rel="stylesheet" crossorigin="anonymous" href="${pg_font_urls.toString()}" />`
      );
    }
    const { name, description, author } = site;
    const route = useRoute$1();
    const theDescription = computed(
      () => route.meta.description || description
    );
    const title = computed(() => route.meta.title);
    const theTitle = computed(
      () => title.value ? `${title.value} - ${name}` : name
    );
    const themeClassName = (/* @__PURE__ */ useNuxtApp()).$vuetify.theme.global.name;
    useHead({
      title,
      // title was set using definePageMeta in pages. For dynamic routes, it's dynamically set in the [page] itself using useHead
      titleTemplate: (titleChunk) => {
        return titleChunk ? `${titleChunk} - ${name}` : name;
      },
      htmlAttrs: { lang: "en-US", class: themeClassName },
      // Instead of setting meta via useHead, useServerSeoMeta or @nuxtseo/module is used.
      // meta: [
      //   { name: 'charset', content: 'utf-8' },
      //   {
      //     name: 'viewport',
      //     content: 'width=device-width, initial-scale=1',
      //   },
      //   { name: 'author', content: author },
      //   { name: 'keywords', content: route.meta.tags?.toString() },
      // ],
      // Not required for Vuetify, see themeClassName set above in htmlAttrs
      // script: [{ innerHTML: checkDarkTheme, once: true } as TurboScript],
      link,
      noscript
    });
    useServerHead({
      meta: [
        { name: "author", content: author },
        { name: "description", content: theDescription },
        { property: "og:image:alt", content: theTitle },
        { name: "twitter:title", content: theTitle.value },
        { name: "twitter:description", content: theDescription },
        { name: "twitter:image:alt", content: theTitle.value },
        { name: "twitter:site", content: "@vuedesigner" },
        { name: "twitter:creator", content: "@techakayy" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = Head;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_Head, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HeadAndMeta.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
function withoutQuery(path) {
  return path.split("?")[0];
}
function createNitroRouteRuleMatcher() {
  const { nitro, app } = /* @__PURE__ */ useRuntimeConfig();
  const _routeRulesMatcher = toRouteMatcher(
    createRouter({
      routes: Object.fromEntries(
        Object.entries((nitro == null ? void 0 : nitro.routeRules) || {}).map(([path, rules]) => [withoutTrailingSlash(path), rules])
      )
    })
  );
  return (path) => {
    return defu({}, ..._routeRulesMatcher.matchAll(
      // radix3 does not support trailing slashes
      withoutBase(withoutTrailingSlash(withoutQuery(path)), app.baseURL)
    ).reverse());
  };
}
function defineOgImage(_options = {}) {
  var _a2, _b2, _c;
  const nuxtApp = /* @__PURE__ */ useNuxtApp();
  const ogImageInstances = nuxtApp.ssrContext._ogImageInstances || [];
  const route = useRoute$1();
  const basePath = route.path || "/";
  const routeRuleMatcher = createNitroRouteRuleMatcher();
  const routeRules = routeRuleMatcher(basePath).ogImage;
  if (!_options || ((_c = (_b2 = (_a2 = nuxtApp.ssrContext) == null ? void 0 : _a2.event.context._nitro) == null ? void 0 : _b2.routeRules) == null ? void 0 : _c.ogImage) === false || typeof routeRules !== "undefined" && routeRules === false) {
    ogImageInstances.forEach((e) => {
      e.dispose();
    });
    nuxtApp.ssrContext._ogImageInstances = void 0;
    return;
  }
  const options = normaliseOptions({
    ..._options
  });
  if (route.query)
    options._query = route.query;
  const { defaults: defaults2 } = useOgImageRuntimeConfig();
  const resolvedOptions = normaliseOptions(defu(separateProps(_options), separateProps(routeRules), defaults2));
  if (_options.url) {
    createOgImageMeta(null, options, resolvedOptions, nuxtApp.ssrContext);
  } else {
    const path = getOgImagePath(basePath, resolvedOptions);
    createOgImageMeta(path, options, resolvedOptions, nuxtApp.ssrContext);
  }
}
const __nuxt_component_1$1 = defineComponent$1({
  name: "OgImage",
  async setup(_, { attrs }) {
    defineOgImage(attrs);
    return () => null;
  }
});
function createLoadingIndicator(opts = {}) {
  const { duration = 2e3, throttle = 200 } = opts;
  const nuxtApp = /* @__PURE__ */ useNuxtApp();
  const progress = ref(0);
  const isLoading = ref(false);
  computed(() => 1e4 / duration);
  let _timer = null;
  let _throttle = null;
  const start = () => set2(0);
  function set2(at = 0) {
    if (nuxtApp.isHydrating) {
      return;
    }
    if (at >= 100) {
      return finish();
    }
    clear();
    progress.value = at < 0 ? 0 : at;
    if (throttle && false) {
      _throttle = setTimeout(() => {
        isLoading.value = true;
      }, throttle);
    } else {
      isLoading.value = true;
    }
  }
  function finish() {
    progress.value = 100;
    clear();
  }
  function clear() {
    clearInterval(_timer);
    clearTimeout(_throttle);
    _timer = null;
    _throttle = null;
  }
  let _cleanup = () => {
  };
  return {
    _cleanup,
    progress: computed(() => progress.value),
    isLoading: computed(() => isLoading.value),
    start,
    set: set2,
    finish,
    clear
  };
}
function useLoadingIndicator(opts = {}) {
  const nuxtApp = /* @__PURE__ */ useNuxtApp();
  const indicator = nuxtApp._loadingIndicator = nuxtApp._loadingIndicator || createLoadingIndicator(opts);
  return indicator;
}
const __nuxt_component_0 = defineComponent$1({
  name: "NuxtLoadingIndicator",
  props: {
    throttle: {
      type: Number,
      default: 200
    },
    duration: {
      type: Number,
      default: 2e3
    },
    height: {
      type: Number,
      default: 3
    },
    color: {
      type: [String, Boolean],
      default: "repeating-linear-gradient(to right,#00dc82 0%,#34cdfe 50%,#0047e1 100%)"
    }
  },
  setup(props, { slots, expose }) {
    const { progress, isLoading, start, finish, clear } = useLoadingIndicator({
      duration: props.duration,
      throttle: props.throttle
    });
    expose({
      progress,
      isLoading,
      start,
      finish,
      clear
    });
    return () => h("div", {
      class: "nuxt-loading-indicator",
      style: {
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        pointerEvents: "none",
        width: "auto",
        height: `${props.height}px`,
        opacity: isLoading.value ? 1 : 0,
        background: props.color || void 0,
        backgroundSize: `${100 / progress.value * 100}% auto`,
        transform: `scaleX(${progress.value}%)`,
        transformOrigin: "left",
        transition: "transform 0.1s, height 0.4s, opacity 0.4s",
        zIndex: 999999
      }
    }, slots);
  }
});
const layouts = {
  default: () => import('./_nuxt/default-AL0I8_Hr.mjs').then((m) => m.default || m)
};
const LayoutLoader = defineComponent$1({
  name: "LayoutLoader",
  inheritAttrs: false,
  props: {
    name: String,
    layoutProps: Object
  },
  async setup(props, context) {
    const LayoutComponent = await layouts[props.name]().then((r) => r.default || r);
    return () => h(LayoutComponent, props.layoutProps, context.slots);
  }
});
const __nuxt_component_1 = defineComponent$1({
  name: "NuxtLayout",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean, Object],
      default: null
    },
    fallback: {
      type: [String, Object],
      default: null
    }
  },
  setup(props, context) {
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    const injectedRoute = inject$1(PageRouteSymbol);
    const route = injectedRoute === useRoute$1() ? useRoute$2() : injectedRoute;
    const layout = computed(() => {
      let layout2 = unref(props.name) ?? route.meta.layout ?? "default";
      if (layout2 && !(layout2 in layouts)) {
        if (props.fallback) {
          layout2 = unref(props.fallback);
        }
      }
      return layout2;
    });
    const layoutRef = ref();
    context.expose({ layoutRef });
    const done = nuxtApp.deferHydration();
    return () => {
      const hasLayout = layout.value && layout.value in layouts;
      const transitionProps = route.meta.layoutTransition ?? appLayoutTransition;
      return _wrapIf(Transition, hasLayout && transitionProps, {
        default: () => h(Suspense, { suspensible: true, onResolve: () => {
          nextTick(done);
        } }, {
          default: () => h(
            LayoutProvider,
            {
              layoutProps: mergeProps(context.attrs, { ref: layoutRef }),
              key: layout.value || void 0,
              name: layout.value,
              shouldProvide: !props.name,
              hasTransition: !!transitionProps
            },
            context.slots
          )
        })
      }).default();
    };
  }
});
const LayoutProvider = defineComponent$1({
  name: "NuxtLayoutProvider",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean]
    },
    layoutProps: {
      type: Object
    },
    hasTransition: {
      type: Boolean
    },
    shouldProvide: {
      type: Boolean
    }
  },
  setup(props, context) {
    const name = props.name;
    if (props.shouldProvide) {
      provide(LayoutMetaSymbol, {
        isCurrent: (route) => name === (route.meta.layout ?? "default")
      });
    }
    return () => {
      var _a2, _b2;
      if (!name || typeof name === "string" && !(name in layouts)) {
        return (_b2 = (_a2 = context.slots).default) == null ? void 0 : _b2.call(_a2);
      }
      return h(
        LayoutLoader,
        { key: name, layoutProps: props.layoutProps, name },
        context.slots
      );
    };
  }
});
const RouteProvider = defineComponent$1({
  props: {
    vnode: {
      type: Object,
      required: true
    },
    route: {
      type: Object,
      required: true
    },
    vnodeRef: Object,
    renderKey: String,
    trackRootNodes: Boolean
  },
  setup(props) {
    const previousKey = props.renderKey;
    const previousRoute = props.route;
    const route = {};
    for (const key in props.route) {
      Object.defineProperty(route, key, {
        get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key]
      });
    }
    provide(PageRouteSymbol, shallowReactive(route));
    return () => {
      return h(props.vnode, { ref: props.vnodeRef });
    };
  }
});
const __nuxt_component_4 = defineComponent$1({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs, expose }) {
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    const pageRef = ref();
    const forkRoute = inject$1(PageRouteSymbol, null);
    let previousPageKey;
    expose({ pageRef });
    inject$1(LayoutMetaSymbol, null);
    let vnode;
    const done = nuxtApp.deferHydration();
    if (props.pageKey) {
      watch(() => props.pageKey, (next, prev) => {
        if (next !== prev) {
          nuxtApp.callHook("page:loading:start");
        }
      });
    }
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          if (!routeProps.Component) {
            done();
            return;
          }
          const key = generateRouteKey$1(routeProps, props.pageKey);
          if (!nuxtApp.isHydrating && !hasChildrenRoutes(forkRoute, routeProps.route, routeProps.Component) && previousPageKey === key) {
            nuxtApp.callHook("page:loading:end");
          }
          previousPageKey = key;
          const hasTransition = !!(props.transition ?? routeProps.route.meta.pageTransition ?? appPageTransition);
          const transitionProps = hasTransition && _mergeTransitionProps([
            props.transition,
            routeProps.route.meta.pageTransition,
            appPageTransition,
            { onAfterLeave: () => {
              nuxtApp.callHook("page:transition:finish", routeProps.Component);
            } }
          ].filter(Boolean));
          const keepaliveConfig = props.keepalive ?? routeProps.route.meta.keepalive ?? appKeepalive;
          vnode = _wrapIf(
            Transition,
            hasTransition && transitionProps,
            wrapInKeepAlive(
              keepaliveConfig,
              h(Suspense, {
                suspensible: true,
                onPending: () => nuxtApp.callHook("page:start", routeProps.Component),
                onResolve: () => {
                  nextTick(() => nuxtApp.callHook("page:finish", routeProps.Component).then(() => nuxtApp.callHook("page:loading:end")).finally(done));
                }
              }, {
                default: () => {
                  const providerVNode = h(RouteProvider, {
                    key: key || void 0,
                    vnode: routeProps.Component,
                    route: routeProps.route,
                    renderKey: key || void 0,
                    trackRootNodes: hasTransition,
                    vnodeRef: pageRef
                  });
                  return providerVNode;
                }
              })
            )
          ).default();
          return vnode;
        }
      });
    };
  }
});
function _mergeTransitionProps(routeProps) {
  const _props = routeProps.map((prop) => ({
    ...prop,
    onAfterLeave: prop.onAfterLeave ? toArray$1(prop.onAfterLeave) : void 0
  }));
  return defu(..._props);
}
function hasChildrenRoutes(fork, newRoute, Component) {
  if (!fork) {
    return false;
  }
  const index = newRoute.matched.findIndex((m) => {
    var _a2;
    return ((_a2 = m.components) == null ? void 0 : _a2.default) === (Component == null ? void 0 : Component.type);
  });
  return index < newRoute.matched.length - 1;
}
function defineRobotMeta(component) {
  var _a2, _b2, _c;
  const vm = getCurrentInstance$1();
  if (vm) {
    const src = (component ? (_b2 = (_a2 = vm == null ? void 0 : vm.parent) == null ? void 0 : _a2.type) == null ? void 0 : _b2.__file : (_c = vm == null ? void 0 : vm.type) == null ? void 0 : _c.__file) || "";
    const filePath = join(dirname(src).split("/").pop() || "", basename(src));
    consola.warn(`[Nuxt Simple Robots] The \`<meta name="robots">\` tag is now enabled by default. \`${component ? "<RobotsMeta />" : "defineRobotMeta()"}\` is deprecated, you should remove it from \`${filePath}\`.`);
  }
}
async function imageMeta(_ctx, url) {
  const meta = await _imageMeta(url).catch((err) => {
    console.error("Failed to get image meta for " + url, err + "");
    return {
      width: 0,
      height: 0,
      ratio: 0
    };
  });
  return meta;
}
async function _imageMeta(url) {
  {
    const imageMeta2 = await import('image-meta').then((r) => r.imageMeta);
    const data = await fetch(url).then((res) => res.buffer());
    const metadata = imageMeta2(data);
    if (!metadata) {
      throw new Error(`No metadata could be extracted from the image \`${url}\`.`);
    }
    const { width, height } = metadata;
    const meta = {
      width,
      height,
      ratio: width && height ? width / height : void 0
    };
    return meta;
  }
}
function createMapper(map) {
  return (key) => {
    return key ? map[key] || key : map.missingValue;
  };
}
function createOperationsGenerator({ formatter, keyMap, joinWith = "/", valueMap } = {}) {
  if (!formatter) {
    formatter = (key, value) => `${key}=${value}`;
  }
  if (keyMap && typeof keyMap !== "function") {
    keyMap = createMapper(keyMap);
  }
  const map = valueMap || {};
  Object.keys(map).forEach((valueKey) => {
    if (typeof map[valueKey] !== "function") {
      map[valueKey] = createMapper(map[valueKey]);
    }
  });
  return (modifiers = {}) => {
    const operations = Object.entries(modifiers).filter(([_, value]) => typeof value !== "undefined").map(([key, value]) => {
      const mapper = map[key];
      if (typeof mapper === "function") {
        value = mapper(modifiers[key]);
      }
      key = typeof keyMap === "function" ? keyMap(key) : key;
      return formatter(key, value);
    });
    return operations.join(joinWith);
  };
}
function parseSize(input = "") {
  if (typeof input === "number") {
    return input;
  }
  if (typeof input === "string") {
    if (input.replace("px", "").match(/^\d+$/g)) {
      return parseInt(input, 10);
    }
  }
}
function parseDensities(input = "") {
  if (input === void 0 || !input.length) {
    return [];
  }
  const densities = /* @__PURE__ */ new Set();
  for (const density of input.split(" ")) {
    const d = parseInt(density.replace("x", ""));
    if (d) {
      densities.add(d);
    }
  }
  return Array.from(densities);
}
function checkDensities(densities) {
  if (densities.length === 0) {
    throw new Error("`densities` must not be empty, configure to `1` to render regular size only (DPR 1.0)");
  }
}
function parseSizes(input) {
  const sizes = {};
  if (typeof input === "string") {
    for (const entry2 of input.split(/[\s,]+/).filter((e) => e)) {
      const s = entry2.split(":");
      if (s.length !== 2) {
        sizes["1px"] = s[0].trim();
      } else {
        sizes[s[0].trim()] = s[1].trim();
      }
    }
  } else {
    Object.assign(sizes, input);
  }
  return sizes;
}
function createImage(globalOptions) {
  const ctx = {
    options: globalOptions
  };
  const getImage2 = (input, options = {}) => {
    const image = resolveImage(ctx, input, options);
    return image;
  };
  const $img = (input, modifiers = {}, options = {}) => {
    return getImage2(input, {
      ...options,
      modifiers: defu(modifiers, options.modifiers || {})
    }).url;
  };
  for (const presetName in globalOptions.presets) {
    $img[presetName] = (source, modifiers, options) => $img(source, modifiers, { ...globalOptions.presets[presetName], ...options });
  }
  $img.options = globalOptions;
  $img.getImage = getImage2;
  $img.getMeta = (input, options) => getMeta(ctx, input, options);
  $img.getSizes = (input, options) => getSizes(ctx, input, options);
  ctx.$img = $img;
  return $img;
}
async function getMeta(ctx, input, options) {
  const image = resolveImage(ctx, input, { ...options });
  if (typeof image.getMeta === "function") {
    return await image.getMeta();
  } else {
    return await imageMeta(ctx, image.url);
  }
}
function resolveImage(ctx, input, options) {
  var _a2, _b2;
  if (typeof input !== "string" || input === "") {
    throw new TypeError(`input must be a string (received ${typeof input}: ${JSON.stringify(input)})`);
  }
  if (input.startsWith("data:")) {
    return {
      url: input
    };
  }
  const { provider, defaults: defaults2 } = getProvider(ctx, options.provider || ctx.options.provider);
  const preset = getPreset(ctx, options.preset);
  input = hasProtocol(input) ? input : withLeadingSlash(input);
  if (!provider.supportsAlias) {
    for (const base in ctx.options.alias) {
      if (input.startsWith(base)) {
        input = joinURL(ctx.options.alias[base], input.substr(base.length));
      }
    }
  }
  if (provider.validateDomains && hasProtocol(input)) {
    const inputHost = parseURL(input).host;
    if (!ctx.options.domains.find((d) => d === inputHost)) {
      return {
        url: input
      };
    }
  }
  const _options = defu(options, preset, defaults2);
  _options.modifiers = { ..._options.modifiers };
  const expectedFormat = _options.modifiers.format;
  if ((_a2 = _options.modifiers) == null ? void 0 : _a2.width) {
    _options.modifiers.width = parseSize(_options.modifiers.width);
  }
  if ((_b2 = _options.modifiers) == null ? void 0 : _b2.height) {
    _options.modifiers.height = parseSize(_options.modifiers.height);
  }
  const image = provider.getImage(input, _options, ctx);
  image.format = image.format || expectedFormat || "";
  return image;
}
function getProvider(ctx, name) {
  const provider = ctx.options.providers[name];
  if (!provider) {
    throw new Error("Unknown provider: " + name);
  }
  return provider;
}
function getPreset(ctx, name) {
  if (!name) {
    return {};
  }
  if (!ctx.options.presets[name]) {
    throw new Error("Unknown preset: " + name);
  }
  return ctx.options.presets[name];
}
function getSizes(ctx, input, opts) {
  var _a2, _b2, _c, _d, _e;
  const width = parseSize((_a2 = opts.modifiers) == null ? void 0 : _a2.width);
  const height = parseSize((_b2 = opts.modifiers) == null ? void 0 : _b2.height);
  const sizes = parseSizes(opts.sizes);
  const densities = ((_c = opts.densities) == null ? void 0 : _c.trim()) ? parseDensities(opts.densities.trim()) : ctx.options.densities;
  checkDensities(densities);
  const hwRatio = width && height ? height / width : 0;
  const sizeVariants = [];
  const srcsetVariants = [];
  if (Object.keys(sizes).length >= 1) {
    for (const key in sizes) {
      const variant = getSizesVariant(key, String(sizes[key]), height, hwRatio, ctx);
      if (variant === void 0) {
        continue;
      }
      sizeVariants.push({
        size: variant.size,
        screenMaxWidth: variant.screenMaxWidth,
        media: `(max-width: ${variant.screenMaxWidth}px)`
      });
      for (const density of densities) {
        srcsetVariants.push({
          width: variant._cWidth * density,
          src: getVariantSrc(ctx, input, opts, variant, density)
        });
      }
    }
    finaliseSizeVariants(sizeVariants);
  } else {
    for (const density of densities) {
      const key = Object.keys(sizes)[0];
      let variant = getSizesVariant(key, String(sizes[key]), height, hwRatio, ctx);
      if (variant === void 0) {
        variant = {
          size: "",
          screenMaxWidth: 0,
          _cWidth: (_d = opts.modifiers) == null ? void 0 : _d.width,
          _cHeight: (_e = opts.modifiers) == null ? void 0 : _e.height
        };
      }
      srcsetVariants.push({
        width: density,
        src: getVariantSrc(ctx, input, opts, variant, density)
      });
    }
  }
  finaliseSrcsetVariants(srcsetVariants);
  const defaultVariant = srcsetVariants[srcsetVariants.length - 1];
  const sizesVal = sizeVariants.length ? sizeVariants.map((v) => `${v.media ? v.media + " " : ""}${v.size}`).join(", ") : void 0;
  const suffix = sizesVal ? "w" : "x";
  const srcsetVal = srcsetVariants.map((v) => `${v.src} ${v.width}${suffix}`).join(", ");
  return {
    sizes: sizesVal,
    srcset: srcsetVal,
    src: defaultVariant == null ? void 0 : defaultVariant.src
  };
}
function getSizesVariant(key, size, height, hwRatio, ctx) {
  const screenMaxWidth = ctx.options.screens && ctx.options.screens[key] || parseInt(key);
  const isFluid = size.endsWith("vw");
  if (!isFluid && /^\d+$/.test(size)) {
    size = size + "px";
  }
  if (!isFluid && !size.endsWith("px")) {
    return void 0;
  }
  let _cWidth = parseInt(size);
  if (!screenMaxWidth || !_cWidth) {
    return void 0;
  }
  if (isFluid) {
    _cWidth = Math.round(_cWidth / 100 * screenMaxWidth);
  }
  const _cHeight = hwRatio ? Math.round(_cWidth * hwRatio) : height;
  return {
    size,
    screenMaxWidth,
    _cWidth,
    _cHeight
  };
}
function getVariantSrc(ctx, input, opts, variant, density) {
  return ctx.$img(
    input,
    {
      ...opts.modifiers,
      width: variant._cWidth ? variant._cWidth * density : void 0,
      height: variant._cHeight ? variant._cHeight * density : void 0
    },
    opts
  );
}
function finaliseSizeVariants(sizeVariants) {
  var _a2;
  sizeVariants.sort((v1, v2) => v1.screenMaxWidth - v2.screenMaxWidth);
  let previousMedia = null;
  for (let i = sizeVariants.length - 1; i >= 0; i--) {
    const sizeVariant = sizeVariants[i];
    if (sizeVariant.media === previousMedia) {
      sizeVariants.splice(i, 1);
    }
    previousMedia = sizeVariant.media;
  }
  for (let i = 0; i < sizeVariants.length; i++) {
    sizeVariants[i].media = ((_a2 = sizeVariants[i + 1]) == null ? void 0 : _a2.media) || "";
  }
}
function finaliseSrcsetVariants(srcsetVariants) {
  srcsetVariants.sort((v1, v2) => v1.width - v2.width);
  let previousWidth = null;
  for (let i = srcsetVariants.length - 1; i >= 0; i--) {
    const sizeVariant = srcsetVariants[i];
    if (sizeVariant.width === previousWidth) {
      srcsetVariants.splice(i, 1);
    }
    previousWidth = sizeVariant.width;
  }
}
const operationsGenerator$1 = createOperationsGenerator({
  keyMap: {
    height: "h",
    fit: "nf_resize",
    width: "w"
  },
  valueMap: {
    fit: {
      fill: "smartcrop",
      contain: "fit"
    }
  },
  joinWith: "&",
  formatter: (key, value) => `${key}=${value}`
});
const getImage$1 = (src, { modifiers = {}, baseURL: baseURL2 = "/" } = {}) => {
  if (modifiers.format) {
    delete modifiers.format;
  }
  const hasTransformation = modifiers.height || modifiers.width;
  if (!modifiers.fit && hasTransformation) {
    modifiers.fit = "contain";
  }
  if (hasTransformation && modifiers.fit !== "contain" && !(modifiers.height && modifiers.width)) {
    modifiers.fit = "contain";
  }
  const operations = operationsGenerator$1(modifiers);
  return {
    url: joinURL(baseURL2, src + (operations ? "?" + operations : ""))
  };
};
const netlifyRuntime$9rL9QZkDQ7 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  getImage: getImage$1,
  operationsGenerator: operationsGenerator$1
});
const operationsGenerator = createOperationsGenerator({
  keyMap: {
    format: "f",
    fit: "fit",
    width: "w",
    height: "h",
    resize: "s",
    quality: "q",
    background: "b"
  },
  joinWith: "&",
  formatter: (key, val) => encodeParam(key) + "_" + encodeParam(val)
});
const getImage = (src, { modifiers = {}, baseURL: baseURL2 } = {}, ctx) => {
  if (modifiers.width && modifiers.height) {
    modifiers.resize = `${modifiers.width}x${modifiers.height}`;
    delete modifiers.width;
    delete modifiers.height;
  }
  const params = operationsGenerator(modifiers) || "_";
  if (!baseURL2) {
    baseURL2 = joinURL(ctx.options.nuxt.baseURL, "/_ipx");
  }
  return {
    url: joinURL(baseURL2, params, encodePath(src))
  };
};
const validateDomains = true;
const supportsAlias = true;
const ipxRuntime$IKQ59tcGIP = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  getImage,
  supportsAlias,
  validateDomains
});
const imageOptions = {
  "screens": {
    "xs": 320,
    "sm": 640,
    "md": 768,
    "lg": 1024,
    "xl": 1280,
    "xxl": 1536,
    "2xl": 1536
  },
  "presets": {
    "avatar": {
      "modifiers": {
        "format": "webp",
        "width": 80,
        "height": 80
      }
    }
  },
  "provider": "ipx",
  "domains": [
    "images.unsplash.com",
    "fakestoreapi.com",
    "res.cloudinary.com",
    "avatars.githubusercontent.com",
    "gravatar.com"
  ],
  "alias": {
    "/unsplash": "https://images.unsplash.com"
  },
  "densities": [
    1,
    2
  ],
  "format": [
    "webp, png, jpg",
    "webp"
  ]
};
imageOptions.providers = {
  ["netlify"]: { provider: netlifyRuntime$9rL9QZkDQ7, defaults: { "baseURL": "https://pg-nuxt-vuetify-tailwindcss.netlify.app" } },
  ["ipx"]: { provider: ipxRuntime$IKQ59tcGIP, defaults: {} }
};
const useImage = () => {
  const config = /* @__PURE__ */ useRuntimeConfig();
  const nuxtApp = /* @__PURE__ */ useNuxtApp();
  return nuxtApp.$img || nuxtApp._img || (nuxtApp._img = createImage({
    ...imageOptions,
    nuxt: {
      baseURL: config.app.baseURL
    }
  }));
};
const useOptimizeImage = () => {
  const img = useImage();
  const optimizeImage = (src, optionsWithSizes = {}, bgStyles = false) => {
    const {
      sizes = "xs:100vw sm:100vw md:100vw lg:100vw xl:100vw",
      ...optionsWithPlaceholder
    } = optionsWithSizes;
    const {
      placeholder = {
        width: 10,
        height: 10,
        quality: 50,
        blur: 3
      },
      ...options
    } = optionsWithPlaceholder;
    const resolvedImage = img.getImage(src, {
      ...options
    });
    const placeholderImage = placeholder && img.getImage(src, {
      ...options,
      placeholder
    });
    const imageSizes = img.getSizes(src, {
      ...options,
      sizes
    });
    const imageOptimized = Object.assign(
      {},
      {
        src: resolvedImage.url,
        lazySrc: placeholderImage == null ? void 0 : placeholderImage.url,
        ...imageSizes
      }
    );
    if (bgStyles) {
      try {
        const responsiveImages = computed(() => {
          return imageOptimized.srcset.split(", ").filter(
            (imgUrl) => imgUrl.endsWith("768w") || imgUrl.endsWith("2560w")
          );
        });
        const responsiveImageSrc = `url("${responsiveImages.value[0]}")`;
        const responsiveImageSrcImageSet = `image-set(url("${responsiveImages.value[0]}") 1x,url("${responsiveImages.value[1]}") 2x)`;
        const responsiveImageSrcImageSetFallback = `-webkit-image-set(url("${responsiveImages.value[0]}") 1x,url("${responsiveImages.value[1]}") 2x)`;
        imageOptimized.bgStyles = [
          responsiveImageSrc,
          responsiveImageSrcImageSet,
          responsiveImageSrcImageSetFallback
        ].reduce((acc, bgStyle) => {
          return `${acc}background-image:${bgStyle};`;
        }, "");
      } catch (err) {
        console.log(err);
      }
    }
    return imageOptimized;
  };
  return {
    optimizeImage
  };
};
const heroImageUrl = pg_background_urls["design-image-large"];
const primary = (_a = pg_colors.primary) == null ? void 0 : _a.DEFAULT;
const secondary = (_b = pg_colors.secondary) == null ? void 0 : _b.DEFAULT;
const _sfc_main$2 = /* @__PURE__ */ defineComponent$1({
  __name: "app",
  __ssrInlineRender: true,
  setup(__props) {
    defineRobotMeta();
    const { name, logo, description, author, twitter } = site;
    const fromBg = secondary;
    const toBg = primary;
    const ogImageOptions = {
      component: "ThePage",
      title: name,
      // description: '', // use page description instead
      summary: description,
      fromBg,
      toBg,
      // image: '~/assets/images/hero1.jpg',
      logo,
      author,
      twitter
    };
    useSchemaOrg([
      defineWebSite({
        name: site.name
      }),
      defineWebPage()
    ]);
    const route = useRoute$1();
    const ogImage = computed(() => route.meta.ogImage || heroImageUrl);
    const { optimizeImage } = useOptimizeImage();
    const theOgImageOptimized = {
      alt: `hero`,
      cover: true,
      ...optimizeImage(
        ogImage.value,
        /* options */
        {
          modifiers: {
            width: 1200,
            height: 600,
            fit: "fill"
            // can be cover, contain, fill, inside, outside
          },
          /* If using local images instead of unsplash url, enable netlify provider */
          // provider:
          //     "production" === 'production'
          //       ? 'netlify'
          //       : null /* defaults to ipx or ipxStatic */,
          placeholder: false
          // placeholder image before the actual image is fully loaded.
        }
      )
    };
    const theOgImage = theOgImageOptimized.src;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HeadAndMeta = _sfc_main$3;
      const _component_OgImage = __nuxt_component_1$1;
      const _component_NuxtLoadingIndicator = __nuxt_component_0;
      const _component_NuxtLayout = __nuxt_component_1;
      const _component_NuxtPage = __nuxt_component_4;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_HeadAndMeta, null, null, _parent));
      _push(ssrRenderComponent(_component_OgImage, mergeProps({ image: unref(theOgImage) }, ogImageOptions), null, _parent));
      _push(ssrRenderComponent(_component_NuxtLoadingIndicator, null, null, _parent));
      _push(ssrRenderComponent(_component_NuxtLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtPage, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtPage)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "error",
  __ssrInlineRender: true,
  props: {
    error: {
      type: Object,
      default() {
        return {
          url: "-",
          statusCode: 404,
          statusMessage: "Not Found",
          message: "(404 Not Found)",
          stack: "",
          data: '{"error":"FetchError:  (404 Not Found)"}'
        };
      }
    }
  },
  setup(__props) {
    const props = __props;
    const message = computed(() => {
      var _a2;
      return String(((_a2 = props.error) == null ? void 0 : _a2.message) || "");
    });
    const is404 = computed(
      () => {
        var _a2, _b2;
        return ((_a2 = props.error) == null ? void 0 : _a2.statusCode) === 404 || ((_b2 = message.value) == null ? void 0 : _b2.includes("404"));
      }
    );
    const isDev2 = false;
    function handleError() {
      return clearError({ redirect: "/" });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLoadingIndicator = __nuxt_component_0;
      const _component_NuxtLayout = __nuxt_component_1;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_NuxtLoadingIndicator, null, null, _parent));
      _push(ssrRenderComponent(_component_NuxtLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div style="${ssrRenderStyle({ "display": "flex", "flex-direction": "column", "gap": "1rem", "align-items": "center", "justify-content": "center", "margin-top": "3rem", "margin-bottom": "3rem", "text-align": "center" })}"${_scopeId}><div style="${ssrRenderStyle({ "font-size": "1.875rem", "line-height": "2.25rem" })}"${_scopeId}>${ssrInterpolate(unref(is404) ? "This page could not be found" : "An error occurred")}</div><div style="${ssrRenderStyle({ "font-size": "1.25rem", "line-height": "1.75rem opacity: 0.5" })}"${_scopeId}> Looks like you&#39;ve followed a broken link or entered a URL that doesn&#39;t exist on this site. </div>`);
            if (unref(isDev2)) {
              _push2(`<pre style="${ssrRenderStyle({ "width": "100%", "white-space": "normal" })}"${_scopeId}>${ssrInterpolate(__props.error)}</pre>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<button style="${ssrRenderStyle({ "background-color": "gray", "padding-left": "12px", "padding-right": "12px", "padding-top": "6px", "padding-bottom": "6px", "font-size": "0.875rem !important", "line-height": "1.25rem", "font-weight": "500 !important", "letter-spacing": "0.0178571429em !important", "text-transform": "none !important", "border-radius": "0.5rem !important" })}"${_scopeId}> &lt; Go Back </button></div>`);
          } else {
            return [
              createVNode("div", { style: { "display": "flex", "flex-direction": "column", "gap": "1rem", "align-items": "center", "justify-content": "center", "margin-top": "3rem", "margin-bottom": "3rem", "text-align": "center" } }, [
                createVNode("div", { style: { "font-size": "1.875rem", "line-height": "2.25rem" } }, toDisplayString(unref(is404) ? "This page could not be found" : "An error occurred"), 1),
                createVNode("div", { style: { "font-size": "1.25rem", "line-height": "1.75rem opacity: 0.5" } }, " Looks like you've followed a broken link or entered a URL that doesn't exist on this site. "),
                unref(isDev2) ? (openBlock(), createBlock("pre", {
                  key: 0,
                  style: { "width": "100%", "white-space": "normal" }
                }, toDisplayString(__props.error), 1)) : createCommentVNode("", true),
                createVNode("button", {
                  style: { "background-color": "gray", "padding-left": "12px", "padding-right": "12px", "padding-top": "6px", "padding-bottom": "6px", "font-size": "0.875rem !important", "line-height": "1.25rem", "font-weight": "500 !important", "letter-spacing": "0.0178571429em !important", "text-transform": "none !important", "border-radius": "0.5rem !important" },
                  onClick: handleError
                }, " < Go Back ")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("error.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = defineAsyncComponent(() => import('./_nuxt/island-renderer-lbsADNxE.mjs').then((r) => r.default || r));
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute$1());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p2 = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p2);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(error)) {
            _push(ssrRenderComponent(unref(_sfc_main$1), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(_sfc_main$2), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(_sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (err) {
      await nuxt.hooks.callHook("app:error", err);
      nuxt.payload.error = nuxt.payload.error || err;
    }
    if (ssrContext == null ? void 0 : ssrContext._renderResponse) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry$1 = (ssrContext) => entry(ssrContext);

export { makeSizeProps as $, provideDefaults as A, VDefaultsProvider as B, convertToUnit as C, VExpandTransition as D, VAvatar as E, useProxiedModel as F, makeDisplayProps as G, makeGroupProps as H, IconValue as I, useDisplay as J, useGroup as K, useResizeObserver as L, VFadeTransition as M, focusableChildren as N, clamp as O, makeGroupItemProps as P, useGroupItem as Q, VSheet as R, VScaleTransition as S, selectiveClient as T, useRequestEvent as U, VImg as V, useNuxtApp as W, prerenderRoutes as X, useRuntimeConfig as Y, site as Z, makeDensityProps as _, makeTagProps as a, toPhysical as a$, useLocale as a0, createRange as a1, getUid as a2, deepEqual as a3, Ripple as a4, filterInputAttrs as a5, useDensity as a6, wrapInArray as a7, useTextColor as a8, matchesSelector as a9, MaybeTransition as aA, VSlideYTransition as aB, getCurrentInstanceName as aC, EventProp as aD, makeLoaderProps as aE, useLoader as aF, LoaderSlot as aG, VExpandXTransition as aH, pick as aI, Intersect$1 as aJ, callEvent as aK, useRouter$1 as aL, nuxtLinkDefaults as aM, navigateTo as aN, createSimpleFunctional as aO, makeLocationProps as aP, makePositionProps as aQ, makeRouterProps as aR, makeVariantProps as aS, useVariant as aT, useLocation as aU, usePosition as aV, useLink as aW, genOverlays as aX, asyncDataDefaults as aY, findChildrenWithProvide as aZ, breakpoints as a_, omit as aa, getNextElement as ab, focusChild as ac, debounce as ad, makeDimensionProps as ae, getCurrentInstance as af, useDimension as ag, useToggleScope as ah, makeTransitionProps$1 as ai, ensureValidVNode as aj, fetchDefaults as ak, useRequestFetch as al, isOn as am, eventName as an, defer as ao, destructComputed as ap, parseAnchor as aq, flipSide as ar, flipAlign as as, flipCorner as at, consoleError as au, getAxis as av, refElement as aw, IN_BROWSER as ax, ClickOutside as ay, useRouter as az, useRender as b, VBadge as b0, useTheme as b1, VBtnToggleSymbol as b2, defineComponent as b3, deprecate as b4, getPropertyFromItem as b5, useCookie as b6, defineAppConfig as b7, useOgImageRuntimeConfig as b8, useSiteConfig as b9, createError as c, VChip as d, entry$1 as default, useOptimizeImage as e, useRoute$1 as f, genericComponent as g, useHead as h, useServerHead as i, useState as j, VBtn as k, defineStore as l, makeComponentProps as m, VIcon as n, VSpacer as o, propsFactory as p, makeBorderProps as q, makeElevationProps as r, makeRoundedProps as s, makeThemeProps as t, useRtl as u, useBackgroundColor as v, useBorder as w, useElevation as x, useRounded as y, provideTheme as z };
