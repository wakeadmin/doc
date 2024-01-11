# @wakeadmin/docker-build

本库用于 Docker 构建、发布和清理。

<br>
<br>
<br>

## API

### 环境变量

- `DOCKER_USER: string`: 用户名，用于发布
- `DOCKER_PASSWORD: string`: 密码， 用于发布
- `DOCKER_SERVER?: string`: 发布的 registry, 用于发布。 例如 `172.26.59.200`(不需要指定 protocol), 默认为 Docker 官方镜像
- `DOCKER_SKIP_LOGIN?: boolean`: 是否跳过登录

在 0.2+ 版本，本库新增了 buildx 支持，可以取代掉 build、clean、publish 三个函数，并扩展了一些参数。详见下文

<br>
<br>
<br>
<br>

### 方法

- (0.2 新增) buildx(options, ...args: string): void

  新版本的构建方式，基于 Docker 的 buildx, 支持多平台镜像构建

  options 定义：

  ```ts
  interface Options {
    imageName?: string; // 镜像名称, 支持 DOCKER_IMAGE_NAME 环境变量配置, 也可以在 package.json 中配置
    platforms?: string[]; // 构建平台, 支持 DOCKER_PLATFORMS(使用,分割) 环境变量配置, 也可以在 package.json 中配置
    enablePlatforms?: boolean; // 是否支持多平台构建, 默认 true, 支持 DOCKER_ENABLE_PLATFORMS(true/false) 环境变量配置
    tags?: string | string[]; // 支持指定多个 tag, 支持 DOCKER_TAGS 环境变量配置, 也可以在 package.json 中配置(tags(数组)或 tag(字符串)), 默认会使用 package.json version 作为 tag
    latest?: boolean; // 是否发布 latest 版本, 默认 true, 支持 DOCKER_PUBLISH_LATEST(true/false) 环境变量配置
    push?: boolean; // 是否发布, 默认 true, 支持 DOCKER_PUSH(true/false) 环境变量配置
    buildArguments?: Record<string, string | undefined>; // 构建参数, 支持 DOCKER_BUILD_ARGS(NAME=VALUE,NAME=VALUE) 环境变量配置
    host?: string; // 镜像仓库地址, 支持 DOCKER_SERVER 环境变量配置
    user?: string; // 镜像仓库用户名, 支持 DOCKER_USER 环境变量配置
    password?: string; // 镜像仓库密码, 支持 DOCKER_PASSWORD 环境变量配置
    skipLogin?: boolean; // 是否跳过登录, 默认 false, 支持 DOCKER_SKIP_LOGIN(true/false) 环境变量配置
    skipIfTagBuilded?: boolean; // 如果 tag 已经构建过，是否跳过构建, 默认 true, 支持 DOCKER_SKIP_IF_TAG_BUILDED(true/false) 环境变量配置
    pull?: boolean; // 是否拉取最新镜像, 默认 false, 支持 DOCKER_PULL(true/false) 环境变量配置
    dryRun?: boolean; // 是否 dry run, 默认 false, 支持 DOCKER_DRY_RUN(true/false) 环境变量配置
  }
  ```

  新的方法支持从多个来源来获取参数，比如 package.json 或者 环境变量。可以更加简洁地定义构建的过程, 优先级如下：

  - 函数参数
  - 环境变量
  - package.json

  <br>
  <br>
  <br>

  其中， imageName 和 tags 还支持模板写法。package.json 示例：

  ```json
  {
    "name": "@wakeadmin/member",
    // 镜像名称
    "imageName": "wkfe/app-member",
    "private": true,
    "version": "1.1.2",
    "productVersion": "V5.3.0",
    "description": "大会员引擎项目",
    "packageManager": "pnpm@7.33.6",
    "engines": {
      "node": ">=16.0.0",
      "pnpm": "^7.0.0"
    },
    "browserslist": "Chrome 60",
    // 使用模板
    "tag": "<%= pkg.productVersion || VERSION %><%= env.STAGE === 'PRODUCTION' ? ('-' + pkg.version) : ('-snapshot-' + BUILD_ID) %>",
    // 多平台构建控制
    "platforms": ["linux/amd64", "linux/arm64"]
  }
  ```

  <br>
  <br>
  <br>
  <br>

- `build(imageName: string, buildArguments?: Record<string, string>, ...args: string[]): void`: 镜像构建

  - imageName 为镜像名称
  - buildArguments: 详见 [ARG 构建参数](https://yeasy.gitbook.io/docker_practice/image/dockerfile/arg), 这些参数也可以在[模板](#模板)中访问。内置变量：

    - `HOST_PREFIX`: 从 `DOCKER_SERVER` 中解析出来的服务器前缀， 比如 DOCKER_SERVER 指定为 `172.26.59.200`, 那么 HOST_PREFIX 为 `172.26.59.200/`。 可以用于从同一个 registry 中拉取镜像：

      ```docker
      ARG HOST_PREFIX
      FROM ${HOST_PREFIX}wkfe/base
      ```

    - `NOW`: 时间戳，可以用于强制 Docker 构建缓存失效

      ```docker
      ARG HOST_PREFIX
      FROM ${HOST_PREFIX}wkfe/base

      WORKDIR /data
      COPY ./workspace ./

      ARG NPM_REGISTRY=https://registry.npmjs.org/

      # 这个参数是为了避免缓存，让 docker 始终执行 npm install
      ARG NOW=1

      RUN echo registry=${NPM_REGISTRY} > .npmrc && npm install && npm list
      ```

    - `UUID`: 唯一 id

    <br>
    <br>

  - args 手动指定的 `docker build` 参数, 比如 `--pull`

<br>
<br>
<br>

- `publish(imageName: string, version: string, latest = true): void`: 镜像发布
  - imageName 为镜像名称
  - version 版本号
  - latest 是否标记为 latest 版本

<br>

- `clean(imageName: string): void`: 本地镜像清理。这是为了避免占用本地空间，一定程度上也可以避免构建缓存

<br>

- `update(imageName: string, version: string, target: Target): void`: 触发 Rancher 更新, target 参数为：
  - `project: string` Rancher 项目名称
  - `namespace?: string` 命名空间，默认等于 project
  - `workload: string` 工作负载名称
  - `container?: string` 需要更新的容器，默认等于 workload

<br>
<br>
<br>
<br>

## 模板

`@wakeadmin/docker-build` build 也支持识别 `Dockerfile.tpl` 文件，`Dockerfile.tpl` 中可以使用 [lodash 模板语法](https://lodash.com/docs/4.17.15#template)，变量值可以来源于 `build()` 函数:

<br>
<br>

```docker
FROM <%=HOST_PREFIX%>wkfe/mapp

WORKDIR /data
COPY ./dist /data/source/__entry__
COPY ./vendors /data/source/__vendors__

# 基座版本号
ENV MAPP_VERSION=<%=VERSION%>

# 默认主题包
ENV MAPP_NPM_THEME=<%=THEME%>

```

<br>
<br>

## CLI 模式

0.2 版本， buildx 也支持命令行模式，可以通过 `npx @wakeadmin/docker-build buildx` 来执行构建。
