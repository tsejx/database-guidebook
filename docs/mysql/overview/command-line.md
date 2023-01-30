---
nav:
  title: MySQL
  order: 2
group:
  title: 概览
  order: 1
title: 命令行
order: 101
---

# 命令行

命令行参数

```bash
mysql [OPTIONS] [database]

# 显示帮助信息并退出
-I, --help

# 默认不开启自动补全
-A, --no-auto-rehash

# 不使用历史文件，禁用交互
-B, --batch

# 字体集的安装目录
--character-sets-dir=<name>

# 设置数据库的默认字符集
--default-character-set=<name>

# 在客户端和服务端传递信息时使用压缩
-C, --compress

# BUG 调用功能
-#, --debug

# 使用哪个数据库
-D, --database=<name>

# 执行 MySQL 的 SQL 语句
-e, --execute=<name>

# 垂直打印查询输出
-E, --vertical

# 设置连接的服务器名或者 IP
-h, --host=<name>

# 每执行一次 SQL后，刷新缓存
-n, --unbuffered

# 不显示列信息
-N, --skip-column-names

# 设置变量
# 用法：--set-variable=<var_name>=<var_value>
-O, -set-variable=<name>

# 输入密码
-p, --password[=name]

# 设置端口
-p, --port=<port>

# 连接服务器的 Sockey 文件
-S, --socket=<name>

# 以表格形式输出
-t, --table

# 用户名
-u, --user=<name>

# 输出 MySQL 执行的语句
-v, --verbose

# 服务器 down 后，等待到重启的时间
-w, --wait
```

## mysqld

## mysql_safe

## mysql.server

```bash
# 启动
$ mysql.server start

# 停止
$ mysql.server stop

# 重启
$ mysql.server restart

# 重载
$ mysql.server reload

# 强制重载
$ mysql.server force-reload

# 查看状态
$ mysql.server status
```

## mysqladmin

## socket 路径

/etc/my.cnf
/etc/mysql/my.cnf
/usr/local/etc/my.cnf (here)
~/.my.cnf

<!-- [mysqld]
# Only allow connections from localhost
bind-address = 127.0.0.1
mysqlx-bind-address = 127.0.0.1
default-authentication-plugin=mysql_native_password
socket=/Users/starry/Library/Containers/com.sequel-ace.sequel-ace/Data/mysql.sock -->

<!-- /var/lib/mysql/mysql.sock -->

/usr/local/var/mysql/starrydeMacBook-Pro.local.pid
