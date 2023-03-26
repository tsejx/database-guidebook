---
nav:
  title: SQL
  order: 2
group:
  title: 高阶用法
  order: 5
title: 存储引擎
order: 1
---

# 存储引擎

存储引擎是 MySQL 的组件，用于处理不同表类型的 SQL 操作。不同的存储引擎提供不同的存储机制、索引技巧、锁定水平等功能，使用不同的存储引擎，还可以获得特定的功能。

使用哪一种引擎可以灵活选择，一个数据库中多个表可以使用不同引擎以满足各种性能和实际需求，使用合适的存储引擎，将会提高整个数据库的性能。

MySQL 服务器使用可插拔的存储引擎体系结构，可以从运行中的 MySQL 服务器加载或卸载存储引擎 。

## 查看存储引擎

```sql
-- 查看支持的存储引擎
show engines;

-- 查看默认存储引擎
show variables like '%storage_engine%';

--查看具体某一个表所使用的存储引擎，这个默认存储引擎被修改了！
show create table <table_name>;

--准确查看某个数据库中的某一表所使用的存储引擎
show table status like '%table_name%'
show table status from database where name="%table_name%"
```

## 设置存储引擎

```sql
-- 建表时指定存储引擎。默认的就是 INNODB，不需要设置
create table t1 (i int) engine = InnoDB;
create table t2 (i int) engine = CSV;
create table t3 (i int) engine = MEMORY;

-- 修改存储引擎
alter table %table_name% engine = InnoDB;

-- 修改默认存储引擎，也可以在配置文件 my.cnf 中修改默认引擎
set default_storage_engine=NDBCLUSTER;
```

默认情况下，每当 `CREATE TABLE` 或 `ALTER TABLE` 不能使用默认存储引擎时，都会生成一个警告。为了防止在所需的引擎不可用时出现令人困惑的意外行为，可以启用 `NO_ENGINE_SUBSTITUTION SQL` 模式。如果所需的引擎不可用，则此设置将产生错误而不是警告，并且不会创建或更改表

## 存储引擎对比

常见的存储引擎就 InnoDB、MyISAM、Memory、NDB。

InnoDB 现在是 MySQL 默认的存储引擎，支持事务、行级锁定和外键

### 文件存储引擎对比

在 MySQL 中建立任何一张数据表，在其数据目录对应的数据库目录下都有对应表的 `.frm` 文件，`.frm` 文件是用来保存每个数据表的元数据(meta)信息，包括表结构的定义等，与数据库存储引擎无关，也就是任何存储引擎的数据表都必须有 `.frm` 文件，命名方式为 数据表名 `.frm`，如 `user.frm`。

查看 MySQL 数据保存在哪里：

```sql
show variables like 'data%';
```

MyISAM 物理文件结构为：

- `.frm` 文件：与表相关的元数据信息都存放在 frm 文件，包括表结构的定义信息等
- `.MYD` (MYData) 文件：MyISAM 存储引擎专用，用于存储 MyISAM 表的数据
- `.MYI` (MYIndex)文件：MyISAM 存储引擎专用，用于存储 MyISAM 表的索引相关信息

InnoDB 物理文件结构为：

- `.frm` 文件：与表相关的元数据信息都存放在 `frm` 文件，包括表结构的定义信息等
- `.ibd` 文件或 `.ibdata` 文件： 这两种文件都是存放 InnoDB 数据的文件，之所以有两种文件形式存放 InnoDB 的数据，是因为 InnoDB 的数据存储方式能够通过配置来决定是使用共享表空间存放存储数据，还是用独享表空间存放存储数据。
  - 独享表空间存储方式使用 `.ibd` 文件，并且每个表一个 `.ibd` 文件
  - 共享表空间存储方式使用 `.ibdata` 文件，所有表共同使用一个 `.ibdata` 文件（或多个，可自己配置）

### InnoDB 与 MyISAM 对比

1. InnoDB 支持事务，MyISAM 不支持事务。这是 MySQL 将默认存储引擎从 MyISAM 变成 InnoDB 的重要原因之一；
2. InnoDB 支持外键，而 MyISAM 不支持。对一个包含外键的 InnoDB 表转为 MYISAM 会失败；
3. InnoDB 是聚簇索引，MyISAM 是非聚簇索引。
   1. 聚簇索引的文件存放在主键索引的叶子节点上，因此 InnoDB 必须要有主键，通过主键索引效率很高。但是辅助索引需要两次查询，先查询到主键，然后再通过主键查询到数据。因此，主键不应该过大，因为主键太大，其他索引也都会很大。
   2. 而 MyISAM 是非聚集索引，数据文件是分离的，索引保存的是数据文件的指针。主键索引和辅助索引是独立的。
4. InnoDB 不保存表的具体行数，执行 select count(\*) from table 时需要全表扫描。而 MyISAM 用一个变量保存了整个表的行数，执行上述语句时只需要读出该变量即可，速度很快；
5. InnoDB 最小的锁粒度是行锁，MyISAM 最小的锁粒度是表锁。一个更新语句会锁住整张表，导致其他查询和更新都会被阻塞，因此并发访问受限。这也是 MySQL 将默认存储引擎从 MyISAM 变成 InnoDB 的重要原因之一；

| 对比项   | MyISAM                                                   | InnoDB                                                                         |
| :------- | :------------------------------------------------------- | :----------------------------------------------------------------------------- |
| 主外键   | 不支持                                                   | 支持                                                                           |
| 事务     | 不支持                                                   | 支持                                                                           |
| 行表锁   | 表锁，即使操作一条记录也会锁住整个表，不适合高并发的操作 | 行锁,操作时只锁某一行，不对其它行有影响，适合高并发的操作                      |
| 缓存     | 只缓存索引，不缓存真实数据                               | 不仅缓存索引还要缓存真实数据，对内存要求较高，而且内存大小对性能有决定性的影响 |
| 表空间   | 小                                                       | 大                                                                             |
| 关注点   | 性能                                                     | 事务                                                                           |
| 默认安装 | 是                                                       | 是                                                                             |

> Q：一张表，里面有 ID 自增主键，当 insert 了 17 条记录之后，删除了第 15,16,17 条记录，再把 Mysql 重启，再 insert 一条记录，这条记录的 ID 是 18 还是 15 ？

如果表的类型是 MyISAM，那么是 18。因为 MyISAM 表会把自增主键的最大 ID 记录到数据文件中，重启 MySQL 自增主键的最大 ID 也不会丢失；

如果表的类型是 InnoDB，那么是 15。因为 InnoDB 表只是把自增主键的最大 ID 记录到内存中，所以重启数据库或对表进行 OPTION 操作，都会导致最大 ID 丢失。

> Q：哪个存储引擎执行 `select count(*)` 更快，为什么?

1. MyISAM 更快，因为 MyISAM 内部维护了一个计数器，可以直接调取。
2. 在 MyISAM 存储引擎中，把表的总行数存储在磁盘上，当执行 `select count(*) from t` 时，直接返回总数据。
3. 在 InnoDB 存储引擎中，跟 MyISAM 不一样，没有将总行数存储在磁盘上，当执行 `select count(*) from t` 时，会先把数据读出来，一行一行的累加，最后返回总数量。
4. InnoDB 中 `count(*)` 语句是在执行的时候，全表扫描统计总数量，所以当数据越来越大时，语句就越来越耗时了，为什么 InnoDB 引擎不像 MyISAM 引擎一样，将总行数存储到磁盘上？这跟 InnoDB 的事务特性有关，由于多版本并发控制（MVCC）的原因，InnoDB 表“应该返回多少行”也是不确定的。
