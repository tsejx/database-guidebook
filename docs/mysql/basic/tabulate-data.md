---
nav:
  title: MySQL
  order: 2
group:
  title: 基础用法
  order: 3
title: 汇总数据
order: 12
---

# 汇总数据

## 聚集函数

- 确定表中行数
- 获得表中某些行的和
- 找出表列（或所有行或某些特定的行）的最大值、最小值、平均值

> 聚集函数（aggregation function）：对某些行运行的函数，计算并放回一个值

| 函数      | 说明             |
| :-------- | :--------------- |
| `AVG()`   | 返回某列的平均值 |
| `COUNT()` | 返回某列的行数   |
| `MAX()`   | 返回某列的最大值 |
| `MIN()`   | 返回某列的最小值 |
| `SUM()`   | 返回某列值之和   |

### AVG

示例：通过 `AVG()` 函数返回 `mock_exam` 模拟考表中所有学生数学成绩的平均分

```sql
SELECT AVG(maths_score) AS avg_maths FROM studnets;

-- 输出
avg_maths
-----------
82
```

示例：检索模拟考中男生的数学平均分

```sql
SELECT AVG(maths_score) AS avg_maths FROM students WHERE gender = 1;
```

注意事项：

- `AVG()` 只能用来确定特定数值列的平均值，而且列名必须作为函数参数给出。为了获得多个列的平均值，必须使用多个 `AVG()` 函数
- `AVG()` 函数忽略列值为 `NULL` 的行

### COUNT

`COUNT()` 函数用于确定表中行的数目或符合特定条件的行的数目。

使用方式：

- 使用 `COUNT(*)` 对表中行的数目进行计数，不管表列中包含的是空值（`NULL`）还是非空值
- 使用 `COUNT(column)` 对特定列中具有值的行进行计数，忽略 `NULL` 值

🌰 示例：获取 `students` 表中学生的总数

```sql
SELECT COUNT(*) AS num_stu FROM students;
```

🌰 示例：获取有电子邮件地址的学生总数

```sql
SELECT COUNT(email) AS num_stu FROM students;
```

### MAX

`MAX()` 用于返回指定列的最大值。

示例：获取身高最高的学生身高

```sql
SELECT MAX(height) AS max_height FROM students;
```

该函数通常用于数值或日期，如果用于字符串比较，则返回排序后的最后一行。

### MIN

`MIN()` 用于返回指定列的最小值。

示例：获取体重最轻的学生体重

```sql
SELECT MIN(weight) AS min_weight FROM students;
```

该函数通常用于数值或日期，如果用于字符串比较，则返回排序后的第一行。

### SUM

`SUM()` 函数用于返回指定列值的和（总计）。

示例：获取班级献爱心活动中共筹款的总数

```sql
SELECT SUM(charity_fund) AS total_charity_fund FROM studnets;
```

示例：获取班级献爱心活动中女生筹款的总数

```sql
SELECT SUM(charity_fund) AS total_charity_fund FROM studnets WHERE gender = 2;
```

## 聚集不同值

- 对所有行执行计算，指定 `ALL` 参数或不指定参数（因为 `ALL` 是默认行为）
- 只包含不同的值，指定 `DISTINCT` 参数

注意事项：

- ALL 为默认：ALL 参数不需要指定，因为它是默认行为。如果不指定 `DISTINCT`，则假定为 `ALL`
- DISTINCT 不能用于 `COUNT(*)`：如果指定列名，则 `DISTINCT` 只能用于 `COUNT()`。`DISTINCT` 不能用于 `COUNT(*)`。类似地，`DISTINCT` 必须使用列名，不能用于计算或表达式

## 组合聚集函数

示例：根据多个聚集函数统计

```sql
SELECT COUNT(*) AS height,
       MIN(height) AS height_min,
       MAX(height) AS height_max,
       AVG(height) AS height_avg
FROM students;
```

注意：

- 在指定别名以包含某个聚集函数的结果时，不应该使用表中实际的列名。虽然这样做也算合法，但许多 SQL 实现不支持，可能会产生模糊的错误消息
