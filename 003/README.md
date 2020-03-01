# 003 - Module

1. Common built-in module

- require
- url
- querystring
- os
- child_process

```bash
> const url = require('url');
undefined
> url.parse('https://sonnm.com?name=son&expertises=marketing');
Url {
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'sonnm.com',
  port: null,
  hostname: 'sonnm.com',
  hash: null,
  search: '?name=son&expertises=marketing',
  query: 'name=son&expertises=marketing',
  pathname: '/',
  path: '/?name=son&expertises=marketing',
  href: 'https://sonnm.com/?name=son&expertises=marketing'
}
```

**os**

```bash
> const os = require('os');
undefined
> os
{
  arch: [Function: arch] {
    [Symbol(Symbol.toPrimitive)]: [Function (anonymous)]
  },
  cpus: [Function: cpus],
  endianness: [Function: endianness] {
    [Symbol(Symbol.toPrimitive)]: [Function (anonymous)]
  },
  freemem: [Function: getFreeMem] {
    [Symbol(Symbol.toPrimitive)]: [Function (anonymous)]
  },
  getPriority: [Function: getPriority],
  homedir: [Function: hidden] {
    [Symbol(Symbol.toPrimitive)]: [Function (anonymous)]
  },
  hostname: [Function: hidden] {
    [Symbol(Symbol.toPrimitive)]: [Function (anonymous)]
  },
  loadavg: [Function: loadavg],
  networkInterfaces: [Function: networkInterfaces],
  platform: [Function: platform] {
    [Symbol(Symbol.toPrimitive)]: [Function (anonymous)]
  },
  release: [Function: getOSRelease] {
    [Symbol(Symbol.toPrimitive)]: [Function (anonymous)]
  },
  setPriority: [Function: setPriority],
  tmpdir: [Function: tmpdir] {
    [Symbol(Symbol.toPrimitive)]: [Function (anonymous)]
  },
  totalmem: [Function: getTotalMem] {
    [Symbol(Symbol.toPrimitive)]: [Function (anonymous)]
  },
  type: [Function: getOSType] {
    [Symbol(Symbol.toPrimitive)]: [Function (anonymous)]
  },
  userInfo: [Function: userInfo],
  uptime: [Function: getUptime] {
    [Symbol(Symbol.toPrimitive)]: [Function (anonymous)]
  },
  version: [Function: getOSVersion] {
    [Symbol(Symbol.toPrimitive)]: [Function (anonymous)]
  },
  constants: [Object: null prototype] {
    UV_UDP_REUSEADDR: 4,
    dlopen: [Object: null prototype] {
      RTLD_LAZY: 1,
      RTLD_NOW: 2,
      RTLD_GLOBAL: 256,
      RTLD_LOCAL: 0,
      RTLD_DEEPBIND: 8
    },
    errno: [Object: null prototype] {
      E2BIG: 7,
      EACCES: 13,
      EADDRINUSE: 98,
      EADDRNOTAVAIL: 99,
      EAFNOSUPPORT: 97,
      EAGAIN: 11,
      EALREADY: 114,
      EBADF: 9,
      EBADMSG: 74,
      EBUSY: 16,
      ECANCELED: 125,
      ECHILD: 10,
      ECONNABORTED: 103,
      ECONNREFUSED: 111,
      ECONNRESET: 104,
      EDEADLK: 35,
      EDESTADDRREQ: 89,
      EDOM: 33,
      EDQUOT: 122,
      EEXIST: 17,
      EFAULT: 14,
      EFBIG: 27,
      EHOSTUNREACH: 113,
      EIDRM: 43,
      EILSEQ: 84,
      EINPROGRESS: 115,
      EINTR: 4,
      EINVAL: 22,
      EIO: 5,
      EISCONN: 106,
      EISDIR: 21,
      ELOOP: 40,
      EMFILE: 24,
      EMLINK: 31,
      EMSGSIZE: 90,
      EMULTIHOP: 72,
      ENAMETOOLONG: 36,
      ENETDOWN: 100,
      ENETRESET: 102,
      ENETUNREACH: 101,
      ENFILE: 23,
      ENOBUFS: 105,
      ENODATA: 61,
      ENODEV: 19,
      ENOENT: 2,
      ENOEXEC: 8,
      ENOLCK: 37,
      ENOLINK: 67,
      ENOMEM: 12,
      ENOMSG: 42,
      ENOPROTOOPT: 92,
      ENOSPC: 28,
      ENOSR: 63,
      ENOSTR: 60,
      ENOSYS: 38,
      ENOTCONN: 107,
      ENOTDIR: 20,
      ENOTEMPTY: 39,
      ENOTSOCK: 88,
      ENOTSUP: 95,
      ENOTTY: 25,
      ENXIO: 6,
      EOPNOTSUPP: 95,
      EOVERFLOW: 75,
      EPERM: 1,
      EPIPE: 32,
      EPROTO: 71,
      EPROTONOSUPPORT: 93,
      EPROTOTYPE: 91,
      ERANGE: 34,
      EROFS: 30,
      ESPIPE: 29,
      ESRCH: 3,
      ESTALE: 116,
      ETIME: 62,
      ETIMEDOUT: 110,
      ETXTBSY: 26,
      EWOULDBLOCK: 11,
      EXDEV: 18
    },
    signals: [Object: null prototype] {
      SIGHUP: 1,
      SIGINT: 2,
      SIGQUIT: 3,
      SIGILL: 4,
      SIGTRAP: 5,
      SIGABRT: 6,
      SIGIOT: 6,
      SIGBUS: 7,
      SIGFPE: 8,
      SIGKILL: 9,
      SIGUSR1: 10,
      SIGSEGV: 11,
      SIGUSR2: 12,
      SIGPIPE: 13,
      SIGALRM: 14,
      SIGTERM: 15,
      SIGCHLD: 17,
      SIGSTKFLT: 16,
      SIGCONT: 18,
      SIGSTOP: 19,
      SIGTSTP: 20,
      SIGTTIN: 21,
      SIGTTOU: 22,
      SIGURG: 23,
      SIGXCPU: 24,
      SIGXFSZ: 25,
      SIGVTALRM: 26,
      SIGPROF: 27,
      SIGWINCH: 28,
      SIGIO: 29,
      SIGPOLL: 29,
      SIGPWR: 30,
      SIGSYS: 31,
      SIGUNUSED: 31
    },
    priority: [Object: null prototype] {
      PRIORITY_LOW: 19,
      PRIORITY_BELOW_NORMAL: 10,
      PRIORITY_NORMAL: 0,
      PRIORITY_ABOVE_NORMAL: -7,
      PRIORITY_HIGH: -14,
      PRIORITY_HIGHEST: -20
    }
  },
  EOL: '\n'
}
> os.homedir();
'/home/sonnm'
> os.arch();
'x64'
> os.cpus();
[
  {
    model: 'Intel(R) Core(TM) i7-7700HQ CPU @ 2.80GHz',
    speed: 2807,
    times: { user: 28370, nice: 0, sys: 46020, idle: 20878220, irq: 0 }
  },
  {
    model: 'Intel(R) Core(TM) i7-7700HQ CPU @ 2.80GHz',
    speed: 2807,
    times: { user: 19950, nice: 0, sys: 22600, idle: 20929290, irq: 0 }
  },
  {
    model: 'Intel(R) Core(TM) i7-7700HQ CPU @ 2.80GHz',
    speed: 2807,
    times: { user: 27840, nice: 0, sys: 57150, idle: 20880910, irq: 0 }
  },
  {
    model: 'Intel(R) Core(TM) i7-7700HQ CPU @ 2.80GHz',
    speed: 2807,
    times: { user: 17180, nice: 0, sys: 28620, idle: 20925270, irq: 0 }
  },
  {
    model: 'Intel(R) Core(TM) i7-7700HQ CPU @ 2.80GHz',
    speed: 2807,
    times: { user: 25650, nice: 0, sys: 56720, idle: 20882430, irq: 0 }
  },
  {
    model: 'Intel(R) Core(TM) i7-7700HQ CPU @ 2.80GHz',
    speed: 2807,
    times: { user: 17230, nice: 0, sys: 29650, idle: 20925960, irq: 0 }
  },
  {
    model: 'Intel(R) Core(TM) i7-7700HQ CPU @ 2.80GHz',
    speed: 2807,
    times: { user: 25860, nice: 0, sys: 55810, idle: 20880320, irq: 0 }
  },
  {
    model: 'Intel(R) Core(TM) i7-7700HQ CPU @ 2.80GHz',
    speed: 2807,
    times: { user: 19600, nice: 0, sys: 20990, idle: 20932840, irq: 0 }
  }
]
> os.version();
'#1 SMP Tue Jun 23 12:58:10 UTC 2020'
> os.uptime();
21004
> os.userInfo();
{
  uid: 1000,
  gid: 1000,
  username: 'sonnm',
  homedir: '/home/sonnm',
  shell: '/bin/bash'
}
```

- https://www.javatpoint.com/nodejs-child-process

- https://wkhtmltopdf.org/

```javascript
const { spawn, exec, fork } = require("child_process");
for (let i = 0; i <= 3; i++) {
  let workerProcess = spawn("/usr/local/bin/wkhtmltopdf", [
    "https://google.com",
    `google_${i}.pdf`,
  ]);
  workerProcess.stdout.on("data", function (data) {
    console.log("stdout: " + data);
  });
  workerProcess.stderr.on("data", function (data) {
    console.log("stderr: " + data);
  });
  workerProcess.on("close", function (code) {
    console.log("child process exited with code " + code);
  });
}
```
