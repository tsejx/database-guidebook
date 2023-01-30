---
nav:
  title: MySQL
  order: 2
group:
  title: 基础用法
  order: 3
title: 更新和删除数据
order: 35
---

# 更新和删除数据

## 更新数据

更新（修改）表中的数据，可以使用 `UPDATE` 语句。有两种使用方式：

- 更新表中的特定行
- 更新表中的所有行

基本的 `UPDATE` 语句由三部分组成，分别是：

- 要更新的表
- 列名和它们的新值
- 确定要更改那些行的过滤条件

示例：更新指定数据

```sql
UPDATE students
SET height = '172'
WHERE id = 5;
```

没有 `WHERE` 子句，DBMS 将会更新 `students` 表中的所有行。

示例：更新多个列值

```sql
UPDATE students
SET height = '178',
    weight = '78'
WHERE id = 5;
```

在更新多个列时，只需要使用一条 `SET` 命令，每个 `列=值` 对之间用逗号分隔（最后一列之后不用逗号）。

## 删除数据

从一个表中删除（去掉）数据，使用 `DELETE` 语句。有两种使用方式：

- 从表中删除特定的行
- 从表中删除所有行

示例：删除指定数据

```sql
DELETE FROM students
WHERE id = 5;
```

如果想从表中删除所有行，不要使用 `DELETE`。可使用 `TRUNCATE TABLE` 语句，它完成相同的工作，而速度更快（因为不记录数据的变动）。
