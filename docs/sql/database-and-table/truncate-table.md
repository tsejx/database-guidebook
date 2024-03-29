---
nav:
  title: SQL
  order: 2
group:
  title: 数据库和表
  order: 2
title: 清空表
order: 17
---

# 清空表

在 MySQL 中，要清空数据表（即删除表中的所有数据而保留表结构），可以使用 `TRUNCATE TABLE` 或 `DELETE FROM` 语句。下面是这两种方法的说明：

## TRUNCATE TABLE

使用 `TRUNCATE TABLE` 语句

```sql
TRUNCATE [TABLE] tbl_name;
```

说明：

- `TRUNCATE TABLE` 语句用于删除表中的所有数据，但保留表的结构（列、索引等）。
- 此操作更快且更有效率，因为它不会记录删除的每一行，而是直接删除整个数据。由于这个原因，它不会触发触发器。
- 注意：使用 `TRUNCATE TABLE` 将会重置自增计数器（如果有）为起始值。

## DELETE FROM

使用 `DELETE FROM` 语句清空表。

说明：

- `DELETE FROM` 语句用于删除表中的所有行，但保留表的结构。
- 这个过程相对较慢，特别是在处理大量数据时，因为它会记录并逐行删除数据，同时也会触发触发器。
- 注意：使用 `DELETE FROM` 不会重置自增计数器。

## 选择使用哪种方法？

- 如果您只是想要删除表中的所有数据，并且不关心自增计数器的值或者不需要触发器触发任何操作，那么使用 TRUNCATE TABLE 更合适。
- 如果您需要自增计数器保持当前值，或者您需要触发器触发某些操作，那么使用 DELETE FROM 更合适。