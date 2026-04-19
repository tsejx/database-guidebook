---
nav:
  title: PostgreSQL
  order: 3
group:
  title: 索引与性能
  order: 4
title: 索引原理与使用
order: 1
---

# 索引原理与使用

当表里的数据还很少时，很多 SQL 看起来都很快。

但随着数据量变大，你会发现一个明显问题：**同样的查询语句，可能会越来越慢。**

这时最常被提到的关键词，就是索引（index）。

## 为什么需要索引

先看一个直觉例子。

假设一张 `users` 表里有几百万行数据，而你经常执行这样的查询：

```sql
SELECT id, name
FROM users
WHERE email = 'alice@example.com';
```

如果 `email` 没有索引，数据库可能需要一行一行往下看，直到找到匹配值。这个过程通常叫**全表扫描**。

而有了合适的索引后，数据库就不必每次都把整张表翻一遍，可以更快定位到目标位置。

所以索引最核心的价值是：**减少不必要的扫描，提高查询效率。**

## 可以把索引想成什么

初学阶段，可以把索引想成一本书后面的目录。

如果一本书没有目录，你想找“事务”这一章，只能从第一页慢慢翻。

如果有目录，你就能先定位到大致页码，再快速找到内容。

数据库索引也类似：

- 没有索引时，更像从头到尾翻整本书
- 有索引时，更像先查目录，再定位内容

这个类比虽然不等于底层实现，但很适合建立直觉。

## B-Tree 是最常见的重点

PostgreSQL 里最常见、最重要的一类索引是 **B-Tree**。

很多常规查询，默认用到的就是它。

它特别适合这些场景：

- 精确匹配
- 范围查询
- 排序
- 某些连接条件

例如：

```sql
SELECT * FROM products WHERE id = 100;
```

```sql
SELECT * FROM products WHERE price > 100;
```

```sql
SELECT * FROM products ORDER BY created_at DESC;
```

这些场景里，B-Tree 往往都是优先考虑的索引类型。

## 创建一个最基本的索引

例如你经常按邮箱查用户：

```sql
CREATE INDEX idx_users_email ON users (email);
```

这样数据库在处理 `WHERE email = ...` 这类查询时，就更有机会利用索引。

如果想查看一张表的索引，可以在 `psql` 中使用：

```text
\d users
```

或者：

```text
\di
```

## 常见索引类型

入门阶段，不需要把所有索引类型背下来，但至少要知道几种常见类型分别擅长什么。

### B-Tree

这是默认、最常见的一类索引。

适合：

- `=` 精确匹配
- `> < >= <=` 范围过滤
- `ORDER BY`
- 常规 JOIN 字段

大多数业务表的普通筛选和排序，首先想到的通常都是它。

### Hash

`Hash` 索引更偏向等值匹配。

```sql
CREATE INDEX idx_users_email_hash ON users USING HASH (email);
```

但在 PostgreSQL 的实际学习和日常业务里，B-Tree 更常见，Hash 往往不是初学者的第一选择。

### GIN

`GIN` 索引经常用于：

- `jsonb`
- 数组
- 全文检索一类场景

例如后面学 `jsonb` 查询时，你会经常看到它。

### GiST

`GiST` 常用于更特殊的索引需求，例如某些几何、范围、全文或扩展类型场景。

对初学者来说，先知道它存在即可，不必一开始深入到底层细节。

## 什么时候值得加索引

不是所有字段都要加索引。更实用的判断方式是看“这个字段是否经常被拿来定位数据”。

通常下面这些情况更值得考虑索引。

### 高频过滤字段

例如：

- `email`
- `user_id`
- `status`
- `created_at`

如果查询里经常出现在 `WHERE` 条件中，就值得关注。

### 经常用于排序的字段

例如：

```sql
SELECT id, title
FROM articles
ORDER BY created_at DESC
LIMIT 20;
```

像这种“按时间取最新几条”的场景，很常见，也常常值得配合索引考虑。

### 经常用于连接的字段

例如：

- `orders.user_id`
- `comments.article_id`

JOIN 时这些字段是否有合适索引，往往会影响查询效率。

## 什么时候不该乱加索引

索引不是越多越好。

下面这些情况，要格外谨慎。

### 小表

如果表本来就很小，全表扫描的代价可能并不高。

这时强行加很多索引，不一定带来明显收益。

### 低区分度字段

例如一个字段只有少数几个值：

- `true / false`
- `已启用 / 已禁用`

这种字段如果单独建索引，很多时候收益有限，因为它不能很好地区分数据。

### 写多读少的场景

索引不只是“查询加速器”，它也会让写入有额外成本。

每次：

- `INSERT`
- `UPDATE`
- `DELETE`

数据库除了改表数据，还可能要维护索引结构。

如果你的场景是写入非常频繁、读取很少，就不能只看到索引的好处。

## 索引的代价是什么

这是必须建立的直觉。

索引通常会带来这些代价：

- 占用额外磁盘空间
- 增加写入维护成本
- 索引过多会让优化和维护更复杂

所以正确的思路不是“能加就全加”，而是：

**给真正高频、真正有区分度、真正影响查询体验的字段加索引。**

## 一个直观例子

假设有一张订单表：

```sql
CREATE TABLE orders (
  id integer PRIMARY KEY,
  user_id integer,
  status text,
  created_at timestamp DEFAULT NOW(),
  total_amount numeric(10, 2)
);
```

如果你经常做这些查询：

```sql
SELECT * FROM orders WHERE user_id = 1001;
```

```sql
SELECT * FROM orders ORDER BY created_at DESC LIMIT 20;
```

那么比起随便给所有列建索引，更合理的考虑通常是：

```sql
CREATE INDEX idx_orders_user_id ON orders (user_id);
CREATE INDEX idx_orders_created_at ON orders (created_at);
```

这比给 `status`、`total_amount` 等所有列一股脑建索引更有针对性。

## 初学者的索引思路

学索引时，一个很实用的顺序是：

1. 先把查询写对
2. 找出最常用的过滤、排序、连接字段
3. 先考虑 B-Tree
4. 再根据数据类型和场景考虑 GIN / GiST 等特殊类型
5. 记住索引有维护成本，不要滥加

## 这一篇先记住什么

你现在最需要建立的不是“背索引类型大全”，而是这些直觉：

- 索引的目标是减少不必要的扫描
- B-Tree 是最常见、最值得先掌握的索引类型
- 高频过滤、排序、连接字段最值得优先考虑索引
- 小表、低区分度字段、写多读少场景不要乱加
- 索引会占空间，也会拖慢写入

下一篇会继续进入复杂查询：JOIN、聚合、子查询，以及初学者该怎么做第一层优化判断。
