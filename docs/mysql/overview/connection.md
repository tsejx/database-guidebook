---
nav:
  title: MySQL
  order: 2
group:
  title: 概览
  order: 1
title: 连接
order: 3
---

## 连接

三种连接方式：

1. TCP/IP
2. Socket
3. SSH

## Socket

`mysql.sock` 是 MySQL 的主机和客户机在同一 host 上的时候，使用 Unix Domain Socket 作为通讯协议的载体，它比 TCP 快。

对于 `mysql.sock` 来说，其作用是程序与 `mysqlserver` 处于同一台机器，发起本地连接时可用。

## 常见问题

### 找不到 sock 文件

问题：在 Linux 下安装 MySQL 连接的时候经常会提示说找不到 `mysql.sock` 文件

解决方法：

1. 误删：重启 `mysqld` 服务，如果重启成功的话会在 `datadir` 目录下面生成 `mysql.sock` 到时候指定即可

### /tmp/mysql.sock 不存在

问题：连接报错 `Can't connect to local MySQL server through socket '/tmp/mysql.sock'`

原因：上述提示可能在启动 `mysql` 时遇到，即在 `/tmp/mysql.sock` 位置找不到所需要的 `mysql.sock` 文件，主要是由于 `my.cnf` 文件里对 `mysql.sock` 的位置设定导致。

## 参考资料

- [MySQL - mysql.sock 文件作用](https://www.jianshu.com/p/d6c1e3458ca9)
