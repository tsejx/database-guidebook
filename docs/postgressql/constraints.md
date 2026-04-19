---
nav:
  title: PostgreSQL
  order: 3
group:
  title: 数据库与表
  order: 2
title: 约束与数据完整性设计
order: 3
---

# 约束与数据完整性设计

建表时，如果只有字段名和数据类型，数据库还不够“有原则”。

例如：

- 用户 ID 可不可以重复？
- 邮箱能不能留空？
- 订单金额能不能是负数？
- 评论能不能指向一篇根本不存在的文章？

这些问题，靠应用层当然也可以做校验，但数据库本身也应该承担最后一道兜底责任。这个兜底机制，就是 **约束（constraint）**。

## 为什么要有约束

约束的核心作用是：**防止明显不合法的数据进入表里。**

它解决的不是“页面怎么提示更友好”，而是“无论谁来写数据库，都不能轻易破坏数据完整性”。

可以把它理解成：

- 应用层校验负责用户体验
- 数据库约束负责底线规则

两者不是二选一，而是分工不同。

## 最常见的几种约束

PostgreSQL 里，入门阶段最值得先掌握这 5 类：

- `PRIMARY KEY`
- `FOREIGN KEY`
- `UNIQUE`
- `CHECK`
- `NOT NULL`

下面逐个看它们解决什么问题。

## PRIMARY KEY

`PRIMARY KEY` 表示主键。

主键的作用是：**唯一标识表中的每一行数据。**

例如用户表里，`id` 往往就是主键：

```sql
CREATE TABLE users (
  id integer PRIMARY KEY,
  name text
);
```

这意味着：

- `id` 不能重复
- `id` 不能为 `NULL`

所以主键通常是“这张表最核心的身份字段”。

## NOT NULL

`NOT NULL` 表示该字段不能为空。

例如：

```sql
CREATE TABLE users (
  id integer PRIMARY KEY,
  name text NOT NULL
);
```

这表示每条用户记录都必须有 `name`。

适合加 `NOT NULL` 的字段通常有：

- 主键
- 用户名
- 创建时间
- 业务上必填的状态字段

如果一个字段在业务上一定要有值，就不要让它默认为可空。

## UNIQUE

`UNIQUE` 表示字段值不能重复。

例如邮箱通常希望全局唯一：

```sql
CREATE TABLE users (
  id integer PRIMARY KEY,
  email text UNIQUE
);
```

这意味着：

- 两条记录不能拥有相同的 `email`

`UNIQUE` 和 `PRIMARY KEY` 看起来有点像，但它们的定位不同：

- `PRIMARY KEY` 是表的主身份
- `UNIQUE` 是“这个字段也不能重复”

一个表只能有一个主键，但可以有多个唯一约束。

## CHECK

`CHECK` 用来表达“这个字段必须满足某个条件”。

例如商品价格不能为负数：

```sql
CREATE TABLE products (
  id integer PRIMARY KEY,
  name text NOT NULL,
  price numeric(10, 2) CHECK (price >= 0)
);
```

再例如年龄不能小于 0：

```sql
age integer CHECK (age >= 0)
```

`CHECK` 很适合放业务上稳定、明确的底线规则。

## FOREIGN KEY

`FOREIGN KEY` 表示外键。

它的作用是：**让一张表中的字段，引用另一张表中已经存在的记录。**

例如评论必须属于某篇文章：

```sql
CREATE TABLE articles (
  id integer PRIMARY KEY,
  title text NOT NULL
);

CREATE TABLE comments (
  id integer PRIMARY KEY,
  article_id integer REFERENCES articles(id),
  content text NOT NULL
);
```

这里的 `comments.article_id` 就是外键。

它表达的含义是：

- 你不能随便写一个根本不存在的 `article_id`
- 评论和文章之间的关系由数据库保证

这类约束对保持数据关系非常重要。

## 建表时一起声明约束

很多时候，约束就是在建表时直接一起写进去的。

例如：

```sql
CREATE TABLE users (
  id integer PRIMARY KEY,
  email text NOT NULL UNIQUE,
  name text NOT NULL,
  age integer CHECK (age >= 0),
  created_at timestamp NOT NULL DEFAULT NOW()
);
```

这张表同时表达了几层规则：

- `id` 是主键
- `email` 不能为空且不能重复
- `name` 不能为空
- `age` 不能小于 0
- `created_at` 必须有值，且默认使用当前时间

这样表结构本身就已经带有明确的业务边界。

## 一个包含外键的例子

```sql
CREATE TABLE authors (
  id integer PRIMARY KEY,
  name text NOT NULL
);

CREATE TABLE books (
  id integer PRIMARY KEY,
  author_id integer REFERENCES authors(id),
  title text NOT NULL,
  price numeric(10, 2) CHECK (price >= 0)
);
```

这里：

- `authors` 存作者
- `books` 存图书
- `books.author_id` 指向 `authors.id`

它表达的是：一本书必须关联到一个已经存在的作者。

## 约束分别在解决什么问题

可以用最直观的方式来记：

- `PRIMARY KEY`：每条记录要有唯一身份
- `NOT NULL`：这个字段不能缺
- `UNIQUE`：这个字段不能和别的记录重复
- `CHECK`：这个字段必须符合某个条件
- `FOREIGN KEY`：这条数据和另一张表的关系必须真实存在

如果你能把这 5 个问题和对应约束建立起直觉，后面的表设计会顺很多。

## 实战里先加哪些约束最值钱

初学者设计表时，不必一上来把所有规则都写满。

一个很实用的顺序是：

1. 先确定主键
2. 再给明显必填的字段加 `NOT NULL`
3. 给不能重复的业务字段加 `UNIQUE`
4. 给明确的数值范围或状态规则加 `CHECK`
5. 对跨表关系再加 `FOREIGN KEY`

这个顺序比较符合大多数业务表的自然演进。

## 约束和应用层校验是什么关系

一个常见误区是：

“前端和后端已经校验过了，数据库就不用加约束了吧？”

不建议这样想。

原因很简单：写数据库的入口不一定只有一个。

除了主应用，还可能有：

- 脚本
- 管理后台
- 数据修复工具
- 手工 SQL
- 第三方导入程序

如果数据库本身没有底线约束，任何一个入口写错，都可能留下脏数据。

更稳妥的思路是：

- 应用层负责友好提示和业务流程
- 数据库负责底线约束和最终一致性

## 初学者常见误区

### 误区一：所有字段都允许为 NULL

这会让后续查询、统计和业务判断都变麻烦。

如果字段本来就是必填，就应该明确写 `NOT NULL`。

### 误区二：主键和唯一约束随便选一个就行

不完全对。

主键是表的核心身份，唯一约束只是额外保证某列不重复，它们不是同一个角色。

### 误区三：外键一定会让开发很麻烦，所以不要用

外键确实会带来更严格的写入要求，但它也能防止很多关系型数据错误。是否使用要看业务场景，不应该因为怕麻烦就全部放弃。

## 这一篇先记住什么

你现在最重要的是建立下面这些判断：

- 约束是数据库的数据底线规则
- 主键负责唯一身份
- 非空负责必填
- 唯一负责防重复
- 检查约束负责基本合法性
- 外键负责跨表关系真实存在

如果表设计里缺少这些约束，数据库就更容易积累脏数据。

下一篇会开始进入最常见的日常操作：插入、查询、更新、删除，也就是 CRUD。
