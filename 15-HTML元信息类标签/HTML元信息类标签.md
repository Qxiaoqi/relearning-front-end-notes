# 15-HTML元信息类标签：你知道head里一共能写几种标签吗？

HTML除了语义化标签以外，还有一类很重要的标签，就是页面元信息类标签。通常出现在head标签中，一般不会在页面中显现出来，元信息多数情况下是给浏览器、搜索引擎等机器阅读的。对SEO有一定的影响，会简单测试一下。

## 元信息标签

* title
* base
* link
* script
* meta

## title 标签

title作为元信息，可能会被用在浏览器收藏夹，微信推送卡片，微博等各种场景，上下文往往缺失的，所以title应该是完整地概括网页内容的。

## base 标签

用来为所有URL设置一个基础的URL，以及为没有明确指定target的跳转链接设置一个默认的target，且一个文档中只能有一个base。但这是一个非常危险的标签，容易造成跟JavaScript的配合问题，实际开发中，建议使用JavaScript来代替base标签。

## link 标签

加载外部资源链接，除了常用的加载外部CSS文件也有其他用途。比如preload，prefetch，dns-prefetch等

## script 标签

一般用于插入JavaScript脚本，两个比较重要的属性时defer，async。都是异步加载脚本，但有不同之处。

* async：加载完毕后async脚本会立即执行，很难确定async脚本在什么时候加载完成，执行顺序并不能保证
* defer：仅在HTML解析完毕之后执行，可保证顺序

## meta 标签

meta标签是一组键值对，是一种通用的元信息表示标签。

一般的meta标签由name和content两个属性来定义。name表示元信息名，content则用于表示元信息的值。除了基本用法，还有一些变体。

### 具有charset属性的meta

```HTML
<meta charset="UTF-8" >
```

charset描述了HTML文档自身的编码形式，建议放在head里的第一个。

一般情况，http服务器会通过http头来确定正确的编码方式，但有些特殊情况如使用file协议打开一个HTML文件，则没有http头，这时候charset meta就非常重要了。

### 具有http-equiv属性的meta

表示执行一个命令

* content-type：添加content-type这个http头
* content-language：指定内容的语言
* default-style：指定默认样式表
* refresh：刷新
* set-cookie：模拟http头set-cookie，设置cookie
* x-ua-compatible：模拟http头x-ua-compatible，生命ua兼容性
* content-security-policy：模拟http头，生命内容安全策略

### name为viewport的meta

meta可自由定义，viewport在HTML标准里没有定义，却是移动端开发的一个很重要的事实标准。能控制很多

* width：页面宽度，可以是device-width，表示和设备宽度相等
* height：页面高度，可以是device-width，表示和设备高度相等
* initial-scale：初始缩放比例
* minimum-scale：最小缩放比例
* maximum-scale：最大缩放比例
* user-scalable：是否允许用户缩放

对于已经做好了移动端适配的网页，应该把用户缩放功能禁止掉，宽度设置为设备宽度，比如

```HTML
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
```

### 其它预定义meta

* author：页面作者
* description：页面描述，可能被用于搜索引擎
* keywords：页面关键字，对于SEO非常关键
* referrer：跳转策略

## 举例

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  
</body>
</html>
```

上面这一段是默认补全的代码，之前也没注意看过，现在都理解了。首先就是指定UTF-8编码。然后设置viewport，宽度为设备宽度，初始缩放比例1。然后对兼容性上，会让IE浏览器使用尽量高版本的模式对页面进行解析，在一定程度上减少兼容性问题以及提高性能。

