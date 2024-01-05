# @wakeadmin/tailwind

基于惟客云主题扩展的 tailwind 的配置预设；

## 如何使用

我们首先根据`tailwind`官方提供的[安装教程](https://tailwindcss.com/docs/guides/vite)进行安装以及初始化;

完成上述流程之后，我们需要加入`@wakeadmin/tailwind`的预设

```js
// tailwind.config.js
module.exports = {
  // ...
  preset: [require('@wakeadmin/tailwind')],
};
```

之后，我们就可以直接使用了;

<script setup>
  import ColorBlock from './ColorBlock.vue';
  import TwHeader from './TwHeader.vue';
  import BorderRadius from './BorderRadius.vue';
  import TextBlock from './TextBlock.vue';

  const colors = [
    [
      'primary-900',

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
      'secondary-900',
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
      'success-500',
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
      'danger-600',
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
      'warning-500',
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
      'info-500',
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
      '',
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

  const fontSizes = ['h1','h2','h3','h4','h5','h6'];

</script>

<style lang="scss">
  @import "@wakeadmin/theme/theme.css";
  .tw-example-group{
    max-height: 400px;
    overflow-y:auto;
    overflow-x:hidden;
    overscroll-behavior: contain;
    border-radius: 5px;
    margin: 28px 0 ;

    &::-webkit-scrollbar {
      background-color: transparent;
      width: 0.375rem;
      height: 0.375rem;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgb(203 213 225);
      border-radius: 0.25rem;
    }
  
    &::-webkit-scrollbar-track {
      border-radius: 0.25rem;
      background-color: rgb(241 245 249);
    }
  }
</style>

## 变量

### 基本色彩

这些颜色都是基本颜色，因此可以在其他地方进行使用，例如`text-xxxx`,`border-xxxx`都是可以的；

<ClientOnly>
    <div class="tw-example-group">
      <TwHeader />
      <ColorBlock name="white" size="small" />
      <ColorBlock name="black" size="small" />
      <template v-for="color of colors" :key="color[0]">
          <ColorBlock v-for="c of color[1]" :key="c" :name="c" size="small" />
      </template>
    </div>
</ClientOnly>

### 字体颜色

<ClientOnly>
    <div class="tw-example-group">
      <TwHeader />
      <ColorBlock name="white" size="small"  prefix="text-" />
      <ColorBlock name="black" size="small"  prefix="text-"/>
      <template v-for="(color, index) of colors" class="color-group" :key="index">
          <ColorBlock :key="color[0]" :name="color[0]" size="small" prefix="text-" default v-if="color[0]"/>
          <ColorBlock v-for="c of color[1]" :key="c" :name="c" size="small" prefix="text-" />
      </template>
      <ColorBlock name="link" size="small" prefix="text-" />
      <ColorBlock name="link-hover" size="small" prefix="text-" />
      <ColorBlock name="font-primary" size="small" prefix="text-" />
      <ColorBlock name="font-regular" size="small" prefix="text-" />
      <ColorBlock name="font-secondary" size="small" prefix="text-" />
      <ColorBlock name="font-placeholder" size="small" prefix="text-" />
      <ColorBlock name="font-disabled" size="small" prefix="text-" />
      <ColorBlock name="font-inverse" size="small" prefix="text-" />
    </div>
</ClientOnly>

### 边框颜色

<ClientOnly>
   <div class="tw-example-group">
      <TwHeader />
      <ColorBlock name="white" size="small" prefix="border-"   styleName="border-color" />
      <ColorBlock name="black" size="small"  prefix="border-"  styleName="border-color" />
      <template v-for="(color, index) of colors" :key="index">
          <ColorBlock v-for="c of color[1]" :key="c" :name="c" size="small" prefix="border-"  styleName="border-color " />
      </template>
        <ColorBlock name="border" size="small" default  styleName="border-color" />
        <ColorBlock name="border-dark" size="small"   styleName="border-color" />
        <ColorBlock name="border-light" size="small"   styleName="border-color" />
        <ColorBlock name="border-lighter" size="small"   styleName="border-color" />
      </div>
</ClientOnly>

### 背景颜色

<ClientOnly>
    <div class="tw-example-group">
      <ColorBlock name="bg" size="small"  default styleName="background-color"/>
      <ColorBlock name="white" size="small" prefix="bg-" styleName="background-color" />
      <ColorBlock name="bg-dark" size="small"  styleName="background-color" />
      <ColorBlock name="black" size="small"  prefix="bg-" styleName="background-color"/>
      <template v-for="(color, index) of colors" :key="index">
        <ColorBlock v-for="c of color[1]" :key="c" :name="c" size="small" prefix="bg-" styleName="background-color" />
      </template>
    </div>
</ClientOnly>

### 圆角

<ClientOnly>
    <div class="tw-example-group">
      <TwHeader />
      <BorderRadius name="radius-none" size="small"  />
      <BorderRadius name="radius-base" size="small" default  />
      <BorderRadius name="radius-sm" size="small"  />
      <BorderRadius name="radius-md" size="small"   />
      <BorderRadius name="radius-lg" size="small"  />
      <BorderRadius name="radius-full" size="small"  />
    </div>
</ClientOnly>

### 间距

这些间距跟基本色彩一样，不能直接进行使用。是提供给其他属性所使用的，我们可以通过`pd-xxxx`、`mr-xxxx`对其进行引用；

<ClientOnly>
    <div class="tw-example-group">
      <TwHeader />
      <TextBlock name="spacing-base" size="small" default val="24px" />
      <TextBlock name="spacing-xs" size="small" val="8px"  />
      <TextBlock name="spacing-sm" size="small"   val="16px"/>
      <TextBlock name="spacing-md" size="small"    val="32px"/>
      <TextBlock name="spacing-lg" size="small"   val="48px"/>
      <TextBlock name="spacing-full" size="small"  val="64px"/>
    </div>
</ClientOnly>

### zIndex

<ClientOnly>
    <div class="tw-example-group">
      <TwHeader />
      <TextBlock allowCopy name="z-normal" properties="z-index:var(--wk-z-index-normal)" size="small" val="1" />
      <TextBlock allowCopy name="z-dropdown" properties="z-index:var(--wk-z-index-dropdown)" size="small" val="1000"  />
      <TextBlock allowCopy name="z-sticky" properties="z-index:var(--wk-z-index-sticky)" size="small"   val="1020"/>
      <TextBlock allowCopy name="z-fixed" properties="z-index:var(--wk-z-index-fixed)" size="small"    val="1030"/>
      <TextBlock allowCopy name="z-modal" properties="z-index:var(--wk-z-index-modal)" size="small"   val="1040"/>
      <TextBlock allowCopy name="z-tooltip" properties="z-index:var(--wk-z-index-tooltip)" size="small"  val="1050"/>
    </div>
</ClientOnly>

### 字体大小及行高

<ClientOnly>
    <div class="tw-example-group">
      <TwHeader />
      <TextBlock v-for="size of fontSizes" :key="size" allowCopy :name="`text-${size}`" :properties="`font-size:var(--wk-font-size-${size}); \n line-height: var(--wk-font-line-height-${size});`" size="small"  />
    </div>
</ClientOnly>
