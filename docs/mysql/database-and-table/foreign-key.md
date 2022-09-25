---
nav:
  title: MySQL
  order: 2
group:
  title: 数据库和表
  order: 2
title: 外键
order: 8
---

# 外键

1. 两个标必须是 InnoDB 表，MyISAM 表暂时不支持外键
2. 外键列必须建立了索引，MySQL 4.1.2 以后的版本在建立外键时会自动创建索引，但如果在较早的版本则需要显式建立
3. 外键关系的两个表的列必须是数据类型相似，也就是可以相互转换类型的列，比如 `int` 和 `tinyint` 可以，而 `int` 和 `char` 则不可以
