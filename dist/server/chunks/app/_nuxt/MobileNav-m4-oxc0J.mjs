import { p as publicAssetsURL } from '../../handlers/renderer.mjs';
import { inject, provide, shallowRef, computed, ref, reactive, capitalize, h, toRef, watch, nextTick, createVNode, Fragment, mergeProps, Transition, useSSRContext, withCtx, createTextVNode, toDisplayString, openBlock, createBlock, renderList } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-yVxbj29m.mjs';
import { p as propsFactory, a2 as getUid, af as getCurrentInstance, L as useResizeObserver, C as convertToUnit, aZ as findChildrenWithProvide, a_ as breakpoints, m as makeComponentProps, a as makeTagProps, g as genericComponent, q as makeBorderProps, G as makeDisplayProps, r as makeElevationProps, s as makeRoundedProps, t as makeThemeProps, u as useRtl, z as provideTheme, w as useBorder, v as useBackgroundColor, x as useElevation, J as useDisplay, y as useRounded, az as useRouter, F as useProxiedModel, a$ as toPhysical, ah as useToggleScope, A as provideDefaults, b as useRender, _ as makeDensityProps, H as makeGroupProps, b1 as useTheme, a6 as useDensity, K as useGroup, b2 as VBtnToggleSymbol, V as VImg, n as VIcon, k as VBtn, b0 as VBadge } from '../server.mjs';
import { u as useSsrBoot, c as useScopeId, a as VList, b as VListItem, d as VListItemTitle } from './scopeId-RSGnEtwA.mjs';
import { V as VCard } from './VCard-Ufe3nPRD.mjs';

const VuetifyLayoutKey = Symbol.for("vuetify:layout");
const VuetifyLayoutItemKey = Symbol.for("vuetify:layout-item");
const ROOT_ZINDEX = 1e3;
const makeLayoutProps = propsFactory({
  overlaps: {
    type: Array,
    default: () => []
  },
  fullHeight: Boolean
}, "layout");
const makeLayoutItemProps = propsFactory({
  name: {
    type: String
  },
  order: {
    type: [Number, String],
    default: 0
  },
  absolute: Boolean
}, "layout-item");
function useLayout() {
  const layout = inject(VuetifyLayoutKey);
  if (!layout)
    throw new Error("[Vuetify] Could not find injected layout");
  return {
    getLayoutItem: layout.getLayoutItem,
    mainRect: layout.mainRect,
    mainStyles: layout.mainStyles
  };
}
function useLayoutItem(options) {
  var _a;
  const layout = inject(VuetifyLayoutKey);
  if (!layout)
    throw new Error("[Vuetify] Could not find injected layout");
  const id = (_a = options.id) != null ? _a : `layout-item-${getUid()}`;
  const vm = getCurrentInstance("useLayoutItem");
  provide(VuetifyLayoutItemKey, {
    id
  });
  const isKeptAlive = shallowRef(false);
  const {
    layoutItemStyles,
    layoutItemScrimStyles
  } = layout.register(vm, {
    ...options,
    active: computed(() => isKeptAlive.value ? false : options.active.value),
    id
  });
  return {
    layoutItemStyles,
    layoutRect: layout.layoutRect,
    layoutItemScrimStyles
  };
}
const generateLayers = (layout, positions, layoutSizes, activeItems) => {
  let previousLayer = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  };
  const layers = [{
    id: "",
    layer: {
      ...previousLayer
    }
  }];
  for (const id of layout) {
    const position = positions.get(id);
    const amount = layoutSizes.get(id);
    const active = activeItems.get(id);
    if (!position || !amount || !active)
      continue;
    const layer = {
      ...previousLayer,
      [position.value]: parseInt(previousLayer[position.value], 10) + (active.value ? parseInt(amount.value, 10) : 0)
    };
    layers.push({
      id,
      layer
    });
    previousLayer = layer;
  }
  return layers;
};
function createLayout(props) {
  const parentLayout = inject(VuetifyLayoutKey, null);
  const rootZIndex = computed(() => parentLayout ? parentLayout.rootZIndex.value - 100 : ROOT_ZINDEX);
  const registered = ref([]);
  const positions = reactive(/* @__PURE__ */ new Map());
  const layoutSizes = reactive(/* @__PURE__ */ new Map());
  const priorities = reactive(/* @__PURE__ */ new Map());
  const activeItems = reactive(/* @__PURE__ */ new Map());
  const disabledTransitions = reactive(/* @__PURE__ */ new Map());
  const {
    resizeRef,
    contentRect: layoutRect
  } = useResizeObserver();
  const computedOverlaps = computed(() => {
    var _a;
    const map = /* @__PURE__ */ new Map();
    const overlaps = (_a = props.overlaps) != null ? _a : [];
    for (const overlap of overlaps.filter((item) => item.includes(":"))) {
      const [top, bottom] = overlap.split(":");
      if (!registered.value.includes(top) || !registered.value.includes(bottom))
        continue;
      const topPosition = positions.get(top);
      const bottomPosition = positions.get(bottom);
      const topAmount = layoutSizes.get(top);
      const bottomAmount = layoutSizes.get(bottom);
      if (!topPosition || !bottomPosition || !topAmount || !bottomAmount)
        continue;
      map.set(bottom, {
        position: topPosition.value,
        amount: parseInt(topAmount.value, 10)
      });
      map.set(top, {
        position: bottomPosition.value,
        amount: -parseInt(bottomAmount.value, 10)
      });
    }
    return map;
  });
  const layers = computed(() => {
    const uniquePriorities = [...new Set([...priorities.values()].map((p) => p.value))].sort((a, b) => a - b);
    const layout = [];
    for (const p of uniquePriorities) {
      const items2 = registered.value.filter((id) => {
        var _a;
        return ((_a = priorities.get(id)) == null ? void 0 : _a.value) === p;
      });
      layout.push(...items2);
    }
    return generateLayers(layout, positions, layoutSizes, activeItems);
  });
  const transitionsEnabled = computed(() => {
    return !Array.from(disabledTransitions.values()).some((ref2) => ref2.value);
  });
  const mainRect = computed(() => {
    return layers.value[layers.value.length - 1].layer;
  });
  const mainStyles = computed(() => {
    return {
      "--v-layout-left": convertToUnit(mainRect.value.left),
      "--v-layout-right": convertToUnit(mainRect.value.right),
      "--v-layout-top": convertToUnit(mainRect.value.top),
      "--v-layout-bottom": convertToUnit(mainRect.value.bottom),
      ...transitionsEnabled.value ? void 0 : {
        transition: "none"
      }
    };
  });
  const items = computed(() => {
    return layers.value.slice(1).map((_ref, index) => {
      let {
        id
      } = _ref;
      const {
        layer
      } = layers.value[index];
      const size = layoutSizes.get(id);
      const position = positions.get(id);
      return {
        id,
        ...layer,
        size: Number(size.value),
        position: position.value
      };
    });
  });
  const getLayoutItem = (id) => {
    return items.value.find((item) => item.id === id);
  };
  const rootVm = getCurrentInstance("createLayout");
  const isMounted = shallowRef(false);
  provide(VuetifyLayoutKey, {
    register: (vm, _ref2) => {
      let {
        id,
        order,
        position,
        layoutSize,
        elementSize,
        active,
        disableTransitions,
        absolute
      } = _ref2;
      priorities.set(id, order);
      positions.set(id, position);
      layoutSizes.set(id, layoutSize);
      activeItems.set(id, active);
      disableTransitions && disabledTransitions.set(id, disableTransitions);
      const instances = findChildrenWithProvide(VuetifyLayoutItemKey, rootVm == null ? void 0 : rootVm.vnode);
      const instanceIndex = instances.indexOf(vm);
      if (instanceIndex > -1)
        registered.value.splice(instanceIndex, 0, id);
      else
        registered.value.push(id);
      const index = computed(() => items.value.findIndex((i) => i.id === id));
      const zIndex = computed(() => rootZIndex.value + layers.value.length * 2 - index.value * 2);
      const layoutItemStyles = computed(() => {
        const isHorizontal = position.value === "left" || position.value === "right";
        const isOppositeHorizontal = position.value === "right";
        const isOppositeVertical = position.value === "bottom";
        const styles = {
          [position.value]: 0,
          zIndex: zIndex.value,
          transform: `translate${isHorizontal ? "X" : "Y"}(${(active.value ? 0 : -110) * (isOppositeHorizontal || isOppositeVertical ? -1 : 1)}%)`,
          position: absolute.value || rootZIndex.value !== ROOT_ZINDEX ? "absolute" : "fixed",
          ...transitionsEnabled.value ? void 0 : {
            transition: "none"
          }
        };
        if (!isMounted.value)
          return styles;
        const item = items.value[index.value];
        if (!item)
          throw new Error(`[Vuetify] Could not find layout item "${id}"`);
        const overlap = computedOverlaps.value.get(id);
        if (overlap) {
          item[overlap.position] += overlap.amount;
        }
        return {
          ...styles,
          height: isHorizontal ? `calc(100% - ${item.top}px - ${item.bottom}px)` : elementSize.value ? `${elementSize.value}px` : void 0,
          left: isOppositeHorizontal ? void 0 : `${item.left}px`,
          right: isOppositeHorizontal ? `${item.right}px` : void 0,
          top: position.value !== "bottom" ? `${item.top}px` : void 0,
          bottom: position.value !== "top" ? `${item.bottom}px` : void 0,
          width: !isHorizontal ? `calc(100% - ${item.left}px - ${item.right}px)` : elementSize.value ? `${elementSize.value}px` : void 0
        };
      });
      const layoutItemScrimStyles = computed(() => ({
        zIndex: zIndex.value - 1
      }));
      return {
        layoutItemStyles,
        layoutItemScrimStyles,
        zIndex
      };
    },
    unregister: (id) => {
      priorities.delete(id);
      positions.delete(id);
      layoutSizes.delete(id);
      activeItems.delete(id);
      disabledTransitions.delete(id);
      registered.value = registered.value.filter((v) => v !== id);
    },
    mainRect,
    mainStyles,
    getLayoutItem,
    items,
    layoutRect,
    rootZIndex
  });
  const layoutClasses = computed(() => ["v-layout", {
    "v-layout--full-height": props.fullHeight
  }]);
  const layoutStyles = computed(() => ({
    zIndex: parentLayout ? rootZIndex.value : void 0,
    position: parentLayout ? "relative" : void 0,
    overflow: parentLayout ? "hidden" : void 0
  }));
  return {
    layoutClasses,
    layoutStyles,
    getLayoutItem,
    items,
    layoutRect,
    layoutRef: resizeRef
  };
}
const breakpointProps = (() => {
  return breakpoints.reduce((props, val) => {
    props[val] = {
      type: [Boolean, String, Number],
      default: false
    };
    return props;
  }, {});
})();
const offsetProps = (() => {
  return breakpoints.reduce((props, val) => {
    const offsetKey = "offset" + capitalize(val);
    props[offsetKey] = {
      type: [String, Number],
      default: null
    };
    return props;
  }, {});
})();
const orderProps = (() => {
  return breakpoints.reduce((props, val) => {
    const orderKey = "order" + capitalize(val);
    props[orderKey] = {
      type: [String, Number],
      default: null
    };
    return props;
  }, {});
})();
const propMap$1 = {
  col: Object.keys(breakpointProps),
  offset: Object.keys(offsetProps),
  order: Object.keys(orderProps)
};
function breakpointClass$1(type, prop, val) {
  let className = type;
  if (val == null || val === false) {
    return void 0;
  }
  if (prop) {
    const breakpoint = prop.replace(type, "");
    className += `-${breakpoint}`;
  }
  if (type === "col") {
    className = "v-" + className;
  }
  if (type === "col" && (val === "" || val === true)) {
    return className.toLowerCase();
  }
  className += `-${val}`;
  return className.toLowerCase();
}
const ALIGN_SELF_VALUES = ["auto", "start", "end", "center", "baseline", "stretch"];
const makeVColProps = propsFactory({
  cols: {
    type: [Boolean, String, Number],
    default: false
  },
  ...breakpointProps,
  offset: {
    type: [String, Number],
    default: null
  },
  ...offsetProps,
  order: {
    type: [String, Number],
    default: null
  },
  ...orderProps,
  alignSelf: {
    type: String,
    default: null,
    validator: (str) => ALIGN_SELF_VALUES.includes(str)
  },
  ...makeComponentProps(),
  ...makeTagProps()
}, "VCol");
const VCol = genericComponent()({
  name: "VCol",
  props: makeVColProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const classes = computed(() => {
      const classList = [];
      let type;
      for (type in propMap$1) {
        propMap$1[type].forEach((prop) => {
          const value = props[prop];
          const className = breakpointClass$1(type, prop, value);
          if (className)
            classList.push(className);
        });
      }
      const hasColClasses = classList.some((className) => className.startsWith("v-col-"));
      classList.push({
        // Default to .v-col if no other col-{bp}-* classes generated nor `cols` specified.
        "v-col": !hasColClasses || !props.cols,
        [`v-col-${props.cols}`]: props.cols,
        [`offset-${props.offset}`]: props.offset,
        [`order-${props.order}`]: props.order,
        [`align-self-${props.alignSelf}`]: props.alignSelf
      });
      return classList;
    });
    return () => {
      var _a;
      return h(props.tag, {
        class: [classes.value, props.class],
        style: props.style
      }, (_a = slots.default) == null ? void 0 : _a.call(slots));
    };
  }
});
const ALIGNMENT = ["start", "end", "center"];
const SPACE = ["space-between", "space-around", "space-evenly"];
function makeRowProps(prefix, def) {
  return breakpoints.reduce((props, val) => {
    const prefixKey = prefix + capitalize(val);
    props[prefixKey] = def();
    return props;
  }, {});
}
const ALIGN_VALUES = [...ALIGNMENT, "baseline", "stretch"];
const alignValidator = (str) => ALIGN_VALUES.includes(str);
const alignProps = makeRowProps("align", () => ({
  type: String,
  default: null,
  validator: alignValidator
}));
const JUSTIFY_VALUES = [...ALIGNMENT, ...SPACE];
const justifyValidator = (str) => JUSTIFY_VALUES.includes(str);
const justifyProps = makeRowProps("justify", () => ({
  type: String,
  default: null,
  validator: justifyValidator
}));
const ALIGN_CONTENT_VALUES = [...ALIGNMENT, ...SPACE, "stretch"];
const alignContentValidator = (str) => ALIGN_CONTENT_VALUES.includes(str);
const alignContentProps = makeRowProps("alignContent", () => ({
  type: String,
  default: null,
  validator: alignContentValidator
}));
const propMap = {
  align: Object.keys(alignProps),
  justify: Object.keys(justifyProps),
  alignContent: Object.keys(alignContentProps)
};
const classMap = {
  align: "align",
  justify: "justify",
  alignContent: "align-content"
};
function breakpointClass(type, prop, val) {
  let className = classMap[type];
  if (val == null) {
    return void 0;
  }
  if (prop) {
    const breakpoint = prop.replace(type, "");
    className += `-${breakpoint}`;
  }
  className += `-${val}`;
  return className.toLowerCase();
}
const makeVRowProps = propsFactory({
  dense: Boolean,
  noGutters: Boolean,
  align: {
    type: String,
    default: null,
    validator: alignValidator
  },
  ...alignProps,
  justify: {
    type: String,
    default: null,
    validator: justifyValidator
  },
  ...justifyProps,
  alignContent: {
    type: String,
    default: null,
    validator: alignContentValidator
  },
  ...alignContentProps,
  ...makeComponentProps(),
  ...makeTagProps()
}, "VRow");
const VRow = genericComponent()({
  name: "VRow",
  props: makeVRowProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const classes = computed(() => {
      const classList = [];
      let type;
      for (type in propMap) {
        propMap[type].forEach((prop) => {
          const value = props[prop];
          const className = breakpointClass(type, prop, value);
          if (className)
            classList.push(className);
        });
      }
      classList.push({
        "v-row--no-gutters": props.noGutters,
        "v-row--dense": props.dense,
        [`align-${props.align}`]: props.align,
        [`justify-${props.justify}`]: props.justify,
        [`align-content-${props.alignContent}`]: props.alignContent
      });
      return classList;
    });
    return () => {
      var _a;
      return h(props.tag, {
        class: ["v-row", classes.value, props.class],
        style: props.style
      }, (_a = slots.default) == null ? void 0 : _a.call(slots));
    };
  }
});
const _imports_0 = "" + publicAssetsURL("logo.png");
function useSticky(_ref) {
  let {
    rootEl,
    isSticky,
    layoutItemStyles
  } = _ref;
  const isStuck = shallowRef(false);
  const stuckPosition = shallowRef(0);
  const stickyStyles = computed(() => {
    const side = typeof isStuck.value === "boolean" ? "top" : isStuck.value;
    return [isSticky.value ? {
      top: "auto",
      bottom: "auto",
      height: void 0
    } : void 0, isStuck.value ? {
      [side]: convertToUnit(stuckPosition.value)
    } : {
      top: layoutItemStyles.value.top
    }];
  });
  return {
    isStuck,
    stickyStyles
  };
}
function useTouch(_ref) {
  let {
    isActive,
    isTemporary,
    width,
    touchless,
    position
  } = _ref;
  computed(() => ["left", "right"].includes(position.value));
  const isDragging = shallowRef(false);
  const dragProgress = shallowRef(0);
  shallowRef(0);
  const dragStyles = computed(() => {
    return isDragging.value ? {
      transform: position.value === "left" ? `translateX(calc(-100% + ${dragProgress.value * width.value}px))` : position.value === "right" ? `translateX(calc(100% - ${dragProgress.value * width.value}px))` : position.value === "top" ? `translateY(calc(-100% + ${dragProgress.value * width.value}px))` : position.value === "bottom" ? `translateY(calc(100% - ${dragProgress.value * width.value}px))` : oops(),
      transition: "none"
    } : void 0;
  });
  return {
    isDragging,
    dragProgress,
    dragStyles
  };
}
function oops() {
  throw new Error();
}
const locations = ["start", "end", "left", "right", "top", "bottom"];
const makeVNavigationDrawerProps = propsFactory({
  color: String,
  disableResizeWatcher: Boolean,
  disableRouteWatcher: Boolean,
  expandOnHover: Boolean,
  floating: Boolean,
  modelValue: {
    type: Boolean,
    default: null
  },
  permanent: Boolean,
  rail: {
    type: Boolean,
    default: null
  },
  railWidth: {
    type: [Number, String],
    default: 56
  },
  scrim: {
    type: [Boolean, String],
    default: true
  },
  image: String,
  temporary: Boolean,
  touchless: Boolean,
  width: {
    type: [Number, String],
    default: 256
  },
  location: {
    type: String,
    default: "start",
    validator: (value) => locations.includes(value)
  },
  sticky: Boolean,
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDisplayProps(),
  ...makeElevationProps(),
  ...makeLayoutItemProps(),
  ...makeRoundedProps(),
  ...makeTagProps({
    tag: "nav"
  }),
  ...makeThemeProps()
}, "VNavigationDrawer");
const VNavigationDrawer = genericComponent()({
  name: "VNavigationDrawer",
  props: makeVNavigationDrawerProps(),
  emits: {
    "update:modelValue": (val) => true,
    "update:rail": (val) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const {
      isRtl
    } = useRtl();
    const {
      themeClasses
    } = provideTheme(props);
    const {
      borderClasses
    } = useBorder(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "color"));
    const {
      elevationClasses
    } = useElevation(props);
    const {
      displayClasses,
      mobile
    } = useDisplay(props);
    const {
      roundedClasses
    } = useRounded(props);
    const router = useRouter();
    const isActive = useProxiedModel(props, "modelValue", null, (v) => !!v);
    const {
      ssrBootStyles
    } = useSsrBoot();
    const {
      scopeId
    } = useScopeId();
    const rootEl = ref();
    const isHovering = shallowRef(false);
    const width = computed(() => {
      return props.rail && props.expandOnHover && isHovering.value ? Number(props.width) : Number(props.rail ? props.railWidth : props.width);
    });
    const location = computed(() => {
      return toPhysical(props.location, isRtl.value);
    });
    const isTemporary = computed(() => !props.permanent && (mobile.value || props.temporary));
    const isSticky = computed(() => props.sticky && !isTemporary.value && location.value !== "bottom");
    useToggleScope(() => props.expandOnHover && props.rail != null, () => {
      watch(isHovering, (val) => emit("update:rail", !val));
    });
    useToggleScope(() => !props.disableResizeWatcher, () => {
      watch(isTemporary, (val) => !props.permanent && nextTick(() => isActive.value = !val));
    });
    useToggleScope(() => !props.disableRouteWatcher && !!router, () => {
      watch(router.currentRoute, () => isTemporary.value && (isActive.value = false));
    });
    watch(() => props.permanent, (val) => {
      if (val)
        isActive.value = true;
    });
    const {
      isDragging,
      dragProgress,
      dragStyles
    } = useTouch({
      isActive,
      isTemporary,
      width,
      touchless: toRef(props, "touchless"),
      position: location
    });
    const layoutSize = computed(() => {
      const size = isTemporary.value ? 0 : props.rail && props.expandOnHover ? Number(props.railWidth) : width.value;
      return isDragging.value ? size * dragProgress.value : size;
    });
    const {
      layoutItemStyles,
      layoutItemScrimStyles
    } = useLayoutItem({
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position: location,
      layoutSize,
      elementSize: width,
      active: computed(() => isActive.value || isDragging.value),
      disableTransitions: computed(() => isDragging.value),
      absolute: computed(() => (
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        props.absolute || isSticky.value && typeof isStuck.value !== "string"
      ))
    });
    const {
      isStuck,
      stickyStyles
    } = useSticky({
      rootEl,
      isSticky,
      layoutItemStyles
    });
    const scrimColor = useBackgroundColor(computed(() => {
      return typeof props.scrim === "string" ? props.scrim : null;
    }));
    const scrimStyles = computed(() => ({
      ...isDragging.value ? {
        opacity: dragProgress.value * 0.2,
        transition: "none"
      } : void 0,
      ...layoutItemScrimStyles.value
    }));
    provideDefaults({
      VList: {
        bgColor: "transparent"
      }
    });
    function onMouseenter() {
      isHovering.value = true;
    }
    function onMouseleave() {
      isHovering.value = false;
    }
    useRender(() => {
      const hasImage = slots.image || props.image;
      return createVNode(Fragment, null, [createVNode(props.tag, mergeProps({
        "ref": rootEl,
        "onMouseenter": onMouseenter,
        "onMouseleave": onMouseleave,
        "class": ["v-navigation-drawer", `v-navigation-drawer--${location.value}`, {
          "v-navigation-drawer--expand-on-hover": props.expandOnHover,
          "v-navigation-drawer--floating": props.floating,
          "v-navigation-drawer--is-hovering": isHovering.value,
          "v-navigation-drawer--rail": props.rail,
          "v-navigation-drawer--temporary": isTemporary.value,
          "v-navigation-drawer--active": isActive.value,
          "v-navigation-drawer--sticky": isSticky.value
        }, themeClasses.value, backgroundColorClasses.value, borderClasses.value, displayClasses.value, elevationClasses.value, roundedClasses.value, props.class],
        "style": [backgroundColorStyles.value, layoutItemStyles.value, dragStyles.value, ssrBootStyles.value, stickyStyles.value, props.style]
      }, scopeId, attrs), {
        default: () => {
          var _a, _b, _c, _d;
          return [hasImage && createVNode("div", {
            "key": "image",
            "class": "v-navigation-drawer__img"
          }, [slots.image ? (_a = slots.image) == null ? void 0 : _a.call(slots, {
            image: props.image
          }) : createVNode("img", {
            "src": props.image,
            "alt": ""
          }, null)]), slots.prepend && createVNode("div", {
            "class": "v-navigation-drawer__prepend"
          }, [(_b = slots.prepend) == null ? void 0 : _b.call(slots)]), createVNode("div", {
            "class": "v-navigation-drawer__content"
          }, [(_c = slots.default) == null ? void 0 : _c.call(slots)]), slots.append && createVNode("div", {
            "class": "v-navigation-drawer__append"
          }, [(_d = slots.append) == null ? void 0 : _d.call(slots)])];
        }
      }), createVNode(Transition, {
        "name": "fade-transition"
      }, {
        default: () => [isTemporary.value && (isDragging.value || isActive.value) && !!props.scrim && createVNode("div", mergeProps({
          "class": ["v-navigation-drawer__scrim", scrimColor.backgroundColorClasses.value],
          "style": [scrimStyles.value, scrimColor.backgroundColorStyles.value],
          "onClick": () => isActive.value = false
        }, scopeId), null)]
      })]);
    });
    return {
      isStuck
    };
  }
});
const __default__ = {
  data: () => ({
    cards: ["Today", "Yesterday"],
    rail: false,
    drawer: false,
    imgSize: 150
  })
};
const _sfc_main$1 = /* @__PURE__ */ Object.assign(__default__, {
  __name: "SideBar",
  __ssrInlineRender: true,
  setup(__props) {
    const links = [
      { text: "Dashboard", icon: "i-material-symbols-dashboard" },
      { text: "Orders", icon: "i-material-symbols-call" },
      { text: "Restaurants", icon: "i-material-symbols-pin-drop" },
      { text: "Finance", icon: "i-material-symbols-finance" },
      { text: "Logout", icon: "i-material-symbols-logout" }
    ];
    const drawer = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      if (_ctx.$nuxt.$vuetify.display.smAndUp.value) {
        _push(ssrRenderComponent(VNavigationDrawer, mergeProps({
          modelValue: drawer.value,
          "onUpdate:modelValue": ($event) => drawer.value = $event,
          rail: _ctx.rail || _ctx.$nuxt.$vuetify.display.smAndDown.value,
          permanent: "",
          color: "#2B2B2B"
        }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div data-v-fde2c8ee${_scopeId}>`);
              _push2(ssrRenderComponent(VImg, {
                src: _imports_0,
                alt: "food",
                class: "scale-11 mx-auto",
                width: _ctx.imgSize,
                height: _ctx.imgSize
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
              _push2(ssrRenderComponent(VCard, {
                class: "rounded-e-xl me",
                width: "60",
                height: "400",
                color: "#545454"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(VList, { class: "top" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(links, (item, i) => {
                      _push3(ssrRenderComponent(VListItem, {
                        key: i,
                        value: item,
                        class: "mb-5",
                        color: "#FF6259",
                        variant: "plain"
                      }, {
                        prepend: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(VIcon, {
                              icon: item.icon
                            }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(VIcon, {
                                icon: item.icon
                              }, null, 8, ["icon"])
                            ];
                          }
                        }),
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(VListItemTitle, null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(item.text)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(item.text), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(VListItemTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.text), 1)
                                ]),
                                _: 2
                              }, 1024)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(), createBlock(Fragment, null, renderList(links, (item, i) => {
                        return createVNode(VListItem, {
                          key: i,
                          value: item,
                          class: "mb-5",
                          color: "#FF6259",
                          variant: "plain"
                        }, {
                          prepend: withCtx(() => [
                            createVNode(VIcon, {
                              icon: item.icon
                            }, null, 8, ["icon"])
                          ]),
                          default: withCtx(() => [
                            createVNode(VListItemTitle, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(item.text), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1032, ["value"]);
                      }), 64))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<div style="${ssrRenderStyle({ "position": "absolute", "bottom": "20px", "margin-left": "auto", "margin-right": "auto", "left": "0", "right": "0", "text-align": "center" })}" data-v-fde2c8ee${_scopeId}>`);
              _push2(ssrRenderComponent(VRow, {
                align: "center",
                justify: "center"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCol, { cols: "auto" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VBtn, {
                            icon: "i-material-symbols-settings",
                            size: "small",
                            color: "#5F3B39"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VBtn, {
                              icon: "i-material-symbols-settings",
                              size: "small",
                              color: "#5F3B39"
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { cols: "auto" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VBadge, {
                            dot: "",
                            color: "#FF6259"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(VBtn, {
                                  icon: "i-material-symbols-notifications",
                                  size: "small",
                                  color: "#5F3B39"
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(VBtn, {
                                    icon: "i-material-symbols-notifications",
                                    size: "small",
                                    color: "#5F3B39"
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VBadge, {
                              dot: "",
                              color: "#FF6259"
                            }, {
                              default: withCtx(() => [
                                createVNode(VBtn, {
                                  icon: "i-material-symbols-notifications",
                                  size: "small",
                                  color: "#5F3B39"
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
                      createVNode(VCol, { cols: "auto" }, {
                        default: withCtx(() => [
                          createVNode(VBtn, {
                            icon: "i-material-symbols-settings",
                            size: "small",
                            color: "#5F3B39"
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { cols: "auto" }, {
                        default: withCtx(() => [
                          createVNode(VBadge, {
                            dot: "",
                            color: "#FF6259"
                          }, {
                            default: withCtx(() => [
                              createVNode(VBtn, {
                                icon: "i-material-symbols-notifications",
                                size: "small",
                                color: "#5F3B39"
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
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", null, [
                  createVNode(VImg, {
                    src: _imports_0,
                    alt: "food",
                    class: "scale-11 mx-auto",
                    width: _ctx.imgSize,
                    height: _ctx.imgSize
                  }, null, 8, ["width", "height"])
                ]),
                createVNode(VCard, {
                  class: "rounded-e-xl me",
                  width: "60",
                  height: "400",
                  color: "#545454"
                }),
                createVNode(VList, { class: "top" }, {
                  default: withCtx(() => [
                    (openBlock(), createBlock(Fragment, null, renderList(links, (item, i) => {
                      return createVNode(VListItem, {
                        key: i,
                        value: item,
                        class: "mb-5",
                        color: "#FF6259",
                        variant: "plain"
                      }, {
                        prepend: withCtx(() => [
                          createVNode(VIcon, {
                            icon: item.icon
                          }, null, 8, ["icon"])
                        ]),
                        default: withCtx(() => [
                          createVNode(VListItemTitle, null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.text), 1)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1032, ["value"]);
                    }), 64))
                  ]),
                  _: 1
                }),
                createVNode("div", {
                  style: { "position": "absolute", "bottom": "20px", "margin-left": "auto", "margin-right": "auto", "left": "0", "right": "0", "text-align": "center" },
                  onClick: ($event) => _ctx.rail = !_ctx.rail
                }, [
                  createVNode(VRow, {
                    align: "center",
                    justify: "center"
                  }, {
                    default: withCtx(() => [
                      createVNode(VCol, { cols: "auto" }, {
                        default: withCtx(() => [
                          createVNode(VBtn, {
                            icon: "i-material-symbols-settings",
                            size: "small",
                            color: "#5F3B39"
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { cols: "auto" }, {
                        default: withCtx(() => [
                          createVNode(VBadge, {
                            dot: "",
                            color: "#FF6259"
                          }, {
                            default: withCtx(() => [
                              createVNode(VBtn, {
                                icon: "i-material-symbols-notifications",
                                size: "small",
                                color: "#5F3B39"
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ], 8, ["onClick"])
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
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SideBar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-fde2c8ee"]]);
const makeVBottomNavigationProps = propsFactory({
  bgColor: String,
  color: String,
  grow: Boolean,
  mode: {
    type: String,
    validator: (v) => !v || ["horizontal", "shift"].includes(v)
  },
  height: {
    type: [Number, String],
    default: 56
  },
  active: {
    type: Boolean,
    default: true
  },
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeElevationProps(),
  ...makeRoundedProps(),
  ...makeLayoutItemProps({
    name: "bottom-navigation"
  }),
  ...makeTagProps({
    tag: "header"
  }),
  ...makeGroupProps({
    modelValue: true,
    selectedClass: "v-btn--selected"
  }),
  ...makeThemeProps()
}, "VBottomNavigation");
const VBottomNavigation = genericComponent()({
  name: "VBottomNavigation",
  props: makeVBottomNavigationProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = useTheme();
    const {
      borderClasses
    } = useBorder(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "bgColor"));
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
      ssrBootStyles
    } = useSsrBoot();
    const height = computed(() => Number(props.height) - (props.density === "comfortable" ? 8 : 0) - (props.density === "compact" ? 16 : 0));
    const isActive = toRef(props, "active");
    const {
      layoutItemStyles
    } = useLayoutItem({
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position: computed(() => "bottom"),
      layoutSize: computed(() => isActive.value ? height.value : 0),
      elementSize: height,
      active: isActive,
      absolute: toRef(props, "absolute")
    });
    useGroup(props, VBtnToggleSymbol);
    provideDefaults({
      VBtn: {
        color: toRef(props, "color"),
        density: toRef(props, "density"),
        stacked: computed(() => props.mode !== "horizontal"),
        variant: "text"
      }
    }, {
      scoped: true
    });
    useRender(() => {
      return createVNode(props.tag, {
        "class": ["v-bottom-navigation", {
          "v-bottom-navigation--active": isActive.value,
          "v-bottom-navigation--grow": props.grow,
          "v-bottom-navigation--shift": props.mode === "shift"
        }, themeClasses.value, backgroundColorClasses.value, borderClasses.value, densityClasses.value, elevationClasses.value, roundedClasses.value, props.class],
        "style": [backgroundColorStyles.value, layoutItemStyles.value, {
          height: convertToUnit(height.value),
          transform: `translateY(${convertToUnit(!isActive.value ? 100 : 0, "%")})`
        }, ssrBootStyles.value, props.style]
      }, {
        default: () => [slots.default && createVNode("div", {
          "class": "v-bottom-navigation__content"
        }, [slots.default()])]
      });
    });
    return {};
  }
});
const makeVLayoutProps = propsFactory({
  ...makeComponentProps(),
  ...makeLayoutProps()
}, "VLayout");
const VLayout = genericComponent()({
  name: "VLayout",
  props: makeVLayoutProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      layoutClasses,
      layoutStyles,
      getLayoutItem,
      items,
      layoutRef
    } = createLayout(props);
    useRender(() => {
      var _a;
      return createVNode("div", {
        "ref": layoutRef,
        "class": [layoutClasses.value, props.class],
        "style": [layoutStyles.value, props.style]
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    });
    return {
      getLayoutItem,
      items
    };
  }
});
const _sfc_main = {
  data() {
    return {
      links: [
        { text: "Dashboard", icon: "i-material-symbols-view-dashboard" },
        { text: "Orders", icon: "i-material-symbols-phone-classic" },
        { text: "Restaurants", icon: "i-material-symbols-map-marker-radius" },
        { text: "Finance", icon: "i-material-symbols-finance" },
        { text: "Logout", icon: "i-material-symbols-logout" }
      ],
      value: 0,
      tabs: null
    };
  },
  computed: {
    color() {
      switch (this.value) {
        case 0:
          return "blue-grey";
        case 1:
          return "teal";
        case 2:
          return "brown";
        case 3:
          return "indigo";
        default:
          return "blue-grey";
      }
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(ssrRenderComponent(VLayout, mergeProps({
    style: [
      _ctx.$nuxt.$vuetify.display.xs.value ? null : { display: "none" },
      { "height": "56px" }
    ],
    class: "overflow-visible"
  }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(VBottomNavigation, {
          modelValue: $data.value,
          "onUpdate:modelValue": ($event) => $data.value = $event,
          "bg-color": "transperent",
          mode: "shift"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<!--[-->`);
              ssrRenderList($data.links, (link, index) => {
                _push3(ssrRenderComponent(VBtn, { key: index }, {
                  default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(ssrRenderComponent(VIcon, null, {
                        default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(`${ssrInterpolate(link.icon)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(link.icon), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent4, _scopeId3));
                      _push4(`<span${_scopeId3}>${ssrInterpolate(link.text)}</span>`);
                    } else {
                      return [
                        createVNode(VIcon, null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(link.icon), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode("span", null, toDisplayString(link.text), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent3, _scopeId2));
              });
              _push3(`<!--]-->`);
            } else {
              return [
                (openBlock(true), createBlock(Fragment, null, renderList($data.links, (link, index) => {
                  return openBlock(), createBlock(VBtn, { key: index }, {
                    default: withCtx(() => [
                      createVNode(VIcon, null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(link.icon), 1)
                        ]),
                        _: 2
                      }, 1024),
                      createVNode("span", null, toDisplayString(link.text), 1)
                    ]),
                    _: 2
                  }, 1024);
                }), 128))
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(VBottomNavigation, {
            modelValue: $data.value,
            "onUpdate:modelValue": ($event) => $data.value = $event,
            "bg-color": "transperent",
            mode: "shift"
          }, {
            default: withCtx(() => [
              (openBlock(true), createBlock(Fragment, null, renderList($data.links, (link, index) => {
                return openBlock(), createBlock(VBtn, { key: index }, {
                  default: withCtx(() => [
                    createVNode(VIcon, null, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(link.icon), 1)
                      ]),
                      _: 2
                    }, 1024),
                    createVNode("span", null, toDisplayString(link.text), 1)
                  ]),
                  _: 2
                }, 1024);
              }), 128))
            ]),
            _: 1
          }, 8, ["modelValue", "onUpdate:modelValue"])
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MobileNav.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { VRow as V, __nuxt_component_0 as _, VCol as a, makeLayoutProps as b, createLayout as c, useLayout as d, __nuxt_component_1 as e, makeLayoutItemProps as m, useLayoutItem as u };
