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

<br>
<br>
<br>
<br>

### 方法

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
