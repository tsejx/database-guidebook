---
nav:
  title: SQL
  order: 2
group:
  title: 基础语法
  order: 2
title: 高级数据过滤
order: 8
---

# 高级数据过滤

> 操作符（operator）：用于联结或改变 `WHERE` 子句中的子句关键字，也称为逻辑操作符（logical operator）。

## AND 操作符

`AND` 运算符是组合两个或多个布尔表达式的逻辑运算符，只有当两个表达式求值为 `true` 时才返回 `true`。如果两个表达式中的一个求值为 `false`，则 `AND` 运算符返回 `false`。

`AND` 运算符通常用在 `SELECT`、`UPDATE`、`DELETE` 语句的 `WHERE` 子句中以形成布尔表达式。`AND` 运算符也用于 `INNER JOIN` 或 `LEFT JOIN` 子句的连接条件。

语法：

```sql
SELECT
  <column_name1>,
  <column_name2>,
  <column_name3>, ...
FROM
  <table_name>
WHERE
  <column_statement1> AND <column_statement2>;
```

示例：

```sql
SELECT
  student_id,
  name,
  age
FROM
  students
WHERE
  native_place = 'GUANGZHOU' AND age <= 22;
```

此 SQL 语句检索 <u>籍贯为广州</u> 且 <u>年龄小于 22 岁</u> 的所有学生的名称和年龄。

## OR 操作符

操作符 `OR` 是 `WHERE` 子句中使用的关键字，用于检索匹配任一给定条件的行。

语法：

```sql
SELECT
  <column_name1>,
  <column_name2>,
  ...
FROM
  <table_name>
WHERE
  <column_statement1> OR <column_statement2>;
```

示例：

```sql
SELECT
  student_id,
  name,
  age
FROM
  students
WHERE
  native_place = 'GUANGZHOU' OR age = 22;
```

此 SQL 语句检索籍贯为广州或年龄等于 22 岁的所有学生的名称和年龄。

## 运算符优先级

当您在语句中使用多个逻辑运算符时，MySQL 会在 `AND` 运算符之后再对 `OR` 运算符进行求值。这称为运算符优先级。

运算符优先级决定运算符的求值顺序。

示例：

```sql
SELECT true OR false AND false;
```

执行上面查询，得到如下结果。

```bash
mysql> SELECT true OR false AND false;
+-------------------------+
| true OR false AND false |
+-------------------------+
|                       1 |
+-------------------------+
1 row in set
```

运算过程分析：

1. 首先，MySQL 对 `AND` 运算符求值，因此，`false AND false` 返回 `false`
2. 其次，MySQL 对 `OR` 运算符求值，根据返回的 `false` 值再执行 `AND` 运算，因此 `true OR false` 返回 true

要更改评估/求值的顺序，需要利用圆括号对操作符进行明确分组，例如：

```sql
SELECT (true OR false) AND false;
```

执行上面查询，得到如下结果。

```bash
mysql> SELECT (true OR false) AND false;
+---------------------------+
| (true OR false) AND false |
+---------------------------+
|                         0 |
+---------------------------+
1 row in set
```

注意：任何时候使用具有 `AND` 和 `OR` 操作符的 `WHERE` 子句，都应该使用圆括号明确地分组操作符。不要过分依赖默认求值顺序，即使它确实如你希望的那样。使用圆括号没有什么坏处，它能消除歧义。

## IN 操作符

操作符 `IN` 能用于指定条件的范围，范围中的每个条件都可以进行匹配。`IN` 取一组由逗号分隔、括在圆括号中的合法值。

语法：

```sql
SELECT
  <column_name1>,
  <column_name2>,
  ...
FROM
  <table_name>
WHERE
  <column_name> IN (<column_value1>, <column_value2>, ...)
ORDER BY
  <column_name>;
```

示例：

```sql
SELECT
  student_id,
  name,
  age
FROM
  students
WHERE
  native_place IN ('GUANGZHOU', 'BEIJING')
ORDER BY
  age;

-- 输出
student_id  age       name      native_place
----------  --------  --------  --------
7           23        Yumi      GUANGZHOU
3           22        Ann       GUANGZHOU
0           20        Ben       BEIJING
2           19        Tony      GUANGZHOU
1           16        Amy       GUANGZHOU
```

为什么要使用 `IN` 操作符？

- 在使用长的合法选项清单时，`IN` 操作符的语法更清楚且更直观
- 在使用 `IN` 时，计算的次序更容易管理（因为使用的操作符更少）
- `IN` 操作符一般比 `OR` 操作符清单执行更快
- `IN` 的最大优点是可以包含其他 `SELECT` 语句，使得能够更动态地建立 `WHERE` 子句

## NOT 操作符

操作符 `NOT` 用于 `WHERE` 字句中否定其后条件的关键字。因为 `NOT` 从不单独使用（它总是与其他操作符一起使用），所以它的语法与其他操作符有所不同。`NOT` 关键字可以用在要过滤的列前，而不仅是在其后。

语法：

```sql
SELECT
  <column_name>
FROM
  <table_name>
WHERE
  NOT <column_statement>
ORDER BY
  <column_name>;
```

示例：

```sql
SELECT
  name
FROM
  students
WHERE
  NOT native_place = 'GUANGZHOU'
ORDER BY
  name;

-- 输出
student_id  age       name      native_place
----------  --------  --------  --------
5           21        Alan      HUNAN
0           20        Ben       BEIJING
6           19        Irene     HUNAN
4           15        Tom       GUANGXI
8           18        Wolf      GUANGXI
```

这里的 `NOT` 否定跟在其后的条件，因此，DBMS 不是匹配 `native_place` 为 `GUANGZHOU`，而是匹配非 `GUANGZHOU` 之外的学生。
