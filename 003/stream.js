const fs = require("fs");

const readerStream = fs.createReadStream("./README.md");

// set encoding
readerStream.setEncoding("utf-8");

// stream events

readerStream.on("data", function (chunk) {
  console.log(chunk);
});

readerStream.on("end", function () {
  console.log(data);
});

readerStream.on("error", function (err) {
  console.log(err.stack);
});
