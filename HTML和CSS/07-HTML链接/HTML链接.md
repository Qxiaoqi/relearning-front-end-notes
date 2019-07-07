# 23-HTML链接：除了a标签，还有哪些标签叫链接？

HTML除了文档元信息，语义相关内容之外，最重要的元素就是链接了。链接这种元素占据了整个互联网，正因为链接，才能称之为超文本。除了肉眼可见的链接以外，HTML里还规定了一些不可见链接的类型。

链接是HTML的一种机制，是HTML文档和其它文档或者资源的连接关系，HTML链接有两种类型，一种是超链接型标签，一种是外部资源链接。链接有a标签，area标签，link标签。

## 超链接类link标签

元信息类的一种，很多时候link标签是不会对浏览器产生任何效果的，可能生成超链接，也可能生成外部资源链接。

超链接型标签大多数情况下不产生作用，但是却可以被搜索引擎和一些浏览器插件识别，从而产生关键作用。比如RSS订阅插件。

### 1. canonical型link

标签用来提示主URL，在网站中可能有多个URL指向同一页面，搜索引擎访问时会去掉重复页面，该link会提示搜索引擎保留哪一个URL。可用来[整合重复网址](https://support.google.com/webmasters/answer/139066?hl=zh-Hans#preferred-domain-method)

> 如果您的某一个网页可通过多个网址访问，或者您的不同网页包含类似内容（例如，某个网页既有移动版，又有桌面版），那么 Google 会将这些网页视为同一个网页的重复版本。Google 会选择一个网址作为规范版本并抓取该网址，而将所有其他网址视为重复网址并降低对这些网址的抓取频率。

> 如果您未明确告知 Google 哪个网址是规范网址，Google 就会替您做出选择，或会将这两个版本视为同等重要，这可能会导致出现一些不当的行为

几种方案：
* 指定首选网域（使用Search Console一个网站）
* rel=canonical link 标记
* rel=canonical HTTP 标头
* 站点地图

### 2. alternate型link

提示页面的变形形式，包含当前页面的不同格式，不同语言或者不同版本。通常提供给搜索引擎来使用。

比如一个网站要做国际化，需要多语言支持，那这个时候就需要该标签去帮助搜索引擎去处理，给不同区域的用户提供不同的搜索结果。比如一个页面提供中文和英文，能帮助不同地域的用户看到的搜索结果对应不同的版本。

如果语言文字是可根据地域动态显示，可将其设置为`x-default`

以Vue文档来举例，文档支持多种语言
```html
<link rel="alternate" hreflang="x-default" href="https://vuejs.org/v2/guide/index.html">
<link rel="alternate" hreflang="zh" href="https://cn.vuejs.org/v2/guide/index.html">
<link rel="alternate" hreflang="ja" href="https://jp.vuejs.org/v2/guide/index.html">
···
```

同时，alternate的另一个典型应用场景是提供RSS订阅，比如张鑫旭的博客
```html
<link rel="alternate" type="application/rss+xml" title="张鑫旭-鑫空间-鑫生活 » Feed" href="https://www.zhangxinxu.com/wordpress/feed/">
```

优势：
* 能帮助搜索引擎更好的梳理页面之间的关系，并编入索引
* 而且能帮助搜索引擎发现在扩展网站过程中产生的一些新网址
* 可以在搜索结果中为搜索用户提供更具针对性的网址

备注：
国际化不仅仅是多种语言的显示，还要考虑到不同国家的不同风俗以及偏好，来确定不同的展示风格。

### 3. prev型link 和 next型link

很多网页都属于一个序列，比如分页浏览的场景。这种情况就适合使用prev和next型的link标签，来告诉搜索引擎或者浏览器它的前一项和后一项，有助于页面的批量显示。同时对于next，HTML标准建议可做预处理。

### 4. 其它

除了上面说的几种以外，还有几种
* rel="author"：链接到本页面作者
* rel="help"：链接到本页面帮助页
* rel="license"：链接到本页面版权信息
* rel="search"：链接到本页面搜索页

## 外部资源类link标签

包括icon型，预处理类型，modulepreload型，stylesheet型，pingback

### 1. icon型link

表示页面的icon，并把其展示出来，如果没有制定，多数浏览器会使用域名根目录下的favicon.ico，即使不存在也同样。因此，从性能上考虑，要保证页面中有icon型link。

同时也可以指定size属性，HTML标准允许一个页面出现多个icon型link。

```html
<link rel="icon" type="image/png" sizes="192x192" href="/images/icons/android-icon-192x192.png">
<link rel="icon" type="image/png" sizes="32x32" href="/images/icons/favicon-32x32.png">
<link rel="apple-touch-icon" sizes="57x57" href="/images/icons/apple-icon-57x57.png">
<link rel="apple-touch-icon" sizes="60x60" href="/images/icons/apple-icon-60x60.png">
···
```

### 2. 预处理类link

导航到一个网站需要经过dns查询域名，建立连接，传输数据，加载进内存，和渲染等一系列步骤。预处理即允许控制浏览器，提前针对一些资源去做这些操作，以提高性能。但是乱用反而会更差，需要仔细考虑。

* dns-prefetch：提前对一个域名做dns查询，比如下面代码，对大多数wordpress应该都会有这一行，这一行是对wordpress官网的域名题前查询
```html
<link rel="dns-prefetch" href="//s.w.org">
```

* preconnect：提前对一个服务器建立tcp连接
* prefetch：提前取指定内容，但是这里一般使用懒加载相应文件的时候，会加上这一个rel，实际是当其他资源先加载完之后，才会在空闲时间加载
* preload：提前加载，即预加载
* prerender：提前渲染

这里的preconnect和prerender都没有实践过，因此暂时不能完全确定。

### 3. modulepreload型的link

作用是预先加载一个JavaScript模块，可以保证JS模块不必等执行时才加载。有这样一种情景，一个app.js里面import了其它js模块，比如A和B，正常情况下用script是等到import时才会加载相应的A和B。这时候可以使用下面的代码，让app.js和A.js以及B.js三个文件有机会并行下载，提高性能。

```html
<link rel="modulepreload" href="app.js">
<link rel="modulepreload" href="A.js">
<link rel="modulepreload" href="B.js">
<script type="module" src="app.js">
```

### 4. stylesheet型link

引入外部样式表非常常用的一种，不再过多阐述

### 5. pingback型link

表示本网页被引用的时候应该使用的pinkback地址，遵守pingback协议的网站在引用本页面的时候，会向这个pingback url发送一个消息。

这个在wordpress的博客里面很常见

### 6. manifest型link

> 网络应用清单是一个 JSON 文件，您（即开发者）可以利用它控制在用户想要看到应用的区域（例如移动设备主屏幕）中如何向用户显示网络应用或网站，指示用户可以启动哪些功能，以及定义其在启动时的外观。

> 网络应用清单提供了将网站书签保存到设备主屏幕的功能。当网站以这种方式启动时：
> * 它具有唯一的图标和名称，以便用户将其与其他网站区分开来。
> * 它会在下载资源或从缓存恢复资源时向用户显示某些信息。
> * 它会向浏览器提供默认显示特性，以避免网站资源可用时的过渡过于生硬。
> * 它通过一个文本文件中的元数据这一简单机制完成所有这些工作。那就是网络应用清单。

```html
<link rel="pingback" href="https://www.zhangxinxu.com/wordpress/xmlrpc.php">
```

## a标签

a标签充当锚点和链接，当有href时是链接，有name时是锚点（HTML5已过时，使用id来代替）。

和link一样会产生超链接，a标签也可以有rel属性，除了link有的还有一些独特的rel类型。

* tag：本网页所属标签
* bookmark：到上级章节的链接
* nofollow：不会被搜索引擎索引
* noopener：此链接打开的网页无法使用opener来获得当前页面窗口
* noreferrer：此链接打开的网页无法使用referrer来获得当前页面的url
* opener：a标签的默认行为，可以使用window.opener来访问当前页面的window对象

## area标签

和a标签很相似，不同之处是区域型链接。是HTML规则中唯一支持非矩形热区的标签，必须跟img和map配合使用，来创建图片区域映射。