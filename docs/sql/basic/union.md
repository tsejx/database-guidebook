---
nav:
  title: SQL
  order: 2
group:
  title: 基础语法
  order: 3
title: 集合运算
order: 17
---

# 集合运算

SQL 作用在关系上的 `UNION`、`INTERSECT` 和 `EXCEPT` 运算对应于数学集合论中的 ∪（并集）、∩（交集）和 -（差集）。

我们构造两个集合用于上述运算的查询。

集合一：在 2009 年秋季学期开设的所有课程的集合

```sql
SELECT
  course_id
FROM
  section
WHERE
  semester = 'Fall' AND year = 2009;

--- 输出结果
+-----------+
| course_id |
+-----------+
|    CS-101 |
|     CS347 |
|   PHY-101 |
+-----------+
```

集合二：在 2010 年春季学期开设的所有课程的集合

```sql
SELECT
  course_id
FROM
  section
WHERE
  semester = 'Spring' AND year = 2010;

--- 输出结果
+-----------+
| course_id |
+-----------+
|    CS-101 |
|    CS-315 |
|    CS-319 |
|    CS-319 |
|   FIN-201 |
|   HIS-351 |
|    MU-199 |
+-----------+
```

## 并运算 UNION

`UNION` 操作符可以将来自多个查询块的结果组合成一个结果集和。

语法：

```sql
query_expression_body UNION [ALL | DISTINCT] query_block
    [UNION [ALL | DISTINCT] query_expression_body]
    [...]

query_expression_body:
    See Section 13.2.14, “Set Operations with UNION, INTERSECT, and EXCEPT”
```

示例：

为了找出在 2009 年秋季开课，或者在 2010 年春季开课或两个学期都开课的所有课程，我们可写查询语句：

```sql
(
  SELECT
    course_id
  FROM
    section
  WHERE
    semester = 'Fall' and year = 2009
)
UNION
(
  SELECT
    course_id
  FROM
    section
  WHERE
    semester = 'Spring' and year = 2010
);

--- 输出结果
+-----------+
| course_id |
+-----------+
|    CS-101 |
|    CS-315 |
|    CS-319 |
|    CS-347 |
|   FIN-201 |
|   HIS-351 |
|    MU-199 |
|   PHY-101 |
+-----------+
```

与 `SELECT` 子句不同，`UNION` 运算自动去除重复（如 2009 年秋季和 2010 年春季各开设的 CS-101 课程，和 2010 年春季两个相同的课程 CS-319）。

如果想保留所有重复的项，就必须用 `UNION ALL` 代替 `UNION`。

## 交运算

`INTERSECT` 将来自多个查询块的结果限制为所有公共的行。

语法：

```sql
query_expression_body INTERSECT [ALL | DISTINCT] query_expression_body
    [INTERSECT [ALL | DISTINCT] query_expression_body]
    [...]

query_expression_body:
    See Section 13.2.14, “Set Operations with UNION, INTERSECT, and EXCEPT”
```

示例：

为了找出 2009 年秋季和 2010 年春季同时开课的所有课程的集合，我们可写出：

```sql
(
  SELECT
    course_id
  FROM
    section
  WHERE
    semester = 'Fall' AND year = 2009
)
INTERSECT
(
  SELECT
    course_id
  FROM
    section
  WHERE
    semester = 'Spring' AND year = 2010
);
```

`INTERSECT` 运算自动去除重复。例如，如果 ECE-101 在 2009 年秋季学期开设 4 个课程段，在 2010 年春季学期开设 2 个课程段，那么在结果中只有 1 个 ECE-101 元组。

如果想保留所有重复，就必须用 `INTERSECT ALL` 代替 `INTERSECT`。

## 差运算

`EXCEPT` 将第一个查询块的结果限制为在第二个查询块中（也）没有找到的那些行。与 UNION 和 INTERSECT 一样，任一查询块都可以使用 SELECT、 TABLE 或 VALUES 中的任何一个。

语法：

```sql
query_expression_body EXCEPT [ALL | DISTINCT] query_expression_body
    [EXCEPT [ALL | DISTINCT] query_expression_body]
    [...]

query_expression_body:
    See Section 13.2.14, “Set Operations with UNION, INTERSECT, and EXCEPT”
```

示例：

为了找出 2009 年秋季学期开课但不在 2010 年春季学期开课的所有课程：

```sql
(
  SELECT
    course_id
  FROM
    section
  WHERE
    semester = 'Fall' AND year = 2009
)
EXCEPT
(
  SELECT
    course_id
  FROM
    section
  WHERE
    semester = 'Spring' AND year = 2010
);

--- 输出结果
+-----------+
| course_id |
+-----------+
|     CS347 |
|   PHY-101 |
+-----------+
```

如果想保留所有重复，就必须用 `EXCEPT ALL` 代替 `EXCEPT`。

## 相关资料

- [UNION Clause](https://dev.mysql.com/doc/refman/8.0/en/union.html)
- [INTERSECT Clause](https://dev.mysql.com/doc/refman/8.0/en/intersect.html)
- [EXCEPT Clause](https://dev.mysql.com/doc/refman/8.0/en/except.html)
