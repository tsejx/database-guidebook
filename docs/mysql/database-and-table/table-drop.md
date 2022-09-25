---
nav:
  title: MySQL
  order: 2
group:
  title: 数据库和表
  order: 2
title: 删除表
order: 5
---

# 删除表

## 语法

```sql
DROP TABLE [IF EXISTS]
  <table_name> [, <table_name>] ...
```

| 关键字         | 参数           | 说明                                                                | 是否可选 |
| :------------- | :------------- | :------------------------------------------------------------------ | :------- |
| `CREATE TABLE` | `<table_name>` | `<table_name>` 为要删除的表名。如果要删除多个表，请使用逗号分隔表名 | 必填     |
| `IF EXISTS`    | -              | 避免了删除不存在的表时发生的错误                                    | 可选     |

当要删除的表中有不存在的表时：

- 有 `IF EXISTS` 选项，不会对不存在的表报错。该语句会删除存在的表，并给出不存在的表的提示。
- 没有 `IF EXISTS` 选项，该语句运行失败带有一个指示不能移除不存在的表的错误。该语句不会删除任何表。

## 使用方法

### 删除一个表

示例：删除 `test` 表

```sql
DROP TABLE test;
```

### 删除多个表

示例：删除 `test1` 和 `test2` 表

```sql
DROP TABLE test1, test2;
```

### 删除不存在的表

示例：删除 `test` 表

```sql
DROP TABLE test;

-- 输出
ERROR 1051 (42S02): Unknown table 'testdb.test'
```

可以使用 `IF EXISTS` 选项进行删除：

```sql
DROP TABLE IF EXISTS test;

-- 输出
Query OK, 0 rows affected, 1 warning (0.00 sec)
```

这里我们使用了 `IF EXISTS` 选项，该语句并没有返回错误。但是，1 warning 表示有一个需要注意的事项。我们可以使用以下语句查看具体的注意事项：

```sql
SHOW WARNINGS;

-- 输出
+-------+------+------------------------------+
| Level | Code | Message                      |
+-------+------+------------------------------+
| Note  | 1051 | Unknown table 'testdb.test' |
+-------+------+------------------------------+
1 row in set (0.00 sec)
```

这里告诉我们具体的注意事项是：Unknown table 'testdb.test'。
