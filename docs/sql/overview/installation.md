---
nav:
  title: SQL
  order: 2
group:
  title: 概览
  order: 1
title: 数据库安装
order: 2
---

# 数据库安装

## 安装

### Windows

在 Windows 系统中安装 MySQL 通常包括下载 MySQL 安装程序并进行基本配置。以下是在 Windows 上安装 MySQL 的基本步骤：

1. 下载 MySQL 安装程序：

   - 前往 MySQL 官方网站的下载页面：[MySQL Downloads](https://dev.mysql.com/downloads/installer/)
   - 在页面中，找到适合版本的 Windows 的 MySQL Installer 并下载。

2. 运行安装程序：

   - 双击下载的安装程序（通常是一个 `.exe` 文件），启动安装向导。

3. 选择安装类型：

    - 在 MySQL 安装向导中，选择 "Server only" 或 "Server and Client"，具体根据你的需求选择。

4. 选择配置类型：

    - 在配置类型中，选择 "Development Machine" 或 "Server Machine"，具体根据你的需求选择。

5. 选择数据库和连接方式：

    - 在 "Select Products and Features" 中，选择需要安装的 MySQL 版本和其他组件。
    - 在 "Authentication Method" 中，选择你喜欢的身份验证方式。默认情况下，可以选择 "Use Strong Password Encryption"。

6. 设置 MySQL 密码：

    - 在 "Accounts and Roles" 中，设置 MySQL 的 root 用户密码。确保选择一个强密码，并记得保存。

7. 配置端口和服务名称：

    - 在 "Windows Service" 中，选择 MySQL 服务的名称和端口。默认端口为 3306。

8. 启动 MySQL 安装：

    - 确认配置信息后，点击 "Execute" 或 "Next" 开始安装。

9. 等待安装完成：

    - 安装程序会下载并安装所选组件，这可能需要一些时间。

10. 完成安装：

    - 安装完成后，向导会显示 "Complete!"。点击 "Next" 完成向导。

11. 启动 MySQL Workbench（可选）：

    - MySQL 安装向导通常会包括 MySQL Workbench，这是一个 MySQL 的官方图形用户界面工具。你可以选择在安装完成后启动它。

12. 验证安装：

    - 打开 MySQL Workbench 或使用命令行工具，尝试连接到 MySQL 数据库，确保你可以成功登录。

以上步骤是一个基本的 MySQL 安装过程。具体步骤可能会有所不同，具体取决于你选择的 MySQL 版本和安装选项。在安装过程中，务必注意安装向导中的指导信息，并根据你的需求进行选择。

### MacOS

在 macOS 系统中，你可以使用 Homebrew 或者 MySQL 官方提供的 DMG 文件进行 MySQL 的安装。以下是两种方法的简要说明：


一、通过 Homebrew 进行安装

1. 安装 Homebrew：

如果你还没有安装 Homebrew，打开终端（Terminal）并运行以下命令来安装：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

2. 安装 MySQL：

在终端中运行以下命令来使用 Homebrew 安装 MySQL：

```bash
brew install mysql
```

3. 启动 MySQL 服务：

安装完成后，运行以下命令启动 MySQL 服务：

```bash
brew services start mysql
```

4. 设置 root 密码：

首次运行 MySQL 服务后，系统会提供一个临时的初始密码。运行以下命令来设置 root 密码：

```bash
mysql_secure_installation
```

按照提示，设置 root 密码并进行其他安全设置。

5. 验证安装：

使用 MySQL 客户端（例如 MySQL Workbench 或终端中的 mysql 命令）连接到 MySQL 服务器，确保你可以成功登录。

二、使用 MySQL 官方 DMG 文件安装

1. 下载 MySQL DMG 文件：

   - 访问 MySQL 官方网站的下载页面：[MySQL Downloads](https://dev.mysql.com/downloads/shell/)
   - 下载 macOS 版本的 MySQL Community Server DMG 文件。

2. 安装 MySQL：

双击下载的 DMG 文件，将 MySQL 安装包拖动到 Applications 文件夹中。

3. 启动 MySQL：

在 Applications 文件夹中找到 MySQL 文件夹，打开并双击运行 MySQL.prefPane 文件，这将安装 MySQL 系统偏好设置。

4. 启动 MySQL 服务：

在系统偏好设置中，点击 MySQL 图标，启动 MySQL 服务。

5. 设置 root 密码：

启动 MySQL 服务后，系统会提供一个临时的初始密码。在终端中运行以下命令来设置 root 密码：

```bash
mysql_secure_installation
```

按照提示，设置 root 密码并进行其他安全设置。

6. 验证安装：

使用 MySQL 客户端连接到 MySQL 服务器，确保你可以成功登录。

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
