---
nav:
  title: PostgreSQL
  order: 3
group:
  title: 概览
  order: 1
title: 启动与停止
order: 3
---

# 启动与停止

安装完 PostgreSQL 之后，下一步要搞清楚的是：这个数据库服务怎么启动、怎么停止、怎么重启，以及怎么确认它当前是不是正在运行。

这一步很重要，因为很多“连不上数据库”的问题，本质上都不是 SQL 写错了，而是服务压根没起来。

## 先理解：你要操作的是数据库服务

PostgreSQL 不是一个普通文本文件，而是一个持续运行的服务程序。

所以你平时会做这几类操作：

- 启动服务
- 停止服务
- 重启服务
- 查看服务状态

不同系统命令不完全一样，但思路完全一致。

## 在 macOS 上常见的操作方式

如果你是通过 Homebrew 安装的 PostgreSQL，通常会用 `brew services` 来管理服务。

### 启动服务

```bash
brew services start postgresql@17
```

### 停止服务

```bash
brew services stop postgresql@17
```

### 重启服务

```bash
brew services restart postgresql@17
```

### 查看状态

```bash
brew services list
```

如果你看到 PostgreSQL 对应服务处于 `started` 一类的状态，就说明它已经在运行。

## 在 Linux 上常见的操作方式

很多 Linux 发行版会用 `systemctl` 管理 PostgreSQL 服务。

### 启动服务

```bash
sudo systemctl start postgresql
```

### 停止服务

```bash
sudo systemctl stop postgresql
```

### 重启服务

```bash
sudo systemctl restart postgresql
```

### 查看状态

```bash
sudo systemctl status postgresql
```

有些系统的服务名可能带版本号，比如 `postgresql-17`。如果通用名字不生效，就需要看本机实际服务名。

## 什么时候需要重启

初学阶段，常见重启场景通常有这几种：

- 刚改完某些配置，希望让新配置生效
- 服务状态异常，想先恢复到正常状态
- 安装后第一次没有正常拉起服务

如果你只是执行查询、建表、插入数据，一般不需要频繁重启数据库服务。

## 怎么判断 PostgreSQL 真的在运行

最直接的方法有两个。

### 方法一：看服务状态

也就是上一节提到的：

- macOS 看 `brew services list`
- Linux 看 `systemctl status postgresql`

### 方法二：实际连一次

如果你能成功执行：

```bash
psql postgres
```

并进入 `psql` 命令行界面，那么通常说明服务已经正常工作。

## 常见启动失败排查

初学者遇到问题时，不要一下子怀疑自己把数据库“搞坏了”。先按顺序排查最常见的原因。

### 1. 服务根本没启动成功

表面上你执行了启动命令，但服务其实立刻退出了。这时不要只看命令有没有返回，而要继续看状态信息。

重点先确认：

- 服务当前是否是 running / active
- 是否有明确报错提示

### 2. 版本号或服务名写错

比如你安装的是 `postgresql@16`，却执行了 `postgresql@17` 的启动命令。或者 Linux 上真实服务名并不是 `postgresql`。

这类问题最常见，也最容易忽略。

### 3. 端口被占用

PostgreSQL 默认使用 `5432` 端口。如果这个端口已经被其他进程占用，服务可能无法正常启动。

遇到这类情况，重点不是立刻改很多配置，而是先确认：

- 是不是已经有另一个 PostgreSQL 实例在运行
- 是不是别的程序占用了 `5432`

### 4. 数据目录有问题

PostgreSQL 需要数据目录来保存数据库文件。如果初始化不完整，或者目录权限不对，服务也可能起不来。

对初学者来说，看到这类问题时，先不要乱删数据目录。先确认安装方式、初始化步骤和目录权限是否正确。

### 5. 权限问题

在 Linux 上，PostgreSQL 通常由专门的系统用户运行。如果你手动改过目录权限、数据目录路径或启动方式，可能导致服务没有权限读写文件。

这时要优先检查权限，而不是反复重试同一条启动命令。

## 初学阶段最实用的处理顺序

如果你发现连不上 PostgreSQL，可以先按这个顺序看：

1. 先看服务状态
2. 如果没启动，尝试启动服务
3. 启动后再用 `psql` 实际连接一次
4. 仍然失败，再去看端口、服务名、权限或日志信息

这个顺序比一开始就查很多高级配置更有效。

## 这一篇记住什么就够了

你现在至少要掌握这四件事：

- 会启动 PostgreSQL
- 会停止 PostgreSQL
- 会重启 PostgreSQL
- 会查看 PostgreSQL 当前状态

下一篇开始进入“连接”这个话题：怎么用 `psql` 连本地数据库，以及连接参数到底是什么意思。
