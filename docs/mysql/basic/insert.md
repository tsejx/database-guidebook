---
nav:
  title: MySQL
  order: 2
group:
  title: 基础用法
  order: 3
title: 插入数据
order: 30
---

# 插入数据

MySQL 通过 `INSERT INTO` SQL 语句插入数据。

## INSERT VALUES

语法：

```sql
INSERT INTO <table_name> ( [<column_name1> [<column_name2> [, ... <column_nameN>]]] )
VALUES ( <value1 [, <value2> [, ... <valueN>]]> )
```

示例：插入单条数据

```sql
INSERT INTO students(name, gender, age, height, weight, native_place, birth_date) VALUES('Jay', 0, 23, '183', '89', 'GUANGZHOU', '1993-10-18');
```

示例：插入部分字段数据

```sql
INSERT INTO students(name, gender) VALUES('Aurelian'， 1);
```

这种情况下，必须制定要插入数据对应的字段名。

示例：插入多条数据

```sql
INSERT INTO
  students(name, gender, age, height, weight, native_place, birth_date)
VALUES
  ('Amy', 0, 27, '167', '93', 'GUANGZHOU', '1994-05-18'),
  ('Tony', 0, 23, '164', '135', 'GUANGZHOU', '1998-09-02'),
  ('Irene', 0, 20, '158', '80', 'GUANGZHOU', '2001-04-12');
```

在程序中，插入批量数据时，最好使用这种通过一条 `INSERT` 语句来一次性插入的方式。这样可以避免程序和数据库建立多次连接，从而增加服务器负荷。

示例：不带列名插入数据（列序列无法更改，插入时必须插入所有数据）

```sql
INSERT INTO students
VALUES ('Ming', 0, 23, '176', '154', 'BEIJING', '1994-05-18');
```

## INSERT SET

`INSERT INTO ... SET` 此语句用于直接给表中的某些列指定对应的列值，即要插入的数据的列名在 SET 子句中指定的列名，等号后面为指定的数据，而对于未指定的列，列值会指定为该列的默认值

语法：

```sql
INSERT INTO <table_name>
SET <column_name1> = <value1>,
    <column_name2> = <value2>,
    ...
    <column_nameN> = <valueN>;
```

此语句用于直接给表中的某些列指定对应的列值，即要插入的数据的列名在 `SET` 子句中指定，`column_name` 为制定的列名，等号后面为指定的数据，而对于未指定的列，列值会指定为该列的默认值。

示例：赋值式插入数据

```sql
INSERT INTO students SET id=1, name=a, age=1;
```

可以只插入部分数据，其他数据默认为 `NULL`。

若只需插入部分值，而其他值不为 `NULL` 就可以在创建或者修改字段的时候使用 `DEFAULT` 来设置一个默认值或者使用 `AUTO_INCREMENT` 将字段设置为自增。

例如：

```sql
CREATE TABLE(
  `id` INT PRIMARY KEY NOT NULL DEFAULT 1
);

-- 或者
CREATE TABLE(
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT
);
```

## 复制表

有一种数据插入不使用 `INSERT` 语句。要将一个表的内容复制到一个全新的表（运行中创建的表），可以使用 `SELECT INTO` 语句。

示例：

```sql
SELECT *
INTO custCopy
FROM customers;
```

要想只复制部分的，可以明确给出列名，而不是使用 `*` 通配符。

在使用 `SELECT INTO` 时，需要知道一些事情：

- 任何 `SELECT` 选项和子句都可以使用，包括 `WHERE` 和 `GROUP BY`
- 可利用联结从多个表插入数据
- 不管从多少个表中检索数据，数据都智能插入到一个表中
