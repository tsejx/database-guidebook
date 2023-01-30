---
nav:
  title: MySQL
  order: 2
group:
  title: 数据库和表
  order: 2
title: 修改表
order: 6
---

# 修改表

## 语法

```sql
ALTER TABLE <table_name>
  [<alter_action> options], ...
```

其中 `alter_action` 是一个修改动作，包括：

- `ADD` 关键字可用于添加列、索引、约束等
  - `ADD [COLUMN]`：添加列
  - `ADD INDEX`：添加索引
  - `ADD PRIMARY KEY`：添加主键
  - `ADD FOREIGN KEY`：添加外键
  - `ADD UNIQUE INDEX`：添加唯一索引
  - `ADD CHECK`：添加检查约束
- `DROP` 关键字可用于删除列、索引、约束等
  - `DROP [COLUMN] <column_name>`：删除列
  - `ADD INDEX <index_name>`：删除索引
  - `DROP PRIMARY KEY`：删除主键
  - `DROP FOREIGN KEY <fk_symbol>`：删除外键
  - `DROP CHECK <symbol>`：删除检查约束
- `MODIFY` 关键字用于修改列的定义。与 `CHANGE` 关键字不同，它不能重命名列。例如 `MODIFY [COLUMN] <col_name> <column_definition>`
- `CHANGE` 关键字用于修改列的定义。与 `MODIFY` 关键字不同，它可以重命名列。例如 `MODIFY [COLUMN] <old_col_name> <new_col_name> <column_definition>`
- `RENAME` 关键字可以重命名列、索引和表
  - `RENAME COLUMN <old_col_name> TO <new_col_name>`：重命名列
  - `RENAME INDEX <old_index_name> TO <new_index_name>`：重命名索引
  - `RENAME <new_tbl_name>`：重命名表

## 修改数据表

如果需要对表做 <strong style="color:red">结构</strong> 上的改变，可以将表删除然后重新创建表，但是这种效率会产生一些额外的工作，数据会重新加载进来，如果此时有服务正在访问的话，也会影响服务读取表中的数据，所以此时，我们需要表的修改语句来对已经创建好的表的定义进行修改。

常用命令：

```sql
ALTER TABLE <table_name> MODIFY [COLUMN] <column_definition> [FIRST | AFTER <column_name>];
```

比如我们想要将 `students` 表中的 `name` 由 `varchar(20)` 改为 `varchar(25)`，可以使用如下语句：

```sql
ALTER TABLE students MODIFY name VARCHAR(25);
```

### 修改表名

语法：

```sql
ALTER TABLE <table_name> RENAME TO <new_table_name>;
```

### 添加表字段

语法：

```sql
ALTER TABLE <table_name> ADD <field> INT;
```

如果需要指定新增字段的位置，可以使用 MySQL 提供的关键字 `FIRST`（设定为第一列），`AFTER` 字段名（设定位于某个字段之后）。

尝试以下 `ALTER TABLE` 语句，在执行成功后，使用 `SHOW COLUMNS` 查看表结构的变化：

```sql
ALTER TABLE <table_name> DROP <column_name>;
-- 在第一列插入 column_name
ALTER TABLE <table_name> ADD <column_name> INT FIRST;
ALTER TABLE <table_name> DROP <column_name>;
-- 在 column_name2 之后新增名为 column_name 的列
ALTER TABLE <table_name> ADD <column_name> INT AFTER <column_name2>;
```

`FIRST` 和 `AFTER` 关键字可用于 `ADD` 与 `MODIFT` 子句，所以如果你想重置数据表字段的位置就需要先使用 `DROP` 删除字段然后使用 `ADD` 来添加字段并设置位置。

示例：在 `students` 表后 `age` 列后面新增一列 `height`（身高）

```sql
ALTER TABLE students ADD COLUMN height INT NOT NULL AFTER age;
```

示例：在 `students` 表的第一列增加字段 `student_no`

```sql
ALTER TABLE students ADD COLUMN student_no INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST;
```

### 修改字段类型

如果需要修改字段类型及名称，可以在 `ALTER` 命令中使用 `MODIFT` 或 `CHANGE` 子句。

语法：

```sql
ALTER TABLE <table_name> MODIFY <column_name> <column_definition>;
```

示例：把字段 `nickName` 字段的类型从 `VARCHAR(5)` 该为 `VARCHAR(20)`，可执行以下命令

```sql
ALTER TABLE students MODIFY nick_name VARCHAR(20) DEFAULT NULL COMMENT '昵称';
```

### 修改字段名称

使用 `CHANGE` 子句，语法有很大的不同。在 `CHANGE` 关键字之后，紧跟着的是你要修改的字段名，然后指定新字段名及类型。

语法：

```sql
ALTER TABLE <table_name> CHANGE <old_column_name1> <new_column_name1> <column_definition>;
ALTER TABLE <table_name> CHANGE <old_column_name2> <new_column_name2> <column_definition> DEFAULT <default_value>;
ALTER TABLE <table_name> CHANGE <old_column_name3> <new_column_name3> <column_definition> DEFAULT <default_value> COMMENT "注释";
```

当你修改字段时，你可以指定是否包含值或者是否设置默认值。

以下示例中，指定字段 `age` 为 `NOT NULL` 且默认值为 0。

```sql
ALTER TABLE students CHANGE age BIGINT NOT NULL DEFAULT 0;
```

如果你不设置默认值，MySQL 会自动设置改字段默认为 `NULL`。

### 修改字段默认值

当你修改字段时，你可以指定是否包含值或者是否设置默认值。

以下实例，指定字段 `balance` 为 `NOT NULL` 且默认值为 1000。

```sql
ALTER TABLE <table_name> ALTER balance SET DEFAULT 1000;

SHOW COLUMNS FROM <table_name>;
```

### 修改表类型

语法：

```sql
ALTER TABLE <table_name> ENGINE = MYISAM;
SHOW TABLE STATUS LIKE '<table_name>'\G
```

### 删除表字段

语法：

```sql
ALTER TABLE <table_name> DROP <column_name>;
```

如果数据表中只剩下一个字段则无法使用 `DROP` 来删除字段。
