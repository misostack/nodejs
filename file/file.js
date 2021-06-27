#!/usr/bin/env node
const sprintf = require("sprintf-js").sprintf;
const chalk = require("chalk");
const heading = "All about %(title)s in NodeJS";
const topic = "%(idx)i. %(title)s";
const { EOL } = require("os");
const print = (placeHolder, params = {}) => {
  console.error(chalk.bold.green(sprintf(placeHolder, params)));
};
const printHead = (placeHolder, params = {}) => {
  console.error(chalk.bold.red(sprintf(placeHolder, params)));
};

printHead(heading, { title: "File IO" });
print(topic, { title: "Write a simple text file", idx: 1 });

// console.log(process.argv);
const fs = require("fs");
const path = require("path");

const writeFilePromise = (filepath, content) => {
  return new Promise((resolve, reject) => {
    try {
      fs.writeFile(filepath, content, { flag: "a+" }, (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(`${filepath} (async + promise) is written successfully!`);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const writeFileAsync1 = (filepath, content) => {
  print("writeFileAsync1");
  fs.writeFile(filepath, content, { flag: "a+" }, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`${filepath} (async) is written successfully!`);
  });
};
const writeFileSync1 = (filepath, content) => {
  print("writeFileSync1");
  try {
    fs.writeFileSync(filepath, content, { flag: "a+" });
    console.log(`${filepath} (sync) is written successfully!`);
  } catch (err) {
    console.error(err);
  }
};

(async () => {
  const filePath1 = path.resolve(__dirname, "./tmp/hello.txt");
  const content1 = `hello world ${EOL}`;
  const folderName = path.resolve(__dirname, "./tmp/examples");
  try {
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
    }
  } catch (err) {
    console.error(err);
  }
  const files = fs.readdirSync(__dirname).map((fileName) => {
    return path.resolve(__dirname, fileName);
  });
  console.log("files", files);
  writeFileAsync1(filePath1, content1);
  writeFileSync1(filePath1, content1);
  writeFilePromise(filePath1, content1)
    .then((success) => console.log(success))
    .catch((err) => console.error(err));
  const writeStatus = await writeFilePromise(filePath1, content1);
  console.log(writeStatus);
  console.log("Do other things");
})();
