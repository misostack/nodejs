// const assert = require("assert").strict;
const colors = require("colors/safe");

const testcases = [
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

const superReduceString2 = (string) => {
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
  console.error(input, reducedString);
  return reducedString.length === 0 ? "Empty String" : reducedString;
};

const superReduceString4 = (input) => {
  let str = input.split("");
  for (let i = 0; i < input.length; i++) {
    if (str[i - 1] && str[i] === str[i - 1]) {
      str.splice(i - 1, 2);
      // reset i
      i -= 2;
    }
  }
  return str.length === 0 ? "Empty String" : str.join();
};

const superReduceString5 = (str) => {
  let output = "";
  for (let i = 0; i < str.length; i++) {
    console.error(i, str[i]);
    if (output[output.length - 1] === str[i]) {
      // remove last index
      output = output.slice(0, -1);
    } else {
      output += str[i];
    }
  }
  return output.length === 0 ? "Empty String" : output;
};

const superReduceString = (str) => {
  return superReduceString5(str);
};

const runTest = (tc, idx) => {
  superReduceString(tc.input) === tc.output
    ? console.log(
        colors.green(
          `Testcase ${idx}: ${tc.input} - Expected: ${tc.output} : passed`
        )
      )
    : console.log(
        colors.red(
          `Testcase ${idx}: ${tc.input} - Expected: ${tc.output} : failed`
        )
      );
};

(async () => {
  testcases.map((tc, idx) => {
    runTest(tc, idx);
  });
})();
