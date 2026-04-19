---
nav:
  title: PostgreSQL
  order: 3
group:
  title: JSON 与半结构化数据
  order: 6
title: JSON / JSONB 的高级用法
order: 1
---

# JSON / JSONB 的高级用法

很多人学习 PostgreSQL 时，都会有一个印象：它是关系型数据库，擅长表、列、约束和 JOIN。

这个印象没有错，但还不完整。

PostgreSQL 还有一个很实用的特点：**它既能处理传统关系型数据，也能处理一定程度的半结构化数据。**

这就是 `JSON` 和 `JSONB` 发挥作用的地方。

## 为什么关系型数据库还要支持 JSON

现实业务里，并不是所有数据都适合在一开始就完全拆成固定列。

例如：

- 配置项
- 扩展字段
- 事件属性
- 某些来源不稳定的外部数据

这些数据的共同特点是：

- 结构可能不完全固定
- 字段可能会随着业务演进增加
- 你希望保留一部分灵活性

这时如果强行把所有内容都拆成固定列，表结构可能会很僵硬；而完全放弃关系型表结构，又会失去约束和查询能力。

PostgreSQL 支持 JSON，就是为了在这两者之间提供一种折中。

## JSON 和 JSONB 有什么区别

这两个类型都能存 JSON 格式的数据，但它们的定位并不完全一样。

### JSON

`JSON` 更接近“按原始 JSON 文本保存”。

它适合“我需要保存 JSON 这类结构化文本”的场景。

### JSONB

`JSONB` 则更偏向“为了查询和处理而优化的二进制表示”。

对初学者来说，最重要的直觉是：

- `JSON`：更像保留原始 JSON 文本
- `JSONB`：更适合后续查询、筛选、索引

所以在 PostgreSQL 的日常业务里，如果你不仅仅是“存进去”，还希望“经常查里面的字段”，通常更常见的是 `JSONB`。

## 一个简单示例

```sql
CREATE TABLE events (
  id integer PRIMARY KEY,
  event_name text NOT NULL,
  properties jsonb,
  created_at timestamp DEFAULT NOW()
);
```

这里的 `properties` 可以保存半结构化属性，例如：

```json
{
  "page": "/pricing",
  "browser": "Chrome",
  "country": "CN"
}
```

这让你在保留主干表结构的同时，也能给每条事件带上灵活字段。

## PostgreSQL 为什么适合这种混合方式

你可以把 PostgreSQL 想成：

- 主体数据仍然适合放在关系型列里
- 灵活扩展部分可以放进 `jsonb`

例如用户表：

```sql
CREATE TABLE users (
  id integer PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  profile jsonb
);
```

这里：

- `id`、`name`、`email` 是核心强约束字段
- `profile` 可以放头像、主题偏好、额外展示信息等扩展属性

这种设计在很多业务里都很常见。

## 最常见的 JSON / JSONB 查询语法

### 取出某个键对应的值

```sql
SELECT properties -> 'browser'
FROM events;
```

这会返回 JSON 形式的值。

### 取出文本值

```sql
SELECT properties ->> 'browser'
FROM events;
```

这里的 `->>` 更适合拿文本结果。

### 按 JSON 字段过滤

```sql
SELECT id, event_name
FROM events
WHERE properties ->> 'country' = 'CN';
```

这表示只查 `country` 为 `CN` 的事件。

### 查询是否包含某段 JSON 结构

```sql
SELECT id, event_name
FROM events
WHERE properties @> '{"browser": "Chrome"}';
```

这条语句的直觉是：`properties` 中至少包含这段键值结构。

## GIN 索引为什么常和 JSONB 一起出现

当你开始频繁按 `jsonb` 内容查询时，单纯存数据还不够，性能也会成为问题。

这时常见的做法是给 `jsonb` 字段建立 `GIN` 索引。

例如：

```sql
CREATE INDEX idx_events_properties_gin
ON events USING GIN (properties);
```

初学者可以先记住这个结论：

- `jsonb` 常配合 `GIN` 索引
- 它的目的是帮助这类包含、键值匹配等查询更高效

这也是前面索引章节里提到 `GIN` 的典型使用场景之一。

## 哪些场景适合用 JSONB

### 配置项

例如用户偏好、页面设置、开关项。

### 扩展字段

例如不同类型商品带有不同附加属性，但你又不想为每一种变化频繁改表结构。

### 事件属性

埋点、日志、行为事件常常会带一批动态字段。

### 接收外部系统数据

例如某些第三方接口返回的结构中，有一部分需要保留原始属性。

## 哪些场景不适合把数据全塞进 JSON

这是非常重要的一点。

`JSONB` 很方便，但不代表核心字段都应该往里放。

例如下面这些字段，通常更适合做成普通列：

- 用户 ID
- 订单号
- 金额
- 状态
- 创建时间

原因很简单：

- 它们经常参与过滤、排序、JOIN、约束
- 它们通常是业务核心字段
- 把核心字段全部塞进 JSON，会让约束和结构都变弱

更稳妥的思路通常是：

- 核心强约束字段放普通列
- 灵活扩展字段放 `jsonb`

## 一个更实际的例子

```sql
CREATE TABLE products (
  id integer PRIMARY KEY,
  name text NOT NULL,
  price numeric(10, 2) NOT NULL,
  attributes jsonb
);
```

这里：

- `id`、`name`、`price` 是稳定的核心字段
- `attributes` 可以按商品类别存不同的扩展属性

例如图书类商品：

```json
{
  "author": "Alice",
  "isbn": "978-7-xxx",
  "language": "zh-CN"
}
```

而服饰类商品可能是：

```json
{
  "color": "black",
  "size": "L",
  "material": "cotton"
}
```

这就是半结构化数据真正有价值的地方。

## 初学者该怎么用好 JSONB

可以先遵循一个简单原则：

1. 先问自己，这是不是核心业务字段
2. 如果是核心字段，优先考虑普通列
3. 如果它更像扩展属性、配置项、事件属性，再考虑 `jsonb`
4. 如果后续会频繁按其中内容查询，再考虑 `GIN` 索引

## 这一篇先记住什么

你现在最重要的是建立这些判断：

- PostgreSQL 不只适合纯关系型表结构，也支持半结构化数据
- `JSON` 和 `JSONB` 都能存 JSON，但 `JSONB` 更适合查询和索引
- 最常见的 JSONB 查询包括 `->`、`->>` 和 `@>`
- `GIN` 索引常用来加速 `jsonb` 查询
- 配置项、扩展字段、事件属性适合 `jsonb`
- 核心强约束字段不要一股脑全塞进 JSON

下一篇是附录性质的命令速查，会把常见的 `psql` 连接和查看命令集中整理出来，方便回头查。
