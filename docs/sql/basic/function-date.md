---
nav:
  title: SQL
  order: 2
group:
  title: 基础语法
  order: 3
title: 日期函数
order: 12
---

# 日期函数

需要注意，DATE 日期格式必须是 yyyy-mm-dd 的形式。如果要进行日期比较，就要使用 DATE 函数，不要直接使用日期与字符串进行比较。

| 函数                                                  | 说明                                         |
| :---------------------------------------------------- | :------------------------------------------- |
| `ADDDATE(d, n)`                                       | 计算指定起始日期加上指定天数的日期           |
| `ADDTIME(t, n)`                                       | 计算指定起始时间加上指定秒数的时间           |
| `CURDATE()`                                           | 返回当前日期                                 |
| `CURRENT_DATE()`                                      | 返回当前日期                                 |
| `CURRENT_TIME()`                                      | 返回当前时间                                 |
| `CURRENT_TIMESTAMP()`                                 | 返回当前日期和时间                           |
| `CURTIME()`                                           | 返回当前时间                                 |
| `DATE()`                                              | 从日期或日期时间表达式中提取日期值           |
| `DATEDIFF(d1, d2)`                                    | 计算两个日期之间相隔的天数                   |
| `DATE_ADD(d, INTERVAL expr type)`                     | 计算起始日期加上一个时间段的日期             |
| `DATE_FORMAT(d, f)`                                   | 按照指定格式格式化日期                       |
| `DATE_SUB(date, INTERVALexpr type)`                   | 计算指定日期减去指定时间的间隔               |
| `DAY(d)`                                              | 返回指定日期中日期（day）的部分              |
| `DAYNAME(d)`                                          | 返回指定日期是星期几                         |
| `DAYOFMONTH(d)`                                       | 计算指定日期是本月第几天                     |
| `DAYOFWEEK(d)`                                        | 计算指定日期是本周星期几                     |
| `DAYOFYEAR(d)`                                        | 计算指定日期是本年第几天                     |
| `EXTRACT(type FROM d)`                                | 从指定日期中获取指定部位的值                 |
| `FROM_DAY(n)`                                         | 计算从 0000 年 1 月 1 日开始后指定天数的日期 |
| `HOUR(t)`                                             | 返回时间表达式中的小时值                     |
| `LAST_DAY(d)`                                         | 返回指定日期的那一月份的最后一天             |
| `LOCALTIME()`                                         | 返回当前日期和时间                           |
| `LOCALTIMESTAMP()`                                    | 返回当前日期和时间                           |
| `MAKEDATE(year, day-of-year)`                         | 计算指定年份和天数的日期                     |
| `MAKETIME(hour, minute, second)`                      | 返回指定时分秒组合而成的时间值               |
| `MICROSECOND(date)`                                   | 返回日期参数所对应的微秒数                   |
| `MINUTE(t)`                                           | 返回时间表达式中的分钟值                     |
| `MONTHNAME(d)`                                        | 返回日期当中的月份名称                       |
| `MONTH(d)`                                            | 返回日期中的月份值                           |
| `NOW()`                                               | 返回当前日期和时间                           |
| `PERIOD_ADD(period, number)`                          | 返回两个时段之间分月份差值                   |
| `QUARTER(d)`                                          | 返回指定日期是本年度的第几季节               |
| `SECOND(t)`                                           | 返回时间表达式中的秒钟值                     |
| `SEC_TO_TIME(s)`                                      | 将以秒为单位的时间转换为时分秒的格式         |
| `STR_TO_DATE(string, format_mask)`                    | 将字符串转变为日期                           |
| `SUBDATE(d, n)`                                       | 计算指定日期减去指定天数的日期               |
| `SUBTIME(t, n)`                                       | 计算指定时间减去指定秒数的时间               |
| `SYSDATE()`                                           | 返回当前日期和时间                           |
| `TIME(expression)`                                    | 提取传入表达式中的时间部分                   |
| `TIME_DORMAT(t, f)`                                   | 按表达式的要求显示时间                       |
| `TIME_TO_SEC(t)`                                      | 将时间表达式转换为秒                         |
| `TIMEDIFF(time1, time2)`                              | 计算两个时间表达式之间的差值                 |
| `TIMESTAMP(expression, interval)`                     | 返回日期或日期时间表达式                     |
| `TIMESTAMPDIFF(unit, datetime_expr1, datetime_expr2)` | 计算两个日期时间的时间差（可指定差的维度）   |
| `TO_DAYS(d)`                                          | 计算指定日期距离初始年份的天数               |
| `WEEK(d)`                                             | 计算指定日期是本年度的第几个星期             |
| `WEEKDAY(d)`                                          | 计算指定日期是星期几                         |
| `WEEKOFYEAR(d)`                                       | 计算指定日期是本年的第几个星期               |
| `YEAR(d)`                                             | 返回年份                                     |
| `YEARWEEK(date, mode)`                                | 返回年份及第几周                             |

## 日期和时间格式

| 格式符       | 格式说明                                                        |
| :----------- | :-------------------------------------------------------------- |
| `%S` 和 `%s` | 两位数字形式的秒（00, 01, ..., 59）                             |
| `%i`         | 两位数字形式的分                                                |
| `%H`         | 两位数字形式的小时，24 小时                                     |
| `%h` 和 `%I` | 两位数字形式的小时，12 小时                                     |
| `%k`         | 数字形式的小时，24 小时                                         |
| `%l`         | 数字形式的小时，12 小时                                         |
| `%T`         | 24 小时的时间形式（hh:mm:ss）                                   |
| `%r`         | 12 小时的时间形式（hh:mm:ssAM 或 hh:mm:ssPM）                   |
| `%p`         | AM 或 PM                                                        |
| `%W`         | 一周中每一天的名称（Sunday, Monday, ..., Saturday）             |
| `%a`         | 一周中每一天名称的缩写（Sun, Mon, ..., Sat）                    |
| `%d`         | 两位数字表示月中的天数（00, 01, ..., 31）                       |
| `%e`         | 数字形式表示月中的天数（1, 2, ..., 31）                         |
| `%D`         | 英文后缀表示月中的天数（1st, 2nd, 3rd）                         |
| `%w`         | 以数字形式表示周中的天数（0=Sunday, 1=Monday, ..., 6=Saturday） |
| `%j`         | 以 3 位数字表示年中的天数（001, 002, ..., 366）                 |
| `%U`         | 周（0, 1, ..., 52），其中 Sunday 为周中的第一天                 |
| `%u`         | 周（0, 1, ..., 52），其中 Monday 为周中的第一天                 |
| `%M`         | 月名（January, February, ..., December）                        |
| `%b`         | 缩写的月名（January, February, ..., December）                  |
| `%m`         | 两位数字表示的月份（01, 02, ..., 12）                           |
| `%c`         | 数字表示的月份（1, 2, ..., 12）                                 |
| `%Y`         | 4 位数字表示的年份                                              |
| `%y`         | 两位数字表示的年份                                              |
| `%%`         | 直接值 “%”                                                      |

## ADDDATE

计算起始日期 `d` 加上 `n` 天的日期。

语法：

```sql
ADDDATE(d, n)
```

🌰 示例：

```sql
SELECT
  ADDDATE('2023-02-14', INTERVAL 10 DAY);

-- 输出结果
+----------------------------------------+
| ADDDATE('2023-02-14', interval 10 day) |
+----------------------------------------+
| 2023-02-24                             |
+----------------------------------------+
```

## ADDTIME

计算起始日期时间 `t` 加上时间表达式 `n` 的时间。

语法：

```sql
ADDTIME(t, n)
```

🌰 示例：

```sql
SELECT
  ADDTIME('2023-02-14 12:00:00', 10);

-- 输出结果
+------------------------------------+
| ADDTIME('2023-02-14 12:00:00', 10) |
+------------------------------------+
| 2023-02-14 12:00:10                |
+------------------------------------+
```

## CURDATE

返回当前日期。

语法：

```sql
CURATE()
```

🌰 示例：

```sql
SELECT
  CURATE();

-- 输出结果
+------------+
| CURATE()   |
+------------+
| 2023-03-25 |
+------------+
```

## CURRENT_DATE

返回当前日期。

语法：

```sql
CURRENT_DATE()
```

🌰 示例：

```sql
SELECT
  CURRENT_DATE();

-- 输出结果
+----------------+
| CURRENT_DATE() |
+----------------+
| 2023-03-25     |
+----------------+
```

## CURRENT_TIME

返回当前时间。

语法：

```sql
CURRENT_TIME()
```

🌰 示例：

```sql
SELECT
  CURRENT_TIME();

-- 输出结果
+----------------+
| CURRENT_TIME() |
+----------------+
| 19:28:53       |
+----------------+
```

## CURRENT_TIMESTAMP

返回当前日期和时间。

语法：

```sql
CURRENT_TIMESTAMP()
```

🌰 示例：

```sql
SELECT
  CURRENT_TIMESTAMP();

-- 输出结果
+---------------------+
| CURRENT_TIMESTAMP() |
+---------------------+
| 2023-03-25 19:29:38 |
+---------------------+
```

## CURTIME

返回当前时间。

语法：

```sql
CURTIME()
```

🌰 示例：

```sql
SELECT
  CURTIME();

-- 输出结果
+-----------+
| CURTIME() |
+-----------+
| 19:53:07  |
+-----------+
```

## DATE

从日期或日期时间表达式中提取日期值。

语法：

```sql
DATE()
```

🌰 示例：

```sql
SELECT
  DATE('2023-02-14');

-- 输出结果
+--------------------+
| DATE('2023-02-14') |
+--------------------+
| 2023-02-14         |
+--------------------+
```

## DATEDIFF

计算日期 `d1 -> d2` 之间相隔的天数。

语法：

```sql
DATEDIFF(d1, d2)
```

🌰 示例：

```sql
SELECT
  DATEDIFF('2023-02-14', '2023-02-28');

-- 输出结果
+--------------------------------------+
| datediff('2023-02-14', '2023-02-28') |
+--------------------------------------+
|                                  -14 |
+--------------------------------------+
```

## DATE_ADD

计算起始日期 `d` 加上一个时间段后的日期。

语法：

```sql
DATE_ADD(d, INTERVAL expr type);
```

参数 `type` 的值：

- MICROSECOND
- SECOND
- MINUTE
- HOUR
- DAY
- WEEK
- MONTH
- QUARTER
- YEAR
- SECOND_MICROSECOND
- MINUTE_MISCROSECOND
- MINUTE_SECOND
- HOUR_SECOND
- HOUR_MINUTE
- DAY_MICROSECOND
- DAY_SECOND
- DAY_MINUTE
- DAY_HOUR
- YEAR_MONTH

🌰 示例：

```sql
SELECT
  DATE_ADD('2023-02-14', INTERVAL 10 DAY);

-- 输出结果
+-----------------------------------------+
| DATE_ADD('2023-02-14', INTERVAL 10 DAY) |
+-----------------------------------------+
| 2023-02-24                              |
+-----------------------------------------+
```

```sql
SELECT
  DATE_ADD('2023-02-14 10:20:30', INTERVAL 15 MINUTE);

-- 输出结果
+-----------------------------------------------------+
| DATE_ADD('2023-02-14 10:20:30', INTERVAL 15 MINUTE) |
+-----------------------------------------------------+
| 2023-02-14 10:35:30                                 |
+-----------------------------------------------------+
```

```sql
SELECT
  DATE_ADD('2023-02-14 10:20:30', INTERVAL -3 HOUR);

-- 输出结果
+---------------------------------------------------+
| DATE_ADD('2023-02-14 10:20:30', INTERVAL -3 HOUR) |
+---------------------------------------------------+
| 2023-02-14 07:20:30                               |
+---------------------------------------------------+
```

```sql
SELECT
  DATE_ADD('2023-02-14 10:20:30', INTERVAL -3 MONTH);

-- 输出结果
+----------------------------------------------------+
| DATE_ADD('2023-02-14 10:20:30', INTERVAL -3 MONTH) |
+----------------------------------------------------+
| 2022-11-14 10:20:30                                |
+----------------------------------------------------+
```

## DATE_FORMAT

按表达式 `f` 的要求显示日期 `d`。

语法：

```sql
DATE_FORMAT(d, f)
```

🌰 示例：

```sql
SELECT
  DATE_FORMAT('2023-03-01 12:50:30', '%Y-%m-%d %r');

-- 输出结果
+---------------------------------------------------+
| DATE_FORMAT('2023-03-01 12:50:30', '%Y-%m-%d %r') |
+---------------------------------------------------+
| 2023-03-01 12:50:30 PM                            |
+---------------------------------------------------+
```

🌰 示例：日期时间转换为时间戳

```sql
SELECT
  DATE_FORMAT("2022-01-19 19:45:20", "%Y%m%d%H%i%s");

-- 输出 20220119194520
+----------------------------------------------------+
| DATE_FORMAT("2022-01-19 19:45:20", "%Y%m%d%H%i%s") |
+----------------------------------------------------+
| 20220119194520                                     |
+----------------------------------------------------+
```

🌰 示例：日期转换字符串（必须带分隔符，常用中划线 `-` 作为日期分隔符）

```sql
SELECT
  DATE_FORMAT("2022-01-19 19:45:20", "%Y-%m-%d");
-- 输出 2022-01-19
+------------------------------------------------+
| DATE_FORMAT("2022-01-19 19:45:20", "%Y-%m-%d") |
+------------------------------------------------+
| 2022-01-19                                     |
+------------------------------------------------+
```

🌰 示例：时间转换字符串（必须带分隔符，常用冒号 `:` 作为时间分隔符）

```sql
SELECT
  DATE_FORMAT('2022-01-19 19:45:20', '%H:%i:%s');
-- 输出 19
+------------------------------------------------+
| DATE_FORMAT('2022-01-19 19:45:20', '%H:%i:%s') |
+------------------------------------------------+
| 19:45:20                                       |
+------------------------------------------------+
```

## DATE_SUB

函数从日期减去指定的时间间隔。

语法：

```sql
DATE_SUB(date, INTERVAL expr type)
```

🌰 示例：orders 表中 order_date 字段减去 2 天

```sql
SELECT
  order_id,
  DATE_SUB(order_date, INTERVAL 2 DAY) AS order_pay_day
FROM
  orders;
```

## DAY

返回日期值 `d` 的日期部分。

语法：

```sql
DAY(d)
```

🌰 示例：

```sql
SELECT
  DAY('2023-02-14');

-- 输出结果
+-------------------+
| DAY('2023-02-14') |
+-------------------+
|                14 |
+-------------------+
```

## DAYNAME

返回日期 `d` 是星期几，如 MOnday、Tuesday。

语法：

```sql
DAYNAME(d)
```

🌰 示例：

```sql
SELECT
  DAYNAME('2023-02-14');

-- 输出结果
+-----------------------+
| DAYNAME('2023-02-14') |
+-----------------------+
| Tuesday               |
+-----------------------+
```

## DAYOFMONTH

计算日期 `d` 是本月的第几天。

语法：

```sql
DAYOFMONTH(d)
```

🌰 示例：

```sql
SELECT
  DAYOFMONTH('2023-03-15 11:11:11');

-- 输出结果
+--------------------------+
| DAYOFMONTH('2023-03-15') |
+--------------------------+
|                       15 |
+--------------------------+
```

## DAYOFWEEK

计算日期 `d` 是本周的星期几，1 是星期一，2 是星期二，以此类推。

语法：

```sql
DAYOFWEEK(d)
```

🌰 示例：

```sql
SELECT
  DAYOFWEEK('2023-03-15 11:11:11');

-- 输出结果
+----------------------------------+
| DAYOFWEEK('2023-03-15 11:11:11') |
+----------------------------------+
|                                4 |
+----------------------------------+
```

## DAYOFYEAR

计算日期 `d` 时本年的第几天。

语法：

```sql
DAYOFYEAR(d)
```

🌰 示例：

```sql
SELECT
  DAYOFYEAR('2023-03-15 11:11:11');

-- 输出结果
+----------------------------------+
| DAYOFYEAR('2023-03-15 11:11:11') |
+----------------------------------+
|                               74 |
+----------------------------------+
```

## EXTRACT

从日期 `d` 中获取指定的值，`type` 指定返回的值。

参数 `type` 的值：

- MICROSECOND（毫秒）
- SECOND（秒）
- MINUTE（分）
- HOUR（时）
- DAY（日）
- WEEK（今年的第几周）
- MONTH（月）
- QUARTER（季度）
- YEAR（年份）
- SECOND_MICROSECOND（分秒级毫秒）
- MINUTE_MISCROSECOND（分钟级毫秒）
- MINUTE_SECOND（分钟级分秒）
- HOUR_SECOND（时级分秒）
- HOUR_MINUTE（时级分钟）
- DAY_MICROSECOND（日级毫秒）
- DAY_SECOND（日级分秒）
- DAY_MINUTE（日级分钟）
- DAY_HOUR（日级时）
- YEAR_MONTH（年月）

语法：

```sql
EXTRACT(type FROM d)
```

🌰 示例：

```sql
SELECT
  EXTRACT(MINUTE FROM '2023-03-15 11:11:11');

-- 输出结果
+--------------------------------------------+
| extract(minute from '2023-03-15 11:11:11') |
+--------------------------------------------+
|                                         11 |
+--------------------------------------------+
```

## FROM_DAYS

计算从 0000 年 1 月 1 日开始 `n` 天后的日期。

语法：

```sql
FROM_DAYS(n)
```

🌰 示例：

```sql
SELECT
  FROM_DAYS(999);

-- 输出结果
+----------------+
| FROM_DAYS(999) |
+----------------+
| 0002-09-26     |
+----------------+
```

## HOUR

返回 `t` 中的小时值。

语法：

```sql
HOUR(t)
```

🌰 示例：

```sql
SELECT
  HOUR('1:2:3');

-- 输出结果
+---------------+
| hour('1:2:3') |
+---------------+
|             1 |
+---------------+
```

## LAST_DAY

返回给定日期的那一月份的最后一天。

语法：

```sql
LAST_DAY(d);
```

🌰 示例：

```sql
SELECT
  LAST_DAY('2023-02-14');

-- 输出结果
+------------------------+
| LAST_DAY('2023-02-14') |
+------------------------+
| 2023-02-28             |
+------------------------+
```

## LOCALTIME

返回当前日期和时间。

语法：

```sql
LOCALTIME();
```

🌰 示例：

```sql
SELECT
  LOCALTIME();

-- 输出结果
+---------------------+
| LOCALTIME()         |
+---------------------+
| 2023-03-26 00:17:33 |
+---------------------+
```

## LOCALTIMESTAMP

返回当前日期和时间。

语法：

```sql
LOCALTIMESTAMP();
```

🌰 示例：

```sql
SELECT
  LOCALTIMESTAMP();

-- 输出结果
+---------------------+
| LOCALTIMESTAMP()    |
+---------------------+
| 2023-03-26 00:18:10 |
+---------------------+
```

## MAKEDATE

机遇给定参数年份 `year` 和所在年中的天数序号 day-of-year 返回一个日期

语法：

```sql
MAKEDATE(year, day-of-yer);
```

🌰 示例：

```sql
SELECT
  MAKEDATE(2023, 8);

-- 输出结果
+-------------------+
| makedate(2023, 8) |
+-------------------+
| 2023-01-08        |
+-------------------+
```

## MAKETIME

组合时间，参数分别为小时、分、种、秒。

语法：

```sql
MAKETIME(hour, minute, second);
```

🌰 示例：

```sql
SELECT
  MAKETIME(15, 28, 5);

-- 输出结果
+---------------------+
| MAKETIME(15, 28, 5) |
+---------------------+
| 15:28:05            |
+---------------------+
```

## MICROSECOND

返回日期参数所对应的微秒数。

语法：

```sql
MICROSECOND(date);
```

🌰 示例：

```sql
SELECT
  MICROSECOND('2023-03-15 09:34:00.000023');

-- 输出结果
+-------------------------------------------+
| MICROSECOND('2023-03-15 09:34:00.000023') |
+-------------------------------------------+
|                                        23 |
+-------------------------------------------+
```

## MINUTE

返回 `t` 中的分钟值

语法：

```sql
MINUTE(date);
```

🌰 示例：

```sql
SELECT
  MINUTE('1:2:3');

-- 输出结果
+-----------------+
| MINUTE('1:2:3') |
+-----------------+
|               2 |
+-----------------+
```

## MONTHNAME

返回日期当中的月份名称，如 November。

语法：

```sql
MONTHNAME(date);
```

🌰 示例：

```sql
SELECT
  MONTHNAME('2023-03-15 11:11:11');

-- 输出结果
+----------------------------------+
| MONTHNAME('2023-03-15 11:11:11') |
+----------------------------------+
| March                            |
+----------------------------------+
```

## MONTH

返回指定日期中的月份值，1 到 12。

语法：

```sql
MONTH(date);
```

🌰 示例：

```sql
SELECT
  MONTH('2023-03-15 12:00:00');

-- 输出结果
+------------------------------+
| MONTH('2023-03-15 12:00:00') |
+------------------------------+
|                            3 |
+------------------------------+
```

## NOW

返回当前日期和时间。

语法：

```sql
NOW();
```

🌰 示例：

```sql
SELECT
  NOW();

-- 输出结果
+---------------------+
| NOW()               |
+---------------------+
| 2023-03-26 01:04:34 |
+---------------------+
```

## PERIOD_ADD

为年-月组合日期添加一个时段。

语法：

```sql
PERIOD_ADD(period, number);
```

🌰 示例：

```sql
SELECT
  PERIOD_ADD(202303, 5);

-- 输出结果
+-----------------------+
| PERIOD_ADD(202303, 5) |
+-----------------------+
|                202308 |
+-----------------------+
```

## PERIOD_DIFF

返回两个时段之间的月份差值。

语法：

```sql
PERIOD_DIFF(period1, period2);
```

🌰 示例：

```sql
SELECT
  PERIOD_DIFF(202303, 5);

-- 输出结果
+-----------------------------+
| PERIOD_DIFF(202303, 202308) |
+-----------------------------+
|                          -5 |
+-----------------------------+
```

## QUARTER

返回指定日期时第几季度，返回 1-4。

语法：

```sql
QUARTER(d);
```

🌰 示例：

```sql
SELECT
  QUARTER('2023-03-15 12:15:30');

-- 输出结果
+--------------------------------+
| QUARTER('2023-03-15 12:15:30') |
+--------------------------------+
|                              1 |
+--------------------------------+
```

## SECOND

返回制定时间中的秒钟值。

语法：

```sql
SECOND(d);
```

🌰 示例：

```sql
SELECT
  SECOND('2023-03-15 12:15:30');

-- 输出结果
+-------------------------------+
| SECOND('2023-03-15 12:15:30') |
+-------------------------------+
|                            30 |
+-------------------------------+
```

## SEC_TO_TIME

将以秒为单位的时间转换为时分秒的格式。

语法：

```sql
SEC_TO_TIME(s);
```

🌰 示例：

```sql
SELECT
  SEC_TO_TIME(s);

-- 输出结果
+-------------------+
| sec_to_time(9999) |
+-------------------+
| 02:46:39          |
+-------------------+
```

## STR_TO_DATE

将字符串转变为日期。

语法：

```sql
STR_TO_DATE(string, format_mask);
```

🌰 示例：

```sql
SELECT
  STR_TO_DATE("March 26 2023", "%M %d %Y");

-- 输出结果
+------------------------------------------+
| STR_TO_DATE("March 26 2023", "%M %d %Y") |
+------------------------------------------+
| 2023-03-26                               |
+------------------------------------------+
```

## SUBDATE

指定日期减去 `n` 天后的日期。

语法：

```sql
SUBDATE(d, n);
```

🌰 示例：

```sql
SELECT
  SUBDATE("2023-03-26 15:15:30"， 5);

-- 输出结果
+-----------------------------------+
| SUBDATE("2023-03-26 15:15:30", 5) |
+-----------------------------------+
| 2023-03-21 15:15:30               |
+-----------------------------------+
```

## SUBTIME

指定时间减去 `n` 秒后的时间。

语法：

```sql
SUBTIME(t, n);
```

🌰 示例：

```sql
SELECT
  SUBDATE("2023-03-26 15:15:30"， 30);

-- 输出结果
+------------------------------------+
| SUBTIME("2023-03-26 15:15:30", 59) |
+------------------------------------+
| 2023-03-26 15:14:31                |
+------------------------------------+
```

> 注意：
>
> 1. 最多减去 60 秒

## SYSDATE

返回当前日期和时间。

语法：

```sql
SYSDATE();
```

🌰 示例：

```sql
SELECT
  SYSDATE();

-- 输出结果
+---------------------+
| SYSDATE()           |
+---------------------+
| 2023-03-26 17:12:02 |
+---------------------+
```

## TIME

提取传入表达式的时间部分。

语法：

```sql
TIME(expression);
```

🌰 示例：

```sql
SELECT
  TIME("2023-03-26 20:30:15");

-- 输出结果
+-----------------------------+
| TIME("2023-03-26 20:30:15") |
+-----------------------------+
| 20:30:15                    |
+-----------------------------+
```

## TIME_FORMAT

指定时间值并通过表达式转换为对应格式的时间值。

语法：

```sql
TIME_FORMAT(t, f);
```

🌰 示例：

```sql
SELECT
  TIME_FORMAT("20:30:15", '%r');

-- 输出结果
+-------------------------------+
| TIME_FORMAT("20:30:15", '%r') |
+-------------------------------+
| 08:30:15 PM                   |
+-------------------------------+
```

## TIME_TO_SEC

将指定时间转换为秒。

语法：

```sql
TIME_TO_SEC(t);
```

🌰 示例：

```sql
SELECT
  TIME_TO_SEC("2023-03-26 20:30:15");

-- 输出结果
+------------------------------------+
| TIME_TO_SEC("2023-03-26 20:30:15") |
+------------------------------------+
|                              73815 |
+------------------------------------+
```

## TIMEDIFF

计算时间差值。

语法：

```sql
TIMEDIFF(t1, t2);
```

🌰 示例：

```sql
SELECT
  TIMEDIFF("20:30:15", "12:30:15");

-- 输出结果
+----------------------------------+
| TIMEDIFF("20:30:15", "12:30:15") |
+----------------------------------+
| 08:00:00                         |
+----------------------------------+

SELECT
  TIMEDIFF("2023-01-01 00:00:00", "2023-12-31 23:59:59");

-- 输出结果
+--------------------------------------------------------+
| TIMEDIFF("2023-01-01 00:00:00", "2023-12-31 23:59:59") |
+--------------------------------------------------------+
| -838:59:59                                             |
+--------------------------------------------------------+
```

## TIMESTAMP

单个参数时，函数返回日期或日期时间表达式。两个参数时，返回参数加和。

语法：

```sql
TIMESTAMP(expression, interval);
```

🌰 示例：

```sql
SELECT
  TIMESTAMP("2023-03-26");

-- 输出结果
+-------------------------+
| TIMESTAMP("2023-03-26") |
+-------------------------+
| 2023-03-26 00:00:00     |
+-------------------------+

SELECT
  TIMESTAMP("2023-03-26", "20:30:15");

-- 输出结果
+-------------------------------------+
| TIMESTAMP("2023-03-26", "20:30:15") |
+-------------------------------------+
| 2023-03-26 20:30:15                 |
+-------------------------------------+
```

## TIMESTAMPDIFF

计算时间差，返回 `datetime_expr2 - datetime_expr1` 的时间差。

语法：

```sql
TIMESTAMPDIFF(unit, datetime_expr1, datetime_expr2);
```

🌰 示例：

```sql
SELECT
  TIMESTAMPDIFF(DAY, "2023-03-26", "2023-03-01");

-- 输出结果
+------------------------------------------------+
| TIMESTAMPDIFF(DAY, "2023-03-26", "2023-03-01") |
+------------------------------------------------+
|                                            -25 |
+------------------------------------------------+

SELECT
  TIMESTAMPDIFF(YEAR, "2023-12-31", "2021-08-15");

-- 输出结果
+-------------------------------------------------+
| TIMESTAMPDIFF(YEAR, "2023-12-31", "2022-08-15") |
+-------------------------------------------------+
|                                              -1 |
+-------------------------------------------------+
```

## TO_DAYS

计算指定日期距离 0000 年 1 月 1 日的天数。

语法：

```sql
TO_DAYS(d);
```

🌰 示例：

```sql
SELECT
  TIMESTAMPDIFF(DAY, "2023-03-26 20:30:15");

-- 输出结果
+--------------------------------+
| TO_DAYS("2023-03-26 20:30:15") |
+--------------------------------+
|                         738970 |
+--------------------------------+
```

## WEEK

计算指定日期是本年的第几个星期，范围是 0 到 53。

语法：

```sql
WEEK(d);
```

🌰 示例：

```sql
SELECT
  WEEK("2023-03-26 20:30:15");

-- 输出结果
+-----------------------------+
| WEEK("2023-03-26 20:30:15") |
+-----------------------------+
|                          13 |
+-----------------------------+
```

## WEEKDAY

计算指定日期是星期几，0 表示星期一，1 表示星期二。

语法：

```sql
WEEKDAY(d);
```

🌰 示例：

```sql
SELECT
  WEEKDAY("2023-03-26 20:30:15");

-- 输出结果
+--------------------------------+
| WEEKDAY("2023-03-26 20:30:15") |
+--------------------------------+
|                              6 |
+--------------------------------+
```

## WEEKOFYEAR

计算指定日期是本年的第几个星期，范围是 0 到 53。

语法：

```sql
WEEKOFYEAR(d);
```

🌰 示例：

```sql
SELECT
  WEEKOFYEAR("2023-03-26 20:30:15");

-- 输出结果
+-----------------------------------+
| WEEKOFYEAR("2023-03-26 20:30:15") |
+-----------------------------------+
|                                12 |
+-----------------------------------+
```

## YEAR

返回年份。

语法：

```sql
YEAR(d);
```

🌰 示例：

```sql
SELECT
  YEAR("2023-03-26 20:30:15");

-- 输出结果
+-----------------------------+
| YEAR("2023-03-26 20:30:15") |
+-----------------------------+
|                        2023 |
+-----------------------------+
```

## YEARWEEK

返回年份及第几周（0 到 53），`mode` 中 0 表示周天，1 表示周一，以此类推。

语法：

```sql
YEARWEEK(date, mode);
```

🌰 示例：

```sql
SELECT
  YEARWEEK("2023-03-26 20:30:15");

-- 输出结果
+---------------------------------+
| YEARWEEK("2023-03-26 20:30:15") |
+---------------------------------+
|                          202313 |
+---------------------------------+
```
