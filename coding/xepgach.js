// xepgach ngoi

var assert = require("assert");

const testcases = [
  {
    from: ["RGBW", "GBRW"],
    to: ["RGBW", "BRWG"],
  },
  {
    from: ["WBGR", "WBGR", "WRGB", "WRGB", "RBGW"],
    to: ["BGRW", "RWBG", "RGBW", "BWRG", "RBGW"],
  },
];

// nice: firstEle[1] == secondEle[3] : rightOne === leftSecond
// rotate counter-clockwise -> [0-top,1-right,2-left,3-bottom] => [1-right,2-left,3-bottom,0-top]
// => cut 0 and push to the end
// rotate clockwise -> [0-top,1-right,2-left,3-bottom] => [3-bottom, 0-top,1-right,2-left]
// => cut end and unshift to the start

const rotateTie = (tie, clockwise = false) => {
  // split tie angles to array
  const tieAngles = tie.split("");
  //   for (let i = 0; i < 4; i++) {
  //     tieAngles.push(tie.charAt(i));
  //   }

  if (clockwise) {
    // cut last and unshift to start
    const lastAngle = tieAngles.pop();
    tieAngles.unshift(lastAngle);
  } else {
    // counter-clockwise
    // cut first and push to end
    const firstAngle = tieAngles.shift();
    tieAngles.push(firstAngle);
  }
  return tieAngles.join("");
};

const niceTieCouple = (tieL, tieR) => {
  return tieL.split("")[1] === tieR.split("")[3];
};

function solution(A) {
  // max rotate of each tie is 2
  // don't touch on nice tie couples
  // any tie need to be rotate will be rotate, so you can touch any tie first
  // but you have to decide to rotate it or its neighbors
}

// 1,2
// D(1,2) 2 => 
// D(2,3) = 

// 1,2,3
// D(1,2) = 2
// D(3,2) = 2



assert.equal(rotateTie("GBRW", true), "WGBR", "Rotate Clockwise Failed");
assert.equal(
  rotateTie("GBRW", false),
  "BRWG",
  "Rotate Counter-Clockwise Failed"
);
assert.equal(
  niceTieCouple("RGBW", "BRWG"),
  true,
  "Nice tice couple check failed"
);
assert.equal(
  niceTieCouple("RBGW", "GWRB"),
  true,
  "Nice tice couple check failed"
);
const allTies = ["GBRW", "RBGW", "BWGR", "BRGW"];
for (let i = 0; i < allTies.length - 1; i++) {
  console.log(
    allTies[i],
    allTies[i + 1],
    niceTieCouple(allTies[i], allTies[i + 1])
  );
}

console.log(solution(testcases[0].from));
