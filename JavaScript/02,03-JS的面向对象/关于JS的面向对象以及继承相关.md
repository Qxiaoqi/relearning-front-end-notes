# 06,07-关于JavaScript的面向对象相关

最近几天也好好梳理了一下这方面的内容，刚好前几天的一个面试问到了相关内容，感觉答得不是太好。本篇笔记结合专栏内容和其它内容做一个大致总结。主要涉及内容：对象，JS的面向对象和其它语言的区别，继承相关。

## 对象相关

### 两类属性

数据属性：
* value：属性值
* writable：属性能否被赋值
* enumerable：可否被for in枚举
* configurable：可否被删除或改变特征值

访问器属性：
* getter：获取时调用
* setter：设置时调用
* enumerable：可否被for in枚举
* configurable：可否被删除或改变特征值

### 一些方法

* hasOwnProperty()：检测自有属性
* propertyIsEnumerable()：hasOwnProperty的加强版，当自有属性的可枚举性是true时才返回true
* Object.keys()：返回对象中可枚举的自有属性组成的名称数组
* Object.getOwnPropertyNames()：与Object.keys()相比，返回的不仅仅时可枚举的属性
* Object.getOwnPropertyDescriptor()：获得某个对象自有属性的属性描述符
* Object.defineProperty()：设置属性的特性
* Object.getPrototypeOf()：查询其原型，ES5之前使用o.constructor
* isPrototypeOf()：可用来检测一个对象是否是另一个对象的原型，instanceof用来检测是否是从构造函数实例的对象
* Object.prototype.toString.call()：可用来判断类型，基础类型都可判断比如array，string，object，boolean，number，undefined，null
* 

## JavaScript和Java为代表的面向对象区别

* 以Java为代表的面向对象是基于类的面向对象
* JavaScript是基于原型的面向对象

说到JavaScript的面向对象，就要提到JavaScript的诞生，因为一些原因，JavaScript在推出之时就要求它去模仿Java，因此产生了new，this等语言特性，使之看起来像Java。

两者差别还是很大的
* 基于类的思想先有类，再用类去实例化一个对象
* 基于原型的思想则提倡关注实例的行为，然后才关心将这些对象划分到相似的原型对象，而不是分成类。

在我看来，不同语言有不同的特性，JavaScript对象具有高度动态性，因为JavaScript赋予了使用者在运行时为对象添加状态和行为的能力，比如创建一个对象后，再给它添加属性，这样毫无问题。没有必要刻意的去模拟基于类的一些方法，应该充分利用JavaScript的优秀之处。

## JavaScript的继承

说面向对象就要说到继承。

JavaScript的继承方法有很多，从最开始的使用`function`来模拟Java类的语法（如：new，prototype，constructor等），到ES5的`Object.create()`的出现，再到现在ES6的`class`和`extends`语法糖。随着标准的不断提出，也趋向于逐渐完善的状态。

不管是哪种方法，归根结底都是基于原型的继承，JavaScript的原型链是其中的关键所在。

### 继承的状态

继承有三个重要的状态，脑海中要有一张图，分别是：原型对象，构造函数，对象
* 原型对象 constructor -> 构造函数
* 构造函数 prototype -> 原型对象
* 构造函数 new -> 实例
* 实例 \_\_proto\_\_ -> 原型对象

### 继承的方法

实现方式可在demo里找到

七种方式：
* 原型链继承
  * 实现：new 父类 赋给 子类prototype
  * 缺点：实例对引用类型（如数组）的改动，会导致所有实例改动，而且不可向父类传参
* 构造函数式继承
  * 实现：子类 call 父类构造函数
  * 缺点：无法实现复用，所有子类有父类实例的副本，影响性能
* 组合式继承
  * 实现：上面两种综合使用
  * 缺点：创建实例的时候，原型中会有两份相同的属性（可用 寄生组合方式 改进，即Object.create）
* 原型式继承
  * 实现：对象Object.create创建
  * 缺点：无法传递参数，有篡改可能
* 寄生式继承
  * 是一种思路，可以和组合方式组合
  * 缺点：同原型式继承
* 寄生组合式继承
  * 实现：在组合式继承的基础上改动，即将new 父类的部分，改成Object.create(父类.prototype)。原因，new会执行目标函数，导致多创建一层，而Object.create()不会执行，所以少一层。
  * 目前最为完善的方法
* 混入方式继承多个对象
  * 实现：Object.assign()会将其它原型上的函数拷贝到目标原型上，所以可以继承多个对象

备注：Object.create()是ES5，原理是创建一个空函数，将传入的参数绑定到空函数的prototype上，然后返回new f() 实例

### 继承总结

其实上面说的这么多方式，排除掉ES6之外，其实就两种思路
* 第一种是`function`来模拟，该种方法更像Java风格的类接口来操纵，非常的别扭
* 第二种即ES5的`Object.create()`直接创建（Object.create可用其他方式模拟），这种方式在我看来更加符合基于原型的面向对象
