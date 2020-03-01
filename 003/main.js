#!/usr/bin/env node

// node ./003/main.js "123"
// without slice
// [
//   '/home/sonnm/.nvm/versions/node/v14.15.1/bin/node',
//   '/home/sonnm/src/github.com/misostack/nodejs/003/main.js',
//   '123'
// ]
// with slice
// [ '123' ]

argv = process.argv.slice(2);

console.log("argv", argv);

console.log("process.pid", process.pid);

process.stdout.write("Type something then hit enter: \n");
process.stdin.setEncoding("utf8");
process.stdin.on("readable", () => {
  const chunk = process.stdin.read();
  if (chunk !== null) {
    process.stdout.write(`You wrote: ${chunk}`);
    // process.exit(0);
  }
});

const querystring = require("querystring");

const params = { page: 1, size: 10, s: "somethign w" };
console.log(querystring.stringify(params));

const url =
  "http://www.opencanvas.co.uk?myName=Shaun&myAge=28&comment=Yes+I+am+getting+old'";
console.log(querystring.parse(url.substring(url.indexOf("?") + 1)));
