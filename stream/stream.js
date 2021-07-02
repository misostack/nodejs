#!/usr/bin/env node

console.log("STREAM: FROM 0 TO HERO!!!");
// https://www.geeksforgeeks.org/node-js-fs-createreadstream-method/
const microtime = require("microtime");
const fs = require("fs");
const path = require("path");
const DIRPATH = path.resolve(__dirname);
const FILEPATH = path.resolve(DIRPATH, "large1b.txt");
const BILLION = 1e9;

var startTime = microtime.now();
const write100lines = () => {
  const fileHandler = fs.createWriteStream(
    path.resolve(DIRPATH, "large100.txt")
  );

  for (let i = 1; i <= 1e2; i++) {
    fileHandler.write(`This is line ${i < 1e2 ? i + "\n" : i}`);
  }

  // end stream
  fileHandler.end(() => {
    calculateRunTime();
  });
};

// WRITE 1 to 1,000,000 line
const write1MLines = () => {
  const fileHandler = fs.createWriteStream(FILEPATH);

  for (let i = 1; i <= 1e6; i++) {
    fileHandler.write(`This is line ${i < 1e6 ? i + "\n" : i}`);
  }

  // end stream
  fileHandler.end(() => {
    calculateRunTime();
  });
};

const write1BLines = () => {
  const fileHandler = fs.createWriteStream(FILEPATH);

  for (let i = 1; i <= BILLION; i++) {
    if (i % 9999 == 0) {
      console.log(`This is line ${i < BILLION ? i + "\n" : i}`);
    }
    fileHandler.write(`This is line ${i < BILLION ? i + "\n" : i}`);
  }

  // end stream
  fileHandler.end(() => {
    calculateRunTime();
  });
};

const calculateRunTime = () => {
  const microSecs = microtime.now() - startTime;
  const miliSecs = microSecs / 1000;
  console.log(`\nTotal run time ${miliSecs} milisecs \n`);
};

const read100Lines = () => {
  const fileReader = fs.createReadStream(
    path.resolve(DIRPATH, "large100.txt"),
    {
      encoding: "UTF-8",
    }
  );
  fileReader.on("data", (chunk) => {
    console.log(chunk);
    console.log("-".repeat(100));
  });
};

(async () => {
  // write100lines();
  write1BLines();
  // read100Lines();
})();
