---
nav:
  title: SQL
  order: 2
group:
  title: 数据库和表
  order: 2
title: 修改数据库
order: 4
---

# 修改数据库

通过 `ALTER DATABASE` 或 `ALTER SCHEMA` 语句可以修改已存在的数据库的特性。这包括改变数据库的默认字符集和排序规则等。通过执行这个语句，用户可以对数据库的全局属性进行调整，比如设置数据库的默认编码方式，以支持多语言数据的存储和正确的排序。

## 语法

```sql
ALTER {DATABASE | SCHEMA} [db_name]
    alter_option ...

alter_option: {
    [DEFAULT] CHARACTER SET [=] charset_name
  | [DEFAULT] COLLATE [=] collation_name
  | [DEFAULT] ENCRYPTION [=] {'Y' | 'N'}
  | READ ONLY [=] {DEFAULT | 0 | 1}
}
```

| 参数名         | 数据类型   | 描述                                                   | 是否可选 |
| :------------- | :--------- | :----------------------------------------------------- | :------- |
| db_name        | 字符串     | 要修改的数据库名。                                     | 否       |
| charset_name   | 字符串     | 指定数据库的默认字符集。                               | 否       |
| collation_name | 字符串     | 指定数据库的默认校对规则。                             | 否       |
| ENCRYPTION     | `Y` 或 `N` | 设置数据库的加密状态（'Y' 表示加密，'N' 表示不加密）。 | 否       |
| READ ONLY      | `1` 或 `0` | 设置数据库的只读状态（1 表示只读，0 表示非只读）。     | 否       |

- `[DEFAULT] CHARACTER SET [=] charset_name`: 设置或更改数据库的默认字符集。可以使用 `DEFAULT` 关键字，也可以省略。= 是可选的。
- `[DEFAULT] COLLATE [=] collation_name`: 设置或更改数据库的默认校对规则。可以使用 `DEFAULT` 关键字，也可以省略。= 是可选的。
- `[DEFAULT] ENCRYPTION [=] {'Y' | 'N'}`: 设置数据库的加密状态，`'Y'` 表示加密，而 `'N'` 表示不加密。可以使用 `DEFAULT` 关键字，也可以省略。= 是可选的。
- `READ ONLY [=] {DEFAULT | 0 | 1}`: 设置数据库的只读状态。`1` 表示只读，`0` 表示非只读，DEFAULT 表示恢复到默认状态。= 是可选的。

这些选项允许数据库管理员调整数据库的基础设置，如字符集和校对规则，以支持不同的语言和排序规则，以及调整数据库的安全性和访问控制设置。

## 代码示例

### 修改字符集

假设你想要将数据库 `my_database` 的默认字符集更改为 `utf8mb4`，可以使用如下命令：

```sql
ALTER DATABASE my_database
CHARACTER SET = 'utf8mb4';
```

### 修改校对规则

如果你想要设置数据库 `my_database` 的默认校对规则为 `utf8mb4_unicode_ci`，命令如下：

```sql
ALTER DATABASE my_database
COLLATE = 'utf8mb4_unicode_ci';
```

### 设置数据库加密

假设你需要开启数据库 `my_database` 的加密功能，可以使用：

```sql
ALTER DATABASE my_database
ENCRYPTION = 'Y';
```

### 设置数据库为只读

如果出于维护或其他原因，你需要将数据库 `my_database` 设置为只读模式，可以这样做：

```sql
ALTER DATABASE my_database
READ ONLY = 1;
```

反之，如果你想将数据库从只读模式恢复为正常模式，可以使用：

```sql
ALTER DATABASE my_database
READ ONLY = 0;
```

这些示例展示了如何使用 `ALTER DATABASE` 命令来修改数据库的字符集、校对规则、加密状态和只读状态。每个命令都以 `ALTER DATABASE` 开始，后面跟着要修改的数据库名称和你希望应用的更改。希望这些示例对你有所帮助！

[官方文档：ALTER DATABASE Statement](https://dev.mysql.com/doc/refman/8.0/en/alter-database.html)