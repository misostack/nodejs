const now = new Date();
const timeString = `${now.getHours()}${now.getMinutes()}${now.getSeconds()}${now.getMilliseconds()}`;
console.log(`${now.getDate()}${now.getMonth()}${now.getFullYear()}`);
console.log(timeString);
