---
nav:
  title: MySQL
  order: 2
group:
  title: 基础用法
  order: 3
title: 分组数据
order: 13
---

# 分组数据

## 创建分组

语法：

```sql
SELECT <column_name>, function(<column_name>)
FROM <table_name>
GROUP BY <column_name>;
```

示例：统计不同籍贯的学生数量

```sql
SELECT native_place, COUNT(*) AS num_stus FROM students GROUP BY native_place;

-- 输出
native_place  num_stus
------------  ----------
GUANGZHOU     4
GUANGXI       2
BEIJING       1
HUNAN         2
```

以上 `SELECT` 语句指定了两个列：`native_place` 学生的籍贯，`num_stus` 为计算字段（用 `COUNT(*)` 函数建立）。

因为使用了 `GROUP BY`，就不必指定要计算和估值的每个组了。系统会自动完成。`GROUP BY` 子句指示了 DBMS 分组数据，然后对每个组而不是整个结果集进行聚集。

## 过滤分组

`HAVING` 子句用于过滤分组（与 `WHERE` 子句的差别在于 `WHERE` 用于过滤行）。

```sql
SELECT student_id, COUNT(*) AS maths_score FROM students GROUP BY student_id HAVING COUNT(*) <= 80;
```

这条 `SELECT` 语句新增了 `HAVING` 子句，它过滤了 `COUNT(*) <= 80`（数学分数低于 80 分）的那些分组。

在这里，`WHERE` 子句在这里不起作用，因为过滤是基于分组聚集值，而不是特定行的值。

## 分组和排序

| ORDER BY                                     | GROUP BY                                                 |
| :------------------------------------------- | :------------------------------------------------------- |
| 对产生的输出排序                             | 对行分组，但输出可能不是分组的顺序                       |
| 任意列都可以使用（甚至非选择的列也可以使用） | 只可能使用选择列或表达式列，而且必须使用每个选择列表达式 |
| 不一定需要                                   | 如果与聚集函数一起使用列（或表达式），则必须使用         |

在使用 `GROUP BY` 子句时，应该也给出 `ORDER BY` 子句。这是保证数据正确排序的唯一方法。千万不要仅依赖 `GROUP BY` 排序数据。

示例：检索包含三个或更多物品的订单号和订购物品的数量

```sql
SELECT order_num, COUNT(*) AS items 
FROM OrderItems 
GROUP BY order_num 
HAVING COUNT(*) >= 3;

-- 输出
order_num items 
--------- ----- 
20006     3 
20007     5 
20008     5 
20009     3
```

要按订购物品的数目排序输出，需要添加 `ORDER BY` 子句。

```sql
SELECT order_num, COUNT(*) AS items
FROM OrderItems
GROUP BY order_num
HAVING COUNT(*) >= 3
ORDER BY items, order_num;
order_num items 
--------- ----- 
20006     3 
20009     3
20007     5 
20008     5 
```

在这个例子中，使用 `GROUP BY` 子句按订单号（`order_num` 列）分组数据，以便 `COUNT(*)` 函数能够返回每个订单中的物品数目。`HAVING` 子句过滤数据，使得只返回包含三个或更多物品的订单。最后，用 `ORDER BY` 子句排序输出。

## SELECT 子句顺序

`SELECT` 子句及其顺序

| 子句       | 说明               | 是否必须使用           |
| :--------- | :----------------- | :--------------------- |
| `SELECT`   | 要返回的列或表达式 | 是                     |
| `FROM`     | 从中检索数据的表   | 仅在从表选择数据时使用 |
| `WHERE`    | 行级过滤           | 否                     |
| `GROUP BY` | 分组说明           | 仅在按组计算聚集时使用 |
| `HAVING`   | 组级过滤           | 否                     |
| `ORDER BY` | 输出排序顺序       | 否                     |
