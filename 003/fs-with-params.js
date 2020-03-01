const fs = require("fs");
const argv = process.argv.splice(2);
const start = parseInt(argv[0]);
const end = parseInt(argv[1]);
// const step = 100;

// const writeFile = (from, to) => {
//   try {
//     console.log(new Date().toISOString());
//     console.log("write file");

//     for (let i = from; i < to; i++) {
//       console.log(`This is line ${i + 1}\n`);
//       // 1 million
//       setTimeout(() => {
//         const stream = fs.createWriteStream("./example.txt", { flags: "a" });
//         stream.write(`This is line ${i + 1}\n`);
//         stream.end();
//       }, i % step);
//     }
//     console.log(new Date().toISOString());
//   } catch (error) {
//     console.error(error);
//   }
// };

// writeFile(start, end);

const MAX = Math.pow(2, 12); // 4096
const CONCURRENCY = Math.sqrt(MAX); // 64
const filename = "example.txt";
const EVT_WRITEFILE = Symbol();

const events = require("events");
const eventEmitter = new events.EventEmitter();

const writeFile = (number, limit) => {
  if (number === limit) return;
  console.log(`Writing line ${number}\n`);
  // write file
  fs.writeFileSync(filename, `This is line ${number}\n`, { flag: "a" });
  setTimeout(() => {
    eventEmitter.emit(EVT_WRITEFILE, number + 1, limit);
  }, 0);
};

const writeFileHandle = (...args) => {
  writeFile(args[0], args[1]);
};

eventEmitter.addListener(EVT_WRITEFILE, writeFileHandle);

writeFile(start, end);
