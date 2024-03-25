---
nav:
  title: SQL
  order: 2
group:
  title: 数据库和表
  order: 2
title: 重命名表
order: 7
---

# 重命名表

在 MySQL 中，您可以使用 RENAME TABLE 语句来重命名一个或多个表。以下为常见的需要重命名表的情况：

- 您在创建表的时候使用了错误的表名。
- 您需要将表名更改为一个更有意义的名称。
- 产品的需求发生变化，需要将表名更改以适应新的业务。
- 您所在的团队使用了新的命名规则，您需要重命名那些不符合新规则的表。

## 语法

```sql
RENAME TABLE
    tbl_name TO new_tbl_name
    [, tbl_name2 TO new_tbl_name2] ...
```

| 关键字       | 参数                     | 说明     | 是否可选 |
| :----------- | :----------------------- | :------- | :------- |
| RENAME TABLE | tbl_name 和 new_tbl_name | 重命名表 | 必选     |

请注意以下几点：

- 使用 `RENAME TABLE` 语句执行表重命名操作时，不会影响表的数据，只是修改了表的名称。
- 要执行 `RENAME TABLE` 操作，您必须具有足够的权限，通常需要 `ALTER` 权限。
- 在执行表重命名操作时，建议在生产环境之前先在测试环境进行测试，以确保操作不会导致意外的影响。

也可以按照如下语法使用 ALTER TABLE 语句重命名表：

```sql
ALTER TABLE tbl_name
RENAME TO new_tbl_name;
```

## 基础用法

假设我们有一个用户表 `user`。因为你所在的团队制定了新的命名规则，所有的实体表需要以复数形式命名，因此您需要将 `user` 表重命名为 `users`。

我们使用以下语句在 `testdb` 数据库中创建一个 `user` 表以实践我们的实例：

```sql
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `age` int NOT NULL DEFAULT '20',
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);
```

## 注意事项

重命名表是一个简单的动作，但是它可能会带来一系列的问题。如果您没有同步修改那些用到此表的代码，则他们可能不能正常运行。

您需要同步修改的代码可能包括：

- 那些使用了此表的存储过程。
- 那些使用了此表的视图。
- 那些使用了此表的函数。
- 那些使用了此表的触发器。
- 那些使用了此表的外键约束 (在较旧的 MySQL 版本中)。
- 那些使用了此表的应用程序。

因此，当您打算修改一个表名的时候，您需要首先从整体上进行评估。然后，再决定是否进行重命名表。一旦您决定了要重命名一个表，您需要把需要同步修改的地方整理清楚。