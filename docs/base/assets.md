# @wakeadmin/assets

assets 库主要用于主题定制, 定义文案、静态资源的扩展点，详见 [布局与主题](../mapp/theme.md#主题包)

::: tip

兼容 Vue 2/3, 可以用于基座和子应用

:::

<br>

## API

- `getAsset(key: string, fallback: string): string` 获取资源，fallback 必须提供
- `registerAsset(key: string, value: string): void` 注册资源
- `listenAssets(sub: () => void): Dispose` 监听资源变动
- `useAssets(key: MayRef<string>, fallback: MaybeRef<string>): Ref<string>` Vue Hooks 版本 getAsset

<br>
<br>

使用示例：

```html
<<template>
  <img :src="logo" />
</template>

<script setup>
  import { useAssets } from '@wakeadmin/assets';

  const logo = useAssets('MY_LOGO', DEFAULT_LOGO);
</script>
```

<br>
<br>

**不过大部分情况，assets 都是通过[运行容器](../mapp/deploy.md)注入**， 模板示例:

<br>

```html
<!--
  [%- `<script>
    // 静态资源注入
    (window.__MAPP_ASSETS__ = (window.__MAPP_ASSETS__ || [])).push(${JSON.stringify(assets)});
    </script>`
  %]
 -->
```
