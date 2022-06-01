#!/usr/bin node
const faker = require("@faker-js/faker").default;
const fs = require("fs");
const randomStr = faker.datatype.string(1000);
fs.writeFile("./tmp/randomStr.txt", randomStr, function (error) {
  if (error) {
    return console.error(error);
  }
  console.log("success", randomStr);
});
