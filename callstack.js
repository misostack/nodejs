const NUMBER = 1e5;
var x = 0;

// for (let i = 0; i < NUMBER; i++) {
//   x += i;
// }
// 🔰 NEVER DO THIS
const countDown = (number) => {
  if (number === 0) return number;
  x += number;
  return countDown(number - 1);
};

countDown(NUMBER);
console.log("(🔰) SUM(0,1e6) = ", x, "✔️");
