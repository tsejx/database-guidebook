---
nav:
  title: MySQL
  order: 2
group:
  title: 基础用法
  order: 3
title: 过滤数据
order: 7
---

# 过滤数据

数据库表一般包含大量的数据，很少需要检索表中的所有行。通常只会根据特定操作或报告的需要提取表数据的子集。只检索所需数据需要指定 **搜索条件**（search criteria），搜索条件也称为 **过滤条件**（filter condition）。

## WHERE 子句

在 `SELECT` 语句中，数据根据 `WHERE` 子句中指定的搜索条件进行过滤。

`WHERE` 子句在表名（`FROM` 子句）之后给出。

语法：

```sql
SELECT <column_name1>, <column_name2>, ... FROM <table_name> WHERE <column_name> = <filed_value>;
```

示例：

```sql
SELECT name, age FROM students WHERE age = 19;

-- 输出
name            age
------------    ----------
Tony            19
Iren            19
Otto            19
```

这条语句从 `students` 表中检索两个列，但不返回所有行，只返回 `age` 值为 19 的行。

> 注意：
> 在同时使用 `ORDER BY` 和 `WHERE` 子句时，应该让 `ORDER BY` 位于 `WHERE` 之后，否则将会产生错误。

## WHERE 子句操作符

| 操作符    | 说明               |
| :-------- | :----------------- |
| `=`       | 等于               |
| `<>`      | 不等于             |
| `!=`      | 不等于             |
| `<`       | 小于               |
| `<=`      | 小于等于           |
| `!<`      | 不小于             |
| `>`       | 大于               |
| `>=`      | 大于等于           |
| `!>`      | 不大于             |
| `BETWEEN` | 在指定的两个值之间 |
| `IS NULL` | 为 `NULL` 值       |

### 检查单个值

语法：

```sql
SELECT <column_name1>, <column_name2>, ... FROM <table_name> WHERE <filed_statement>;
```

示例：检索出 `students` 表中年龄小于 20 的学生信息

```sql
SELECT name, age FROM students WHERE age < 20;

-- 输出
name        age
------      --------
Irene       19
Tony        19
Wolf        18
Amy         16
Tom         15
```

### 不匹配检查

语法：

```sql
SELECT student_id, name FROM students WHERE student_id <> 6;

-- 输出
student_id  age       name
----------  --------  --------
0           20        Ben
1           16        Amy
2           19        Tony
3           22        Ann
4           15        Tom
5           21        Alan
7           23        Yumi
8           18        Wolf
```

> 什么时候使用引号？
> 如果仔细观察上述 `WHERE` 子句中的条件，会看到有的值括在单引号内，而有的值未括起来。
>
> - 单引号用来限定字符串。如果将值与字符串类型的列进行比较，就需要限定引号
> - 用来与数值列进行比较的值不用引号

### 范围值检查

使用操作符 `BETWEEN` 可以用于检查某个范围的值。

语法：

```sql
SELECT <column_name1>, <column_name2> FROM <table_name> WHERE <column_value1> BETWEEN <column_value2>;
```

示例：检索年龄在 20 到 22 岁之间的学生

```sql
SELECT name, age FROM students WHERE 20 BETWEEN 22;

-- 输出
student_id  age       name
----------  --------  --------
0           20        Ben
3           22        Ann
5           21        Alan
```

使用 `BETWEEN` 操作符，必须指定两个值：低端值和高端值。这两个值必须用 `AND` 关键字分隔。`BETWEEN` 匹配范围中所有的值，包括指定的开始值和结束值。

### 空值检查

`SELECT` 语句有一个特殊的 `WHERE` 子句——`IS NULL` 子句，能用于校验具有 `NULL` 值的列。

语法：

```sql
SELECT <table_name> WHERE <column_name> IS NULL;
```

示例：

```sql
SELECT students WHERE age IS NULL;
```

该语句返回 `age` 字段为空的学生，由于表中没有这样的行，所以没有返回数据。
