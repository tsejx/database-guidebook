---
nav:
  title: MySQL
  order: 2
title: FAQ
order: 100
---

# FAQ

## 安装后无法启动数据库服务

```bash
$ mysql.server start

# 启动失败 /usr/local/mysql/data 未创建
Starting MySQL
./usr/local/Cellar/mysql/8.0.28_1/bin/mysqld_safe: line 653: /usr/local/mysql/data/starrydeMacBook-Pro.local.err: No such file or directory
Logging to '/usr/local/mysql/data/starrydeMacBook-Pro.local.err'.
/usr/local/Cellar/mysql/8.0.28_1/bin/mysqld_safe: line 144: /usr/local/mysql/data/starrydeMacBook-Pro.local.err: No such file or directory
/usr/local/Cellar/mysql/8.0.28_1/bin/mysqld_safe: line 199: /usr/local/mysql/data/starrydeMacBook-Pro.local.err: No such file or directory
/usr/local/Cellar/mysql/8.0.28_1/bin/mysqld_safe: line 916: /usr/local/mysql/data/starrydeMacBook-Pro.local.err: No such file or directory
/usr/local/Cellar/mysql/8.0.28_1/bin/mysqld_safe: line 144: /usr/local/mysql/data/starrydeMacBook-Pro.local.err: No such file or directory
 ERROR! The server quit without updating PID file (/usr/local/mysql/data/starrydeMacBook-Pro.local.pid).

#  执行以下命令
mysqld --initialize-insecure

# 再次启动
mysql.server start

# 启动失败
Starting MySQL
./usr/local/Cellar/mysql/8.0.28_1/bin/mysqld_safe: line 653: /usr/local/mysql/data/starrydeMacBook-Pro.local.err: Permission denied
Logging to '/usr/local/mysql/data/starrydeMacBook-Pro.local.err'.
/usr/local/Cellar/mysql/8.0.28_1/bin/mysqld_safe: line 144: /usr/local/mysql/data/starrydeMacBook-Pro.local.err: Permission denied
/usr/local/Cellar/mysql/8.0.28_1/bin/mysqld_safe: line 199: /usr/local/mysql/data/starrydeMacBook-Pro.local.err: Permission denied
/usr/local/Cellar/mysql/8.0.28_1/bin/mysqld_safe: line 916: /usr/local/mysql/data/starrydeMacBook-Pro.local.err: Permission denied
/usr/local/Cellar/mysql/8.0.28_1/bin/mysqld_safe: line 144: /usr/local/mysql/data/starrydeMacBook-Pro.local.err: Permission denied
 ERROR! The server quit without updating PID file (/usr/local/mysql/data/starrydeMacBook-Pro.local.pid).

# 授权
sudo chmod -R 777 /usr/local/mysql/data 

# 再次启动
mysql.server start

# 启动失败
Starting MySQL
... ERROR! The server quit without updating PID file (/usr/local/mysql/data/starrydeMacBook-Pro.local.pid).

# 查看错误日志
cd /usr/local/mysql/data 
cat XXXX-Pro.local.err
```

## 无法连接本地数据库服务器

```bash
ERROR 2002 (HY000): Can't connect to local MySQL server through socket '/var/lib/mysql/mysql.sock'
```

意味着：

1. MySQL 服务器未安装或未运行
2. `mysql.sock` 不存在于 `/var/lib/mysql/`

## 参考资料

[Macbook 安装 MySQL](https://learnku.com/articles/62379)
