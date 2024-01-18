import { createVNode, Transition, mergeProps, computed, shallowRef, Fragment, provide, onScopeDispose, toRef, ref, withDirectives, resolveDirective, inject, watch, createTextVNode, useSSRContext, nextTick, watchEffect, defineComponent, withAsyncContext, resolveComponent, unref, isRef, withCtx } from 'vue';
import { g as genericComponent, p as propsFactory, I as IconValue, m as makeComponentProps, _ as makeDensityProps, $ as makeSizeProps, a as makeTagProps, t as makeThemeProps, a0 as useLocale, z as provideTheme, F as useProxiedModel, O as clamp, a1 as createRange, a2 as getUid, b as useRender, a3 as deepEqual, A as provideDefaults, a4 as Ripple, a5 as filterInputAttrs, n as VIcon, aa as omit, B as VDefaultsProvider, L as useResizeObserver, ae as makeDimensionProps, af as getCurrentInstance, ag as useDimension, ah as useToggleScope, C as convertToUnit, ai as makeTransitionProps$1, E as VAvatar, aj as ensureValidVNode, d as VChip, k as VBtn, a6 as useDensity, a7 as wrapInArray, a8 as useTextColor, v as useBackgroundColor, a9 as matchesSelector, N as focusableChildren, ab as getNextElement, ac as focusChild, J as useDisplay, ad as debounce, f as useRoute$1, h as useHead, i as useServerHead, V as VImg, c as createError, e as useOptimizeImage } from '../server.mjs';
import { u as useFetch } from './fetch-QY6ishtS.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { b as VLabel, c as makeVOverlayProps, d as VMenuSymbol, a as VOverlay, f as forwardRefs, e as makeVTextFieldProps, g as useForm, V as VTextField, h as animate, i as getTargetBox, n as nullifyTransforms, j as deceleratedEasing, s as standardEasing, k as acceleratedEasing } from './VTextField-0QwpCnyT.mjs';
import { c as useScopeId, m as makeItemsProps, e as useItems, a as VList, b as VListItem } from './scopeId-RSGnEtwA.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-yVxbj29m.mjs';
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

const makeVDialogTransitionProps = propsFactory({
  target: [Object, Array]
}, "v-dialog-transition");
const VDialogTransition = genericComponent()({
  name: "VDialogTransition",
  props: makeVDialogTransitionProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const functions = {
      onBeforeEnter(el) {
        el.style.pointerEvents = "none";
        el.style.visibility = "hidden";
      },
      async onEnter(el, done) {
        var _a;
        await new Promise((resolve) => requestAnimationFrame(resolve));
        await new Promise((resolve) => requestAnimationFrame(resolve));
        el.style.visibility = "";
        const {
          x,
          y,
          sx,
          sy,
          speed
        } = getDimensions(props.target, el);
        const animation = animate(el, [{
          transform: `translate(${x}px, ${y}px) scale(${sx}, ${sy})`,
          opacity: 0
        }, {}], {
          duration: 225 * speed,
          easing: deceleratedEasing
        });
        (_a = getChildren(el)) == null ? void 0 : _a.forEach((el2) => {
          animate(el2, [{
            opacity: 0
          }, {
            opacity: 0,
            offset: 0.33
          }, {}], {
            duration: 225 * 2 * speed,
            easing: standardEasing
          });
        });
        animation.finished.then(() => done());
      },
      onAfterEnter(el) {
        el.style.removeProperty("pointer-events");
      },
      onBeforeLeave(el) {
        el.style.pointerEvents = "none";
      },
      async onLeave(el, done) {
        var _a;
        await new Promise((resolve) => requestAnimationFrame(resolve));
        const {
          x,
          y,
          sx,
          sy,
          speed
        } = getDimensions(props.target, el);
        const animation = animate(el, [{}, {
          transform: `translate(${x}px, ${y}px) scale(${sx}, ${sy})`,
          opacity: 0
        }], {
          duration: 125 * speed,
          easing: acceleratedEasing
        });
        animation.finished.then(() => done());
        (_a = getChildren(el)) == null ? void 0 : _a.forEach((el2) => {
          animate(el2, [{}, {
            opacity: 0,
            offset: 0.2
          }, {
            opacity: 0
          }], {
            duration: 125 * 2 * speed,
            easing: standardEasing
          });
        });
      },
      onAfterLeave(el) {
        el.style.removeProperty("pointer-events");
      }
    };
    return () => {
      return props.target ? createVNode(Transition, mergeProps({
        "name": "dialog-transition"
      }, functions, {
        "css": false
      }), slots) : createVNode(Transition, {
        "name": "dialog-transition"
      }, slots);
    };
  }
});
function getChildren(el) {
  var _a;
  const els = (_a = el.querySelector(":scope > .v-card, :scope > .v-sheet, :scope > .v-list")) == null ? void 0 : _a.children;
  return els && [...els];
}
function getDimensions(target, el) {
  const targetBox = getTargetBox(target);
  const elBox = nullifyTransforms(el);
  const [originX, originY] = getComputedStyle(el).transformOrigin.split(" ").map((v) => parseFloat(v));
  const [anchorSide, anchorOffset] = getComputedStyle(el).getPropertyValue("--v-overlay-anchor-origin").split(" ");
  let offsetX = targetBox.left + targetBox.width / 2;
  if (anchorSide === "left" || anchorOffset === "left") {
    offsetX -= targetBox.width / 2;
  } else if (anchorSide === "right" || anchorOffset === "right") {
    offsetX += targetBox.width / 2;
  }
  let offsetY = targetBox.top + targetBox.height / 2;
  if (anchorSide === "top" || anchorOffset === "top") {
    offsetY -= targetBox.height / 2;
  } else if (anchorSide === "bottom" || anchorOffset === "bottom") {
    offsetY += targetBox.height / 2;
  }
  const tsx = targetBox.width / elBox.width;
  const tsy = targetBox.height / elBox.height;
  const maxs = Math.max(1, tsx, tsy);
  const sx = tsx / maxs || 0;
  const sy = tsy / maxs || 0;
  const asa = elBox.width * elBox.height / ((void 0).innerWidth * (void 0).innerHeight);
  const speed = asa > 0.12 ? Math.min(1.5, (asa - 0.12) * 10 + 1) : 1;
  return {
    x: offsetX - (originX + elBox.left),
    y: offsetY - (originY + elBox.top),
    sx,
    sy,
    speed
  };
}
const useProduct = async (productId) => {
  const { data: product, error } = await useFetch(
    `/api/store/local-data/${productId}`,
    "$IhgmYIMdpX"
  );
  if (error.value) {
    throw createError({
      ...error.value,
      statusMessage: `Couldn't fetch product id ${productId}.`
    });
  }
  const fetchProduct = () => {
    const { optimizeImage } = useOptimizeImage();
    return product.value.image ? {
      ...product.value,
      imageOptimized: optimizeImage(product.value.image)
    } : product.value;
  };
  return { product, fetchProduct };
};
const makeVRatingProps = propsFactory({
  name: String,
  itemAriaLabel: {
    type: String,
    default: "$vuetify.rating.ariaLabel.item"
  },
  activeColor: String,
  color: String,
  clearable: Boolean,
  disabled: Boolean,
  emptyIcon: {
    type: IconValue,
    default: "$ratingEmpty"
  },
  fullIcon: {
    type: IconValue,
    default: "$ratingFull"
  },
  halfIncrements: Boolean,
  hover: Boolean,
  length: {
    type: [Number, String],
    default: 5
  },
  readonly: Boolean,
  modelValue: {
    type: [Number, String],
    default: 0
  },
  itemLabels: Array,
  itemLabelPosition: {
    type: String,
    default: "top",
    validator: (v) => ["top", "bottom"].includes(v)
  },
  ripple: Boolean,
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeSizeProps(),
  ...makeTagProps(),
  ...makeThemeProps()
}, "VRating");
const VRating = genericComponent()({
  name: "VRating",
  props: makeVRatingProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const {
      themeClasses
    } = provideTheme(props);
    const rating = useProxiedModel(props, "modelValue");
    const normalizedValue = computed(() => clamp(parseFloat(rating.value), 0, +props.length));
    const range = computed(() => createRange(Number(props.length), 1));
    const increments = computed(() => range.value.flatMap((v) => props.halfIncrements ? [v - 0.5, v] : [v]));
    const hoverIndex = shallowRef(-1);
    const itemState = computed(() => increments.value.map((value) => {
      var _a;
      const isHovering = props.hover && hoverIndex.value > -1;
      const isFilled = normalizedValue.value >= value;
      const isHovered = hoverIndex.value >= value;
      const isFullIcon = isHovering ? isHovered : isFilled;
      const icon = isFullIcon ? props.fullIcon : props.emptyIcon;
      const activeColor = (_a = props.activeColor) != null ? _a : props.color;
      const color = isFilled || isHovered ? activeColor : props.color;
      return {
        isFilled,
        isHovered,
        icon,
        color
      };
    }));
    const eventState = computed(() => [0, ...increments.value].map((value) => {
      function onMouseenter() {
        hoverIndex.value = value;
      }
      function onMouseleave() {
        hoverIndex.value = -1;
      }
      function onClick() {
        if (props.disabled || props.readonly)
          return;
        rating.value = normalizedValue.value === value && props.clearable ? 0 : value;
      }
      return {
        onMouseenter: props.hover ? onMouseenter : void 0,
        onMouseleave: props.hover ? onMouseleave : void 0,
        onClick
      };
    }));
    const name = computed(() => {
      var _a;
      return (_a = props.name) != null ? _a : `v-rating-${getUid()}`;
    });
    function VRatingItem(_ref2) {
      var _a, _b;
      let {
        value,
        index,
        showStar = true
      } = _ref2;
      const {
        onMouseenter,
        onMouseleave,
        onClick
      } = eventState.value[index + 1];
      const id = `${name.value}-${String(value).replace(".", "-")}`;
      const btnProps = {
        color: (_a = itemState.value[index]) == null ? void 0 : _a.color,
        density: props.density,
        disabled: props.disabled,
        icon: (_b = itemState.value[index]) == null ? void 0 : _b.icon,
        ripple: props.ripple,
        size: props.size,
        variant: "plain"
      };
      return createVNode(Fragment, null, [createVNode("label", {
        "for": id,
        "class": {
          "v-rating__item--half": props.halfIncrements && value % 1 > 0,
          "v-rating__item--full": props.halfIncrements && value % 1 === 0
        },
        "onMouseenter": onMouseenter,
        "onMouseleave": onMouseleave,
        "onClick": onClick
      }, [createVNode("span", {
        "class": "v-rating__hidden"
      }, [t(props.itemAriaLabel, value, props.length)]), !showStar ? void 0 : slots.item ? slots.item({
        ...itemState.value[index],
        props: btnProps,
        value,
        index,
        rating: normalizedValue.value
      }) : createVNode(VBtn, mergeProps({
        "aria-label": t(props.itemAriaLabel, value, props.length)
      }, btnProps), null)]), createVNode("input", {
        "class": "v-rating__hidden",
        "name": name.value,
        "id": id,
        "type": "radio",
        "value": value,
        "checked": normalizedValue.value === value,
        "tabindex": -1,
        "readonly": props.readonly,
        "disabled": props.disabled
      }, null)]);
    }
    function createLabel(labelProps) {
      if (slots["item-label"])
        return slots["item-label"](labelProps);
      if (labelProps.label)
        return createVNode("span", null, [labelProps.label]);
      return createVNode("span", null, [createTextVNode("\xA0")]);
    }
    useRender(() => {
      var _a;
      const hasLabels = !!((_a = props.itemLabels) == null ? void 0 : _a.length) || slots["item-label"];
      return createVNode(props.tag, {
        "class": ["v-rating", {
          "v-rating--hover": props.hover,
          "v-rating--readonly": props.readonly
        }, themeClasses.value, props.class],
        "style": props.style
      }, {
        default: () => [createVNode(VRatingItem, {
          "value": 0,
          "index": -1,
          "showStar": false
        }, null), range.value.map((value, i) => {
          var _a2, _b;
          return createVNode("div", {
            "class": "v-rating__wrapper"
          }, [hasLabels && props.itemLabelPosition === "top" ? createLabel({
            value,
            index: i,
            label: (_a2 = props.itemLabels) == null ? void 0 : _a2[i]
          }) : void 0, createVNode("div", {
            "class": "v-rating__item"
          }, [props.halfIncrements ? createVNode(Fragment, null, [createVNode(VRatingItem, {
            "value": value - 0.5,
            "index": i * 2
          }, null), createVNode(VRatingItem, {
            "value": value,
            "index": i * 2 + 1
          }, null)]) : createVNode(VRatingItem, {
            "value": value,
            "index": i
          }, null)]), hasLabels && props.itemLabelPosition === "bottom" ? createLabel({
            value,
            index: i,
            label: (_b = props.itemLabels) == null ? void 0 : _b[i]
          }) : void 0]);
        })]
      });
    });
    return {};
  }
});
const VSelectionControlGroupSymbol = Symbol.for("vuetify:selection-control-group");
const makeSelectionControlGroupProps = propsFactory({
  color: String,
  disabled: {
    type: Boolean,
    default: null
  },
  defaultsTarget: String,
  error: Boolean,
  id: String,
  inline: Boolean,
  falseIcon: IconValue,
  trueIcon: IconValue,
  ripple: {
    type: Boolean,
    default: true
  },
  multiple: {
    type: Boolean,
    default: null
  },
  name: String,
  readonly: {
    type: Boolean,
    default: null
  },
  modelValue: null,
  type: String,
  valueComparator: {
    type: Function,
    default: deepEqual
  },
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeThemeProps()
}, "SelectionControlGroup");
const makeVSelectionControlGroupProps = propsFactory({
  ...makeSelectionControlGroupProps({
    defaultsTarget: "VSelectionControl"
  })
}, "VSelectionControlGroup");
genericComponent()({
  name: "VSelectionControlGroup",
  props: makeVSelectionControlGroupProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const modelValue = useProxiedModel(props, "modelValue");
    const uid = getUid();
    const id = computed(() => props.id || `v-selection-control-group-${uid}`);
    const name = computed(() => props.name || id.value);
    const updateHandlers = /* @__PURE__ */ new Set();
    provide(VSelectionControlGroupSymbol, {
      modelValue,
      forceUpdate: () => {
        updateHandlers.forEach((fn) => fn());
      },
      onForceUpdate: (cb) => {
        updateHandlers.add(cb);
        onScopeDispose(() => {
          updateHandlers.delete(cb);
        });
      }
    });
    provideDefaults({
      [props.defaultsTarget]: {
        color: toRef(props, "color"),
        disabled: toRef(props, "disabled"),
        density: toRef(props, "density"),
        error: toRef(props, "error"),
        inline: toRef(props, "inline"),
        modelValue,
        multiple: computed(() => !!props.multiple || props.multiple == null && Array.isArray(modelValue.value)),
        name,
        falseIcon: toRef(props, "falseIcon"),
        trueIcon: toRef(props, "trueIcon"),
        readonly: toRef(props, "readonly"),
        ripple: toRef(props, "ripple"),
        type: toRef(props, "type"),
        valueComparator: toRef(props, "valueComparator")
      }
    });
    useRender(() => {
      var _a;
      return createVNode("div", {
        "class": ["v-selection-control-group", {
          "v-selection-control-group--inline": props.inline
        }, props.class],
        "style": props.style,
        "role": props.type === "radio" ? "radiogroup" : void 0
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    });
    return {};
  }
});
const makeVSelectionControlProps = propsFactory({
  label: String,
  baseColor: String,
  trueValue: null,
  falseValue: null,
  value: null,
  ...makeComponentProps(),
  ...makeSelectionControlGroupProps()
}, "VSelectionControl");
function useSelectionControl(props) {
  const group = inject(VSelectionControlGroupSymbol, void 0);
  const {
    densityClasses
  } = useDensity(props);
  const modelValue = useProxiedModel(props, "modelValue");
  const trueValue = computed(() => props.trueValue !== void 0 ? props.trueValue : props.value !== void 0 ? props.value : true);
  const falseValue = computed(() => props.falseValue !== void 0 ? props.falseValue : false);
  const isMultiple = computed(() => !!props.multiple || props.multiple == null && Array.isArray(modelValue.value));
  const model = computed({
    get() {
      const val = group ? group.modelValue.value : modelValue.value;
      return isMultiple.value ? wrapInArray(val).some((v) => props.valueComparator(v, trueValue.value)) : props.valueComparator(val, trueValue.value);
    },
    set(val) {
      if (props.readonly)
        return;
      const currentValue = val ? trueValue.value : falseValue.value;
      let newVal = currentValue;
      if (isMultiple.value) {
        newVal = val ? [...wrapInArray(modelValue.value), currentValue] : wrapInArray(modelValue.value).filter((item) => !props.valueComparator(item, trueValue.value));
      }
      if (group) {
        group.modelValue.value = newVal;
      } else {
        modelValue.value = newVal;
      }
    }
  });
  const {
    textColorClasses,
    textColorStyles
  } = useTextColor(computed(() => {
    if (props.error || props.disabled)
      return void 0;
    return model.value ? props.color : props.baseColor;
  }));
  const {
    backgroundColorClasses,
    backgroundColorStyles
  } = useBackgroundColor(computed(() => {
    return model.value && !props.error && !props.disabled ? props.color : void 0;
  }));
  const icon = computed(() => model.value ? props.trueIcon : props.falseIcon);
  return {
    group,
    densityClasses,
    trueValue,
    falseValue,
    model,
    textColorClasses,
    textColorStyles,
    backgroundColorClasses,
    backgroundColorStyles,
    icon
  };
}
const VSelectionControl = genericComponent()({
  name: "VSelectionControl",
  directives: {
    Ripple
  },
  inheritAttrs: false,
  props: makeVSelectionControlProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const {
      group,
      densityClasses,
      icon,
      model,
      textColorClasses,
      textColorStyles,
      backgroundColorClasses,
      backgroundColorStyles,
      trueValue
    } = useSelectionControl(props);
    const uid = getUid();
    const id = computed(() => props.id || `input-${uid}`);
    const isFocused = shallowRef(false);
    const isFocusVisible = shallowRef(false);
    const input = ref();
    group == null ? void 0 : group.onForceUpdate(() => {
      if (input.value) {
        input.value.checked = model.value;
      }
    });
    function onFocus(e) {
      isFocused.value = true;
      if (matchesSelector(e.target) !== false) {
        isFocusVisible.value = true;
      }
    }
    function onBlur() {
      isFocused.value = false;
      isFocusVisible.value = false;
    }
    function onInput(e) {
      if (props.readonly && group) {
        nextTick(() => group.forceUpdate());
      }
      model.value = e.target.checked;
    }
    useRender(() => {
      var _a2;
      var _a, _b;
      const label = slots.label ? slots.label({
        label: props.label,
        props: {
          for: id.value
        }
      }) : props.label;
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
      const inputNode = createVNode("input", mergeProps({
        "ref": input,
        "checked": model.value,
        "disabled": !!(props.readonly || props.disabled),
        "id": id.value,
        "onBlur": onBlur,
        "onFocus": onFocus,
        "onInput": onInput,
        "aria-disabled": !!(props.readonly || props.disabled),
        "type": props.type,
        "value": trueValue.value,
        "name": props.name,
        "aria-checked": props.type === "checkbox" ? model.value : void 0
      }, inputAttrs), null);
      return createVNode("div", mergeProps({
        "class": ["v-selection-control", {
          "v-selection-control--dirty": model.value,
          "v-selection-control--disabled": props.disabled,
          "v-selection-control--error": props.error,
          "v-selection-control--focused": isFocused.value,
          "v-selection-control--focus-visible": isFocusVisible.value,
          "v-selection-control--inline": props.inline
        }, densityClasses.value, props.class]
      }, rootAttrs, {
        "style": props.style
      }), [createVNode("div", {
        "class": ["v-selection-control__wrapper", textColorClasses.value],
        "style": textColorStyles.value
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots, {
        backgroundColorClasses,
        backgroundColorStyles
      }), withDirectives(createVNode("div", {
        "class": ["v-selection-control__input"]
      }, [(_a2 = (_b = slots.input) == null ? void 0 : _b.call(slots, {
        model,
        textColorClasses,
        textColorStyles,
        backgroundColorClasses,
        backgroundColorStyles,
        inputNode,
        icon: icon.value,
        props: {
          onFocus,
          onBlur,
          id: id.value
        }
      })) != null ? _a2 : createVNode(Fragment, null, [icon.value && createVNode(VIcon, {
        "key": "icon",
        "icon": icon.value
      }, null), inputNode])]), [[resolveDirective("ripple"), props.ripple && [!props.disabled && !props.readonly, null, ["center", "circle"]]]])]), label && createVNode(VLabel, {
        "for": id.value,
        "clickable": true,
        "onClick": (e) => e.stopPropagation()
      }, {
        default: () => [label]
      })]);
    });
    return {
      isFocused,
      input
    };
  }
});
const makeVCheckboxBtnProps = propsFactory({
  indeterminate: Boolean,
  indeterminateIcon: {
    type: IconValue,
    default: "$checkboxIndeterminate"
  },
  ...makeVSelectionControlProps({
    falseIcon: "$checkboxOff",
    trueIcon: "$checkboxOn"
  })
}, "VCheckboxBtn");
const VCheckboxBtn = genericComponent()({
  name: "VCheckboxBtn",
  props: makeVCheckboxBtnProps(),
  emits: {
    "update:modelValue": (value) => true,
    "update:indeterminate": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const indeterminate = useProxiedModel(props, "indeterminate");
    const model = useProxiedModel(props, "modelValue");
    function onChange(v) {
      if (indeterminate.value) {
        indeterminate.value = false;
      }
    }
    const falseIcon = computed(() => {
      return indeterminate.value ? props.indeterminateIcon : props.falseIcon;
    });
    const trueIcon = computed(() => {
      return indeterminate.value ? props.indeterminateIcon : props.trueIcon;
    });
    useRender(() => {
      const controlProps = omit(VSelectionControl.filterProps(props), ["modelValue"]);
      return createVNode(VSelectionControl, mergeProps(controlProps, {
        "modelValue": model.value,
        "onUpdate:modelValue": [($event) => model.value = $event, onChange],
        "class": ["v-checkbox-btn", props.class],
        "style": props.style,
        "type": "checkbox",
        "falseIcon": falseIcon.value,
        "trueIcon": trueIcon.value,
        "aria-checked": indeterminate.value ? "mixed" : void 0
      }), slots);
    });
    return {};
  }
});
const makeVMenuProps = propsFactory({
  // TODO
  // disableKeys: Boolean,
  id: String,
  ...omit(makeVOverlayProps({
    closeDelay: 250,
    closeOnContentClick: true,
    locationStrategy: "connected",
    openDelay: 300,
    scrim: false,
    scrollStrategy: "reposition",
    transition: {
      component: VDialogTransition
    }
  }), ["absolute"])
}, "VMenu");
const VMenu = genericComponent()({
  name: "VMenu",
  props: makeVMenuProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const isActive = useProxiedModel(props, "modelValue");
    const {
      scopeId
    } = useScopeId();
    const uid = getUid();
    const id = computed(() => props.id || `v-menu-${uid}`);
    const overlay = ref();
    const parent = inject(VMenuSymbol, null);
    const openChildren = shallowRef(0);
    provide(VMenuSymbol, {
      register() {
        ++openChildren.value;
      },
      unregister() {
        --openChildren.value;
      },
      closeParents() {
        setTimeout(() => {
          if (!openChildren.value) {
            isActive.value = false;
            parent == null ? void 0 : parent.closeParents();
          }
        }, 40);
      }
    });
    async function onFocusIn(e) {
      var _a, _b, _c;
      const before = e.relatedTarget;
      const after = e.target;
      await nextTick();
      if (isActive.value && before !== after && ((_a = overlay.value) == null ? void 0 : _a.contentEl) && // We're the topmost menu
      ((_b = overlay.value) == null ? void 0 : _b.globalTop) && // It isn't the document or the menu body
      ![void 0, overlay.value.contentEl].includes(after) && // It isn't inside the menu body
      !overlay.value.contentEl.contains(after)) {
        const focusable = focusableChildren(overlay.value.contentEl);
        (_c = focusable[0]) == null ? void 0 : _c.focus();
      }
    }
    watch(isActive, (val) => {
      if (val) {
        parent == null ? void 0 : parent.register();
        (void 0).addEventListener("focusin", onFocusIn, {
          once: true
        });
      } else {
        parent == null ? void 0 : parent.unregister();
        (void 0).removeEventListener("focusin", onFocusIn);
      }
    });
    function onClickOutside() {
      parent == null ? void 0 : parent.closeParents();
    }
    function onKeydown(e) {
      var _a, _b, _c;
      if (props.disabled)
        return;
      if (e.key === "Tab") {
        const nextElement = getNextElement(focusableChildren((_a = overlay.value) == null ? void 0 : _a.contentEl, false), e.shiftKey ? "prev" : "next", (el) => el.tabIndex >= 0);
        if (!nextElement) {
          isActive.value = false;
          (_c = (_b = overlay.value) == null ? void 0 : _b.activatorEl) == null ? void 0 : _c.focus();
        }
      }
    }
    function onActivatorKeydown(e) {
      var _a;
      if (props.disabled)
        return;
      const el = (_a = overlay.value) == null ? void 0 : _a.contentEl;
      if (el && isActive.value) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          focusChild(el, "next");
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          focusChild(el, "prev");
        }
      } else if (["ArrowDown", "ArrowUp"].includes(e.key)) {
        isActive.value = true;
        e.preventDefault();
        setTimeout(() => setTimeout(() => onActivatorKeydown(e)));
      }
    }
    const activatorProps = computed(() => mergeProps({
      "aria-haspopup": "menu",
      "aria-expanded": String(isActive.value),
      "aria-owns": id.value,
      onKeydown: onActivatorKeydown
    }, props.activatorProps));
    useRender(() => {
      const overlayProps = VOverlay.filterProps(props);
      return createVNode(VOverlay, mergeProps({
        "ref": overlay,
        "class": ["v-menu", props.class],
        "style": props.style
      }, overlayProps, {
        "modelValue": isActive.value,
        "onUpdate:modelValue": ($event) => isActive.value = $event,
        "absolute": true,
        "activatorProps": activatorProps.value,
        "onClick:outside": onClickOutside,
        "onKeydown": onKeydown
      }, scopeId), {
        activator: slots.activator,
        default: function() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return createVNode(VDefaultsProvider, {
            "root": "VMenu"
          }, {
            default: () => {
              var _a;
              return [(_a = slots.default) == null ? void 0 : _a.call(slots, ...args)];
            }
          });
        }
      });
    });
    return forwardRefs({
      id,
      \u03A8openChildren: openChildren
    }, overlay);
  }
});
const makeVVirtualScrollItemProps = propsFactory({
  renderless: Boolean,
  ...makeComponentProps()
}, "VVirtualScrollItem");
const VVirtualScrollItem = genericComponent()({
  name: "VVirtualScrollItem",
  inheritAttrs: false,
  props: makeVVirtualScrollItemProps(),
  emits: {
    "update:height": (height) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const {
      resizeRef,
      contentRect
    } = useResizeObserver();
    watch(() => {
      var _a;
      return (_a = contentRect.value) == null ? void 0 : _a.height;
    }, (height) => {
      if (height != null)
        emit("update:height", height);
    });
    useRender(() => {
      var _a, _b;
      return props.renderless ? createVNode(Fragment, null, [(_a = slots.default) == null ? void 0 : _a.call(slots, {
        itemRef: resizeRef
      })]) : createVNode("div", mergeProps({
        "ref": resizeRef,
        "class": ["v-virtual-scroll__item", props.class],
        "style": props.style
      }, attrs), [(_b = slots.default) == null ? void 0 : _b.call(slots)]);
    });
  }
});
const UP = -1;
const DOWN = 1;
const BUFFER_PX = 100;
const makeVirtualProps = propsFactory({
  itemHeight: {
    type: [Number, String],
    default: null
  },
  height: [Number, String]
}, "virtual");
function useVirtual(props, items) {
  const display = useDisplay();
  const itemHeight = shallowRef(0);
  watchEffect(() => {
    itemHeight.value = parseFloat(props.itemHeight || 0);
  });
  const first = shallowRef(0);
  const last = shallowRef(Math.ceil(
    // Assume 16px items filling the entire screen height if
    // not provided. This is probably incorrect but it minimises
    // the chance of ending up with empty space at the bottom.
    // The default value is set here to avoid poisoning getSize()
    (parseInt(props.height) || display.height.value) / (itemHeight.value || 16)
  ) || 1);
  const paddingTop = shallowRef(0);
  const paddingBottom = shallowRef(0);
  const containerRef = ref();
  const markerRef = ref();
  let markerOffset = 0;
  const {
    resizeRef,
    contentRect
  } = useResizeObserver();
  watchEffect(() => {
    resizeRef.value = containerRef.value;
  });
  const viewportHeight = computed(() => {
    var _a;
    return containerRef.value === (void 0).documentElement ? display.height.value : ((_a = contentRect.value) == null ? void 0 : _a.height) || parseInt(props.height) || 0;
  });
  const hasInitialRender = computed(() => {
    return !!(containerRef.value && markerRef.value && viewportHeight.value && itemHeight.value);
  });
  let sizes = Array.from({
    length: items.value.length
  });
  let offsets = Array.from({
    length: items.value.length
  });
  const updateTime = shallowRef(0);
  let targetScrollIndex = -1;
  function getSize(index) {
    return sizes[index] || itemHeight.value;
  }
  const updateOffsets = debounce(() => {
    const start = performance.now();
    offsets[0] = 0;
    const length = items.value.length;
    for (let i = 1; i <= length - 1; i++) {
      offsets[i] = (offsets[i - 1] || 0) + getSize(i - 1);
    }
    updateTime.value = Math.max(updateTime.value, performance.now() - start);
  }, updateTime);
  const unwatch = watch(hasInitialRender, (v) => {
    if (!v)
      return;
    unwatch();
    markerOffset = markerRef.value.offsetTop;
    updateOffsets.immediate();
    calculateVisibleItems();
    if (!~targetScrollIndex)
      return;
    nextTick(() => {
    });
  });
  watch(viewportHeight, (val, oldVal) => {
    oldVal && calculateVisibleItems();
  });
  onScopeDispose(() => {
    updateOffsets.clear();
  });
  function handleItemResize(index, height) {
    const prevHeight = sizes[index];
    const prevMinHeight = itemHeight.value;
    itemHeight.value = prevMinHeight ? Math.min(itemHeight.value, height) : height;
    if (prevHeight !== height || prevMinHeight !== itemHeight.value) {
      sizes[index] = height;
      updateOffsets();
    }
  }
  function calculateOffset(index) {
    index = clamp(index, 0, items.value.length - 1);
    return offsets[index] || 0;
  }
  function calculateIndex(scrollTop) {
    return binaryClosest(offsets, scrollTop);
  }
  let lastScrollTop = 0;
  let scrollVelocity = 0;
  let lastScrollTime = 0;
  function handleScroll() {
    if (!containerRef.value || !markerRef.value)
      return;
    const scrollTop = containerRef.value.scrollTop;
    const scrollTime = performance.now();
    const scrollDeltaT = scrollTime - lastScrollTime;
    if (scrollDeltaT > 500) {
      scrollVelocity = Math.sign(scrollTop - lastScrollTop);
      markerOffset = markerRef.value.offsetTop;
    } else {
      scrollVelocity = scrollTop - lastScrollTop;
    }
    lastScrollTop = scrollTop;
    lastScrollTime = scrollTime;
    calculateVisibleItems();
  }
  function handleScrollend() {
    if (!containerRef.value || !markerRef.value)
      return;
    scrollVelocity = 0;
    lastScrollTime = 0;
    calculateVisibleItems();
  }
  let raf = -1;
  function calculateVisibleItems() {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(_calculateVisibleItems);
  }
  function _calculateVisibleItems() {
    if (!containerRef.value || !viewportHeight.value)
      return;
    const scrollTop = lastScrollTop - markerOffset;
    const direction = Math.sign(scrollVelocity);
    const startPx = Math.max(0, scrollTop - BUFFER_PX);
    const start = clamp(calculateIndex(startPx), 0, items.value.length);
    const endPx = scrollTop + viewportHeight.value + BUFFER_PX;
    const end = clamp(calculateIndex(endPx) + 1, start + 1, items.value.length);
    if (
      // Only update the side we're scrolling towards,
      // the other side will be updated incidentally
      (direction !== UP || start < first.value) && (direction !== DOWN || end > last.value)
    ) {
      const topOverflow = calculateOffset(first.value) - calculateOffset(start);
      const bottomOverflow = calculateOffset(end) - calculateOffset(last.value);
      const bufferOverflow = Math.max(topOverflow, bottomOverflow);
      if (bufferOverflow > BUFFER_PX) {
        first.value = start;
        last.value = end;
      } else {
        if (start <= 0)
          first.value = start;
        if (end >= items.value.length)
          last.value = end;
      }
    }
    paddingTop.value = calculateOffset(first.value);
    paddingBottom.value = calculateOffset(items.value.length) - calculateOffset(last.value);
  }
  function scrollToIndex(index) {
    const offset = calculateOffset(index);
    if (!containerRef.value || index && !offset) {
      targetScrollIndex = index;
    } else {
      containerRef.value.scrollTop = offset;
    }
  }
  const computedItems = computed(() => {
    return items.value.slice(first.value, last.value).map((item, index) => ({
      raw: item,
      index: index + first.value
    }));
  });
  watch(items, () => {
    sizes = Array.from({
      length: items.value.length
    });
    offsets = Array.from({
      length: items.value.length
    });
    updateOffsets.immediate();
    calculateVisibleItems();
  }, {
    deep: true
  });
  return {
    containerRef,
    markerRef,
    computedItems,
    paddingTop,
    paddingBottom,
    scrollToIndex,
    handleScroll,
    handleScrollend,
    handleItemResize
  };
}
function binaryClosest(arr, val) {
  let high = arr.length - 1;
  let low = 0;
  let mid = 0;
  let item = null;
  let target = -1;
  if (arr[high] < val) {
    return high;
  }
  while (low <= high) {
    mid = low + high >> 1;
    item = arr[mid];
    if (item > val) {
      high = mid - 1;
    } else if (item < val) {
      target = mid;
      low = mid + 1;
    } else if (item === val) {
      return mid;
    } else {
      return low;
    }
  }
  return target;
}
const makeVVirtualScrollProps = propsFactory({
  items: {
    type: Array,
    default: () => []
  },
  renderless: Boolean,
  ...makeVirtualProps(),
  ...makeComponentProps(),
  ...makeDimensionProps()
}, "VVirtualScroll");
const VVirtualScroll = genericComponent()({
  name: "VVirtualScroll",
  props: makeVVirtualScrollProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    getCurrentInstance("VVirtualScroll");
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      containerRef,
      markerRef,
      handleScroll,
      handleScrollend,
      handleItemResize,
      scrollToIndex,
      paddingTop,
      paddingBottom,
      computedItems
    } = useVirtual(props, toRef(props, "items"));
    useToggleScope(() => props.renderless, () => {
      function handleListeners() {
        var _a, _b;
        let add = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
        const method = add ? "addEventListener" : "removeEventListener";
        if (containerRef.value === (void 0).documentElement) {
          (void 0)[method]("scroll", handleScroll, {
            passive: true
          });
          (void 0)[method]("scrollend", handleScrollend);
        } else {
          (_a = containerRef.value) == null ? void 0 : _a[method]("scroll", handleScroll, {
            passive: true
          });
          (_b = containerRef.value) == null ? void 0 : _b[method]("scrollend", handleScrollend);
        }
      }
      onScopeDispose(handleListeners);
    });
    useRender(() => {
      const children = computedItems.value.map((item) => createVNode(VVirtualScrollItem, {
        "key": item.index,
        "renderless": props.renderless,
        "onUpdate:height": (height) => handleItemResize(item.index, height)
      }, {
        default: (slotProps) => {
          var _a;
          return (_a = slots.default) == null ? void 0 : _a.call(slots, {
            item: item.raw,
            index: item.index,
            ...slotProps
          });
        }
      }));
      return props.renderless ? createVNode(Fragment, null, [createVNode("div", {
        "ref": markerRef,
        "class": "v-virtual-scroll__spacer",
        "style": {
          paddingTop: convertToUnit(paddingTop.value)
        }
      }, null), children, createVNode("div", {
        "class": "v-virtual-scroll__spacer",
        "style": {
          paddingBottom: convertToUnit(paddingBottom.value)
        }
      }, null)]) : createVNode("div", {
        "ref": containerRef,
        "class": ["v-virtual-scroll", props.class],
        "onScrollPassive": handleScroll,
        "onScrollend": handleScrollend,
        "style": [dimensionStyles.value, props.style]
      }, [createVNode("div", {
        "ref": markerRef,
        "class": "v-virtual-scroll__container",
        "style": {
          paddingTop: convertToUnit(paddingTop.value),
          paddingBottom: convertToUnit(paddingBottom.value)
        }
      }, [children])]);
    });
    return {
      scrollToIndex
    };
  }
});
function useScrolling(listRef, textFieldRef) {
  const isScrolling = shallowRef(false);
  let scrollTimeout;
  function onListScroll(e) {
    cancelAnimationFrame(scrollTimeout);
    isScrolling.value = true;
    scrollTimeout = requestAnimationFrame(() => {
      scrollTimeout = requestAnimationFrame(() => {
        isScrolling.value = false;
      });
    });
  }
  async function finishScrolling() {
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await new Promise((resolve) => {
      if (isScrolling.value) {
        const stop = watch(isScrolling, () => {
          stop();
          resolve();
        });
      } else
        resolve();
    });
  }
  async function onListKeydown(e) {
    var _a, _b;
    if (e.key === "Tab") {
      (_a = textFieldRef.value) == null ? void 0 : _a.focus();
    }
    if (!["PageDown", "PageUp", "Home", "End"].includes(e.key))
      return;
    const el = (_b = listRef.value) == null ? void 0 : _b.$el;
    if (!el)
      return;
    if (e.key === "Home" || e.key === "End") {
      el.scrollTo({
        top: e.key === "Home" ? 0 : el.scrollHeight,
        behavior: "smooth"
      });
    }
    await finishScrolling();
    const children = el.querySelectorAll(":scope > :not(.v-virtual-scroll__spacer)");
    if (e.key === "PageDown" || e.key === "Home") {
      const top = el.getBoundingClientRect().top;
      for (const child of children) {
        if (child.getBoundingClientRect().top >= top) {
          child.focus();
          break;
        }
      }
    } else {
      const bottom = el.getBoundingClientRect().bottom;
      for (const child of [...children].reverse()) {
        if (child.getBoundingClientRect().bottom <= bottom) {
          child.focus();
          break;
        }
      }
    }
  }
  return {
    onListScroll,
    onListKeydown
  };
}
const makeSelectProps = propsFactory({
  chips: Boolean,
  closableChips: Boolean,
  closeText: {
    type: String,
    default: "$vuetify.close"
  },
  openText: {
    type: String,
    default: "$vuetify.open"
  },
  eager: Boolean,
  hideNoData: Boolean,
  hideSelected: Boolean,
  menu: Boolean,
  menuIcon: {
    type: IconValue,
    default: "$dropdown"
  },
  menuProps: {
    type: Object
  },
  multiple: Boolean,
  noDataText: {
    type: String,
    default: "$vuetify.noDataText"
  },
  openOnClear: Boolean,
  itemColor: String,
  ...makeItemsProps({
    itemChildren: false
  })
}, "Select");
const makeVSelectProps = propsFactory({
  ...makeSelectProps(),
  ...omit(makeVTextFieldProps({
    modelValue: null,
    role: "combobox"
  }), ["validationValue", "dirty", "appendInnerIcon"]),
  ...makeTransitionProps$1({
    transition: {
      component: VDialogTransition
    }
  })
}, "VSelect");
const VSelect = genericComponent()({
  name: "VSelect",
  props: makeVSelectProps(),
  emits: {
    "update:focused": (focused) => true,
    "update:modelValue": (value) => true,
    "update:menu": (ue) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const vTextFieldRef = ref();
    const vMenuRef = ref();
    const vVirtualScrollRef = ref();
    const _menu = useProxiedModel(props, "menu");
    const menu = computed({
      get: () => _menu.value,
      set: (v) => {
        var _a;
        if (_menu.value && !v && ((_a = vMenuRef.value) == null ? void 0 : _a.\u03A8openChildren))
          return;
        _menu.value = v;
      }
    });
    const {
      items,
      transformIn,
      transformOut
    } = useItems(props);
    const model = useProxiedModel(props, "modelValue", [], (v) => transformIn(v === null ? [null] : wrapInArray(v)), (v) => {
      var _a;
      const transformed = transformOut(v);
      return props.multiple ? transformed : (_a = transformed[0]) != null ? _a : null;
    });
    const counterValue = computed(() => {
      return typeof props.counterValue === "function" ? props.counterValue(model.value) : typeof props.counterValue === "number" ? props.counterValue : model.value.length;
    });
    const form = useForm();
    const selectedValues = computed(() => model.value.map((selection) => selection.value));
    const isFocused = shallowRef(false);
    const label = computed(() => menu.value ? props.closeText : props.openText);
    let keyboardLookupPrefix = "";
    let keyboardLookupLastTime;
    const displayItems = computed(() => {
      if (props.hideSelected) {
        return items.value.filter((item) => !model.value.some((s) => s === item));
      }
      return items.value;
    });
    const menuDisabled = computed(() => props.hideNoData && !displayItems.value.length || props.readonly || (form == null ? void 0 : form.isReadonly.value));
    const computedMenuProps = computed(() => {
      var _a;
      return {
        ...props.menuProps,
        activatorProps: {
          ...((_a = props.menuProps) == null ? void 0 : _a.activatorProps) || {},
          "aria-haspopup": "listbox"
          // Set aria-haspopup to 'listbox'
        }
      };
    });
    const listRef = ref();
    const {
      onListScroll,
      onListKeydown
    } = useScrolling(listRef, vTextFieldRef);
    function onClear(e) {
      if (props.openOnClear) {
        menu.value = true;
      }
    }
    function onMousedownControl() {
      if (menuDisabled.value)
        return;
      menu.value = !menu.value;
    }
    function onKeydown(e) {
      var _a, _b;
      if (!e.key || props.readonly || (form == null ? void 0 : form.isReadonly.value))
        return;
      if (["Enter", " ", "ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) {
        e.preventDefault();
      }
      if (["Enter", "ArrowDown", " "].includes(e.key)) {
        menu.value = true;
      }
      if (["Escape", "Tab"].includes(e.key)) {
        menu.value = false;
      }
      if (e.key === "Home") {
        (_a = listRef.value) == null ? void 0 : _a.focus("first");
      } else if (e.key === "End") {
        (_b = listRef.value) == null ? void 0 : _b.focus("last");
      }
      const KEYBOARD_LOOKUP_THRESHOLD = 1e3;
      function checkPrintable(e2) {
        const isPrintableChar = e2.key.length === 1;
        const noModifier = !e2.ctrlKey && !e2.metaKey && !e2.altKey;
        return isPrintableChar && noModifier;
      }
      if (props.multiple || !checkPrintable(e))
        return;
      const now = performance.now();
      if (now - keyboardLookupLastTime > KEYBOARD_LOOKUP_THRESHOLD) {
        keyboardLookupPrefix = "";
      }
      keyboardLookupPrefix += e.key.toLowerCase();
      keyboardLookupLastTime = now;
      const item = items.value.find((item2) => item2.title.toLowerCase().startsWith(keyboardLookupPrefix));
      if (item !== void 0) {
        model.value = [item];
      }
    }
    function select(item) {
      if (props.multiple) {
        const index = model.value.findIndex((selection) => props.valueComparator(selection.value, item.value));
        if (index === -1) {
          model.value = [...model.value, item];
        } else {
          const value = [...model.value];
          value.splice(index, 1);
          model.value = value;
        }
      } else {
        model.value = [item];
        menu.value = false;
      }
    }
    function onBlur(e) {
      var _a;
      if (!((_a = listRef.value) == null ? void 0 : _a.$el.contains(e.relatedTarget))) {
        menu.value = false;
      }
    }
    function onAfterLeave() {
      var _a;
      if (isFocused.value) {
        (_a = vTextFieldRef.value) == null ? void 0 : _a.focus();
      }
    }
    function onFocusin(e) {
      isFocused.value = true;
    }
    function onModelUpdate(v) {
      if (v == null)
        model.value = [];
      else if (matchesSelector(vTextFieldRef.value) || matchesSelector(vTextFieldRef.value)) ; else if (vTextFieldRef.value) {
        vTextFieldRef.value.value = "";
      }
    }
    watch(menu, () => {
      if (!props.hideSelected && menu.value && model.value.length) {
        displayItems.value.findIndex((item) => model.value.some((s) => props.valueComparator(s.value, item.value)));
      }
    });
    watch(displayItems, (val, oldVal) => {
      if (!isFocused.value)
        return;
      if (!val.length && props.hideNoData) {
        menu.value = false;
      }
      if (!oldVal.length && val.length) {
        menu.value = true;
      }
    });
    useRender(() => {
      const hasChips = !!(props.chips || slots.chip);
      const hasList = !!(!props.hideNoData || displayItems.value.length || slots["prepend-item"] || slots["append-item"] || slots["no-data"]);
      const isDirty = model.value.length > 0;
      const textFieldProps = VTextField.filterProps(props);
      const placeholder = isDirty || !isFocused.value && props.label && !props.persistentPlaceholder ? void 0 : props.placeholder;
      return createVNode(VTextField, mergeProps({
        "ref": vTextFieldRef
      }, textFieldProps, {
        "modelValue": model.value.map((v) => v.props.value).join(", "),
        "onUpdate:modelValue": onModelUpdate,
        "focused": isFocused.value,
        "onUpdate:focused": ($event) => isFocused.value = $event,
        "validationValue": model.externalValue,
        "counterValue": counterValue.value,
        "dirty": isDirty,
        "class": ["v-select", {
          "v-select--active-menu": menu.value,
          "v-select--chips": !!props.chips,
          [`v-select--${props.multiple ? "multiple" : "single"}`]: true,
          "v-select--selected": model.value.length,
          "v-select--selection-slot": !!slots.selection
        }, props.class],
        "style": props.style,
        "inputmode": "none",
        "placeholder": placeholder,
        "onClick:clear": onClear,
        "onMousedown:control": onMousedownControl,
        "onBlur": onBlur,
        "onKeydown": onKeydown,
        "aria-label": t(label.value),
        "title": t(label.value)
      }), {
        ...slots,
        default: () => createVNode(Fragment, null, [createVNode(VMenu, mergeProps({
          "ref": vMenuRef,
          "modelValue": menu.value,
          "onUpdate:modelValue": ($event) => menu.value = $event,
          "activator": "parent",
          "contentClass": "v-select__content",
          "disabled": menuDisabled.value,
          "eager": props.eager,
          "maxHeight": 310,
          "openOnClick": false,
          "closeOnContentClick": false,
          "transition": props.transition,
          "onAfterLeave": onAfterLeave
        }, computedMenuProps.value), {
          default: () => {
            var _a;
            return [hasList && createVNode(VList, {
              "ref": listRef,
              "selected": selectedValues.value,
              "selectStrategy": props.multiple ? "independent" : "single-independent",
              "onMousedown": (e) => e.preventDefault(),
              "onKeydown": onListKeydown,
              "onFocusin": onFocusin,
              "onScrollPassive": onListScroll,
              "tabindex": "-1",
              "aria-live": "polite",
              "color": (_a = props.itemColor) != null ? _a : props.color
            }, {
              default: () => {
                var _a3;
                var _a2, _b, _c;
                return [(_a2 = slots["prepend-item"]) == null ? void 0 : _a2.call(slots), !displayItems.value.length && !props.hideNoData && ((_a3 = (_b = slots["no-data"]) == null ? void 0 : _b.call(slots)) != null ? _a3 : createVNode(VListItem, {
                  "title": t(props.noDataText)
                }, null)), createVNode(VVirtualScroll, {
                  "ref": vVirtualScrollRef,
                  "renderless": true,
                  "items": displayItems.value
                }, {
                  default: (_ref2) => {
                    var _a4;
                    var _a22;
                    let {
                      item,
                      index,
                      itemRef
                    } = _ref2;
                    const itemProps = mergeProps(item.props, {
                      ref: itemRef,
                      key: index,
                      onClick: () => select(item)
                    });
                    return (_a4 = (_a22 = slots.item) == null ? void 0 : _a22.call(slots, {
                      item,
                      index,
                      props: itemProps
                    })) != null ? _a4 : createVNode(VListItem, mergeProps(itemProps, {
                      "role": "option"
                    }), {
                      prepend: (_ref3) => {
                        let {
                          isSelected
                        } = _ref3;
                        return createVNode(Fragment, null, [props.multiple && !props.hideSelected ? createVNode(VCheckboxBtn, {
                          "key": item.value,
                          "modelValue": isSelected,
                          "ripple": false,
                          "tabindex": "-1"
                        }, null) : void 0, item.props.prependAvatar && createVNode(VAvatar, {
                          "image": item.props.prependAvatar
                        }, null), item.props.prependIcon && createVNode(VIcon, {
                          "icon": item.props.prependIcon
                        }, null)]);
                      }
                    });
                  }
                }), (_c = slots["append-item"]) == null ? void 0 : _c.call(slots)];
              }
            })];
          }
        }), model.value.map((item, index) => {
          function onChipClose(e) {
            e.stopPropagation();
            e.preventDefault();
            select(item);
          }
          const slotProps = {
            "onClick:close": onChipClose,
            onMousedown(e) {
              e.preventDefault();
              e.stopPropagation();
            },
            modelValue: true,
            "onUpdate:modelValue": void 0
          };
          const hasSlot = hasChips ? !!slots.chip : !!slots.selection;
          const slotContent = hasSlot ? ensureValidVNode(hasChips ? slots.chip({
            item,
            index,
            props: slotProps
          }) : slots.selection({
            item,
            index
          })) : void 0;
          if (hasSlot && !slotContent)
            return void 0;
          return createVNode("div", {
            "key": item.value,
            "class": "v-select__selection"
          }, [hasChips ? !slots.chip ? createVNode(VChip, mergeProps({
            "key": "chip",
            "closable": props.closableChips,
            "size": "small",
            "text": item.title,
            "disabled": item.props.disabled
          }, slotProps), null) : createVNode(VDefaultsProvider, {
            "key": "chip-defaults",
            "defaults": {
              VChip: {
                closable: props.closableChips,
                size: "small",
                text: item.title
              }
            }
          }, {
            default: () => [slotContent]
          }) : slotContent != null ? slotContent : createVNode("span", {
            "class": "v-select__selection-text"
          }, [item.title, props.multiple && index < model.value.length - 1 && createVNode("span", {
            "class": "v-select__selection-comma"
          }, [createTextVNode(",")])])]);
        })]),
        "append-inner": function() {
          var _a;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return createVNode(Fragment, null, [(_a = slots["append-inner"]) == null ? void 0 : _a.call(slots, ...args), props.menuIcon ? createVNode(VIcon, {
            "class": "v-select__menu-icon",
            "icon": props.menuIcon
          }, null) : void 0]);
        }
      });
    });
    return forwardRefs({
      isFocused,
      menu,
      select
    }, vTextFieldRef);
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[...id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute$1();
    const { id: productId } = route.params;
    const { fetchProduct } = ([__temp, __restore] = withAsyncContext(() => useProduct(+productId)), __temp = await __temp, __restore(), __temp);
    const {
      title,
      price,
      description,
      image,
      imageOptimized,
      rating,
      badge,
      shipping
    } = fetchProduct();
    useHead({
      title: title || ""
    });
    useServerHead({
      meta: [
        { name: "description", content: () => description || "" }
      ]
    });
    const colors = [
      {
        id: 1,
        name: "Gray"
      },
      {
        id: 2,
        name: "Black"
      },
      {
        id: 3,
        name: "White"
      },
      {
        id: 4,
        name: "Blue"
      }
    ];
    const selected = ref(colors[0]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_btn_square = resolveComponent("v-btn-square");
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "mx-4 my-16 product-details" }, _attrs))} data-v-29b9d4c6><div class="flex justify-center max-h-96 xl:max-h-[600px]" data-v-29b9d4c6><div class="-m-4 bg-white p-8 rounded-lg w-full" data-v-29b9d4c6>`);
      if (unref(imageOptimized)) {
        _push(ssrRenderComponent(VImg, {
          src: unref(imageOptimized).src,
          srcset: unref(imageOptimized).srcset,
          sizes: unref(imageOptimized).sizes,
          class: "max-h-full"
        }, null, _parent));
      } else {
        _push(ssrRenderComponent(VImg, {
          src: unref(image),
          class: "max-h-full"
        }, null, _parent));
      }
      _push(`</div></div><div class="mt-8 md:mt-0 md:mx-8" data-v-29b9d4c6><div class="relative" data-v-29b9d4c6>`);
      if (unref(badge)) {
        _push(ssrRenderComponent(VChip, {
          text: unref(badge),
          color: "primary"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<h3 class="mt-2" data-v-29b9d4c6>${ssrInterpolate(unref(title))}</h3></div><div class="flex items-center justify-between mt-2" data-v-29b9d4c6><div class="flex items-center" data-v-29b9d4c6><div data-v-29b9d4c6>`);
      _push(ssrRenderComponent(VRating, {
        class: "mt-0.5",
        density: "compact",
        "model-value": unref(rating).rate,
        size: "small",
        color: "secondary",
        "half-increments": ""
      }, null, _parent));
      _push(`</div><div class="ml-4" data-v-29b9d4c6><div class="text-sm" data-v-29b9d4c6>${ssrInterpolate(unref(rating).count)} reviews</div></div></div><div class="md:mr-4" data-v-29b9d4c6><span class="dark:text-primary-400 text-primary-500 text-xs" data-v-29b9d4c6>${ssrInterpolate(unref(shipping))}</span></div></div>`);
      if (unref(badge) || unref(shipping)) {
        _push(`<div class="flex items-center justify-between mt-4" data-v-29b9d4c6><div data-v-29b9d4c6><span class="font-bold text-xl" data-v-29b9d4c6>$${ssrInterpolate(unref(price))}</span></div><div class="md:mr-4" data-v-29b9d4c6><span data-v-29b9d4c6>Best Deals Inc.</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div data-v-29b9d4c6><div class="mt-4" data-v-29b9d4c6>`);
      _push(ssrRenderComponent(VSelect, {
        modelValue: unref(selected),
        "onUpdate:modelValue": ($event) => isRef(selected) ? selected.value = $event : null,
        items: colors,
        "item-title": "name",
        "item-value": "id",
        variant: "outlined"
      }, null, _parent));
      _push(`</div><div class="flex mt-4 w-full" data-v-29b9d4c6>`);
      _push(ssrRenderComponent(_component_v_btn_square, {
        label: "Add To Cart",
        class: "rounded-lg",
        size: "x-large",
        block: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="py-2 lg:text-lg" data-v-29b9d4c6${_scopeId}>Add To Cart</span>`);
          } else {
            return [
              createVNode("span", { class: "py-2 lg:text-lg" }, "Add To Cart")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="mt-8" data-v-29b9d4c6><span data-v-29b9d4c6>${ssrInterpolate(unref(description))}</span></div></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/store/[...id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ____id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-29b9d4c6"]]);

export { ____id_ as default };
