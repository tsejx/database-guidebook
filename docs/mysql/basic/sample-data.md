---
nav:
  title: MySQL
  order: 2
group:
  title: 基础用法
  order: 3
title: 数据库示例数据
order: 1
---

# 数据库示例数据

## 学生表 student

学生表 `student` 列出了所有学生的信息。

学生表 `student` 表和班级表 `classes` 通过 `class_student` 表关联在一起。班级和

### 表结构

`student` 表结构如下：

```sql
+--------------+------------------+------+-----+---------+----------------+
| Field        | Type             | Null | Key | Default | Extra          |
+--------------+------------------+------+-----+---------+----------------+
| student_id   | int unsigned     | NO   | PRI | NULL    | auto_increment |
| name         | varchar(45)      | NO   |     | NULL    |                |
| gender       | tinyint unsigned | NO   |     | 0       |                |
| age          | tinyint unsigned | NO   |     | 0       |                |
| height       | varchar(10)      | YES  |     | NULL    |                |
| weight       | varchar(10)      | YES  |     | NULL    |                |
| native_place | varchar(20)      | YES  |     | NULL    |                |
| birth_date   | date             | NO   |     | NULL    |                |
+--------------+------------------+------+-----+---------+----------------+
```

### 字段说明

| 字段         | 说明                               |
| :----------- | :--------------------------------- |
| student_id   | 用于唯一标识表中每个学生的代理主键 |
| name         | 学生的名字                         |
| gender       | 学生的性别                         |
| age          | 学生的年龄                         |
| height       | 学生的身高                         |
| weight       | 学生的体重                         |
| native_place | 学生的籍贯                         |
| birth_date   | 学生的出生日期                     |

### 已有数据
