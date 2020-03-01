#!/usr/bin/env node
debugger;

console.log(process.env.NODE_ENV);
setTimeout(() => {
  debugger;
  console.log("run after");
}, 0);
debugger;
console.log("run first");

const somethingCool = (a, ...rest) => {
  console.log("a", a);
  console.log("rest", rest);
};

somethingCool("a", 1, 2, "b", true, false, ["123"], { v: "kk" });

const week = ["mon", "tue", "wed", "thu", "fri"];
const weekend = ["sat", "sun"];

const days_in_a_week = [...week, ...weekend];

console.log(days_in_a_week);

function Counter() {
  this.count = 2;
  setInterval(() => {
    console.log(this.count++);
  }, 1000);
}

new Counter();

const aString = "BeMasterNodeJS";

console.log(`list of chars in ${aString} : `, [...aString]);
