# 主题

::: info
根据惟客云平台 UI 规范定义: https://codesign.qq.com/s/GyOl9yVmqn0dxaW/OD8r0BXKByjRXkg
:::

<br>

::: tip

点击[这里](../mapp/theme.md) 查看微前端框架下，如何定制主题

:::

<script setup>
  import ColorBlock from './ColorBlock.vue'

  const colors = [
    [
      '主色',

      [
        'primary-900',
        'primary-800',
        'primary-700',
        'primary-600',
        'primary-500',
        'primary-400',
        'primary-300',
        'primary-200',
        'primary-100',
        'primary-50',
      ],
    ],
    [
      '副色',
      [
        'secondary-900',
        'secondary-800',
        'secondary-700',
        'secondary-600',
        'secondary-500',
        'secondary-400',
        'secondary-300',
        'secondary-200',
        'secondary-100',
        'secondary-50',
      ],
    ],

    [
      '成功',
      [
        'success-900',
        'success-800',
        'success-700',
        'success-600',
        'success-500',
        'success-400',
        'success-300',
        'success-200',
        'success-100',
        'success-50',
      ],
    ],

    [
      '失败',
      [
        'danger-900',
        'danger-800',
        'danger-700',
        'danger-600',
        'danger-500',
        'danger-400',
        'danger-300',
        'danger-200',
        'danger-100',
        'danger-50',
      ],
    ],

    [
      '警告',
      [
        'warning-900',
        'warning-800',
        'warning-700',
        'warning-600',
        'warning-500',
        'warning-400',
        'warning-300',
        'warning-200',
        'warning-100',
        'warning-50',
      ],
    ],

    [
      '信息',
      [
        'info-900',
        'info-800',
        'info-700',
        'info-600',
        'info-500',
        'info-400',
        'info-300',
        'info-200',
        'info-100',
        'info-50',
      ],
    ],

    [
      '中性',
      [
        'gray-900',
        'gray-800',
        'gray-700',
        'gray-600',
        'gray-500',
        'gray-400',
        'gray-300',
        'gray-200',
        'gray-100',
        'gray-50',
        'gray-0',
      ],
    ],
  ];

</script>

<style lang="scss">
  @import "@wakeadmin/theme/theme.css";
</style>

## 品牌色的应用

品牌色是体现产品特性和传播理念最直观的视觉元素之一。在色彩选取时，需要先明确品牌色在界面中的使用场景及范围。 在基础色板中选择主色，我们建议选择色板从浅至深的第六个颜色作为主色。 WakeData 的品牌色取自基础色板的橘黃色， Hex 值为#f0762b，应用场景包括：关键行动点，操作状态、重要信息高亮，图形化等场景。

<br>
<br>

<ClientOnly>
  <div>
    <ColorBlock name="primary" />
    <ColorBlock name="secondary" />
  </div>
</ClientOnly>

<br>
<br>
<br>
<br>

## 功能色

功能色代表了明确的信息以及状态，比如成功、出错、失败、提醒、链接等。功能色的选取需要遵守用户对色彩的基本认知。 我们建议在一套产品体系下，功能色尽量保持一致，不要有过多的自定义干扰用户的认知体验。

<br>
<br>

<ClientOnly>
  <div>
    <ColorBlock name="success"></ColorBlock>
    <ColorBlock name="info"></ColorBlock>
    <ColorBlock name="warning"></ColorBlock>
    <ColorBlock name="danger"></ColorBlock>
  </div>
</ClientOnly>

<br>
<br>
<br>
<br>

## 中性色

中性色主要被大量的应用在界面的文字部分，此外背景、边框、分割线等场景中也非常常见。产品中性色的定义需要考虑深色背景以及浅色背景的差异， 同时结合 WCAG 2.0 标准。

<br>
<br>
<br>
<br>

## 调色盘

<ClientOnly>
  <div v-for="color of colors" class="color-group" :key="color[0]">
    <div class="color-group__name">{{color[0]}}</div>
    <div class="color-group__body">
      <ColorBlock v-for="c of color[1]" :key="c" :name="c" size="small" />
    </div>
  </div>
</ClientOnly>

<ClientOnly>
  <div class="color-group">
    <div class="color-group__name">基础</div>
    <div class="color-group__body">
      <ColorBlock name="white" size="small" style="color: black; border: 1px solid gray" />
      <ColorBlock name="black" size="small"  />
    </div>
  </div>
</ClientOnly>

<br>
<br>
<br>
<br>

## 组件

<ClientOnly>
<div>
  <div class="color-group">
    <div class="color-group__name">字体</div>
    <div class="color-group__body">
      <ColorBlock name="font-primary" size="small"><div class="color-desc">字体主色, 用于需要突出显示地方</div></ColorBlock>
      <ColorBlock name="font-regular" size="small" ><div class="color-desc">正文颜色，用于大篇幅文字展示</div></ColorBlock>
      <ColorBlock name="font-secondary" size="small" ><div class="color-desc">次要颜色，常用于描述语</div></ColorBlock>
      <ColorBlock name="font-placeholder" size="small" ><div class="color-desc">占位符</div></ColorBlock>
      <ColorBlock name="font-disabled" size="small" ><div class="color-desc">禁用颜色</div></ColorBlock>
      <ColorBlock name="font-inverse" size="small" style="color: gray; border: 1px solid gray" ><div class="color-desc">反相颜色，用于深色背景</div></ColorBlock>
    </div>
  </div>

  <div class="color-group">
    <div class="color-group__name">边框颜色</div>
    <div class="color-group__body">
      <ColorBlock name="border-dark" size="small" style="color: gray" ><div class="color-desc">深色边框</div></ColorBlock>
      <ColorBlock name="border" size="small" style="color: gray"  ><div class="color-desc">常规边框</div></ColorBlock>
      <ColorBlock name="border-light" size="small" style="color: gray"  ><div class="color-desc">浅色边框</div></ColorBlock>
      <ColorBlock name="border-lighter" size="small" style="color: gray"  ><div class="color-desc">浅色+边框</div></ColorBlock>
      <ColorBlock name="border-extra-light" size="small" style="color: gray" ><div class="color-desc">浅色++边框</div></ColorBlock>
    </div>
  </div>

  <div class="color-group">
    <div class="color-group__name">背景颜色</div>
    <div class="color-group__body">
      <ColorBlock name="bg" size="small" style="color: gray" ><div class="color-desc">背景</div></ColorBlock>
      <ColorBlock name="bg-dark" size="small" style="color: gray" ><div class="color-desc">背景深亿一点点</div></ColorBlock>
    </div>
  </div>

  <div class="color-group">
    <div class="color-group__name">链接颜色</div>
    <div class="color-group__body">
      <ColorBlock name="link" size="small"  ><div class="color-desc">链接</div></ColorBlock>
      <ColorBlock name="link-hover" size="small" ><div class="color-desc">链接悬停</div></ColorBlock>
    </div>
  </div>
</div>
</ClientOnly>

<style lang="scss">
  .color-group {
    margin-bottom: 2em;
    &__name {
      font-weight: bold;
      line-height: 3;
    }
  }

  .color-desc {
    font-size: 13px;
    margin-top: 5px;
  }

</style>
