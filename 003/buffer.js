const buffer = require("buffer");

const bufferA = Buffer.alloc(1); // 1B

bufferA.write(
  "Today i will finish the session 3 of 24 hours - learn enough nodejs"
);

console.log(bufferA.toString());
