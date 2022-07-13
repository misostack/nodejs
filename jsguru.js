require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 1337;
const cors = require("cors");

const admin = require("firebase-admin");

const serviceAccount = require("./jsguru-firebase-admin-sdk.json");
var auth = null;

app.use(cors());

const jwt = require("jsonwebtoken");

const connectFirebase = () => {
  const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  auth = admin.auth(app);
};
const getAuth = () => {
  return auth;
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/revoke/:uid", (req, res) => {
  const uid = req.params.uid;
  getAuth()
    .revokeRefreshTokens(uid)
    .then(() => {
      return getAuth().getUser(uid);
    })
    .then((userRecord) => {
      return new Date(userRecord.tokensValidAfterTime).getTime() / 1000;
    })
    .then((timestamp) => {
      console.log(`Tokens revoked at: ${timestamp}`);
    });
  res.send({ uid: req.params.uid });
});

app.post("/login", async (req, res) => {
  const userId = "1";
  const additionalClaims = {
    premiumAccount: false,
  };
  // const $service_account_email = serviceAccount.client_email;
  // const $now_seconds = parseInt(Date.now() / 1000);
  // const $uid = userId;
  // const payload = {
  //   iss: $service_account_email,
  //   sub: $service_account_email,
  //   aud: "https://identitytoolkit.googleapis.com/google.identity.identitytoolkit.v1.IdentityToolkit",
  //   iat: $now_seconds,
  //   exp: $now_seconds + 60, // Maximum expiration time is one hour
  //   uid: $uid,
  //   claims: {
  //     premium_account: false,
  //   },
  // };
  // const $privateKey = serviceAccount.private_key;
  // const customToken = jwt.sign(payload, $privateKey, { algorithm: "RS256" });
  // console.log({ customToken });
  // return res.send({ customToken });
  // Custom auth without generate your custom JWT
  await new Promise((resolve) => {
    getAuth()
      .createCustomToken(userId, additionalClaims)
      .then((customToken) => {
        // Send token back to client
        resolve(customToken);
        res.send({
          customToken,
        });
      })
      .catch((error) => {
        res.send({
          customToken: "",
        });
        console.log("Error creating custom token:", error);
      });
  });
});

app.listen(port, () => {
  connectFirebase();
  console.log(`Example app listening at http://localhost:${port}`);
});
