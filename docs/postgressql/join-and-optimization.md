---
nav:
  title: PostgreSQL
  order: 3
group:
  title: 索引与性能
  order: 4
title: 复杂查询与 JOIN 优化
order: 2
---

# 复杂查询与 JOIN 优化

当数据分散在多张表里时，单表查询往往不够用了。

这时你会开始接触：

- `JOIN`
- 聚合函数
- 子查询
- 更复杂的过滤和统计

这一篇的重点不是把 SQL 高级语法全部讲完，而是建立几个最常用的查询直觉。

## 为什么会需要 JOIN

关系型数据库的一大特点，就是数据通常不会全塞进一张大表。

例如：

- 用户在 `users`
- 订单在 `orders`
- 评论在 `comments`
- 文章在 `articles`

这样设计更清晰，也更容易维护。

但查询时，你又经常需要把相关信息拼起来看，这就是 `JOIN` 的用武之地。

## 一个简单示例

先假设有两张表：

```sql
CREATE TABLE users (
  id integer PRIMARY KEY,
  name text NOT NULL
);

CREATE TABLE orders (
  id integer PRIMARY KEY,
  user_id integer,
  total_amount numeric(10, 2)
);
```

如果你想知道“每笔订单是谁下的”，就需要把 `orders.user_id` 和 `users.id` 对应起来。

## INNER JOIN

`INNER JOIN` 只返回两边能匹配上的记录。

```sql
SELECT orders.id, users.name, orders.total_amount
FROM orders
INNER JOIN users ON orders.user_id = users.id;
```

这条语句的意思是：

- 先看 `orders`
- 再找能和它匹配的 `users`
- 只有匹配成功的记录才出现在结果里

如果某条订单的 `user_id` 对不上任何用户，这条订单不会出现在结果中。

## LEFT JOIN

`LEFT JOIN` 会保留左边表的所有记录，即使右边没有匹配项。

```sql
SELECT users.id, users.name, orders.total_amount
FROM users
LEFT JOIN orders ON users.id = orders.user_id;
```

它的直觉是：

- 左表全部保留
- 右表能匹配就带出来
- 匹配不到的部分用 `NULL`

这很适合查：

- 所有用户，以及他们是否有订单
- 所有文章，以及它们是否有评论

## RIGHT JOIN

`RIGHT JOIN` 和 `LEFT JOIN` 是对称的：它会保留右边表的所有记录。

```sql
SELECT users.name, orders.id
FROM users
RIGHT JOIN orders ON users.id = orders.user_id;
```

不过在实际写查询时，很多人更习惯用 `LEFT JOIN`，因为从左到右更容易读。只要调整表顺序，很多场景都能用 `LEFT JOIN` 表达。

## 子查询和 JOIN 的直观区别

### 子查询

子查询是“在一个查询里再嵌一个查询”。

例如：

```sql
SELECT name
FROM users
WHERE id IN (
  SELECT user_id FROM orders WHERE total_amount > 100
);
```

它先查出“订单金额大于 100 的用户 ID”，再去 `users` 表里找对应用户。

### JOIN

用 JOIN 改写时可能是：

```sql
SELECT DISTINCT users.name
FROM users
INNER JOIN orders ON users.id = orders.user_id
WHERE orders.total_amount > 100;
```

两者并不是谁绝对更高级，而是表达方式不同。

可以先这样理解：

- 子查询更像“先查一批结果，再拿结果做下一步”
- JOIN 更像“把相关表按关系拼起来再过滤”

入门阶段最重要的是：**先把含义写对，再谈怎么优化。**

## 常见聚合函数

复杂查询里，聚合非常常见。你不只是要“查出记录”，还经常要“统计结果”。

### `COUNT`

统计数量：

```sql
SELECT COUNT(*) FROM orders;
```

### `SUM`

求和：

```sql
SELECT SUM(total_amount) FROM orders;
```

### `AVG`

平均值：

```sql
SELECT AVG(total_amount) FROM orders;
```

### `MAX` 和 `MIN`

最大值与最小值：

```sql
SELECT MAX(total_amount), MIN(total_amount)
FROM orders;
```

## GROUP BY 的直观用途

如果你想按用户统计订单数：

```sql
SELECT user_id, COUNT(*)
FROM orders
GROUP BY user_id;
```

如果你还想把用户名一起带出来：

```sql
SELECT users.name, COUNT(orders.id)
FROM users
LEFT JOIN orders ON users.id = orders.user_id
GROUP BY users.id, users.name;
```

它表达的是：每个用户对应多少笔订单。

## 初学者该怎么理解查询优化

优化不是一上来就研究执行器内部细节，而是先建立一套朴素判断。

### 第一步：先写对

先确保结果正确，再谈性能。

如果逻辑都错了，优化没有意义。

### 第二步：看过滤条件是否明确

例如：

- 有没有合适的 `WHERE`
- 是否一开始就把范围缩小
- 有没有把“查全表再过滤”写成了“先过滤再处理”

### 第三步：不要返回不需要的列

例如在正式查询里，比起：

```sql
SELECT *
```

通常更推荐：

```sql
SELECT id, name
```

返回列越少，结果集通常也更轻。

### 第四步：关注连接字段和过滤字段有没有索引

例如：

- `orders.user_id`
- `users.id`
- `orders.created_at`

这些字段是否有合适索引，往往会明显影响 JOIN 和筛选性能。

### 第五步：需要时看执行计划

当你怀疑查询慢时，可以使用：

```sql
EXPLAIN SELECT * FROM orders WHERE user_id = 1001;
```

它会告诉你数据库打算怎么执行这条查询。

入门阶段不用一开始把执行计划的所有节点都读透，但至少要知道：**优化不是靠猜，最终要回到执行方式。**

## 一个实用的 JOIN 示例

假设你想查“每位用户的订单数量和总金额”：

```sql
SELECT
  users.id,
  users.name,
  COUNT(orders.id) AS order_count,
  COALESCE(SUM(orders.total_amount), 0) AS total_amount
FROM users
LEFT JOIN orders ON users.id = orders.user_id
GROUP BY users.id, users.name
ORDER BY total_amount DESC;
```

这个例子里同时用到了：

- `LEFT JOIN`
- `COUNT`
- `SUM`
- `COALESCE`
- `GROUP BY`
- `ORDER BY`

它已经很接近日常业务中的常见统计查询了。

## 初学者常见问题

### 只记 JOIN 名字，不记“保留哪边数据”

理解 JOIN 时，最重要的不是背定义，而是记住：

- `INNER JOIN`：只保留匹配上的
- `LEFT JOIN`：左边全保留
- `RIGHT JOIN`：右边全保留

### 一开始就追求写特别复杂的 SQL

不需要。

真正更有价值的是：

- 把关系写清楚
- 把筛选条件写清楚
- 把结果控制清楚

### 还没确认结果是否正确，就急着优化

先对，再快。这是非常重要的顺序。

## 这一篇先记住什么

你现在最值得先掌握的是：

- `INNER JOIN`、`LEFT JOIN`、`RIGHT JOIN` 的区别
- 子查询和 JOIN 是不同表达方式
- `COUNT`、`SUM`、`AVG`、`MAX`、`MIN` 是最常见聚合函数
- 优化的第一步不是炫技巧，而是先写对、少返回、早过滤、看索引、看执行计划

下一篇会进入事务和并发控制：为什么两个用户同时改数据时，数据库仍然需要尽量保持一致和可靠。
