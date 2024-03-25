---
nav:
  title: SQL
  order: 2
group:
  title: 数据库和表
  order: 2
title: 创建表
order: 4
---

# 创建表

表是关系数据库中数据存储的基本单位。在 MySQL 中， `CREATE TABLE` 语句用来创建表。

## 语法

完整语法：

```sql
CREATE [TEMPORARY] TABLE [IF NOT EXISTS] tbl_name
  (create_definition,...)
  [table_options]
  [partition_options]

CREATE [TEMPORARY] TABLE [IF NOT EXISTS] tbl_name
  [(create_definition,...)]
  [table_options]
  [partition_options]
  [IGNORE | REPLACE]
  [AS] query_expression

CREATE [TEMPORARY] TABLE [IF NOT EXISTS] tbl_name
  {
    LIKE old_tbl_name | (LIKE old_tbl_name)
  }

create_option: {
    col_name column_definition
  | {INDEX | KEY} [index_name] [index_type] (key_part, ...)
    [index_option] ...
  | {FULLTEXT | SPATIAL} [INDEX | KEY] [index_name] (key_part, ...)
    [index_option] ...
  | [CONSTRAINT [symbol]] PRIMARY KEY
    [index_type] (key_part,...)
    [index_option] ...
  | [CONSTRAINT [symbol]] UNIQUE [INDEX | KEY]
    [index_name] [index_type] (key_part,...)
    [index_option] ...
  | [CONSTRAINT [symbol]] FOREIGN KEY
    [index_name] (col_name,...)
    reference_definition
  | check_constraint_definition
}

column_definition: {
  data_type [NOT NULL | NULL] [DEFAULT {literal | (expr)}]
    [VISIBLE | INVISIBLE]
    [AUTO_INCREMENT] [UNIQUE [KEY]] [[PRIMARY] KEY]
    [COMMENT 'string']
    [COLLATE collation_name]
    [COLUMN_FORMAT {FIXED | DYNAMIC |DEFAULT}]
    [ENGINE_ATTRIBUTE [=] 'string']
    [SECONDARY_ENGINE_ATTRIBUTE [=] 'string']
    [STORAGE {DISK | MEMORY}]
    [reference_definition]
    [check_constraint_definition]
  | data_type
    [COLLATE collation_name]
    [GENERATED ALWAYS] AS (expr)
    [VIRTUAL |STORED] [NOT NULL | NULL]
    [VISIBLE | INVISIBLE]
    [UNIQUE [KEY]] [[PRIMARY] KEY]
    [COMMENT 'string']
    [reference_definition]
    [check_constraint_definition]
}

data_type:
  (see Chapter 13, Data Types)

key_part: {col_name [(length)] | (expr)} [ASC | DESC]

index_type:
  USING {BTREE | HASH}

index_option: {
    KEY_BLOCK_SIZE [=] value
  | index_type
  | WITH PARSER parser_name
  | COMMENT 'string'
  | {VISIBLE | INVISIBLE}
  | ENGINE_ATTRIBUTE [=] 'string'
  | SECONDARY_ENGINE_ATTRIBUTE [=] 'string'
}

check_constraint_definition:
  [CONSTRAINT [symbol]] CHECK (expr) [[NOT] ENFORCED]

reference_definition:
  REFERENCES tbl_name (key_part,...)
    [MATCH FULL | MATCH PARTIAL | MATCH SIMPLE]
    [ON DELETE]
    [ON UPDATE reference_option]

reference_option:
  RESTRICT | CASCADE | SET NULL | NO ACTION | SET DEFAULT

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
  | ENCRYPTOON [=] {'Y' | 'N'}
  | ENGINE [=] engine_name
  | ENGINE_ATTRIBUTE [=] 'string'
  | INSERT_METHOD [=] { NO | FIRST | LAST }
  | KEY_BLOCK_SIZE [=] value
  | MAX_ROWS [=] value
  | MIN_ROWS [=] value
  | PACK_KEYS [=] {0 | 1 | DEFAULT}
  | PASSWORD [=] 'string'
  | ROW_FORMAT [=] {DEFAULT | DYNAMKIC | FIXED | COMPRESSED | REDUNDANT | COMPACT}
  | START TRANSACTION
  | SECONDARY_ENGINE_ATTRIBUTE [=] 'string'
  | STATS_AUTO_RECALC [=] {DEFAULT | 0 | 1}
  | STATS_PERSISTENT [=] {DEFAULT | 0 | 1}
  | STATS_SAMPLE_PAGES [=] value
  | tablespace_option
  | UNION [=] (tbl_name[,tbl_name]...)
}

partition_options:
  PARTITION BY
    {
        [LINEAR] HASH(expr)
      | [LINEAR] KEY [ALGORITHM={1 | 2}] (column_list)
      | RANGE{(expr) | COLUMNS(column_list)}
      | LIST{(expr) | COLUMNS(column_list)}
    }
  [PARTITIONS num]
  [
    SUBPARTITION BY
      { [LINEAR] HASH(expr)
      | [LINEAR] KEY [ALGORITHM={1 | 2}] (column_list) }
    [SUBPARTITIONS num]
  ]
  [(partition_definition [, partition_definition] ...)]

partition_definition:
  PARTITION partition_name
    [VALUES
      {LESS THAN {(expr | value_list) | MAXVALUE}
      |
      IN (value_list)}]
    [[STORAGE] ENGINE [=] engine_name]
    [COMMENT [=] 'string' ]
    [DATA DIRECTORY [=] 'data_dir']
    [INDEX DIRECTORY [=] 'index_dir']
    [MAX_ROWS [=] max_number_of_rows]
    [MIN_ROWS [=] min_number_of_rows]
    [TABLESPACE [=] tablespace_name]
    [(subpartition_definition [, subpartition_definition] ...)]

subpartition_definition:
  SUBPARTITION logical_name
    [[STORAGE] ENGINE [=] engine_name]
    [COMMENT [=] 'string' ]
    [DATA DIRECTORY [=] 'data_dir']
    [INDEX DIRECTORY [=] 'index_dir']
    [MAX_ROWS [=] max_number_of_rows]
    [MIN_ROWS [=] min_number_of_rows]
    [TABLESPACE [=] tablespace_name]

tablespace_option:
    TABLESPACE tablespace_name [STORAGE DISK]
  | [TABLESPACE tablespace_name] STORAGE MEMORY

query_expression:
  SELECT ...   (Some valid select or union statement)
```

### 创建表语法参数

`create_option` 语法说明：

| 关键字                      | 参数                         | 说明                                                                                                  | 是否可选 |
| :-------------------------- | :--------------------------- | :---------------------------------------------------------------------------------------------------- | :------- |
| col_name                    | column_definition            | 指定列的名称和列定义。例如： `id INT NOT NULL AUTO_INCREMENT` 。                                      | 必填     |
| INDEX                       | index_name 可选              | 定义**普通索引**。可以为索引指定名称，指定索引所包含的列。                                            | 可选     |
| KEY                         | index_name 可选              | 与 INDEX 关键字相同，用于定义普通索引。                                                               | 可选     |
| FULLTEXT INDEX              | index_name 可选              | 定义**全文索引**。可以为索引指定名称，指定索引所包含的列。                                            | 可选     |
| SPATIAL INDEX               | index_name 可选              | 定义**空间索引**。可以为索引指定名称，指定索引所包含的列。                                            | 可选     |
| CONSTRAINT                  | symbol 可选                  | 定义**约束**。可以为约束指定名称。                                                                    | 可选     |
| PRIMARY KEY                 | index_type 可选              | 定义**主键**。可以为主键指定索引类型和所包含的列。                                                    | 可选     |
| UNIQUE                      | INDEX \| KEY index_name 可选 | 定义**唯一键**。可以为唯一键指定索引名称和所包含的列。                                                | 可选     |
| FOREIGN KEY                 | index_name col_name          | 定义**外键**。可以为外键指定索引名称和所包含的列。                                                    | 可选     |
| reference_definition        | -                            | 定义**外键的引用约束**。通常包括 REFERENCES 子句，指定引用的表和列，以及其他操作选项。                | 可选     |
| check_constraint_definition | -                            | 定义 **CHECK 约束**，用于在插入或更新数据时检查列值是否满足指定条件。通常包括一个返回布尔值的表达式。 | 可选     |

`column_definition` 语法说明：

| 关键字                      | 参数                          | 说明                                                              | 是否可选 |
| :-------------------------- | :---------------------------- | :---------------------------------------------------------------- | :------- |
| data_type                   | 数据类型                      | 指定列的数据类型。                                                | 必选     |
| NOT NULL \| NULL            | -                             | 指定列**是否允许为空**值。                                        | 可选     |
| DEFAULT                     | `literal \| expr`             | 指定列的**默认值**                                                | 可选     |
| VISIBLE \| INVISIBLE        | -                             | 指定列**是否可见**。                                              | 可选     |
| AUTO_INCREMENT              | -                             | 指定列为**自增长**。                                              | 可选     |
| UNIQUE [KEY]                | -                             | 指定列的值**必须唯一**。                                          | 可选     |
| [PRIMARY] KEY               | -                             | 指定列为**主键**。                                                | 可选     |
| COMMENT                     | `'string` '                   | 为列添加**注释**。                                                | 可选     |
| COLLATE                     | collation_name                | 指定列的**排序规则**。                                            | 可选     |
| COLUMN_FORMAT               | `FIXED \| DYNAMIC \| DEFAULT` | 指定列的**存储格式**。                                            | 可选     |
| ENGINE_ATTRIBUTE            | `'string'`                    | 定义**特定存储引擎的属性**。                                      | 可选     |
| SECONDARY_ENGINE_ATTRIBUTE  | `'string'`                    | 定义**特定存储引擎的次要属性**。                                  | 可选     |
| STORAGE                     | `DISK \| MEMORY`              | 指定列的**存储位置**。                                            | 可选     |
| GENERATED ALWAYS            | -                             | 定义为**生成列**，根据表中其他列的值自动生成的列。                | 可选     |
| VIRTUAL \| STORED           | -                             | 指定生成列是**虚拟的**还是**存储的**。                            | 可选     |
| reference_definition        | -                             | 定义列的**引用约束**。                                            | 可选     |
| check_constraint_definition | -                             | 定义 CHECK 约束，用于在插入或更新数据时检查列值是否满足指定条件。 | 可选     |

DEFAULT 默认值关键字可跟两种类型的参数：

* literal：这是指一个**具体的值**，例如一个字符串、数字或日期等。当新插入的行没有提供该列的值时，将会使用这个默认值。
* (expr): 这表示一个**表达式**，可以是任何有效的表达式，可以引用其他列或函数。当新插入的行没有提供该列的值时，将会计算这个表达式的值作为默认值。

VISIBLE 或 INVISIBLE 用于指定列的可见性：

* VISIBLE 指定列是**可见的**。这意味着该列将会显示在查询结果中，用户可以看到并使用该列。
* INVISIBLE 指定列是**不可见的**。这意味着该列将不会在查询结果中显示，用户不能直接看到该列。但是，仍然可以在 SQL 语句中使用该列，例如在 WHERE 子句或者计算字段中。 INVISIBLE 的主要作用是隐藏那些对于终端用户来说不必要或者不希望暴露的列，但是仍然保留在表结构中供开发人员或者某些特定的使用场景使用。

COLLATE 关键字用于指定列的排序规则（或者称为字符集校对规则）。排序规则决定了在对包含文本数据的列进行排序和比较时所使用的规则。以下是 MySQL 中常见的排序规则：

* utf8_general_ci: 使用 UTF-8 字符集，以不区分大小写的方式比较字符串。通常用于多语言环境下的一般性排序。
* utf8_unicode_ci: 也使用 UTF-8 字符集，但比 utf8_general_ci 更严格地进行排序，尤其在某些语言（如德语）的排序上会有所不同。
* latin1_swedish_ci: 使用 Latin1 字符集，以不区分大小写的方式比较字符串。这是一个常见的排序规则，特别在欧洲的一些地区使用较多。
* utf8mb4_general_ci: 类似于 utf8_general_ci，但支持更广泛的 Unicode 字符集，包括 Emoji 表情等。适用于需要更全面的字符支持的情况。
* utf8mb4_unicode_ci: 类似于 utf8_unicode_ci，但支持更广泛的 Unicode 字符集，适用于对多语言排序有更严格要求的情况。
* binary: 以二进制方式比较字符串，区分大小写。这个排序规则直接按照字符串的字节顺序进行比较，不考虑字符编码或语言规则。

COLUMN_FORMAT 关键字用于指定存储引擎如何处理列的存储格式。这个关键字主要用于在创建或修改表时对列进行配置。在 MySQL 中，主要有三种列格式：

* FIXED: 表示**固定长度**的列格式。对于这种格式，存储引擎将为每行中的每个值分配固定长度的存储空间，不受实际值的大小影响。
* DYNAMIC: 表示**动态长度**的列格式。对于这种格式，存储引擎将根据实际值的大小动态分配存储空间。这种格式可以节省存储空间，但可能会影响查询性能。
* DEFAULT: 如果未指定 COLUMN_FORMAT，则使用存储引擎的默认列格式。

<!-- `data_type` 语法说明： -->

`key_part` 语法说明：

| 关键字      | 参数         | 说明                                                                      | 是否可选 |
| :---------- | :----------- | :------------------------------------------------------------------------ | :------- |
| col_name    | 列名         | 指定要作为索引键的列名。                                                  | 必选     |
| length      | 整数         | 指定列名的前缀长度，仅当需要在索引中使用列名的一部分时才需要。            | 可选     |
| expr        | 有效的表达式 | 指定表达式作为索引键，可以是任何有效的表达式，如函数调用或计算列。        | 必选     |
| ASC \| DESC | -            | 指定索引键的排序顺序。默认为 ASC（升序）。如果指定了 DESC，则为降序排序。 | 可选     |

`index_type` 语法说明：

| 关键字 | 参数            | 说明                                     | 是否可选 |
| :----- | :-------------- | :--------------------------------------- | :------- |
| USING  | `BTREE \| HASH` | 指定索引的类型。可选值为 BTREE 或 HASH。 | 必选     |

`index_option` 语法说明：

| 关键字                     | 参数  | 说明                                               | 是否可选 |
| :------------------------- | :---- | :------------------------------------------------- | :------- |
| KEY_BLOCK_SIZE             | value | 指定索引的键块大小。                               | 可选     |
| index_type                 | -     | 指定索引的类型，可以是 USING BTREE 或 USING HASH。 | 可选     |
| WITH PARSER                |       | 指定用于索引的解析器。                             | 可选     |
| COMMENT                    |       | 为索引添加注释。                                   | 可选     |
| VISIBLE \| INVISIBLE       |       | 指定索引是可见还是不可见。                         | 可选     |
| ENGINE_ATTRIBUTE           |       | 定义特定存储引擎的索引属性。                       | 可选     |
| SECONDARY_ENGINE_ATTRIBUTE |       | 定义特定存储引擎的次要索引属性。                   | 可选     |

`check_constraint_definition` 语法说明：

| 关键字         | 参数     | 说明                                                                                | 是否可选 |
| :------------- | :------- | :---------------------------------------------------------------------------------- | :------- |
| CONSTRAINT     | [symbol] | 指定约束的名称。                                                                    | 可选     |
| CHECK          | (expr)   | 指定用于检查数据的条件。                                                            | 必选     |
| [NOT] ENFORCED | -        | 指定约束是否强制执行。默认为 ENFORCED，可以选择 NOT ENFORCED 来禁用约束的强制执行。 | 可选     |

`reference_definition` 语法说明：

| 关键字     | 参数             | 说明                                             | 是否可选 |
| :--------- | :--------------- | :----------------------------------------------- | :------- |
| REFERENCES | tbl_name         | 指定引用的表名。                                 | 必选     |
|            | (key_part, ...)  | 指定引用表中的键列                               | 必选     |
| MATCH      | tbl_name         | 指定匹配类型，可选值为 FULL、PARTIAL 或 SIMPLE。 | 可选     |
| ON DELETE  | -                | 指定删除主表中记录时的行为。                     | 可选     |
| ON UPDATE  | reference_option | 指定更新主表中记录时的行为。                     | 可选     |

`reference_option` 语法说明：

| 关键字      | 参数 | 说明                                               | 是否可选 |
| :---------- | :--- | :------------------------------------------------- | :------- |
| RESTRICT    | -    | 限制外键约束的行为，防止删除或更新关联行。         | 可选     |
| CASCADE     | -    | 如果主表中的行被删除或更新，将级联执行相同操作。   | 可选     |
| SET NULL    | -    | 如果主表中的行被删除或更新，将外键列设置为 NULL。  | 可选     |
| NO ACTION   | -    | 不执行任何操作，拒绝删除或更新关联行。             | 可选     |
| SET DEFAULT | -    | 如果主表中的行被删除或更新，将外键列设置为默认值。 | 可选     |

### 数据表语法参数

`table_options` 语法说明：

| 关键字       | 参数 | 说明                           | 是否可选 |
| :----------- | :--- | :----------------------------- | :------- |
| table_option | -    | 表选项，可以包含一个活多个参数 | 必选     |

`table_option` 语法说明：

| 关键字                            | 参数                                                              | 说明                 | 是否可选 |
| :-------------------------------- | :---------------------------------------------------------------- | :------------------- | :------- |
| AUTOEXTEND_SIZE                   | value                                                             | 自动扩展大小         | 可选     |
| AUTO_INCREMENT                    | value                                                             | 自增值               | 可选     |
| AVG_ROW_LENGTH                    | value                                                             | 平均行长度           | 可选     |
| [DEFAULT]  CHARACTER SET          | charset_name                                                      | 默认字符集           | 可选     |
| CHECKSUM                          | `0` \| `1`                                                        | 校验和               | 可选     |
| [DEFAULT] COLLATE                 | collation_name                                                    | 默认排序规则         | 可选     |
| COMMENT                           | `'string'`                                                        | 表注释               | 可选     |
| COMPRESSION                       | `'ZLIB'` \| `'LZ4'` \| `'NONE'`                                   | 压缩算法             | 可选     |
| CONNECTION                        | `'connect_string'`                                                | 连接字符串           | 可选     |
| DATA DIRECTORY 或 INDEX DIRECTORY | `'absolute path to directory'`                                    | 数据或索引目录       | 可选     |
| DELAY_KEY_WRITE                   | `0` \| `1`                                                        | 延迟写入关键字       | 可选     |
| ENCRYPTOON                        | `Y` \| `N`                                                        | 加密开关             | 可选     |
| ENGINE                            | engine_name                                                       | 存储引擎             | 可选     |
| ENGINE_ATTRIBUTE                  | `'string'`                                                        | 引擎属性             | 可选     |
| INSERT_METHOD                     | NO \| FIRST \| LAST                                               | 插入方法             | 可选     |
| KEY_BLOCK_SIZE                    | value                                                             | 键块大小             | 可选     |
| MAX_ROWS                          | value                                                             | 最大行数             | 可选     |
| MIN_ROWS                          | value                                                             | 最小行数             | 可选     |
| PACK_KEYS                         | `0` \| `1` \| DEFAULT                                             | 键打包               | 可选     |
| PASSWORD                          | `'string'`                                                        | 密码                 | 可选     |
| ROW_FORMAT                        | DEFAULT \| DYNAMIC \| FIXED \| COMPRESSED \| REDUNDANT \| COMPACT | 行格式               | 可选     |
| START TRANSACTION                 | -                                                                 | 开始事务             | 可选     |
| SECONDARY_ENGINE_ATTRIBUTE        | `'string'`                                                        | 次要引擎属性         | 可选     |
| STATS_AUTO_RECALC                 | DEFAULT \| 0 \| 1                                                 | 自动重新计算统计信息 | 可选     |
| STATS_PERSISTENT                  | DEFAULT \| 0 \| 1                                                 | 统计信息持久化       | 可选     |
| STATS_SAMPLE_PAGES                | value                                                             | 统计信息样本页数     | 可选     |
| tablespace_option                 | -                                                                 | 表空间选项           | 可选     |
| UNION                             | (tbl_name [, tbl_name]...)                                        | 联合表               | 可选     |

### 分区语法参数

`partition_options` 语法说明：

| 关键字       | 参数 | 说明                   | 是否可选 |
| :----------- | :--- | :--------------------- | :------- |
| PARTITION BY | -    | 指定表的分区方式和参数 | 必选     |

`partition_definition` 语法说明：

| 关键字                  | 参数               | 说明                     | 是否可选 |
| :---------------------- | :----------------- | :----------------------- | :------- |
| PARTITION               | partition_name     | 指定分区的名称。         | 必选     |
| VALUES                  | -                  | 指定分区值。             | 可选     |
| ENGINE                  | engine_name        | 指定分区使用的存储引擎。 | 可选     |
| COMMENT                 | `'string'`         | 为分区添加注释。         | 可选     |
| DATA DIRECTORY          | `'data_dir'`       | 指定分区数据的目录。     | 可选     |
| INDEX DIRECTORY         | `'index_dir'`      | 指定分区索引的目录。     | 可选     |
| MAX_ROWS                | max_number_of_rows | 指定分区的最大行数。     | 可选     |
| MIN_ROWS                | min_number_of_rows | 指定分区的最小行数。     | 可选     |
| TABLESPACE              | tablespace_name    | 指定分区的表空间         | 可选     |
| subpartition_definition | -                  | 指定分区的子分区定义。   | 可选     |

`subpartition_definition` 语法说明：

| 关键字           | 参数               | 说明                                                   | 是否可选 |
| :--------------- | :----------------- | :----------------------------------------------------- | :------- |
| SUBPARTITION     | logical_name       | 指定子分区的逻辑名称。                                 | 必选     |
| [STORAGE] ENGINE | engine_name        | 子分区存储引擎类型（默认情况下，使用父分区的存储引擎） | 可选     |
| COMMENT          | `'string'`         | 子分区的注释                                           | 可选     |
| DATA DIRECTORY   | `'data_dir'`       | 子分区数据存储路径                                     | 可选     |
| INDEX DIRECTORY  | `'index_dir'`      | 子分区索引存储路径                                     | 可选     |
| MAX_ROWS         | max_number_of_rows | 子分区的最大行数                                       | 可选     |
| MIN_ROWS         | min_number_of_rows | 子分区的最小行数                                       | 可选     |
| TABLESPACE       | tablespace_name    | 子分区的表空间名称                                     | 可选     |

`tablespace_option` 语法说明：

| 关键字         | 参数            | 说明                                                       | 是否可选 |
| :------------- | :-------------- | :--------------------------------------------------------- | :------- |
| TABLESPACE     | tablespace_name | 指定表空间名称（用于将表或索引存储在指定的表空间中）       | 必选     |
| STORAGE DISK   | -               | 指定表空间存储在磁盘上（用于将表或索引存储在磁盘表空间中） | 可选     |
| STORAGE MEMORY | -               | 指定表空间存储在内存中（用于将表或索引存储在内存表空间中） | 可选     |

其他说明：

* 表名可由字母、数字、下划线和美元符号组成，列名长度在 64 个字符以内。
* 表名在一个数据库中是唯一的。
* 新建的表会在当前默认的数据库中。如果还没有选择数据库，请使用 `db_name.table_name` 格式指定要新建的表所在的数据库。
* 如果你给定一个已经存在的表名，又没有使用 `IF NOT EXISTS` 子句，服务器会返回一个错误。
* 列名可由字母、数字、下划线和美元符号组成，列名长度在 64 个字符以内。列名在一个表中是唯一的。
* 当表名或者字段名含有空格或者其他特殊字字符时，请使用反引号（<code>`</code>）包围起来。
* 如果不指定 `ENGINE` 选项，则采用服务器默认的存储引擎。自 MySQL 5.5 版以来，服务器默认的引擎是由 MyISAM 变成了 `InnoDB`。

## 基本用法

### 创建简单的表

假设我们要创建一个简单的用户表，其中包含用户的 ID、姓名和年龄。

```sql
CREATE TABLE Users (
  UserID INT PRIMARY KEY,
  UserName VARCHAR(50),
  Age INT
);
```

在这个示例中：

- `Users` 是表的名称
- `UserID`、`UserName` 和 `Age` 是列的名称
- `INT` 是整数数据类型，`VARCHAR(50)` 是可变长度字符串数据类型，括号内的数字表示字符的最大长度
- `PRIMARY KEY` 将 `UserID` 列指定为主键，确保每个用户的 ID 都是唯一的。

### 指定默认值和非空约束

假设我们要创建一个包含商品信息的表，其中包括商品ID、名称、价格和库存量，同时指定价格的默认值为 0。

```sql
CREATE TABLE Products (
  ProductID INT PRIMARY KEY,
  Name VARCHAR(100),
  Price DECIMAL(10, 2) DEFAULT 0,
  StockQuantity INT NOT NULL
);
```

在这个示例中：

- `DECIMAL(10, 2)` 表示十进制数字，其中 10 表示总位数，2 表示小数位数
- `DEFAULT 0` 指定了价格列的默认值为 0
- `NOT NULL` 约束确保库存量列不允许为空

### 指定外键约束

假设我们要创建一个订单表，其中包含订单ID、顾客ID、订单日期和订单总金额，并指定顾客ID是来自另一个表的外键。

```sql
CREATE TABLE Orders (
  OrderID INT PRIMARY KEY,
  CUstomerID INT,
  OrderDate DATE,
  TotalAmount DECIMAL(10, 2),
  FOREIGN KEY (CustomerID) PREFERENCES Customers(CustomerID)
);
```

在这个示例中：

- `FOREIGN KEY (CustomerID) PREFERENCES Customers(CustomerID)` 指定了 `CustomerID` 列是来自另一个名为 `Customers` 的表的外键。这确保了每个订单的顾客 ID 必须存在于顾客表中。

### 克隆表

`CREATE TABLE ... LIKE` 语句可以用来克隆另一个表的定义。它以另一个表的定义为基础创建一个新的空表，包含了原表中定义的列属性和索引。

```sql
CREATE TABLE <new_table_name> LIKE <original_table_name>;
```

### 克隆表并包含列和数据

`CREATE TABLE ... SELECT` 语句可实现从另一个表创建一个新表。该语句会依据 `SELECT` 子句中的列创建新表，并将 `SELECT` 的结果集插入到新表中。

```sql
CREATE TABLE <new_table_name> [AS] SELECT * FROM <original_table_name>;
```

`CREATE TABLE ... SELECT` 语句可以用来复制一个表，包含列属性和数据。