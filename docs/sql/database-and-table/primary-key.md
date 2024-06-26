---
nav:
  title: SQL
  order: 2
group:
  title: 数据库和表
  order: 2
title: 主键
order: 20
---

# 主键

主键（Primary Key）是一种用于唯一标识表中每一行数据的特殊列或一组列。主键的作用是确保表中的每一行都有一个唯一标识符，这样可以方便地对表中的数据进行检索、更新和删除操作，同时保证数据的完整性和一致性。

## 特性

以下是主键的一些关键特点：

- 唯一性：主键列中的值**必须是唯一**的，即每个主键值**只能在表中出现一次**。这确保了表中的**每一行都有一个唯一的标识符**。
- 非空性：主键列**不允许包含空值（NULL）**。这意味着主键列中的值不能为空，确保了**每一行都有一个有效的标识符**。
- 自动索引：主键列**默认情况下会创建索引**（称为主键索引），这使得在主键上的查找操作非常高效。通过主键索引，数据库系统可以快速定位表中特定行的数据，提高了查询性能。

如果不遵循上面的规则，则可能会引发以下的错误。

- 如果定义了多个主键，会返回错误：`ERROR 1068 (42000): Multiple primary key defined`。
- 如果插入或者更新时有重复的主键值，则会返回类似的错误：`ERROR 1062 (23000): Duplicate entry '1' for key 'user.PRIMARY'`。
- 如果插入了 NULL 值，则会返回类似的错误：`ERROR 1048 (23000): Column 'id' cannot be null`。

## 主键类型

- 单列主键：只由一个字段组成的主键。
- 复合主键：由两个或多个字段组成的主键，用于当单个字段无法保证唯一性时。


## 创建主键

当创建主键时，你可以在创建表的时候定义它，或者在表已经存在之后添加主键。下面我将详细解释这两种情况，并提供相应的 SQL 示例代码。

### 在表创建时定义主键

#### 创建单列主键

假设我们要创建一个包含用户信息的表，其中 `user_id` 是唯一标识每个用户的字段，我们可以将它设置为主键：

```sql
CREATE TABLE users (
    user_id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100),
    PRIMARY KEY (user_id)
);
```

在这个例子中，`user_id` 被定义为主键，同时设置为 `AUTO_INCREMENT`，这意味着每当插入新记录时，MySQL 会自动为 `user_id` 生成一个唯一的递增值。

#### 创建复合主键

假设我们有一个记录书籍借阅信息的表，需要通过组合 user_id 和 book_id 来唯一标识每条借阅记录，我们可以创建一个复合主键：

```sql
CREATE TABLE book_loans (
    user_id INT NOT NULL,
    book_id INT NOT NULL,
    loan_date DATE NOT NULL,
    return_date DATE,
    PRIMARY KEY (user_id, book_id)
);
```

在这个例子中，`user_id` 和 `book_id` 一起作为复合主键，这样就能保证同一本书不会被同一个用户重复借阅。

### 在表创建后添加主键

如果表已经被创建，但是没有定义主键，你可以使用 ALTER TABLE 语句来添加一个新的主键。这对于已经存在的表结构调整尤其有用。

#### 添加单列主键

假设我们已经创建了一个用户表，但是忘记设置主键，现在我们想要把 `user_id` 字段设置为主键：

```sql
ALTER TABLE users ADD PRIMARY KEY (user_id);
```

这条语句会将 `user_id` 设置为主键。

#### 添加复合主键

如果我们需要在现有的表上创建一个复合主键，可以通过指定多个列来完成：

```sql
ALTER TABLE book_loans ADD PRIMARY KEY (user_id, book_id);
```

这条语句将 `user_id` 和 `book_id` 作为一组复合主键，确保了每条借阅记录的唯一性。

通过这些示例，你应该对如何在 MySQL 中创建和管理主键有了基本的了解。主键是数据库设计中非常重要的一部分，正确使用它们可以确保数据的完整性和效率。

## 删除主键

在某些情况下，你可能需要删除一个表的主键约束，比如在重新设计表结构或调整数据模型时。使用 `ALTER TABLE` 语句可以实现这一点。

示例：删除主键

假设我们有一个 `users` 表，现在需要删除 `user_id` 字段上的主键约束。可以使用以下 SQL 语句：

```sql
ALTER TABLE users DROP PRIMARY KEY;
```

这条语句会从 `users` 表中删除当前的主键约束。需要注意的是，如果主键是自增 (AUTO_INCREMENT) 的，删除主键也会移除自增属性，你可能需要再次手动设置它。

## 修改主键

修改主键实质上包含了**删除现有主键**和**创建新主键**两个步骤。由于 MySQL 不支持直接修改主键，你需要先删除现有的主键，然后再添加一个新的主键。

示例：修改单列主键

如果我们想要将 `users` 表的主键从 `user_id` 改为 `email`，可以通过以下步骤实现：

删除现有的主键：

```sql
ALTER TABLE users DROP PRIMARY KEY;
```

添加新的主键：

```sql
ALTER TABLE users ADD PRIMARY KEY (email);
```

在执行这些操作之前，确保新的主键列（在这个例子中是 email）满足主键的所有条件，即它们必须是唯一的且不包含 NULL 值。

示例：修改复合主键

假设 `book_loans` 表有一个复合主键，由 `user_id` 和 `book_id` 组成，现在我们需要添加一个 `loan_date` 字段到这个复合主键中，可以采用以下步骤：

删除现有的复合主键：

```sql
ALTER TABLE book_loans DROP PRIMARY KEY;
```

添加新的复合主键，包含额外的字段：

```sql
ALTER TABLE book_loans ADD PRIMARY KEY (user_id, book_id, loan_date);
```

这种方式可以让你根据业务需求或数据模型的变化调整主键。

在进行主键修改操作时，特别注意数据的一致性和完整性。确保在删除和添加主键操作之间，表中的数据满足新主键的约束条件。此外，这些操作可能会影响到依赖于原主键的外键关系，因此在执行之前需要进行彻底的规划和测试。

## 自增主键

自增主键是数据库中一种常用的技术，特别是在需要自动为每条记录生成唯一标识符的场景中。在 MySQL 中，自增主键允许你在插入新记录时自动生成一个唯一的数字标识符。这里，我会详细讲解自增主键的概念、如何创建它们，以及使用时的一些注意事项。

### 创建自增主键

**在表创建时定义自增主键**

在创建表时，可以直接将某个字段指定为自增主键。通常，这个字段是表的第一个字段，并被定义为整型（如 INT 或 BIGINT）。

```sql
CREATE TABLE users (
    user_id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(50),
    email VARCHAR(100),
    PRIMARY KEY (user_id)
);
```

在这个例子中，`user_id` 被设置为自增主键。这意味着每当执行插入操作而没有指定 `user_id` 的值时，MySQL 会自动为这个字段分配下一个可用的数字。

**在表创建后添加自增主键**

如果表已经存在，你可以通过修改表结构来将某个字段设置为自增。首先，确保该字段是表的主键或者至少是一个唯一索引的一部分。

```sql
ALTER TABLE users MODIFY user_id INT AUTO_INCREMENT;
```

这条语句将 `user_id` 修改为自增属性，前提是 `user_id` 已经是主键或唯一索引的一部分。

> 注意：
> 1. MySQL 不会重用删除的序列值


## 注意事项

在使用主键时，确保数据的一致性、完整性和性能是非常关键的。以下是使用主键时需要特别注意的一些事项：

- 选择合适的主键
  - 唯一性：主键必须保证对于表中的每条记录都是唯一的。这是最基本也是最重要的规则。
  - 简洁性：尽可能选择较短的主键。这有助于提高数据库的性能，因为它减少了索引的大小和维护索引的成本。
  - 不变性：主键一旦为一条记录分配，就不应该更改。选择那些不会随时间改变的列作为主键。
  - 连续性：虽然并非绝对必要，但使用自增主键可以保证新记录总是有一个连续增加的唯一标识符，这可以在某些情况下提高性能。
- 避免使用外部数据作为主键
  - 尽量不要使用有实际意义的数据（如社会保障号码、员工编号等）作为主键，因为这些数据可能会因为业务规则的变化而发生变动。
- 考虑使用自增主键
  - 对于很多应用场景，使用自增整数作为主键是一个简单且有效的选择，它能确保每条记录的唯一性，并且插入速度快。
- 小心处理复合主键
  - 当单个字段无法保证唯一性时，可能会使用到复合主键。在使用复合主键时，需要特别注意它们的组合是否真的能够保证每条记录的唯一性，并考虑到查询和维护复合主键可能带来的额外复杂性。
- 主键与性能
  - 主键的选择和设计会直接影响到数据库的查询和插入性能。一个良好设计的主键会使索引更高效，进而加速查询和插入操作。
  - 考虑到索引大小，选择较小的数据类型作为主键，如 INT 而不是 BIGINT，可以在不牺牲功能的情况下提升性能。
- 处理主键的变更
  - 修改主键是一项风险较高的操作，可能会影响到依赖该主键的外键关系。在修改主键前，需要进行彻底的规划和测试，确保不会破坏数据的完整性。
- 避免依赖默认值
  - 在设计数据库时，避免让主键列依赖于数据库的默认值设置（除非是自增主键），应明确指定每条记录的主键值，以确保数据的清晰和一致性。
  - 通过遵循这些准则，你可以确保数据库设计的健壮性和高效性，同时避免将来可能出现的问题。主键是数据库设计中的基石，正确处理它们对于保持数据完整性和提高性能至关重要。