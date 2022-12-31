#!/usr/bin/env node

const words = ["Happy", "New", "Year", "2023"];
const message = {};
words.map((w, index) => {
  Reflect.set(message, index, w);
});

let happyNewYearMessage2023 = "";
Reflect.ownKeys(message)
  .sort()
  .forEach((index) => {
    happyNewYearMessage2023 = `${happyNewYearMessage2023} ${Reflect.get(
      message,
      index
    )}`;
  });

console.log(happyNewYearMessage2023);
