---
nav:
  title: SQL
  order: 2
group:
  title: 数据库和表
  order: 2
title: 查看数据库
order: 2
---

# 查看数据库

## 查看所有数据库

登陆 MySQL 服务后，输入命令 `SHOW DATABASES`。

在 MySQL 中，可以列出服务器上所有当前存在的数据库。这是了解服务器上数据库概况的基础步骤。

```sql
SHOW DATABASES;

-- 示例
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| rbac               |
| sys                |
+--------------------+
5 rows in set (0.04 sec)
```

这条命令会列出 MySQL 服务器上所有的数据库名。

注意事项：

- 用户可能需要特定的权限才能查看所有数据库。
- 默认情况下，这个命令也会显示 MySQL 系统数据库，如 information_schema、mysql、performance_schema 等。

数据库自带的数据库：

- **information_schema** 是 MySQL 系统自带数据库，主要保存 MySQL 数据库服务器的系统信息
- **mysql** 数据库保存了 MySQl 数据库服务器运行时需要的系统信息，比如数据文件夹、当前使用的字符集、约束检查信息等等
- **performance_schema** 是 MySQL 系统自带数据库，可用来监控 MySQL 的各类性能指标
- **sys** 是 MySQL 系统自带的数据库，主要作用是，以一种更容易被理解的方式展示 MySQL 数据库服务器的各类性能指标，帮助系统管理员和开发人员监控 MySQL 的技术性能


## 查看创建数据库的信息

通过 `SHOW CREATE DATABASE` 语句查看创建数据库的信息。

```sql
SHOW CREATE DATABASE db_name;

-- Output
+----------+----------------------------------------------------------------------------------------------------------------------------------+
| Database | Create Database                                                                                                                  |
+----------+----------------------------------------------------------------------------------------------------------------------------------+
| db_name  | CREATE DATABASE `db_name` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */|
+----------+----------------------------------------------------------------------------------------------------------------------------------+
1 row in set (0.00 sec)
```

从输出结果我们可以看出：

- 我们使用 `CREATE DATABASE db_name` 命令了创建了数据库
- `DEFAULT CHARACTER SET utf8mb4` 表示默认的字符集是 `utf8mb4`
- `COLLATE utf8mb4_0900_ai_ci` 表示默认的排序规则是 `utf8mb4_0900_ai_ci`
- `DEFAULT ENCRYPTION='N'` 表示默认不启用加密