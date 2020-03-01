const util = require("util");
const exampleArray = Array.from(new Array(10)).map((_, id) => {
  return { id: id + 1, order: id };
});

// moved arr[x] to position y in arr and re order the array

// ref : https://www.w3resource.com/javascript-exercises/javascript-array-exercise-38.php

const testArray = [1, 2, 3, 4, 5];

const move = (arr, oldIndex, newIndex) => {
  // arr.splice(oldIndex, 1);
  arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
  return arr;
};
console.log(move([10, 20, 30, 40, 50], 3, 2));
// [10, 20, 40, 30, 50]
const swapOrder = (a, b) => {
  let tmp = a.order;
  a.order = b.order;
  b.order = tmp;
};
const arrageOrderASC = (arr, oldIndex, newIndex) => {
  // swap index for range inside oldIndex,newIndex
  for (let i = newIndex - 1; i > oldIndex; i--) {
    swapOrder(arr[i], arr[i - 1]);
  }
  // final step
  swapOrder(arr[oldIndex], arr[newIndex]);
};
const arrageOrderDESC = (arr, oldIndex, newIndex) => {
  // swap index for range inside oldIndex,newIndex
  for (let i = newIndex + 1; i < oldIndex; i++) {
    swapOrder(arr[i], arr[i + 1]);
  }
  // final step
  swapOrder(arr[oldIndex], arr[newIndex]);
};
const arrangeOrder = (arr, oldIndex, newIndex) => {
  return oldIndex < newIndex
    ? arrageOrderASC(arr, oldIndex, newIndex)
    : arrageOrderDESC(arr, oldIndex, newIndex);
};

const moveElementToNewPosition = (
  arr,
  oldIndex,
  newIndex,
  orderField = "order"
) => {
  arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
  arrangeOrder(arr, oldIndex, newIndex);
  return { arr };
};

console.log(
  util.inspect(moveElementToNewPosition(exampleArray, 1, 3), true, 5, true)
);

console.log(
  util.inspect(moveElementToNewPosition(exampleArray, 8, 1), true, 5, true)
);
