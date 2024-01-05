# Vue

<br>
<br>

[[toc]]

<br>
<br>

::: tip

本规范在[ Vue 风格指南](https://v3.cn.vuejs.org/style-guide/#%E8%A7%84%E5%88%99%E7%B1%BB%E5%88%AB) 的基础上扩展

:::

<br>
<br>
<br>

## 模板

<br>

- **:boom: 禁止：v-if/v-for 放在同一个元素上**

  其优先级在 vue2/3 有差异，避免放在同一个元素上

<br>

---

- **:boom: 禁止使用 `slot`、`slot-scope` 属性**

  [已废弃](https://cn.vuejs.org/v2/api/#slot-%E5%BA%9F%E5%BC%83)。目前只有 Web Component 应该使用 slot 属性

<br>

---

- **:boom: 禁止：在 template 中编写复杂的逻辑和表达式**

  应该提取到 computed、methods 中

<br>

---

- **:boom: 禁止 `filter` 使用函数或 computed 代替**

  [在 Vue 3 已废弃](https://v3-migration.vuejs.org/breaking-changes/filters.html)

<br>

---

- **:boom: 禁止: v-for 没有配置 key**

---

- **:boom: 禁止：key 为非数字和字符串**

---

- **:call_me_hand: 推荐： 统一使用指令的简写模式， `:` for `v-bind:`, `@` for `v-on:` and `#` for `v-slot`**

---

- **:call_me_hand: 推荐：SFC 使用 `<template>`、`<script>`、`<style>` 的声明顺序**

---

- **:call_me_hand: 推荐：使用 `composition API` + `<script setup>` 语法**

---

- **:call_me_hand: 推荐：使用 `Typescript` 编写组件和声明组件的接口， 推荐使用 `defineProps`、`defineExpose`、`defineEmits` 等宏**

---

- **:call_me_hand: 推荐： `*.vue` 文件使用 `CamelCase.vue` 命名**

---

- **:call_me_hand: 推荐：template 标签、属性，统一使用`驼峰式`**

<br>
<br>
<br>

## 复用

<br>
<br>

- **:boom: 禁用 Mixins**

  使用 Composition API 封装 hooks

---

- **:call_me_hand: 推荐：不管是 Option API 还是 Composition API 代码的组织都遵循一定的顺序，进行必要的分组和断行，提高代码的可读性**

  [遵循 Vue 官方建议](https://vuejs.org/style-guide/rules-recommended.html#component-instance-options-order)

---

- **:call_me_hand: 推荐： 按需引入组件库**

---

- **:boom: 禁止: 全局扩展 Vue**

  不要污染全局

---

- **:boom: 禁止： 禁止修改 props**

<br>
<br>
<br>

## 自定义组件

<br>
<br>

- **:boom: 禁止: 依赖 `.native` 修饰符实现组件功能**

  Vue 3 中已废弃， 显式优于隐式

---

- **:warning: 避免： 使用 Vue `$listeners`、`$children`、`$on`、`$once`、`$off` 、`$parent`**

  Vue 3 中已废弃

<br>
<br>
<br>

## 样式

<br>
<br>

- **:boom: 禁止： 禁止引用第三方组件库的 CSS 变量(CSS/SCSS/LESS)**

---

- **:warning: 避免：使用复杂选择器、标签选择器、ID 选择器。统一使用 类 选择器**

---

- **:boom: 禁止：直接覆盖组件库样式，应该放在当前组件的根节点命名空间下覆盖**

---

- **:warning: 避免：通过 CSS 规则覆盖第三方组件库样式。**

  通过 CSS 规则覆盖第三方组件库样式，会导致耦合组件库的内部实现和结构。优先使用组件暴露的 class、style 影响组件样式

---

- **:call_me_hand: 推荐：使用 scoped 隔离样式**

---

- **:call_me_hand: 推荐：样式类名使用 BEM 命名，禁止使用驼峰式**

---

- **:call_me_hand: 推荐： 使用 `:deep()` 不要使用 `/deep/` 和 `>>>`**

  `/deep/` `>>>` 会在 Vue 3 中[废弃](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0023-scoped-styles-changes.md)

---

<br>
<br>
<br>

## 其他

<br>
<br>

- **:call_me_hand: 推荐：使用命名路由, 避免耦合页面路径**
