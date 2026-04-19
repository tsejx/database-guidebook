---
nav:
  title: SQL
  order: 2
group:
  title: 高级用法
  order: 4
title: 索引
order: 1
---

# 索引

索引（Index）可以理解为数据库中的“目录”。

当一张表的数据量很小时，就算没有索引，数据库从头到尾扫描一遍也能很快找到结果；但当数据量变大后，如果还每次都全表扫描，查询速度就会明显下降。

索引的作用，就是帮助数据库更快地定位数据。

## 为什么要用索引

假设有一张用户表 `users`：

| id | username | email | created_at |
| :-- | :-- | :-- | :-- |
| 1 | tom | tom@example.com | 2026-01-01 |
| 2 | jack | jack@example.com | 2026-01-02 |
| 3 | rose | rose@example.com | 2026-01-03 |

如果执行下面这条语句：

```sql
SELECT * FROM users WHERE email = 'jack@example.com';
```

没有索引时，数据库通常需要一行一行检查 `email` 字段；有索引时，数据库可以先通过索引快速定位，再回表或直接取出结果。

所以，索引最核心的价值是：

- 加快 `WHERE` 条件查询
- 加快 `ORDER BY` 排序
- 加快 `GROUP BY` 分组
- 提高关联查询（`JOIN`）效率
- 为唯一性约束提供底层支持

## 索引的代价

索引不是越多越好。

因为索引本身也要占用磁盘空间，而且在插入、更新、删除数据时，数据库不仅要修改表数据，还要同步维护索引结构。

这意味着：

- 查询通常会更快
- 写入（`INSERT`、`UPDATE`、`DELETE`）通常会更慢
- 表占用的存储空间会更多

因此，索引的原则不是“能建就建”，而是“给高频查询、筛选、排序、关联使用到的列建立合适的索引”。

## 常见索引类型

不同数据库的实现细节不完全一样，但日常开发中最常见的是下面几类。

### 主键索引

主键索引建立在主键列上，用于保证每一行数据都能被唯一标识。

```sql
CREATE TABLE users (
  id INT PRIMARY KEY,
  username VARCHAR(50),
  email VARCHAR(100)
);
```

说明：

- `PRIMARY KEY` 会自动创建主键索引
- 主键值不能重复
- 主键值不能为 `NULL`

通常，`id` 这类主键字段都会自带索引，不需要重复创建。

### 唯一索引

唯一索引用于保证某一列或某几列的值不能重复。

```sql
CREATE UNIQUE INDEX idx_users_email ON users(email);
```

它很适合用于邮箱、手机号、身份证号、用户名等“必须唯一”的字段。

如果你只是想“加速查询”，唯一索引和普通索引都可以；但如果你还想“禁止重复值”，就应该使用唯一索引。

### 普通索引

普通索引是最常见的索引类型，只负责提高查询效率，不负责限制重复值。

```sql
CREATE INDEX idx_users_username ON users(username);
```

适合建立在以下字段上：

- 经常出现在 `WHERE` 条件中的列
- 经常用于排序的列
- 经常用于表连接的列

### 联合索引

联合索引也叫复合索引，指的是把多个列放在同一个索引里。

```sql
CREATE INDEX idx_orders_user_status ON orders(user_id, status);
```

这个索引适合类似下面的查询：

```sql
SELECT * FROM orders WHERE user_id = 1001 AND status = 'paid';
```

联合索引有一个非常重要的原则：**最左前缀原则**。

以上面的索引 `(user_id, status)` 为例，它通常可以用于：

- `WHERE user_id = 1001`
- `WHERE user_id = 1001 AND status = 'paid'`

但通常不能很好地用于：

- `WHERE status = 'paid'`

因为索引是先按 `user_id` 排，再按 `status` 排。跳过最左边的列，索引效果往往会大打折扣。

### 全文索引

全文索引主要用于文本检索，适合在较长文本中查找关键词。

```sql
CREATE FULLTEXT INDEX idx_articles_content ON articles(content);
```

它和普通索引的用途不同：

- 普通索引更适合精确匹配、范围查询
- 全文索引更适合关键字搜索

例如文章标题、文章内容、商品描述等字段，可能更适合全文索引。

## 如何创建索引

### 创建表时创建索引

```sql
CREATE TABLE users (
  id INT PRIMARY KEY,
  username VARCHAR(50),
  email VARCHAR(100),
  INDEX idx_username (username),
  UNIQUE INDEX idx_email (email)
);
```

### 表创建后新增索引

```sql
CREATE INDEX idx_username ON users(username);
```

或者：

```sql
ALTER TABLE users ADD INDEX idx_username (username);
```

### 删除索引

```sql
DROP INDEX idx_username ON users;
```

某些数据库也支持使用 `ALTER TABLE` 删除索引。

## 什么时候应该建索引

通常来说，下面这些场景值得优先考虑建立索引：

- 数据量较大，查询已经出现明显变慢
- 某些列经常出现在 `WHERE` 条件中
- 某些列经常用于 `JOIN`
- 某些列经常用于 `ORDER BY`、`GROUP BY`
- 某些字段需要唯一约束

例如下面这条语句：

```sql
SELECT id, username FROM users WHERE username = 'tom';
```

如果 `username` 是高频查询条件，就适合建立索引。

## 什么时候不适合建索引

下面这些情况，索引往往收益不高：

- 表很小，数据量本来就不大
- 列的区分度很低，例如只有“男/女”、“是/否”这类少量取值
- 写入操作非常频繁，但查询很少
- 已经存在功能重复、顺序不合理的索引

这里提到一个专业概念：**区分度**。

区分度越高，说明一列中重复值越少，索引越容易快速缩小范围；区分度越低，索引价值通常越低。

比如：

- `id`、`email` 的区分度通常很高
- `gender`、`status` 的区分度通常较低

## 索引失效的常见情况

即使已经创建了索引，SQL 也不一定会使用它。

常见原因包括：

### 1. 对索引列做了函数或计算

```sql
SELECT * FROM users WHERE YEAR(created_at) = 2026;
```

像这样对索引列做函数处理，数据库往往难以直接利用原索引。

更常见的优化写法是改成范围查询：

```sql
SELECT * FROM users
WHERE created_at >= '2026-01-01'
  AND created_at < '2027-01-01';
```

### 2. 联合索引没有遵守最左前缀原则

如果索引是 `(user_id, status, created_at)`，那么只查 `status`，通常无法高效使用该索引。

### 3. 使用模糊查询时以通配符开头

```sql
SELECT * FROM users WHERE username LIKE '%tom';
```

这类语句通常很难利用普通索引；如果写成 `LIKE 'tom%'`，很多数据库更有机会使用索引。

### 4. 隐式类型转换

如果字段是字符串类型，但查询时传入数字，数据库可能发生隐式转换，影响索引使用。

## 如何查看索引

不同数据库命令略有差异，MySQL 中常用：

```sql
SHOW INDEX FROM users;
```

你可以看到索引名称、列名、是否唯一、索引基数等信息。

## 如何判断查询有没有走索引

在 MySQL 中，可以使用：

```sql
EXPLAIN SELECT * FROM users WHERE email = 'jack@example.com';
```

`EXPLAIN` 不会真正执行查询，而是告诉你数据库准备如何执行这条 SQL。

一般可以重点关注：

- `key`：实际使用了哪个索引
- `type`：访问方式，通常越接近高效越好
- `rows`：预计扫描的行数
- `Extra`：额外信息

如果发现 `key` 为空，或者扫描行数很多，就说明这条 SQL 可能没有很好地利用索引。

## 设计索引的实用建议

1. 优先给高频查询条件建立索引
2. 优先给关联字段建立索引
3. 联合索引的列顺序要结合查询条件设计
4. 不要给每一列都建索引
5. 定期清理重复索引、无用索引
6. 通过 `EXPLAIN` 验证索引是否真正生效

## 小结

索引的本质，是用额外的存储和维护成本，换取更快的查询速度。

你可以把它理解成一本书前面的目录：

- 没有目录时，只能一页一页翻
- 有目录时，可以先定位章节，再快速找到目标内容

学习索引时，最重要的不是死记语法，而是掌握下面这几个核心点：

- 索引能提升查询效率，但会增加写入成本
- 主键索引、唯一索引、普通索引、联合索引最常见
- 联合索引要重点理解最左前缀原则
- 索引建得不合理，或者 SQL 写法不当，都会导致索引失效
- 是否真的生效，要用 `EXPLAIN` 来验证

掌握这些基础后，你就能在实际开发中更合理地设计表结构和 SQL 语句。