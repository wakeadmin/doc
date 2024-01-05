# 面向未来 Vue 3

<br>

**升级到 Vue 3 有很多理由：**

- 性能提升、体积优化
- 新的 Proxy 响应式系统，没有 Vue 2 的一些[限制](https://cn.vuejs.org/v2/guide/reactivity.html#%E5%AF%B9%E4%BA%8E%E5%AF%B9%E8%B1%A1)
- 新的 组合式 API, 一种更易于理解和维护的逻辑复用机制。取代 Mixin 大锅炖
- 更好的 Typescript 支持, 这对于大型项目更加友好
- 更甜的语法糖，比如 setup SFC
- 支持 Fragments, Teleport, Suspense。
- ...

<br>
<br>

**不升级 Vue 3 的理由：**

- Vue 3 有很多破坏性更新。生态不兼容。
- 项目体量大，重构成本高，风险大
- 甜点不够甜
- 我选择 React
- ...

<br>
<br>

::: tip
关于 Vue 3 一些变化，可以看官方的 [迁移指南](https://v3-migration.vuejs.org/), 以及我们整理的[预研文档](https://www.notion.so/wakedata/Vue-3-x-109566abb3e14c138635b15cb859c220)
:::

<br>

::: tip
我们提供的[基础库](../base/index.md)，以及[基座 API](./api.md) 都是兼容 Vue 2/3
:::

<br>

## 推荐策略

- 新的项目 → 推荐直接使用 Vue 3
- 规模比较小 → 考虑升级到 vue 3
- 规模比较大 → 停留 vue2, 但可以把 vue 3 的最佳实践带到 vue 2。详见下文

<br>

## 如何升级到 Vue 3?

<br>

- 运行时。 [vue/compat](https://v3-migration.vuejs.org/migration-build.html)。 在 Vue 3 运行环境，模拟 Vue 2 的一些 API。

  - 缺陷：
    - 只覆盖 Vue 2.x 文档公开定义的 API
    - 如果你的库依赖于 Vue2x 的一些内部实现，例如 底层的 VNode， 那么可能无法兼容。比如一些第三方组件库 ElementUI， 会访问这些底层细节。

- 静态： [gogocode](https://gogocode.io/zh/docs/vue/vue2-to-vue3), 支持 vue2→3, elementUI → element Plus。

  - 可以解决 80% 的迁移工作。

<br>

需要注意的是， 不管是哪种方式，都需要花费一些成本进行全量的回归测试。

<br>
<br>
<br>

## Vue 2 应用 Vue 3 的最佳实践

<br>

因此，对于老旧项目， 我们还是不建议直接升级到 Vue 3。在 Vue 2 中我们也可以应用 Vue 3 的一些最佳实践。以下是操作步骤:

- 升级 vue-cli 到 5.\*
- 生成 Vue 到 [2.7](https://blog.vuejs.org/posts/vue-2-7-naruto.html)
- 移除 vue-template-compiler
- 移除 @vue/composition-api, 这个库已经内置到 2.7 了
- 升级 wkstd 到最新版本。执行 `wkstd update`
- VSCode 安装 Volar 插件，并禁用 Vetur 插件。
- 配置 tsconfig.json, 加上以下代码
  ```json
  {
    // ...
    "vueCompilerOptions": {
      "target": 2.7
    }
  }
  ```

<br>

详细升级说明, 以及局限性见 [Vue 2.7 "Naruto" Released](https://blog.vuejs.org/posts/vue-2-7-naruto.html)

<br>
<br>
<br>
<br>
