---
nav:
  title: SQL
  order: 2
group:
  title: 基础语法
  order: 3
title: 算术函数
order: 10
---

# 算术函数

常用数值处理函数

| 函数                                 | 说明                                                   |
| :----------------------------------- | :----------------------------------------------------- |
| `ABS(x)`                             | 返回指定数的绝对值                                     |
| `ACOS(x)`                            | 返回指定数的反余弦值                                   |
| `ASIN(x)`                            | 返回指定数的反正弦值                                   |
| `ATAN(x)`                            | 返回指定数的反正切值                                   |
| `ATAN2(n, m)`                        | 返回指定数的反正切值                                   |
| `AVG(expression)`                    | 返回表达式的平均值                                     |
| `CEIL(x)`                            | 返回大于或等于指定数的最小整数                         |
| `CEILING(x)`                         | 返回大于或等于指定数的组小整数                         |
| `COS(x)`                             | 返回指定数的余弦值                                     |
| `COT(x)`                             | 返回指定数的余切值                                     |
| `COUNT(expression)`                  | 返回查询的记录总数                                     |
| `DEGREES(x)`                         | 将弧度转换为角度                                       |
| `n DIV m`                            | 整除                                                   |
| `EXP(x)`                             | 返回自然常数的 `x` 次方                                |
| `FLOOR(x)`                           | 返回小于或等于指定数的最大整数                         |
| `GREATEST(expr1, expr2, expr3, ...)` | 返回列表中的最大值                                     |
| `LEAST(expr1, expr2, expr3, ...)`    | 返回列表中的最小值                                     |
| `LN`                                 | 返回数字的自然对数                                     |
| `LOG(x)` 或 `LOG(base, x)`           | 返回自然对数，如果带有 base 参数，则以 base 为指定底数 |
| `LOG10(x)`                           | 返回以 10 为底数的对数                                 |
| `LOG2(x)`                            | 返回以 2 为底数的对数                                  |
| `MAX(expression)`                    | 返回查询表达式中的最大值                               |
| `MIN(expression)`                    | 返回查询表达式中的最小值。                             |
| `MOD(x, y)`                          | 返回指定两数相除后的余数                               |
| `PI()`                               | 返回圆周率                                             |
| `POW(x, y)`                          | 计算指定数的指定次方                                   |
| `POWER(x, y)`                        | 计算指定数的指定次方                                   |
| `RADIANS(x)`                         | 将角度转换为弧度                                       |
| `RAND()`                             | 返回 0 到 1 的随机数                                   |
| `ROUND(x [, y])`                     | 返回指定数最近的整数                                   |
| `SIGN(x)`                            | 返回指定数的符号                                       |
| `SIN(x)`                             | 返回指定数的正弦值                                     |
| `SQRT(x)`                            | 返回指定数的平方根                                     |
| `SUM(expression)`                    | 返回指定字段的总和                                     |
| `TAN(x)`                             | 返回指定数的正切值                                     |
| `TRUNCATE(x, y)`                     | 返回指定数保留到小数点后指定位数的值                   |

## ABS

返回指定数的绝对值。

语法：

```sql
ABS(x)
```

🌰 示例：

```sql
SELECT ABS(-1);

-- 输出结果
+---------+
| ABS(-1) |
+---------+
|       1 |
+---------+
```

## ACOS

返回指定数的反余弦值（单位为弧度），参数 `x` 为一个数值。

语法：

```sql
ACOS(x)
```

🌰 示例：

```sql
SELECT ACOS(0.25);

-- 输出结果
+-------------------+
| ACOS(0.25)        |
+-------------------+
| 1.318116071652818 |
+-------------------+
```

## ASIN

返回指定数的反正弦值（单位为弧度），参数 `x` 为一个数值。

语法：

```sql
ASIN(x)
```

🌰 示例：

```sql
SELECT ASIN(0.25);

-- 输出结果
+---------------------+
| ASIN(0.25)          |
+---------------------+
| 0.25268025514207865 |
+---------------------+
```

## ATAN

返回指定数的反正切值（单位为弧度），参数 `x` 为一个数值。

语法：

```sql
ATAN(x)
```

🌰 示例：

```sql
SELECT ATAN(0.25);

-- 输出结果
+---------------------+
| ATAN(0.25)          |
+---------------------+
| 0.24497866312686414 |
+---------------------+
```

## ATAN2

返回指定数的反正切值（单位为弧度）。

语法：

```sql
ATAN2(n, m)
```

🌰 示例：

```sql
SELECT ATAN2(-0.8, 2);

-- 输出结果
+---------------------+
| ATAN2(-0.8, 2)      |
+---------------------+
| -0.3805063771123649 |
+---------------------+
```

## AVG

返回表达式的平均值。

语法：

```sql
AVG(expression)
```

🌰 示例：

```sql
SELECT AVG(price) AS average_price FROM products;
```

## CEIL

返回大于或等于指定数的最小整数。

语法：

```sql
CEIL(x)
```

🌰 示例：

```sql
SELECT CEIL(1.5);

-- 输出结果
+-----------+
| CEIL(1.5) |
+-----------+
|         2 |
+-----------+
```

## CEILING

返回大于或等于指定数的组小整数。

语法：

```sql
CEILING(x)
```

🌰 示例：

```sql
SELECT CEILING(1.5);

-- 输出结果
+--------------+
| CEILING(1.5) |
+--------------+
|            2 |
+--------------+
```

## COS

返回指定数的余弦值。

语法：

```sql
COS(x)
```

🌰 示例：

```sql
SELECT COS(2);

-- 输出结果
+---------------------+
| COS(2)              |
+---------------------+
| -0.4161468365471424 |
+---------------------+
```

## COT

返回指定数的余切值。

语法：

```sql
COT(x)
```

🌰 示例：

```sql
SELECT COT(6);

-- 输出结果
+--------------------+
| COT(6)             |
+--------------------+
| -3.436353004180128 |
+--------------------+
```

## COUNT

返回查询的记录总数。

语法：

```sql
COUNT(expression)
```

🌰 示例：

```sql
SELECT COUNT(product_id) AS number_of_products FROM products;
```

## DEGREES

将弧度转换为角度。

语法：

```sql
DEGREES(x)
```

🌰 示例：

```sql
SELECT DEGREES(3.1415926535898);

-- 输出结果
+--------------------------+
| DEGREES(3.1415926535898) |
+--------------------------+
|        180.0000000000004 |
+--------------------------+
```

## DIV

整除。

语法：

```sql
n DIV m
```

🌰 示例：

```sql
SELECT 10 DIV 5;

-- 输出结果
+----------+
| 10 DIV 5 |
+----------+
|        2 |
+----------+
```

## EXP

返回自然常数的指定次方。

语法：

```sql
EXP(x)
```

🌰 示例：

```sql
SELECT EXP(3);

-- 输出结果
+--------------------+
| EXP(3)             |
+--------------------+
| 20.085536923187668 |
+--------------------+
```

## FLOOR

返回小于或等于指定数的最大整数。

语法：

```sql
FLOOR(x)
```

🌰 示例：

```sql
SELECT FLOOR(1.5);

-- 输出结果
+------------+
| FLOOR(1.5) |
+------------+
|          1 |
+------------+
```

## GREATEST

返回列表中的最大值。

语法：

```sql
GREATEST(expr1, expr2, expr3, ..)
```

🌰 示例：

```sql
SELECT GREATEST(3, 12, 34, 100, 25);

-- 输出结果
+------------------------------+
| GREATEST(3, 12, 34, 100, 25) |
+------------------------------+
|                          100 |
+------------------------------+
```

## LEAST

返回列表中的最小值。

语法：

```sql
LEAST(expr1, expr2, expr3, ...)
```

🌰 示例：

```sql
SELECT LEAST(3, 12, 34, 100, 25);

-- 输出结果
+------------------------------+
|    LEAST(3, 12, 34, 100, 25) |
+------------------------------+
|                            3 |
+------------------------------+
```

## LN

返回数字的自然对数。

语法：

```sql
LN(x)
```

🌰 示例：

```sql
SELECT LN(2);

-- 输出结果
+--------------------+
| LN(2)              |
+--------------------+
| 0.6931471805599453 |
+--------------------+
```

## LOG

返回自然对数，如果带有 base 参数，则以 base 为指定底数。

语法：

```sql
LOG(x)

LOG(base, x)
```

🌰 示例：

```sql
SELECT LOG(20.085536923188);

-- 输出结果
+----------------------+
| LOG(20.085536923188) |
+----------------------+
|   3.0000000000000164 |
+----------------------+

SELECT LOG(2, 4);

-- 输出结果
+-----------+
| LOG(2, 4) |
+-----------+
|         2 |
+-----------+
```

## LOG10

返回以 10 为底数的对数。

语法：

```sql
LOG10(x)
```

🌰 示例：

```sql
SELECT LOG10(100);

-- 输出结果
+------------+
| LOG10(100) |
+------------+
|          2 |
+------------+
```

## LOG2

返回以 2 为底数的对数。

语法：

```sql
LOG2(x)
```

🌰 示例：

```sql
SELECT LOG2(6);

-- 输出结果
+-------------------+
| LOG2(6)           |
+-------------------+
| 2.584962500721156 |
+-------------------+
```

## MAX

返回查询表达式中的最大值。

语法：

```sql
MAX(x)
```

🌰 示例：

```sql
SELECT MAX(price) AS largest_price FROM products;
```

## MIN

返回查询表达式中的最小值。

语法：

```sql
MIN(x)
```

🌰 示例：

```sql
SELECT MIN(price) AS min_price FROM products;
```

## MOD

返回指定两数相除后的余数

语法：

```sql
MOD(x, y)
```

🌰 示例：

```sql
SELECT MOD(5, 2);

-- 输出结果
+----------+
| MOD(5,2) |
+----------+
|        1 |
+----------+
```

## PI

返回圆周率。

语法：

```sql
PI()
```

🌰 示例：

```sql
SELECT PI();

-- 输出结果
+----------+
| PI()     |
+----------+
| 3.141593 |
+----------+
```

## POW

计算指定数的指定次方。

语法：

```sql
POW(x, y)
```

🌰 示例：

```sql
SELECT POW(2, 3);

-- 输出结果
+-----------+
| POW(2, 3) |
+-----------+
|         8 |
+-----------+
```

## POWER

计算指定数的指定次方。

语法：

```sql
POWER(x, y)
```

🌰 示例：

```sql
SELECT POWER(2, 3);

-- 输出结果
+-------------+
| POWER(2, 3) |
+-------------+
|           8 |
+-------------+
```

## RAND

返回 0 到 1 的随机数。

语法：

```sql
RAND(x, y)
```

🌰 示例：

```sql
SELECT RAND();

-- 输出结果
+---------------------+
| RAND()              |
+---------------------+
| 0.22772438938517534 |
+---------------------+
```

## ROUND

返回指定数最近的整数。

语法：

```sql
ROUND(x [, y])
```

🌰 示例：

```sql
SELECT ROUND(1.23456)

-- 输出结果
+----------------+
| ROUND(1.23456) |
+----------------+
|              1 |
+----------------+
```

## SIGN

返回指定数的符号，参数 `x` 是负数、0、正数时分别返回 -1、0、1。

语法：

```sql
SIGN(x)
```

🌰 示例：

```sql
SELECT SIGN(-999);

-- 输出结果
+------------+
| SIGN(-999) |
+------------+
|         -1 |
+------------+
```

## SIN

返回指定数的正弦值。

语法：

```sql
SIN(x)
```

🌰 示例：

```sql
SELECT SIN(30);

-- 输出结果
+---------------------+
| SIN(30)             |
+---------------------+
| -0.9880316240928618 |
+---------------------+
```

## SQRT

返回指定数的平方根。

语法：

```sql
SQRT(x)
```

🌰 示例：

```sql
SELECT SQRT(25);

-- 输出结果
+----------+
| SQRT(25) |
+----------+
|        5 |
+----------+
```

## SUM

返回指定字段的总和。

语法：

```sql
SUM(x)
```

🌰 示例：

```sql
SELECT SUM(quantity) AS total_items_ordered FROM order_details;
```

## TAN

返回指定数的正切值。

语法：

```sql
TAN(x)
```

🌰 示例：

```sql
SELECT TAN(1.75);

-- 输出结果
+-------------------+
| TAN(1.75)         |
+-------------------+
| -5.52037992250933 |
+-------------------+
```

## TRUNCATE

返回指定数保留到小数点后指定位数的值。

语法：

```sql
TRUNCATE(x, y)
```

🌰 示例：

```sql
SELECT TRUNCATE(1.23456, 3);

-- 输出结果
+----------------------+
| TRUNCATE(1.23456, 3) |
+----------------------+
|                1.234 |
+----------------------+
```
