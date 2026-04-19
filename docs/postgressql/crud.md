---
nav:
  title: PostgreSQL
  order: 3
group:
  title: 基础查询
  order: 3
title: 增删改查
order: 1
---

# 增删改查

对大多数业务开发来说，日常和数据库打交道，最常见的就是四类操作：

- `INSERT`
- `SELECT`
- `UPDATE`
- `DELETE`

它们合在一起，通常叫 CRUD：

- Create：创建数据
- Read：读取数据
- Update：更新数据
- Delete：删除数据

这一篇不追求把 SQL 讲全，而是用一张简单的表，把最常见的路径串起来。

## 先准备一张示例表

```sql
CREATE TABLE books (
  id integer PRIMARY KEY,
  title text NOT NULL,
  price numeric(10, 2),
  in_stock boolean DEFAULT true,
  created_at timestamp DEFAULT NOW()
);
```

这张表有几个常见字段：

- `id`：图书编号
- `title`：图书标题
- `price`：价格
- `in_stock`：是否有库存
- `created_at`：创建时间

下面所有示例都围绕这张表展开。

## INSERT：插入数据

`INSERT` 用来新增一行或多行记录。

### 插入一条数据

```sql
INSERT INTO books (id, title, price)
VALUES (1, 'PostgreSQL 入门', 69.00);
```

这里没有显式写 `in_stock` 和 `created_at`，所以它们会使用默认值。

### 插入多条数据

```sql
INSERT INTO books (id, title, price, in_stock)
VALUES
  (2, 'SQL 实战', 88.00, true),
  (3, '数据库设计', 99.00, false);
```

当你已经明确知道要插入哪些列时，建议总是把列名写出来。这样更清晰，也不容易因为表结构变化而出错。

## SELECT：查询数据

`SELECT` 是最常用的一类 SQL。

它的作用是把数据查出来。

### 查询全部列

```sql
SELECT * FROM books;
```

这条语句适合学习和临时检查，但在正式查询里，通常更建议只取需要的列。

### 查询指定列

```sql
SELECT id, title, price FROM books;
```

这样结果更清晰，也能减少不必要的数据返回。

## WHERE：按条件过滤

很多查询真正有用，是因为加了 `WHERE`。

```sql
SELECT id, title, price
FROM books
WHERE price >= 80;
```

这表示只查价格大于等于 80 的书。

再例如：

```sql
SELECT id, title
FROM books
WHERE in_stock = true;
```

这表示只看有库存的书。

可以把 `WHERE` 理解成“先筛选，再返回”。

## ORDER BY：排序

如果你想控制结果顺序，可以用 `ORDER BY`。

### 按价格升序

```sql
SELECT id, title, price
FROM books
ORDER BY price ASC;
```

### 按创建时间倒序

```sql
SELECT id, title, created_at
FROM books
ORDER BY created_at DESC;
```

通常：

- `ASC` 表示升序
- `DESC` 表示降序

如果不写，很多情况下默认是升序。

## LIMIT：限制返回数量

当结果很多时，可以先只看前几条：

```sql
SELECT id, title, price
FROM books
ORDER BY created_at DESC
LIMIT 5;
```

这很适合：

- 看最新几条数据
- 调试 SQL
- 避免一次返回太多结果

## UPDATE：更新数据

`UPDATE` 用来修改已有记录。

### 更新一条数据

```sql
UPDATE books
SET price = 79.00
WHERE id = 1;
```

这表示把 `id = 1` 的图书价格更新为 `79.00`。

### 同时更新多个字段

```sql
UPDATE books
SET in_stock = false,
    price = 59.00
WHERE id = 3;
```

## DELETE：删除数据

`DELETE` 用来删除记录。

```sql
DELETE FROM books
WHERE id = 3;
```

这表示删除 `id = 3` 的那一行。

## 一定要重视 WHERE

对初学者来说，`UPDATE` 和 `DELETE` 最重要的提醒只有一个：

**先确认过滤条件，再执行。**

例如下面这两条语句就非常危险：

```sql
UPDATE books SET price = 0;
```

```sql
DELETE FROM books;
```

因为它们没有 `WHERE`，会影响整张表。

所以实际操作里，建议养成这个习惯：

1. 先用 `SELECT ... WHERE ...` 检查会命中哪些数据
2. 确认无误后，再写 `UPDATE` 或 `DELETE`

这是很重要的基本功。

## 常见函数先记最小集合

学习 CRUD 时，不需要一开始掌握很多函数。先记住几个最常见的就够了。

### `COUNT()`

统计行数：

```sql
SELECT COUNT(*) FROM books;
```

如果要统计有库存的书：

```sql
SELECT COUNT(*)
FROM books
WHERE in_stock = true;
```

### `NOW()`

返回当前时间：

```sql
SELECT NOW();
```

它也经常用在默认值里：

```sql
created_at timestamp DEFAULT NOW()
```

### `COALESCE()`

`COALESCE()` 用来在值为空时给一个替代值。

```sql
SELECT title, COALESCE(price, 0)
FROM books;
```

这表示如果 `price` 是 `NULL`，就用 `0` 显示。

## 用一条最小路径串起来

下面把最常见操作连起来看一遍。

### 插入一本书

```sql
INSERT INTO books (id, title, price)
VALUES (10, 'PostgreSQL 实战', 79.00);
```

### 查出这本书

```sql
SELECT id, title, price
FROM books
WHERE id = 10;
```

### 更新它的价格

```sql
UPDATE books
SET price = 85.00
WHERE id = 10;
```

### 再次确认结果

```sql
SELECT id, title, price
FROM books
WHERE id = 10;
```

### 删除这本书

```sql
DELETE FROM books
WHERE id = 10;
```

这就是一条最小 CRUD 路径。

## 初学阶段先建立什么习惯

学习 CRUD 时，最值得尽早建立的不是“记更多语法”，而是这些习惯：

- 插入数据时把列名写清楚
- 查询时优先只选需要的列
- 先用 `WHERE` 精准过滤
- 排序时显式写 `ORDER BY`
- 看少量结果时用 `LIMIT`
- 更新和删除前，先确认条件是否正确

只要这些习惯养成了，后面学 JOIN、聚合、索引和事务都会更稳。

下一篇会进入索引：为什么同样一条查询，在大表里可能会慢很多，以及索引到底在帮你省什么。
