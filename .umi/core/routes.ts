// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from '/Users/mrsingsing/mrsingsing/DataBase-GuideBook/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/~demos/:uuid",
    "layout": false,
    "wrappers": [require('/Users/mrsingsing/mrsingsing/DataBase-GuideBook/node_modules/@umijs/preset-dumi/lib/theme/layout').default],
    "component": (props) => {
        const { default: getDemoRenderArgs } = require('/Users/mrsingsing/mrsingsing/DataBase-GuideBook/node_modules/@umijs/preset-dumi/lib/plugins/features/demo/getDemoRenderArgs');
        const { default: Previewer } = require('dumi-theme-default/es/builtins/Previewer.js');
        const { default: demos } = require('@@/dumi/demos');
        const { usePrefersColor } = require('dumi/theme');

        
      const renderArgs = getDemoRenderArgs(props, demos);

      // for listen prefers-color-schema media change in demo single route
      usePrefersColor();

      switch (renderArgs.length) {
        case 1:
          // render demo directly
          return renderArgs[0];

        case 2:
          // render demo with previewer
          return React.createElement(
            Previewer,
            renderArgs[0],
            renderArgs[1],
          );

        default:
          return `Demo ${props.match.params.uuid} not found :(`;
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
    "wrappers": [require('/Users/mrsingsing/mrsingsing/DataBase-GuideBook/node_modules/@umijs/preset-dumi/lib/theme/layout').default, require('/Users/mrsingsing/mrsingsing/DataBase-GuideBook/node_modules/dumi-theme-default/es/layout.js').default],
    "routes": [
      {
        "path": "/",
        "component": require('/Users/mrsingsing/mrsingsing/DataBase-GuideBook/docs/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/index.md",
          "updatedTime": 1612404655000,
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
        "component": require('/Users/mrsingsing/mrsingsing/DataBase-GuideBook/docs/basic/paradigm.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/basic/paradigm.md",
          "updatedTime": 1612404655000,
          "nav": {
            "title": "基础",
            "order": 1,
            "path": "/basic"
          },
          "group": {
            "title": "基础知识",
            "order": 1,
            "path": "/basic"
          },
          "title": "范式",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "导览",
              "heading": "导览"
            },
            {
              "depth": 2,
              "value": "第一范式",
              "heading": "第一范式"
            },
            {
              "depth": 2,
              "value": "第二范式",
              "heading": "第二范式"
            },
            {
              "depth": 2,
              "value": "第三范式",
              "heading": "第三范式"
            },
            {
              "depth": 2,
              "value": "反范式化",
              "heading": "反范式化"
            }
          ]
        },
        "title": "范式"
      },
      {
        "path": "/basic/database-type/data-base",
        "component": require('/Users/mrsingsing/mrsingsing/DataBase-GuideBook/docs/basic/database-type/data-base.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/basic/database-type/data-base.md",
          "updatedTime": 1624598323146,
          "nav": {
            "title": "基础",
            "order": 1,
            "path": "/basic"
          },
          "group": {
            "title": "数据库",
            "order": 1,
            "path": "/basic/database-type"
          },
          "title": "数据库",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "数据库",
              "heading": "数据库"
            }
          ]
        },
        "title": "数据库"
      },
      {
        "path": "/basic/database-type/no-sql",
        "component": require('/Users/mrsingsing/mrsingsing/DataBase-GuideBook/docs/basic/database-type/no-sql.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/basic/database-type/no-sql.md",
          "updatedTime": 1624598325206,
          "nav": {
            "title": "基础",
            "order": 1,
            "path": "/basic"
          },
          "title": "NoSQL",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "NoSQL",
              "heading": "nosql"
            }
          ],
          "group": {
            "path": "/basic/database-type",
            "title": "数据库"
          }
        },
        "title": "NoSQL"
      },
      {
        "path": "/mongodb/advanced/authentication",
        "component": require('/Users/mrsingsing/mrsingsing/DataBase-GuideBook/docs/mongodb/advanced/authentication.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/mongodb/advanced/authentication.md",
          "updatedTime": 1624600352668,
          "nav": {
            "title": "MongoDB",
            "order": 3,
            "path": "/mongodb"
          },
          "group": {
            "title": "高阶应用",
            "order": 3,
            "path": "/mongodb/advanced"
          },
          "title": "鉴权",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "鉴权",
              "heading": "鉴权"
            }
          ]
        },
        "title": "鉴权"
      },
      {
        "path": "/mongodb/advanced/backup-and-recovery",
        "component": require('/Users/mrsingsing/mrsingsing/DataBase-GuideBook/docs/mongodb/advanced/backup-and-recovery.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/mongodb/advanced/backup-and-recovery.md",
          "updatedTime": 1624600364311,
          "nav": {
            "title": "MongoDB",
            "order": 3,
            "path": "/mongodb"
          },
          "group": {
            "title": "高阶应用",
            "order": 3,
            "path": "/mongodb/advanced"
          },
          "title": "备份与恢复",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "备份与恢复",
              "heading": "备份与恢复"
            },
            {
              "depth": 2,
              "value": "备份",
              "heading": "备份"
            },
            {
              "depth": 2,
              "value": "恢复",
              "heading": "恢复"
            }
          ]
        },
        "title": "备份与恢复"
      },
      {
        "path": "/mongodb/advanced/replication",
        "component": require('/Users/mrsingsing/mrsingsing/DataBase-GuideBook/docs/mongodb/advanced/replication.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/mongodb/advanced/replication.md",
          "updatedTime": 1624600372178,
          "nav": {
            "title": "MongoDB",
            "order": 3,
            "path": "/mongodb"
          },
          "group": {
            "title": "高阶应用",
            "order": 3,
            "path": "/mongodb/advanced"
          },
          "title": "数据库副本集",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "数据库副本集",
              "heading": "数据库副本集"
            },
            {
              "depth": 2,
              "value": "架构原理",
              "heading": "架构原理"
            },
            {
              "depth": 2,
              "value": "标准副本集架构",
              "heading": "标准副本集架构"
            },
            {
              "depth": 2,
              "value": "节点类型",
              "heading": "节点类型"
            },
            {
              "depth": 3,
              "value": "优先级零型节点",
              "heading": "优先级零型节点"
            },
            {
              "depth": 3,
              "value": "隐藏型节点",
              "heading": "隐藏型节点"
            },
            {
              "depth": 3,
              "value": "延迟型节点",
              "heading": "延迟型节点"
            },
            {
              "depth": 3,
              "value": "投票型节点和不可投票节点",
              "heading": "投票型节点和不可投票节点"
            },
            {
              "depth": 2,
              "value": "副本集选举",
              "heading": "副本集选举"
            },
            {
              "depth": 3,
              "value": "选举要点",
              "heading": "选举要点"
            },
            {
              "depth": 3,
              "value": "触发选举的事件",
              "heading": "触发选举的事件"
            },
            {
              "depth": 2,
              "value": "集群模式",
              "heading": "集群模式"
            },
            {
              "depth": 2,
              "value": "部署",
              "heading": "部署"
            },
            {
              "depth": 3,
              "value": "最大投票成员为数量",
              "heading": "最大投票成员为数量"
            },
            {
              "depth": 3,
              "value": "部署奇数个成员",
              "heading": "部署奇数个成员"
            }
          ]
        },
        "title": "数据库副本集"
      },
      {
        "path": "/mongodb/advanced/security",
        "component": require('/Users/mrsingsing/mrsingsing/DataBase-GuideBook/docs/mongodb/advanced/security.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/mongodb/advanced/security.md",
          "updatedTime": 1624600377855,
          "nav": {
            "title": "MongoDB",
            "order": 3,
            "path": "/mongodb"
          },
          "group": {
            "title": "高阶应用",
            "order": 3,
            "path": "/mongodb/advanced"
          },
          "title": "数据库安全",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "数据库安全",
              "heading": "数据库安全"
            }
          ]
        },
        "title": "数据库安全"
      },
      {
        "path": "/mongodb/advanced/sharding",
        "component": require('/Users/mrsingsing/mrsingsing/DataBase-GuideBook/docs/mongodb/advanced/sharding.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/mongodb/advanced/sharding.md",
          "updatedTime": 1624600397010,
          "nav": {
            "title": "MongoDB",
            "order": 3,
            "path": "/mongodb"
          },
          "group": {
            "title": "高阶应用",
            "order": 3,
            "path": "/mongodb/advanced"
          },
          "title": "数据库分片",
          "order": 5,
          "slugs": [
            {
              "depth": 1,
              "value": "数据库分片",
              "heading": "数据库分片"
            }
          ]
        },
        "title": "数据库分片"
      },
      {
        "path": "/mongodb/basic/aggregation",
        "component": require('/Users/mrsingsing/mrsingsing/DataBase-GuideBook/docs/mongodb/basic/aggregation.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/mongodb/basic/aggregation.md",
          "updatedTime": 1624600158275,
          "nav": {
            "title": "MongoDB",
            "order": 3,
            "path": "/mongodb"
          },
          "group": {
            "title": "基本操作",
            "order": 2,
            "path": "/mongodb/basic"
          },
          "title": "聚合管道",
          "order": 20,
          "slugs": [
            {
              "depth": 1,
              "value": "聚合管道",
              "heading": "聚合管道"
            },
            {
              "depth": 2,
              "value": "聚合框架",
              "heading": "聚合框架"
            },
            {
              "depth": 2,
              "value": "聚合表达式",
              "heading": "聚合表达式"
            },
            {
              "depth": 3,
              "value": "字段路径表达式",
              "heading": "字段路径表达式"
            },
            {
              "depth": 3,
              "value": "系统变量表达式",
              "heading": "系统变量表达式"
            },
            {
              "depth": 3,
              "value": "常量表达式",
              "heading": "常量表达式"
            },
            {
              "depth": 3,
              "value": "表达式操作符",
              "heading": "表达式操作符"
            },
            {
              "depth": 3,
              "value": "聚合管道阶段",
              "heading": "聚合管道阶段"
            },
            {
              "depth": 4,
              "value": "$project",
              "heading": "project"
            },
            {
              "depth": 4,
              "value": "$match",
              "heading": "match"
            },
            {
              "depth": 4,
              "value": "limit 和 skip",
              "heading": "limit-和-skip"
            },
            {
              "depth": 4,
              "value": "$unwind",
              "heading": "unwind"
            },
            {
              "depth": 4,
              "value": "$sort",
              "heading": "sort"
            },
            {
              "depth": 4,
              "value": "$lookup",
              "heading": "lookup"
            },
            {
              "depth": 5,
              "value": "使用单一字段值进行查询",
              "heading": "使用单一字段值进行查询"
            },
            {
              "depth": 5,
              "value": "使用复杂条件进行查询",
              "heading": "使用复杂条件进行查询"
            },
            {
              "depth": 4,
              "value": "$group",
              "heading": "group"
            },
            {
              "depth": 4,
              "value": "$out",
              "heading": "out"
            },
            {
              "depth": 3,
              "value": "配置项",
              "heading": "配置项"
            },
            {
              "depth": 2,
              "value": "聚合操作的优化",
              "heading": "聚合操作的优化"
            },
            {
              "depth": 3,
              "value": "顺序优化",
              "heading": "顺序优化"
            },
            {
              "depth": 4,
              "value": "$project + $match",
              "heading": "project--match"
            },
            {
              "depth": 4,
              "value": "$sort + $match",
              "heading": "sort--match"
            },
            {
              "depth": 4,
              "value": "$project + $skip",
              "heading": "project--skip"
            },
            {
              "depth": 3,
              "value": "合并优化",
              "heading": "合并优化"
            },
            {
              "depth": 4,
              "value": "$sort + $limit",
              "heading": "sort--limit"
            },
            {
              "depth": 4,
              "value": "$lookup 和 $unwind",
              "heading": "lookup-和-unwind"
            }
          ]
        },
        "title": "聚合管道"
      },
      {
        "path": "/mongodb/basic/documents",
        "component": require('/Users/mrsingsing/mrsingsing/DataBase-GuideBook/docs/mongodb/basic/documents.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/mongodb/basic/documents.md",
          "updatedTime": 1624600055199,
          "nav": {
            "title": "MongoDB",
            "order": 3,
            "path": "/mongodb"
          },
          "group": {
            "title": "基本操作",
            "order": 2,
            "path": "/mongodb/basic"
          },
          "title": "文档 Documents",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "文档 Documents",
              "heading": "文档-documents"
            },
            {
              "depth": 2,
              "value": "检索",
              "heading": "检索"
            },
            {
              "depth": 2,
              "value": "更新",
              "heading": "更新"
            },
            {
              "depth": 2,
              "value": "覆盖",
              "heading": "覆盖"
            }
          ]
        },
        "title": "文档 Documents"
      },
      {
        "path": "/mongodb/basic/indexes",
        "component": require('/Users/mrsingsing/mrsingsing/DataBase-GuideBook/docs/mongodb/basic/indexes.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/mongodb/basic/indexes.md",
          "updatedTime": 1624600092834,
          "nav": {
            "title": "MongoDB",
            "order": 3,
            "path": "/mongodb"
          },
          "group": {
            "title": "基本操作",
            "order": 2,
            "path": "/mongodb/basic"
          },
          "title": "数据库索引",
          "order": 10,
          "slugs": [
            {
              "depth": 1,
              "value": "数据库索引",
              "heading": "数据库索引"
            },
            {
              "depth": 2,
              "value": "索引类型",
              "heading": "索引类型"
            },
            {
              "depth": 3,
              "value": "单键索引",
              "heading": "单键索引"
            },
            {
              "depth": 3,
              "value": "复合键索引",
              "heading": "复合键索引"
            },
            {
              "depth": 3,
              "value": "多键索引",
              "heading": "多键索引"
            },
            {
              "depth": 2,
              "value": "索引特性",
              "heading": "索引特性"
            },
            {
              "depth": 3,
              "value": "唯一性",
              "heading": "唯一性"
            },
            {
              "depth": 3,
              "value": "稀疏性",
              "heading": "稀疏性"
            },
            {
              "depth": 3,
              "value": "生存时间",
              "heading": "生存时间"
            },
            {
              "depth": 2,
              "value": "索引的选择",
              "heading": "索引的选择"
            },
            {
              "depth": 2,
              "value": "创建索引",
              "heading": "创建索引"
            },
            {
              "depth": 2,
              "value": "查看索引",
              "heading": "查看索引"
            },
            {
              "depth": 2,
              "value": "删除索引",
              "heading": "删除索引"
            },
            {
              "depth": 2,
              "value": "索引效果",
              "heading": "索引效果"
            }
          ]
        },
        "title": "数据库索引"
      },
      {
        "path": "/mongodb/basic/models-relationship",
        "component": require('/Users/mrsingsing/mrsingsing/DataBase-GuideBook/docs/mongodb/basic/models-relationship.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/mongodb/basic/models-relationship.md",
          "updatedTime": 1624600096884,
          "nav": {
            "title": "MongoDB",
            "order": 3,
            "path": "/mongodb"
          },
          "group": {
            "title": "基本操作",
            "order": 2,
            "path": "/mongodb/basic"
          },
          "title": "数据模型关联",
          "order": 11,
          "slugs": [
            {
              "depth": 1,
              "value": "数据模型",
              "heading": "数据模型"
            },
            {
              "depth": 2,
              "value": "关系",
              "heading": "关系"
            },
            {
              "depth": 2,
              "value": "树形结构",
              "heading": "树形结构"
            }
          ]
        },
        "title": "数据模型关联"
      },
      {
        "path": "/mongodb/basic/models",
        "component": require('/Users/mrsingsing/mrsingsing/DataBase-GuideBook/docs/mongodb/basic/models.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/mongodb/basic/models.md",
          "updatedTime": 1624599958114,
          "nav": {
            "title": "MongoDB",
            "order": 3,
            "path": "/mongodb"
          },
          "group": {
            "title": "基本操作",
            "order": 2,
            "path": "/mongodb/basic"
          },
          "title": "模型 Models",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "模型 Models",
              "heading": "模型-models"
            },
            {
              "depth": 2,
              "value": "定义模型",
              "heading": "定义模型"
            },
            {
              "depth": 3,
              "value": "model",
              "heading": "model"
            },
            {
              "depth": 3,
              "value": "文档保存 save",
              "heading": "文档保存-save"
            },
            {
              "depth": 2,
              "value": "自定义方法",
              "heading": "自定义方法"
            },
            {
              "depth": 3,
              "value": "实例方法 methods",
              "heading": "实例方法-methods"
            },
            {
              "depth": 3,
              "value": "静态方法 statics",
              "heading": "静态方法-statics"
            },
            {
              "depth": 3,
              "value": "查询方法",
              "heading": "查询方法"
            },
            {
              "depth": 2,
              "value": "Model",
              "heading": "model-1"
            },
            {
              "depth": 3,
              "value": "构造 documents",
              "heading": "构造-documents"
            },
            {
              "depth": 3,
              "value": "新增",
              "heading": "新增"
            },
            {
              "depth": 3,
              "value": "查询",
              "heading": "查询"
            },
            {
              "depth": 3,
              "value": "删除",
              "heading": "删除"
            },
            {
              "depth": 3,
              "value": "更多",
              "heading": "更多"
            }
          ]
        },
        "title": "模型 Models"
      },
      {
        "path": "/mongodb/basic/schemas",
        "component": require('/Users/mrsingsing/mrsingsing/DataBase-GuideBook/docs/mongodb/basic/schemas.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/mongodb/basic/schemas.md",
          "updatedTime": 1624599925200,
          "nav": {
            "title": "MongoDB",
            "order": 3,
            "path": "/mongodb"
          },
          "group": {
            "title": "基本操作",
            "order": 2,
            "path": "/mongodb/basic"
          },
          "title": "模式 Schema",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "模式 Schema",
              "heading": "模式-schema"
            },
            {
              "depth": 2,
              "value": "索引 index",
              "heading": "索引-index"
            },
            {
              "depth": 3,
              "value": "唯一索引",
              "heading": "唯一索引"
            },
            {
              "depth": 3,
              "value": "复合索引",
              "heading": "复合索引"
            },
            {
              "depth": 2,
              "value": "配置示例",
              "heading": "配置示例"
            }
          ]
        },
        "title": "模式 Schema"
      },
      {
        "path": "/mongodb/basic/subdocuments",
        "component": require('/Users/mrsingsing/mrsingsing/DataBase-GuideBook/docs/mongodb/basic/subdocuments.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/mongodb/basic/subdocuments.md",
          "updatedTime": 1624600082943,
          "nav": {
            "title": "MongoDB",
            "order": 3,
            "path": "/mongodb"
          },
          "group": {
            "title": "基本操作",
            "order": 2,
            "path": "/mongodb/basic"
          },
          "title": "子文档 Subdocuments",
          "order": 5,
          "slugs": [
            {
              "depth": 1,
              "value": "子文档 Subdocuments",
              "heading": "子文档-subdocuments"
            },
            {
              "depth": 2,
              "value": "查找子文档",
              "heading": "查找子文档"
            },
            {
              "depth": 2,
              "value": "添加子文档到数组",
              "heading": "添加子文档到数组"
            },
            {
              "depth": 2,
              "value": "删除子文档",
              "heading": "删除子文档"
            }
          ]
        },
        "title": "子文档 Subdocuments"
      },
      {
        "path": "/mongodb/mongoose/aggregate",
        "component": require('/Users/mrsingsing/mrsingsing/DataBase-GuideBook/docs/mongodb/mongoose/aggregate.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/mongodb/mongoose/aggregate.md",
          "updatedTime": 1624600750395,
          "nav": {
            "title": "MongoDB",
            "order": 3,
            "path": "/mongodb"
          },
          "group": {
            "title": "Mongoose",
            "order": 10,
            "path": "/mongodb/mongoose"
          },
          "title": "聚合查询",
          "order": 9,
          "slugs": [
            {
              "depth": 1,
              "value": "聚合查询",
              "heading": "聚合查询"
            }
          ]
        },
        "title": "聚合查询"
      },
      {
        "path": "/mongodb/mongoose/basic",
        "component": require('/Users/mrsingsing/mrsingsing/DataBase-GuideBook/docs/mongodb/mongoose/basic.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/mongodb/mongoose/basic.md",
          "updatedTime": 1624600565711,
          "nav": {
            "title": "MongoDB",
            "order": 3,
            "path": "/mongodb"
          },
          "group": {
            "title": "Mongoose",
            "order": 10,
            "path": "/mongodb/mongoose"
          },
          "title": "集成",
          "order": 100,
          "slugs": [
            {
              "depth": 1,
              "value": "常用方法",
              "heading": "常用方法"
            },
            {
              "depth": 2,
              "value": "文档查询",
              "heading": "文档查询"
            },
            {
              "depth": 3,
              "value": "查询所有数据项 find",
              "heading": "查询所有数据项-find"
            },
            {
              "depth": 3,
              "value": "findById",
              "heading": "findbyid"
            },
            {
              "depth": 3,
              "value": "findOne",
              "heading": "findone"
            },
            {
              "depth": 3,
              "value": "$where",
              "heading": "where"
            },
            {
              "depth": 2,
              "value": "文档更新",
              "heading": "文档更新"
            },
            {
              "depth": 3,
              "value": "update",
              "heading": "update"
            },
            {
              "depth": 3,
              "value": "updateMany",
              "heading": "updatemany"
            },
            {
              "depth": 4,
              "value": "findByIdAndUpdate",
              "heading": "findbyidandupdate"
            },
            {
              "depth": 2,
              "value": "文档删除",
              "heading": "文档删除"
            },
            {
              "depth": 3,
              "value": "remove",
              "heading": "remove"
            },
            {
              "depth": 2,
              "value": "前后钩子",
              "heading": "前后钩子"
            },
            {
              "depth": 3,
              "value": "pre",
              "heading": "pre"
            },
            {
              "depth": 3,
              "value": "post",
              "heading": "post"
            },
            {
              "depth": 2,
              "value": "查询后处理",
              "heading": "查询后处理"
            },
            {
              "depth": 3,
              "value": "sort",
              "heading": "sort"
            },
            {
              "depth": 3,
              "value": "skip",
              "heading": "skip"
            },
            {
              "depth": 3,
              "value": "limit",
              "heading": "limit"
            },
            {
              "depth": 3,
              "value": "select",
              "heading": "select"
            },
            {
              "depth": 3,
              "value": "count",
              "heading": "count"
            },
            {
              "depth": 3,
              "value": "distinct",
              "heading": "distinct"
            },
            {
              "depth": 2,
              "value": "文档验证",
              "heading": "文档验证"
            },
            {
              "depth": 2,
              "value": "联表操作",
              "heading": "联表操作"
            },
            {
              "depth": 2,
              "value": "获取列表",
              "heading": "获取列表"
            },
            {
              "depth": 2,
              "value": "获取某项",
              "heading": "获取某项"
            },
            {
              "depth": 2,
              "value": "符合条件的文档数",
              "heading": "符合条件的文档数"
            },
            {
              "depth": 2,
              "value": "创建单个文档",
              "heading": "创建单个文档"
            },
            {
              "depth": 2,
              "value": "更新单个文档",
              "heading": "更新单个文档"
            },
            {
              "depth": 2,
              "value": "删除单个文档",
              "heading": "删除单个文档"
            }
          ]
        },
        "title": "集成"
      },
      {
        "path": "/mongodb/mongoose/connections",
        "component": require('/Users/mrsingsing/mrsingsing/DataBase-GuideBook/docs/mongodb/mongoose/connections.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/mongodb/mongoose/connections.md",
          "updatedTime": 1624683075714,
          "nav": {
            "title": "MongoDB",
            "order": 3,
            "path": "/mongodb"
          },
          "group": {
            "title": "Mongoose",
            "order": 10,
            "path": "/mongodb/mongoose"
          },
          "title": "连接 Connections",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "连接 Connections",
              "heading": "连接-connections"
            },
            {
              "depth": 2,
              "value": "连接数据库",
              "heading": "连接数据库"
            },
            {
              "depth": 3,
              "value": "连接字符串",
              "heading": "连接字符串"
            },
            {
              "depth": 3,
              "value": "连接选项",
              "heading": "连接选项"
            },
            {
              "depth": 3,
              "value": "连接回调",
              "heading": "连接回调"
            },
            {
              "depth": 2,
              "value": "副本集连接",
              "heading": "副本集连接"
            },
            {
              "depth": 2,
              "value": "分片集群支持",
              "heading": "分片集群支持"
            },
            {
              "depth": 2,
              "value": "断开连接数据库",
              "heading": "断开连接数据库"
            }
          ]
        },
        "title": "连接 Connections"
      },
      {
        "path": "/mongodb/mongoose/hooks",
        "component": require('/Users/mrsingsing/mrsingsing/DataBase-GuideBook/docs/mongodb/mongoose/hooks.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/mongodb/mongoose/hooks.md",
          "updatedTime": 1624600242979,
          "nav": {
            "title": "MongoDB",
            "order": 3,
            "path": "/mongodb"
          },
          "group": {
            "title": "Mongoose",
            "order": 10,
            "path": "/mongodb/mongoose"
          },
          "title": "钩子函数",
          "order": 10,
          "slugs": [
            {
              "depth": 1,
              "value": "钩子函数",
              "heading": "钩子函数"
            }
          ]
        },
        "title": "钩子函数"
      },
      {
        "path": "/mongodb/mongoose/middleware",
        "component": require('/Users/mrsingsing/mrsingsing/DataBase-GuideBook/docs/mongodb/mongoose/middleware.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/mongodb/mongoose/middleware.md",
          "updatedTime": 1624683160487,
          "nav": {
            "title": "MongoDB",
            "order": 3,
            "path": "/mongodb"
          },
          "group": {
            "title": "Mongoose",
            "order": 10,
            "path": "/mongodb/mongoose"
          },
          "title": "中间件 Middleware",
          "order": 10,
          "slugs": [
            {
              "depth": 1,
              "value": "中间件 Middleware",
              "heading": "中间件-middleware"
            },
            {
              "depth": 2,
              "value": "Pre",
              "heading": "pre"
            },
            {
              "depth": 3,
              "value": "串行",
              "heading": "串行"
            },
            {
              "depth": 3,
              "value": "并行",
              "heading": "并行"
            },
            {
              "depth": 3,
              "value": "使用场景",
              "heading": "使用场景"
            },
            {
              "depth": 3,
              "value": "错误处理",
              "heading": "错误处理"
            },
            {
              "depth": 2,
              "value": "Post",
              "heading": "post"
            },
            {
              "depth": 2,
              "value": "异步 post 钩子",
              "heading": "异步-post-钩子"
            }
          ]
        },
        "title": "中间件 Middleware"
      },
      {
        "path": "/mongodb/mongoose/model-api",
        "component": require('/Users/mrsingsing/mrsingsing/DataBase-GuideBook/docs/mongodb/mongoose/model-api.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/mongodb/mongoose/model-api.md",
          "updatedTime": 1624701715386,
          "nav": {
            "title": "MongoDB",
            "order": 3,
            "path": "/mongodb"
          },
          "group": {
            "title": "Mongoose",
            "order": 10,
            "path": "/mongodb/mongoose"
          },
          "title": "Model",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "Model API",
              "heading": "model-api"
            },
            {
              "depth": 2,
              "value": "普通查询",
              "heading": "普通查询"
            },
            {
              "depth": 2,
              "value": "聚合查询",
              "heading": "聚合查询"
            },
            {
              "depth": 2,
              "value": "统计查询",
              "heading": "统计查询"
            },
            {
              "depth": 2,
              "value": "创建操作",
              "heading": "创建操作"
            },
            {
              "depth": 2,
              "value": "更新操作",
              "heading": "更新操作"
            },
            {
              "depth": 2,
              "value": "删除操作",
              "heading": "删除操作"
            },
            {
              "depth": 2,
              "value": "索引相关",
              "heading": "索引相关"
            }
          ]
        },
        "title": "Model"
      },
      {
        "path": "/mongodb/mongoose/overview",
        "component": require('/Users/mrsingsing/mrsingsing/DataBase-GuideBook/docs/mongodb/mongoose/overview.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/mongodb/mongoose/overview.md",
          "updatedTime": 1624670864564,
          "nav": {
            "title": "MongoDB",
            "order": 3,
            "path": "/mongodb"
          },
          "group": {
            "title": "Mongoose",
            "order": 10,
            "path": "/mongodb/mongoose"
          },
          "title": "概述",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "Mongoose",
              "heading": "mongoose"
            },
            {
              "depth": 2,
              "value": "概述",
              "heading": "概述"
            },
            {
              "depth": 2,
              "value": "Schema",
              "heading": "schema"
            }
          ]
        },
        "title": "概述"
      },
      {
        "path": "/mongodb/mongoose/plugins",
        "component": require('/Users/mrsingsing/mrsingsing/DataBase-GuideBook/docs/mongodb/mongoose/plugins.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/mongodb/mongoose/plugins.md",
          "updatedTime": 1624600255315,
          "nav": {
            "title": "MongoDB",
            "order": 3,
            "path": "/mongodb"
          },
          "group": {
            "title": "Mongoose",
            "order": 10,
            "path": "/mongodb/mongoose"
          },
          "title": "插件",
          "order": 11,
          "slugs": [
            {
              "depth": 1,
              "value": "插件 Plugins",
              "heading": "插件-plugins"
            },
            {
              "depth": 2,
              "value": "全局插件",
              "heading": "全局插件"
            }
          ]
        },
        "title": "插件"
      },
      {
        "path": "/mongodb/mongoose/populate",
        "component": require('/Users/mrsingsing/mrsingsing/DataBase-GuideBook/docs/mongodb/mongoose/populate.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/mongodb/mongoose/populate.md",
          "updatedTime": 1624600708342,
          "nav": {
            "title": "MongoDB",
            "order": 3,
            "path": "/mongodb"
          },
          "group": {
            "title": "Mongoose",
            "order": 10,
            "path": "/mongodb/mongoose"
          },
          "title": "填充查询",
          "order": 8,
          "slugs": [
            {
              "depth": 1,
              "value": "填充查询",
              "heading": "填充查询"
            },
            {
              "depth": 2,
              "value": "保存 refs",
              "heading": "保存-refs"
            },
            {
              "depth": 2,
              "value": "Population",
              "heading": "population"
            },
            {
              "depth": 2,
              "value": "设置被填充字段",
              "heading": "设置被填充字段"
            },
            {
              "depth": 2,
              "value": "字段选择",
              "heading": "字段选择"
            },
            {
              "depth": 2,
              "value": "填充多个字段",
              "heading": "填充多个字段"
            },
            {
              "depth": 2,
              "value": "Query 条件与其它选项",
              "heading": "query-条件与其它选项"
            }
          ]
        },
        "title": "填充查询"
      },
      {
        "path": "/mongodb/mongoose/queries",
        "component": require('/Users/mrsingsing/mrsingsing/DataBase-GuideBook/docs/mongodb/mongoose/queries.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/mongodb/mongoose/queries.md",
          "updatedTime": 1624600683489,
          "nav": {
            "title": "MongoDB",
            "order": 3,
            "path": "/mongodb"
          },
          "group": {
            "title": "Mongoose",
            "order": 10,
            "path": "/mongodb/mongoose"
          },
          "title": "普通查询",
          "order": 7,
          "slugs": [
            {
              "depth": 1,
              "value": "普通查询",
              "heading": "普通查询"
            },
            {
              "depth": 2,
              "value": "collation",
              "heading": "collation"
            },
            {
              "depth": 3,
              "value": "引用其它文档",
              "heading": "引用其它文档"
            },
            {
              "depth": 3,
              "value": "Streaming",
              "heading": "streaming"
            },
            {
              "depth": 1,
              "value": "高级查询",
              "heading": "高级查询"
            },
            {
              "depth": 3,
              "value": "存在创建修改器",
              "heading": "存在创建修改器"
            },
            {
              "depth": 3,
              "value": "存在删除修改器",
              "heading": "存在删除修改器"
            },
            {
              "depth": 2,
              "value": "数组修改器",
              "heading": "数组修改器"
            },
            {
              "depth": 2,
              "value": "条件查询",
              "heading": "条件查询"
            },
            {
              "depth": 2,
              "value": "类型查询",
              "heading": "类型查询"
            },
            {
              "depth": 2,
              "value": "正则表达式",
              "heading": "正则表达式"
            },
            {
              "depth": 2,
              "value": "查询数组",
              "heading": "查询数组"
            }
          ]
        },
        "title": "普通查询"
      },
      {
        "path": "/mongodb/mongoose/schema-types",
        "component": require('/Users/mrsingsing/mrsingsing/DataBase-GuideBook/docs/mongodb/mongoose/schema-types.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/mongodb/mongoose/schema-types.md",
          "updatedTime": 1624685366502,
          "nav": {
            "title": "MongoDB",
            "order": 3,
            "path": "/mongodb"
          },
          "group": {
            "title": "Mongoose",
            "order": 10,
            "path": "/mongodb/mongoose"
          },
          "title": "模式类型 SchemaTypes",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "模式类型 SchemaTypes",
              "heading": "模式类型-schematypes"
            },
            {
              "depth": 2,
              "value": "标准类型",
              "heading": "标准类型"
            },
            {
              "depth": 2,
              "value": "选项说明",
              "heading": "选项说明"
            },
            {
              "depth": 3,
              "value": "全部类型可用",
              "heading": "全部类型可用"
            },
            {
              "depth": 3,
              "value": "仅字符串类型可用",
              "heading": "仅字符串类型可用"
            },
            {
              "depth": 3,
              "value": "仅数字类型可用",
              "heading": "仅数字类型可用"
            },
            {
              "depth": 3,
              "value": "仅日期类型可用",
              "heading": "仅日期类型可用"
            },
            {
              "depth": 3,
              "value": "仅对象 ID 可用",
              "heading": "仅对象-id-可用"
            },
            {
              "depth": 2,
              "value": "使用说明",
              "heading": "使用说明"
            },
            {
              "depth": 3,
              "value": "Getters",
              "heading": "getters"
            }
          ]
        },
        "title": "模式类型 SchemaTypes"
      },
      {
        "path": "/mongodb/mongoose/validation",
        "component": require('/Users/mrsingsing/mrsingsing/DataBase-GuideBook/docs/mongodb/mongoose/validation.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/mongodb/mongoose/validation.md",
          "updatedTime": 1624600263514,
          "nav": {
            "title": "MongoDB",
            "order": 3,
            "path": "/mongodb"
          },
          "group": {
            "title": "Mongoose",
            "order": 10,
            "path": "/mongodb/mongoose"
          },
          "title": "验证",
          "order": 15,
          "slugs": [
            {
              "depth": 1,
              "value": "验证 Validation",
              "heading": "验证-validation"
            },
            {
              "depth": 2,
              "value": "内置验证函数",
              "heading": "内置验证函数"
            },
            {
              "depth": 2,
              "value": "定制化验证",
              "heading": "定制化验证"
            }
          ]
        },
        "title": "验证"
      },
      {
        "path": "/mongodb/other/command",
        "component": require('/Users/mrsingsing/mrsingsing/DataBase-GuideBook/docs/mongodb/other/command.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/mongodb/other/command.md",
          "updatedTime": 1624600931249,
          "nav": {
            "title": "MongoDB",
            "order": 3,
            "path": "/mongodb"
          },
          "group": {
            "title": "基本操作",
            "order": 99,
            "path": "/mongodb/other"
          },
          "title": "命令大全",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "命令大全",
              "heading": "命令大全"
            },
            {
              "depth": 2,
              "value": "数据库",
              "heading": "数据库"
            },
            {
              "depth": 3,
              "value": "查看数据库状态",
              "heading": "查看数据库状态"
            },
            {
              "depth": 2,
              "value": "删除信息",
              "heading": "删除信息"
            },
            {
              "depth": 2,
              "value": "文档",
              "heading": "文档"
            },
            {
              "depth": 3,
              "value": "创建文档",
              "heading": "创建文档"
            },
            {
              "depth": 4,
              "value": "创建文档",
              "heading": "创建文档-1"
            },
            {
              "depth": 4,
              "value": "创建单个文档",
              "heading": "创建单个文档"
            },
            {
              "depth": 4,
              "value": "创建多个文档",
              "heading": "创建多个文档"
            },
            {
              "depth": 3,
              "value": "读取文档",
              "heading": "读取文档"
            },
            {
              "depth": 4,
              "value": "比较操作符",
              "heading": "比较操作符"
            },
            {
              "depth": 5,
              "value": "$eq",
              "heading": "eq"
            },
            {
              "depth": 5,
              "value": "$in",
              "heading": "in"
            },
            {
              "depth": 5,
              "value": "$nin",
              "heading": "nin"
            },
            {
              "depth": 4,
              "value": "逻辑操作符",
              "heading": "逻辑操作符"
            },
            {
              "depth": 5,
              "value": "$not",
              "heading": "not"
            },
            {
              "depth": 5,
              "value": "$and",
              "heading": "and"
            },
            {
              "depth": 5,
              "value": "$or",
              "heading": "or"
            },
            {
              "depth": 5,
              "value": "$nor",
              "heading": "nor"
            },
            {
              "depth": 4,
              "value": "字段操作符",
              "heading": "字段操作符"
            },
            {
              "depth": 5,
              "value": "$exists",
              "heading": "exists"
            },
            {
              "depth": 5,
              "value": "$type",
              "heading": "type"
            },
            {
              "depth": 4,
              "value": "数组操作符",
              "heading": "数组操作符"
            },
            {
              "depth": 5,
              "value": "$all",
              "heading": "all"
            },
            {
              "depth": 5,
              "value": "$elemMatch",
              "heading": "elemmatch"
            },
            {
              "depth": 4,
              "value": "正则表达式操作符",
              "heading": "正则表达式操作符"
            },
            {
              "depth": 4,
              "value": "文档游标",
              "heading": "文档游标"
            },
            {
              "depth": 4,
              "value": "文档投影",
              "heading": "文档投影"
            },
            {
              "depth": 3,
              "value": "更新文档",
              "heading": "更新文档"
            },
            {
              "depth": 4,
              "value": "更新整篇文档",
              "heading": "更新整篇文档"
            },
            {
              "depth": 4,
              "value": "字段更新操作符",
              "heading": "字段更新操作符"
            },
            {
              "depth": 5,
              "value": "$set",
              "heading": "set"
            },
            {
              "depth": 4,
              "value": "数组更新操作符",
              "heading": "数组更新操作符"
            },
            {
              "depth": 5,
              "value": "$addToSet",
              "heading": "addtoset"
            },
            {
              "depth": 5,
              "value": "$each",
              "heading": "each"
            },
            {
              "depth": 5,
              "value": "$pop",
              "heading": "pop"
            },
            {
              "depth": 5,
              "value": "$pull",
              "heading": "pull"
            },
            {
              "depth": 5,
              "value": "$push",
              "heading": "push"
            },
            {
              "depth": 5,
              "value": "$pullAll",
              "heading": "pullall"
            },
            {
              "depth": 3,
              "value": "删除文档",
              "heading": "删除文档"
            },
            {
              "depth": 3,
              "value": "拷贝文档",
              "heading": "拷贝文档"
            },
            {
              "depth": 2,
              "value": "数据库服务",
              "heading": "数据库服务"
            },
            {
              "depth": 2,
              "value": "启动数据库",
              "heading": "启动数据库"
            },
            {
              "depth": 2,
              "value": "用户管理",
              "heading": "用户管理"
            },
            {
              "depth": 2,
              "value": "导入导出",
              "heading": "导入导出"
            },
            {
              "depth": 2,
              "value": "备份与恢复",
              "heading": "备份与恢复"
            }
          ]
        },
        "title": "命令大全"
      },
      {
        "path": "/mongodb/other/mongodb",
        "component": require('/Users/mrsingsing/mrsingsing/DataBase-GuideBook/docs/mongodb/other/mongodb.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/mongodb/other/mongodb.md",
          "updatedTime": 1624600876912,
          "nav": {
            "title": "MongoDB",
            "order": 3,
            "path": "/mongodb"
          },
          "group": {
            "title": "基本操作",
            "order": 99,
            "path": "/mongodb/other"
          },
          "title": "扩展资料",
          "order": 5,
          "slugs": [
            {
              "depth": 1,
              "value": "扩展资料",
              "heading": "扩展资料"
            }
          ]
        },
        "title": "扩展资料"
      },
      {
        "path": "/mongodb/other/utils",
        "component": require('/Users/mrsingsing/mrsingsing/DataBase-GuideBook/docs/mongodb/other/utils.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/mongodb/other/utils.md",
          "updatedTime": 1624600881162,
          "nav": {
            "title": "MongoDB",
            "order": 3,
            "path": "/mongodb"
          },
          "group": {
            "title": "基本操作",
            "order": 99,
            "path": "/mongodb/other"
          },
          "title": "工具大全",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "工具大全",
              "heading": "工具大全"
            }
          ]
        },
        "title": "工具大全"
      },
      {
        "path": "/mongodb/overview/administration",
        "component": require('/Users/mrsingsing/mrsingsing/DataBase-GuideBook/docs/mongodb/overview/administration.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/mongodb/overview/administration.md",
          "updatedTime": 1624599353902,
          "nav": {
            "title": "MongoDB",
            "order": 3,
            "path": "/mongodb"
          },
          "title": "数据库管理",
          "order": 10,
          "slugs": [
            {
              "depth": 1,
              "value": "数据库管理",
              "heading": "数据库管理"
            }
          ],
          "group": {
            "path": "/mongodb/overview",
            "title": "基本概述"
          }
        },
        "title": "数据库管理"
      },
      {
        "path": "/mongodb/overview/basic",
        "component": require('/Users/mrsingsing/mrsingsing/DataBase-GuideBook/docs/mongodb/overview/basic.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/mongodb/overview/basic.md",
          "updatedTime": 1624599597968,
          "nav": {
            "title": "MongoDB",
            "order": 3,
            "path": "/mongodb"
          },
          "group": {
            "title": "基本概述",
            "order": 1,
            "path": "/mongodb/overview"
          },
          "title": "基本概述",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "基本概述",
              "heading": "基本概述"
            },
            {
              "depth": 2,
              "value": "术语概念",
              "heading": "术语概念"
            },
            {
              "depth": 2,
              "value": "使用场景",
              "heading": "使用场景"
            },
            {
              "depth": 2,
              "value": "数据库",
              "heading": "数据库"
            },
            {
              "depth": 2,
              "value": "文档",
              "heading": "文档"
            },
            {
              "depth": 2,
              "value": "集合",
              "heading": "集合"
            },
            {
              "depth": 3,
              "value": "合法的集合名",
              "heading": "合法的集合名"
            },
            {
              "depth": 2,
              "value": "元数据",
              "heading": "元数据"
            },
            {
              "depth": 2,
              "value": "数据类型",
              "heading": "数据类型"
            },
            {
              "depth": 3,
              "value": "文档主键",
              "heading": "文档主键"
            },
            {
              "depth": 3,
              "value": "对象主键",
              "heading": "对象主键"
            }
          ]
        },
        "title": "基本概述"
      },
      {
        "path": "/mongodb/overview/configuration",
        "component": require('/Users/mrsingsing/mrsingsing/DataBase-GuideBook/docs/mongodb/overview/configuration.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/mongodb/overview/configuration.md",
          "updatedTime": 1624599350969,
          "nav": {
            "title": "MongoDB",
            "order": 3,
            "path": "/mongodb"
          },
          "title": "配置文件",
          "order": 98,
          "slugs": [
            {
              "depth": 1,
              "value": "配置文件",
              "heading": "配置文件"
            }
          ],
          "group": {
            "path": "/mongodb/overview",
            "title": "基本概述"
          }
        },
        "title": "配置文件"
      },
      {
        "path": "/mongodb/overview/installment",
        "component": require('/Users/mrsingsing/mrsingsing/DataBase-GuideBook/docs/mongodb/overview/installment.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/mongodb/overview/installment.md",
          "updatedTime": 1612414524161,
          "nav": {
            "title": "MongoDB",
            "order": 3,
            "path": "/mongodb"
          },
          "group": {
            "title": "基本概述",
            "order": 1,
            "path": "/mongodb/overview"
          },
          "title": "安裝使用",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "安裝使用",
              "heading": "安裝使用"
            },
            {
              "depth": 2,
              "value": "CentOS7",
              "heading": "centos7"
            },
            {
              "depth": 3,
              "value": "创建文件",
              "heading": "创建文件"
            },
            {
              "depth": 3,
              "value": "下载",
              "heading": "下载"
            },
            {
              "depth": 3,
              "value": "解压",
              "heading": "解压"
            },
            {
              "depth": 3,
              "value": "配置",
              "heading": "配置"
            },
            {
              "depth": 3,
              "value": "添加环境",
              "heading": "添加环境"
            },
            {
              "depth": 3,
              "value": "开机自动启动",
              "heading": "开机自动启动"
            },
            {
              "depth": 3,
              "value": "测试",
              "heading": "测试"
            }
          ]
        },
        "title": "安裝使用"
      },
      {
        "path": "/mysql/cluster",
        "component": require('/Users/mrsingsing/mrsingsing/DataBase-GuideBook/docs/mysql/cluster.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/mysql/cluster.md",
          "updatedTime": 1612413495629,
          "nav": {
            "title": "MySQL",
            "order": 2,
            "path": "/mysql"
          },
          "group": {
            "title": "MySQL",
            "order": 10,
            "path": "/mysql"
          },
          "title": "集群方案",
          "order": 10,
          "slugs": [
            {
              "depth": 1,
              "value": "集群方案",
              "heading": "集群方案"
            }
          ]
        },
        "title": "集群方案"
      },
      {
        "path": "/mysql/mysql",
        "component": require('/Users/mrsingsing/mrsingsing/DataBase-GuideBook/docs/mysql/mysql.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/mysql/mysql.md",
          "updatedTime": 1612413491926,
          "nav": {
            "title": "MySQL",
            "order": 2,
            "path": "/mysql"
          },
          "group": {
            "title": "MySQL",
            "order": 10,
            "path": "/mysql"
          },
          "title": "MySQL",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "MySQL",
              "heading": "mysql"
            }
          ]
        },
        "title": "MySQL"
      },
      {
        "path": "/redis",
        "component": require('/Users/mrsingsing/mrsingsing/DataBase-GuideBook/docs/redis/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/redis/index.md",
          "updatedTime": 1624598540398,
          "slugs": [
            {
              "depth": 1,
              "value": "Radis",
              "heading": "radis"
            }
          ],
          "title": "Radis",
          "nav": {
            "path": "/redis",
            "title": "Redis"
          }
        },
        "title": "Radis"
      },
      {
        "path": "/basic",
        "meta": {
          "order": 1
        },
        "exact": true,
        "redirect": "/basic/paradigm"
      },
      {
        "path": "/basic/database-type",
        "meta": {
          "order": 1
        },
        "exact": true,
        "redirect": "/basic/database-type/data-base"
      },
      {
        "path": "/mongodb/advanced",
        "meta": {
          "order": 3
        },
        "exact": true,
        "redirect": "/mongodb/advanced/authentication"
      },
      {
        "path": "/mongodb",
        "meta": {
          "order": 3
        },
        "exact": true,
        "redirect": "/mongodb/advanced/authentication"
      },
      {
        "path": "/mongodb/basic",
        "meta": {
          "order": 2
        },
        "exact": true,
        "redirect": "/mongodb/basic/documents"
      },
      {
        "path": "/mongodb/mongoose",
        "meta": {
          "order": 10
        },
        "exact": true,
        "redirect": "/mongodb/mongoose/overview"
      },
      {
        "path": "/mongodb/other",
        "meta": {
          "order": 99
        },
        "exact": true,
        "redirect": "/mongodb/other/command"
      },
      {
        "path": "/mongodb/overview",
        "meta": {},
        "exact": true,
        "redirect": "/mongodb/overview/basic"
      },
      {
        "path": "/mysql",
        "meta": {
          "order": 10
        },
        "exact": true,
        "redirect": "/mysql/mysql"
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
