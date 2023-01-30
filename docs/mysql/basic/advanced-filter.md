---
nav:
  title: MySQL
  order: 2
group:
  title: 基础用法
  order: 3
title: 高级数据过滤
order: 8
---

# 高级数据过滤

## 组合 WHERE 子句

> 操作符（operator）：用于联结或改变 `WHERE` 子句中的子句关键字，也称为逻辑操作符（logical operator）。

### AND 操作符

操作符 `AND` 是 `WHERE` 子句中使用的关键字，用于检索满足所有给定条件的行。

语法：

```sql
SELECT <column_name1>, <column_name2>, <column_name3>, ... FROM <table_name> WHERE <column_statement1> AND <column_statement2>;
```

示例：

```sql
SELECT student_id, name, age FROM students WHERE native_place = 'GUANGZHOU' AND age <= 22;
```

此 SQL 语句检索籍贯为广州且年龄小于 22 岁的所有学生的名称和年龄。

### OR 操作符

操作符 `OR` 是 `WHERE` 子句中使用的关键字，用于检索匹配任一给定条件的行。

语法：

```sql
SELECT <column_name1>, <column_name2>, ... FROM <table_name> WHERE <column_statement1> OR <column_statement2>;
```

示例：

```sql
SELECT student_id, name, age FROM students WHERE native_place = 'GUANGZHOU' OR age = 22;
```

此 SQL 语句检索籍贯为广州或年龄等于 22 岁的所有学生的名称和年龄。

### 求值顺序

利用圆括号对操作符进行明确分组。

示例：

```sql
SELECT student_id, name, age FROM students WHERE (native_place = 'GUANGZHOU' OR native_place = 'BEIJING') AND age <= 20;
```

注意：任何时候使用具有 `AND` 和 `OR` 操作符的 `WHERE` 子句，都应该使用圆括号明确地分组操作符。不要过分依赖默认求值顺序，即使它确实如你希望的那样。使用圆括号没有什么坏处，它能消除歧义。

## IN 操作符

操作符 `IN` 能用于指定条件的范围，范围中的每个条件都可以进行匹配。`IN` 取一组由逗号分隔、括在圆括号中的合法值。

语法：

```sql
SELECT <column_name1>, <column_name2>, ... FROM <table_name> WHERE <column_name> IN (<column_value1>, <column_value2>, ...) ORDER BY <column_name>;
```

示例：

```sql
SELECT student_id, name, age FROM students WHERE native_place IN ('GUANGZHOU', 'BEIJING') ORDER BY age;

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
SELECT <column_name> FROM <table_name> WHERE NOT <column_statement> ORDER BY <column_name>;
```

示例：

```sql
SELECT name FROM students WHERE NOT native_place = 'GUANGZHOU' ORDER BY name;

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
