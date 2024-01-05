# 通用依赖共享

子应用之间基础的外部依赖可能是一样的，这部分依赖如果提取出来, 可以一定程度上提升构建的速度、在生产环境也可以利用缓存来提升加载的速度。

<br>

我们的微前端方案提供两种依赖共享方案：

- 1. (已废弃) 基于基座的 [externals](https://webpack.js.org/configuration/externals/#externals)。即在基座内置依赖，子应用通过 externals 来引用。 例如：

  ```js
  const { defineConfig } = require('@vue/cli-service');
  const { defineMappChild } = require('@wakeadmin/vue-cli-plugin-mapp-child');

  module.exports = defineConfig({
    pluginOptions: {
      ...defineMappChild({
        // ...
        shared: ['vue', 'vue-router'],
      }),
    },
  });
  ```

- 2. 基于 [vendor 共享包服务](./services.md#vendor-共享包) 的方案

<br>
<br>

**有利也有弊**, 将这些依赖提取出来后就没办法对其进行优化(比如 tree-shaking)了，加载的是一个完整的包。

<br>
<br>

**而方案 1 的缺点更明显, 因此我们已经废弃了第一种方案**：

- 基座和子应用引用的是同一个模块示例， 某些库被多个子应用实例进行引用时可能会有问题
- 不能进行更精确的版本管理

<br>
<br>
<br>
<br>

## 配置共享包

::: tip

这个方案依赖于`微前端运行容器`提供的[ vendor 共享包服务](./services.md#vendor-共享包)

:::

<br>
<br>

这里需要用到 `@wakeadmin/vue-cli-plugin-vendor` 插件，先安装起来:

```shell
$ pnpm add @wakeadmin/vue-cli-plugin-vendor -D
```

<br>

vue-cli 配置示例

```js
const { defineConfig } = require('@vue/cli-service');
const { defineVendors } = require('@wakeadmin/vue-cli-plugin-vendor');

module.exports = defineConfig({
  pluginOptions: {
    ...defineVendors({
      modules: {
        vue: ['Vue', 'vue@2.7/dist/vue.runtime.js'], // 外部 CDN
        'vue-router': ['VueRouter', 'vue-router@3.5/dist/vue-router.js'],
      },
    }),
  },
});
```

<br>
<br>

## 配置项

defineVendors 支持以下参数:

| 名称                                            | 描述                                                                                                                        | 默认值                                                                                                             |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `enableInDev?: boolean`                         | 本地开发时是否开启。默认情况下， 本地开发还是从 node_modules 中加载依赖                                                     | false                                                                                                              |
| `base?: string`                                 | vendor 服务的地址, base 必须以 `/` 结束                                                                                     | 本地开发环境默认为 `/__vendor__/`, 生产环境默认为 `[%= cdnDomain ? '//' + cdnDomain : '' %][%= base %]__vendor__/` |
| `modules: {[module: string]: [string, string]}` | 模块定义。 `key` 为依赖的模块名称(即 package.json 中定义的包名)，`value` 是一个元组，第一项为 UMD 名称， 第二项为依赖的描述 |                                                                                                                    |

<br>

- `modules` 的 key 为模块名称，比如 vue、react、 @wakeadmin/xxx
- `modules` 的 value 是一个元组

  - 第一项为 UMD 名称，即该 UMD 包暴露的全局变量名。比如 vue 暴露为 Vue, vue-router 全局暴露为 VueRouter, lodash 全局暴露为 `_`。具体要看指定依赖的官方说明
  - 第二项为依赖描述。

<br>
<br>

**依赖描述**的形式为： `package@version/file`, 具体规则如下

- 必须指定版本号。比如 vue@3, vue@3.2, vue@3.2.8, vue@^3.2.0, 即语义化版本, 详见 https://www.npmjs.com/package/semver
- 不能是目录。 比如 vue@3/dist/ 是不允许的。
- 必须指定具体文件，不能是默认文件。例如 `jquery@3.2.1/dist/jquery.slim.min.js`
- 不能是 tag。 比如 vue@next、 vue@latest 是不允许的

<br>
<br>
<br>

## 示例

```jsonc
{
  // Vue 3
  "vue": ["Vue", "vue@3.2/dist/vue.runtime.global.prod.js"],
  "vue-router": ["VueRouter", "vue-router@4.1/dist/vue-router.global.prod.js"],

  // Vue 2
  "vue": ["Vue", "vue@2.7.7/dist/vue.runtime.js"],
  "vue-router": ["VueRouter", "vue-router@3.5.4/dist/vue-router.js"],

  // Vue 3 子应用, 注意，这里加了 patchGlobal 参数。因为 Vue 3 不再提供 UMD 包，全局变量不会挂载到 window 中，导致沙盒模式下会运行异常
  "vue": ["Vue", "vue@3.2/dist/vue.runtime.global.prod.js?patchGlobal=Vue"],
  "vue-router": ["VueRouter", "vue-router@4.1/dist/vue-router.global.prod.js?patchGlobal=VueRouter"]
}
```

::: danger

[Vue 3.x 以及相关的库](https://github.com/vuejs/core/tree/main/packages/vue#from-cdn-or-without-a-bundler)，不再暴露 UMD 版本，在子应用中加载需要使用 patchGlobal 参数

:::

<br>
<br>

vendor 服务基于 [jsDelivr](https://www.jsdelivr.com/), 你可以在 jsDelivr 中搜索相关的包，然后拷贝过来使用。

比如：

`https://cdn.jsdelivr.net/npm/jquery@3.2.1/dist/jquery.min.js`

将前面的`域名`和 `/npm/` 剔除, 得到 `jquery@3.2.1/dist/jquery.min.js` 就能直接拿来用啦

<br>
<br>
<br>

## 最佳实践

1. 为了降低维护的难度，以及提高缓存的命中率。 版本号建议使用 `major.minor` 形式
2. 选用压缩版本
3. 详细阅读官方包说明，选择合适的版本。比如 [Vue 3](https://github.com/vuejs/core/tree/main/packages/vue#from-cdn-or-without-a-bundler), 应该选择 `vue.runtime.global.prod.js` 版本。

<br>
<br>
<br>
<br>
