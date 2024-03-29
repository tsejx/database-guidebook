---
nav:
  title: SQL
  order: 2
group:
  title: 数据库和表
  order: 2
title: 添加列
order: 22
---

# 添加列

在 MySQL 中，添加列是调整表结构的一个常见操作，可以帮助你根据应用需求的变化来更新数据模型。

## 基本语法

添加列的基本操作可以通过 `ALTER TABLE` 语句实现：

```sql
ALTER TABLE table_name
ADD COLUMN column_name datatype;
```

这里，`table_name` 是你要修改的表名，`column_name` 是新添加的列名，`datatype` 是列的数据类型。

## 指定位置

### 首位

如果你想将新列添加到表的开头，可以使用 `FIRST` 关键字：

```sql
ALTER TABLE table_name
ADD COLUMN column_name datatype FIRST;
```

### 特定列之后

要在已存在的某列后添加新列，使用 `AFTER` 关键字：

```sql
ALTER TABLE table_name
ADD COLUMN column_name datatype AFTER another_column;
```

## 设置默认值

你可以为新列指定一个默认值：

```sql
ALTER TABLE table_name
ADD COLUMN column_name datatype DEFAULT 'default_value';
```

## 添加注释

为新添加的列添加注释可以增加数据库的可读性：

```sql
ALTER TABLE table_name
ADD COLUMN column_name datatype COMMENT 'your_comment';
```

## 使用修改类型

新列的数据类型可以是 MySQL 支持的任何类型，如 INT, VARCHAR, DATE 等。

约束条件

非空约束

使用 NOT NULL 确保列中的每个记录都必须有值：

```sql
ALTER TABLE table_name
ADD COLUMN column_name datatype NOT NULL;
```

唯一约束

```sql
ALTER TABLE table_name
ADD COLUMN column_name datatype UNIQUE;
```


自增列（AUTO_INCREMENT）是一种特殊的列，用于在新记录插入表时自动生成唯一的标识符。这种机制在处理需要唯一键的场景（如主键）时非常有用。

自增列是 MySQL 中的一个特殊的列，该列的值可由 MySQL 服务器自动生成，并且是一个按升序增长的正整数序列。自增列能够被用来为表的新行产生唯一的标识。

## 创建自增列

在创建表时指定：在定义表结构时，通过在列定义中添加 AUTO_INCREMENT 关键字来创建自增列。

```sql
CREATE TABLE table_name (
    column_name data_type AUTO_INCREMENT,
    ...
    PRIMARY KEY (column_name)
);
```

- AUTO_INCREMENT：这个关键字用于设置列为自增，每当插入新记录时，该列的值会自动递增。
- PRIMARY KEY：自增列通常设置为表的主键，确保每条记录都有一个唯一的标识。

假设我们需要创建一个用户表 `users`，其中 `id` 为自增主键，`username` 存储用户的名称：

```sql
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);
```

在这个例子中，`id` 列被设置为自增，意味着每当我们插入一个新用户时，`id` 的值会自动增加，无需手动指定。

向上述 `users` 表插入数据时，可以省略 `id` 列或者为它提供 `NULL` 值，如下所示：

```sql
INSERT INTO users (username) VALUES ('Alice');
```

## 注意事项

- 性能影响：在大型表上添加列可能会导致性能下降，因为这可能会触发表的重建。
- 数据一致性：添加列时要考虑数据一致性，尤其是当添加的列与表中已有数据相关联时。