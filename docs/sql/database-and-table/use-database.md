---
nav:
  title: SQL
  order: 2
group:
  title: 数据库和表
  order: 2
title: 选择数据库
order: 3
---

# 选择数据库

在 MySQL 服务器中，可能有多个数据库。如果要进行查询等操作，首先应该先选择要进行操作的数据库。你可以使用 `USE` 语句选择或者切换数据库。

```sql
USE table_name;
```

## 登录时指定数据库

可以在登录 MySQL 服务器时直接指定要操作的数据库。

```bash
mysql -u root -p -D db_name
```

## 查看当前数据库

如果想查看当前正在操作的数据库，可以使用以下三种方法：


```sql
-- 第一步
SELECT DATABASE();

-- 第二步
STATUS;

-- 第三步
SHOW TABLES;
```

