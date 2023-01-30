---
nav:
  title: MySQL
  order: 2
group:
  title: 概览
  order: 1
title: 权限管理
order: 5
---

# 权限管理

## 新增用户

先使用 `root` 账号登陆 MySQL Server：

```bash
mysql -u root -p
```

登录后，提示符变为 `mysql>`

```bash
mysql> CREATE USER 'starry'@'localhost' IDENTIFIED BY 'password';

# 创建成功会返回
Query OK, 0 rows afffected (0.03 sec)
```

说明：

- `starry`：可替换为你想创建的用户名，本教程使用 `starry` 作为示例用户名
- `passwrod`：为此新建账号对应的密码

这里要注意，如果你的 MySQL 密码强度设置为最高，但你设置的密码过于简单，会出现 `ERROR 1819` 错误。

> MySQL 强密码由 `数字+大写字母+小写字母+符号` 四个部分组成大于 8 位的密码

特别提示：本教程创建的用户名的 `host` 设置为 `localhost` ，如果想要远程访问 MySQL 数据库，需要将这里改为发起访问的 服务器 IP 或者使用 `%` 通配符 IP 地址。

具体可查看 [如何远程连接 MySQL 数据库，阿里云腾讯云外网连接教程](https://kalacloud.com/blog/how-to-allow-remote-access-to-mysql/) 这篇教程，教程中会详细讲解通过 TCP/IP 远程访问 MySQL 数据库的几种形式及可能碰到的问题。

## 修改用户

账号重命名：

```sql
RENAME USER 'starry'@'localhost' TO 'starry-new'@'%';
```

## 删除用户

删除账号：

```sql
DROP USER 'starry'@'localhost';
```

## 授权

## 授予全部权限

给账号 `starry` 授予全部权限：

```sql
GRANT ALL PRIVILEGES ON * . * TO 'starry'@'localhost';

-- 运行以下命令，刷新 MySQL 的系统权限相关表，更新缓存
FLUSH PRIVILEGES;
```

在实际生产环境中，我们处于安全考虑，很少这样配置账号权限。

### 授予特定权限

以下是常见的可授权账号使用的权限。

- `ALL PRIVILEGES`：允许 MySQL 用户完全访问指定的数据库（或者如果没有选择数据库，则可以跨系统进行全局访问）
- `CREATE`：允许创建新表或数据库
- `DROP`：允许删除表或数据库
- `DELETE`：允许从表中删除行
- `INSERT`：允许向表中插入行
- `SELECT`：允许使用 `SELECT` 命令来读取数据库
- `UPDATE`：允许更新表行
- `GRANT OPTION`：允许授予或删除其他用户的权限

向特定用户授权特定数据库和表的权限，代码模版：

```sql
GRANT <type_of_permission> ON <database_name.table_name> TO 'starry'@'localhost';
```

说明：

- `'starry'@'localhost'`：需要被授权的账号
- `type_of_permission`：这里写权限类型，权限之间使用逗号（`,`）分隔
- `database_name.table_name`：指定特定的数据库（`database_name`）和其中的表（`table_name`）的权限范围

如果你想使账号可访问任何数据库或任何表，可用 `*` 代替。

记得每次更改权限后，要执行 `FLUSH PRIVILEGES;` 刷新 MySQL 的系统权限相关表，更新缓存。

| 权限                    | 权限级别               | 说明                                                                                                                                    |
| :---------------------- | :--------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| CREATE                  | 数据库、表或索引       | 创建数据库、表或索引权限                                                                                                                |
| DROP                    | 数据库或表             | 删除数据库或表权限                                                                                                                      |
| GRANT OPTION            | 数据库、表或保存的程序 | 赋予权限选项                                                                                                                            |
| REFERENCES              | 数据库或表             |                                                                                                                                         |
| ALTER                   | 表                     | 更改表，比如添加字段、索引等                                                                                                            |
| DELETE                  | 表                     | 删除数据权限                                                                                                                            |
| INDEX                   | 表                     | 索引权限                                                                                                                                |
| INSERT                  | 表                     | 插入权限                                                                                                                                |
| SELECT                  | 表                     | 查询权限                                                                                                                                |
| UPDATE                  | 表                     | 更新权限                                                                                                                                |
| CREATE VIEW             | 视图                   | 创建视图权限                                                                                                                            |
| SHOW VIEW               | 视图                   | 查看视图权限                                                                                                                            |
| ALTER ROUTINE           | 存储过程               | 更改存储过程权限                                                                                                                        |
| CREATE ROUTINE          | 存储过程               | 创建存储过程权限                                                                                                                        |
| EXECUTE                 | 存储过程               | 执行存储过程权限                                                                                                                        |
| FILE                    | 访问服务器中的文件     | 文件访问权限                                                                                                                            |
| CREATE TEMPORARY TABLES | 服务器管理             | 创建临时表权限                                                                                                                          |
| LOCK TABLES             | 服务器管理             | 锁表权限                                                                                                                                |
| CREATE USER             | 服务器管理             | 创建用户权限                                                                                                                            |
| PROCESS                 | 服务器管理             | 查看进程权限                                                                                                                            |
| RELOAD                  | 服务器管理             | 执行 `flush-hosts`, `flush-logs`, `flush-privileges`, `flush-status`, `flush-tables`, `flush-threads`, `refresh`, `reload` 等命令的权限 |
| REPLICATION CLIENT      | 服务器管理             | 复制权限                                                                                                                                |
| REPLICATION SLAVE       | 服务器管理             | 复制权限                                                                                                                                |
| SHOW DATABASES          | 服务器管理             | 查看数据库权限                                                                                                                          |
| SHUTDOWN                | 服务器管理             | 关闭数据库权限                                                                                                                          |
| SUPER                   | 服务器管理             | 执行 `kill` 线程权限                                                                                                                    |

## 取消授权

撤销账号某些权限，执行的语句与授权几乎相同：

```sql
REVOKE <type_of_permission> ON <database_name.table_name> FROM 'starry'@'localhost';
```

注意：在撤销权限时，语法要用 `FROM` ，而不是授权时使用的 `TO`

查看用户的当前权限：

```sql
SHOW GRANTS FOR 'starry'@'localhost';
```
