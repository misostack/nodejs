const { MongoClient } = require("mongodb");
const dayjs = require("dayjs");
const timezone = require("dayjs/plugin/timezone");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc); // must import both utc + timezone to allow timzone work
dayjs.extend(timezone);
const faker = require("@faker-js/faker").default;
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// redis

const Redis = require("ioredis");

// Create a Redis instance.
// By default, it will connect to localhost:6379.
// We are going to cover how to specify connection options soon.
const redis = new Redis({
  port: 6379, // Redis port
  host: "127.0.0.1", // Redis host
  db: 0,
});

// Database Name
const dbName = "sonnm_finance";

const events = require("events");

const EVT_CREATE_GOLD_RECORD = Symbol();

const eventEmitter = new events.EventEmitter();

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);

  // await createGoldReportData(db, true);
  const monthStats1 = await createStats(db, "Asia/Ho_Chi_Minh");
  console.log(monthStats1);

  const monthStats2 = await createStats(db, "Asia/Ho_Chi_Minh");
  console.log(monthStats2);
  // the following code examples can be pasted here...

  return "done.";
}

async function insertReportData(db, collectionName, values) {
  const collection = db.collection(collectionName);
  const insertResult = await collection.insertMany(values);
  return insertResult;
}

function findStream(db, collectionName, query, options = {}) {
  const collection = db.collection(collectionName);
  const cursor = collection.find(query, options);
  const streamObject = {
    cursor,
    eachRecord: function (callback) {
      return new Promise((resolve) => {
        this.cursor
          .stream()
          .on("data", async (doc) => {
            console.log("doc", dayjs(doc.reportTime).format());
            callback(doc);
          })
          .on("end", () => {
            console.log("end stream");
            resolve(true);
          });
      });
    },
  };
  return streamObject;
}

async function createStats(db, timezone, statType = "months") {
  // find the oldest record
  const findResult = await db
    .collection("goldReports")
    .find({})
    .sort({ reportTime: 1 })
    .limit(1)
    .toArray();
  // const startTime = dayjs(findResult[0].reportTime).tz(timezone);
  const currentTime = dayjs().tz(timezone);
  const endTime = currentTime.endOf("hours");
  let startTime = endTime.clone().add(-1, "hours");
  const statTypes = {
    hours: "hours",
    days: "days",
    weeks: "weeks",
    months: "months",
    years: "years",
  };

  // stream
  const startTestTime = dayjs();

  const hourSlots = createHourStats(endTime);
  const daySlots = createDayStats(endTime);
  const query = {
    reportTime: { $gte: startTime.valueOf(), $lte: endTime.valueOf() },
  };

  // cache
  const cachedRecords = await redis.get("goldReports");
  let count = 0;
  if (cachedRecords) {
    const records = JSON.parse(cachedRecords);
    records
      .filter((record) => isInRange(hourSlots, record))
      .map((record) => {
        count++;
        addHourSlots(hourSlots, record);
      });
    // await Promise.all(
    //   cachedRecords.map(async (key) => {
    //     console.error(key);
    //     const record = await redis.get(key);
    //     count++;
    //     addHourSlots(hourSlots, JSON.parse(record));
    //   })
    // );
  } else {
    const stream = findStream(db, "goldReports", query);
    const records = [];
    await stream.eachRecord(async (record) => {
      records.push(record);
      // await redis.set(
      //   `record_${record._id.toString()}`,
      //   JSON.stringify(record)
      // );
      count++;
      addHourSlots(hourSlots, record);
    });
    await redis.set("goldReports", JSON.stringify(records));
  }
  const endTestTime = dayjs();

  return {
    count,
    hourSlots,
    different: `${endTestTime.diff(startTestTime, "milliseconds")}`,
  };
}

function isInRange(hourSlots, record) {
  for (let i = 0; i < hourSlots.length; i++) {
    const end = hourSlots[i].timestamp;
    const start = end.clone().add(-1, "minutes").startOf("milliseconds");
    if (
      record.reportTime >= start.valueOf() &&
      record.reportTime < end.valueOf()
    ) {
      return true;
    }
  }
  return false;
}

function addHourSlots(hourSlots, record) {
  for (let i = 0; i < hourSlots.length; i++) {
    // in hour slot time range
    const end = hourSlots[i].timestamp;
    const start = end.clone().add(-1, "minutes").startOf("milliseconds");
    // console.log(
    //   start.format(),
    //   end.format(),
    //   dayjs(record.reportTime).format(),
    //   record.reportTime >= start.valueOf(),
    //   record.reportTime < end.valueOf()
    // );
    if (
      record.reportTime >= start.valueOf() &&
      record.reportTime < end.valueOf()
    ) {
      hourSlots[i].records.push(record);
    }
  }
  // aggregate final output
  for (let i = 0; i < hourSlots.length; i++) {
    let initialValue = { sell: 0, buy: 0 };
    let values = hourSlots[i].records.reduce((prev, next) => {
      return { sell: prev.sell + next.sell, buy: prev.buy + next.buy };
    }, initialValue);
    hourSlots[i] = {
      ...hourSlots[i],
      values,
    };
  }
  // const slots = hourSlots.map((slot) => {
  //   let initialValue = { sell: 0, buy: 0 };
  //   let values = slot.records.reduce((prev, next) => {
  //     prev
  //       ? { sell: prev.sell + next.sell, buy: prev.buy + next.buy }
  //       : {
  //           sell: next.sell,
  //           buy: next.buy,
  //         };
  //   }, initialValue);

  //   return {
  //     ...slot,
  //     values,
  //   };
  // });
}

function createHourStats(toTime) {
  // prepare hour slots : 60 slots, by minutes
  const slots = [];
  for (let i = 0; i < 60; i++) {
    slots.push({
      timestamp: toTime
        .clone()
        .startOf("minutes")
        .add(-1 * i, "minutes"),
      records: [],
    });
  }
  return slots;
}

function createDayStats(toTime) {
  // prepare hour slots : 288 slots, by minutes
  const slots = [];
  for (let i = 0; i < 60; i++) {
    slots.push({
      timestamp: toTime
        .clone()
        .startOf("minutes")
        .add(-1 * i, "minutes"),
      records: [],
    });
  }
  return slots;
}

function createGoldReportValues(index, steps, future = false) {
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
  const now = dayjs(new Date());
  const values = [];
  for (let i = 0; i < steps; i++) {
    const randomNumber = Math.floor(Math.random() * 15) / 100;
    const randomRatio = Math.max(0.1, randomNumber);
    const upDown = Math.ceil(Math.random() * 10) % 2 ? 1 : -1;
    const upDownTime = future ? 1 : -1;
    const reportTime = now.add(upDownTime * (index + i), "m").valueOf();
    goldTypes.map((goldType) => {
      const [buy, sell] = goldTypeRanges[goldType];
      values.push({
        buy: buy * (1 + randomRatio * upDown),
        sell: sell * (1 + randomRatio * upDown),
        goldType,
        reportTime,
      });
    });
  }
  return values;
}

async function createGoldReportData(db, future = false) {
  // draw every minute, 24hours, 365 days, 5 years
  const maximumRecords = 60 * 24 * 365 * 5;
  const STEPS = 10_000;
  // insert
  const insertGoldReportData = (...args) => {
    const [offset, steps] = args;
    const values = createGoldReportValues(offset, steps, future);
    insertReportData(db, "goldReports", values)
      .then((res) => {
        console.log(`${offset}/${maximumRecords}`);
        console.log(res);
        if (offset < maximumRecords - steps) {
          eventEmitter.emit(EVT_CREATE_GOLD_RECORD, offset + steps, steps);
        }
      })
      .catch((error) => {
        console.error("error", error);
      });
  };
  eventEmitter.on(EVT_CREATE_GOLD_RECORD, insertGoldReportData);
  eventEmitter.emit(EVT_CREATE_GOLD_RECORD, 0, STEPS);
}

main()
  .then(console.log("connected"))
  .catch((err) => console.error(err));
//.finally(() => client.close().then(() => console.log("closed")));
