let bar;
const example = (phase) => {
  console.log("phase=%s : bar=%s", phase, bar);
};
const someAsyncApiCallBack = () => {
  example("callback");
  setTimeout(() => {
    example("setTimeOut:0");
  }, 0);
  setTimeout(() => {
    example("setTimeOut:1");
  }, 1);
  setTimeout(() => {
    example("setTimeOut:1");
  }, 1);
  setTimeout(() => {
    example("setTimeOut:1.5");
  }, 1.5);
  setTimeout(() => {
    example("setTimeOut:2");
  }, 2);
  setTimeout(() => {
    example("setTimeOut:3");
  }, 3);
  setTimeout(() => {
    example("setTimeOut:5");
  }, 5);
  setTimeout(() => {
    example("setTimeOut:10");
  }, 10);
  setTimeout(() => {
    example("setTimeOut:100");
  }, 100);
  process.nextTick(() => {
    example("process.nextTick");
  });
  setImmediate(() => {
    example("setImmediate");
  });
};

someAsyncApiCallBack();

bar = 1;

// real world
// const server = net.createServer(() => {}).listen(8080);
// server.on('listening', () => {});
/*
sonnm@DESKTOP-78EN94K:~/src/github.com/misostack/nodejs$ node 003/nexttick.js
phase=callback : bar=undefined
phase=process.nextTick : bar=1
phase=setTimeOut:0 : bar=1
phase=setTimeOut:1 : bar=1
phase=setTimeOut:1 : bar=1
phase=setTimeOut:1.5 : bar=1
phase=setImmediate : bar=1
phase=setTimeOut:2 : bar=1
phase=setTimeOut:3 : bar=1
phase=setTimeOut:5 : bar=1
phase=setTimeOut:10 : bar=1
phase=setTimeOut:100 : bar=1
*/

const EventEmitter = require("events");
const util = require("util");

function MyEmitter() {
  EventEmitter.call(this);

  // use nextTick to emit the event once a handler is assigned
  process.nextTick(() => {
    this.emit("event");
  });
}
util.inherits(MyEmitter, EventEmitter);

const myEmitter = new MyEmitter();
myEmitter.on("event", () => {
  console.log("an event occurred!");
});
