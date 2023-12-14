---
nav:
  title: SQL
  order: 2
group:
  title: 基础语法
  order: 2
title: 排序数据
order: 7
---

# 排序数据

当使用 `SELECT` 语句查询表中的数据时，结果集不按任何顺序进行排序。要对结果集进行排序，需要使用 `ORDER BY` 子句。

`ORDER BY` 关键字用于对结果集按照一个列或多个列进行排序。

`ORDER BY` 关键字默认按照升序对记录进行排序。如果需要按照降序对记录进行排序，您可以使用 `DESC` 关键字。

## 排序数据

语法：

```sql
SELECT
  <column_name>
FROM
  <table_name>
ORDER BY
  <column1_name> [ASC|DESC],
  <column2_name> [ASC|DESC];
```

🌰 示例：检索学生表并根据学生名进行默认排序

```sql
SELECT
  name
FROM
  students
ORDER BY
  name;
```

其实，检索出的数据并不是随机显示的。如果不排序，数据一般将以它在底层表中出现的顺序显示，这有可能是数据最初添加到表中的顺序。但是，如果数据随后进行过更新或删除，那么这个顺序将会受到 DBMS 重用回收存储空间的方式的影响。因此，如果不明确控制的话，则最终的结果不能（也不应该）依赖该排序顺序。

注意：

1. 排序的列名：`ORDER BY` 后面可以有一个或多个列名，如果是多个列名进行排序，会按照后面第一个列先进行排序，当第一列的值相同的时候，再按照第二列进行排序，以此类推
2. 非选择列排序：`ORDER BY` 可以使用非选择列（也就是没有 `SELECT` 的列），所以使用
3. `ORDER BY` 的位置：`ORDER BY` 通常位于 `SELECT` 语句的最后一条子句，否则会报错

## 按多个列排序

经常需要按不止一个列进行数据排序。

例如，如果要显示雇员名单，希望按姓和名排序（首先按姓排序，然后在每个姓中再按名排序）。

语法：

```sql
SELECT
  <column_name1>,
  <column_name2>,
  ...
FROM
  <table_name>
ORDER BY
  <column_name1>,
  <column_name2>,
  ...;
```

🌰 示例：

```sql
SELECT
  student_id,
  name,
  age
FROM
  students
ORDER BY
  age,
  name;
```

对于上述例子，仅在多个行具有相同 `age` 值时才对产品按 `name` 进行排序。如果 `age` 列中所有的值都是唯一的，则不会按 `name` 排序。

## 按列位置排序

除了能用列名指出排序顺序外，`ORDER BY` 还支持按相对列位置进行排序。

🌰 示例：

```sql
SELECT
  student_id,
  age,
  name
FROM
  students
ORDER BY
  2,
  3;
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
SELECT
  <column_name1>,
  <column_name2>,
  <column_name3>,
  ...
FROM
  <table_name>
ORDER BY
  <column_name> [ASC|DESC];
```

🌰 示例：以年龄来排序学生（最老的排在最前面）

```sql
SELECT
  student_id,
  age,
  name
FROM
  students
ORDER BY
  age DESC;

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
SELECT
  student_id,
  age,
  name
FROM
  students
ORDER BY
  age DESC,
  name;

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

`DESC` 关键字只应用到直接位于其前面的列名。在上例中，只对 `age` 列指定 `DESC`，对 `name` 列不指定排序方式。因此，`age` 列以降序排序，而 `name` 列（在每个年龄层内）仍然按标准的升序排序。

注意：

- 如果想在多个列上进行降序排序，必须对每一列指定 `DESC` 关键字

`DESC` 是 `DESCENGING` 的缩写，与之相对的是 `ASC`（或 `ASCENDING`），在升序排序时可以指定它。但因为升序是默认的，如果既不指定 `ASC` 也不指定 `DESC`，则假定为 `ASC`。

> 在字典（dictionary）排序顺序中，A 被视为与 a 相同，这是大多数数据库管理系统的默认行为。但是，许多 DBMS 允许数据库管理员在需要时改变这种行为（如果你的数据库包含大量外语字符，可能必须这样做）。

> 在给出 `ORDER BY` 子句时，应保证它位于 `FROM` 子句之后。如果使用了 `LIMIT`，它必须位于 `ORDER BY` 之后，。使用子句的次序不对将产生错误消息。

## 自定义排序顺序

`ORDER BY` 子句允许使用 `FIELD()` 函数为列中的值定义自己的自定义排序顺序。

例如，如果需要按以下顺序基于 _以下状态的值_ 对订单进行排序：

- `In Process`
- `On Hold`
- `Cancelled`
- `Resolved`
- `Disputed`
- `Shipped`

🌰 示例：

```sql
SELECT
  orderNumber,
  status
FROM
  orders
ORDER BY
  FIELD(
    status,
    'In Process',
    'On Hold',
    'Cancelled',
    'Resolved',
    'Disputed',
    'Shipped'
  )
```
