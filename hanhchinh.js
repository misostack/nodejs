// TODO
/*
1. [ ] Analyze data structure
2. [ ] Create 3 files: city, district, yard
3.1 [ ] Read csv file : append city, district, yard
3.2 [ ] Read csv file : transform to array json, then write 3 array into 3 files
*/

/*
Data structure
{
  "citId","districtId","yardId","cityName","districtName","yardName","type"
}
*/

const fs = require("fs");
const path = require("path");
const dirPath = path.resolve(__dirname);

const sampleData = {
  citId: "01",
  districtId: "001",
  yardId: "00001",
  cityName: "Thành phố Hà Nội",
  districtName: "Quận Ba Đình",
  yardName: "Phường Phúc Xá",
  type: "Phường",
};

const writeFile = (filepath, data) => {
  fs.writeFile();
};

const readFile = (filepath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, "utf8", (err, content) => {
      if (err) {
        return reject(error);
      }
      return resolve(content);
    });
  });
};

(async function () {
  // add tests
  try {
    const csvPath = path.resolve(dirPath, "vn-city-district-yard.csv");
    const csvContent = await readFile(csvPath);
    console.log(csvContent.length);
  } catch (err) {
    console.error(err);
  }
})();
