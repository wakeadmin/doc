# 基座接口服务

[微前端基座运行容器](./container.md#创建微前端基座镜像)处理提供基础的静态文件伺服功能，还暴露了一些通用的接口服务, 以满足前端的日常开发需求

<br>
<br>

## proxy 代理

```
/__proxy__?url={string}
```

<br>

这个接口主要用于跨域请求场景，比如配合 [html2Canvas](https://html2canvas.hertzen.com/proxy) 使用，用来请求跨域的图片。

<br>

示例

```
/__proxy__?url=https://pic1.zhimg.com/80/v2-1ab9bbc9db4f4b214cf9f73d36a64ab8_720w.jpg
```

<br>
<br>

默认情况下， 我们的代理只会做基本的请求转发，如果我们需要删除代理对象的响应头，比如我们不需要`Content-Disposition`，我们可以通过添加`removeHeaders`来进行删除

```
/__proxy__?url=https://pic1.zhimg.com/80/v2-1ab9bbc9db4f4b214cf9f73d36a64ab8_720w.jpg&removeHeaders=Content-Disposition
```

如果有多个值的话，通过`,`进行隔开

<br>
<br>

## polyfill 兼容包

::: warning

当前接口还是实验性的

:::

```
/__polyfill__
```

<br>

polyfill 服务基于 [polyfill.io](https://polyfill.io/v3/), 它会根据当前浏览器版本自动生成需要的 polyfill 填充物。 好处就是我们不需要包含一个巨大的 polyfill 包，较新的浏览器可以获取到更好的体验。

<br>

- polyfill 服务使用了，以下 [polyfill.io 的选项](https://polyfill.io/v3/url-builder/)。包含了常见的语言特性和 DOM 特性。

  - default
  - es2015
  - es2016
  - es2017
  - es2018
  - es2019
  - es2020
  - fetch
  - globalThis

  其他特性，比如 Intl、Reflect 等特性不会包含。有特殊的需求，可以使用 features 选项显式定义, 例如:

  ```
  /__polyfill__?features=Intl.DateTimeFormat,Intl.Locale
  ```

  <br>
  <br>

- 微前端基座默认会加载 `__polyfill__`, 因此子应用不需要加载
- **使用了 polyfill 服务之后, `@babel/preset-env` 的 [`useBuiltIns`](https://babeljs.io/docs/en/babel-preset-env#usebuiltins) 选项就可以设置为 `false` 了**。[`helper`](https://babeljs.io/docs/en/babel-plugin-transform-runtime#helpers) 和 [`regenerator`](https://babeljs.io/docs/en/babel-plugin-transform-runtime#regenerator) 还是需要根据设置的浏览器底线进行加载, 维持原有配置就行。

  [vue-cli 的配置参考这个文档](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/babel-preset-app#polyfills)

<br>

::: danger

本接口不能通过 CDN 域名访问

:::

<br>

::: tip

[polyfill.io 和 babel polyfill 的区别](https://github.com/Financial-Times/polyfill-service/issues/1739)

:::

<br>
<br>
<br>

## vendor 共享包

<br>

```
/__vendor__/package@version/file
```

<br>
<br>

vendor 服务基于 [jsDelivr](https://www.jsdelivr.com/)。 可以更好地加载第三方资源。我们也利用它实现了[通用依赖的共享](./vendors.md)

使用示例:

```txt
/__vendor__/vue-router@4.1/dist/vue-router.global.prod.js
/__vendor__/jquery@3.2.1/dist/jquery.min.js
/__vendor__/font-awesome@4.7.0/fonts/FontAwesome.otf
```

<br>
<br>

你可以在 jsDelivr 中搜索相关的包，然后拷贝过来使用。 比如： `https://cdn.jsdelivr.net/npm/jquery@3.2.1/dist/jquery.min.js`

将前面的`域名`和 `/npm/` 剔除, 得到 `jquery@3.2.1/dist/jquery.min.js` 就能直接拿来用啦。

<br>
<br>
<br>
