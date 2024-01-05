---
aside: false
---

# 惟客云图标库

## 安装和使用

```shell
$ pnpm add @wakeadmin/icons
```

<br>
<br>

:::info
@wakeadmin/icons 兼容 vue2/3
:::

<br>
<br>

使用:

```html
<template>
  <div><DeleteBin /></div>
</template>

<script setup>
  import { DeleteBin } from '@wakeadmin/icons';
</script>
```

图标组件的渲染结果就是 `<svg>`, 你可以使用 CSS 进行控制:

```html
<template>
  <div><DeleteBin class="my-icon" /></div>
</template>

<script setup>
  import { DeleteBin } from '@wakeadmin/icons';
</script>

<style>
  .my-icon {
    fill: green;
    width: 32px;
    height: 32px;
  }
</style>
```

<br>
<br>

配合 ElIcon 使用, 和 element-plus 的图标用法完全一样:

```html
<ElIcon color="green"><DeleteBin /></ElIcon>
```

<br>
<br>

在微前端基座及其子应用中，可以通过 `<wkc-icon>` 来渲染图标，不需要额外导入：

```html
<div><wkc-icon icon="Add" /></div>
```


## 图标索引

点击图标进行拷贝。

<script setup>
  import * as Icons from '@wakeadmin/icons'

  const handleCopy = (key) => {
    navigator.clipboard.writeText(`<${key} />`)
  }

</script>

<div class="doc-icons">
  <div v-for="(item, key) in Icons" :key="key" class="doc-icon" title="点击拷贝" @click="handleCopy(key)">
    <component :is="item" />
    <div class="doc-icon__name">{{ key }}</div>
  </div>
</div>

<style lang="scss" scoped>
  .doc-icons {
    display: flex;
    flex-wrap: wrap;
  }

  .doc-icon {
    width: 100px;
    height: 100px;
    margin: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: 1px solid currentColor;
    box-sizing: border-box;
    color: gray;

    &:hover {
      color: #e35919;
    }


    & > svg {
      width: 50px;
      height: 50px;
      fill: currentColor;
    }

    &__name {
      font-size: 13px;
      word-break: break-all;
      text-align: center;
      line-height: 1;
    }
  }
</style>
