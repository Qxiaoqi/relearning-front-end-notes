function sleep(duration) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, duration);
  })
}

async function changeColor(color, time) {
  await sleep(time);
  document.getElementById("circle").style.backgroundColor = color;
}

(async function run() {
  while (true) {
    await changeColor("yellow", 3000);
    await changeColor("red", 1000);
    await changeColor("green", 2000);
  }
})();