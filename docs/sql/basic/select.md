---
nav:
  title: SQL
  order: 2
group:
  title: 基础语法
  order: 3
title: 检索数据
order: 5
---

# 检索数据

SQL 语句是由几个简单的英文单词构成的。这些单词称为关键字，每个 SQL 语句都是由一个或多个关键字构成的。而 `SELECT` 语句就是最常用的 SQL 语句。`SELECT` 语句的用途是从一个或多个表中检索信息。

- 想选择什么
- 从什么地方选择

## 检索单个列

语法：

```sql
SELECT <column_name> FROM <table_name>;
```

示例：从 `students` 表中检索名为 `name` 的列

```sql
SELECT name FROM students;
```

> **提示**：结束 SQL 语句
> 多条 SQL 语句必须以分号（`;`）分隔。多数 DBMS 不需要在单条 SQL 语句后加分号，但也有 DBMS 可能必须在单条 SQL 语句后加上分号。当然，如果愿意可以总是加上分号。事实上，即使不一定需要，加上分号也肯定没有坏处。

## 检索多个列

检索多个列，仍然使用相同的 `SELECT` 语句。唯一不同的是必须在 `SELECT` 关键字后给出多个列名，列名之间必须以 **逗号** 分隔。

> **提示**：在最后一个列名后不能加逗号，否则会出现错误。

语法：

```sql
SELECT <column_name1>, <column_name2>, <column_name3>, ... FROM <table_name>;
```

示例：

```sql
SELECT name, age, gender FROM students;
```

## 检索所有列

在实际列名的位置使用星号（`*`）通配符可以检索到所有的列而不必逐个列出它们。

语法：

```sql
SELECT * FROM <table_name>
```

返回的列的顺序一般是列在表定义中出现的物理顺序，但并不总是如此。不过，SQL 数据很少这样（通常，数据返回给应用程序，根据需要进行格式化，再表示出来）。因此，这不应该造成什么问题。

缺点：

- 效率低
- 可读性差

在实际开发中不建议，想在命令行窗口快速查看全表数据可以采用这种方式。

## 起别名 AS

通过别名表示列名的缩写或复杂的表达式，能够 SQL 语句可读性提高。

语法：

```sql
SELECT
  [column1 | expression] AS descriptive_name
FROm
  <table_name>;
```

要给列添加别名，可使用 `AS` 关键词后跟别名。如果别名包含空格，则必须通过反引包裹别名：

```sql
SELECT
  [column1 | expression] AS `descriptive name`
FROM
  <table_name>;
```

因为 `AS` 关键字是可选的，可以在语句中省略它。请注意，还可以在 **表达式** 上使用别名。

示例：查询客户表（customers）和订单表（orders）表中选择客户名称和订单数量。

```sql
SELECT
  customer_name,
  COUNT(o..order_number) total
FROM
  customers c
    INNER JOIN orders o ON c.customer_number = o.customer_number
GROUP BY
  customer_name
HAVING
  total >= 5
ORDER BY
  total DESC;
```

上面的查询从客户表（customers）和订单表（orders）中选择的客户名称和订单数量。它使用 `c` 作为 `customers` 表的别名，`o` 作为 `orders` 表的表别名。`customers` 和 `orders` 表中的列通过表别名 `c` 和 `o` 引用。

## 查询常数

`SELECT` 语句还可以对常数进行查询，实际上就是对查询结果增加固定的常数列，该列是由我们指定的，而不是数据表中动态获取的。

🌰 例子：对 students 表进行学生名查询，同时新增一列字段 school，这个字段固定为 `清华大学`

```sql
SELECT
  name,
  '清华大学' as school
FROM
  students;

-- 查询结果
+----------+------------+
| name     | school     |
+----------+------------+
| 张三      | '清华大学'  |
| 李四      | '清华大学'  |
| 王五      | '清华大学'  |
+----------+------------+
```

需要说明的是，如果常数是个字符串，那么使用单引号（`''`）就非常重要了，比如 `'清华大学'`。单引号说明引号中的字符串是个常数，否则 SQL 会把 `清华大学` 当成列名进行查询，但实际上数据表里没有这个列名，就会引起错误。如果常数是英文字母，比如 `'THU'` 也需要加引号。如果常数是个数字，就可以直接写数字，不需要单引号，

## 去除重复行 DISTINCT

`SELECT` 返回所有匹配的行，如果不想每个值每次都出现，应该如何检索出不同（唯一）的值？

使用关键词 `DISTINCT` 能在检索过程中返回唯一不同的值。

语法：

```sql
SELECT
  DISTINCT <column_name1>,
  <column_name2>, ...
FROM <table_name>
```

使用示例：

```sql
SELECT
  DISTINCT native_place,
  name
FROM students;
```

分析：`SELECT DISTINCT native_place` 告诉 DBMS 只返回不同（具有唯一性）的 `native_place` 行，所以正如下面的输出，只有 4 行。如果使用 `DISTINCT` 关键字，它必须直接放到列名的前面。

```sql
-- 输出
-- GUANGZHOU
-- HUNAN
-- GUANGXI
-- BEIJING
```

注意：

1. `DISTINCT` 需要放到所有列名的前面，如果写成 `SELECT name, DISTINT native_place FROM students` 会报错
2. `DISTINCT` 其实是对后面所有列名的组合进行去重

## 限制返回结果的数量 LIMIT

`SELECT` 语句返回所有匹配的行，它们可能是指定表中的每个行。为了返回第一行或前几行，可使用 `LIMIT` 子句。

语法：

```sql
SELECT <column_name> FROM <table_name> LIMIT <counts>;
```

示例：从 `students` 表中读取 `name` 字段为指定值的数据，并只显示五条

```sql
SELECT name FROM students LIMIT 5;
```

该语句指示 MySQL 等 DBMS 返回不超过 5 行的数据。

为了后面的 5 行数据，需要指定从哪里开始以及检索的行数。

示例：

```sql
SELECT name FROM students LIMIT 5 OFFSET 5;
```

分析：`LIMIT 5 OFFSET 5` 指示 MySQL 等 DBMS 返回从第 5 行起的 5 行数据。第一个数字是检索的行数，第二个数字是指从哪儿开始。

- `LIMIT` 指定返回的行数
- `OFFSET` 指定从哪儿开始

## 限制返回前/后几行

使用示例：

```sql
-- 前 5 行
SELECT TOP 5 * FROM table_name;

-- 后 5 行
SELECT TOP 5 * FROM table_name ORDER BY IN DESC; -- desc 表示降序排列 asc 表示升序
```

## SELECT 的执行顺序

`SELECT` 子句及其顺序

| 序号 | 子句       | 说明               | 是否必须使用           |
| :--- | :--------- | :----------------- | :--------------------- |
| 1    | `SELECT`   | 要返回的列或表达式 | 是                     |
| 2    | `FROM`     | 从中检索数据的表   | 仅在从表选择数据时使用 |
| 3    | `WHERE`    | 行级过滤           | 否                     |
| 4    | `GROUP BY` | 分组说明           | 仅在按组计算聚集时使用 |
| 5    | `HAVING`   | 组级过滤           | 否                     |
| 6    | `ORDER BY` | 输出排序顺序       | 否                     |

🌰 例子：

```sql
SELECT
  DISTINCT player_id,
  player_name,
  count(*) AS num -- 顺序 5
FROM
  player JOIN team ON player.team_id = team.team_id --顺序 1
WHERE
  height > 1.80 -- 顺序 2
GROUP BY
  player.team_id -- 顺序 3
HAVING
  num > 2 -- 顺序 4
ORDER BY
  nun DESC -- 顺序6
LIMIT
  2 -- 顺序7
```

## 注释

示例：

```sql
SELECT <column_name> FROM <table_name> -- 这是一条注释;
```

注释使用 `--`（两个连字符）嵌在行内。`--` 之后的文本就是注释。
