---
nav:
  title: SQL
  order: 2
group:
  title: 概览
  order: 1
title: 数据库配置
order: 5
---

# 数据库配置

## 相关目录和文件

| 名称       | 路径                                | 说明                             |
| :--------- | :---------------------------------- | :------------------------------- |
| 数据库目录 | `/var/lib/mysql`                    |                                  |
|            | `/usr/local/Cellar/mysql/<version>` | MacOS 使用 Homebrew 安装         |
| 配置文件   | `/usr/share/mysql`                  | `mysql.server` 命令及配置文件    |
|            | `/usr/local/etc`                    | MacOS 使用 Homebrew 安装         |
| 相关命令   | `/usr/bin`                          | `mysqladmin`、`mysqldump` 等命令 |
|            | `/usr/local/bin`                    | MacOS 使用 Homebrew 安装         |
| 启动脚本   | `/etc/rc.d/init.d/`                 | 启动脚本文件 MySQL 的目录        |

## 更改目录

MySQL 默认的数据文件存储目录为 `/var/lib/mysql`。如果要把目录移动到 `/home/data` 下需要以下几步：

```bash
$ cd /home & mkdir data

# 将 MySQL 服务进程停掉
mysqladmin -u root -p shutdown

# 将 /var/lib/mysql 整个目录移到 /home/data
mv /var/lib/mysql /home/data/

# 找到 my.cnf 配置文件
# 如果 /etc/ 目录下没有 my.cnf 配置文件，请到 /usr/share/mysql/ 下找到 *.cnf 文件，拷贝其中一个到 /etc/ 并改名为 my.cnf 中
cp /usr/share/mysql/my-medium.cnf /etc/my.cnf

# 编辑 MySQL 的配置文件 /etc/my.cnf
# 为保证 MySQL 能够正常工作，需要指明 mysql.sock 文件的产生位置
# 修改 socket=/var/lib/mysql/mysql.sock 一行中等号右边的值为 /home/mysql/mysql.sock
vi my.cnf
# 省略编辑

# 修改 MySQL 启动脚本 /etc/rc.d/init.d/mysql
# 将其中 datadir=/var/lib/mysql 一行中，等号右边路径改成你现在的实际存放路径：home/data/mysql

# 重新启动 MySQL 服务
/etc/rc.d/init.d/mysql start
```

## 配置文件

MySQL 配置文件：

- Windows：`my.ini`
- Linux（MacOS）：`my.cnf`（位于 `/etc/my.cnf`）

### 配置说明

```shell
[client]
port = 3306
socket = /usr/local/services/mysql/var/data/mysql.sock

[mysqld]
bind-address = 0.0.0.0
port = 3306
socket = /usr/local/services/mysql/var/data/mysql.sock
pid-file = /usr/local/services/mysql/var/logs/mysql.pid
character-set-server = utf8
basedir = /usr/local/services/mysql
datadir = /usr/local/services/mysql/var/data

skip-external-locking
# 禁用主机名解析
skip-name-resolve
lower_case_table_names = 1
log-bin-trust-function-creators = 1

max_connections = 6000
max_user_connections = 6000
max_connect_errors = 4000
wait_timeout = 86400
interactive_timeout = 86400
table_open_cache = 512
max_allowed_packet = 32M
sort_buffer_size = 2M
join_buffer_size = 2M
thread_cache_size = 8
thread_concurrency = 8
query_cache_size = 32M
# 默认的数据库引擎
#default-storage-engine = InnoDB

#sql_mode="STRICT_ALL_TABLES,NO_AUTO_CREATE_USER"
server-id = 1

log-short-format
log-error = /usr/local/services/mysql/var/logs/mysql.log
slow_query_log
long_query_time = 2
slow_query_log_file = /usr/local/services/mysql/var/logs/mysql-slow.log

log-bin = /usr/local/services/mysql/var/binlog/mysql-bin
log_bin_trust_function_creators=1
binlog_format = MIXED
expire_logs_days = 10

# INNODB Specific options
innodb_data_home_dir = /usr/local/services/mysql/var/data
innodb_log_group_home_dir = /usr/local/services/mysql/var/redolog
innodb_additional_mem_pool_size = 10M
# 数据缓冲区
innodb_buffer_pool_size = 4G
innodb_data_file_path = ibdata1:100M:autoextend
innodb_file_io_threads = 4
innodb_thread_concurrency = 8
innodb_flush_log_at_trx_commit = 0
innodb_flush_method = O_DIRECT
# 事务在内存中的缓冲
innodb_log_buffer_size = 128M
# 事务日志大小
innodb_log_file_size = 256M
innodb_log_files_in_group = 3
innodb_max_dirty_pages_pct = 90
innodb_lock_wait_timeout = 50
innodb_file_per_table = 1

# MyISAM Specific options
key_buffer_size = 384M
read_buffer_size = 4M
read_rnd_buffer_size = 8M
myisam_sort_buffer_size = 128M
myisam_max_sort_file_size = 1G
myisam_repair_threads = 1
myisam_recover

[mysqldump]
quick
max_allowed_packet = 16M

[mysql]
default-character-set = utf8
no-auto-rehash
socket = /usr/local/services/mysql/var/data/mysql.sock

[myisamchk]
key_buffer_size = 256M
sort_buffer_size = 256M
read_buffer = 2M
write_buffer = 2M

[mysqlhotcopy]
interactive-timeout
```

## 环境变量配置

方便以后每次的开启、停止和重启，就不用像上面命令一样每次都要加路径。

```bash
# 打开 .bash_profile 添加 mysql.server 路径
vim ~/.bash_profile

# 添加以下变量：
export MYSQL_HOME=/usr/local/mysql
export PATH=${PATH}:${MYSQL_HOME}/support-files

# 保存 .bash_profile 文件后使用 source 命令让刚才的改动生效
source !/.bash_profile

# 最后使用 sudo /usr/local/mysql/support-files/mysql.server start 验证是否配置成功即可
```

## 参考资料

- <https://www.cnblogs.com/duanxz/p/3875760.html>
- <https://blog.51cto.com/moerjinrong/2092791>
- <https://www.jianshu.com/p/5f39c486561b>
- <https://blog.csdn.net/thanklife/article/details/69225724>
