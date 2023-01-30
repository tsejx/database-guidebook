---
nav:
  title: MySQL
  order: 2
group:
  title: 基础用法
  order: 3
title: 通配符过滤
order: 9
---

# 通配符过滤

## LIKE 操作符

`LIKE` 操作符通常用于符合某种搜索模式的条件查询。

### 百分号通配符

百分号（`%`）通配符**表示任何子符出现的任意次数**。

语法：

```sql
SELECT <column_name1>, <column_name2>, ... FROM <table_name> WHERE <column_name> LIKE "<pattern_words>%";
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

## 使用通配符的技巧

通配符搜索一般比前面讨论的其他搜索要耗费更长的处理时间。

注意事项：

- 不要过度使用通配符。如果其他操作符能达到相同的目的，应该使用其他操作符。
- 在确实需要使用通配符时，也尽量不要把它们用在搜索模式的开始处。把通配符置于开始处，搜索起来时最慢的。
- 仔细注意通配符的位置。如果放错地方，可能不会返回想要的数据。
