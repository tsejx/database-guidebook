---
nav:
  title: SQL
  order: 2
group:
  title: 概览
  order: 1
title: 图形化工具
order: 11
---

## 图形化工具

## Sequal Ace

使用 TCP 连接


如果你只想快速连接，不想折腾 socket：

1. 打开 Sequel Ace；
2. 连接方式改为 Standard；
3. 主机填：127.0.0.1
4. 端口：3306
5. 用户名：root
6. 密码：如果没设密码可以留空，或者用你 MySQL 安装时设的密码。

⚠️ 一定要用 127.0.0.1，不要用 localhost，否则 MySQL 会继续尝试用 socket。