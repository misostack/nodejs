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

// Database Name
const dbName = "sonnm_finance";

const events = require("events");
const { cloneDeep } = require("lodash");

const EVT_CREATE_GOLD_RECORD = Symbol();

const eventEmitter = new events.EventEmitter();

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const startTime = dayjs();
  // await createGoldReportData(db);
  const endTime = dayjs();
  console.error(`${endTime.diff(startTime, "milliseconds")}`);
  const oldestRecord = await createDailyStats(db);
  console.log(oldestRecord);
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
      this.cursor.stream().on("data", (doc) => callback(doc));
    },
  };
  return streamObject;
}

async function createDailyStats(db) {
  // find the oldest record
  const findResult = await db
    .collection("goldReports")
    .find({})
    .sort({ reportTime: 1 })
    .limit(1)
    .toArray();

  console.log("Found documents =>", findResult[0].reportTime);
  // sum by hour
  const startTime = dayjs(findResult[0].reportTime)
    .tz("Asia/Ho_Chi_Minh")
    .startOf("D");
  const endTime = cloneDeep(startTime).add(1, "days");
  // stream
  const stream = findStream(db, "goldReports", {
    reportTime: { $gte: startTime.valueOf(), $lt: endTime.valueOf() },
  });
  stream.eachRecord(async (record) => {
    console.log(record);
  });

  return startTime;
}

function createGoldReportValues(index, steps) {
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
    const reportTime = now.add(-1 * (index + i), "m").valueOf();
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

async function createGoldReportData(db) {
  // draw every minute, 24hours, 365 days, 5 years
  const maximumRecords = 60 * 24 * 365 * 5;
  const STEPS = 10_000;
  // insert
  const insertGoldReportData = (...args) => {
    const [offset, steps] = args;
    const values = createGoldReportValues(offset, steps);
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
