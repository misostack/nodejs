#!/usr/bin/env node

let stop = false;
setTimeout(() => {
  stop = true;
  console.log("stop inside timer", stop);
}, 0);

while (stop === false) {
  console.log(stop);
  console.log("in while loop");
}
