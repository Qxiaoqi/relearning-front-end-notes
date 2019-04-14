// 测试定时器
setTimeout(function(){console.log("执行");}, 1000);
(function func() {
  var begin = Date.now();
  while(Date.now() - begin < 5000) {
    // console.log(1);
  }
})();



