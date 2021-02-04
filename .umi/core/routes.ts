// @ts-nocheck
import React from 'react';
import { ApplyPluginsType, dynamic } from '/Users/mrsingsing/mrsingsing/DataBase-GuideBook/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/~demos/:uuid",
    "layout": false,
    "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'/Users/mrsingsing/mrsingsing/DataBase-GuideBook/node_modules/@umijs/preset-dumi/lib/theme/layout')})],
    "component": (props) => {
      const React = require('react');
      const renderArgs = require('../../node_modules/@umijs/preset-dumi/lib/plugins/features/demo/getDemoRenderArgs').default(props);

      switch (renderArgs.length) {
        case 1:
          // render demo directly
          return renderArgs[0];

        case 2:
          // render demo with previewer
          return React.createElement(
            require('dumi-theme-default/src/builtins/Previewer.tsx').default,
            renderArgs[0],
            renderArgs[1],
          );

        default:
          return `Demo ${uuid} not found :(`;
      }
    }
  },
  {
    "path": "/_demos/:uuid",
    "redirect": "/~demos/:uuid"
  },
  {
    "__dumiRoot": true,
    "layout": false,
    "path": "/",
    "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'/Users/mrsingsing/mrsingsing/DataBase-GuideBook/node_modules/@umijs/preset-dumi/lib/theme/layout')}), dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'/Users/mrsingsing/mrsingsing/DataBase-GuideBook/node_modules/dumi-theme-default/src/layout.tsx')})],
    "routes": [
      {
        "path": "/",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__index.md' */'/Users/mrsingsing/mrsingsing/DataBase-GuideBook/docs/index.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/index.md",
          "updatedTime": null,
          "title": "Database Guidebook - 📚 Database 知识图谱",
          "order": 10,
          "hero": {
            "title": "Database Guidebook",
            "desc": "<div class=\"markdown\"><p>📚 Database 知识图谱</p></div>",
            "actions": [
              {
                "text": "立即开始",
                "link": "/mongodb"
              }
            ]
          },
          "features": [
            {
              "icon": "https://gw.alipayobjects.com/zos/bmw-prod/881dc458-f20b-407b-947a-95104b5ec82b/k79dm8ih_w144_h144.png",
              "title": "完整体系",
              "desc": "<div class=\"markdown\"><p>根据官方文档及社区建设构建尽可能实用的知识体系，宏观掌握技术体系</p></div>"
            },
            {
              "icon": "https://gw.alipayobjects.com/zos/bmw-prod/d60657df-0822-4631-9d7c-e7a869c2f21c/k79dmz3q_w126_h126.png",
              "title": "深度分析",
              "desc": "<div class=\"markdown\"><p>尽览社区精品技术文章，将最受业界欢迎的使用方法收录其中</p></div>"
            },
            {
              "icon": "https://gw.alipayobjects.com/zos/bmw-prod/d1ee0c6f-5aed-4a45-a507-339a4bfe076c/k7bjsocq_w144_h144.png",
              "title": "开发指南",
              "desc": "<div class=\"markdown\"><p>体系化整理，随时查阅具体技术细节，方便前端开发者日常开发</p></div>"
            }
          ],
          "footer": "<div class=\"markdown\"><p>Open-source MIT Licensed | Copyright © 2019-present<br />Powered by tsejx</p></div>",
          "slugs": []
        },
        "title": "Database Guidebook - 📚 Database 知识图谱"
      },
      {
        "path": "/basic/paradigm",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__basic__paradigm.md' */'/Users/mrsingsing/mrsingsing/DataBase-GuideBook/docs/basic/paradigm.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/basic/paradigm.md",
          "updatedTime": null,
          "nav": {
            "title": "MongoDB",
            "order": 1,
            "path": "/basic"
          },
          "group": {
            "title": "MongoDB",
            "order": 1,
            "path": "/basic"
          },
          "title": "导览",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "导览",
              "heading": "导览"
            }
          ]
        },
        "title": "导览"
      },
      {
        "path": "/mongodb",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__mongodb__index.md' */'/Users/mrsingsing/mrsingsing/DataBase-GuideBook/docs/mongodb/index.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/mongodb/index.md",
          "updatedTime": null,
          "nav": {
            "title": "MongoDB",
            "order": 3,
            "path": "/mongodb"
          },
          "group": {
            "title": "MongoDB",
            "order": 1,
            "path": "/mongodb"
          },
          "title": "导览",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "导览",
              "heading": "导览"
            }
          ]
        },
        "title": "导览"
      },
      {
        "path": "/basic",
        "meta": {
          "order": 1
        },
        "exact": true,
        "redirect": "/basic/paradigm"
      }
    ],
    "title": "Database Guidebook",
    "component": (props) => props.children
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
