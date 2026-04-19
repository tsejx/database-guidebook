---
nav:
  title: PostgreSQL
  order: 3
group:
  title: 数据库与表
  order: 2
title: Schema 设计
order: 2
---

# Schema 设计

很多人第一次接触 PostgreSQL，会把 `schema` 当成“一个不太重要的附加概念”。

其实不是。

`schema` 是 PostgreSQL 里很有特色的一层结构。它位于 `database` 和 `table` 之间，主要用来做逻辑分组和命名隔离。

不过对初学者来说，也不需要一开始就把 schema 设计得很复杂。更重要的是先理解：**schema 是什么，什么时候该用，什么时候先别急着用。**

## schema 是什么

可以先把 schema 理解成：**数据库内部的一个命名空间（namespace）**。

例如在同一个数据库里，你可以同时有：

- `public.users`
- `blog.users`
- `admin.users`

虽然它们的表名都叫 `users`，但因为属于不同 schema，所以仍然可以共存。

这就是 schema 的第一个核心作用：**避免命名冲突**。

## schema、database、table 的关系

这三个概念最好一起理解。

- `database`：一个独立数据库
- `schema`：数据库内部的逻辑分组
- `table`：具体存数据的表

可以写成这样的层次：

```text
database -> schema -> table
```

例如：

```text
app
  ├── public.users
  ├── public.orders
  ├── analytics.events
  └── analytics.daily_reports
```

这里：

- `app` 是数据库名
- `public` 和 `analytics` 是 schema
- `users`、`orders`、`events`、`daily_reports` 是表

## 默认的 public schema

PostgreSQL 默认会提供一个 `public` schema。

很多入门项目里，建表时你甚至不会显式写它：

```sql
CREATE TABLE users (
  id integer,
  name text
);
```

这张表通常就会被创建在 `public` schema 下，也就是：

```text
public.users
```

所以很多初学者虽然已经在使用 schema，但自己还没意识到。

## 为什么一个数据库里会有多个 schema

一个数据库里使用多个 schema，通常是为了让结构更清晰。

最常见的场景有三个。

### 按业务模块隔离

例如一个系统同时包含用户、订单、报表模块，可以这样分：

- `public`：基础业务表
- `billing`：计费相关表
- `reporting`：报表相关表

这样查表和看结构时，心智负担会小很多。

### 按团队或职责隔离

当不同团队都在同一个数据库里工作时，schema 也可以帮助划分边界。

例如：

- `app`
- `data`
- `ops`

这样至少在命名和管理上更容易分清谁负责什么。

### 避免命名冲突

有些系统里，不同模块都可能自然地想使用类似表名，例如：

- `users`
- `logs`
- `settings`

如果全部放在同一个 schema 里，很容易冲突；拆到不同 schema 后，就能保留更自然的命名。

## 什么时候只用 public 就够了

对很多初学者项目和中小型练习项目来说，只用 `public` 往往已经够了。

通常满足下面这些情况时，不需要着急拆 schema：

- 只有一个小项目
- 表的数量还不多
- 业务边界很简单
- 主要目标是先学建表、CRUD、索引和事务

如果你还在熟悉 PostgreSQL 的基本操作，那么先统一放在 `public`，通常比一开始就做复杂拆分更好。

## 什么时候再考虑多 schema

当你开始出现这些情况时，就可以考虑引入多个 schema：

- 表越来越多，光看名字已经很难判断归属
- 不同模块边界明显
- 多个团队或多类任务共用一个数据库
- 需要明显区分业务表、报表表、审计表等不同用途

换句话说：**schema 不是越早越好，而是在结构开始变复杂时，帮你把复杂度整理起来。**

## 创建 schema

创建 schema 的命令很直接：

```sql
CREATE SCHEMA analytics;
```

创建之后，可以在这个 schema 下创建表：

```sql
CREATE TABLE analytics.events (
  id integer,
  event_name text,
  created_at timestamp DEFAULT NOW()
);
```

如果你在写 SQL 时显式带上 schema 名，代码会更清楚地表达“这张表属于哪里”。

## 查询时带不带 schema 名

例如查询表：

```sql
SELECT * FROM analytics.events;
```

带 schema 名的好处是清晰、明确，尤其当数据库里对象越来越多时更明显。

但在入门阶段，如果你主要使用 `public`，不带 schema 名也完全正常。

## 命名规范建议

Schema 设计里，命名规范比“炫技式层级设计”更重要。

### 建议一：使用小写

推荐：

- `public`
- `analytics`
- `billing`

不推荐：

- `Analytics`
- `BillingData`

PostgreSQL 对带引号和大小写对象名的处理容易让新手困惑，所以统一用小写最省心。

### 建议二：使用下划线风格

如果名字由多个单词组成，优先用下划线：

- `user_center`
- `event_logs`

这样和大多数 SQL 命名习惯更一致。

### 建议三：避免保留字

不要把 schema 或表命名成常见 SQL 关键字，比如：

- `user`
- `order`
- `select`

虽然有时能通过引号强行使用，但会给后续维护增加麻烦。

### 建议四：不要做过深的心智层级

Schema 只是帮助组织结构，不是为了创造更多层级负担。

例如：

- `analytics`
- `billing`
- `content`

通常就已经足够。

没必要为了“看起来专业”而把结构拆得过碎。

## 一个简单的设计示例

假设你在做一个内容平台，可以先从最简单的方式开始：

```text
public.users
public.articles
public.comments
```

当业务逐渐变复杂，再考虑拆成：

```text
public.users
content.articles
content.comments
reporting.article_daily_stats
```

这个演进方式通常比一开始过度设计更自然。

## 初学者常见误区

### 误区一：以为每个表都必须单独建 schema

没有这个必要。

Schema 的目标是“合理分组”，不是“每个对象都单独隔离”。

### 误区二：以为 schema 越多越高级

Schema 太多，反而会让结构更难理解。

一个简单、稳定、容易查找的结构，比“看起来很复杂”更重要。

### 误区三：还没熟悉 public，就急着做多 schema 设计

对学习路径来说，先熟悉：

- 建表
- 插入数据
- 查询数据
- 建索引
- 写事务

通常比过早设计多个 schema 更有价值。

## 这一阶段先记住什么

你现在只需要先建立下面这些判断：

- schema 是数据库内部的逻辑分组
- 它的核心价值是分组和避免命名冲突
- 初学者大多数时候先用 `public` 就够了
- 当项目变大、模块更清晰时，再考虑多 schema
- 命名尽量用小写、下划线、避免保留字

下一篇会继续讲表结构中的约束：主键、唯一、非空、外键这些规则到底在保护什么。
