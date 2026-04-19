---
nav:
  title: PostgreSQL
  order: 3
group:
  title: 概览
  order: 1
title: 安装
order: 2
---

# 安装

学习 PostgreSQL 的第一步，不是先写 SQL，而是先把环境装好，并确认它真的能运行。

对初学者来说，安装最重要的不是记住所有命令，而是搞清楚三件事：

- 用什么方式安装
- 安装后服务在哪里
- 怎么验证安装成功

## 常见安装方式

PostgreSQL 常见有两类安装方式。

### 方式一：包管理器安装

这是最适合初学者的方式。优点是简单、稳定、后续升级也方便。

常见示例：

- macOS：`brew install postgresql@17`
- Ubuntu / Debian：`sudo apt install postgresql`
- CentOS / Rocky / Fedora 一类系统：通常通过系统仓库或官方仓库安装

如果你只是想尽快开始学习，优先选这种方式。

### 方式二：图形安装器或发行版安装包

有些系统会提供图形化安装包，安装时一路下一步即可。这种方式对完全没有命令行经验的新手也比较友好。

不过无论你用哪种安装方式，最后都要回到同一个目标：

- PostgreSQL 服务能启动
- 你能用 `psql` 连接它

## macOS 的基础安装思路

如果你用的是 macOS，最常见的做法是通过 Homebrew 安装。

```bash
brew install postgresql@17
```

安装完成后，通常还需要把 PostgreSQL 服务启动起来。常见方式是：

```bash
brew services start postgresql@17
```

不同机器上安装的具体版本号可能不同，所以如果你的命令里不是 `@17`，以自己本机实际版本为准。

## Linux 的基础安装思路

Linux 发行版很多，具体命令会有差异，但整体思路是一样的：

1. 安装 PostgreSQL 服务端程序
2. 安装 `psql` 客户端
3. 初始化数据目录（有些发行版会自动完成）
4. 启动 PostgreSQL 服务

以 Debian / Ubuntu 风格系统为例，常见安装命令是：

```bash
sudo apt update
sudo apt install postgresql
```

安装完成后，系统通常会顺带安装 `psql`，并创建默认服务。

## 安装完成后怎么验证

很多人以为“命令执行成功了”就代表安装好了，其实还差一步：你要确认 PostgreSQL 真的能用。

### 验证一：确认 `psql` 是否存在

```bash
psql --version
```

如果终端能输出版本号，比如：

```bash
psql (PostgreSQL) 17.x
```

说明客户端已经装上了。

### 验证二：确认服务是否在运行

如果服务没有启动，就算 `psql` 已经安装，也无法正常连接数据库。

不同系统查看方式不同，例如：

```bash
brew services list
```

或者：

```bash
systemctl status postgresql
```

你不一定非要记住哪一条命令最标准，先记住目标：**确认 PostgreSQL 服务正在运行**。

### 验证三：尝试连一次数据库

最直接的验证方式，是实际连接一次：

```bash
psql postgres
```

如果能进入 `psql` 交互界面，说明至少本机的基础安装和本地连接已经打通了。

## 初学者第一次安装最容易踩的坑

### 1. 只装了客户端，没有装服务端

有些环境里你可能能执行 `psql --version`，但就是连不上数据库。这往往是因为只装了客户端工具，没有真正安装 PostgreSQL 服务。

所以验证时一定要同时看：

- `psql` 在不在
- PostgreSQL 服务有没有启动

### 2. 服务已经装好，但没有启动

这也是最常见的问题之一。

表现通常是连接时报错，提示无法连接到本地套接字或端口。很多时候不是数据库坏了，只是服务还没启动。

### 3. 版本号写错

例如你安装的是 `postgresql@16`，却执行了：

```bash
brew services start postgresql@17
```

这样当然启动不了。命令里的版本号要和本机安装版本对应。

### 4. PATH 没配置好

如果终端提示找不到 `psql`，通常是下面两种情况：

- 还没装客户端
- 已经装了，但命令路径没进环境变量

这时不要急着重装，先确认 PostgreSQL 的安装路径和 shell 配置。

### 5. 以为“安装成功”就等于“已经有业务数据库”

安装 PostgreSQL 后，系统通常只会帮你准备一个默认环境，不代表你已经有自己的业务数据库。

也就是说：

- 你可能能连上 PostgreSQL
- 但你还没有自己要用的数据库和表

这是正常现象，后面学习时再创建即可。

## 安装阶段的最低目标

如果你是第一次接触 PostgreSQL，安装这一步只要做到下面几点就够了：

- 能执行 `psql --version`
- 能确认 PostgreSQL 服务已经启动
- 能成功执行一次本地连接

只要这三步通过，就说明你的环境已经具备继续学习的条件。

下一篇会继续讲：服务怎么启动、停止、重启，以及服务异常时先排查什么。
