---
nav:
  title: SQL
  order: 2
group:
  title: 基础语法
  order: 2
title: 聚合函数
order: 15
---

# 聚合函数

聚合函数（aggregation function）是以值的一个集合（集或多重集）为输入、返回单个值的函数。

- 确定表中行数
- 获得表中某些行的和
- 找出表列（或所有行或某些特定的行）的最大值、最小值、平均值

| 函数      | 说明             |
| :-------- | :--------------- |
| `AVG()`   | 返回某列的平均值 |
| `COUNT()` | 返回某列的行数   |
| `MAX()`   | 返回某列的最大值 |
| `MIN()`   | 返回某列的最小值 |
| `SUM()`   | 返回某列值之和   |

> 注意：
>
> 1. `SUM` 和 `AVG` 的输入必须是数字集，但其他运算符还可作用在非数字数据类型的集合上

### AVG

🌰 示例：通过 `AVG()` 函数返回 `mock_exam` 模拟考表中所有学生数学成绩的平均分

```sql
SELECT
  AVG(maths_score) AS avg_maths
FROM
  studnets;

-- 输出
+-----------+
| avg_maths |
+-----------+
|        82 |
+-----------+
```

该查询的结果是一个具有单属性的关系，其中只包含一个元组，这个元组的数值对应模拟考学生的数学成绩。数据库系统可以给结果关系的属性一个任意名字，该属性是由聚合产生的，可以通过 `AS` 子句给属性赋予有意义的名称。

> 注意事项：
>
> 1. `AVG()` 只能用来确定特定数值列的平均值，而且列名必须作为函数参数给出。为了获得多个列的平均值，必须使用多个 `AVG()` 函数
> 2. `AVG()` 函数忽略列值为 `NULL` 的行

### COUNT

`COUNT()` 函数用于确定表中行的数目或符合特定条件的行的数目。

使用方式：

- 使用 `COUNT(*)` 对表中行的数目进行计数，不管表列中包含的是空值（`NULL`）还是非空值
- 使用 `COUNT(column)` 对特定列中具有值的行进行计数，忽略 `NULL` 值

🌰 示例：获取 `students` 表中学生的总数

```sql
SELECT
  COUNT(*) AS num_stu
FROM
  students;
```

🌰 示例：获取有电子邮件地址的学生总数

```sql
SELECT
  COUNT(email) AS num_stu
FROM
  students;
```

有些情况下在计算聚合函数前需先删除重复元组。如果我门确实想删除重复元组，可在聚合表达式中使用关键字 `DISTINCT`。

🌰 示例：找出 2010 年春季学期讲授一门课程的教师总数

```sql
SELECT
  COUNT(distinct ID)
FROM
  teaches
WHERE
  semester = 'Spring' AND year = 2010;
```

由于在 ID 前有关键字 `DISTINCT`，所以即使某位教师教了不止一门课程，在结果中他也仅被计数一次。

> 注意：
>
> 1. SQL 不允许在用 `COUNT(*)` 时使用 `DISTINCT`。在用 `MAX` 和 `MIN` 时使用 `DISTINCT` 是合法的，尽管结果无差别。我门可以使用关键字 `ALL` 替代 `DISTINCT` 来说明保留重复元组。

### MAX

`MAX()` 用于返回指定列的最大值。

🌰 示例：获取身高最高的学生身高

```sql
SELECT
  MAX(height) AS max_height
FROM
  students;
```

该函数通常用于数值或日期，如果用于字符串比较，则返回排序后的最后一行。

### MIN

`MIN()` 用于返回指定列的最小值。

🌰 示例：获取体重最轻的学生体重

```sql
SELECT
  MIN(weight) AS min_weight
FROM
  students;
```

该函数通常用于数值或日期，如果用于字符串比较，则返回排序后的第一行。

### SUM

`SUM()` 函数用于返回指定列值的和（总计）。

🌰 示例：获取班级献爱心活动中共筹款的总数

```sql
SELECT
  SUM(charity_fund) AS total_charity_fund
FROM
  studnets;
```

🌰 示例：获取班级献爱心活动中女生筹款的总数

```sql
SELECT
  SUM(charity_fund) AS total_charity_fund
FROM
  studnets
WHERE
  gender = 2;
```

### 聚集不同值

- 对所有行执行计算，指定 `ALL` 参数或不指定参数（因为 `ALL` 是默认行为）
- 只包含不同的值，指定 `DISTINCT` 参数

注意事项：

- ALL 为默认：ALL 参数不需要指定，因为它是默认行为。如果不指定 `DISTINCT`，则假定为 `ALL`
- DISTINCT 不能用于 `COUNT(*)`：如果指定列名，则 `DISTINCT` 只能用于 `COUNT()`。`DISTINCT` 不能用于 `COUNT(*)`。类似地，`DISTINCT` 必须使用列名，不能用于计算或表达式

### 组合聚集函数

🌰 示例：根据多个聚集函数统计

```sql
SELECT
  COUNT(*) AS height,
  MIN(height) AS height_min,
  MAX(height) AS height_max,
  AVG(height) AS height_avg
FROM
  students;
```

注意：

- 在指定别名以包含某个聚集函数的结果时，不应该使用表中实际的列名。虽然这样做也算合法，但许多 SQL 实现不支持，可能会产生模糊的错误消息
