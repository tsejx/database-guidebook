---
nav:
  title: PostgreSQL
  order: 3
group:
  title: 附录
  order: 99
title: 命令行清单
order: 1
---

# 命令行清单

这一篇是速查附录，重点不是解释概念，而是把常用的 `psql` 和 PostgreSQL 命令集中整理出来，方便随时回头看。

如果你还不熟悉 `psql` 是什么、元命令和 SQL 的区别，可以先看前面的 `命令行使用`。这一篇更像“查表”。

## 连接数据库

### 使用默认本地连接

```bash
psql postgres
```

### 指定主机、端口、用户、数据库

```bash
psql -h 127.0.0.1 -p 5432 -U postgres -d postgres
```

### 执行 SQL 文件

```bash
psql -U postgres -d postgres -f init.sql
```

## 退出与切换

### 退出 psql

```text
\q
```

### 切换数据库

```text
\c postgres
```

## 查看数据库信息

### 查看所有数据库

```text
\l
```

### 查看当前数据库

```sql
SELECT current_database();
```

### 查看当前用户

```sql
SELECT current_user;
```

## 查看 schema

### 查看所有 schema

```text
\dn
```

### 查看当前搜索路径

```sql
SHOW search_path;
```

## 查看表和结构

### 查看当前数据库中的表

```text
\dt
```

### 查看指定 schema 下的表

```text
\dt analytics.*
```

### 查看表结构

```text
\d users
```

### 查看更详细的表结构

```text
\d+ users
```

## 查看索引

### 查看所有索引

```text
\di
```

### 查看某张表相关结构（含索引）

```text
\d orders
```

## 常见 SQL 速查

### 创建数据库

```sql
CREATE DATABASE bookstore;
```

### 删除数据库

```sql
DROP DATABASE bookstore;
```

### 创建 schema

```sql
CREATE SCHEMA analytics;
```

### 创建表

```sql
CREATE TABLE users (
  id integer PRIMARY KEY,
  name text NOT NULL,
  created_at timestamp DEFAULT NOW()
);
```

### 查看当前时间

```sql
SELECT NOW();
```

### 统计表记录数

```sql
SELECT COUNT(*) FROM users;
```

## 事务命令速查

### 开始事务

```sql
BEGIN;
```

### 提交事务

```sql
COMMIT;
```

### 回滚事务

```sql
ROLLBACK;
```

## 导入与执行脚本

### 从文件执行 SQL

```bash
psql -U postgres -d postgres -f schema.sql
```

### 交互模式中执行脚本

```text
\i schema.sql
```

## 常用查看命令汇总

下面这些命令最适合初学阶段优先记熟：

```text
\l        查看所有数据库
\c dbname 切换数据库
\dn       查看 schema
\dt       查看表
\d table  查看表结构
\di       查看索引
\q        退出 psql
```

## 一条最小排查路径

如果你刚连上 PostgreSQL，想快速确认自己当前在哪、有哪些对象，可以按这个顺序：

1. `SELECT current_database();`
2. `SELECT current_user;`
3. `\dn`
4. `\dt`
5. `\d 表名`

这条路径很适合做环境确认。

## 使用时的小提醒

- `psql` 元命令通常以 `\` 开头
- SQL 语句通常以分号 `;` 结束
- 元命令一般不需要分号
- 当你拿不准结构时，优先先看 `\d`、`\dt`、`\dn`

如果你已经把前面的 PostgreSQL 入门文档顺着学下来，这一页就可以作为后续练习时的随手速查表。
