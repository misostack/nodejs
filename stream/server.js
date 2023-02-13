const express = require("express");
const app = express();
const port = process.env.PORT || 1337;
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const DIRPATH = path.resolve(__dirname);
const cors = require("cors");
var zlib = require("zlib");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("."));

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.get("/video", (req, res) => {
  // Ensure there is a range given for the video
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }

  // get video stats (about 61MB)
  const videoPath = path.resolve(DIRPATH, "video.mp4");
  const videoSize = fs.statSync(path.resolve(DIRPATH, "video.mp4")).size;

  // Parse Range
  // Example: "bytes=32324-"
  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  // Create headers
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  // HTTP Status 206 for Partial Content
  res.writeHead(206, headers);

  // create video read stream for this particular chunk
  const videoStream = fs.createReadStream(videoPath, { start, end });

  // Stream the video chunk to the client
  videoStream.pipe(res);
});

app.get("/stream", (req, res) => {
  const stream = fs.createReadStream(path.resolve(DIRPATH, "large100k.txt"));
  stream.pipe(res);
});

app.get("/status", (request, response) =>
  response.json({ clients: clients.length })
);

let clients = [];
let facts = [];

function eventsHandler(request, response, next) {
  const data = `data: ${JSON.stringify(facts)}\n\n`;

  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
    "Content-Encoding": "deflate",
  };

  response.writeHead(200, headers);

  // response.write(data);

  const clientId = Date.now();

  const newClient = {
    id: clientId,
    response,
  };

  clients.push(newClient);

  request.on("close", () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter((client) => client.id !== clientId);
  });
}

app.get("/events", eventsHandler);

function sendEventsToAll(newFact) {
  clients.forEach(
    (client) => {
      let data = `event: ping\n`;
      data += `data: custom data`;
      data += "\n\n";
      zlib.deflate(data, function (err, buffer) {
        if (!err) {
          client.response.write(buffer.toString("base64"));
        }
      });

      // client.response.cookie(
      //   "CHAT_GPT",
      //   { data: newFact },
      //   {
      //     expires: 0,
      //     httpOnly: true,
      //     secure: true,
      //   }
      // );
    }
    // client.response.end(`data: ${JSON.stringify(newFact)}\n\n`)
  );
}

async function addFact(request, respsonse, next) {
  const newFact = request.body;
  facts.push(newFact);
  console.log(facts, newFact);
  respsonse.json(newFact);
  return sendEventsToAll(newFact);
}

app.post("/fact", addFact);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
