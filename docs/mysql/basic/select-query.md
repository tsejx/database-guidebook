---
nav:
  title: MySQL
  order: 2
group:
  title: 基础用法
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

## 检索不同的行

`SELECT` 返回所有匹配的行，如果不想每个值每次都出现，应该如何检索出不同（唯一）的值？

解决办法就是使用 `DISTINCT`关键字，此关键字指示 MySQL 只返回不同的值。

```sql
SELECT DISTINCT native_place FROM students;
```

分析：`SELECT DISTINCT native_place` 告诉 DBMS 只返回不同（具有唯一性）的 `native_place` 行，所以正如下面的输出，只有 4 行。如果使用 `DISTINCT` 关键字，它必须直接放到列名的前面。

```sql
-- 输出
-- GUANGZHOU
-- HUNAN
-- GUANGXI
-- BEIJING
```

> **注意**：`DISTINCT` 关键字作用于所有的列，不仅仅是跟在其后的那一列。例如，你指定 `SELECT DISTINCT native_place, name`，因为指定的两列不完全相同，所以所有的行都会被检索出来。

## 限制结果

`SELECT` 语句返回所有匹配的航，它们可能是指定表中的每个行。为了返回第一行或前几行，可使用 `LIMIT` 子句。

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

## 注释

示例：

```sql
SELECT <column_name> FROM <table_name> -- 这是一条注释;
```

注释使用 `--`（两个连字符）嵌在行内。`--` 之后的文本就是注释。
