# 03-HTML语义：div和span不是够用了吗？

## 引言

HTML标签的语义，从我开始学HTML开始就在注意这个方面。但实际上，翻了翻之前写的代码，语义化上用的极少，大部分也都是`div` + `span`，今天看了这篇文章也有一些感触吧，希望从现在开始，将标签语义化。

## div + span ？

> 不用复杂的语义化标签行不行？ `div` + `span`能走天下吗？

作者的答案是行。

在如今的互联网页面里，用于描述`界面`多于`富文本`。软件界面里的很多东西都是没有语义的。

比如购物车的例子，一定要用`button`代替吗？

未必，从语义上来讲，`button`用于按钮，但实际上购物车还能算严格意义上的按钮了吗，按照对`botton`的理解来讲，更适合表单的submit按钮，语义上讲购物车按钮未必与button合适。也是基于这个原因，作者认为可以直接使用`div` + `span`来布局。

但是如果是这样的话，后面的也不用讲了，后面会整理语义化的优势，以及一些标签的使用。

## 语义化

一些场景有无可替代的优点。比如准备抽空重写一下博客主题，对博客主题来讲，可以说是很典型的富文本类型的页面了。

### 优势

* 对开发者友好，便于维护。目前觉得难维护只是因为不够熟练，使用不够多。
* 适合机器阅读，有利于SEO，提升网页搜索量。

> `用对`比`不用`好，`不用`比`用错`好，错误地使用标签会给机器阅读增加困难。

### 标签举例

* em：表示强调，比如，吃`<em>`一个`</em>`苹果，吃一个`<em>`苹果`</em>`，两句话强调对象不同。而strong标签表示重要，语义并不相同。

* hgroup：对标题元素进行分组，比如下面的就可以理解为，h1和h2同一级，hgroup语义上来讲，表示同一标题的不同组成部分。表示 `JavaScript对象——我们需要模拟类吗？` 虽然如果使用下面的代码，最终浏览器表现形式并不是上面的样子，只是从语义上来看，我们要想让浏览器变成上面的样子还需要自己书写很多CSS，似乎是感觉非常麻烦，似乎不如`<div>JavaScript对象——我们需要模拟类吗？</div>`来的简单。但从语义上来讲，后者并不能表示其所代表的含义，从人的角度看只是一行代码尚且看不出是标题，更别说层级关系了，那么机器又怎么能读懂它是一个标题呢。从这个角度来看，是应该要语义化的。

> 本元素已经从HTML5（W3C）规范中删除，但是它仍旧在 WHATWG 的 HTML 版本里。大多数浏览器都部分地实现，所以它不太可能消失。 但是其轮廓算法(outline algorithm)未在任何浏览器中实现，因此 <hgroup> 语义仍旧是理论的。HTML5 (W3C) 规范提供了如何处理副标题，小标题，可选标题和标语（Subheadings, subtitles, alternative titles and taglines）的建议。

* nav：导航链接部分

* aside：独立内容一部分，常用于侧边栏或者标注框。

* header：常用于介绍展示性内容，也可能包含logo，搜索框等

* footer：常用于下一章节内容，或者元素页脚。也叫通常包含作者，版权数据或者与文档相关链接。


```html
<hgroup>
<h1>JavaScript 对象 </h1>
<h2> 我们需要模拟类吗？</h2>
</hgroup>
<p>balah balah</p>
......
```

* section：表示文档中一个区域，一般来说应该出现在大纲里，如果元素内容可以分为几个部分的话，应该使用article。

```html
<section>
  <h1>Heading</h1>
  <p>Bunch of awesome content</p>
</section>
```


### 常用结构

1. 典型的body结构

```html
<body>
    <header>
        <nav>
            ……
        </nav>
    </header>
    <aside>
        <nav>
            ……
        </nav>
    </aside>
    <section>……</section>
    <section>……</section>
    <section>……</section>
    <footer>
        <address>……</address>
    </footer>
</body>
```

2. 多篇新闻展示在同一个专题
```html
<body>
    <header>……</header>
    <article>
        <header>……</header>
        <section>……</section>
        <section>……</section>
        <section>……</section>
        <footer>……</footer>
    </article>
    <article>
        ……
    </article>
    <article>
        ……
    </article>
    <footer>
        <address></address>
    </footer>
</body>
```