# 06-浏览器DOM：你知道HTML节点有哪几种吗？

本章将整理梳理一下浏览器DOM的分类以及相对应的一些API，这里的DOM指狭义的文档对象模型。

## DOM API介绍

文档对象模型：使用对象这样的概念来描述HTML文档

DOM API包含四个部分

* 节点：DOM树形结构中的节点相关API
* 事件：触发和监听事件相关API
* Range：操作文字范围相关API
* 遍历：遍历DOM需要的相关API

## 节点

* Element：元素型节点，和标签相对应
  * HTMLElement
  * SVGElement
* Document：文档根节点
* CharacterData：字符数据
  * Text：文本节点
  * Comment：注释
  * ProcessingInstructtion：处理信息
* DocumentFragment：文档片段
* DocumentType：文档类型

## DocumentFragment测试

> DocumentFragment，文档片段接口，表示一个没有父级文件的最小文档对象。它被作为一个轻量版的 Document 使用，用于存储已排好版的或尚未打理好格式的XML片段。最大的区别是因为 DocumentFragment 不是真实DOM树的一部分，它的变化不会触发 DOM 树的（重新渲染) ，且不会导致性能等问题。

这里想起了之前面试时候的优化方面的问题，当时说在插入DOM的时候，尽量一次插入，避免多次插入。这种方案有两种实现，当时只知其一。一种是直接在节点里面innerHTML，然后最后一起appendChild。另一种方案就是这里的DocumentFragment了。

### DocumentFragment和innerHTML方案

这里既然提到了两种方案，那就说说这两种方案吧。当时刚学前端的时候，看了别人的代码，直接使用innerHTML插入，但是当时就在想一个问题，innerHTML写起来太乱了，看不出DOM结构，如果中间出了一些问题，很难检查出来。直到将近两年后的今天，才找到这个问题的答案，那就是DocumentFragment，这个方案不仅避免了可能由于插入DOM时引起的重绘，而且也保留了DOM结构，更加整齐。当然这两种方案所需时间几乎一致。

### 实际测试

测试代码引自![知乎](https://www.zhihu.com/question/27260165)，加了注释部分的改动，让其能测试出差距。

```js
// 直接插入
document.addEventListener('DOMContentLoaded', function() {
  var date = new Date();
  for (var i = 0; i < 5000; i++) {
    var tmpNode = document.createElement("div");
    tmpNode.innerHTML = "test" + i;
    document.body.appendChild(tmpNode);
    // console.log(window.getComputedStyle(document.body, null).getPropertyValue("height"));
  }
  console.log(new Date() - date);
});
```

```js
// 使用DocumentFragment
document.addEventListener("DOMContentLoaded", function() {
  var date = new Date();
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < 5000; i++) {
    var tempNode = document.createElement("div");
    tempNode.innerHTML = "test" + i;
    fragment.appendChild(tempNode);
    // console.log(window.getComputedStyle(document.body, null).getPropertyValue("height"));
  }
  document.body.appendChild(fragment);
  console.log(new Date() - date);
})
```

```js
document.addEventListener('DOMContentLoaded', function() {
  var date = new Date();
  var tmpNode = document.createElement("div");
  var str = "";
  for (var i = 0; i < 5000; i++) {
    str += "<div>test" + i +"</div>";
    // console.log(window.getComputedStyle(document.body, null).getPropertyValue("height"));
  }
  tmpNode.innerHTML = str;
  document.body.appendChild(tmpNode);
  console.log(new Date() - date);
})
```

这里也确实产生了点小问题，也算给了我一些警醒吧，技术发展很快，一些东西一定要实际测试一下。在一般情况下，使用DocumentFragment和不断插入DOM的时间其实是差不多的。这意味着什么呢？那就是一般情况下"似乎"没必要使用DocumentFragment来一次插入。这里的原因呢，经过一些查询，其实是因为现在的浏览器的优化做的更好了，如果在插入后没有访问`getComputedStyle`的情况下，浏览器会把样式表的计算推迟到脚本执行之后。所以经过测试之后，时间差不多。但是如果在后面使用getComputedStyle等获取一些属性的时候（尽管大多数情况下不需要如此），会导致浏览器立马计算出当前的值，这样时间上就会产生很大的差距。

但是这里引用一句别人说的话

> 尽管通常情况下，性能现在没有很大差异，但是作为靠谱程序员，你在追加dom时，用document fragement，是在代码层面明确：这里插入时，不需要（不应该）发生插入document的效果。所以该写的地方还是要写。
