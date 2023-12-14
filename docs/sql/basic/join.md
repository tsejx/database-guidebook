---
nav:
  title: SQL
  order: 2
group:
  title: 基础语法
  order: 2
title: 连接表
order: 11
---

# 连接表

## 内部联结 INNER JOIN

`INNER JOIN` 子句也叫内连接或等值连接，用于获取多个表中字段匹配关系的记录。

在使用 `INNER JOIN` 子句之前，必须指定以下条件：

- 首先，在 `FROM` 子句中指定主表
- 其次，表中要连接的主表应该出现在 `INNER JOIN` 子句中，理论上可连接多个其他表，但是，为了获得更好的性能，应该限制要连接的表的数量（最好不要超过三个表）
- 最后，连接条件或连接谓词。连接条件出现在 `INNER JOIN` 子句的 `ON` 关键字之后，连接条件时将主标中的行与其他表中的行进行匹配的规则

语法：

```sql
SELECT
  <column_name>
FROM
  <table_1>
    INNER JOIN <table_2> ON <join_condition_1>
    INNER JOIN <table_3> ON <join_condition_2>
WHERE
  <where_condition>
```

示例：

```sql
SELECT
  product_code,
  product_name,
  text_description
FROM
  products AS t1
    INNER JOIN roductlines AS t2 ON t1.productline = t2.productline;
```

## 外部连接 LEFT JOIN

`LEFT JOIN` 子句允许您从两个或多个数据库表查询数据。`LEFT JOIN` 子句是 `SELECT` 语句的可选部分，出现在 `FROM` 子句之后。

语法：

```sql
SELECT
  t1.c1,
  t1.c2,
  t2.c1,
  t2.c2
FROM
  t1
    LEFT JOIN
  t2 ON t1.c1 = t2.c2;
```

当使用 `LEFT JOIN` 子句将 `t1` 表加入 `t2` 表时，如果来自左表 `t1` 的行与基于连接条件（`t1.c1 = t2.c1`）的右表 `t2` 匹配，则该行将包含在结果集中。

如果左表中的行与右表中的行不匹配，则还将选择左表中的行与右表中的“假”行组合。“假”行对于 `SELECT` 子句中的所有相应列都包含 `NULL` 值。

换句话说，`LEFT JOIN` 子句允许您从匹配的左右表中查询选择行记录，连接左表（`t1`）中的所有行，即使在右表（`t2`）中找不到匹配的行也显示出来，但使用 `NULL` 值代替。

表：depart

| id  | title |
| :-- | :---- |
| 1   | 开发  |
| 2   | 运营  |
| 3   | 销售  |

表：info

| id  | name  | email           | age | depart_id |
| :-- | :---- | :-------------- | :-- | :-------- |
| 1   | Ben   | ben@gmail.com   | 19  | 1         |
| 2   | Ami   | ami@gmail.com   | 49  | 1         |
| 3   | Tony  | tony@gamil.com  | 9   | 2         |
| 4   | Katty | katty@gamil.com | 29  | 1         |
| 5   | Tom   | tom@gamil.com   | 69  | 3         |
| 6   | Wendy | wendy@gamil.com | 39  | 1         |
| 7   | Paul  | paul@gamil.com  | 18  | 1         |

把所有用户信息和部门名称展示出来：

```sql
SELECT
  info.id,
  info.name,
  info.email,
  depart.title
FROM
  info
LEFT OUTER JOIN
  depart ON info.depart_id = depart.id
```

需要明确区分主表和从表，主表的数据一定会展示出来，即便从表中没有与之对应的数据，会默认填充 NULL。

## 交叉连接 CROSS JOIN

## 自连接

使用别名将表连接到自身，并使用其他类型的连接（如 `INNER JOIN` 或 `LEFT JOIN`）连接同一表中的行记录。
