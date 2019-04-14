function sleep(duration) {
  return new Promise(function(resolve, reject) {
      setTimeout(resolve,duration);
  })
}
async function foo(name){
  await sleep(2000)
  console.log(name)
}
async function foo2(){
  await foo("a");
  await foo("b");
}

foo2();
