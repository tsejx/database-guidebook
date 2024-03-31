---
nav:
  title: SQL
  order: 2
group:
  title: 数据库和表
  order: 2
title: 修改表结构
order: 13
---

# 修改表结构

## 语法

```sql
ALTER TABLE tbl_name
    [alter_option [, alter_option] ...]
    [partition_options]

alter_option: {
    table_options
  | ADD [COLUMN] col_name column_definition
        [FIRST | AFTER col_name]
  | ADD [COLUMN] (col_name column_definition,...)
  | ADD {INDEX | KEY} [index_name]
        [index_type] (key_part,...) [index_option] ...
  | ADD {FULLTEXT | SPATIAL} [INDEX | KEY] [index_name]
        (key_part,...) [index_option] ...
  | ADD [CONSTRAINT [symbol]] PRIMARY KEY
        [index_type] (key_part,...)
        [index_option] ...
  | ADD [CONSTRAINT [symbol]] UNIQUE [INDEX | KEY]
        [index_name] [index_type] (key_part,...)
        [index_option] ...
  | ADD [CONSTRAINT [symbol]] FOREIGN KEY
        [index_name] (col_name,...)
        reference_definition
  | ADD [CONSTRAINT [symbol]] CHECK (expr) [[NOT] ENFORCED]
  | DROP {CHECK | CONSTRAINT} symbol
  | ALTER {CHECK | CONSTRAINT} symbol [NOT] ENFORCED
  | ALGORITHM [=] {DEFAULT | INSTANT | INPLACE | COPY}
  | ALTER [COLUMN] col_name {
        SET DEFAULT {literal | (expr)}
      | SET {VISIBLE | INVISIBLE}
      | DROP DEFAULT
    }
  | ALTER INDEX index_name {VISIBLE | INVISIBLE}
  | CHANGE [COLUMN] old_col_name new_col_name column_definition
        [FIRST | AFTER col_name]
  | [DEFAULT] CHARACTER SET [=] charset_name [COLLATE [=] collation_name]
  | CONVERT TO CHARACTER SET charset_name [COLLATE collation_name]
  | {DISABLE | ENABLE} KEYS
  | {DISCARD | IMPORT} TABLESPACE
  | DROP [COLUMN] col_name
  | DROP {INDEX | KEY} index_name
  | DROP PRIMARY KEY
  | DROP FOREIGN KEY fk_symbol
  | FORCE
  | LOCK [=] {DEFAULT | NONE | SHARED | EXCLUSIVE}
  | MODIFY [COLUMN] col_name column_definition
        [FIRST | AFTER col_name]
  | ORDER BY col_name [, col_name] ...
  | RENAME COLUMN old_col_name TO new_col_name
  | RENAME {INDEX | KEY} old_index_name TO new_index_name
  | RENAME [TO | AS] new_tbl_name
  | {WITHOUT | WITH} VALIDATION
}

partition_options:
    partition_option [partition_option] ...

partition_option: {
    ADD PARTITION (partition_definition)
  | DROP PARTITION partition_names
  | DISCARD PARTITION {partition_names | ALL} TABLESPACE
  | IMPORT PARTITION {partition_names | ALL} TABLESPACE
  | TRUNCATE PARTITION {partition_names | ALL}
  | COALESCE PARTITION number
  | REORGANIZE PARTITION partition_names INTO (partition_definitions)
  | EXCHANGE PARTITION partition_name WITH TABLE tbl_name [{WITH | WITHOUT} VALIDATION]
  | ANALYZE PARTITION {partition_names | ALL}
  | CHECK PARTITION {partition_names | ALL}
  | OPTIMIZE PARTITION {partition_names | ALL}
  | REBUILD PARTITION {partition_names | ALL}
  | REPAIR PARTITION {partition_names | ALL}
  | REMOVE PARTITIONING
}

key_part: {col_name [(length)] | (expr)} [ASC | DESC]

index_type:
    USING {BTREE | HASH}

index_option: {
    KEY_BLOCK_SIZE [=] value
  | index_type
  | WITH PARSER parser_name
  | COMMENT 'string'
  | {VISIBLE | INVISIBLE}
}

table_options:
    table_option [[,] table_option] ...

table_option: {
    AUTOEXTEND_SIZE [=] value
  | AUTO_INCREMENT [=] value
  | AVG_ROW_LENGTH [=] value
  | [DEFAULT] CHARACTER SET [=] charset_name
  | CHECKSUM [=] {0 | 1}
  | [DEFAULT] COLLATE [=] collation_name
  | COMMENT [=] 'string'
  | COMPRESSION [=] {'ZLIB' | 'LZ4' | 'NONE'}
  | CONNECTION [=] 'connect_string'
  | {DATA | INDEX} DIRECTORY [=] 'absolute path to directory'
  | DELAY_KEY_WRITE [=] {0 | 1}
  | ENCRYPTION [=] {'Y' | 'N'}
  | ENGINE [=] engine_name
  | ENGINE_ATTRIBUTE [=] 'string'
  | INSERT_METHOD [=] { NO | FIRST | LAST }
  | KEY_BLOCK_SIZE [=] value
  | MAX_ROWS [=] value
  | MIN_ROWS [=] value
  | PACK_KEYS [=] {0 | 1 | DEFAULT}
  | PASSWORD [=] 'string'
  | ROW_FORMAT [=] {DEFAULT | DYNAMIC | FIXED | COMPRESSED | REDUNDANT | COMPACT}
  | SECONDARY_ENGINE_ATTRIBUTE [=] 'string'
  | STATS_AUTO_RECALC [=] {DEFAULT | 0 | 1}
  | STATS_PERSISTENT [=] {DEFAULT | 0 | 1}
  | STATS_SAMPLE_PAGES [=] value
  | TABLESPACE tablespace_name [STORAGE {DISK | MEMORY}]
  | UNION [=] (tbl_name[,tbl_name]...)
}

partition_options:
    (see CREATE TABLE options)
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

## 修改表语法

如果需要对表做 <strong style="color:red">结构</strong> 上的改变，可以将表删除然后重新创建表，但是这种效率会产生一些额外的工作，数据会重新加载进来，如果此时有服务正在访问的话，也会影响服务读取表中的数据，所以此时，我们需要表的修改语句来对已经创建好的表的定义进行修改。

常用命令：

```sql
ALTER TABLE <tbl_name> MODIFY [COLUMN] <column_definition> [FIRST | AFTER <column_name>];
```

比如我们想要将 `students` 表中的 `name` 由 `varchar(20)` 改为 `varchar(25)`，可以使用如下语句：

```sql
ALTER TABLE students MODIFY name VARCHAR(25);
```

### 修改表名

语法：

```sql
ALTER TABLE <tbl_name> RENAME TO <new_tbl_name>;
```

### 添加表字段

语法：

```sql
ALTER TABLE <tbl_name> ADD <field> INT;
```

如果需要指定新增字段的位置，可以使用 MySQL 提供的关键字 `FIRST`（设定为第一列），`AFTER` 字段名（设定位于某个字段之后）。

尝试以下 `ALTER TABLE` 语句，在执行成功后，使用 `SHOW COLUMNS` 查看表结构的变化：

```sql
ALTER TABLE <tbl_name> DROP <column_name>;
-- 在第一列插入 column_name
ALTER TABLE <tbl_name> ADD <column_name> INT FIRST;
ALTER TABLE <tbl_name> DROP <column_name>;
-- 在 column_name2 之后新增名为 column_name 的列
ALTER TABLE <tbl_name> ADD <column_name> INT AFTER <column_name2>;
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
ALTER TABLE <tbl_name> MODIFY <column_name> <column_definition>;
```

示例：把字段 `nickName` 字段的类型从 `VARCHAR(5)` 该为 `VARCHAR(20)`，可执行以下命令

```sql
ALTER TABLE students MODIFY nick_name VARCHAR(20) DEFAULT NULL COMMENT '昵称';
```

### 修改字段名称

使用 `CHANGE` 子句，语法有很大的不同。在 `CHANGE` 关键字之后，紧跟着的是你要修改的字段名，然后指定新字段名及类型。

语法：

```sql
ALTER TABLE <tbl_name> CHANGE <old_column_name1> <new_column_name1> <column_definition>;
ALTER TABLE <tbl_name> CHANGE <old_column_name2> <new_column_name2> <column_definition> DEFAULT <default_value>;
ALTER TABLE <tbl_name> CHANGE <old_column_name3> <new_column_name3> <column_definition> DEFAULT <default_value> COMMENT "注释";
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
ALTER TABLE <tbl_name> ALTER balance SET DEFAULT 1000;

SHOW COLUMNS FROM <tbl_name>;
```

### 修改表类型

语法：

```sql
ALTER TABLE <tbl_name> ENGINE = MYISAM;
SHOW TABLE STATUS LIKE '<tbl_name>'\G
```

### 删除表字段

语法：

```sql
ALTER TABLE <tbl_name> DROP <column_name>;
```

如果数据表中只剩下一个字段则无法使用 `DROP` 来删除字段。
