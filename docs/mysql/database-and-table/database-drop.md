---
nav:
  title: MySQL
  order: 2
group:
  title: 数据库和表
  order: 2
title: 删除数据库
order: 2
---

# 删除数据库

当我们不需要某个数据库的时候，我们可以将数据库删除。在 MySQL 中，`DROP DATABASE` 语句用来删除数据库。

## 删除数据库语法

```sql
DROP {DATABASE | SCHEMA} [IF EXISTS] <database_name>;
```

语法说明：

| 关键字                               | 参数              | 说明                                                   | 是否可选 |
| :----------------------------------- | :---------------- | :----------------------------------------------------- | :------- |
| `CREATE DATABASE` 或 `CREATE SCHEMA` | `<database_name>` | 两者产生效果一致，`<database_name>` 为删除数据库的名称 | 必填     |
| `IF EXISTS`                          | -                 | 表示指定的数据库存在的情况下才删除                     | 可选     |

`DROP DATABASE` 语句返回它删除的表数。
