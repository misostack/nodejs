const fs = require("fs");

// https://nodejspedia.com/en/knowledge-base/3459476/how-to-append-to-a-file-in-node-

/*
```javascript
Error: EMFILE: too many open files, open './example.txt' {errno: -24, code: 'EMFILE', syscall: 'open', path: './example.txt', stack: 'Error: EMFILE: too many open files, open './example.txt'', …}
003/fs.js:5
Write line 4119
003/fs.js:6
Error: EMFILE: too many open files, open './example.txt' {errno: -24, code: 'EMFILE', syscall: 'open', path: './example.txt', stack: 'Error: EMFILE: too many open files, open './example.txt'', …}
003/fs.js:5
Write line 4120
003/fs.js:6
Error: EMFILE: too many open files, open './example.txt' {errno: -24, code: 'EMFILE', syscall: 'open', path: './example.txt', stack: 'Error: EMFILE: too many open files, open './example.txt'', …}
003/fs.js:5
Write line 4121
```
*/

// [...Array[10000]].forEach(() => {
//   fs.appendFile("./example.txt", `This is line ${i + 1}\n`, (err) => {
//     if (err) console.error(err);
//     console.log(`Write line ${i + 1}`);
//   });
// });
const ONE_MILLION = 1000000;
const ONE_BILLION = ONE_MILLION * 1000;
// console.log(new Date().toISOString());
// try {
//   const stream = fs.createWriteStream("./example.txt", { flags: "a" });
//   [...Array(ONE_BILLION)].forEach((item, i) => {
//     // 1 million
//     stream.write(`This is line ${i + 1}\n`);
//   });
//   console.log(new Date().toISOString());
//   stream.end();
// } catch (error) {
//   console.error(error);
// }

// OPTIMIZE
const { spawn, exec, fork } = require("child_process");

console.log(new Date().toISOString());
const step = 100; // 100 process
const alpha = ONE_BILLION / step;
try {
  for (let i = 0; i < step; i++) {
    let start = i * alpha;
    let end = start + alpha - 1;
    console.log(`Start new worker ${i + 1}`);
    let workerProcess = spawn("node", ["./003/fs-with-params", start, end]);
    workerProcess.stdout.on("data", function (data) {
      console.log("stdout: " + data);
    });
    workerProcess.stderr.on("data", function (data) {
      console.log("stderr: " + data);
    });
    workerProcess.on("close", function (code) {
      console.log("child process exited with code " + code);
    });
  }
} catch (error) {
  console.error(error);
}
