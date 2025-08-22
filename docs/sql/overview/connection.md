---
nav:
  title: SQL
  order: 2
group:
  title: 概览
  order: 1
title: 数据库连接
order: 4
---

# 数据库连接

## 直接连接

- 原理：应用程序通过数据库厂商提供的驱动（Driver），直接建立 TCP/IP 连接到数据库。
- 优点：简单、直接、性能较好。
- 缺点：连接信息（账号、密码、IP、端口）可能暴露在代码中，不利于安全和维护。
- 应用场景：小型项目、学习、临时脚本。

常见用法：

MySQL（Node.js / Python 示例）

```js
// Node.js
const mysql = require('mysql2');
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'test'
});
```

```python
# Python
import pymysql
conn = pymysql.connect(host="localhost", user="root", password="123456", database="test")
```


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
