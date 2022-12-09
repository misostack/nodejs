#!/usr/bin/env node

const args = process.argv;

const number = parseInt(args[2]);
// console.log(number, typeof number, args);
const factory = (n) => {
  // 0 and 1 has factorial value is 1

  if (n <= 1) {
    return 1;
  }
  return n * factory(n - 1);
};

console.log(factory(number));
