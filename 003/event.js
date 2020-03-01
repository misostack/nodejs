const events = require("events");
const EVT_SEND_EMAIL = Symbol();

const eventEmitter = new events.EventEmitter();

const registerUser = (email, password) => {
  // insert intodb
  console.log("registerUser", email, password);
  // send email
  eventEmitter.emit(EVT_SEND_EMAIL, email);
  // response
  console.log("success", email);
};
const sendEmail = (...args) => {
  setTimeout(() => {
    console.log("sendEmail to", args);
  }, 1000);
};

eventEmitter.on(EVT_SEND_EMAIL, sendEmail);
for (let i = 0; i < 100; i++) {
  registerUser(`sonnm${i + 1}@yopmail.com`, "123456");
}
