---
nav:
  title: MySQL
  order: 2
group:
  title: 概览
  order: 1
title: 安装
order: 2
---

# 安装

## 安装

### Windows

- [MySQL Installer for Windows](https://dev.mysql.com/downloads/installer/)

### MacOS

1. 官方提供的命令行安装：[MySQL Community Downloads](https://dev.mysql.com/downloads/shell/)

2. 通过 Homebrew 进行安装

```bash
# 搜索是否 MySQL（有点多此一举）
brew search mysql

# 安装 MySQL
brew install mysql

# 添加环境变量到 ~/.bash_profile 和 ~/.zshrc
export PATH="/usr/local/mysql/<version>/bin:$PATH" #
export PATH="/usr/local/Cellar/mysql/<version>/bin:$PATH" # Homebrew 安装
# 或者
export 'export PATH="/usr/local/mysql/<version>/bin:$PATH"' >> ~/.zshrc
export 'export PATH="/usr/local/Cellar/mysql/<version>/bin:$PATH"' >> ~/.zshrc # Homebrew 安装

# 初始化
mysql_secure_installation
```

### Linux

官方提供的命令行安装：[MySQL Community Downloads](https://dev.mysql.com/downloads/shell/)

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

## 启动和停止

区分集中文件命令：

- `mysqld`：该命令是 `mysql` 的守护进程，直接通过这种方式启动，会加载 MySQL 配置（如：`/etc/my.cnf`）中 `[mysqld]` 和 `[server]` 组下的参数内容。一般通过手动调用 `mysqld` 来启动 MySQL 服务，这种方式只有一个 `mysqld` 进程，没有守护进程，如果 `mysql` 服务挂了，没有检查重启的机制，生产环境不会使用这种方式启动 `mysql` 服务
- `mysqld_safe`：执行脚本 `mysqlf_safe` 时，脚本中会去调用 `mysqld` 启动 `mysqld` 和 `monitor mysqld` 两个进程，`monitor` 级监视的意思，这样如果 `mysql` 服务挂了，那么 `mysqld_safe` 会重新启动 `mysqld` 进程
- `mysql.server`：该脚本是 `mysql` 安装目录 `support-files` 下的一个文件，也是一个启动 Shell 脚本，脚本中会去调用 `mysqld_safe` 脚本。主要通过拷贝 `mysql.server` 脚本刀片 `/etc/init.d/` 目录下，并命名为 `mysql`，实现便捷启动和停止
- `mysqladmin`

检查 MySQL 数据库是否已安装：

```bash
# MacOS 如果是通过 HomeBrew 安装的话可以通过 Homebrew 的命令看是否已经安装
$ brew info mysql
```

查看 MySQL 数据库本地服务的运行情况：

```bash
# 查看状态
$ mysql.server status

# 使用 Linux 命令查看 MySQL 的运行情况
$ ps -ef | grep mysqld
```

启动 MySQL 服务：

```bash
# 使用 mysql.server start 命令启动 MySQL 服务
$ mysql.server start
Starting MySQL
. Success!

# 如果没有找到 mysql.server 命令
# 那么可以在 ./mysql/bin 同级目录 support-files/mysql.server 找到它
# 一般都在这个目录下 /usr/local/Cellar/mysql/<version>/support-files/mysql.server
/usr/local/Cellar/mysql/<version>/support-files/mysql.server start

# 通过 mysqld_safe 启动（后台启动）
# 使用 mysqld_safe 启动会有两个进程
cd /usr/bin & ./mysqld_safe &

# 前台启动
/usr/local/opt/mysql/bin/mysqld_safe --datadir=/usr/local/var/mysql

# Windows 下启动 MySQL 服务命令
$ net start mysql
```

查看启动失败的日志：

```bash
# 查看配置 my.cnf 错误日志路径
[mysqld]
log-error=/data/mysqllog/client-error.log

# 查看 mysql 记录错误日志
$ tail -f /data/mysqllog/client-error.log
```

关闭 MySQL 服务：

```bash
# 通过 mysql.server 命令关闭 MySQL 服务
$ mysql.server stop

# 关闭 mysqld_safe 启动的进程建议使用 mysqladmin 命令停止
# root 用户是 mysql.user 表中的数据库用户
# mysql.sock 路径，通过查看配置 my.cnf 获取
$ cd /usr/bin & ./mysqladmin -u root -p -S /data/mysqldata/mysql.sock shutdown
Enter password: ******

# Windows 下关闭 MySQL 服务命令
$ net stop mysql
```

## 登陆服务

使用 `root` 账户登录 MySQL。

```bash
$ mysql -u root -p

Enter password:******
```

退出 MySQL

```bash
$ mysql > exit
Bye
```

## 修改登录密码

MySQL 默认没有密码，安装建议增加密码。

```bash
# <password> 为用户需要设置的密码
./usr/bin/mysqladmin -u root password <password>
```

## 相关目录

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

## 增加用户

## 备份与恢复

## 参考资料

- [MySQL 几种启动和停止服务使用说明](https://blog.csdn.net/JustinQin/article/details/120114603)
