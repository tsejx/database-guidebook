---
nav:
  title: SQL
  order: 2
group:
  title: 数据库和表
  order: 2
title: 创建数据库
order: 1
---

# 创建数据库

数据库是存储数据的容器。一个数据中可以包含多个表。要想创建表，必须首先创建数据库。

在 MySQL 中，`CREATE DATABASE` 和 `CREATE SCHEMA` 语句用来创建数据库。

## 创建数据库语法

`CREATE DATABASE` 语句用来创建数据库。以下是 `CREATE DATABASE` 语句的语法：

```sql
CREATE {DATABASE | SCHEMA} [IF NOT EXISTS] db_name
  [create_option] ...

create_option: [DEFAULT] {
    CHARACTER SET [=] charset_name
  | COLLATE [=] collation_name
  | ENCRYPTION [=] {'Y' | 'N'}
}
```

语法说明：

| 关键字                               | 参数             | 说明                                               | 是否可选 |
| :----------------------------------- | :--------------- | :------------------------------------------------- | :------- |
| `CREATE DATABASE` 或 `CREATE SCHEMA` | `db_name`        | 两者产生效果一致，参数为创建数据库的名称           | 必填     |
| `IF NOT EXISTS`                      | -                | 表示指定的数据库不存在的情况下才创建               | 可选     |
| `CHARACTER SET <charset_name>`       | `charset_name`   | 指定数据库的字符集（默认使用数据库服务器的配置）   | 可选     |
| `COLLATE <collation_name>`           | `collation_name` | 指定数据库的排序规则（默认使用数据库服务器的配置） | 可选     |
| `ENCRYPTION`                         | `'Y'` \| `'N'`   | 指定数据库是否加密（默认使用数据库服务器的配置）   | 可选     |

数据库命名要求：

- 数据库的名字最长为 64 个字符，名字的长度还取决于操作系统
- 数据库名可以由子吗、数字、下划线、美元符号组成

虽然语法看起来复杂，但最常用的就是下面这句：

```sql
CREATE DATABASE db_name;
```

[官方文档：CREATE DATABASE Statement](https://dev.mysql.com/doc/refman/8.0/en/create-database.html)

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

## 数据库自带的数据库

登陆 MySQL 服务后，输入命令 `SHOW DATABASES`：

```sql
mysql> show databases;

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

- **information_schema** 是 MySQL 系统自带数据库，主要保存 MySQL 数据库服务器的系统信息
- **mysql** 数据库保存了 MySQl 数据库服务器运行时需要的系统信息，比如数据文件夹、当前使用的字符集、约束检查信息等等
- **performance_schema** 是 MySQL 系统自带数据库，可用来监控 MySQL 的各类性能指标
- **sys** 是 MySQL 系统自带的数据库，主要作用是，以一种更容易被理解的方式展示 MySQL 数据库服务器的各类性能指标，帮助系统管理员和开发人员监控 MySQL 的技术性能