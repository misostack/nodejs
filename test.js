// const util = require("util");
// const exampleArray = Array.from(new Array(10)).map((_, id) => {
//   return { id: id + 1, order: id };
// });

// // moved arr[x] to position y in arr and re order the array

// // ref : https://www.w3resource.com/javascript-exercises/javascript-array-exercise-38.php

// const testArray = [1, 2, 3, 4, 5];

// const move = (arr, oldIndex, newIndex) => {
//   // arr.splice(oldIndex, 1);
//   arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
//   return arr;
// };
// console.log(move([10, 20, 30, 40, 50], 3, 2));
// // [10, 20, 40, 30, 50]
// const swapOrder = (a, b) => {
//   let tmp = a.order;
//   a.order = b.order;
//   b.order = tmp;
// };
// const arrageOrderASC = (arr, oldIndex, newIndex) => {
//   // swap index for range inside oldIndex,newIndex
//   for (let i = newIndex - 1; i > oldIndex; i--) {
//     swapOrder(arr[i], arr[i - 1]);
//   }
//   // final step
//   swapOrder(arr[oldIndex], arr[newIndex]);
// };
// const arrageOrderDESC = (arr, oldIndex, newIndex) => {
//   // swap index for range inside oldIndex,newIndex
//   for (let i = newIndex + 1; i < oldIndex; i++) {
//     swapOrder(arr[i], arr[i + 1]);
//   }
//   // final step
//   swapOrder(arr[oldIndex], arr[newIndex]);
// };
// const arrangeOrder = (arr, oldIndex, newIndex) => {
//   return oldIndex < newIndex
//     ? arrageOrderASC(arr, oldIndex, newIndex)
//     : arrageOrderDESC(arr, oldIndex, newIndex);
// };

// const moveElementToNewPosition = (
//   arr,
//   oldIndex,
//   newIndex,
//   orderField = "order"
// ) => {
//   arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
//   arrangeOrder(arr, oldIndex, newIndex);
//   return { arr };
// };

// console.log(
//   util.inspect(moveElementToNewPosition(exampleArray, 1, 3), true, 5, true)
// );

// console.log(
//   util.inspect(moveElementToNewPosition(exampleArray, 8, 1), true, 5, true)
// );

// Time to Slot
const _ = require("lodash");
const dayjs = require("dayjs");
const timezone = require("dayjs/plugin/timezone");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc); // must import both utc + timezone to allow timzone work
dayjs.extend(timezone);

// everytime, when insert a new record, assign a slot for it
// the startSlot is count from 0, and start at 07/07/2020
const START_SLOT = dayjs("2020-07-07").utc(true);

const timestampToSlot = (firstSlot, timestamp) => {
  const d = dayjs(timestamp).tz("UTC");
  const differenceSeconds = d.diff(firstSlot, "seconds");
  const differenceMinutes = d.diff(firstSlot, "minutes");
  const differenceHours = d.diff(firstSlot, "hours");
  const differenceYears = d.diff(firstSlot, "years");

  const hourSlot =
    Math.floor(differenceSeconds / 60) + (differenceSeconds % 60 == 0 ? 0 : 1); // 1 minute group
  const daySlot =
    Math.floor(differenceMinutes / 5) + (differenceMinutes % 5 == 0 ? 0 : 1); // 5 minutes group
  const weekSlot =
    Math.floor(differenceMinutes / 30) + (differenceMinutes % 30 == 0 ? 0 : 1); // 30 minutes group
  const monthSlot =
    Math.floor(differenceHours / 2) + (differenceHours % 2 == 0 ? 0 : 1); // 2 hours group
  const yearSlot = differenceYears; // 1 day group
  return {
    hourSlot,
    daySlot,
    weekSlot,
    monthSlot,
    yearSlot,
  };
};

// console.log(timestampToSlot(firstSlot, Date.now()));
// console.log(timestampToSlot(firstSlot, timestamp));
// const now = dayjs().utc();
// const next = now.clone().add(59, "seconds");
// console.log(timestampToSlot(now, next.valueOf()));

// const moment = require("moment"); // require
// const now1 = moment();
// const next1 = now1.clone().add(59, "seconds");
// console.log(next1.diff(now1, "minutes"));

function createGoldReportValues(startTime, index, steps, future = false) {
  const goldTypes = [
    "pnj",
    "sjc",
    "ring_pnj_24k",
    "jewelry_pnj_24k",
    "jewelry_18k",
    "jewelry_14k",
    "jewelry_10k",
  ];
  const goldTypeRanges = {
    pnj: [5290000, 5400000],
    sjc: [6810000, 6870000],
    ring_pnj_24k: [5290000, 5390000],
    jewelry_pnj_24k: [5250000, 5330000],
    jewelry_18k: [3873000, 4013000],
    jewelry_14k: [2993000, 3133000],
    jewelry_10k: [2092000, 2232000],
  };
  //const differenceRatio = 0.15;
  const now = dayjs(startTime).utc(true);
  const values = [];
  for (let i = 0; i < steps; i++) {
    const randomNumber = Math.floor(Math.random() * 15) / 100;
    const randomRatio = Math.max(0.1, randomNumber);
    const upDown = Math.ceil(Math.random() * 10) % 2 ? 1 : -1;
    const upDownTime = future ? 1 : -1;
    const timestamp = now.add(upDownTime * (index + i), "m").valueOf();
    slots = timestampToSlot(START_SLOT, timestamp);
    goldTypes.map((goldType) => {
      const [buy, sell] = goldTypeRanges[goldType];
      values.push({
        buy: parseInt(buy * (1 + randomRatio * upDown)),
        sell: parseInt(sell * (1 + randomRatio * upDown)),
        goldType,
        timestamp,
        ...slots,
      });
    });
  }
  return values;
}

const Redis = require("ioredis");

const redis = new Redis({
  port: 6379, // Redis port
  host: "127.0.0.1", // Redis host
  db: 0,
});

async function getPnjRecords(records) {
  let pnjRecords = [];
  const pnjRecordsCached = await redis.get("pnjRecordsCached");
  if (pnjRecordsCached) {
    pnjRecords = JSON.parse(pnjRecordsCached);
  } else {
    pnjRecords = records
      .filter((r) => r.goldType === "pnj")
      .map((r) => {
        const slots = timestampToSlot(START_SLOT, r.timestamp);
        const newData = {
          ...r,
          date: dayjs(r.timestamp).tz("UTC").format(),
          slots,
        };
        return newData;
      });
    // save
    const success = await redis.set(
      "pnjRecordsCached",
      JSON.stringify(pnjRecords)
    );
    console.log("cached status %v", success);
  }
  return pnjRecords;
}

// db.getCollection('goldReports').createIndex({goldType: 1, reportTime: 1})

function computeHourReports(inputRecords) {
  //average, min, max, lastest
  const currentSlots = timestampToSlot(START_SLOT, Date.now());
  const maxSlot = currentSlots.hourSlot;
  const minSlot = maxSlot - 59;
  console.log(minSlot, maxSlot);
  const lastHourRecords = inputRecords.filter((r) => {
    console.log(minSlot, r.hourSlot, maxSlot);
    return minSlot <= r.hourSlot && r.hourSlot <= maxSlot;
  });
  let groups = _.uniq(lastHourRecords.map((r) => r.hourSlot));
  return groups
    .map((group) => {
      const initialValues = {
        minSell: 0,
        maxSell: 0,
        sumSell: 0,
        minBuy: 0,
        maxBuy: 0,
        sumBuy: 0,
        count: 0,
      };
      const records = lastHourRecords.filter(
        (record) => (record.minuteSlot = group)
      );
      let values = records.reduce((prev, next) => {
        if (prev.count === 0) {
          return {
            minSell: next.sell,
            maxSell: next.sell,
            sumSell: next.sell,
            minBuy: next.buy,
            maxBuy: next.buy,
            sumBuy: next.buy,
            count: 1,
          };
        }
        return {
          minSell: next.sell < prev.minSell ? next.sell : prev.minSell,
          maxSell: next.sell > prev.maxSell ? next.sell : prev.maxSell,
          sumSell: prev.sumSell + next.sell,
          minBuy: next.buy < prev.minBuy ? next.buy : prev.minBuy,
          maxBuy: next.buy > prev.maxBuy ? next.buy : prev.maxBuy,
          sumBuy: prev.sumBuy + next.buy,
          count: prev.count + 1,
        };
      }, initialValues);
      return {
        group,
        ...values,
      };
    })
    .map((group, index) => {
      const startTime = dayjs().utc().startOf("minutes");
      const gDate = startTime.clone().add(-1 * index, "minutes");
      return {
        timestamp: gDate.valueOf(),
        reportTime: gDate.format(),
        ...group,
      };
    });
}

async function main() {
  let cachedRecords = await redis.get("goldRecords");
  let records = [];
  if (cachedRecords) {
    records = JSON.parse(cachedRecords);
  } else {
    records = createGoldReportValues(Date.now(), 0, 60 * 24 * 30 * 2, false);
    await redis.set("goldRecords", JSON.stringify(records));
  }

  const startTestTime = dayjs();

  const pnjRecords = records
    .filter((r) => r.goldType === "pnj")
    .sort((a, b) => {
      (a.reportTime - b.reportTime) * -1;
    });

  const hourReports = computeHourReports(pnjRecords);
  console.log("records.length: %d", records.length);
  console.log("pnjRecords.length: %d", pnjRecords.length);
  console.log("hourReports.length: %d", hourReports.length);
  // console.log("pnjRecords[0]", pnjRecords[0]);
  console.log(hourReports);
  const endTestTime = dayjs();
  console.log(endTestTime.diff(startTestTime, "milliseconds") / 1000);
}

main()
  .then(() => {
    console.log("finished");
  })
  .catch((err) => console.error(err));
