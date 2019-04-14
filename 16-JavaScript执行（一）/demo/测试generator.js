function* f() {
  for(var i = 0; true; i++) {
    // console.log(i);
    var reset = yield i;
    // console.log(i);
    if(reset) { i = -1; }
  }
}

var g = f();

console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next(true));

// g.next();
// g.next();
// g.next();
// g.next();

function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

var a = foo(5);
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true}

var b = foo(5);
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }
