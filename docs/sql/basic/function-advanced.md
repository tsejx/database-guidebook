---
nav:
  title: SQL
  order: 2
group:
  title: 基础语法
  order: 3
title: 其他函数
order: 13
---

# 其他函数

## BIN

返回指定值的二进制编码。

语法：

```sql
BIN(x)
```

🌰 示例：

```sql
SELECT BIN(15);

-- 输出结果
+---------+
| bin(15) |
+---------+
| 1111    |
+---------+
```

## BINARY

将字符串转换为二进制字符串。

语法：

```sql
BINARY(s);
```

🌰 示例：

```sql
SELECT BINARY("World");

-- 输出结果
+----------------------------------+
| BINARY("World")                  |
+----------------------------------+
| 0x576F726C64                     |
+----------------------------------+
```

## CASE

`CASE` 表示函数开始，`END` 表示函数结束。如果 `condition1` 成立，则返回 `result1`，如果 `condition2` 成立，则返回 `result2`，当全部不成立则返回 `result`，而当有一个成立之后，后面的就不执行了。

语法：

```sql
CASE expression
  WHEN condition1 THEN result1
  WHEN condition2 THEN result2
  ...
  WHEN conditionN THEN resultN
  ELSE result
END
```

🌰 示例：

```sql

-- 输出结果

```

## CAST

转换数据类型。

语法：

```sql
CAST(x as type);
```

🌰 示例：字符串日期转换为日期

```sql
SELECT CAST("2023-04-05" AS DATE)

-- 输出结果
+----------------------------+
| CAST("2023-04-05" AS DATE) |
+----------------------------+
| 2023-04-05                 |
+----------------------------+
```

`CAST` 函数在转换数据类型的时候，不会四舍五入，如果原数值有小数，那么转换为整数类型的时候就会报错。不过你可以指定转化的小数类型。

## COALESCE

返回参数中第一个非空表达式（从左往右）。

语法：

```sql
COALESCE(expr1, expr2, ..., exprN);
```

🌰 示例：

```sql
SELECT COALESCE(NULL, NULL, NULL, 'google.com', NULL, 'baidu.com');

-- 输出结果
+--------------------------------------------------------------+
| COALESCE(NULL, NULL, NULL, 'google.com', NULL, 'baidu.com') |
+--------------------------------------------------------------+
| google.com                                                   |
+--------------------------------------------------------------+
```

## CONNECTION_ID

返回唯一的连接 ID。

语法：

```sql
CONNECTION_ID()
```

🌰 示例：

```sql
SELECT CONNECTION_ID();

-- 输出结果
+-----------------+
| CINNECTION_ID() |
+-----------------+
|               8 |
+-----------------+
```

## CONV

指定数值和进制并进行进制转换。

语法：

```sql
CONV(x, f1, f2);
```

🌰 示例：

```sql
SELECT CONV(15, 10, 2);

-- 输出结果
+-----------------+
| CONV(15, 10, 2) |
+-----------------+
| 1111            |
+-----------------+
```

## CONVERT

用于获取一个类型的值，并产生另一个类型的值。

语法：

```sql
CONVERT(value, type);
```

参数 `type`：

- DATE
- DATETIME
- DECIMAL
- TIME
- CHAR
- NCHAR
- SIGNED
- UNSIGNED
- BINARY

🌰 示例：

```sql
SELECT CONVERT('23', SIGNED);

-- 输出结果
+-----------------------+
| CONVERT('23', SIGNED) |
+-----------------------+
|                    23 |
+-----------------------+
```

## CURRENT_USER

返回当前用户。

语法：

```sql
CURRENT_USER();
```

🌰 示例：

```sql
SELECT CURRENT_USER();

-- 输出结果
+----------------+
| CURRENT_USER() |
+----------------+
| root@localhost |
+----------------+
```

## DATABASE

返回数据库名。

语法：

```sql
DATABASE();
```

🌰 示例：

```sql
SELECT CURRENT_USER();

-- 输出结果
+------------+
| DATABASE() |
+------------+
| NULL       |
+------------+
```

## IF

如果表达式成立，则返回第一个参数，否则返回第二个参数。

语法：

```sql
IF(condition, value_if_true, value_if_false);
```

🌰 示例：

```sql
SELECT
  order_id,
  quantity,
  IF(quantity > 10, 'MORE', 'LESS') AS desc
FROM
  order_details;

-- 输出结果
+------------+------------+------------+
|  order_id  |  quantity  |   desc     |
+------------+------------+------------+
| 10248      |  12        ｜ MORE      ｜
| 10248      |  10        ｜ LESS      ｜
| 10248      |  5         ｜ LESS      ｜
| 10249      |  9         ｜ LESS      ｜
| 10249      |  40        ｜ MORE      ｜
| 10249      |  10        ｜ LESS      ｜
| 10248      |  35        ｜ MORE      ｜
| 10248      |  15        ｜ MORE      ｜
+------------+------------+------------+
```

## IFNULL

用于判断第一个表达式是否为 NULL，如果为 NULL 则返回第二个参数的值，如果不为 NULL 则返回第一个参数的值。

语法：

```sql
INFULL(expression, alt_value)
```

如果第一个参数的表达式 `expression` 为 NULL，则返回第二个参数的备用值。

🌰 示例：

```sql
 SELECT IFNULL(NULL, 'HELLO_WORLD');

-- 输出结果
+-----------------------------+
| IFNULL(NULL, 'HELLO_WORLD') |
+-----------------------------+
| HELLO_WORLD                 |
+-----------------------------+
```

## ISNULL

用于测试指定值是否为 NULL，是则返回 `1`，否则返回 `0`。

语法：

```sql
ISNULL(expression);
```

🌰 示例：

```sql
SELECT ISNULL(350);

-- 输出结果
+-------------+
| ISNULL(350) |
+-------------+
|           0 |
+-------------+
```

## LAST_INSERT_ID

用于获取自动增长列尾最后一次插入生成的值。

语法：

```sql
LAST_INSERT_ID(expression);
```

🌰 示例：

```sql
SELECT LAST_INSERT_ID();

-- 输出结果
+------------------+
| LAST_INSERT_ID() |
+------------------+
|                0 |
+------------------+
```

## NULLIF

根据两个参数是否相等决定返回 NULL 还是第一个参数。

语法：

```sql
NULLIF(expr1, expr2);
```

🌰 示例：

```sql
SELECT
  NULLIF(1, 1),
  NULLIF(1, 2);

-- 输出结果
+--------------+--------------+
| NULLIF(1, 1) | NULLIF(1, 2) |
+--------------+--------------+
|         NULL |            1 |
+--------------+--------------+
```

`NULLIF()` 相当于 `CASE WHEN expr1 = expr2 THEN NULL ELSE expr1 END`。

```sql
SELECT
  CASE WHEN 1 = 1 THEN NULL ELSE 1 END,
  CASE WHEN 1 = 2 THEN NULL ELSE 1 END;

-- 输出结果
+--------------------------------------+--------------------------------------+
| CASE WHEN 1 = 1 THEN NULL ELSE 1 END | CASE WHEN 1 = 2 THEN NULL ELSE 1 END |
+--------------------------------------+--------------------------------------+
|                                 NULL |                                    1 |
+--------------------------------------+--------------------------------------+
```

## SESSION_USER

用于返回当前的 MySQL 账户的用户名和主机名。

`SESSION_USER()` 函数等同于 `USER()` 和 `SYSTEM_USER()`。

语法：

```sql
SESSION_USER()
```

🌰 示例：

```sql
SELECT SESSION_USER();

-- 输出结果
+--------------------+
| SESSION_USER()     |
+--------------------+
| root@192.168.0.204 |
+--------------------+
```

## SYSTEM_USER

用于获取当前 MySQL 账户的用户名和主机名。

`SYSTEM_USER()` 函数等同于 `USER()` 和 `SESSION_USER()`。

语法：

```sql
SYSTEM_USER()
```

🌰 示例：

```sql
SELECT SYSTEM_USER();

-- 输出结果
+--------------------+
| SYSTEM_USER()      |
+--------------------+
| root@192.168.0.204 |
+--------------------+
```

## USER

用于获取当前 MySQL 账户的用户名和主机名。

`SYSTEM_USER()` 函数等同于 `USER()` 和 `SESSION_USER()`。

语法：

```sql
USER()
```

🌰 示例：

```sql
SELECT USER();

-- 输出结果
+--------------------+
| USER()             |
+--------------------+
| root@192.168.0.204 |
+--------------------+
```

## VERSION

以字符串形式返回 MySQL 服务器的版本。

语法：

```sql
VERSION()
```

🌰 示例：

```sql
SELECT VERSION();

-- 输出结果
+--------------------+
| VERSION()          |
+--------------------+
| 8.0.21             |
+--------------------+
```
