# 1.express项目生成器

```bash
# 全局安装脚手架 --- 只需要安装一次即可
cnpm i express-generator -g

# 创建项目 ---- 使用 ejs 模版语法
express myapp --view=ejs

// 如果没有安装脚手架。可以通过 此命令创建项目。npx express myapp --view=ejs

# 还可以选择别的 模版语法  jade 。。。。

# 进入项目 安装依赖(项目中包含 package.json， cnpm i 即可)
cd myapp
cnpm i

# 配置自动运行命令 package.json - scripts
## 如果没有安装过 nodemon     cnpm i nodemon -g    安装过的可忽略
"scripts": {
	"start": "node ./bin/www",   # 对象多个之间需要添加 逗号
	"dev": "nodemon ./bin/www" 	 # cnpm i supervisor -g.   "dev": "supervisor ./bin/www"
},

# 运行命令
npm run dev
```

# 2.了解项目目录结构

```js
myapp
	|-bin
		www                   # 创建服务器
	|-public								# 静态资源目录
		|-images								# 图片
		|-javascripts						# 静态js
		|-stylesheets						# 静态样式表
	|-routes								# 模块化的路由
  	index.js
		users.js
	|-views									# 页面模版
  	error.ejs
		index.ejs								# 主页面结构， 前端index.html 后端编译成为index.ejs
	app.js									# 模块化路由的设定以及其他（中间件，req.body....）
	package.json						# 项目描述文件
```

# 3.ejs模版语法介绍

可以理解为一种 标记语言的 渲染。

```ejs
<%
<%- str %>	 解析输出
<%= str %>   转义输出 --- 原样输出

<% if (a > 2) { %>
<% } %>

<% for(var i = 0; i < 10; i++) { %>
<% } %>

<%- include('./**.ejs') %>
```

如果遇到变量，考虑使用的是 - 或者是 =

如果是业务逻辑语句，先写js，后加<%

```js
// routes/index.js 测试。<%-  <%= 的区别
var express = require('express');
var router = express.Router();
var os = require('os')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: '<mark>Express</mark>',
    platform: os.platform(),
    list: ['a', 'b', 'c', 'd']
  });
});

module.exports = router;

```

```ejs
// views/index.ejs
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
    <%- include('./header.ejs') %>
    <h1><%= title %></h1>
    <p>Welcome to <%- title %></p>
    <% if (platform === 'darwin') { %>
      <div>mac</div>
    <% } else { %>
      <div>windows</div>
    <% } %>
    
    <% for(var i = 0; i < list.length; i++ ) { %>
      <div><%- list[i] %></div>
    <% } %>
  </body>
</html>

```





# 4.数据库mongodb

下载mongodb

windows 安装mongodb
百度网盘下载: 链接：https://pan.baidu.com/s/1mIbNrhzFMzMzB3jLs92Dsg 提取码：o8pw

mac

https://www.cnblogs.com/cbowen/p/11748922.html



## 4.1 准备工作

**windows用户**

打开自己的 D 盘，

D盘的根目录下创建文件夹 mongodb， 

解压上面下载的 压缩包 到mongodb文件夹

一直点进去，发现有一个bin目录的文件夹，打开bin目录



打开D盘的根目录，创建文件夹data，在data文件夹内再创建 db文件夹

```
|-D
	|-mongodb
	|-data
		|-db
```

再次打开mongodb下的bin目录，此时按住shift健，点击鼠标的右键，选择在此处打开命令行窗口（powershell窗口）

在打开的命令行中输入如下指令

```
./mongod --dbpath d:\data\db
```

如果输出的代码中包含 wating for connections on port 27017 即为成功，否则就是失败

![](img/42.png)



如果报错如下：

![](img/43.png)

输入如下指令

```
mongod --dbpath d:\data\db
```

如果报错信息如下：

![](img/44.png)

需要添加环境变量： https://www.pianshen.com/article/19201056771/

此电脑 / 计算机 ---》点击右键 ----〉 属性 ---- 》点击左侧的 高级系统设置 ----〉 高级- 环境变量 ----》找系统变量，不要找用户变量（上面的叫用户变量，下面的叫系统变量）---- 点击系统变量的 path属性，选中，点击编辑。

复制一下 mongodb文件夹下的bin目录

点击 编辑 path时添加进去复制的目录

关闭之前的窗口，bin目录下重新打开。命令行窗口运行如下代码

```
mongod --dbpath d:\data\db
```

如果遇到如下错误 https://blog.csdn.net/weixin_44198965/article/details/99704674

![](img/48.png)

mongodb非正常关闭，建议重新启动电脑之后再试

**mac用户**

可以mongodb 官网下载mongodb，

访达 -》前往-〉前往文件夹 -》 输入 /usr/local 回车

创建文件夹 mongodb，解压之前下载的文件进去

![](img/45.png)



![](img/46.png)



![](img/47.png)



执行如下命令,出现 wating for connections on port 27017 即为成功，否则就是失败

```bash
cd ~
ls
# 查看有没有data的目录
# 如果没有的话 mkdir data

cd /usr/local/mongodb
ls
cd bin
./mongod --dbpath ~/data

```

* 关闭mongodb服务

在命令行窗口连续按2次c t r l+c 然后再关闭窗口

在使用数据库期间，不要关闭窗口。----   数据库的连接池

## 4.2 测试mongodb是否可以使用

记住不要关闭上次的窗口，打开mongodb的bin目录

再次安装shift，打开一个新的窗口

此时此刻输入如下指令

```
./mongo
```

或者是

```
mongo
```

如果出现 > 就代表成功

![](img/49.png)



如果长时间不出现的，打开你的第一个窗口，按一次 c t r l + c,再次回到 第二个窗口即可



假如 如果 第一个窗口关了 怎么再开？ ----- 关机以后也需要如此

重新打开数据库连接池  进入到mongodb的bin目录下，打开命令行窗口

输入如下指令 ---- 打开数据库连接池的

```
./mongod --dbpath d:\data\db

或者

mongod --dbpath d:\data\db
```

当打开测试窗口之后，就可以参照预习笔记的第4天，照着去练习一遍

第二个窗口输入如下指令，测

```
show dbs
```

![](img/50.png)





##  4.3 mongodb
> MongoDB 是一个基于分布式文件存储的数据库。

> 由 C++ 语言编写。

> 旨在为 WEB 应用提供可扩展的高性能数据存储解决方案.

> MongoDB 是一个介于关系数据库（mysql）和非关系数据库之间的产品，是非关系数据库当中功能最丰富，最像关系数据库的

> 在高负载的情况下，添加更多的节点，可以保证服务器性能。

> MongoDB 将数据存储为一个文档，数据结构由键值(key=>value)对组成。

> MongoDB 文档类似于 JSON 对象。

> 字段值可以包含其他文档，数组及文档数组。

## 4.4 关系型数据库和非关系型数据库区别

不管我们学习什么数据库都应该学习其中的基础概念，在mongodb中基本的概念是文档、集合、数据库，下面我们挨个介绍。下表将帮助您更容易理解Mongo中的一些概念:

| sql术语/概念 | mongodb术语/概念 | 解释/说明                           |
| :----------- | :--------------- | :---------------------------------- |
| database     | database         | 数据库                              |
| table        | collection       | 数据库表/集合                       |
| row          | document         | 数据记录行/文档                     |
| column       | field            | 数据字段/域                         |
| index        | index            | 索引                                |
| table joins  |                  | 表连接，mongodb不支持               |
| primary key  | primary key      | 主键，mongdb自动将_id字段设置为主键 |

下表说明各自的优缺点以及特性

| 数据库类型     | 特性                                                         | 优点                                                         | 缺点                                                         |
| :------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| 关系型数据库   | 1、关系型数据库，是指采用了关系模型来组织数据的数据库；2、关系型数据库的最大特点就是事务的一致性；3、简单来说，关系模型指的就是二维表格模型，而一个关系型数据库就是由二维表及其之间的联系所组成的一个数据组织。 | 1、容易理解：二维表结构是非常贴近逻辑世界一个概念，关系模型相对网状、层次等其他模型来说更容易理解；2、使用方便：通用的SQL语言使得操作关系型数据库非常方便；3、易于维护：丰富的完整性(实体完整性、参照完整性和用户定义的完整性)大大减低了数据冗余和数据不一致的概率；4、支持SQL，可用于复杂的查询。 | 1、为了维护一致性所付出的巨大代价就是其读写性能比较差；2、固定的表结构；3、高并发读写需求；4、海量数据的高效率读写； |
| 非关系型数据库 | 1、使用键值对存储数据；2、分布式；3、一般不支持ACID特性；4、非关系型数据库严格上不是一种数据库，应该是一种数据结构化存储方法的集合。 | 1、无需经过sql层的解析，读写性能很高；2、基于键值对，数据没有耦合性，容易扩展；3、存储数据的格式：nosql的存储格式是key,value形式、文档形式、图片形式等等，而关系型数据库则只支持基础类型。 | 1、不提供sql支持，学习和使用成本较高；2、无事务处理，附加功能和报表等支持也不好； |

mongodb的可视化工具下载地址： https://robomongo.org/

# 5.node + mongodb

在项目中使用mongodb，会优先使用 第三方模块。[mongoose](https://mongoosejs.com/)

```
cnpm i mongoose -S
```

## 5.1 连接数据库

```js
// mongodb/db.js 
const mongoose = require('mongoose')
// 数据库地址
const DB_URL = "mongodb://localhost:27017/sz-2108"

// 连接数据库
mongoose.connect(DB_URL)

// 连接成功
mongoose.connection.once('open', () => {
  console.log('数据库连接成功')
})

// 连接失败
mongoose.connection.on('error', () => {
  console.log('数据库连接失败')
})
```

## 5.2 封装连接的数据库

按照模块化的开发思路，连接数据库属于一条单独的业务线，把db.js封装成一个模块

```js
// mongodb/db.js 
const mongoose = require('mongoose')
// 数据库地址
const DB_URL = "mongodb://localhost:27017/sz-2108"

// 连接数据库
mongoose.connect(DB_URL)

// 连接成功
mongoose.connection.once('open', () => {
  console.log('数据库连接成功')
})

// 连接失败
mongoose.connection.on('error', () => {
  console.log('数据库连接失败')
})

module.exports = mongoose
```

## 5.3 nodejs 实现集合的创建/查找

```js
// mongodb/User.js
// 用户的数据库集合
const mongoose = require('./db') // 一定要记住引入的地址
const Schema = mongoose.Schema // 数据库集合的一个对象

// 创建数据库集合
const userSchema = new Schema({ // 说明当前这个数据库集合的各个字段以及数据类型
  userId: String,
  userName: String,
  password: String,
  age: Number,
  tel: String,
  email: String
})

// 默认情况下，数据库中有了一个叫做 users 的数据库集合
module.exports = mongoose.model('User', userSchema)
// 指定当前的数据库结合名称为 myUsers
// module.exports = mongoose.model('User', userSchema, 'myUsers')

```

## 5.4 添加数据

```js
// mongodb/01insert.js
// 找到数据库的集合
const User = require('./User')

// collection.insertMany([{}, {}])
// collection.insertMany({})

User.insertMany({
  userName: '吴大勋1111',
  password: 12345678,
  age: 19,
  tel: '18813007814',
  email: '522864737@qq.com'
}, (err) => {
  if (err) throw err
  console.log('插入成功')
})
// node insert.js
// 可视化工具查看效果
```

## 5.5 删除数据

```js
// mongodb/02delete.js
const User = require('./User')

// collection.deleteOne({key: value})
// collection.deleteMany({ key: value }) // 删除key为value的多条数据
// collection.deleteMany({}) 删除所有的数据

// User.deleteOne({ userName: '吴大勋1111' }, (err) => {
//   if (err) throw err
//   console.log('删除成功')
// })

User.deleteMany({}, (err) => {
  if (err) throw err
  console.log('删除成功')
})
```



## 5.6 修改数据

先插入需要的数据

```js
// mongodb/03reinsert.js
const User = require('./User')

const arr = [
  { userName: '吴大勋', password: '123', age: 19, tel: '18813007814', email: '522864637@qq.com' },
  { userName: '赵振池', password: '12356', age: 88, tel: '15546670090', email: '492420024@qq.com' },
  { userName: '王家希', password: '575', age: 88, tel: '15830922109', email: '575805399@qq.com' },
  { userName: '甄天琪', password: '666666', age: 8, tel: '15832109583', email: '1208944706@qq.com' },
  { userName: '李家翔', password: '223322', age: 15, tel: '15349671244', email: '1024708253@qq.com' },
  { userName: '冉江坤', password: '123', age: 18, tel: '15735349256', email: '2432680009@qq.com' },
  { userName: '付竹林', password: '123', age: 19, tel: '15076454231', email: '2386796512@qq.com' },
  { userName: '田巧珍', password: '123457', age: 15, tel: '18815234114', email: '5221234637@qq.com' },
  { userName: '子龙', password: '123', age: 30, tel: '123456789', email: '123456789@qq.com' },
  { userName: '龙哥', password: '1234321', age: 99, tel: '6666666', email: '123456@long.com' },
  { userName: '梅树晨', password: '1234321', age: 99, tel: '6666666', email: '123456@long.com' }
]

User.insertMany(arr, (err) => {
  if (err) throw err
  console.log('插入成功')
})
```

```js
// mongodb/04update.js
const User = require('./User')

// 修改key值为value的第一条数据，将ke字段改为val
// collection.updateOne({ key: value }, { $set: { ke: val }})
// 修改key值为value的多条数据，将ke字段改为val
// collection.updateMany({ key: value }, { $set: { ke: val }})
// 修改key值为value的第一数据，将ke字段自增 num
// collection.updateOne({ key: value }, { $inc: { ke: num }})
// 修改key值为value的多数据，将ke字段自增 num
// collection.updateMany({ key: value }, { $inc: { ke: num }})

// User.updateOne({ userName: '吴大勋' }, { $set: { password: '456' } }, (err) => {
//   if (err) throw err
//   console.log('修改成功')
// })

User.updateMany({}, {$inc: { age: 1}}, (err) => {
  if (err) throw err
  console.log('修改成功')
})

```



## 5.7 查询数据

```js
// mongodb/05find.js
const User = require('./User')

// collection.find()
// collection.find({ key: value })
// collection.find({ key: value }, { _id: 0, key1: 1, key2: 1 }) // 查询某个字段，显示哪些字段
// collection.find({}, {}).limit(3) // 查询3条数据
// collection.find({}, {}).limit(3).skip(2) // 从第2条开始(下标从0开始) 查询3条数据
// collection.find({ age: { $gte: 30, $lte: 50 }},{}) 查看年龄为30-50之间的数据
// collection.find().sort({ age: 1})


// User.find({}, (err, data) => {
//   if (err) throw err
//   console.log(data)
// })

// User.find({ password: '123' }, (err, data) => {
//   if (err) throw err
//   console.log(data)
// })

// User.find({ password: '123' }, { _id: 0, userName: 1, password: 1 }, (err, data) => {
//   if (err) throw err
//   console.log(data)
// })

// User.find({}, { _id: 0, userName: 1, password: 1 }).limit(3).exec((err, data) => {
//   if (err) throw err
//   console.log(data)
// })
// User.find({}, { _id: 0, userName: 1, password: 1 }).limit(3).skip(2).exec((err, data) => {
//   if (err) throw err
//   console.log(data)
// })

// User.find({ age: { $gte: 30, $lte: 50 } }, (err, data) => {
//   if (err) throw err
//   console.log(data)
// })

User.find({}, {_id:0, age: 1, userName: 1}).sort({ age: -1}).exec((err, data) => {
  if (err) throw err
  console.log(data)
})
```

# 6.封装数据库的操作

项目中不可避免一直使用数据库的相关操作，为了统一性，需要封装数据库

```js
// mysql/db.js
const mongoose = require('mongoose')
// 数据库地址
const DB_URL = "mongodb://localhost:27017/sz-2108"

// 连接数据库
mongoose.connect(DB_URL)

// 连接成功
mongoose.connection.once('open', () => {
  console.log('数据库连接成功')
})

// 连接失败
mongoose.connection.on('error', () => {
  console.log('数据库连接失败')
})

module.exports = mongoose
```

```js
// mysql/collection/User.js
// 用户的数据库集合
const mongoose = require('../db') // 一定要记住引入的地址
const Schema = mongoose.Schema // 数据库集合的一个对象

// 创建数据库集合
const userSchema = new Schema({ // 说明当前这个数据库集合的各个字段以及数据类型
  userId: String,
  userName: String,
  password: String,
  age: Number,
  tel: String,
  email: String
})

// 默认情况下，数据库中有了一个叫做 users 的数据库集合
module.exports = mongoose.model('User', userSchema)
// 指定当前的数据库结合名称为 myUsers
// module.exports = mongoose.model('User', userSchema, 'myUsers')

```

```js
// mysql/index.js
// 封装增删改查
module.exports = {
  insert () {},
  delete () {},
  update () {},
  find () {},
  paging () {},
  sort () {}
}
```

## 6.1 封装插入

数据库使用基本都是 异步的操作

如何解决一步操作问题：回调函数/promise/generator + yield/async+await

```js
// mysql/index.js
const { collection } = require("./collections/User")

// 封装增删改查
module.exports = {
  insert (collection, insertData) {
    return new Promise(resolve => {
      collection.insertMany(insertData, (err) => {
        if (err) throw error
        resolve()
      })
    })
  },
  delete () {},
  update () {},
  find () {},
  paging () {},
  sort () {}
}
```

```js
// mysql/01insert.js
const mysql = require('./index')
const User = require('./collections/User')

mysql.insert(User, { 
  userName: '吴大勋123', 
  password: '12345678', 
  age:18, 
  tel: 18813007814, 
  email: '522864637@qq.com'
}).then(() => {
  console.log('插入成功')
})
```

## 6.2 查询的封装

```js
// mysql/index.js
const { collection } = require("./collections/User")

// 封装增删改查
module.exports = {
  insert (collection, insertData) {
    return new Promise(resolve => {
      collection.insertMany(insertData, (err) => {
        if (err) throw error
        resolve()
      })
    })
  },
  find (collection, whereData, showData) {
    return new Promise(resolve => {
      collection.find(whereData, showData, (err, data) => {
        if (err) throw error
        resolve(data)
      })
    })
  },
  delete () {},
  update () {},
  paging () {},
  sort () {}
}
```

```js
// mysql/02find.js
const mysql = require('./index')
const User = require('./collections/User')

mysql.find(User, {}, {_id:0, userName: 1, password: 1}).then(data => {
  console.log(data)
})
```

## 6.3 修改的封装

```js
// mysql/index.js
const { collection } = require("./collections/User")

// 封装增删改查
module.exports = {
  insert (collection, insertData) {
    return new Promise(resolve => {
      collection.insertMany(insertData, (err) => {
        if (err) throw error
        resolve()
      })
    })
  },
  find (collection, whereData, showData) {
    return new Promise(resolve => {
      collection.find(whereData, showData, (err, data) => {
        if (err) throw error
        resolve(data)
      })
    })
  },
  update (collection, whereData, updateData, type) {
    const updateType = type === 1 ? 'updateMany' : 'updateOne'
    return new Promise(resolve => {
      // style.display = 'none'
      // style['display'] = 'none'
      collection[updateType](whereData, updateData, (err) => {
        if (err) throw error
        resolve()
      })
    })
  },
  delete () {
  },
  paging () {},
  sort () {}
}
```

```js
// mysql/03update.js
const mysql = require('./index')
const User = require('./collections/User')

// mysql.update(User, { userName: '吴大勋'}, { $set: { password: '123'}}).then(() => {
//   console.log('修改成功')
// })

mysql.update(User, {}, { $inc: {age: -1}}, 1).then(() => {
  console.log('修改成功')
})
```

## 6.4 封装 删除

```js
// mysql/index.js
const { collection } = require("./collections/User")

// 封装增删改查
module.exports = {
  insert (collection, insertData) {
    return new Promise(resolve => {
      collection.insertMany(insertData, (err) => {
        if (err) throw error
        resolve()
      })
    })
  },
  find (collection, whereData, showData) {
    return new Promise(resolve => {
      collection.find(whereData, showData, (err, data) => {
        if (err) throw error
        resolve(data)
      })
    })
  },
  update (collection, whereData, updateData, type) {
    const updateType = type === 1 ? 'updateMany' : 'updateOne'
    return new Promise(resolve => {
      // style.display = 'none'
      // style['display'] = 'none'
      collection[updateType](whereData, updateData, (err) => {
        if (err) throw error
        resolve()
      })
    })
  },
  delete (collection, whereData, type) {
    const deleteType = type === 1 ? 'deleteMany' : 'deleteOne'
    return new Promise(resolve => {
      collection[deleteType](whereData, (err) => {
        if (err) throw error
        resolve()
      })
    })
  },
  paging () {},
  sort () {}
}
```

```js
// mysql/04delete.js
const mysql = require('./index')
const User = require('./collections/User')

mysql.delete(User, { userName: '吴大勋123'}).then(() => {
  console.log('删除成功')
})
```

## 6.5分页

```js
const { collection } = require("./collections/User")

// 封装增删改查
module.exports = {
  insert (collection, insertData) {
    return new Promise(resolve => {
      collection.insertMany(insertData, (err) => {
        if (err) throw error
        resolve()
      })
    })
  },
  find (collection, whereData, showData) {
    return new Promise(resolve => {
      collection.find(whereData, showData, (err, data) => {
        if (err) throw error
        resolve(data)
      })
    })
  },
  update (collection, whereData, updateData, type) {
    const updateType = type === 1 ? 'updateMany' : 'updateOne'
    return new Promise(resolve => {
      // style.display = 'none'
      // style['display'] = 'none'
      collection[updateType](whereData, updateData, (err) => {
        if (err) throw error
        resolve()
      })
    })
  },
  delete (collection, whereData, type) {
    const deleteType = type === 1 ? 'deleteMany' : 'deleteOne'
    return new Promise(resolve => {
      collection[deleteType](whereData, (err) => {
        if (err) throw error
        resolve()
      })
    })
  },
  paging (collection, whereData, showData, count, limitNum ) {
    return new Promise(resolve => {
      collection.find(whereData, showData).limit(limitNum).skip((count - 1) * limitNum).exec((err, data) => {
        if (err) throw error
        resolve(data)
      })
    })
  },
  sort () {}
}
```



## 6.6 排序

```js
const { collection } = require("./collections/User")

// 封装增删改查
module.exports = {
  insert (collection, insertData) {
    return new Promise(resolve => {
      collection.insertMany(insertData, (err) => {
        if (err) throw error
        resolve()
      })
    })
  },
  find (collection, whereData, showData) {
    return new Promise(resolve => {
      collection.find(whereData, showData, (err, data) => {
        if (err) throw error
        resolve(data)
      })
    })
  },
  update (collection, whereData, updateData, type) {
    const updateType = type === 1 ? 'updateMany' : 'updateOne'
    return new Promise(resolve => {
      // style.display = 'none'
      // style['display'] = 'none'
      collection[updateType](whereData, updateData, (err) => {
        if (err) throw error
        resolve()
      })
    })
  },
  delete (collection, whereData, type) {
    const deleteType = type === 1 ? 'deleteMany' : 'deleteOne'
    return new Promise(resolve => {
      collection[deleteType](whereData, (err) => {
        if (err) throw error
        resolve()
      })
    })
  },
  paging (collection, whereData, showData, count, limitNum ) {
    return new Promise(resolve => {
      collection.find(whereData, showData).limit(limitNum).skip((count - 1) * limitNum).exec((err, data) => {
        if (err) throw error
        resolve(data)
      })
    })
  },
  sort (collection, whereData, showData, sortData) {
    return new Promise(resolve => {
      collection.find(whereData, showData).sort(sortData).exec((err, data) => {
        if (err) throw error
        resolve(data)
      })
    })
  }
}
```

# 7什么是restful api

ActiveX Object。XMLHttpRequest

REST即表述性状态传递（英文：Representational State Transfer，简称REST）是Roy Fielding博士在2000年他的博士论文中提出来的一种软件架构风格。

表述性状态转移是一组架构约束条件和原则。

满足这些约束条件和原则的应用程序或设计就是RESTful。

需要注意的是，REST是设计风格而不是标准。

REST通常基于使用HTTP，URI，和XML（标准通用标记语言下的一个子集）以及HTML（标准通用标记语言下的一个应用）这些现有的广泛流行的协议和标准。

**REST 通常使用 JSON 数据格式**。

### 7.1HTTP 方法

以下为 REST 基本架构的四个方法：

- **GET** - 用于获取数据。
- **PUT** - 用于更新或添加数据。
- **DELETE** - 用于删除数据。
- **POST** - 用于添加数据。

## 7.2RESTful Web Services

Web service是一个平台独立的，低耦合的，自包含的、基于可编程的web的应用程序，可使用开放的XML（标准通用标记语言下的一个子集）标准来描述、发布、发现、协调和配置这些应用程序，用于开发分布式的互操作的应用程序。

基于 REST 架构的 Web Services 即是 RESTful。

由于轻量级以及通过 HTTP 直接传输数据的特性，Web 服务的 RESTful 方法已经成为最常见的替代方法。可以使用各种语言（比如 Java 程序、Perl、Ruby、Python、PHP 和 Javascript[包括 Ajax]）实现客户端。

RESTful Web 服务通常可以通过自动客户端或代表用户的应用程序访问。但是，这种服务的简便性让用户能够与之直接交互，使用它们的 Web 浏览器构建一个 GET URL 并读取返回的内容。

# 8.使用express创建restful接口

## 8.1 创建exress项目

```
> 先安装node
> node -v
> npm install -g cnpm --registry=https://registry.npm.taobao.org
> cnpm i express-generator -g


> npx express my-admin-app
> cd my-admin-app
> cnpm i

配置dev指令 ---- 如果报错 nodemon 不存在。  cnpm i nodemon -g
package.json

"scripts": {
	"dev": "nodemon ./bin/www"
}
```

## 8.2集成数据库

```
cnpm i mongoose -S
```

Mysql/db.js

```js
const mongoose = require('mongoose')
// 数据库地址
const DB_URL = "mongodb://localhost:27017/sz-2108"

// 连接数据库
mongoose.connect(DB_URL)

// 连接成功
mongoose.connection.once('open', () => {
  console.log('数据库连接成功')
})

// 连接失败
mongoose.connection.on('error', () => {
  console.log('数据库连接失败')
})

module.exports = mongoose
```

Mysql/index.js

```js
// 封装增删改查
module.exports = {
  insert (collection, insertData) {
    return new Promise(resolve => {
      collection.insertMany(insertData, (err) => {
        if (err) throw error
        resolve()
      })
    })
  },
  find (collection, whereData, showData) {
    return new Promise(resolve => {
      collection.find(whereData, showData, (err, data) => {
        if (err) throw error
        resolve(data)
      })
    })
  },
  update (collection, whereData, updateData, type) {
    const updateType = type === 1 ? 'updateMany' : 'updateOne'
    return new Promise(resolve => {
      // style.display = 'none'
      // style['display'] = 'none'
      collection[updateType](whereData, updateData, (err) => {
        if (err) throw error
        resolve()
      })
    })
  },
  delete (collection, whereData, type) {
    const deleteType = type === 1 ? 'deleteMany' : 'deleteOne'
    return new Promise(resolve => {
      collection[deleteType](whereData, (err) => {
        if (err) throw error
        resolve()
      })
    })
  },
  paging (collection, whereData, showData, count, limitNum ) {
    return new Promise(resolve => {
      collection.find(whereData, showData).limit(limitNum).skip((count - 1) * limitNum).exec((err, data) => {
        if (err) throw error
        resolve(data)
      })
    })
  },
  sort (collection, whereData, showData, sortData) {
    return new Promise(resolve => {
      collection.find(whereData, showData).sort(sortData).exec((err, data) => {
        if (err) throw error
        resolve(data)
      })
    })
  }
}
```

Mysql/collections/Pro.js

```js
const mongoose = require('../db')

const Schema = mongoose.Schema

const proSchema = new Schema({
  proid: String,
  proname: String,
  banners: Array,
  img1: String,
  img2: String,
  img3: String,
  img4: String,
  category: String,
  brand: String,
  desc: String,
  sales: Number,
  originprice: Number,
  discount: Number,
  issale: Number,
  isseckill: Number,
  isrecommend: Number,
  stock: Number
})

module.exports = mongoose.model('Pro', proSchema, 'pros')
```

# 9.上传产品数据

routes/pro.xlsx

```
cnpm install node-xlsx --save
```

## 9.1构建产品相关路由

routes/pro.js

```js
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('产品相关路由');
});

module.exports = router;

```

App.js 中注册路由

```js
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var proRouter = require('./routes/pro'); // +++++++++++++++++

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pro', proRouter); // +++++++++++++++++

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

```

## 9.2 实现上传excel表格的接口

> 记得清空数据再上传
>
> 记得添加 proid字段。 `cnpm i uuid -S`

```js
var express = require('express');
var router = express.Router();
var xlsx = require('node-xlsx')
var mysql =require('./../mysql')
var Pro = require('./../mysql/collections/Pro')
var uuid = require('uuid')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('产品相关路由');
});

// 请求时 http://localhost:3000/pro/upload
router.get('/upload', (req, res, next) => {
  const fileUrl = __dirname + '/pro.xlsx'
  const oldArr = xlsx.parse(fileUrl) // 原始数据
  // res.send(obj) // [{"name":"Sheet1","data":[]}, {"name":"Sheet2","data":[]}]
  const arr = oldArr[0].data
  // res.send(arr) // [[表头], [第一行], [第二行]]
  // 处理数据
  const insertData = []
  arr.forEach((item, index) => {
    if (index !== 0) {
      insertData.push({
        // proid: 'pro_' + new Date().getTime() + '_' + index,
        proid: 'pro_' + uuid.v4(),
        category: item[0],
        brand: item[1],
        proname: item[2],
        banners: item[3].split(','),
        originprice: item[4]*1,
        sales: item[5]*1,
        stock: item[6]*1,
        desc: item[7],
        issale: item[8] * 1,
        isrecommend: item[9]*1,
        discount: item[10]*1,
        isseckill: item[11]*1,
        img1: item[12],
        img2: item[13],
        img3: item[14],
        img4: item[15],
      })
    }
  })
  // res.send(insertData)
  // 存入数据库 --- 清空数据
  mysql.delete(Pro, {}, 1).then(() => {
    mysql.insert(Pro, insertData).then(() => {
      // 展示上传的数据
      mysql.find(Pro, {}, { _id: 0 }).then(data => {
        res.send({
          code: '200',
          message: '上传数据成功',
          data
        })
      })
    })
  })
  
})

module.exports = router;

```

## 9.3 创建接口文档

常用的创建接口文档类型很多，可以使用如下模块

* [apidoc](https://apidocjs.com/)
* [Swagger](https://swagger.io/)    http://106.13.179.186:8000/swagger-ui.html#/%E5%95%86%E5%93%81/pageUsingGET

本项目采用apidoc

完整示例如下：

```
cnpm i apidoc -g

sudo cnpm i apidoc -g (mac用户，输入开机密码---不可见)
```

```json
// 修改package.json，添加apidoc的配置选项
{
  "name": "my-admin-app",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node ./bin/www",
    "dev": "nodemon ./bin/www"
  },
  "dependencies": {
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "express": "~4.16.1",
    "http-errors": "~1.6.3",
    "jade": "~1.11.0",
    "mongoose": "^6.0.7",
    "morgan": "~1.9.1",
    "node-xlsx": "^0.17.2",
    "uuid": "^8.3.2"
  },
  "apidoc": {
    "title": "嗨够电商平台接口",
    "url": "http://localhost:3000"
  }
}


```

```js
// my-admin-app/api/pro.js
var express = require('express');
var router = express.Router();
var xlsx = require('node-xlsx')
var mysql =require('./../mysql')
var Pro = require('./../mysql/collections/Pro')
var uuid = require('uuid')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('产品相关路由');
});

// 请求时 http://localhost:3000/pro/upload
/**
 * @api {get} /pro/upload 产品-上传产品数据
 * @apiName ProUpload
 * @apiGroup pro
 * 
 * @apiHeader {String} token 后台验证用户登录的标识
 * 
 * @apiSuccess {String} code 状态码
 * @apiSuccess {String} message  描述
 * @apiSuccess {Array} data  返回的产品列表
 */
router.get('/upload', (req, res, next) => {
  const fileUrl = __dirname + '/pro.xlsx'
  const oldArr = xlsx.parse(fileUrl) // 原始数据
  // res.send(obj) // [{"name":"Sheet1","data":[]}, {"name":"Sheet2","data":[]}]
  const arr = oldArr[0].data
  // res.send(arr) // [[表头], [第一行], [第二行]]
  // 处理数据
  const insertData = []
  arr.forEach((item, index) => {
    if (index !== 0) {
      insertData.push({
        // proid: 'pro_' + new Date().getTime() + '_' + index,
        proid: 'pro_' + uuid.v4(),
        category: item[0],
        brand: item[1],
        proname: item[2],
        banners: item[3].split(','),
        originprice: item[4]*1,
        sales: item[5]*1,
        stock: item[6]*1,
        desc: item[7],
        issale: item[8] * 1,
        isrecommend: item[9]*1,
        discount: item[10]*1,
        isseckill: item[11]*1,
        img1: item[12],
        img2: item[13],
        img3: item[14],
        img4: item[15],
      })
    }
  })
  // res.send(insertData)
  // 存入数据库 --- 清空数据
  mysql.delete(Pro, {}, 1).then(() => {
    mysql.insert(Pro, insertData).then(() => {
      // 展示上传的数据
      mysql.find(Pro, {}, { _id: 0 }).then(data => {
        res.send({
          code: '200',
          message: '上传数据成功',
          data
        })
      })
    })
  })
  
})

module.exports = router;

```

每更新一个接口文档，运行以下命令(找到api文件夹下的所有配置过接口文档的 路由，编译到 public目录下的 apidoc文件夹)

此命令在项目的根目录下运行，不是在 api文件夹下

```
> apidoc -i routes/ -o public/apidoc
```

通过 http://localhost:3000/apidoc 访问接口文档04 

## 9.4 导出产品数据

```js
var express = require('express');
var router = express.Router();
var xlsx = require('node-xlsx')
var mysql =require('./../mysql')
var Pro = require('./../mysql/collections/Pro')
var uuid = require('uuid')
var fs = require('fs')
// console.log(fs)
var os = require('os')
// console.log(os.homedir() + '/desktop')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('产品相关路由');
});

// 请求时 http://localhost:3000/pro/upload
/**
 * @api {get} /pro/upload 产品-上传产品数据
 * @apiName ProUpload
 * @apiGroup pro
 * 
 * @apiHeader {String} token 后台验证用户登录的标识
 * 
 * @apiSuccess {String} code 状态码
 * @apiSuccess {String} message  描述
 * @apiSuccess {Array} data  返回的产品列表
 */
router.get('/upload', (req, res, next) => {
  const fileUrl = __dirname + '/pro.xlsx'
  const oldArr = xlsx.parse(fileUrl) // 原始数据
  // res.send(obj) // [{"name":"Sheet1","data":[]}, {"name":"Sheet2","data":[]}]
  const arr = oldArr[0].data
  // res.send(arr) // [[表头], [第一行], [第二行]]
  // 处理数据
  const insertData = []
  arr.forEach((item, index) => {
    if (index !== 0) {
      insertData.push({
        // proid: 'pro_' + new Date().getTime() + '_' + index,
        proid: 'pro_' + uuid.v4(),
        category: item[0],
        brand: item[1],
        proname: item[2],
        banners: item[3].split(','),
        originprice: item[4]*1,
        sales: item[5]*1,
        stock: item[6]*1,
        desc: item[7],
        issale: item[8] * 1,
        isrecommend: item[9]*1,
        discount: item[10]*1,
        isseckill: item[11]*1,
        img1: item[12],
        img2: item[13],
        img3: item[14],
        img4: item[15],
      })
    }
  })
  // res.send(insertData)
  // 存入数据库 --- 清空数据
  mysql.delete(Pro, {}, 1).then(() => {
    mysql.insert(Pro, insertData).then(() => {
      // 展示上传的数据
      mysql.find(Pro, {}, { _id: 0 }).then(data => {
        res.send({
          code: '200',
          message: '上传数据成功',
          data
        })
      })
    })
  })
  
})
/**
 * @api {get} /pro/export 产品-导出产品数据
 * @apiName ProExport
 * @apiGroup pro
 * 
 * @apiHeader {String} token 后台验证用户登录的标识
 *
 */
router.get('/export', (req, res, next) => {
  const arr = [
    [
      "产品ID",
      "产品名称",
      "轮播图",
      "图片1",
      "图片2",
      "图片3",
      "图片4",
      "分类",
      "品牌",
      "描述",
      "销量",
      "价格",
      "折扣",
      "是否售卖",
      "是否秒杀",
      "是否推荐",
      "库存",
    ]
  ]
  mysql.find(Pro, {}, { _id: 0, __v: 0}).then(data => {
    data.forEach(item => {
      const a = []
      a[0] = item.proid
      a[1] = item.proname
      a[2] = item.banners
      a[3] = item.img1
      a[4] = item.img2
      a[5] = item.img3
      a[6] = item.img4
      a[7] = item.category
      a[8] = item.brand
      a[9] = item.desc
      a[10] = item.sales
      a[11] = item.originprice
      a[12] = item.discount
      a[13] = item.issale
      a[14] = item.isseckill
      a[15] = item.isrecommend
      a[16] = item.stock
      arr.push(a)
    })
    // const data = [[1, 2, 3], [true, false, null, 'sheetjs'], ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'], ['baz', null, 'qux']];
    var buffer = xlsx.build([{name: "mySheetName", data: arr}]);
    // console.log(buffer.toString())
    // res.send(buffer)
    fs.writeFile(os.homedir() + '/desktop/test1111111.xlsx', buffer, () => {
      res.send('下载成功')
    })
  })
  
})

module.exports = router;

```

## 9.5 产品分页查询数据

```js
var express = require('express');
var router = express.Router();
var xlsx = require('node-xlsx')
var mysql =require('./../mysql')
var Pro = require('./../mysql/collections/Pro')
var uuid = require('uuid')
var fs = require('fs')
// console.log(fs)
var os = require('os')
// console.log(os.homedir() + '/desktop')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('产品相关路由');
});

// 请求时 http://localhost:3000/pro/upload
/**
 * @api {get} /pro/upload 产品-上传产品数据
 * @apiName ProUpload
 * @apiGroup pro
 * 
 * @apiHeader {String} token 后台验证用户登录的标识
 * 
 * @apiSuccess {String} code 状态码
 * @apiSuccess {String} message  描述
 * @apiSuccess {Array} data  返回的产品列表
 */
router.get('/upload', (req, res, next) => {
  const fileUrl = __dirname + '/pro.xlsx'
  const oldArr = xlsx.parse(fileUrl) // 原始数据
  // res.send(obj) // [{"name":"Sheet1","data":[]}, {"name":"Sheet2","data":[]}]
  const arr = oldArr[0].data
  // res.send(arr) // [[表头], [第一行], [第二行]]
  // 处理数据
  const insertData = []
  arr.forEach((item, index) => {
    if (index !== 0) {
      insertData.push({
        // proid: 'pro_' + new Date().getTime() + '_' + index,
        proid: 'pro_' + uuid.v4(),
        category: item[0],
        brand: item[1],
        proname: item[2],
        banners: item[3].split(','),
        originprice: item[4]*1,
        sales: item[5]*1,
        stock: item[6]*1,
        desc: item[7],
        issale: item[8] * 1,
        isrecommend: item[9]*1,
        discount: item[10]*1,
        isseckill: item[11]*1,
        img1: item[12],
        img2: item[13],
        img3: item[14],
        img4: item[15],
      })
    }
  })
  // res.send(insertData)
  // 存入数据库 --- 清空数据
  mysql.delete(Pro, {}, 1).then(() => {
    mysql.insert(Pro, insertData).then(() => {
      // 展示上传的数据
      mysql.find(Pro, {}, { _id: 0 }).then(data => {
        res.send({
          code: '200',
          message: '上传数据成功',
          data
        })
      })
    })
  })
  
})
/**
 * @api {get} /pro/export 产品-导出产品数据
 * @apiName ProExport
 * @apiGroup pro
 * 
 * @apiHeader {String} token 后台验证用户登录的标识
 *
 */
router.get('/export', (req, res, next) => {
  const arr = [
    [
      "产品ID",
      "产品名称",
      "轮播图",
      "图片1",
      "图片2",
      "图片3",
      "图片4",
      "分类",
      "品牌",
      "描述",
      "销量",
      "价格",
      "折扣",
      "是否售卖",
      "是否秒杀",
      "是否推荐",
      "库存",
    ]
  ]
  mysql.find(Pro, {}, { _id: 0, __v: 0}).then(data => {
    data.forEach(item => {
      const a = []
      a[0] = item.proid
      a[1] = item.proname
      a[2] = item.banners
      a[3] = item.img1
      a[4] = item.img2
      a[5] = item.img3
      a[6] = item.img4
      a[7] = item.category
      a[8] = item.brand
      a[9] = item.desc
      a[10] = item.sales
      a[11] = item.originprice
      a[12] = item.discount
      a[13] = item.issale
      a[14] = item.isseckill
      a[15] = item.isrecommend
      a[16] = item.stock
      arr.push(a)
    })
    // const data = [[1, 2, 3], [true, false, null, 'sheetjs'], ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'], ['baz', null, 'qux']];
    var buffer = xlsx.build([{name: "mySheetName", data: arr}]);
    // console.log(buffer.toString())
    // res.send(buffer)
    fs.writeFile(os.homedir() + '/desktop/test1111111.xlsx', buffer, () => {
      res.send('下载成功')
    })
  })
  
})

/**
 * @api {get} /pro/list 产品-分页查询数据
 * @apiName ProList
 * @apiGroup pro
 * 
 * @apiHeader {String} token 后台验证用户登录的标识
 * 
 * @apiParam {Number} count 页码，默认为1
 * @apiParam {Number} limitNum 每页显示个数，默认为10
 * 
 * @apiSuccess {String} code 状态码
 * @apiSuccess {String} message  描述
 * @apiSuccess {Array} data  返回的产品列表
 */
router.get('/list', (req, res, next) => {
  let { count, limitNum } = req.query
  count = count * 1 || 1 
  limitNum = limitNum * 1 || 10 
  mysql.paging(Pro, {}, { _id:0, __v: 0}, count, limitNum).then(data => {
    if (data.length === 0) {
      res.send({
        code: '10000',
        message: '没有数据了'
      })
    } else {
      res.send({
        code: '200',
        message: '分页列表数据',
        data
      })
    }
  })
})

module.exports = router;

```

## 9.6 获取产品详情接口

```js
var express = require('express');
var router = express.Router();
var xlsx = require('node-xlsx')
var mysql =require('./../mysql')
var Pro = require('./../mysql/collections/Pro')
var uuid = require('uuid')
var fs = require('fs')
// console.log(fs)
var os = require('os')
// console.log(os.homedir() + '/desktop')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('产品相关路由');
});

// 请求时 http://localhost:3000/pro/upload
/**
 * @api {get} /pro/upload 产品-上传产品数据
 * @apiName ProUpload
 * @apiGroup pro
 * 
 * @apiHeader {String} token 后台验证用户登录的标识
 * 
 * @apiSuccess {String} code 状态码
 * @apiSuccess {String} message  描述
 * @apiSuccess {Array} data  返回的产品列表
 */
router.get('/upload', (req, res, next) => {
  const fileUrl = __dirname + '/pro.xlsx'
  const oldArr = xlsx.parse(fileUrl) // 原始数据
  // res.send(obj) // [{"name":"Sheet1","data":[]}, {"name":"Sheet2","data":[]}]
  const arr = oldArr[0].data
  // res.send(arr) // [[表头], [第一行], [第二行]]
  // 处理数据
  const insertData = []
  arr.forEach((item, index) => {
    if (index !== 0) {
      insertData.push({
        // proid: 'pro_' + new Date().getTime() + '_' + index,
        proid: 'pro_' + uuid.v4(),
        category: item[0],
        brand: item[1],
        proname: item[2],
        banners: item[3].split(','),
        originprice: item[4]*1,
        sales: item[5]*1,
        stock: item[6]*1,
        desc: item[7],
        issale: item[8] * 1,
        isrecommend: item[9]*1,
        discount: item[10]*1,
        isseckill: item[11]*1,
        img1: item[12],
        img2: item[13],
        img3: item[14],
        img4: item[15],
      })
    }
  })
  // res.send(insertData)
  // 存入数据库 --- 清空数据
  mysql.delete(Pro, {}, 1).then(() => {
    mysql.insert(Pro, insertData).then(() => {
      // 展示上传的数据
      mysql.find(Pro, {}, { _id: 0 }).then(data => {
        res.send({
          code: '200',
          message: '上传数据成功',
          data
        })
      })
    })
  })
  
})
/**
 * @api {get} /pro/export 产品-导出产品数据
 * @apiName ProExport
 * @apiGroup pro
 * 
 * @apiHeader {String} token 后台验证用户登录的标识
 *
 */
router.get('/export', (req, res, next) => {
  const arr = [
    [
      "产品ID",
      "产品名称",
      "轮播图",
      "图片1",
      "图片2",
      "图片3",
      "图片4",
      "分类",
      "品牌",
      "描述",
      "销量",
      "价格",
      "折扣",
      "是否售卖",
      "是否秒杀",
      "是否推荐",
      "库存",
    ]
  ]
  mysql.find(Pro, {}, { _id: 0, __v: 0}).then(data => {
    data.forEach(item => {
      const a = []
      a[0] = item.proid
      a[1] = item.proname
      a[2] = item.banners
      a[3] = item.img1
      a[4] = item.img2
      a[5] = item.img3
      a[6] = item.img4
      a[7] = item.category
      a[8] = item.brand
      a[9] = item.desc
      a[10] = item.sales
      a[11] = item.originprice
      a[12] = item.discount
      a[13] = item.issale
      a[14] = item.isseckill
      a[15] = item.isrecommend
      a[16] = item.stock
      arr.push(a)
    })
    // const data = [[1, 2, 3], [true, false, null, 'sheetjs'], ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'], ['baz', null, 'qux']];
    var buffer = xlsx.build([{name: "mySheetName", data: arr}]);
    // console.log(buffer.toString())
    // res.send(buffer)
    fs.writeFile(os.homedir() + '/desktop/test1111111.xlsx', buffer, () => {
      res.send('下载成功')
    })
  })
  
})

/**
 * @api {get} /pro/list 产品-分页查询数据
 * @apiName ProList
 * @apiGroup pro
 * 
 * @apiHeader {String} token 后台验证用户登录的标识
 * 
 * @apiParam {Number} count 页码，默认为1
 * @apiParam {Number} limitNum 每页显示个数，默认为10
 * 
 * @apiSuccess {String} code 状态码
 * @apiSuccess {String} message  描述
 * @apiSuccess {Array} data  返回的产品列表
 */
router.get('/list', (req, res, next) => {
  let { count, limitNum } = req.query
  count = count * 1 || 1 
  limitNum = limitNum * 1 || 10 
  mysql.paging(Pro, {}, { _id:0, __v: 0}, count, limitNum).then(data => {
    if (data.length === 0) {
      res.send({
        code: '10000',
        message: '没有数据了'
      })
    } else {
      res.send({
        code: '200',
        message: '分页列表数据',
        data
      })
    }
  })
})


/**
 * @api {get} /pro/detail/:proid 产品-获取详情
 * @apiName ProDetail
 * @apiGroup pro
 * 
 * @apiHeader {String} token 后台验证用户登录的标识
 * 
 * @apiParam {String} proid 产品唯一值
 * 
 * @apiSuccess {String} code 状态码
 * @apiSuccess {String} message  描述
 * @apiSuccess {Object} data  返回的产品列表
 */
router.get('/detail/:proid', (req, res, next) => {
  mysql.find(Pro, { proid: req.params.proid }, { _id: 0, __v: 0}).then(data => {
    if (data.length === 0) {
      res.send({
        code: '10001',
        message: '查无此产品'
      })
    } else {
      res.send({
        code: '200',
        message: '获取详情数据',
        data: data[0]
      })
    }
  })
})

module.exports = router;

```

## 9.7 获取分类数据

```js
var express = require('express');
var router = express.Router();
var xlsx = require('node-xlsx')
var mysql =require('./../mysql')
var Pro = require('./../mysql/collections/Pro')
var uuid = require('uuid')
var fs = require('fs')
// console.log(fs)
var os = require('os')
// console.log(os.homedir() + '/desktop')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('产品相关路由');
});

// 请求时 http://localhost:3000/pro/upload
/**
 * @api {get} /pro/upload 产品-上传产品数据
 * @apiName ProUpload
 * @apiGroup pro
 * 
 * @apiHeader {String} token 后台验证用户登录的标识
 * 
 * @apiSuccess {String} code 状态码
 * @apiSuccess {String} message  描述
 * @apiSuccess {Array} data  返回的产品列表
 */
router.get('/upload', (req, res, next) => {
  const fileUrl = __dirname + '/pro.xlsx'
  const oldArr = xlsx.parse(fileUrl) // 原始数据
  // res.send(obj) // [{"name":"Sheet1","data":[]}, {"name":"Sheet2","data":[]}]
  const arr = oldArr[0].data
  // res.send(arr) // [[表头], [第一行], [第二行]]
  // 处理数据
  const insertData = []
  arr.forEach((item, index) => {
    if (index !== 0) {
      insertData.push({
        // proid: 'pro_' + new Date().getTime() + '_' + index,
        proid: 'pro_' + uuid.v4(),
        category: item[0],
        brand: item[1],
        proname: item[2],
        banners: item[3].split(','),
        originprice: item[4]*1,
        sales: item[5]*1,
        stock: item[6]*1,
        desc: item[7],
        issale: item[8] * 1,
        isrecommend: item[9]*1,
        discount: item[10]*1,
        isseckill: item[11]*1,
        img1: item[12],
        img2: item[13],
        img3: item[14],
        img4: item[15],
      })
    }
  })
  // res.send(insertData)
  // 存入数据库 --- 清空数据
  mysql.delete(Pro, {}, 1).then(() => {
    mysql.insert(Pro, insertData).then(() => {
      // 展示上传的数据
      mysql.find(Pro, {}, { _id: 0 }).then(data => {
        res.send({
          code: '200',
          message: '上传数据成功',
          data
        })
      })
    })
  })
  
})
/**
 * @api {get} /pro/export 产品-导出产品数据
 * @apiName ProExport
 * @apiGroup pro
 * 
 * @apiHeader {String} token 后台验证用户登录的标识
 *
 */
router.get('/export', (req, res, next) => {
  const arr = [
    [
      "产品ID",
      "产品名称",
      "轮播图",
      "图片1",
      "图片2",
      "图片3",
      "图片4",
      "分类",
      "品牌",
      "描述",
      "销量",
      "价格",
      "折扣",
      "是否售卖",
      "是否秒杀",
      "是否推荐",
      "库存",
    ]
  ]
  mysql.find(Pro, {}, { _id: 0, __v: 0}).then(data => {
    data.forEach(item => {
      const a = []
      a[0] = item.proid
      a[1] = item.proname
      a[2] = item.banners
      a[3] = item.img1
      a[4] = item.img2
      a[5] = item.img3
      a[6] = item.img4
      a[7] = item.category
      a[8] = item.brand
      a[9] = item.desc
      a[10] = item.sales
      a[11] = item.originprice
      a[12] = item.discount
      a[13] = item.issale
      a[14] = item.isseckill
      a[15] = item.isrecommend
      a[16] = item.stock
      arr.push(a)
    })
    // const data = [[1, 2, 3], [true, false, null, 'sheetjs'], ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'], ['baz', null, 'qux']];
    var buffer = xlsx.build([{name: "mySheetName", data: arr}]);
    // console.log(buffer.toString())
    // res.send(buffer)
    fs.writeFile(os.homedir() + '/desktop/test1111111.xlsx', buffer, () => {
      res.send('下载成功')
    })
  })
  
})

/**
 * @api {get} /pro/list 产品-分页查询数据
 * @apiName ProList
 * @apiGroup pro
 * 
 * @apiHeader {String} token 后台验证用户登录的标识
 * 
 * @apiParam {Number} count 页码，默认为1
 * @apiParam {Number} limitNum 每页显示个数，默认为10
 * 
 * @apiSuccess {String} code 状态码
 * @apiSuccess {String} message  描述
 * @apiSuccess {Array} data  返回的产品列表
 */
router.get('/list', (req, res, next) => {
  let { count, limitNum } = req.query
  count = count * 1 || 1 
  limitNum = limitNum * 1 || 10 
  mysql.paging(Pro, {}, { _id:0, __v: 0}, count, limitNum).then(data => {
    if (data.length === 0) {
      res.send({
        code: '10000',
        message: '没有数据了'
      })
    } else {
      res.send({
        code: '200',
        message: '分页列表数据',
        data
      })
    }
  })
})


/**
 * @api {get} /pro/detail/:proid 产品-获取详情
 * @apiName ProDetail
 * @apiGroup pro
 * 
 * @apiHeader {String} token 后台验证用户登录的标识
 * 
 * @apiParam {String} proid 产品唯一值
 * 
 * @apiSuccess {String} code 状态码
 * @apiSuccess {String} message  描述
 * @apiSuccess {Object} data  返回的产品列表
 */
router.get('/detail/:proid', (req, res, next) => {
  mysql.find(Pro, { proid: req.params.proid }, { _id: 0, __v: 0}).then(data => {
    if (data.length === 0) {
      res.send({
        code: '10001',
        message: '查无此产品'
      })
    } else {
      res.send({
        code: '200',
        message: '获取详情数据',
        data: data[0]
      })
    }
  })
})

/**
 * @api {get} /pro/category 产品-获取分类数据
 * @apiName ProCategory
 * @apiGroup pro
 * 
 * @apiHeader {String} token 后台验证用户登录的标识
 * 
 * @apiSuccess {String} code 状态码
 * @apiSuccess {String} message  描述
 * @apiSuccess {Object} data  返回的产品列表
 */
router.get('/category', (req, res, next) => {
  mysql.find(Pro, {}, { _id: 0, category: 1}).then(data => {
    const arr = []
    data.forEach(item => {
      arr.push(item.category)
    })
    const newArr = Array.from(new Set([...arr]))
    res.send({
      code: '200',
      message: '分类数据',
      data: newArr
    })
  })
})
module.exports = router;

```

