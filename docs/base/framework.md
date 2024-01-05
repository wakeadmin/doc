# @wakeadmin/framework

<br>
<br>

::: tip

@wakeadmin/framework 支持 Vue 2/3

:::

`@wakeadmin/framework` 是 [`@wakeapp/framework`](https://wakedata.notion.site/wakeapp-framework-b08cb3cb5f8e49f597aa90bbb89a1641) 的 Vue 移植版本， API 基本保持同步。

主要区别在于数据响应式方案。`@wakeapp/framework` 配合使用的是 [Mobx](https://mobx.js.org/react-integration.html)。然而 Vue 框架本身就是以响应式数据为核心的，因此没有必要引入 Mobx。

<br>

## 与 @wakeapp/framework 的差异

<br>

### 响应式数据

好在 Vue 3 的 Composition API 将相关的响应式数据 API 暴露给了我们，我们得以在 Vue 组件之外应用响应式数据。我们基于 reactive、ref、shadowRef、computed 等 Composition API 模拟了 Mobx 的相关接口。

<br>

在 @wakeadmin/framework 下我们支持以下 mobx 接口的**子集**：

- `@override` 用于子类覆盖响应式字段
- `@observable`、`@observable.ref`、`@observable.shallow` 声明响应式数据
- `@computed` 计算数据
- [`watch` 方法](https://vuejs.org/api/reactivity-core.html#watch)
- `makeObservable(target)`

::: warning

除上面列举的函数，其余 mobx API 均不支持

:::

<br>
<br>

### 不支持的 API

注册和获取组件相关 API 不支持：

- registerComponent
- overrideComponent
- useInjectComponent

<br>

::: warning

注意 `@wakeadmin/framework` 的 `@page` 作用域，依赖于 `vue-router`, 只用项目使用了 vue-router 才能生效

:::

<br>
<br>

### Hooks 基于 Vue Composition API 重写

用法基本保持一致，规范则遵循 [Vue Composition API](https://vuejs.org/guide/reusability/composables.html)习惯

<br>
<br>
<br>

## 安装和配置

<br>

```shell
$ pnpm add @wakeadmin/framework
$ pnpm add babel-preset-wakeadmin -D
```

<br>
<br>

vue-cli 配置示例

<br>

`babel.config.js`:

```js
module.exports = {
  // 关闭 vue 自己的 JSX 插件
  presets: [['@vue/cli-plugin-babel/preset', { jsx: false }], 'babel-preset-wakeadmin'],
};
```

<br>

在 vue-cli 中 ts/tsx 文件会率先经过 ts-loader 转换，因此 tsconfig.json 也需要配置才行：

```diff
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "strict": true,
+   // 支持 JSX, 不转换 JSX，让 babel 统一处理就行
+    "jsx": "preserve",
+    "jsxImportSource": "@wakeadmin/h",
    "moduleResolution": "node",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "useDefineForClassFields": true,
    "sourceMap": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },
    "lib": ["esnext", "dom", "dom.iterable", "scripthost"],
+   // 支持 装饰器语法
+    "experimentalDecorators": true,
+    "emitDecoratorMetadata": true,
+    // 支持 @wakeadmin/framework @observable 等语法
+    "useDefineForClassFields": true,
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue", "tests/**/*.ts", "tests/**/*.tsx"],
  "exclude": ["node_modules"]
}
```

<br>
<br>
<br>

## 使用示例

vue 配置(Vue 2 为例):

```ts
import Framework from '@wakeadmin/framework';
import Vue from 'vue';

Vue.use(Framework);
```

<br>

示例：

```tsx
// 注意，这里的 makeObservable、observable 从 @wakeadmin/framework 导入，而不是 mobx
import { injectable, page, makeObservable, observable } from '@wakeadmin/framework';

// 声明需求映射
declare global {
  interface DIMapper {
    'DI.CounterModel': CounterModel;
  }
}

// 实现
@injectable()
@page()
export class CounterModel {
  @observable
  count: number = 0;

  constrcutor() {
    makeObservable(this);
  }

  increment = () => {
    this.count++;
  };

  decrement = () => {
    this.count--;
  };
}
```
