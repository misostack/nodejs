const axios = require("axios");
const api = axios.create({
  baseURL: "URL",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

api
  .get("Path", {
    responseType: "blob",
  })

  .then((myBlob) => {
    console.log(myBlob);
    console.log("--------------------");
  });
