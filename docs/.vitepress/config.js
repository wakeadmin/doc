const commonHeads = [
  ['meta', { name: 'google-site-verification', content: 'JrmhhHwR9CgKUyPUL9cqjJGDpDnK_E72RP0tK8OwNBs' }],
  ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/viewerjs@1.10.5/dist/viewer.min.css' }],
  [
    'script',
    {
      src: 'https://cdn.jsdelivr.net/npm/viewerjs@1.10.5/dist/viewer.min.js',
    },
  ],
];

export default {
  title: 'WakeAdmin',
  description: '惟客后台开发框架',
  lastUpdated: true,
  transformHtml: async code => {
    return code;
  },
  // baidu 统计
  head:
    process.env.NODE_ENV === 'production'
      ? [
          ...commonHeads,
          [
            'script',
            {},
            `var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?8f89c6abfda75f0236c445c32f4940aa";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();`,
          ],
        ]
      : [...commonHeads],
  themeConfig: {
    siteTitle: 'WakeAdmin 后台框架',
    logo: '/logo.png',
    footer: {
      message: '客户经营，找惟客',
      copyright: 'Copyright © 2022-present WakeData',
    },
    algolia: {
      appId: 'K59QSJJE30',
      apiKey: '8dc96980959f984c1aa2993147302d72',
      indexName: 'wakeadmin',
    },
    outlineTitle: '页面大纲',
    editLink: {
      pattern: 'http://gitlab.wakedata-inc.com/wakeadmin/doc/-/blob/master/docs/:path',
      text: 'Edit this page on Gitlab',
    },
    nav: [
      {
        text: '微前端',
        link: '/mapp/index',
      },
      {
        text: '框架',
        items: [
          {
            text: '主题',
            link: '/theme/color',
          },
          {
            text: '图标库',
            link: '/icons/index',
          },
          {
            text: '组件库',
            link: 'https://wakeadmin.github.io/components/',
          },
          {
            text: '基础库',
            link: '/base/index',
          },
          {
            text: '一键部署',
            link: 'https://wakeadmin.wakedata.com/k8s-deploy/index.html',
          },
        ],
      },
      {
        text: '开发规范',
        link: '/standard/vue',
      },
      {
        text: 'Blog',
        link: '/blog/index',
      },
      {
        text: '惟客前端知识体系',
        link: 'https://wakedata.notion.site',
      },
      {
        text: 'Wakeapp C 端框架',
        link: 'https://wakedata.notion.site/WakeApp-C-edeba49151684816af6cfb8625035e5a?pvs=4',
      },
    ],
    sidebar: {
      '/mapp/': [
        {
          text: '开始',
          items: [
            {
              text: '概述',
              link: '/mapp/index',
            },
            {
              text: '快速开始',
              link: '/mapp/quick-start',
            },
          ],
        },
        {
          text: '指南',
          items: [
            {
              text: '面向未来：Vue 3',
              link: '/mapp/vue3',
            },
            {
              text: '菜单配置与权限管理',
              link: '/mapp/menu',
            },
            {
              text: '布局与主题',
              link: '/mapp/theme',
            },
            {
              text: '子应用集成',
              link: '/mapp/integration',
            },
            {
              text: '部署',
              link: '/mapp/deploy',
            },
            { text: '基座 API', link: '/mapp/api' },
            { text: 'FAQ', link: '/mapp/faq' },
          ],
        },
        {
          text: '高级',
          items: [
            {
              text: '运行容器',
              link: '/mapp/advanced/container',
            },
            {
              text: '运行容器-安全篇',
              link: '/mapp/advanced/safe',
            },
            {
              text: '运行容器-无Sidecar模式部署',
              link: '/mapp/advanced/no-sidecar',
            },
            {
              text: 'History 模式子应用',
              link: '/mapp/advanced/history',
            },
            {
              text: '主题包定制',
              link: '/mapp/advanced/theme',
            },
            {
              text: '多业态子应用',
              link: '/mapp/advanced/polymorphic',
            },
            {
              text: '基座接口服务',
              link: '/mapp/advanced/services',
            },
            {
              text: '通用依赖共享',
              link: '/mapp/advanced/vendors',
            },
            {
              text: '一键部署',
              link: '/mapp/advanced/deploy-quickly',
            },
            {
              text: '外部系统集成',
              link: '/mapp/advanced/external-integration',
            },
            {
              text: '渐进式系统升级',
              link: '/mapp/advanced/migration',
            },
            {
              text: '基座开发',
              link: '/mapp/advanced/bay',
            },
          ],
        },
      ],
      '/base/': [
        {
          text: '基础库',
          items: [
            {
              text: '概览',
              link: '/base/index',
            },
            {
              text: 'create-wakeadmin 脚手架',
              link: '/base/create-wakeadmin',
            },
            {
              text: '@wakeadmin/i18n 多语言',
              link: '/base/i18n',
            },
            {
              text: '@wakeadmin/framework 框架',
              link: '/base/framework',
            },
            {
              text: '@wakeadmin/h JSX',
              link: '/base/h',
            },
            {
              text: '@wakeadmin/assets',
              link: '/base/assets',
            },
            {
              text: '@wakeadmin/tailwind',
              link: '/tailwind/',
            },
            {
              text: '@wakeadmin/docker-build 镜像构建',
              link: '/base/docker-build',
            },

            {
              text: '@wakeapp/wakedata-backend 接口请求',
              link: 'https://wakedata.notion.site/wakeapp-wakedata-backend-bb1d3e6dbad74a3282c1416e3e9065d1',
            },
          ],
        },
      ],
      '/theme/': [
        {
          text: '主题',
          items: [
            { text: '色彩', link: '/theme/color' },
            { text: '字体', link: '/theme/font' },
            { text: '其他', link: '/theme/other' },
          ],
        },
      ],
      '/standard/': [
        {
          text: '开发规范',
          items: [
            {
              text: '概述',
              link: 'https://wakedata.notion.site/257db1b6884b473f9ab593fed88f1d2d',
            },
            {
              text: 'Gerrit 指南',
              link: 'https://wakedata.notion.site/Gerrit-4dc734cfa52840cd896f192c15798de5',
            },
            {
              text: 'Git 分支规范',
              link: 'https://wakedata.notion.site/Git-819014e8a023437eb38d78862c4f6602',
            },
            {
              text: '代码自动化检查',
              link: 'https://wakedata.notion.site/d223981cad664edab0c89fd269aa751d#3895cb4d632e4f789d48651d5d79330a',
            },
            {
              text: 'Vue',
              link: '/standard/vue',
            },
            {
              text: 'Jenkins 自动化构建、部署范例',
              link: '/standard/build',
            },
            {
              text: '镜像构建规范',
              link: '/standard/docker',
            },
            {
              text: 'CCC 代码规范提案',
              link: '/standard/ccc',
            },
          ],
        },
      ],
    },
  },
};
