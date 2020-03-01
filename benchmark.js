// TODO
/*
1. Example for benchmark
*/

const Benchmark = require("benchmark");

const suite = new Benchmark.Suite();

const superReduceString1 = (input) => {
  const line = input.split("\n")[0];
  let acc = "";
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (acc.length > 0 && acc[acc.length - 1] === c) {
      acc = acc.slice(0, acc.length - 1);
    } else {
      acc += c;
    }
  }
  return acc.length === 0 ? "Empty String" : acc;
};

const superReducedString2 = (string) => {
  var line = string.split("");
  var acc = "";
  for (var i = 0; i < line.length; i++) {
    var c = line[i];
    if (acc[acc.length - 1] === c) {
      acc = acc.slice(0, acc.length - 1);
    } else {
      acc += c;
    }
  }
  return acc.length === 0 ? "Empty String" : acc;
};

const superReduceString3 = (input) => {
  let inputArray = input.split("");
  for (let i = 0; i <= inputArray.length; i++) {
    for (let j = i + 1; j <= inputArray.length; j++) {
      if (inputArray[j] === inputArray[i]) {
        inputArray.splice(j, 1);
      }
    }
  }
  let reducedString = inputArray.join("").trim();
  return reducedString.length === 0 ? "Empty String" : reducedString;
};

const superReduceString4 = (input) => {
  var str = input.split("");
  for (let i = 0; i < input.length; i++) {
    if (str[i - 1] && str[i] === str[i - 1]) {
      str.splice(i - 1, 2);
      // reset i
      i -= 2;
    }
  }
  return str.length === 0 ? "Empty String" : str.join();
};

const superReducedString5 = (str) => {
  let output = "";
  for (let i = 0; i < str.length; i++) {
    if (output[output.length - 1] === str[i]) {
      // remove last index
      output = output.slice(0, -1);
    } else {
      output += str[i];
    }
  }
  return output.length === 0 ? "Empty String" : output;
};

var testcases = [
  {
    input: "aa",
    output: "Empty String",
  },
  {
    input: "abba",
    output: "Empty String",
  },
  {
    input: "cabba",
    output: "c",
  },
  {
    input: "cabbbbac",
    output: "Empty String",
  },
];

(async function () {
  let s1TC = [];
  let s2TC = [];
  let s3TC = [];
  let s4TC = [];
  let s5TC = [];
  // add tests
  suite
    .add("superReduceString1", function () {
      const testData = testcases[0];
      s1TC.push(superReduceString1(testData.input) === testData.output);
      superReduceString1(testData.input) === testData.output;
    })
    .add("superReducedString2", function () {
      const testData = testcases[0];
      s2TC.push(superReducedString2(testData.input) === testData.output);
      superReducedString2(testData.input) === testData.output;
    })
    .add("superReduceString3", function () {
      const testData = testcases[0];
      s3TC.push(superReduceString3(testData.input) === testData.output);
      superReduceString3(testData.input) === testData.output;
    })
    .add("superReduceString4", function () {
      const testData = testcases[0];
      s4TC.push(superReduceString4(testData.input) === testData.output);
      superReduceString4(testData.input) === testData.output;
    })
    .add("superReducedString5", function () {
      const testData = testcases[0];
      s5TC.push(superReducedString5(testData.input) === testData.output);
      superReducedString5(testData.input) === testData.output;
    })
    // .add("String#indexOf", function () {
    //   "Hello World!".indexOf("o") > -1;
    // })
    // .add("String#match", function () {
    //   !!"Hello World!".match(/o/);
    // })

    // add listeners
    .on("cycle", function (event) {
      console.log(String(event.target));
    })
    .on("complete", function () {
      console.log("Fastest is " + this.filter("fastest").map("name"));
    })
    // run async
    .run({ async: true });
})();
