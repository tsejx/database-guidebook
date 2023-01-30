---
nav:
  title: MySQL
  order: 2
group:
  title: 概览
  order: 1
title: 配置
order: 4
---

# 配置

MySQL 配置文件：

- Windows：`my.ini`
- Linux（MacOS）：`my.cnf`（位于 `/etc/my.cnf`）

## 配置说明

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

## 参考资料

- <https://www.cnblogs.com/duanxz/p/3875760.html>
- <https://blog.51cto.com/moerjinrong/2092791>
- <https://www.jianshu.com/p/5f39c486561b>
- <https://blog.csdn.net/thanklife/article/details/69225724>
