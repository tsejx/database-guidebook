---
nav:
  title: MySQL
  order: 2
group:
  title: 基础用法
  order: 3
title: 排序数据
order: 6
---

# 排序数据

本节讲解如何使用 `SELECT` 语句的 `ORDER BY` 子句（clause），根据需要排序检索出的数据。

## 排序数据

语法：

```sql
SELECT <column_name> FROM <table_name> ORDER BY <column_name>;
```

示例：

```sql
SELECT name FROM students ORDER BY name;
```

其实，检索出的数据并不是随机显示的。如果不排序，数据一般将以它在地层表中出现的顺序显示，这有可能是数据最初添加到表中的顺序。但是，如果数据随后进行过更新或删除，那么这个顺序将会受到 DBMS 重用回收存储空间的方式的影响。因此，如果不明确控制的话，则最终的结果不能（也不应该）依赖该排序顺序。

注意：

1. 在指定一条 `ORDER BY` 子句时，应该保证它是 `SELECT` 语句中最后一条子句。如果它不是最后的子句，将会出现错误消息。
2. 通常，`ORDER BY` 子句中使用的列将是为显示而选择的列。但是实际上并不一定要这样，用非检索的列排序数据是完全合法的。

## 按多个列排序

经常需要按不止一个列进行数据排序。例如，如果要显示雇员名单，希望按姓和名排序（首先按姓排序，然后在每个姓中再按名排序）。

语法：

```sql
SELECT <column_name1>, <column_name2>, ...  FROM <table_name> ORDER BY <column_name1>, <column_name2>, ...;
```

示例：

```sql
SELECT student_id, name, age FROM students ORDER BY age, name;
```

对于上述例子，仅在多个行具有相同 `age` 值时才对产品按 `name` 进行排序。如果 `age` 列中所有的值都是唯一的，则不会按 `name` 排序。

## 按列位置排序

除了能用列名指出排序顺序外，`ORDER BY` 还支持按相对列位置进行排序。

示例：

```sql
SELECT student_id, age, name FROM students ORDER BY 2, 3;
```

输出：

```sql
student_id  age       name
----------  --------  --------
0           20        Ben
1           16        Amy
2           19        Tony
3           22        Ann
4           15        Tom
5           21        Alan
6           19        Irene
7           23        Yumi
8           18        Wolf
```

可以看到，这里的输出与上面的查询相同，不同之处在于 `ORDER BY` 子句。`SELECT` 清单中指定的是选择列的相对位置而不是列名。`ORDER BY 2` 表示按 `SELECT` 清单中的第二个列 `age` 进行排序。`ORDER BY 2，3` 表示先按 `age`，再按 `name` 进行排序。

这一技术的主要好处在于不用重新输入列名。但它也有缺点。首先，不明确给出列名又可能造成错用列名排序。其次，在对 `SELECT` 清单进行更改时容易错误地对数据进行排序（忘记对 `ORDER BY` 子句做相应的改动）。最后，如果进行排序的列不在 `SELECT` 清单中，显然不能使用这项技术。

## 指定排序方向

数据排序不限于升序排序（从 A 到 Z），这只是默认的排序顺序。还可以使用 `ORDER BY` 子句进行降序（从 Z 到 A）排序。为了进行降序排序，必须指定 `DESC` 关键字。

语法：

```sql
SELECT <column_name1>, <column_name2>, <column_name3>, ... FROM <table_name> ORDER BY <column_name> DESC;
```

示例：以年龄来排序学生（最老的排在最前面）

```sql
SELECT student_id, age, name FROM students ORDER BY age DESC;

-- 输出
student_id  age       name
----------  --------  --------
7           23        Yumi
3           22        Ann
5           21        Alan
0           20        Ben
6           19        Irene
2           19        Tony
8           18        Wolf
1           16        Amy
4           15        Tom
```

如果打算用多个列排序，应该再加上学生名字：

```sql
SELECT student_id, age, name FROM students ORDER BY age DESC, name;

-- 输出

student_id  age       name
----------  --------  --------
7           23        Yumi
3           22        Ann
5           21        Alan
0           20        Ben
6           19        Irene
2           19        Tony
8           18        Wolf
1           16        Amy
4           15        Tom
```

`DESC` 关键字只应用到直接位于其前面的列名。在上例中，只对 `age` 列指定 `DESC`，对 `name` 列不指定。因此，`age` 列以降序排序，而 `name` 列（在每个年龄层内）仍然按标准的升序排序。

注意：

- 如果想在多个列上进行降序排序，必须对每一列指定 `DESC` 关键字

`DESC` 是 `DESCENGING` 的缩写，与之相对的是 `ASC`（或 `ASCENDING`），在升序排序时可以指定它。但因为升序是默认的，如果既不指定 `ASC` 也不指定 `DESC`，则假定为 `ASC`。

> 在字典（dictionary）排序顺序中，A 被视为与 a 相同，这是大多数数据库管理系统的默认行为。但是，许多 DBMS 允许数据库管理员在需要时改变这种行为（如果你的数据库包含大量外语字符，可能必须这样做）。

> 在给出 `ORDER BY` 子句时，应保证它位于 `FROM` 子句之后。如果使用了 `LIMIT`，它必须位于 `ORDER BY` 之后，。使用子句的次序不对将产生错误消息。
