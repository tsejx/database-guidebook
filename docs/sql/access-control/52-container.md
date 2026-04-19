---
nav:
  title: SQL
  order: 2
group:
  title: 高级用法
  order: 4
title: 容器化
order: 52
---

# 容器化

本文档说明如何在本地直接使用 **官方 MySQL 镜像** 启动服务，并通过 **Volume / Bind Mount** 将数据挂载到宿主机目录，方便测试数据持久化。

## 结论

可以直接使用官方 MySQL 镜像，不一定需要自己构建镜像。

官方镜像支持把容器内的 MySQL 数据目录挂载到宿主机，例如挂载到当前目录下的 `./data`：

- 容器内数据目录：`/var/lib/mysql`
- 宿主机目录：`./data`

本地测试时这样做很方便；线上环境通常不建议直接挂载到项目目录，而是使用专门的数据盘、固定绝对路径或 Docker volume。

---

## 1. 准备目录

在当前目录下创建数据目录：

```bash
mkdir -p ./data
```

如果你希望初始化数据库脚本，也可以额外准备：

```bash
mkdir -p ./initdb
```

说明：

- `./data`：用于持久化 MySQL 数据文件
- `./initdb`：可选，放置初始化 SQL 或 shell 脚本，首次启动时会自动执行

---

## 2. 拉取官方 MySQL 镜像

以 MySQL 8.0 为例：

```bash
docker pull mysql:8.0
```

如果你需要其他版本，可替换标签，例如：

```bash
docker pull mysql:5.7
```

---

## 3. 启动 MySQL 容器

执行下面命令：

```bash
docker run -d \
  --name mysql-test \
  -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=123456 \
  -e MYSQL_DATABASE=testdb \
  -v "$(pwd)/data:/var/lib/mysql" \
  -v "$(pwd)/initdb:/docker-entrypoint-initdb.d" \
  mysql:8.0
```

参数说明：

- `--name mysql-test`：容器名
- `-p 3306:3306`：映射到本机 3306 端口
- `MYSQL_ROOT_PASSWORD=123456`：设置 root 密码
- `MYSQL_DATABASE=testdb`：首次启动时自动创建数据库 `testdb`
- `-v "$(pwd)/data:/var/lib/mysql"`：把 MySQL 数据目录挂载到当前目录 `data`
- `-v "$(pwd)/initdb:/docker-entrypoint-initdb.d"`：可选初始化脚本目录

如果你暂时没有初始化脚本，可以去掉 `initdb` 这一行。

---

## 4. 检查容器是否启动成功

查看容器状态：

```bash
docker ps
```

查看日志：

```bash
docker logs -f mysql-test
```

看到类似下面的日志，通常表示启动成功：

```text
ready for connections
```

---

## 5. 连接测试

可以直接进入容器连接：

```bash
docker exec -it mysql-test mysql -uroot -p123456
```

进入 MySQL 后测试：

```sql
SHOW DATABASES;
USE testdb;
```

也可以从宿主机本地工具连接：

- Host: `127.0.0.1`
- Port: `3306`
- User: `root`
- Password: `123456`

---

## 6. 验证数据是否持久化

1. 先写入一些测试数据
2. 重启容器：

```bash
docker restart mysql-test
```

3. 再次连接确认数据是否还在

如果数据仍然存在，说明挂载到宿主机的 `./data` 已生效。

---

## 7. 停止与删除容器

停止容器：

```bash
docker stop mysql-test
```

删除容器：

```bash
docker rm mysql-test
```

注意：

- 删除容器 **不会删除** `./data` 中的数据
- 如果你删除 `./data` 目录，数据库数据才会真正丢失

---

## 8. 本地测试和线上环境的区别

### 本地测试

本地可以直接挂载到当前项目目录，例如：

```bash
-v "$(pwd)/data:/var/lib/mysql"
```

这样做的优点：

- 简单直接
- 方便观察数据文件是否落盘
- 方便清理和反复测试

适合：

- 本地开发
- 临时验证镜像启动
- 测试初始化脚本
- 验证数据持久化

### 线上环境

线上通常**不建议**把 MySQL 数据直接挂在项目当前目录下，而更推荐：

1. 使用 Docker volume
2. 或挂载到宿主机固定绝对路径，例如 `/data/mysql`
3. 或使用云盘 / 独立数据盘

原因包括：

- 项目目录常常会被重新发布、替换或清理
- 数据目录和代码目录混放，运维管理不方便
- 权限、备份、监控、磁盘扩容更难管理
- 数据库对磁盘性能和稳定性要求更高

线上更常见的方式示例：

```bash
docker volume create mysql_data

docker run -d \
  --name mysql-prod \
  -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=your_strong_password \
  -v mysql_data:/var/lib/mysql \
  mysql:8.0
```

或者：

```bash
docker run -d \
  --name mysql-prod \
  -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=your_strong_password \
  -v /data/mysql:/var/lib/mysql \
  mysql:8.0
```

---

## 9. 什么时候需要自己构建 MySQL 镜像

只有在下面这些场景，才建议自己写 Dockerfile 构建：

- 需要内置自定义 `my.cnf`
- 需要预装额外工具或插件
- 需要在镜像里放固定初始化脚本
- 需要公司内部统一基础镜像

如果只是本地测试 MySQL 是否能正常启动、连接、持久化，直接使用官方镜像通常就够了。
