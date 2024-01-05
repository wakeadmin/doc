# History 模式子应用

<br>

微前端基座支持 [History 路由模式](https://router.vuejs.org/zh/guide/essentials/history-mode.html#html5-%E6%A8%A1%E5%BC%8F), 需要将 `routeMode` 设置为 `history`：

<br>

```js{10}
const { defineConfig } = require('@vue/cli-service');
const { defineMappChild } = require('@wakeadmin/vue-cli-plugin-mapp-child');

module.exports = defineConfig({
  transpileDependencies: false,
  pluginOptions: {
    ...defineMappChild({
      mapp: {
        activeRule: '/my-app',
        routeMode: 'history',
      }
    }),
  }
});
```

<br>
<br>

当 routeMode 为 history 时， 基座不会将[下级菜单当做 hash 路径](../menu.md#1-惟客云菜单配置基本概念)进行拼接。

<br>
<br>

## Vue 2 路由配置示例

<br>

```js
import VueRouter from 'vue-router';
import bay from '@wakeadmin/bay';
import { urlJoin } from '@wakeadmin/utils';

const router = new VueRouter({
  mode: 'history',
  // 设置基础路径
  base: bay.isMicroApp ? urlJoin(bay.getBayBaseUrl(), '/my-app') : '/my-app',
  routes: [
    /*...*/
  ],
});
```

<br>
<br>
<br>

## Vue 3 路由配置示例

<br>

```js
import { createRouter, createWebHistory } from 'vue-router';
import bay from '@wakeadmin/bay';
import { urlJoin } from '@wakeadmin/utils';

const router = createRouter({
  history: createWebHistory(bay.isMicroApp ? urlJoin(bay.getBayBaseUrl(), '/my-app') : '/my-app'),
  routes: [
    //...
  ],
});
```
