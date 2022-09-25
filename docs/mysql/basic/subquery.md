---
nav:
  title: MySQL
  order: 2
group:
  title: 基础用法
  order: 3
title: 子查询
order: 14
---

# 子查询

在一个表的表达式中可以调用另一个表的表达式，这个被调用的表的表达式叫做**子查询**（subquery），我么也称作**子选择**（subselect）或**内嵌选择**（inner select）。子查询的结果传递给调用它的表的表达式继续处理。

子查询称为内部查询，而包含子查询的查询称为外部查询。 子查询可以在使用表达式的任何地方使用，并且必须在括号中关闭。

## 子查询分类

### 按返回结果集分类

子查询按返回结果集的不同分为 4 种：

- **表子查询**：返回的结果集是一个行的集合，N 行 N列（N >= 1）。表子查询经常用于父查询的 `FROM` 子句中
- **行子查询**：返回的结果集是一个列的集合，一行 N 列（N >= 1）。行子查询可以用于父查询的 `FROM` 子句和 `WHERE` 子句中
- **列子查询**：返回的结果集是一个行的集合，N 行一列（N >= 1）
- **标量子查询**：返回的结果集是一个标量集合，一行一列，也就是一个标量值。可以指定一个标量表达式的任何地方，都可以用一个标量子查询

从定义上讲，每个标量子查询也是一个行子查询和一个列子查询，反之则不是；每个行子查询和列子查询也是一个表子查询，反之也不是。

### 按返回结果的调用方式

子查询按对返回结果集的调用方法：

- **`WHERE` 型子查询**：把内层查询结果当作外层查询的比较条件
- **`FROM` 型子查询**：把内层的查询结果供外层再次查询。原理是把子查询的结果（内存里的一张表）当作一张临时表，然后再对它进行处理
- **`EXISTS` 型子查询**：把外层查询结果拿到内层，看内层的查询是否成立。原理是对外层表进行循环，再对内表进行内层查询。和 `IN()` 差不多，但是它们还是有区别的。主要是看两个张表大小差的程度。若子查询表大则用 `EXISTS`（内层索引），子查询表小则用 `IN`（外层索引）；

## 子查询的原则

1. 子查询必须放在圆括号内
2. 子查询的 `SELECT` 子句中智能有一个列，除非主查询中有多个列，用于与子查询选中的列相比较
3. 将子查询放在比较条件的右边以增加可读性（子查询不包含 `ORDER BY` 子句，对一个 `SELECT` 语句只能用一个 `ORDER BY` 子句，）
4. 在子查询中可以使用两种比较条件：单行运算符（`>`、`=`、`>=`、`<`、`<=`、`<>`）和多行运算符（`IN`、`ANT`、`ALL`）
5. 子查询不能直接用在集合函数中
6. `BETWEEN` 操作符不能同子查询一起使用，但是 `BETWEEN` 操作符可以用在子查询中

## WHERE 子查询

`WHERE` 型子查询：把内层查询的结果作为外层查询的比较条件

示例：查询

```sql
SELECT * 
FROM students 
WHERE student_id IN (
    SELECT MAX(goods_id) 
    FROM goods
    GROUP BY cat_id
)
```

## FROM 子查询

`FROM` 型子查询：把内层的查询结果当成临时表，供外层 SQL 再次查询，查询结果集可当成表看待（临时表使用一个别名）

示例：检索每个类别下价格最贵的商品信息列表

```sql
SELECT goods_id, goods_name, cat_id, shop_price
FROM (
    SELECT goods_id, goods_name, cat_id, shop_price
    FROM gooos
    ORDER BY cat_id ASC, goods_id DESC
)
AS tmp
GROUP BY cat_id;
```

## EXISTS 子查询

`EXISTS` 型子查询：把外层 SQL 的结果，拿到内层 SQL 测试，如果内层的 SQL 成立，则该行取出，内层查询是 `EXISTS` 后的查询。

```sql
SELECT c.cat_id, c.cat_name
FROM category c
WHERE c.cat_id
IN (
    SELECT g.cat_id
    FROM goods g
    GROUP BY g.cat_id
);
```

示例：

```sql
SELECT c.cat_id, c.cat_name
FROM category c
WHERE EXISTS (
    SELECT 1 
    FROM goods g
    WHERE g.cat_id = c.cat_id
);
```

`EXISTS` 子查询，如果 `EXISTS` 后的内层查询能查出数据，则表示存在；为空则不存在。

## ANY 和 IN 子查询

`ANY` 关键字必须后面接一个比较操作符。`ANT`

---

## 利用子查询进行过滤

示例：查询在篮球社的学生

```sql
SELECT
    student_id, name, gender
FROM
    students
WHERE
    club IN (
        SELECT
            clubId
        FROM
            clubs
        WHERE
            clubName = 'BASKETBALL'
    );
```

在这个例子中：

1. 子查询返回了社团名为 `BASKETBALL` 的所有社团代码
2. 外部查询选择在社团代码中在子查询返回的结果集中的社团中成员的姓名、ID 和性别

注意事项：

- 作为子查询的 `SELECT` 语句只能查询单个列。企图检索多个列将返回错误。

## 作为计算字段使用子查询

示例：

```sql
SELECT  cust_name,
        cust_state,
        (
            SELECT COUNT(*)
            FROM Orders
            WHERE Order.cust_id = Customers.cust_id
        ) AS orders
FROM Customers
ORDER BY cust_name;

-- 输出
cust_name       cust_state  orders
-----------     ----------  ------ 
Fun4All         IN          1 
Fun4All         AZ          1 
Kids Place      OH          0 
The Toy Store   IL          1 
Village Toys    MI          2
```
