const { parse } = require("csv");
const _ = require("lodash");

const fs = require("fs");
const path = require("path");
let cities = [];
let districts = [];
let yards = [];

// "cityId","districtId","yardId","cityName","districtName","yardName","yardType"
const columns = {
  cityId: 0,
  districtId: 1,
  yardId: 2,
  cityName: 3,
  districtName: 4,
  yardName: 5,
  yardType: 6,
};

const parser = parse(
  {
    delimiter: ",",
    on_record: (record, { line }) => {
      console.log(line, record);
      // city
      cities.push({
        id: record[columns.cityId],
        name: record[columns.cityName],
      });
      cities = _.uniqBy(cities, "id");
      // district
      districts.push({
        id: record[columns.districtId],
        name: record[columns.districtName],
        city: record[columns.cityId],
      });
      districts = _.uniqBy(districts, "id");
      // yard
      yards.push({
        id: record[columns.yardId],
        name: record[columns.yardName],
        district: record[columns.districtId],
        city: record[columns.cityId],
      });
      yards = _.uniqBy(yards, "id");
      return record;
    },
  },
  function (err, data) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data.length);
  }
);

parser.on("end", () => {
  console.log(cities.length);
  console.log(districts.length);
  console.log(yards.length);
  // write file
  const jsonObjects = {
    cities,
    districts,
    yards,
  };
  const writer = fs.createWriteStream(path.resolve("../mock.json"));
  const data = JSON.stringify(jsonObjects);
  for (let i = 0; i < data.length; i++) {
    writer.write(data[i]);
  }
  writer.end(() => {
    console.log("DONE!!!");
  });
});

fs.createReadStream("../vn-city-district-yard.csv", {
  encoding: "utf-8",
}).pipe(parser);
