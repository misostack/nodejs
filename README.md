# NodeJS Courses

## Topics

1. :heavy_check_mark Installation
2. :heavy_check_mark Validation Data with joi
3. :heavy_check_mark [File I/O](./file/README.md)

> ...

- Installation
- Headfirst - Build your first chat application with ExpressJS + ReactJS + Firebase
- Advanced

## 1. Installation

- Ref : https://github.com/nvm-sh/nvm#installing-and-updating

```bash
# install node version manager
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
# then run the following commands, and add them to your .bashrc

export NVM_DIR="$HOME/.nvm"

[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# verify version
nvm --version
```

### Usage NVM

```bash
  624  nvm --version
  626  nvm -v
  628  nvm --version
  630  nvm install node
  631  nvm install 12.16.1
  632  nvm ls-remote
  633  nvm
  634  nvm ls
  635  nvm current
  637  nvm ls
  638  nvm alias default 12.16.1
  639  nvm ls

```

### Debug

1. VSCOde : https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_launch-configuration-attributes
2. From NodeJS : https://nodejs.org/en/docs/guides/debugging-getting-started/

### Optimization

1.

```bash
node --allow-natives-syntax program.js
```

### Common patterns

1. Rest Pattern

> Another powerful new feature in NodeJS is destructuring, which allows us to easily assign the values of arrays to new variables

```js
const somethingCool = (a, ...rest) => {
  console.log("a", a);
  console.log("rest", rest);
};

somethingCool("a", 1, 2, "b", true, false, ["123"], { v: "kk" });
```

2. Spread Pattern

> The spread pattern is the rest pattern in reverse - you expand a single variable into many

```js
const week = ["mon", "tue", "wed", "thu", "fri"];
const weekend = ["sat", "sun"];

const days_in_a_week = [...week, ...weekend];
```

### Arrow functions

> - Allow you to shorten function declarations
> - They are not assigned their own this - arrow functions inherit this from the call site

```bash
function Counter() {
  this.count = 2;
  setInterval(() => {
    console.log(this.count++);
  }, 1000);
}

new Counter();
```

## 2. Validation Data with joi

- [Joi](https://hapi.dev/module/joi/api/?v=17.1.1)

1. Datatypes

- String
- Number
- Boolean
- Date
- Link
- Object
- Array

2. Validations

> String

- required
- length
- min,max
- email
- uri
- pattern
