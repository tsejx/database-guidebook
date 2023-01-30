---
nav:
  title: MySQL
  order: 2
group:
  title: 数据库和表
  order: 2
title: 创建表
order: 4
---

# 创建表

表是关系数据库中数据存储的基本单位。在 MySQL 中，`CREATE TABLE` 语句用来创建表。

## 语法

创建数据表需要以下信息：

- 表名（`table_name`）
- 表字段名（`column_name`）
- 定义每个表字段（`column_type`）

语法：

```sql
CREATE TABLE [IF NOT EXISTS] <table_name> (
   <column_name> <data_type> [NOT NULL | NULL] [DEFAULT <expr>],
   <column_name> <data_type> [NOT NULL | NULL] [DEFAULT <expr>],
   ...,
   [table_constraints]
) [ENGINE=<storage_engine>];
```

语法说明：

| 关键字                      | 参数                  | 说明                                                                                                                                                | 是否可选 |
| :-------------------------- | :-------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- | :------- |
| `CREATE TABLE`              | `<table_name>`        | 两者产生效果一致，`<database_name>` 为删除数据库的名称                                                                                              | 必填     |
| `IF NOT EXISTS`             | -                     | 表示给定的表不存在的时候才创建                                                                                                                      | 可选     |
| -                           | `<column_name>`       | 列的名字                                                                                                                                            |          |
| -                           | `<data_type>`         | 列的数据类型                                                                                                                                        |          |
| `[NOT NULL \| NULL]`        | -                     | 指示该列是否可以为 `NULL`。<br/>如果不指定该选项，则此列可以为 `NULL`。<br/>如果设置为 `NOT NULL`，则插入新行时该列必须有值                         | 可选     |
| `[DEFAULT <expr>]`          | `<expr>`              | 指示该列的默认值。如果不指定该选项，则此列的默认是 `NULL`。                                                                                         | 可选     |
| `[AUTO_INCREMENT]`          | -                     | 指示该列是否是一个自增列。如果使用了此选项，则该列的值可有服务器自动产生和填充。该列的值从 1 开始，每增加一个行就会加 1。一个表中只能有一个自增列。 | 可选     |
| -                           | `<table_constraints>` | 定义表的约束                                                                                                                                        | 可选     |
| `[ENGINE=<storage_engine>]` | `<storage_engine>`    | 指定了表使用的存储引擎                                                                                                                              | 可选     |

其他说明：

- 表名可由字母、数字、下划线和美元符号组成，列名长度在 64 个字符以内。
- 表名在一个数据库中是唯一的。
- 新建的表会在当前默认的数据库中。如果还没有选择数据库，请使用 `db_name.table_name` 格式指定要新建的表所在的数据库。
- 如果你给定一个已经存在的表名，又没有使用 `IF NOT EXISTS` 子句，服务器会返回一个错误。
- 列名可由字母、数字、下划线和美元符号组成，列名长度在 64 个字符以内。列名在一个表中是唯一的。
- 当表名或者字段名含有空格或者其他特殊字字符时，请使用反引号（<code>`</code>）包围起来。
- 如果不指定 `ENGINE` 选项，则采用服务器默认的存储引擎。自 MySQL 5.5 版以来，服务器默认的引擎是由 MyISAM 变成了 `InnoDB`。

## 使用方法

### 基本用法

创建学生表，里面 5 个字段，姓名（`name`）、性别（`gender`）、年龄（`age`）、生日（`birthdate`），建表语句如下。

```sql
CREATE TABLE IF NOT EXISTS `student` (
    `student_id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `gender` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `age` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `height` VARCHAR(10) DEFAULT NULL,
    `weight`VARCHAR(10) DEFAULT NULL,
    `native_place` VARCHAR(20) DEFAULT NULL,
    `birthdate` DATE NOT NULL,
    PRIMARY KEY ( `student_id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

这里创建 `student` 表有 5 个字段：

- `student_id` 列的数据类型是 `INT`，它不能为 `NULL`，并且它是一个自增列
- `name` 列的数据类型是 `VARCHAR`，它最多为 45 个字符。它不能为 `NULL`
- `gender` 列的数据类型是 `TINYINT UNSIGNED`，它不能为 `NULL`，但是有默认值 0
- `age` 列的数据类型是 `INT`，它不能为 `NULL`，但是有默认值 0
- `birth_date` 列的数据类型是 `DATE`，它不能为 `NULL`

`student` 表的约束有：

- <code>PRIMARY KEY (`student_id`)</code> 子句表明 `student_id` 列是主键

建表后，可使用以下语句查看表的基本信息：

```sql
-- 语法
DESC <table_name>;

-- 示例
DESC students;
```

输出结果：

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

### 进阶用法

使用以下语句创建 `user_hobby` 表：

```sql
CREATE TABLE `testdb`.`user_hobby` (
  `hobby_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `hobby` VARCHAR(45) NOT NULL,
  `created_at` DATETIME NOT NULL,
  INDEX `fk_user_idx` (`user_id` ASC) VISIBLE,
  PRIMARY KEY (`hobby_id`),
  CONSTRAINT `fk_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `testdb`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT
);
```

这里创建的 `user_hobby` 表有 4 个字段：

- `hobby_id` 列的数据类型是 `INT`，它不能为 `NULL`，并且它是一个自增列。
- `user_id` 列的数据类型是 `INT`。它不能为 `NULL`。它通过外键指向了 `user` 表的 `user_id` 列。
- `hobby` 列的数据类型是 `VARCHAR`，它最多为 45 个字符。 它不能为 `NULL`。
- `created_at` 列的数据类型是 `DATETIME`。它不能为 `NULL`。

`user_hobby` 表的约束有：

- `PRIMARY KEY ( hobby_id )` 子句表明 `hobby_id` 列是主键。
- <code>INDEX `fk_user_idx`</code> 设定了在 `user_id` 列上建立索引。
- <code>CONSTRAINT `fk_user`</code> 设定了一个外键。这个外键将 `user_id` 列引用了 `user` 表的 `user_id` 列

### CREATE TABLE ... LIKE

`CREATE TABLE ... LIKE` 语句可以用来克隆另一个表的定义。它以另一个表的定义为基础创建一个新的空表，包含了原表中定义的列属性和索引。

```sql
CREATE TABLE <new_table_name> LIKE <original_table_name>;
```

### CREATE TABLE ... SELECT

`CREATE TABLE ... SELECT` 语句可实现从另一个表创建一个新表。该语句会依据 `SELECT` 子句中的列创建新表，并将 `SELECT` 的结果集插入到新表中。

```sql
CREATE TABLE <new_table_name> [AS] SELECT * FROM <original_table_name>;
```

`CREATE TABLE ... SELECT` 语句可以用来复制一个表，包含列属性和数据。

## 主键

## 外键

## 自增列

## 生成列

## 唯一键

## NULL 值
