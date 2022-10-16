// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(N) {
  // write your code in JavaScript (Node.js 14)

  try {
    const MAX_N = 2147483647;
    // if not a positive integer return 0
    if (isNaN(N) || N <= 0 || N.toString().includes(".") || parseInt(N) > MAX_N)
      return 0;
    // convert to binary number
    // 12 -> 6 -> 3 -> 2 -> 1 => 10000
    let cloneOfN = N;
    let longestBinaryGap = 0;
    let startGap = -1;
    let endGap = -1;
    for (let index = 0; cloneOfN >= 1; ) {
      // set startGap when startGap === -1 cloneOfN %2 === 1
      if (cloneOfN % 2 === 1) {
        if (startGap === -1) {
          startGap = index;
        } else if (startGap !== -1 && endGap === -1) {
          endGap = index;
          // closeGap and compare
          const gapDiff = endGap - startGap - 1;
          if (gapDiff > longestBinaryGap) {
            longestBinaryGap = gapDiff;
          }
          // reset gap
          startGap = index;
          endGap = -1;
        }
      }
      cloneOfN = cloneOfN >> 2;
      index++;
    }
    return longestBinaryGap;
  } catch {
    return 0;
  }
}

function solution2(N) {
  // write your code in JavaScript (Node.js 14)

  try {
    const MAX_N = 2147483647;
    // if not a positive integer return 0
    if (isNaN(N) || N <= 0 || N.toString().includes(".") || parseInt(N) > MAX_N)
      return 0;
    // convert to binary number
    // 12 -> 6 -> 3 -> 2 -> 1 => 10000
    let binaryOfN = N.toString(2);
    let longestBinaryGap = 0;
    let startGap = -1;
    let endGap = -1;
    for (let index = 0; index < binaryOfN.length; index++) {
      // set startGap when startGap === -1 cloneOfN %2 === 1
      if (binaryOfN.charAt(index) == 1) {
        if (startGap === -1) {
          startGap = index;
        } else if (startGap !== -1 && endGap === -1) {
          endGap = index;
          // closeGap and compare
          const gapDiff = endGap - startGap - 1;
          if (gapDiff > longestBinaryGap) {
            longestBinaryGap = gapDiff;
          }
          // reset gap
          startGap = index;
          endGap = -1;
        }
      }
    }
    return longestBinaryGap;
  } catch {
    return 0;
  }
}

console.log(solution2(1041));
console.log(solution2("abc"));
