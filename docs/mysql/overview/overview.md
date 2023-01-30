---
nav:
  title: MySQL
  order: 2
group:
  title: 概览
  order: 1
title: 概述
order: 1
---

# 概述

MySQL 应用广泛，并不是每个人都有条件用上 navicat 的。你需要了解 MySQL 的连接方式和基本的操作，在异常情况下才能游刃有余。

```bash
# 在命令行工具汇总执行以下命令登陆 MySQL 客户端
mysql -u root -p -h 192.168.1.2
```

```bash
# 查看操作系统版本
sudo lsb_release -a
```

```bash
# 查看本机 IP
ipconfig

# 查看本机端口
netstat -ano
```

## 查询语言分类

- 数据定义语言（DDL，Data Definition Language）：用来定义数据库对象，数据库、表、列
- 数据操作语言（DML，Data Manipulation Language）：用来对数据库中表的记录进行更新。关键字，insert、update、delete 等
- 数据控制语言（DCL，Data Control Language）：用来定义数据库访问权限和安全级别，创建用户等，grant 等
- 数据查询语言（DQL，Data Query Language）：用来查询数据库中表的记录，关键字：select from where 等

## 目录

- 查询数据
  - SELECT
  - SELECT DISTINCT
- 过滤数据
  - WHERE
  - AND
  - OR
  - IN
  - BETWEEN
  - LIKE
  - LIMIT
  - IS NULL
- 排序数据
  - ORDER BY
  - 使用 ORDER BY 子句进行自然排序
- 连续表
  - MySQL 别名
  - INNER JOIN
  - LEFT JOIN
  - CROSS JOIN
  - 自连接
- 分组数据
  - GROUP BY
  - HAVING
- MySQL 子查询、派生表和通用表达式
  - MySQL 子查询
  - MySQL 派生表
  - MySQL 通用表达式
  - 递归 CTE
- SET 操作符
  - UNION 和 UNION ALL
  - INTERSECT 模拟
- 修改数据
  - INSERT
  - INSERT IGNORE
  - UPDATE
  - UPDATE JOIN
  - DELETE
  - DELETE CASCADE
  - DELETE JOIN
  - DELETE JOIN
  - REPLACE
  - PREPARE
- MySQL 事务
  - MySQL 事务
  - MySQL 表锁定
- 管理
  - 数据库管理
  - 表类型
  - CREATE TABLE
  - ALTER TABLE
  - 重命名
  - 删除列
  - 新增列
  - 删除表
  - 临时表
  - TRUNCATE TABLE
- 索引
- 数据类型
- 约束
  - NOT NULL
  - 主键约束
  - 外键约束
  - UNIQUE 约束
  - CHECK 约束
- 全球化
- 导入和导出

## 参考资料

- [一份非常完整的 MySQL 规范](https://mp.weixin.qq.com/s/OGprXpPfWFlpAdxah4YHsA)
- [浅谈 MySQL 的整体架构](https://juejin.im/post/5ce244f8f265da1bab297ffa)
- [MySQL 索引优化分析](https://www.cnblogs.com/itdragon/p/8146439.html)
