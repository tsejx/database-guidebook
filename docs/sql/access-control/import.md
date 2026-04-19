---
nav:
  title: SQL
  order: 2
group:
  title: 高级用法
  order: 4
title: 导入
order: 89
---

# 导入

本文档说明如何在 MySQL 中导入 SQL 和 CSV 数据，包含两种常见方式：

1. 使用 MySQL 原生命令 `mysql` 导入
2. 使用 Sequel Ace 可视化工具导入

适用于本地测试环境，也适合日常开发场景。

---

## 一、导入前先明确文件类型

在 MySQL 中，常见的导入文件大致有以下几种：

### 1. 包含完整库结构和数据的 SQL 文件

通常包含：

- `CREATE DATABASE`（可选）
- `USE 数据库名`
- `CREATE TABLE`
- `INSERT INTO`

适合：

- 完整恢复数据库
- 把一套测试库导入到另一台机器

### 2. 只包含表结构的 SQL 文件

只包含：

- `CREATE TABLE`
- 可能包含索引、约束等定义

适合：

- 初始化空库结构
- 先建表，再单独导入数据

### 3. 只包含数据的 SQL 文件

只包含：

- `INSERT INTO ...`
- 不包含建表语句

适合：

- 目标库已经有表结构
- 只需要补充或迁移数据

### 4. CSV 文件

通常只包含：

- 表头（可选）
- 行数据

适合：

- 导入业务数据
- 与 Excel、脚本、BI 工具配合

注意：

- CSV 不包含建表语句
- 导入 CSV 前，目标表通常需要先存在

---

## 二、原生方式导入数据：mysql

导入通常使用 `mysql` 命令。

基础格式：

```bash
mysql -h 主机 -P 端口 -u 用户 -p 数据库名 < 导入文件.sql
```

---

## 三、导入整个数据库

### 示例 1：导入到已存在的数据库 `testdb`

```bash
mysql -h 127.0.0.1 -P 3306 -u root -p testdb < testdb.sql
```

适合：

- SQL 文件里没有 `CREATE DATABASE`
- 目标数据库已经存在

---

## 四、导入包含建库语句的 SQL 文件

如果导出时用了 `--databases`，SQL 里可能已经包含：

- `CREATE DATABASE`
- `USE testdb`

这时可直接这样导入：

```bash
mysql -h 127.0.0.1 -P 3306 -u root -p < testdb_full.sql
```

说明：

- 不指定数据库名也可以
- SQL 文件会自己切换到对应数据库

---

## 五、导入前先创建数据库

如果你的 SQL 文件里没有建库语句，需要先手动创建数据库。

### 示例 2：先创建库，再导入

```bash
mysql -h 127.0.0.1 -P 3306 -u root -p -e "CREATE DATABASE testdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

然后执行：

```bash
mysql -h 127.0.0.1 -P 3306 -u root -p testdb < testdb.sql
```

---

## 六、导入时常用参数说明

### 1. `-e`

执行一条 SQL 后退出。

示例：

```bash
mysql -h 127.0.0.1 -P 3306 -u root -p -e "SHOW DATABASES;"
```

### 2. `--default-character-set`

指定连接字符集。

示例：

```bash
mysql -h 127.0.0.1 -P 3306 -u root -p --default-character-set=utf8mb4 testdb < testdb.sql
```

建议：

- 导入中文、多语言内容时建议加上

### 3. `--database`

显式指定目标数据库。

示例：

```bash
mysql -h 127.0.0.1 -P 3306 -u root -p --database=testdb < testdb.sql
```

和直接写数据库名效果接近，只是更明确。

---

## 七、导入示例组合

### 场景 1：恢复完整数据库

```bash
mysql -h 127.0.0.1 -P 3306 -u root -p < testdb_full.sql
```

### 场景 2：导入到已有数据库

```bash
mysql -h 127.0.0.1 -P 3306 -u root -p --default-character-set=utf8mb4 testdb < testdb_data.sql
```

### 场景 3：导入某份测试数据到新建测试库

```bash
mysql -h 127.0.0.1 -P 3306 -u root -p -e "CREATE DATABASE test_import CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
mysql -h 127.0.0.1 -P 3306 -u root -p --default-character-set=utf8mb4 test_import < users_data.sql
```

---

## 八、使用 Sequel Ace 导入数据

### 方法 1：导入 SQL 文件

常见步骤：

1. 打开 Sequel Ace 并连接数据库
2. 选择目标数据库
3. 使用菜单中的 `File` / `Import`，或 `Run SQL File`
4. 选择 `.sql` 文件
5. 执行导入

### 导入前要注意

#### 1. SQL 文件是否包含建库语句

如果包含：

- 可以直接执行

如果不包含：

- 需要先手动创建目标数据库
- 再切换到目标数据库执行导入

#### 2. SQL 文件是否包含 Drop 语句

如果包含：

```sql
DROP TABLE IF EXISTS users;
```

那么导入时可能会覆盖原表。

#### 3. SQL 文件是结构、数据，还是两者都有

- 只有结构：会创建表，但没有数据
- 只有数据：要求目标表先存在
- 结构 + 数据：最完整

---

## 九、使用 Sequel Ace 导入 CSV

### 常见步骤

1. 先在 Sequel Ace 中连接数据库
2. 选择目标数据库
3. 确认目标表已存在
4. 选择表后，使用导入 CSV 功能
5. 选择本地 `.csv` 文件
6. 映射字段并确认导入

### CSV 导入时常见参数 / 选项

#### 1. Delimiter（分隔符）

常见值：

- `,` 逗号
- `;` 分号
- `\t` 制表符

如果选错，字段会错位。

#### 2. Text encoding（编码）

常见值：

- UTF-8
- UTF-8 with BOM
- GBK（较少见）

如果编码不对，中文可能乱码。

#### 3. First row contains column names

含义：

- 第一行是否是列名

通常建议：

- 如果 CSV 第一行是表头，就勾选

#### 4. Field mapping

含义：

- 把 CSV 的列映射到 MySQL 表字段

需要注意：

- 字段顺序是否一致
- 类型是否兼容
- 主键 / 唯一键是否会冲突

---

## 十、使用建议

### 1. 完整迁移优先用 SQL

如果目标是把一个 MySQL 库完整迁到另一处，优先使用：

- `mysqldump` 导出 SQL
- `mysql` 导入 SQL

因为：

- 结构和数据更完整
- 可重复执行
- 适合备份和恢复

### 2. 给人看数据时可考虑 CSV

如果只是：

- 给业务同学看
- 导入 Excel
- 做简单分析

那么 CSV 更方便。

### 3. 含中文时优先 utf8mb4

无论导入 SQL 还是 CSV，涉及中文、emoji、多语言文本时，尽量明确指定：

- 数据库字符集：`utf8mb4`
- 导入连接字符集：`--default-character-set=utf8mb4`

### 4. 导入前先确认是否包含 Drop 语句

如果 SQL 文件中有：

- `DROP TABLE`
- `DROP DATABASE`

导入时会覆盖原有对象。

因此在正式环境中，导入前最好先检查 SQL 文件内容。

---

## 十一、常见问题

### 1. 为什么导入时报“Unknown database”

原因：

- 目标数据库不存在
- SQL 文件里也没有 `CREATE DATABASE`

解决：

- 先手动创建数据库
- 或重新导出时加 `--databases`

### 2. 为什么导入时报“Table doesn't exist”

原因：

- 导入的是纯数据文件
- 目标表还没创建

解决：

- 先导入结构
- 或先执行建表 SQL

### 3. 为什么中文乱码

原因通常是：

- 数据库字符集不一致
- 导出/导入连接字符集不一致
- CSV 编码不一致

解决：

- 优先使用 `utf8mb4`
- 导入导出都显式指定字符集

### 4. 为什么导入时报主键冲突

原因：

- 目标表已有相同主键数据
- SQL 文件再次插入相同记录

解决：

- 清空表后导入
- 或调整导入策略
- 或先确认是否需要覆盖旧数据

---

## 十二、最常用命令速查

### 导入包含建库语句的 SQL

```bash
mysql -h 127.0.0.1 -P 3306 -u root -p < testdb_full.sql
```

### 导入到已有数据库

```bash
mysql -h 127.0.0.1 -P 3306 -u root -p --default-character-set=utf8mb4 testdb < testdb_data.sql
```

### 先建库再导入

```bash
mysql -h 127.0.0.1 -P 3306 -u root -p -e "CREATE DATABASE testdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
mysql -h 127.0.0.1 -P 3306 -u root -p --default-character-set=utf8mb4 testdb < testdb.sql
```
