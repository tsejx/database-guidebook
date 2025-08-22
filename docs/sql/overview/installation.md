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

## Windows

在 Windows 系统中安装 MySQL 通常包括下载 MySQL 安装程序并进行基本配置。以下是在 Windows 上安装 MySQL 的基本步骤：

1. 下载 MySQL 安装程序：
   - 前往 MySQL 官方网站的下载页面：[MySQL Downloads](https://dev.mysql.com/downloads/installer/)
   - 在页面中，找到适合版本的 Windows 的 MySQL Installer 并下载。
2. 运行安装程序：双击下载的安装程序（通常是一个 `.exe` 文件），启动安装向导。
3. 选择安装类型：在 MySQL 安装向导中，选择 "Server only" 或 "Server and Client"，具体根据你的需求选择。
4. 选择配置类型：在配置类型中，选择 "Development Machine" 或 "Server Machine"，具体根据你的需求选择。
5. 选择数据库和连接方式：
    - 在 "Select Products and Features" 中，选择需要安装的 MySQL 版本和其他组件。
    - 在 "Authentication Method" 中，选择你喜欢的身份验证方式。默认情况下，可以选择 "Use Strong Password Encryption"。
6. 设置 MySQL 密码：在 "Accounts and Roles" 中，设置 MySQL 的 root 用户密码。确保选择一个强密码，并记得保存。
7. 配置端口和服务名称：在 "Windows Service" 中，选择 MySQL 服务的名称和端口。默认端口为 3306。
8. 启动 MySQL 安装：确认配置信息后，点击 "Execute" 或 "Next" 开始安装。
9. 等待安装完成：安装程序会下载并安装所选组件，这可能需要一些时间。
10. 完成安装：安装完成后，向导会显示 "Complete!"。点击 "Next" 完成向导。
11. 启动 MySQL Workbench（可选）：MySQL 安装向导通常会包括 MySQL Workbench，这是一个 MySQL 的官方图形用户界面工具。你可以选择在安装完成后启动它。
12. 验证安装：打开 MySQL Workbench 或使用命令行工具，尝试连接到 MySQL 数据库，确保你可以成功登录。

以上步骤是一个基本的 MySQL 安装过程。具体步骤可能会有所不同，具体取决于你选择的 MySQL 版本和安装选项。在安装过程中，务必注意安装向导中的指导信息，并根据你的需求进行选择。

## MacOS

在 macOS 系统中，你可以使用 Homebrew 或者 MySQL 官方提供的 DMG 文件进行 MySQL 的安装。以下是两种方法的简要说明：


### 通过 Homebrew 进行安装

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

### 使用 MySQL 官方 DMG 文件安装

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

## Linux

官方提供的命令行安装：[MySQL Community Downloads](https://dev.mysql.com/downloads/shell/)
