const { exec } = require("child_process");
const fs = require("fs");

fs.writeFile("newfile.txt", "", (err) => {
  if (err) {
    console.log("can not write file");
  }
});

exec("ls -t", (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }
  const files = stdout.split("\n");
  console.log(stdout, files);
  const mergedData = files.join(" ");
  const outputData = [];
  let count = 0;
  for (let i = 0; i < mergedData.length; i++) {
    const isReplacedIndex = i > 0 && i % 4 === 0;
    outputData.push(isReplacedIndex ? "_" : mergedData[i]);
  }
  console.log(outputData.join(""));
});
