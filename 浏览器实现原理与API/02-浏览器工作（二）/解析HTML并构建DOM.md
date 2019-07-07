# 02-浏览器：一个浏览器是如何工作的？（阶段二）

这一部分大概内容是讲的浏览器如何解析请求回来的HTML代码，以及DOM树是如何构建的。文章中涉及到编译原理的部分，因此先简单记录一下。后面本学期的编译原理学差不多的时候，再自己简单实现一下。该篇文章的demo先占个坑。

[demo](https://github.com/Qxiaoqi/parse-html)

## 联系

看到这部分解析HTML的部分，想起了Vue中template的Compile的过程，Compile有三个过程，parse，optimize，generate。其中的parse就是将template解析，提取其中的class，style等，形成AST语法树。

## 流程

字符流 -> 状态机 -> 词token -> 栈 -> DOM树

## token拆分

* `<abc` 开始标签
* `a = "xxx"` 属性
* `/>` 开始标签的结束标签
* `</xxx>` 结束标签
* `hello world!` 文本节点
* `<!-- xxx --->` 注释
* `<![CDATA[hello world!]]>` CDATA数据节点

## 状态机

编译原理内容，通过不同状态下解析下一个字符到达不同的状态，所形成的状态机。可以将每一个状态写成一个函数，返回值是其它的状态函数。

### 状态迁移

```js
var state = data;
var char
while(char = getInput())
  state = state(char);
```

## 构建DOM树

可用栈来实现，Javascript可用数组来实现。首先接收词法部分产生的词（token），接收同时，开始构建DOM树。当接受完所有输入，栈顶就是最后的根节点，根据栈先进后出，此时DOM树的产出就是第一项。

构建DOM树需要一个Node类，所有节点是该类的实例。

## 总结

当源代码完全按照xhtml语法来实现的话，parse过程是一个很简单的问题。但是HTML有很强的容错能力，如果想把所有情况实现，也确实是一个比较浩大的工程。demo后面会在编译原理学的差不多的时候，将一些概念都搞清楚后，才会开始写。