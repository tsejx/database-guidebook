---
nav:
  title: SQL
  order: 2
group:
  title: 高级用法
  order: 4
title: 导出
order: 88
---

# 导出

本文档说明如何在 MySQL 中导出数据库、表结构和表数据，包含两种常见方式：

1. 使用 MySQL 原生命令 `mysqldump` 导出
2. 使用 Sequel Ace 可视化工具导出

适用于本地测试环境，也适合日常开发场景。

---

## 一、导出前先明确几个概念

在 MySQL 中，常见的导出对象有以下几种：

### 1. 导出整个数据库

包含：

- 建库语句（可选）
- 建表语句
- 表数据
- 视图、存储过程、触发器（按参数决定）

适合：

- 备份整个业务库
- 在另一台机器恢复完整数据库

### 2. 只导出某几张表

包含：

- 指定表的结构和数据
- 或仅结构 / 仅数据

适合：

- 只迁移部分业务表
- 单独备份某些表

### 3. 只导出表结构

只包含：

- `CREATE TABLE`
- 不包含 `INSERT`

适合：

- 初始化空库结构
- 对比表结构
- 发给别人建测试环境

### 4. 只导出数据

只包含：

- `INSERT INTO ...`
- 不包含建表语句

适合：

- 往已有表中导入数据
- 做数据迁移

---

## 二、原生方式导出数据：mysqldump

MySQL 原生导出通常使用 `mysqldump`。

基础格式：

```bash
mysqldump -h 主机 -P 端口 -u 用户 -p 数据库名 > 导出文件.sql
```

执行后，命令会提示输入密码。

> 注意：`-p` 后面通常不要直接加空格和密码。最常见写法就是 `-p`，然后回车输入密码。

---

## 三、导出整个数据库

### 示例 1：导出整个 `testdb`

```bash
mysqldump -h 127.0.0.1 -P 3306 -u root -p testdb > testdb.sql
```

### 结果说明

这个文件通常会包含：

- 建表语句
- 数据插入语句
- 一些 session 设置语句

### 常见适用场景

- 本地数据库完整备份
- 把测试库发给其他同事恢复
- 迁移到另一台 MySQL 服务器

---

## 四、导出指定表

### 示例 2：只导出 `users` 和 `orders` 两张表

```bash
mysqldump -h 127.0.0.1 -P 3306 -u root -p testdb users orders > testdb_partial.sql
```

### 说明

- `testdb` 是数据库名
- `users orders` 是表名列表
- 导出文件中只包含这两张表

适合：

- 只迁移部分数据
- 单独备份核心表

---

## 五、只导出表结构

### 示例 3：导出整个库的结构，不导出数据

```bash
mysqldump -h 127.0.0.1 -P 3306 -u root -p --no-data testdb > testdb_schema.sql
```

### 关键参数

- `--no-data`
  - 含义：只导出建库 / 建表结构
  - 不导出 `INSERT` 数据

适合：

- 初始化空数据库
- 只同步结构
- 检查建表语句

### 示例 4：只导出某一张表的结构

```bash
mysqldump -h 127.0.0.1 -P 3306 -u root -p --no-data testdb users > users_schema.sql
```

---

## 六、只导出数据

### 示例 5：只导出数据，不导出建表语句

```bash
mysqldump -h 127.0.0.1 -P 3306 -u root -p --no-create-info testdb > testdb_data.sql
```

### 关键参数

- `--no-create-info`
  - 含义：不导出 `CREATE TABLE`
  - 只导出数据插入语句

适合：

- 目标库已经有表结构
- 只想覆盖或追加数据

### 示例 6：只导出 `users` 表的数据

```bash
mysqldump -h 127.0.0.1 -P 3306 -u root -p --no-create-info testdb users > users_data.sql
```

---

## 七、导出时常用参数详解

下面是 `mysqldump` 中最常见、最实用的参数。

### 1. `-h`

指定 MySQL 主机地址。

示例：

```bash
-h 127.0.0.1
```

常见值：

- `127.0.0.1`：本机 TCP 连接
- `localhost`：本机，某些环境下可能走 socket
- 远程 IP：如 `192.168.1.10`

建议：

- 本地 Docker 环境优先写 `127.0.0.1`
- 避免 `localhost` 因 socket/TCP 差异导致问题

### 2. `-P`

指定端口。

示例：

```bash
-P 3306
```

### 3. `-u`

指定用户名。

示例：

```bash
-u root
```

### 4. `-p`

提示输入密码。

示例：

```bash
-p
```

也可以写成：

```bash
-p123456
```

但不推荐，因为：

- 密码会出现在 shell 历史中
- 也可能暴露在进程列表里

### 5. `--databases`

显式告诉 mysqldump：后面跟的是数据库名。

示例：

```bash
mysqldump -h 127.0.0.1 -P 3306 -u root -p --databases testdb > testdb.sql
```

特点：

- 导出结果中通常会包含 `CREATE DATABASE` 和 `USE 数据库名`
- 更适合做完整数据库迁移

如果你不用 `--databases`，通常只导出库内对象定义和数据，不一定包含建库语句。

### 6. `--tables`

显式告诉 mysqldump：后面跟的是表名。

示例：

```bash
mysqldump -h 127.0.0.1 -P 3306 -u root -p testdb --tables users orders > partial.sql
```

虽然很多情况下可以省略，但写上会更清晰。

### 7. `--no-data`

只导出结构。

### 8. `--no-create-info`

只导出数据。

### 9. `--where`

按条件导出数据。

### 示例 7：只导出 `users` 表中 `id > 100` 的数据

```bash
mysqldump -h 127.0.0.1 -P 3306 -u root -p --no-create-info testdb users --where="id > 100" > users_gt_100.sql
```

适合：

- 只迁移部分记录
- 抽取测试数据
- 排查问题时导出样本数据

### 10. `--single-transaction`

用于 InnoDB 表的一致性导出，尤其适合在线导出。

示例：

```bash
mysqldump -h 127.0.0.1 -P 3306 -u root -p --single-transaction testdb > testdb.sql
```

作用：

- 在事务内获取一致性快照
- 导出期间尽量减少锁表影响

适合：

- 在线导出 InnoDB 数据库
- 不希望长时间锁表

注意：

- 对 MyISAM 不适用
- 如果库里混用了非事务表，效果会受限

### 11. `--routines`

导出存储过程和函数。

示例：

```bash
mysqldump -h 127.0.0.1 -P 3306 -u root -p --routines testdb > testdb_with_routines.sql
```

### 12. `--triggers`

导出触发器。

示例：

```bash
mysqldump -h 127.0.0.1 -P 3306 -u root -p --triggers testdb > testdb_with_triggers.sql
```

### 13. `--events`

导出事件。

示例：

```bash
mysqldump -h 127.0.0.1 -P 3306 -u root -p --events testdb > testdb_with_events.sql
```

### 14. `--add-drop-table`

在每个 `CREATE TABLE` 前增加：

```sql
DROP TABLE IF EXISTS 表名;
```

示例：

```bash
mysqldump -h 127.0.0.1 -P 3306 -u root -p --add-drop-table testdb > testdb_drop_create.sql
```

适合：

- 导入时覆盖旧表
- 需要重复恢复环境

注意：

- 导入时可能会删除已有表
- 用于生产环境时要格外谨慎

### 15. `--default-character-set`

指定导出连接使用的字符集。

示例：

```bash
mysqldump -h 127.0.0.1 -P 3306 -u root -p --default-character-set=utf8mb4 testdb > testdb_utf8mb4.sql
```

建议：

- 含中文、emoji、多语言内容时优先使用 `utf8mb4`

---

## 八、推荐导出命令示例

### 场景 1：本地完整备份，尽量安全

```bash
mysqldump \
  -h 127.0.0.1 \
  -P 3306 \
  -u root \
  -p \
  --databases testdb \
  --single-transaction \
  --default-character-set=utf8mb4 \
  > testdb_full.sql
```

### 场景 2：只导出结构

```bash
mysqldump \
  -h 127.0.0.1 \
  -P 3306 \
  -u root \
  -p \
  --no-data \
  --default-character-set=utf8mb4 \
  testdb \
  > testdb_schema.sql
```

### 场景 3：只导出数据

```bash
mysqldump \
  -h 127.0.0.1 \
  -P 3306 \
  -u root \
  -p \
  --no-create-info \
  --default-character-set=utf8mb4 \
  testdb \
  > testdb_data.sql
```

### 场景 4：导出部分数据

```bash
mysqldump \
  -h 127.0.0.1 \
  -P 3306 \
  -u root \
  -p \
  --no-create-info \
  testdb users \
  --where="created_at >= '2026-01-01'" \
  > users_2026.sql
```

---

## 九、使用 Sequel Ace 导出数据

Sequel Ace 是 macOS 上常见的 MySQL 可视化工具，适合不想记命令的场景。

### 1. 连接数据库

打开 Sequel Ace 后填写：

- Host: `127.0.0.1`
- Username: `root`
- Password: 你的密码
- Port: `3306`
- Database: 可留空或填写 `testdb`

点击 `Connect`。

### 2. 导出方式

连接成功后，通常可以通过以下入口导出：

- 菜单栏中的 `File` / `Export`
- 或在左侧选择数据库 / 表后执行导出

不同版本界面可能略有差异，但核心选项类似。

### 3. 常见可选导出内容

Sequel Ace 导出时通常会让你选择以下内容：

#### 选项 1：Structure

含义：

- 导出表结构
- 包含 `CREATE TABLE`

适合：

- 创建空库结构
- 发给别人初始化数据库

#### 选项 2：Content

含义：

- 导出表数据
- 包含 `INSERT INTO`

适合：

- 迁移数据
- 测试数据备份

#### 选项 3：Drop syntax

含义：

- 在 SQL 中加入 `DROP TABLE IF EXISTS`

适合：

- 希望导入时覆盖已有表

注意：

- 导入时可能删除已有数据

#### 选项 4：Database name / Add USE

含义：

- 在 SQL 中加入数据库名相关语句，如 `USE testdb`

适合：

- 让 SQL 文件更完整
- 降低导入时切库出错概率

#### 选项 5：Compression

含义：

- 导出为压缩文件

适合：

- 数据量较大时减少文件体积

#### 选项 6：导出格式

通常可以选择：

- SQL
- CSV

区别：

- SQL：适合恢复到 MySQL
- CSV：适合给 Excel、脚本、BI 工具处理

---

## 十、Sequel Ace 导出示例

### 示例 1：导出整个数据库为 SQL

推荐选择：

- Structure：勾选
- Content：勾选
- Drop syntax：按需勾选
- Add database / USE：建议勾选
- Format：SQL

适合：

- 做完整备份
- 迁移数据库

### 示例 2：只导出表结构

推荐选择：

- Structure：勾选
- Content：不勾选
- Format：SQL

适合：

- 初始化测试环境
- 给开发人员同步表结构

### 示例 3：只导出表数据

推荐选择：

- Structure：不勾选
- Content：勾选
- Format：SQL 或 CSV

适合：

- 已有表结构，只需要数据
- 导出业务数据做分析

### 示例 4：导出 CSV

适合：

- 给产品、运营、分析人员使用
- 不用于完整数据库恢复

注意：

- CSV 通常只包含数据，不包含建表语句
- 导入 CSV 前，目标表通常需要先存在

---

## 十一、使用建议

### 1. 自动化与服务器场景优先用原生命令

适合：

- 自动化脚本
- Docker / 服务器环境
- CI / 备份脚本
- 需要精确控制导出参数的场景

优点：

- 可重复执行
- 参数丰富
- 适合写进 README、脚本、部署流程

### 2. 手工处理或导出 CSV 时优先用 Sequel Ace

适合：

- 临时导出
- 可视化操作
- 手工筛选和确认
- 导出 CSV 给非研发同学

### 3. 含中文、多语言内容时优先使用 utf8mb4

建议明确指定：

- 数据库字符集：`utf8mb4`
- 导出连接字符集：`--default-character-set=utf8mb4`

---

## 十二、最常用命令速查

### 导出整个数据库

```bash
mysqldump -h 127.0.0.1 -P 3306 -u root -p --databases testdb --single-transaction --default-character-set=utf8mb4 > testdb_full.sql
```

### 导出结构

```bash
mysqldump -h 127.0.0.1 -P 3306 -u root -p --no-data testdb > testdb_schema.sql
```

### 导出数据

```bash
mysqldump -h 127.0.0.1 -P 3306 -u root -p --no-create-info testdb > testdb_data.sql
```

### 导出指定表

```bash
mysqldump -h 127.0.0.1 -P 3306 -u root -p testdb users orders > partial.sql
```
