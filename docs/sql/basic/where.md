---
nav:
  title: SQL
  order: 2
group:
  title: 基础语法
  order: 2
title: 过滤数据
order: 8
---

# 过滤数据

数据库表一般包含大量的数据，很少需要检索表中的所有行。通常只会根据特定操作或报告的需要提取表数据的子集。只检索所需数据需要指定 **搜索条件**（search criteria），搜索条件也称为 **过滤条件**（filter condition）。

## WHERE 子句

在 `SELECT` 语句中，数据根据 `WHERE` 子句中指定的搜索条件进行过滤。

`WHERE` 子句在表名（`FROM` 子句）之后给出。

语法：

```sql
SELECT
  <column_name1>,
  <column_name2>,
  ...
FROM
  <table_name>
WHERE
  <column_name> = <filed_value>;
```

示例：

```sql
SELECT
  name,
  age
FROM
  students
WHERE
  age = 19;

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

## 比较运算符

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

### 检索单个值

语法：

```sql
SELECT <column_name1>, <column_name2>, ... FROM <table_name> WHERE <filed_statement>;
```

示例：检索出 `students` 表中年龄小于 20 的学生信息

```sql
SELECT name, age FROM students WHERE age < 20;
a
-- 输出
name        age
------      --------
Irene       19
Tony        19
Wolf        18
Amy         16
Tom         15
```

### 不匹配检索

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

### 范围值检索 BETWEEN

使用操作符 `BETWEEN` 可以用于检索某个范围的值。

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

### 空值检索 IS NULL

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

## 逻辑运算符

当 `WHERE` 语句中存在多个条件语句，可以使用逻辑运算符。

### AND 操作符

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

### OR 操作符

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

### 逻辑运算符优先级

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

### IN 操作符

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

### NOT 操作符

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

## 通配运算符 LIKE

以上为对已知值的条件过滤，还有一种情况是我们要检索文本中包含某个词的所有数据，这就需要使用通配符。通配符就是我们用来匹配值的一部分的特殊字符。这里我们需要使用到 `LIKE` 操作符。

### 百分号通配符

百分号（`%`）通配符**表示任何子字符出现的任意次数**。

语法：

```sql
SELECT
  <column_name1>,
  <column_name2>,
  ...
FROM
  <table_name>
WHERE
  <column_name>
LIKE
  "<pattern_words>%";
```

示例：找出 `students` 表中名字中以 `T` 开头的学生

```sql
SELECT * FROM students WHERE name LIKE "T%";
```

示例：找出 `students` 表中名字以既包含 `a` 也包含 `n` 的学生

```sql
SELECT * FROM students WHERE name LIKE "%a%" AND name LIKE "%n%";
```

### 下划线通配符

下划线（`_`）通配符的用途与百分号（`%`）一样，但它**只匹配单个字符，而不是多个字符**。

示例：查找班级中名字第二个字符为 `u` 的人

```sql
SELECT * FROM students WHERE name LIKE "_u%";
```

示例：查找班级中名字是三个字符的人

```sql
SELECT * FROM students WHERE name LIKE "___";
```

### 方括号通配符

方括号（`[]`）通配符表示括号内所列字符中的一个（类似与正则表达式）。

示例：找出所有名字以 `A` 或 `T` 开头的学生

```sql
SELECT * FROM students WHERE name LIKE '[AT]%';
```

`[AT]` 匹配方括号中任意一个字符，它也只能匹配单个字符。因此，任何多于一个字符的名字都不匹配。`[AT]` 之后的 `%` 通配符匹配第一个字符之后的任意数目的字符，返回所需结果。

此通配符可以用前缀字符脱字号（`^`）来否定。

示例：检索匹配以 `A` 和 `T` 之外的任意字符开头的任意名称

```sql
SELECT * FROM students WHERE name LIKE '[^AT]%';
```

### 使用通配符的技巧

通配符搜索一般比前面讨论的其他搜索要耗费更长的处理时间。

注意事项：

- 不要过度使用通配符。如果其他操作符能达到相同的目的，应该使用其他操作符。
- 在确实需要使用通配符时，也尽量不要把它们用在搜索模式的开始处。把通配符置于开始处，搜索起来时最慢的。
- 仔细注意通配符的位置。如果放错地方，可能不会返回想要的数据。
