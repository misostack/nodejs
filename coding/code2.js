// Create pairs of an integer array.
// Each array element may belong to one pair only.
// Is it possible to use all the integers?

// return whether it is possible to split all the integers into pair

function solutionA(A) {
  // A's length is odd number return false
  if (A.length % 2 != 0) return false;
  let sortedA = A.sort((a, b) => a - b);
  // if there is any number in even index is not equal its next number in the sorted array
  // it meaned it can not be paired
  for (let i = 0; i <= sortedA.length - 1; i += 2) {
    if (A[i] != A[i + 1]) return false;
  }
  return true;
}
// run test
console.log(solutionA([1, 2, 2, 1]));
console.log(solutionA([7, 7, 7]));
console.log(solutionA([1, 2, 2, 3]));
const longestA = [];

for (let i = 0; i < 500, 000; i++) {
  longestA.push(-100, 000 + i * 10);
  longestA.push(-100, 000 + i * 10);
}

Array.prototype.shuffle = function () {
  return this.sort(() => Math.random() - 0.5);
};

console.log(solutionA(longestA.shuffle()));
