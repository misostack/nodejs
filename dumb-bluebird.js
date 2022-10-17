const Bluebird = require("bluebird");
const sendMessage = (callback, message, timeout) => {
  setTimeout(() => {
    console.log("send message", message);
    callback();
  }, timeout);
};
const func1 = Bluebird.promisify(sendMessage);
const func2 = () => {
  return new Promise((resolve) => {
    sendMessage(resolve, "func2", 1000);
  });
};

const p = new Promise(() => {});
console.log(p);

(async () => {
  console.log(func1);
  await func1(() => {}, "func1", 1000)
    .then((r) => {
      console.log(r);
    })
    .finally(() => console.log("end bluebird"));
  func2();
  console.log("console");
})();
