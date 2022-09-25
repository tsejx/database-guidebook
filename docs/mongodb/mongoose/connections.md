---
nav:
  title: MongoDB
  order: 4
group:
  title: Mongoose
  order: 10
title: 连接 Connections
order: 2
---

# 连接 Connections

## 连接数据库

通过 `mongoose.connect()` 连接数据库，同时可以通过绑定事件监听器来监听数据库是否连接成功。

```js
// 1. 引入数据库驱动
const mongoose = require('mongoose');

// 2. 建立连接
mongoose.connect('mongodb://localhost/myapp', { useMongoClient: true });

// 设置回调函数
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.on('open', () => {
  console.log('connected db: myapp');
});
```

示例：

```js
mongoose.connect(uri);

mongoose.connect(uri, options);

mongoose.connect(uri, function (err) {
  // if error is truthy, the initial connection failed
});
```

### 连接字符串

在 URI 中可指定多个参数：

```js
mongoose.connect('mongodb://user:pass@host:port,anotherhost:port,yetanother:port/database?options');
```

这是连接到本地 `db` 数据库默认接口（27017）的最小配置。本地连接失败可以尝试连接 `127.0.0.1`。

| 连接字符串选项 | 说明       |
| :------------- | :--------- |
| `user`         | 用户名     |
| `pass`         | 密码       |
| `host`         | 数据库域名 |
| `port`         | 数据库端口 |
| `database`     | 数据库名称 |
| `options`      | 其他可选项 |

如果连接需要**用户名**和**密码**：

```js
// 语法
mongoose.connect('mongodb://root:password@localhost/myapp');

// 例如：连接本地 MongoDB 名为 eggcms 的数据库，账户名 eggadmin，密码123456
mongoose.connect('mongodb://eggadmin:123456@localhost:27017/eggcms');
```

你也可以在连接字符串填写驱动选项，但是这只适用于 MongoDB 驱动使用的选项，所以类似于 `bufferCommands` 的 Mongoose 专用选项不能在连接字符串使用。

```js
mongoose.connect('mongodb://localhost:27017/test?connectTimeoutMs=1000&bufferCommands=false');
// The above is equivalent to:
mongoose.connect('mongodb://localhost:27017/test', {
  connectTimeoutMS: 1000,
  // Note that mongoose will **not** pull `bufferCommands` from the query string
});
```

把选项放在连接字符串的劣势是不便于阅读，优势是你只需要写一条连接而不需要把所有设定分开写。最佳实践是把区分 **生产环境** 和 **开发环境** 的选项如 `socketTimeoutMS` 、 `connectTimeoutMS` 放在 `uri` ， 把通用的常量如 `connectTimeoutMS` 、 `poolSize` 放在选项对象里。

### 连接选项

`connect` 方法还接受一个选项对象 `options` 参数，这些参数会传入 MongoDB 底层驱动程序。这里所包含的所有选项优先于连接字符串中传递的选项。

```js
mongoose.connect(uri, options);
```

<br />

| 选项               | 默认值 | 说明                                                                                                                                                                                          |
| :----------------- | :----- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dbName`           | -      | 连接的数据库名称（覆盖连接字符串）                                                                                                                                                            |
| `usr`              | -      | 用于认证的用户名                                                                                                                                                                              |
| `pass`             | -      | 用于认证的密码                                                                                                                                                                                |
| `autoIndex`        | `true` | 默认情况下，Mongoose 在连接时会自动建立 Schema 的索引，这有利于开发，但是在大型生产环境下不是十分理想，因为索引建立会导致性能下降。如果 `autoIndex` 设为 `false`，Mongoose 将不会自动建立索引 |
| `poolSize`         | 5      | MongoDB 保持的最大 Socket 连接数                                                                                                                                                              |
| `bufferCommands`   | `true` |                                                                                                                                                                                               |
| `bufferTimeoutMS`  | `true` |                                                                                                                                                                                               |
| `bufferMaxEntries` | -      | MongoDB 驱动同样有自己的离线时缓存机制，如果你希望连接错误时终止数据库操作，请将此选项设为 0 以及把 `bufferCommands` 设为 `false`                                                             |
| `bufferCommands`   | -      |                                                                                                                                                                                               |
| `keepAlive`        | -      |                                                                                                                                                                                               |
| `auth`             | -      |                                                                                                                                                                                               |
| `replset`          | -      |                                                                                                                                                                                               |
| `mongos`           | -      | 连接多个数据库                                                                                                                                                                                |

### 连接回调

`connect()` 函数接收回调函数，或返回一个 Promise。

```js
mongoose.connect(uri, options, function (error) {
  // Check error in initial connection. There is no 2nd param to the callback.
});

// Or using promises
mongoose.connect(uri, options).then(
  () => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
  },
  (err) => {
    /** handle initial connection error */
  }
);
```

## 副本集连接

要连接到副本集，你可以用逗号分隔，传入多个地址。

```js
mongoose.connect('mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]' [, options]);)
```

要连接到单节点副本集，需指定 `replicaSet` 选项。

```js
mongoose.connect('mongodb://host1:port1/?replicaSet=rsName');
```

## 分片集群支持

使用高性能分片集群，需要连接多个 Mongos（MongoDB Shard）实例。

```js
// Connect to 2 mongos servers
mongoose.connect('mongodb://mongosA:27501,mongosB:27501', cb);
```

## 断开连接数据库

使用 `disconnect()` 方法可以断开连接。

```js
const mongoose = require('mongoose');

mongoose.connect('mongodb://root:password@localhost/blog', function (err) {
  if (err) {
    console.log('连接失败');
  } else {
    console.log('连接成功');
  }
});

setTimeout(function () {
  mongoose.disconect(function () {
    console.log('断开连接');
  });
});
```
