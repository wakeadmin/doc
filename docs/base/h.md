# @wakeadmin/h

`@wakeadmin/h` 是一个适用于 Vue 2/3 的 JSX 库，旨在为 Vue 提供跨域 2/3 版本的 JSX 支持。

<br>

它抹平 Vue 2/3 在[渲染函数上的差异](https://www.notion.so/wakedata/Vue-2-3-302cbe0e37794345bbfbd89e32d617db), 语法以 [Vue 3 为准](https://vuejs.org/guide/extras/render-function.html)。 因此 `@wakeadmin/h` 后续将成为我们的组件库、业务组件库的重要基础。

## 动机

- Vue 2/3 JSX [语法差异巨大](https://www.notion.so/wakedata/Vue-2-3-302cbe0e37794345bbfbd89e32d617db)
- Vue JSX 语法、使用习惯、标准属于另起炉灶，和 React 等主流 JSX 使用习惯差异很大。
- [Vue JSX 插件(@vue/babel-plugin-jsx)](https://github.com/vuejs/jsx-next) 新增了很多语法糖，且依赖于 Babel 转译。不能被 Typescript、ESbuild 等遵循标准 JSX 转译器识别
- 除了语法上， h 还抹平了一些内部运行时的差异。
- 更好地支持 Typescript 类型检查

<br>
<br>

## 安装和配置

<br>

### For vue-cli

```shell
$ pnpm add @wakeadmin/h
$ pnpm add babel-preset-wakeadmin -D
```

<br>
<br>

vue-cli 配置示例:

```js
// babel.config.js
module.exports = {
  // 关闭 vue 自己的 JSX 插件
  presets: [['@vue/cli-plugin-babel/preset', { jsx: false }], 'babel-preset-wakeadmin'],
};
```

<br>

如果在 vue-cli 中启用了 Typescript， ts/tsx 文件会率先经过 ts-loader 转换，因此 `tsconfig.json` 也需要配置才行：

```diff
// tsconfig.json
{
  "compilerOptions": {
+   // 支持 JSX, 不转换 JSX，让 babel 统一处理就行
+    "jsx": "preserve",
+    "jsxImportSource": "@wakeadmin/h",
    // ...
  },
  // ...
}
```

<br>

### For Vite

```shell
$ pnpm add @wakeadmin/h
```

配置 tsconfig.json

```diff
{
  "compilerOptions": {
+    "jsx": "react-jsx",
+    "jsxImportSource": "@wakeadmin/h",
     // ....
  }
}
```

<br>
<br>
<br>
<br>

## 使用示例

```tsx
/**
 * 基座错误页面
 */
import { ErrorPageProps } from '@wakeadmin/mapp/main';
import { ElButton, ElSpace } from 'element-plus';

import './index.scss';

const goHome = () => window.location.replace('/');
const goBack = () => window.history.back();

export function ErrorPage(props: ErrorPageProps) {
  let children: JSX.Element;

  if (props.type === 'http') {
    const code = props.code ?? '500';

    const detail = (
      <div class="bay-error__detail">
        <ElSpace>
          <ElButton onClick={goBack}>返回</ElButton>
          <ElButton onClick={goHome}>回到首页</ElButton>
        </ElSpace>
      </div>
    );

    if (code === '404') {
      children = <wkc-error-page-not-found>{detail}</wkc-error-page-not-found>;
    } else if (code === '403') {
      children = <wkc-error-page-forbidden>{detail}</wkc-error-page-forbidden>;
    } else {
      children = <wkc-error-page description={`服务请求异常(${code}), 请稍后重试`} />;
    }
  } else {
    children = (
      <wkc-error-page description={props.title}>
        {!!props.detail && <div class="bay-error__detail">{props.detail}</div>}
      </wkc-error-page>
    );
  }

  return <div class="bay-error-page">{children}</div>;
}
```

<br>
<br>

yes, 就是 React JSX 的味道。我们使用了 Automatic Runtime, 因此不需要额外的导入。

<br>
<br>

## 语法

语法完全以 Vue 3 为标准，详细查阅[这个文档](https://vuejs.org/guide/extras/render-function.html)。

<br>

考虑到 Vue 2 下使用，我们也重新封装导出了以下方法，**如果你要开发跨版本的库，应该始终从 @wakeadmin/h 中导入这些 API，而不是从 vue 中导入**：

- 组件
  - Transition
  - TransitionGroup
  - KeepAlive
  - Teleport
  - Suspense
  - Fragment
- API
  - resolveComponent
  - resolveDirective
  - withDirectives

<br>
<br>

除此之外，我们还扩展了一个 v-slots 属性支持，因为在 Vue 3 中，[slot 推荐以对象的形式传递](https://vuejs.org/guide/extras/render-function.html#passing-slots)：

```jsx
<MyComponent>
  {{
    default: () => <div>default slot</div>,
    foo: () => h('div', 'foo'),
    bar: () => [h('span', 'one'), h('span', 'two')],
  }}
</MyComponent>
```

<br>

或者使用 v-slots 后的语法：

```jsx
<MyComponent
  v-slots={{
    foo: () => h('div', 'foo'),
    bar: () => [h('span', 'one'), h('span', 'two')],
  }}
>
  <div>default slot</div>
</MyComponent>
```

<br>
<br>
<br>
<br>
<br>

## 跨版本组件定义

@wakeadmin/h 也包含了 `declareComponent` 函数，用于定义跨版本的组件， 这个函数内部会抹平一些运行时差异，并提供更好的 Typescript 支持:

<br>

```tsx
const Counter = declareComponent({
  name: 'Counter',
  props: declareProps<{
    initialValue?: number;
  }>(['initialValue']),
  emits: declareEmits<{ change: (value: number) => void }>(),
  setup(props, { emit }) {
    // 使用 withDefaults 配置默认值
    const { initialValue } = toRefs(withDefaults(props, { initialValue: 0 }));
    const count = ref(initialValue);

    const handleClick = () => {
      count.value++;

      emit('change', count.value);
    };

    return () => (
      <div title="count" onClick={handleClick}>
        count: {count.value}
      </div>
    );
  },
});
```

<br>
<br>
<br>

以下函数，用于配合 declareComponent，来声明组件的 Typescript 外形：

- `declareProps<T extends {}>(list: Array<keyof T>): T` 定义 props
  <br>

  ::: danger

  注意， list 是必填的， 否则 Vue 会将没有在列表中的 props 当作 attrs

  :::

  <br>

- `declareExpose<T extends {}>(): T` 定义 expose

  ```tsx
  const Ref = declareComponent({
    name: 'Ref',
    expose: declareExpose<{ a: number; b: () => number; refValue: number }>(),
    setup(_, { expose }) {
      const refValue = ref(1);
      expose({ a: 1, b: () => 1, refValue });
      return () => <div></div>;
    },
  });

  // 引用
  const instanceRef = ref<ExtraRef<typeof Ref>>();
  <Ref ref={instanceRef} />;
  ```

    <br>
    <br>

- `declareSlots<T extends { [key: string]: {} }>(): { [K in keyof T]: T[K] extends never ? () => VNodeChild : (scope: T[K]) => VNodeChild }` 定义 slot

  ```tsx
  const Test = declareComponent({
    // key 为 slot 名称， value 的参数类型
    slots: declareSlots<{ default: never; header: string }>(),
    setup(props, { slots }) {
      return () => (
        <div>
          <header>{slots.header?.('header')}</header>
          {slots.default?.()}
        </div>
      );
    },
  });
  ```

  <br>
  <br>

- `declareEmits<T extends { [key: string]: Function }>(): T` 定义事件

  ```tsx
  const Test = declareComponent({
    // 统一使用驼峰式
    emits: declareEmits<{
      change: (a: number) => void;
      clickMe: () => void;
      'update:modelValue': (value: number) => void;
    }>(),
    setup(props, { emit }) {
      emit('change', 'a');
      emit('click-me');
      emit('update:modelValue', 1);
    },
  });
  ```

<br>
<br>
<br>
<br>

## Typescript 类型工具

- `type MaybeRef<T> = Ref<T> | T`
- `ExtraRef<T>` 从 declareComponent 创建的组件中提取 ref 类型
- `ExtraArrayRef<T>` 从 declareComponent 创建的组件中提取列表渲染 ref 类型
- `ExtraProps<T>` 从 declareComponent 创建的组件中提取 Props 类型
