# 运行容器安全配置

运行容器内置了一些安全配置规则。开发者可以按需通过[`环境变量`](./container.md#配置来源)或者`配置文件`的形式进行扩展。

<br>

[[toc]]

<br>
<br>
<br>

## 跨域

容器默认的跨域规则：

```shell
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: *
Access-Control-Allow-Headers: *
```

如果配置了 `domain(MAPP_DOMAIN)`, 那么 `Access-Control-Allow-Origin` 配置为 domain 指定的值。

<br>

我们也允许通过 `allowOrigin(MAPP_ALLOW_ORIGIN)` 来完全自定义 `Access-Control-Allow-Origin`

<br>
<br>
<br>
<br>

## CSP

### 默认配置

容器内置了一个通用的 CSP 配置，这个配置足以满足大部分场景，另外我们也提供了一些参数帮助你来微调 CSP 配置。

默认配置如下:

- `default-src`:

  - 'self'
  - cdnDomain 配置变量
  - domain 配置变量
  - 常见的公共服务
    - 腾讯地图： `*.qq.com`, `*.gtimg.com`
    - 百度地图： `*.baidu.com`, `*.bdstatic.com`, `*.bdimg.com`

- `img-src`: `* data: blob:`
- `media-src`: `https: blob:`
- `object-src`: `'none'`, 禁用 flash
- `form-action`: `'self' ${domain} ${cdnDomain}`
- `frame-ancestors`: `'self' ${domain}`
- `style-src`: 继承 `default-src`, 并扩展了 `'unsafe-inline'`
- `script-src`: 继承 `default-src`, 并扩展了 `'unsafe-eval' 'unsafe-inline'`。
- `font-src`: 继承 `default-src`, 并扩展了 `:data`

<br>
<br>

微调参数：

| 变量                                 | 数据类型                       | 描述                                                                                                                         | 管理指令          |
| ------------------------------------ | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| allowUrls (MAPP_ALLOW_URLS)          | string, 多个 url 使用 ',' 分割 | 添加允许的 url，将追加到 `default-src`                                                                                       | `default-src`     |
| allowLocalApp (MAPP_ALLOW_LOCAL_APP) | boolean, 默认关闭              | 是否允许本地应用。**如果要开启微前端本地子应用开发，需要开启这个选项**。开启后将允许 `localhost`、`127.0.0.1` 域名的资源加载 | `default-src`     |
| allowFrames (MAPP_ALLOW_FRAMES)      | string, 多个 url 使用 ',' 分割 | 添加 iframe 白名单                                                                                                           | `frame-src`       |
| allowHosts (MAPP_ALLOW_HOSTS)        | string, 多个 url 使用 ',' 分割 | 添加宿主(即当前页面允许被哪些域名, 以 iframe 的形式嵌入)白名单                                                               | `frame-ancestors` |
| cspReportUri (MAPP_CSP_REPORT_URI)   | string                         | 添加 CSP 异常的上报地址                                                                                                      | `report-uri`      |

<br>
<br>

**💥 最后，默认的 CSP 是 ReportOnly 状态，即仅警告，不会拦截实际的运行，你需要手动配置 `cspEnabled(MAPP_CSP_ENABLED)` 开启。**

<br>
<br>
<br>

### 自定义配置

可以通过 `contentSecurityPolicy(MAPP_CONTENT_SECURITY_POLICY)` 完全自定义 `Content-Security-Policy`。

如果传入 `false` 将关闭 CSP, 容器会自动回退到 `X-XSS-Protection=1;mode=block`

<br>
<br>
<br>
<br>

## 其他内置添加的安全报头

- `X-Content-Type-Options=nosniff` [禁止 Content-type 嗅探](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options)
- `X-Frame-Options=SAMEORIGIN` [预防点击劫持](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options)，默认仅支持同源的 iframe。 可以通过 `xFrameOptions(MAPP_X_FRAME_OPTIONS)` 自定义配置

<br>
<br>
<br>

## 变量索引

| 变量名                                                 | 类型                           | 描述                                                                                                                         |
| ------------------------------------------------------ | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `domain` (MAPP_DOMAIN)                                 | string                         | 网站域名，将影响跨域配置和 CSP                                                                                               |
| `cdnDomain` (MAPP_CDN_DOMAIN)                          | string                         | 网站 CDN 域名，将影响 CSP                                                                                                    |
| `allowOrigin` (MAPP_ALLOW_ORIGIN)                      | string                         | 自定义 `Access-Control-Allow-Origin` 配置                                                                                    |
| `contentSecurityPolicy` (MAPP_CONTENT_SECURITY_POLICY) | string / boolean               | 自定义 `Content-Security-Policy` 配置, 可以设置为 false 禁用                                                                 |
| **💥 `cspEnabled` (MAPP_CSP_ENABLED)**                 | boolean(默认 false)            | 开启默认 CSP 规则                                                                                                            |
| `allowUrls` (MAPP_ALLOW_URLS)                          | string(',' 分隔)               | 添加允许的 url，将追加到 `default-src`                                                                                       |
| `allowLocalApp` (MAPP_ALLOW_LOCAL_APP)                 | boolean(默认 false)            | 是否允许本地应用。**如果要开启微前端本地子应用开发，需要开启这个选项**。开启后将允许 `localhost`、`127.0.0.1` 域名的资源加载 |
| `allowFrames` (MAPP_ALLOW_FRAMES)                      | string(',’ 分隔)               | 添加 iframe 白名单                                                                                                           |
| `allowHosts` (MAPP_ALLOW_HOSTS)                        | string, 多个 url 使用 ',' 分割 | 添加宿主(即当前页面允许被哪些域名, 以 iframe 的形式嵌入)白名单                                                               |
| `cspReportUri` (MAPP_CSP_REPORT_URI)                   | string                         | 添加 CSP 异常的上报地址                                                                                                      |

<br>
<br>

**💥 最后，默认的 CSP 是 ReportOnly 状态，即仅警告，不会拦截实际的运行，你需要手动配置 `cspEnabled(MAPP_CSP_ENABLED)` 开启。**

<br>
<br>
<br>

### 自定义配置

可以通过 `contentSecurityPolicy(MAPP_CONTENT_SECURITY_POLICY)` 完全自定义 `Content-Security-Policy`。

如果传入 `false` 将关闭 CSP, 容器会自动回退到 `X-XSS-Protection=1;mode=block`

<br>
<br>
<br>
<br>

## 其他内置添加的安全报头

- `X-Content-Type-Options=nosniff` [禁止 Content-type 嗅探](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options)
- `X-Frame-Options=SAMEORIGIN` [预防点击劫持](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options)，默认仅支持同源的 iframe。 可以通过 `xFrameOptions(MAPP_X_FRAME_OPTIONS)` 自定义配置

<br>
<br>
<br>

## 变量索引

| 变量名                                                 | 类型                | 描述                                                                                                                         |
| ------------------------------------------------------ | ------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `domain` (MAPP_DOMAIN)                                 | string              | 网站域名，将影响跨域配置和 CSP                                                                                               |
| `cdnDomain` (MAPP_CDN_DOMAIN)                          | string              | 网站 CDN 域名，将影响 CSP                                                                                                    |
| `allowOrigin` (MAPP_ALLOW_ORIGIN)                      | string              | 自定义 `Access-Control-Allow-Origin` 配置                                                                                    |
| `contentSecurityPolicy` (MAPP_CONTENT_SECURITY_POLICY) | string / boolean    | 自定义 `Content-Security-Policy` 配置, 可以设置为 false 禁用                                                                 |
| **💥 `cspEnabled` (MAPP_CSP_ENABLED)**                 | boolean(默认 false) | 开启默认 CSP 规则                                                                                                            |
| `allowUrls` (MAPP_ALLOW_URLS)                          | string(',' 分隔)    | 添加允许的 url，将追加到 `default-src`                                                                                       |
| `allowLocalApp` (MAPP_ALLOW_LOCAL_APP)                 | boolean(默认 false) | 是否允许本地应用。**如果要开启微前端本地子应用开发，需要开启这个选项**。开启后将允许 `localhost`、`127.0.0.1` 域名的资源加载 |
| `allowFrames` (MAPP_ALLOW_FRAMES)                      | string(',’ 分隔)    | 添加 iframe 白名单                                                                                                           |
| `cspReportUri` (MAPP_CSP_REPORT_URI)                   | string              | 添加 CSP 异常的上报地址                                                                                                      |
| `xFrameOptions` (MAPP_X_FRAME_OPTIONS)                 | string              | 自定义 `X-Frame-Options` 配置                                                                                                |

| `cspReportUri` (MAPP_CSP_REPORT_URI) | string | 添加 CSP 异常的上报地址 |
| `xFrameOptions` (MAPP_X_FRAME_OPTIONS) | string | 自定义 `X-Frame-Options` 配置 |
