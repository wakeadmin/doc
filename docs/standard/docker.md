# 镜像构建规范

## 镜像命名规范

<br>

```txt
wkfe/<type>-<name>-[INDUSTRY]
```

<br>

- `type` 应用类型。可选
  - `app`: 微前端子应用
  - `res`: 静态资源，比如 C 端小程序提取出来的静态图片、语言包
- `name`: 应用名称
- `INDUSTRY`: 行业名称。可选标品可以忽略

<br>
<br>

<br>
<br>
<br>
<br>

## 版本规范

- 业务应用应该遵循[惟客云产品版本规范](http://www.wakedata-inc.com/pages/viewpage.action?pageId=20220351)。最后和后端对应模块的版本号保持一致，方便运维人员选择
- 业务无关应用遵循语义化版本号规范
- 测试版本以 `-snapshot-<BUILD>` 为后缀

<br>

示例：

```txt
wkfe/app-dsp:4.1.0-snapshot-122
wkfe/app-dsp-ky:4.2.0
```

<br>
<br>
<br>
<br>

## 发布

- 测试环境发布到[内网 Harbor](http://172.26.59.200/harbor/sign-in?redirect_url=%2Fharbor%2Fprojects), 例如 `172.26.59.200/wkfe/single`
- 生产环境发布到腾讯云私有化镜像库, 例如 `ccr.ccs.tencentyun.com/wkfe/app-dsp`

<br>
<br>
<br>
<br>

## K8s Pod、Sidecar 命名规范

- `wakeadmin`：微前端基座
- `wakeadmin-apps`：微前端子应用挂载
  - `子应用 sidecar`: **使用镜像名称命名**, 比如 `镜像名`为 `wkfe/app-dsp`, 那么就命名为 `app-dsp`，同理诸如 `app-dsp-ky`、`app-cdp`、`app-scrm`、`app-web`、`app-web-bc`、`app-web-home`...
- `wakeadmin-*`: 其他独立后台服务， 例如 wakeadmin-ma、wakeadmin-manage
- `wakeapp-*`: C 端服务，比如 H5 页面、小程序 CDN 资源

<br>
<br>
<br>
<br>

## Jenkins Job 命名

Jenkins 镜像构建 Job 的命名也推荐和仓库保持一致, 但是 Job 名称不能包含 '/', 可以使用'-'替换

- `check-<仓库名称>`: 代码规范检查 Job
- `build-<仓库名称>`: 项目构建 Job

<br>
<br>
<br>
<br>
