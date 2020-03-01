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

const Benchmark = require("benchmark");
const fs = require("fs");

const sampleData = {
  citId: "01",
  districtId: "001",
  yardId: "00001",
  cityName: "Thành phố Hà Nội",
  districtName: "Quận Ba Đình",
  yardName: "Phường Phúc Xá",
  type: "Phường",
};

const writeFile = (filename, type) => {};

const readFile = (filepath, type) => {
  fs.readFile(filepath, "utf8", (error, data) => {
    if (error) {
      return console.error(error);
    }
    console.log(data);
    return data;
  });
};

(async function () {
  // add tests
})();
