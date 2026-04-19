---
nav:
  title: PostgreSQL
  order: 3
group:
  title: 数据库与表
  order: 2
title: 数据库与表
order: 1
---

# 数据库与表

学完安装、启动、连接之后，下一步就该进入真正的“数据怎么组织”了。

在 PostgreSQL 里，初学者最容易混淆的三个词是：`database`、`schema` 和 `table`。

先记住一个最直观的关系：

- `database` 是一个独立的数据空间
- `schema` 是数据库里的逻辑分组
- `table` 是真正存放结构化数据的地方

可以把它想成一层层往下拆：**一个 PostgreSQL 服务里有多个 database，一个 database 里可以有多个 schema，一个 schema 里又可以有多张 table**。

## database、schema、table 分别是什么

### database

`database` 是数据库实例里的一个独立数据库。

比如同一个 PostgreSQL 服务里，可以同时有这些数据库：

- `postgres`
- `blog`
- `shop`
- `test`

它们之间的数据默认是隔离的。你连接到 `blog` 数据库时，不能直接去查 `shop` 里的表。

### schema

`schema` 可以理解成数据库内部的一层命名空间。

它的作用通常有两个：

- 给表、视图、函数做逻辑分组
- 避免同名对象互相冲突

PostgreSQL 默认会有一个 `public` schema。很多入门项目只用 `public` 就够了。

### table

`table` 就是最常见的数据表。

表由“列”和“行”组成：

- 列（column）定义字段名和数据类型
- 行（row）是真正存进去的一条条数据

例如用户表 `users` 里，可能有这些列：

- `id`
- `name`
- `email`
- `is_active`
- `created_at`

每插入一位用户，就会多一行数据。

## 为什么 PostgreSQL 里既有 database 又有 schema

很多人刚接触 PostgreSQL 时会问：既然已经有 database 了，为什么还要有 schema？

因为它们解决的问题不同。

- `database` 更像“大隔离”
- `schema` 更像“数据库内部的整理方式”

一个常见理解方式是：

- 不同项目、不同环境，可以拆到不同 database
- 同一个项目内部的不同模块，可以拆到不同 schema

例如一个业务系统可能只有一个 `app` 数据库，但里面有：

- `public`
- `billing`
- `reporting`

这样比把所有表都塞进同一个命名空间更清楚。

不过对初学者来说，不需要一开始就设计很多 schema。先把 database、table 和基础 SQL 练熟更重要。

## 创建数据库

创建数据库最常见的命令很简单：

```sql
CREATE DATABASE bookstore;
```

如果要删除一个数据库：

```sql
DROP DATABASE bookstore;
```

但要注意两点：

- 删除数据库会把里面的对象一起删掉
- 如果当前还有连接占用这个数据库，删除通常会失败

所以学习阶段先记住：**`CREATE DATABASE` 用来新建，`DROP DATABASE` 用来删除，删除动作要谨慎。**

## 创建 schema

如果你想在一个数据库里再细分逻辑空间，可以创建 schema：

```sql
CREATE SCHEMA blog;
```

创建之后，表就可以放在这个 schema 下面：

```sql
CREATE TABLE blog.posts (
  id integer,
  title text
);
```

如果你不写 schema 名，PostgreSQL 通常会默认放到 `public`。

## 创建一张最小的表

下面先看一个短小的例子：

```sql
CREATE TABLE users (
  id integer,
  name text,
  is_active boolean DEFAULT true,
  created_at timestamp DEFAULT NOW()
);
```

这个例子里：

- `users` 是表名
- `id`、`name`、`is_active`、`created_at` 是字段名
- `integer`、`text`、`boolean`、`timestamp` 是数据类型
- `DEFAULT` 表示如果插入时没提供值，就使用默认值

例如：

- `is_active boolean DEFAULT true` 表示默认启用
- `created_at timestamp DEFAULT NOW()` 表示默认使用当前时间

## 字段、类型、默认值分别在表达什么

### 字段名

字段名描述“这列数据是什么”。

例如：

- `name` 表示用户名
- `price` 表示价格
- `created_at` 表示创建时间

字段名最好做到见名知意。

### 数据类型

数据类型限制“这列应该存什么样的值”。

例如：

- 价格不适合用布尔值
- 时间不适合用纯文本乱存
- 是否启用更适合用 `boolean`

正确的数据类型能让查询、排序、过滤和约束都更可靠。

### 默认值

默认值用于减少重复输入，也能让数据更稳定。

例如：

- 新记录创建时自动写入时间
- 状态字段默认启用
- 某些统计字段默认从 `0` 开始

## 初学者最常见的数据类型

不用一开始记完整类型大全，先掌握最常用的一组就够了。

### `numeric`

`numeric` 适合存需要精确计算的数值，例如金额、单价、折扣。

```sql
price numeric(10, 2)
```

这通常表示最多 10 位数字，其中 2 位是小数。

金额场景一般更推荐 `numeric`，而不是随手用浮点数。

### `text`

`text` 用来存不定长文本。

```sql
title text
```

用户名、标题、备注、描述这类字段，经常会用到它。

### `boolean`

`boolean` 表示真假值。

```sql
is_published boolean DEFAULT false
```

常见于：

- 是否启用
- 是否删除
- 是否公开

### `timestamp`

`timestamp` 用来保存日期和时间。

```sql
created_at timestamp DEFAULT NOW()
```

这是业务系统里很常见的一类字段。

### `json`

`json` 用来保存 JSON 格式的数据。

```sql
profile json
```

它会保留原始 JSON 文本结构，适合需要按 JSON 格式存储的数据。

### `jsonb`

`jsonb` 也是保存 JSON 数据，但会以更适合查询和处理的方式存储。

```sql
settings jsonb
```

在 PostgreSQL 里，如果你后续还想按 JSON 字段做查询、筛选和索引，通常更常见的是 `jsonb`。

## 一个更完整一点的建表示例

```sql
CREATE TABLE products (
  id integer,
  name text,
  price numeric(10, 2),
  is_on_sale boolean DEFAULT false,
  created_at timestamp DEFAULT NOW(),
  meta jsonb
);
```

这张表表达的是：

- `id`：商品编号
- `name`：商品名称
- `price`：商品价格
- `is_on_sale`：是否在促销
- `created_at`：创建时间
- `meta`：扩展信息，比如颜色、标签、额外属性

如果你以后要加主键、唯一约束、外键、索引，这些通常也是在表结构的基础上继续增强，而不是另起一套体系。

## 查看当前数据库里的表

建完表之后，可以在 `psql` 中查看：

```text
\dt
```

查看某张表的结构：

```text
\d users
```

这两个命令很适合用来确认“表到底有没有创建成功”。

## 初学者先建立什么直觉

学习这一阶段时，重点不是背更多命令，而是建立下面这些直觉：

- `database` 是更大的隔离单位
- `schema` 是数据库内部的逻辑分组
- `table` 才是日常真正存数据的地方
- 表设计最基础的内容是：字段名、数据类型、默认值
- 数据类型不是随便写，它会直接影响数据质量和后续查询

下一篇会继续讲 `schema` 设计：什么时候只用 `public` 就够了，什么时候值得拆成多个 schema。
