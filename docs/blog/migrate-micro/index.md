# 微前端升级

![Hikari](./hikari.jpg)

<br>
<br>

[toc]

<br />
<br>

## Webpack 升级 Vue-Cli

http://www.wakedata.net/pages/viewpage.action?pageId=25265849

<br>
<br>

## vue 升级成 2.7

对于老旧项目， 我们还是不建议直接升级到 Vue 3。在 Vue 2 中我们也可以应用 Vue 3 的一些最佳实践。以下是操作步骤:

- 升级 vue-cli 到 5.\*

- 生成 Vue 到 [2.7](https://blog.vuejs.org/posts/vue-2-7-naruto.html)

- 移除 vue-template-compiler

- 移除 @vue/composition-api, 这个库已经内置到 2.7 了

- 升级 wkstd 到最新版本。执行 `wkstd update`

- VSCode 安装 Vue language Features (Volar)、Typescript Vue plugin (Volar)插件，并禁用 Vetur 插件。

- 配置 tsconfig.json, 加上以下代码

  ```
  {
    // ...
    "vueCompilerOptions": {
      "target": 2.7
    }
  }
  ```

详细升级说明, 以及局限性见 [Vue 2.7 "Naruto" Released](https://blog.vuejs.org/posts/vue-2-7-naruto.html)

<br>
<br>
<br>

## 依赖安装

安装以下依赖

| name                                 | description                       | required | devDependencies |
| ------------------------------------ | --------------------------------- | -------- | --------------- |
| @wakeadmin/bay                       | 基座                              | ✅       | ❎              |
| @wakeadmin/h                         | 适用于 vue2、vue3 的自定义 jsx 库 | ❎       | ❎              |
| @wakeadmin/i18n-legacy               | vue2 的 i18n 库                   | ❎       | ❎              |
| @wakeadmin/docker-build              | docker 镜像打包脚本               | ✅       | ✅              |
| @wakeadmin/tailwind                  | 基于惟客云主体的 tailwind 预设    | ❎       | ✅              |
| @wakeadmin/vue-cli-plugin-i18n       | i18n 语言包资源打包插件           | ❎       | ✅              |
| @wakeadmin/vue-cli-plugin-mapp-child | 微前端子应用打包插件              | ✅       | ✅              |
| @wakeadmin/vue-cli-plugin-vendor     | 微前端通用依赖共享插件            | ❎       | ✅              |
| babel-preset-wakeadmin               | jsx 转换插件                      | ❎       | ✅              |

<br>
<br>

如果使用到了`wk-bz-common`，请更新到`3.0.0-ddd-dev35`以上的版本；

在`wk-bz-common@3.0.0-ddd-dev35`这个版本，我们对`baseIndex`增加了微前端的支持，并且废弃了对`wkb-common-ui`的样式导入。

> - 如果有使用到`@wakeadmin/h`的话，不要忘记调整`babel.config.js`。
> - 如果引入了`tailwindcss`的话，需要注意一些`classname`是否是`tailwindcss`的类名。
> - 不是很建议使用`@wakeadmin/h`
> - 目前基座所使用的主题包的`element-ui`是`2.14.1`，请确保子应用的版本一致

<br>
<br>
<br>

## 接入基座

在依赖处理完之后，我们就开干~~肝~~

<br>

### 更新`vue.config.js`

```js
// vue.config.js
// ....
const { defineMappChild } = require('@wakeadmin/vue-cli-plugin-mapp-child');

// 静态资源的输出目录
const PUBLIC_PATH = path.join(__dirname, './dist/__public__');

const name = INDUSTRY ? INDUSTRY + upperFirst(pkg.name) : pkg.name;
const mappConfig = defineMappChild({
  name,
  // 这里定义的变量可以在代码中通过 process.env.* 访问，也可以在 html 模板中使用
  // @ts-expect-error
  constants: {
    ...config.constants,
    // CDN URL 源, 例如 //example.com:9090, 注意没有 '/' 后缀
    // 生产环境使用模板, 避免硬编码
    CDN_ORIGIN: IS_PRODUCTION ? `[% cdnDomain ? '//' + cdnDomain : '' %]` : config.constants.CDN_DOMAIN,
  },
  mapp: {
    activeRule: `${INDUSTRY ? `/${INDUSTRY}` : ''}/dsp.html`,
    alias: pkg.name,
  },
});

module.exports = defineConfig({
  // ....
  pluginOptions: {
    ...mappConfig,
  },
  // ....
  // 如果有静态资源的话，丢到指定的目录里
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'xxxx',
            to: PUBLIC_PATH,
          },
        ],
      }),
    ],
  },
});
```

<br>

### 更新`main.js`， 接入`bay`

```js
import bay from '@wakeadmin/bay';
import baseIndex from 'wk-bz-common/src/business/base-index-for-mapp';
// ....
let unmount;

bay.createMicroApp({
  async bootstrap() {
    // @ts-ignore
    store.registerModule('dspStore', dspStore);

    store.registerModule('marketingModule', storeModule);
  },
  async mount(container) {
    unmount = baseIndex(
      App,
      { router, i18n },
      {
        redirectToBrand: false, // 没有创建品牌信息时，是否需要重定向到品牌创建页面。true：需要，false：不需要
        checkAppStatus: false, // 是否检查当前店铺状态，判断是否需要跳转到功能订购页面。true：检查，false：不检查
        getUserTemplate: true, // 为了获取自定义小程序页面路径
      },
      // @ts-ignore
      container?.querySelector('#app') ?? '#app'
    );
  },
  async unmount() {
    // @ts-ignore
    unmount?.();
  },
});
// ....
```

<br>

### 隐藏头部导航以及左侧的菜单，销毁全局事件

### 修改样式

### 镜像构建

::: info

部署脚本说明查考[该链接](../../base/docker-build.md)

:::

在`scripts/`新增以下文件

1. `build.sh`

   ```js
   #!/usr/bin/env bash

   set -e
   set -x

   # 容器构建
   # 需要提供以下参数
   # DOCKER_USER docker 用户
   # DOCKER_PASSWORD docker 用户密码

   if [ "$STAGE" = 'PRODUCTION' ]; then
     export DOCKER_SERVER=ccr.ccs.tencentyun.com
   else
     export DOCKER_SERVER=172.26.59.200
   fi

   env
   node -v

   npm i -g pnpm
   pnpm -v
   pnpm install

   # 构建静态资源
   pnpm build

   # 构建镜像
   node ./scripts/docker-build.js

   # 发布
   node ./scripts/docker-publish.js

   # 更新
   node ./scripts/rancher-update.js

   ```

2. `check.sh`

   ```js
   #!/usr/bin/env bash

   set -e
   set -x

   # 规范检查

   env
   node -v

   npm i -g pnpm
   pnpm -v
   pnpm install

   # 构建
   pnpm run --if-present build

   # 规范检查
   pnpm wkstd gerrit-check

   # 单元测试
   pnpm run --if-present test

   ```

3. `docker-build.js`

   ```js
   const { build } = require('@wakeadmin/docker-build');
   const { DOCKER_IMAGE_NAME } = require('./shared');

   build(DOCKER_IMAGE_NAME, {}, '--pull');
   ```

4. `docker-publish.js`

   ```js
   const { publish, clean } = require('@wakeadmin/docker-build');
   const { DOCKER_IMAGE_NAME, DOCKER_VERSION, DOCKER_PUBLISH_LATEST } = require('./shared');

   // 发布需要提供 DOCKER_USER、DOCKER_PASSWORD、DOCKER_SERVER 等环境变量

   publish(DOCKER_IMAGE_NAME, DOCKER_VERSION, DOCKER_PUBLISH_LATEST);
   clean(DOCKER_IMAGE_NAME);
   ```

5. `rancher-update.js`

   ```js
   const { update } = require('@wakeadmin/docker-build');
   const { PRODUCTION, DOCKER_IMAGE_NAME, DOCKER_VERSION, INDUSTRY } = require('./shared');

   // Rancher 项目名称
   const PROJECT = process.env.PROJECT;

   if (!PRODUCTION && PROJECT) {
     update(DOCKER_IMAGE_NAME, DOCKER_VERSION, {
       project: PROJECT,
       workload: 'wakeadmin-apps',
       container: 'app-dsp' + (INDUSTRY ? '-' + INDUSTRY : ''),
     });
   }
   ```

6. `shared.js`

   ```js
   // @ts-check
   const pkg = require('../package.json');

   // 行业
   const INDUSTRY = process.env.INDUSTRY ?? '';
   const PRODUCTION = process.env.STAGE === 'PRODUCTION';
   const NOW = new Date();
   const BUILD_ID =
     process.env.BUILD_ID ??
     `${NOW.getFullYear()}${NOW.getMonth() + 1}${NOW.getDate()}${NOW.getHours()}${NOW.getMinutes()}`;

   // 镜像名称
   const DOCKER_IMAGE_NAME = `wkfe/app-dsp${INDUSTRY ? '-' + INDUSTRY : ''}`;

   // 镜像版本
   let DOCKER_VERSION = pkg.version;

   if (!PRODUCTION) {
     // 非正式版本使用 `-snapshot-BUILD`
     DOCKER_VERSION = DOCKER_VERSION + `-snapshot-${BUILD_ID}`;
   }

   const DOCKER_PUBLISH_LATEST = process.env.DOCKER_PUBLISH_LATEST === 'true';

   module.exports = {
     INDUSTRY,
     DOCKER_IMAGE_NAME,
     DOCKER_VERSION,
     DOCKER_PUBLISH_LATEST,
   };
   ```

<br>
<br>
<br>

### 接入多语言

1. 安装对应的依赖

2. 调整菜单的语言`key`

   ```json
   // $t(`menu.${node.identifierPath}$`);
   // identifierPath 为菜单节点的全路径权限标识符
   // 以 $ 结尾。也就是说，你配置的语言包的 ‘叶子节点' 都要以 $ 结束
   {
     "menu": {
       "marketing$": "Marketing",
       "marketing": {
         "autoMarketing$": "Journeys",
         "autoMarketing": {
           "autoMarketing_group$": "Journey List",
           "autoMarketing_group": {
             "all_group$": "All Segments",
             "default_group$": "Default Group",
             "deleted_group$": "Deleted Journey",
             "regression_group$": "Regression Grouping",
             "test_group$": "Test Group"
           },
           "autoMarketing_template$": "Journey Template",
           "thirdEvent$": "Third Events",
           "webHook$": "WebHook",
           "webHook": {
             "add$": "New",
             "privateKey$": "Key Information"
           }
         }
       }
     }
   }
   ```

   > 注册@wakeadmin/i18n-legacy 时，不要添加默认的语言资源

### 接入 icon

我们左侧菜单的菜单图标需要我们向`bay`进行注册

1. 我们需要对`svg`进行一些调整，比如修改`fillColor`为`currentColor`等

2. 最后 我们只需要导入对应的`svg`文件，并向`bay`注册即可，注册完成之后，我们也可以通过`wkc-icon`进行使用

   ```js
   // icon.js
   import bay from '@wakeadmin/bay';
   /**
    * 手动维护要导入的svg
    *
    * ?raw -> 自定义导入规则 目的为直接导入原始的svg数据
    */
   import xxxIcon from 'xxxxx.svg?raw';

   // 注册
   bay.registerAsset('icon-xxx', xxxIcon);
   ```

### 跨域代理处理

类似于`dss-web`，或者是`dsp`的`pdf`预览，都存在一些跨域、处理对应响应头的问题，这个时候我们可以借助基座提供的代理服务进行处理

```js
// 目标地址
const url = 'xxxxxxx';
// 要删除的响应头
const removeHeaders = 'xxx,xxx,xxx';

const res = `https://wdcloud-test-wakedt.cn/__proxy__?url=${url}&removeHeaders=${removeHeaders}`;
```

### http 请求以及错误弹窗

目前基座会对所有的 http 请求进行拦截，如果我们明确不需要让基座进行拦截的话，可以手动添加`X-Disable-Intercept=true`来进行跳过

错误弹窗这边建议统一使用`element-ui`的`message`来进行处理
