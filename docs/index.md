---
layout: home
hero:
  name: WakeAdmin
  text: 惟客前端管理后台开发框架
  tagline: '我来惟客只办三件事，提效，提效，还是他 * 的提效 (PS: 内测中)'
  image:
    src: /logo.png
    alt: WakeAdmin
  actions:
    - theme: brand
      text: 开始吧
      link: /mapp/index
features:
  - icon: 🎛
    title: 微前端
    details: 将离散的应用，转换为星状结构，规范管理起来
  - icon: 💅
    title: 主题
    details: 可配置化的主题规范，统一 UI 视觉
  - icon: 👨‍🦽
    title: 图标库
    details: 我们不切图
  - icon: 🎁
    title: 组件库
    details: 后台界面开发的宝箱(coming soon)
  - icon: 🪖
    title: 基础库
    details: 高效开发的底层支撑

  - icon: 🔫
    title: 开发规范
    details: 还不都是为你好
---

<div class="join-group">
  <img class="join-group__img" src="/group.png">
  <div class="join-group__text">进入交流群</div>
</div>

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: linear-gradient(120deg, #bd34fe, #ff6c0e);
  --vp-home-hero-image-background-image: linear-gradient( -45deg, #bd34fe60 30%, #ff6c0e60 );
  --vp-home-hero-image-filter: blur(72px); 
}

.join-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
}

.join-group__img {
  width: 200px;
  border-radius: 10px;
}

.join-group__text {
  margin-top: 10px;
}
</style>
