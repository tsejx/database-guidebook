---
nav:
  title: MongoDB
  order: 4
group:
  title: Mongoose
  order: 10
title: 模式类型 SchemaTypes
order: 3
---

# 模式类型 SchemaTypes

处理字段路径各种属性定义。

## 标准类型

- String 字符串
- Number 数字
- Date 日期
- Buffer 二进制
- Boolean 布尔值
- Mixed 混合类型
- ObjectId 对象 ID
- Array 数组
- Decimal128

你可以直接声明 schema type 为某一种 type，或者赋值一个含有 `type` 属性的对象。

```js
// 方式一
const schema1 = new Schema({
  test: String,
});

// 方式二
const schema2 = new Schema({
  test: { type: String },
});
```

除了 type 属性，你还可以对这个字段路径指定其他属性。 如果你要在保存之前要把字母都改成小写：

```js
var schema2 = new Schema({
  test: {
    type: String,
    lowercase: true, // Always convert `test` to lowercase
  },
});
```

## 选项说明

### 全部类型可用

| 选项        | 类型                    | 说明                                                               |
| :---------- | :---------------------- | :----------------------------------------------------------------- |
| `required`  | `boolean` \| `function` | 是否必填项，如果值为真，为此属性添加 [验证器]()                    |
| `default`   | `any` \| `function`     | 默认值，设置此路径默认值。如果是函数，函数返回值为默认值           |
| `select`    | `boolean`               | 指定查询器（Query）的默认映射（`projections`）                     |
| `validate`  | `function`              |                                                                    |
| `get`       |                         | 函数使用 `Object.defineProperty()` 定义自定义 getter               |
| `set`       |                         | 函数使用 `Object.defineProperty()` 定义自定义 setter               |
| `alias`     |                         |                                                                    |
| `immutable` | `boolean`               |                                                                    |
| `transform` | `function`              | 当你执行 `Document#toJSON()` 时，Mongoose 会自动执行该函数进行转换 |
| `index`     | `boolean`               | 是否对这个属性创建索引                                             |
| `unique`    | `boolean`               | 是否对这个属性创建唯一索引                                         |
| `sparse`    | `boolean`               | 是否对这个属性创建稀疏索引                                         |

<br />

```js
const numberSchema = new Schema({
  integerOnly: {
    type: Number,
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
    alias: 'i',
  },
});

const Number = mongoose.model('Number', numberSchema);

const doc = new Number();
doc.integerOnly = 2.001;
doc.integerOnly; // 2
doc.i; // 2
doc.i = 3.001;
doc.integerOnly; // 3
doc.i; // 3
```

### 仅字符串类型可用

| 选项        | 类型      | 说明                                         |
| :---------- | :-------- | :------------------------------------------- |
| `lowercase` | `boolean` | 是否在保存前对此值调用 `.toLowerCase()`      |
| `uppercase` | `boolean` | 是否在保存前对此值调用 `.toUpperCase()`      |
| `trim`      | `boolean` | 是否在保存前对此值调用 `.trim()`             |
| `match`     | `regexp`  | 创建文档时会校验这个值是否匹配给定正则表达式 |
| `enum`      | `array`   | 创建文档时会校验这个值是否包含于给定数组     |

### 仅数字类型可用

| 选项  | 类型     | 说明                                   |
| :---- | :------- | :------------------------------------- |
| `min` | `number` | 创建文档时会校验属性是否大于或等于该值 |
| `max` | `number` | 创建文档时会校验属性是否小于或等于该值 |

### 仅日期类型可用

| 选项  | 类型   | 说明                                   |
| :---- | :----- | :------------------------------------- |
| `min` | `date` | 创建文档时会校验属性是否大于或等于该值 |
| `max` | `date` | 创建文档时会校验属性是否小于或等于该值 |

### 仅对象 ID 可用

| 选项       | 类型     | 说明                                 |
| :--------- | :------- | :----------------------------------- |
| `populate` | `object` | 设置默认的联表查询（`populate`）选项 |

## 使用说明

### Getters

```js
const root = 'https://s3.amazonaws.com/mybucket';

const userSchema = new Schema({
  name: String,
  picture: {
    type: String,
    get: (v) => `${root}${v}`,
  },
});

const User = mongoose.model('User', userSchema);

const doc = new User({ name: 'Val', picture: '/123.png' });

doc.picture; // 'https://s3.amazonaws.com/mybucket/123.png'
doc.toObject({ getters: false }).picture; // '/123.png'
```
